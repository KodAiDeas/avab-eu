# Komponentarkitektur för AVAB

**Status:** Active  
**Owner:** AVAB-projektet  
**Last reviewed:** 2026-08-17

## Syfte

Detta dokument beskriver hur återkommande sidstruktur ska fördelas mellan layouts, delade komponenter, sidtypskomponenter och innehållsdata.

Målet är att en standardsida ska kunna ändra innehåll utan att AI eller redaktör behöver återskapa designen.

## Grundregel

Återkommande presentation ska implementeras en gång och återanvändas.

En ny standardsida ska normalt inte skapa ny lokal CSS eller kopiera markup från en annan hel sida.

## Ansvarsnivåer

### Layout

Layout ansvarar för sidans globala skal:

- dokumentstruktur
- global CSS
- header/footer
- gemensam head/SEO-infrastruktur
- globala resurser

### Globala komponenter

Globala komponenter används över flera sidtyper:

- breadcrumbs
- hero
- CTA
- FAQ
- sektioner
- generella kort och data-primitives

### Sidtypskomponenter

Sidtypskomponenter uttrycker struktur som är specifik för exempelvis referenser eller miljösidor, men som återkommer inom den sidtypen.

### Innehållsdata

Data beskriver vad sidan handlar om:

- rubriker
- ingresser
- fakta
- bilder
- alt-texter
- relationer
- FAQ
- metadata

Data ska inte innehålla CSS eller full sidmarkup.

## Komponenttest

Innan en ny komponent skapas, fråga:

1. Återkommer detta visuella eller semantiska mönster?
2. Har komponenten ett tydligt ansvar?
3. Kan innehållet uttryckas som props/data utan att komponenten blir ett specialfall?
4. Förhindrar komponenten faktisk duplicering eller drift?

Om svaret huvudsakligen är nej ska blocket inte abstraheras enbart för abstraktionens skull.

## Kontrollerade variationer

Komponenter får stödja dokumenterade varianter genom props, exempelvis:

- `variant="light" | "dark"`
- `columns={2 | 3 | 4}`
- `align="left" | "center"`

De får inte bli en samling godtyckliga props som i praktiken återskapar fri CSS per sida.

## Lokala style-block

På standardiserade sidtyper gäller:

- lokal CSS är undantag, inte default
- återkommande lokala regler ska flyttas till komponent/global styling
- verkligt unik presentation kräver motivering och ska inte kopieras till nästa sida

## SEO och structured data

SEO-data ska vara input; renderingen ska centraliseras.

Siddata ska exempelvis kunna ange:

- title
- description
- canonical path
- social image
- social image alt
- publication/modification dates
- page type

Gemensam layout/SEO-komponent ansvarar för absoluta URL:er och sajtgemensamma värden. Basdomänen är alltid:

`https://avab.eu/`

## Breadcrumb single source

Samma breadcrumb-data ska användas för:

- synlig breadcrumb-navigation
- `BreadcrumbList` structured data

Samma information ska inte underhållas två gånger.

## FAQ single source

Samma FAQ-data ska användas för:

- synliga frågor/svar
- FAQ structured data när det är lämpligt

Structured data får inte innehålla frågor som inte finns synligt för användaren.

## Referenser som pilot

Första implementationspiloten ska vara sidtypen `reference`.

Målet är att en referens ska kunna försörja följande från samma datakälla:

- individuell referenssida
- `ReferenceCard`
- `/referenser/`-filter/index
- SEO/schema
- relaterade referenser

Exakt Astro-lösning och schema definieras i Fas 3.

## Förbjuden genväg

Fas 2 innebär inte att nuvarande stora `index.astro`-sidor bara flyttas in i en stor `ReferenceTemplate.astro` med hundratals villkor.

Målet är verklig separation:

```text
innehåll/data
    ↓
sidtypsstruktur
    ↓
delade primitives
    ↓
global layout/design
```

Inte:

```text
en gigantisk mall med alla gamla specialfall
```

## Migreringsprincip

Migrera representativa sidor först och jämför före/efter. Ta bort gammal markup/CSS först när den nya representationen är verifierad.

Gamla URL:er och innehåll ska bevaras under migrationen.