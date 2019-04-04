Chci si půjčit knížku [{{ book.name }}].

Chci si ji převezít na Pyvu v ____.

{% if ccs -%}
    (cc {{ ccs | join(', ') }})
{% endif %}

[{{ book.name }}]: {{ url_for('book', book_slug=book_slug, _external=True) }}
