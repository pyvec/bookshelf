# Knihovnička

## Jak to funguje?

* Pokud si chceš půjčit knihu, pošli pull request, ve kterém zapíšeš že je kniha aktuálně u tebe.
  * V názvu pull requestu uveď jméno knihy.
  * V pull requestu uveď, kde chceš knihu předat. Standardně se knihy předávají na Pyvu (v Praze, Brně nebo Ostravě – viz http://pyvo.cz).
  * Standardní doba výpůjčky je jeden měsíc (do dalšího Pyva).
* Pokud máš knihu, kterou chceš zařadit do knihovny, pošli pull request, který ji tam zařazuje.
  * Knihu můžeš buď nechat u sebe, nebo ji na některém Pyvu předat Petrovi (@encukou), který ji pak bude vozit na Pyva.
  * Hledáme knihy, které se týkají Pythonu a přidružených neutrálních technologií (např. databází), nebo programování či open-source obecně
  * Půjčování je dobrovolná činnost založená na důvěře. Pokud se knížka ztratí, bude nám to líto a budeme se snažit ji získat zpátky, ale zaručit nemůžeme nic.

Začátečníci jsou vítáni! Pokud ještě neumíš udělat pull request, ozvi se na encukou@gmail.com.

Jména jako "@encukou" jsou účty na Githubu.

## How does this work?

* If you want to borrow a book, send a pull request, changing the entry to say you have the book ("Aktuálně u").
  * Mention the name of the book in the pull request name
  * In the pull request comment, say where you'll pick the book up. Standard locations are the Pyvo meetups – see viz http://pyvo.cz
  * The usual lease time is one month (until the next meetup).
* If you have a book you'd like to add, send a pull request adding it!
  * You can either keep the book, or give it to Petr (@encukou) who can bring it to any other Pyvo meetup in the country.
  * We're looking for books about either Python and related language-neutral technologies (like databases), or programming and open-source in general.
  * Lending is a volunteer effort based on trust. We have no legal responsibility for books you donate.

Names such as "@encukou" represent Github usernames.
"Majitel" means "Owner". "Aktuálně u" means "Currently at".

Souštění:
$ export FLASK_APP=bookshelf.py
$ export FLASK_DEBUG=1
$ flask run

Přídání knihy:
do books.yml vyplnit
nazevknihy:
    name: Název knihy
    author: Autor
    description: Krátký popis knihy
    copies:    
        - owner: "@jmenonagithubu"
          current: "@jmenonagithubu"
          borrowed-at: yyyy-mm-dd
        - owner: "@jmenonagithubu"
          keeper: "@jmenonagithubu"
          signed: True (jen když je podepsaná)
    url: http://odkaznaknihu.cz
    language:
        - en nebo cs
    tags:
        - (doplň všechny vhodné tagy)
