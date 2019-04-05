
# Knihovnička

## Jak to funguje?

* Pokud si chceš půjčit knihu, založ na to na GitHubu [Issue].
    * V názvu *issue* uveď jméno knihy.
    * V popisku *issue* uveď, kde chceš knihu předat. Standardně se knihy předávají na Pyvu (v různých městech – viz [https://pyvo.cz/]).
    * Standardní doba výpůjčky je jeden měsíc (do dalšího Pyva).
* Pokud máš knihu, kterou chceš zařadit do knihovny, pošli pull request, který ji tam zařazuje.
    * Knihu můžeš buď nechat u sebe, nebo ji na některém Pyvu předat Petrovi ([@encukou]), který ji pak bude vozit na Pyva.
    * Hledáme knihy, které se týkají Pythonu a přidružených neutrálních technologií (např. databází), nebo programování či open-source obecně
    * Půjčování je dobrovolná činnost založená na důvěře. Pokud se knížka ztratí, bude nám to líto a budeme se snažit ji získat zpátky, ale zaručit nemůžeme nic.

Pokud nemáš účet na GitHubu, nebo není něco jasné, ozvi se na [encukou@gmail.com].
Začátečníci jsou vítáni!

## How does this work?

* If you want to borrow a book, open an [Issue] on GitHub.
    * Mention the name of the book in the issue name
    * In the issue comment, say where you'll pick the book up. Standard locations are the Pyvo meetups – see viz [https://pyvo.cz/]
    * The usual lease time is one month (until the next meetup).
* If you have a book you'd like to add, send a pull request adding it!
    * You can either keep the book, or give it to Petr ([@encukou]) who can bring it to other Pyvo meetups in the country.
    * We're looking for books about either Python and related language-neutral technologies (like databases), or programming and open-source in general.
    * Lending is a volunteer effort based on trust. We have no legal responsibility for books you donate.

[Issue]: https://github.com/pyvec/bookshelf/issues
[https://pyvo.cz/]: https://pyvo.cz/
[@encukou]: https://github.com/encukou
[encukou@gmail.com]: mailto:encukou@gmail.com

<!-- END of user instructions. The website will not show the text below. -->


### Spuštění webu lokálně v PC

Ve virtuálním prostředí s Pythhonem 3.6 (nebo vyšším) spusť:

    $ python -m pip install -r requirements.txt

Ve stejném virtuálním prostředí spusť na Linuxu/macOS:

    $ export PYTHONPATH=.

nebo na Windows:

    > set PYTHONPATH=.

a pak (na všech systémech):

    $ python bookshelf.py serve

Stránky se zpřístupní na adrese `http://127.0.0.1:8003/`.
Změny v kódu se projeví po obnovení stránky v prohlížeči.

### Přídání knihy:
do `books.yml` přidej:
```
nazev-knihy:
  name: Název knihy
  author: Autor knihy
  description: Krátký popis knihy
  copies:
      - owner: "@jmenonagithubu" - kdo je majitel knihy
        keeper: "@jmenonagithubu" - kdo se o knihu stará
        current: "@jmenonagithubu" - kdo má knihu půjčenou    
        borrowed: yyyy-mm-dd - od kdy ji má půjčenou
        signed: True - vyplnit, jen když je podepsaná
  url: odkaz na další informace o knize
  language:      
      - Anglicky/Česky
  tags:
    - doplň všechny vhodné tagy (Python, Data, Ostatní, SQL, Testování, Web, Začátečník)
```

## Příklad knihy:
```
two-scoops-1-5:
  name: Two Scoops of Django (1.5)
  author: Daniel Greenfeld & Audrey Roy
  description: Best Practices for Django
  copies:
      - owner: "@honzakral"
        keeper: "@encukou"
  url: https://www.twoscoopspress.com/products/two-scoops-of-django-1-5
  language:
      - Anglicky
  tags:
      - Web
      - Python
```

do složky `covers` dej obrázek přebalu ve formátu `nazev-knihy.jpg/png` název musí být stejný jako v ymlu.
