Chci si půjčit knížku [{{ book.name }}].

Chci si ji převzít na Pyvu v ____. <- sem dopiš město a datum. 
Přehled Pyv najdeš na https://pyvo.cz/

{% if ccs -%}
    (cc {{ ccs | join(', ') }})
{% endif %}

[{{ book.name }}]: {{ url_for('book', book_slug=book_slug, _external=True) }}
