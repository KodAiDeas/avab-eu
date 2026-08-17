# AVAB – sidtyper

**Status:** Active  
**Owner:** AVAB-projektet  
**Last reviewed:** 2026-08-17

## Syfte

Varje publik sida ska klassificeras innan en AI väljer standard, workflow eller content model. Sidtypen styr vilka regler som ska läsas och vilken teknisk modell som får användas.

## Standardiserade sidtyper

### `reference`
**Routefamilj:** `/referenser/<slug>/`  
**Pilot:** `/referenser/minnebergsskolan-arvika/`

Verifierbart kundcase/referens. Målarkitektur: strukturerat innehåll + gemensam referenslayout/template. En ny referens ska normalt inte kräva ny unik CSS eller fullsidig markup.

### `environment`
**Routefamilj:** `/miljo/<slug>/`  
**Pilot/riktningsreferens:** `/miljo/simhall/`

Beskriver AVAB:s lösningar för en miljö, exempelvis simhall, skola, industri eller gym. Målarkitektur: gemensamma miljöprimitives/sektioner med kontrollerade variationer.

### `service`
**Routefamilj:** `/tjanster/<slug>/`

Beskriver en tjänst/kompetens. Målarkitektur: gemensam tjänstemodell där det är praktiskt, med dokumenterade specialsektioner vid verkligt behov.

### `knowledge`
**Routefamilj:** `/kunskap/<slug>/`

Guider och kunskapsartiklar. Målarkitektur: artikel/content model med gemensam metadata, typografi och relaterat innehåll.

### `listing`
Exempel: `/referenser/`.

Indexerar eller presenterar poster från en annan content model. Listing-sidor ska konsumera data från källan och inte ha egna duplicerade register.

## Special/custom

Följande klassas tills vidare som `special` och får inte automatiskt tvingas in i standardmall:

- `/`
- `/kontakt/`
- `/integritetspolicy/`
- `/rastsignal/`

En specialroute kan senare omklassificeras om flera sidor visar samma stabila mönster.

## Routingregel för AI

När användaren ber om en ny eller ändrad sida ska AI först identifiera sidtypen.

- Referens → reference-standard + create-reference-workflow.
- Miljö → environment-standard + relevant page-workflow.
- Tjänst → service-standard + relevant page-workflow.
- Kunskap → knowledge-standard + relevant page-workflow.
- Listing → ändra inte register separat om data redan kommer från content model.
- Special → anta inte standardmall; behandla som utvecklings-/designarbete tills uttryckligt workflow finns.

Om sidtypen är oklar ska AI utgå från route, syfte och befintlig kod. Den får inte välja mall enbart utifrån visuell likhet.

## Namnregel

Publikt språk är svenska: `Referenser`, `Miljöer`, `Tjänster`, `Kunskap`. Interna stabila sidtyps-ID använder engelska singularformer: `reference`, `environment`, `service`, `knowledge`, `listing`, `special`.
