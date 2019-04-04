Chci si půjčit knížku [{{ book.name }}]({{ url_for('book', book_slug=book_slug, _external=True) }}).

Chci si ji převezít na Pyvu v ____.

{% if ccs -%}
    (cc {{ ccs | join(', ') }})
{% endif %}
