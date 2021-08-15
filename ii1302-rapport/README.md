# ii1302-rapport

Det här är LaTeX-mallen för vår rapport.
Vill du inte skriva text i LaTeX går det bra att skriva din text i valfritt format och ladda upp filen till detta repo så sammanfogar vi det senare.

Bilder ska ligga i mappen images och ha format png eller jpg.

Tabeller skapas direkt i LaTeX, men det går bra att göra en tabell i Word/Excel och be Adam fixa in den i rapporten.

## LaTeX-miljö för Windows
Om du vill skriva i LaTeX så rekommenderar jag (för Windows) att använda MikTeX som kompilator, https://miktex.org/ och som editor använda Visual Studio Code med tillägget LaTeX Workshop.
Väl i VS Code så kör du delad skärm med kursrapport.pdf på ena och kursrapport.tex på andra. Så fort du sparar i kursrapport.tex så kompileras filen och kursrapport.pdf uppdateras.

## Resurser
Vill du veta mer om hur man gör specifika saker i LaTeX så kan du kolla i IEEEtran_HOWTO.pdf, på http://tex.stackexchange.com eller http://overleaf.com.

## Referenser
Referenser hanteras genom BibTeX. Zotero kan exportera referenser till bib-format. En bib-referens ser ut t ex såhär:
@BOOK{DUMMY,
AUTHOR="John Doe",
TITLE="The Book without Title",
PUBLISHER="Dummy Publisher",
YEAR="2100",
}

När man sedan vill referera den ifrån texten skriver man bara "Projektdefinitionen är det viktigaste dokumentet\cite{DUMMY}" så kommer dels referensen att bli rätt i
brödtexten, dels kommer referensen att hamna i referenslistan. Vi kan när som helst ändra stil på referenser genom att ändra i kommandot \bibliographystyle, då uppdateras
både referenslistan och alla referenser i texten.
