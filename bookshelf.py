import os
import fnmatch
import datetime
import collections
import json
from pathlib import Path
import functools

from flask import Flask, render_template, url_for, abort, send_from_directory, jsonify
from flask_frozen import Freezer
from elsa import cli
import yaml
import markdown
import markupsafe

app = Flask(__name__)
MISSING = object()

base = Path(app.root_path) / "covers"


@app.route('/data.json')
def data():
    books = read_yaml('books.yml')
    tags = set()
    language = set()
    today = datetime.date.today()
    for key, value in books.items():
        value['img_url'] = '/img/' + str(key) + ".jpg"
        value['book_url'] = '/' + str(key)
        for book in value['copies']:
            if 'borrowed' in book:
                book['days'] = (today - book['borrowed']).days
        tags.update(value['tags'])
        language.update(value['language'])
    return jsonify({'books':books, 'tags':sorted(tags), 'language':sorted(language)})


@app.route('/')
def index():
    books = read_yaml('books.yml')
    if books is None:
        abort(404)
    today = datetime.date.today()
    return render_template('index.html', books=books,today=today,)


@app.route('/<book_slug>/')
def book(book_slug):
    books = read_yaml('books.yml')
    book = books.get(book_slug)
    if book is None:
        abort(404)
    today = datetime.date.today()

    # Get the CC list (people who should be notified in the "borrow"
    # issue on GitHub).
    ccs = set()
    for copy in book['copies']:
        if 'keeper' in copy:
            # For some books the owner wants a `keeper` to handle the lending;
            # we don't bother the owner in that case.
            ccs.add(copy['keeper'])
        elif 'owner' in copy:
            ccs.add(copy['owner'])
        if 'current' in copy:
            # Always put in the current reader
            ccs.add(copy['current'])
    borrow_issue_body = render_template(
        'borrow_issue.md', book_slug=book_slug, book=book,
        ccs=sorted(ccs),
    )

    return render_template(
        'book.html',
        book_slug=book_slug,
        book=book,
        today=today,
        borrow_issue_body=borrow_issue_body,
    )


@app.route('/info/')
def info():
    readme_contents = Path(__file__).parent.joinpath('README.md').read_text()
    instructions, sep, rest = readme_contents.partition('<!-- END')
    html_instructions = markupsafe.Markup(markdown.markdown(instructions))
    return render_template('info.html', instructions=html_instructions)


@app.route('/img/<book_slug>.jpg')
def image(book_slug):
    name = find_photo(book_slug)
    return send_from_directory(base, name)


def find_photo(book_slug):
    name = book_slug + '.jpg'
    path = base/name
    if path.exists():
        return name
    return "python.png"


def read_yaml(filename, default=MISSING):

    # Reading YAML is slow. To avoid loading all the time, we cache the result.
    # To make the site react to changes in the files, we use the file size
    # and last-modified time as part of the cache key. If either changes,
    # the cache will be invalidated and the file will be read from disk again.

    try:
        info = os.stat(filename)
    except FileNotFoundError:
        if default is MISSING:
            raise
        return default
    return _read_yaml_cached(filename, info.st_size, info.st_mtime)


@functools.lru_cache()
def _read_yaml_cached(filename, size, mtime):
    with open(filename, encoding='utf-8') as file:
        return yaml.safe_load(file)


@app.context_processor
def inject_context():
    return {'today': datetime.date.today(),}


if __name__ == '__main__':
    cli(app, base_url='https://books.pyvo.cz')
