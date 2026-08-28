# Fas 2 – komponent- och templateinventering

**Status:** Complete  
**Last reviewed:** 2026-08-17

## Syfte

Fastställa vilka delar av AVAB:s nuvarande Astro-sidor som ska bli gemensam layout, vilka som hör till en viss sidtyp och vilka som faktiskt är unika innehållsblock.

Fasen är en analysfas. Den massrefaktorerar inte publika sidor.

## Underlag

Representativa sidor och komponenter som analyserats:

- `src/pages/referenser/minnebergsskolan-arvika/index.astro`
- `src/pages/referenser/saffle-simhall/index.astro`
- `src/pages/miljo/simhall/index.astro`
- `src/pages/miljo/gym/index.astro`
- `src/components/ReferenceCard.astro`
- `src/data/referenser.ts`
- `src/styles/avab.css`

## Huvudfynd

### 1. Sidtyperna har redan ett gemensamt designspråk

Både referens- och miljösidor återanvänder visuellt samma eller närbesläktade byggstenar:

- global header/footer
- breadcrumbs
- hero med eyebrow, H1, ingress och CTA
- sektioner med ljus/mörk bakgrund
- kort/grid-mönster
- fakta/metrics
- FAQ
- relaterade referenser/tjänster
- avslutande CTA

Problemet är därför inte främst att designsystem saknas, utan att samma design implementeras flera gånger i stora `index.astro`-filer.

### 2. Head/SEO/schema dupliceras kraftigt

Representativa miljö- och referenssidor innehåller egen HTML för:

- `<title>` och description
- canonical
- Open Graph
- Twitter/X metadata
- favicon-länkar
- Article/Service-schema
- FAQPage-schema
- BreadcrumbList-schema
- WebPage-schema
- publisher/organization-data
- preconnect/preload/fonts

Detta ska inte fortsätta vara fullständigt sidspecifik markup.

### 3. Canonical-domänen är inkonsekvent

Vissa referenser använder redan `https://avab.eu/`, medan andra referenser och miljösidor använder `https://www.avab.eu/` i canonical, schema och Open Graph.

Canonical ska genereras centralt från projektets beslutade basdomän:

`https://avab.eu/`

Det minskar risken att `www` återintroduceras av en AI.

### 4. Lokal CSS är till stor del återanvändbara komponenter i förklädnad

Exempel på återkommande lokala block:

- FAQ-heading + tvåkolumns-FAQ
- solution cards
- reference cards
- fact strips
- mini cards
- stat/metric grids
- snippet/answer boxes
- gallery
- CTA/calculator bands
- dark sections

När samma mönster förekommer på flera sidor är det inte längre sidspecifikt. Det bör flyttas till delad komponent eller global/component CSS.

### 5. Referenssidorna har fler verkligt projektspecifika block

Minnebergsskolan innehåller exempelvis aula-specifikationer, signalflöde, rumsflöde och nyckeltal. Säffle simhall innehåller zondata, driftstatistik och tekniska tabeller.

Dessa ska inte automatiskt bli globala komponenter bara för att de ser ut som kort. De bör först abstraheras till generella innehållsprimitives, exempelvis:

- `StatGrid`
- `FeatureGrid`
- `DataTable`
- `ProcessFlow`

Sidans data avgör innehållet; komponenten avgör presentationen.

## Tre nivåer av återanvändning

### A. Globalt för hela sajten

Ska kunna användas av nästan alla sidtyper:

- `SiteShell` / baslayout
- `SeoHead`
- `Breadcrumbs`
- `PageHero`
- `Section`
- `PageCTA`
- `FaqList`
- generiska `CardGrid`/`FeatureCard`
- gemensam organization/schema-data

### B. Sidtypskomponenter

#### Referenser

- `ReferenceHero`
- `ReferenceFacts`
- `ReferenceSummary` / "uppdraget på 30 sekunder"
- `ReferenceScope`
- `ReferenceGallery`
- `ReferenceRelated`
- `ReferenceCTA`

#### Miljöer

- `EnvironmentHero`
- `EnvironmentSolutions`
- `EnvironmentChallenges`
- `EnvironmentReferences`
- `EnvironmentServices`
- `EnvironmentFAQ`

Namnen är arbetsnamn. Komponentgränser ska bestämmas efter faktisk implementation, inte bara dokumentation.

### C. Generella innehållsprimitives

För unika tekniska block som återkommer sporadiskt:

- `StatGrid`
- `FactStrip`
- `FeatureGrid`
- `DataTable`
- `ImageGallery`
- `Callout`
- `ProcessFlow`

Dessa ska vara datadrivna och visuellt standardiserade, men inte tvinga varje sida att använda samma innehållsordning.

## Rekommenderad layoutarkitektur

```text
src/
├── layouts/
│   └── SiteLayout.astro
├── components/
│   ├── site/
│   │   ├── SeoHead.astro
│   │   ├── Breadcrumbs.astro
│   │   ├── PageHero.astro
│   │   ├── PageCTA.astro
│   │   └── FaqList.astro
│   ├── content/
│   │   ├── FactStrip.astro
│   │   ├── StatGrid.astro
│   │   ├── FeatureGrid.astro
│   │   ├── DataTable.astro
│   │   ├── ImageGallery.astro
│   │   └── Callout.astro
│   ├── reference/
│   │   ├── ReferenceFacts.astro
│   │   ├── ReferenceSummary.astro
│   │   └── ReferenceRelated.astro
│   └── environment/
│       ├── EnvironmentSolutions.astro
│       ├── EnvironmentReferences.astro
│       └── EnvironmentServices.astro
```

Detta är målbild, inte krav på att exakt varje fil måste finnas. Undvik mikroskopiska komponenter utan återanvändningsvärde.

## SEO-arkitektur

SEO bör genereras från data via en gemensam komponent eller layout.

Gemensamt:

- site name
- canonical base
- locale
- organization/publisher
- favicon
- default robots
- Open Graph-grundfält
- Twitter-grundfält
- BreadcrumbList
- WebPage

Sidtyp styr extra schema:

- `reference` → Article/CaseStudy-liknande representation där Schema.org-stöd är korrekt
- `environment` → Service/WebPage
- `service` → Service/WebPage
- FAQ endast när synlig FAQ faktiskt finns på sidan

Schema ska genereras från samma data som den synliga sidan för att undvika drift.

## Breadcrumbs

Breadcrumbs finns både visuellt och som strukturerad data. De ska komma från samma breadcrumb-data och inte skrivas två gånger.

Exempel:

```ts
breadcrumbs: [
  { label: "Start", href: "/" },
  { label: "Referenser", href: "/referenser/" },
  { label: "Minnebergsskolan, Arvika" }
]
```

En komponent renderar HTML och SEO-lagret använder samma data för `BreadcrumbList`.

## Hero

Hero är en stark kandidat för gemensam primitive med kontrollerade varianter:

- eyebrow
- title
- lead
- image
- imageAlt
- primary CTA
- secondary CTA
- variant / sidtyp

Tillåt inte godtyckliga hero-varianter per sida utan designbeslut.

## FAQ

FAQ-innehåll ska vara strukturerad data. Samma data ska rendera:

1. den synliga FAQ:n
2. eventuell FAQPage structured data när den är lämplig

Det eliminerar dagens dubbla manuella innehåll.

## Referensregistret

`src/data/referenser.ts` visar att projektet redan har börjat separera data från presentation för referensöversikten. `ReferenceCard.astro` konsumerar typed data och är därför ett bra exempel på önskad riktning.

Problemet är att samma referensinformation i nuläget behöver underhållas separat mellan registerkortet och den individuella referenssidans markup/metadata.

Fas 3 ska därför utreda hur en referenspost kan bli gemensam sanningskälla för både:

- individuell sida
- referensindex/filter
- metadata/schema
- relaterade referenser

## Antimönster som ska bort gradvis

- full `<html><head><body>` duplicerad per standardsida
- Google Fonts-länk kopierad per sida
- favicon-markup kopierad per sida
- organization-schema kopierat per sida
- breadcrumbs skrivna separat i HTML och JSON-LD
- FAQ-frågor skrivna separat i HTML och JSON-LD
- återkommande komponent-CSS i lokala `<style>`-block
- unika klassnamn för visuellt identiska komponenter
- hardcoded `www.avab.eu`

## Vad ska fortfarande få vara unikt?

En sida får ha unikt:

- text
- bilder
- data/fakta
- ordning av tillåtna innehållsblock när sidtypen medger det
- verkligt projektspecifika tekniska presentationer via standardiserade primitives

En standardsida ska normalt inte ha unik:

- header/footer
- canonical-logik
- organization-schema
- breadcrumb-rendering
- grundhero-CSS
- grund-FAQ-CSS
- CTA-system
- kortsystem
- typografisystem

## Pilotordning

1. Referenser
2. Miljöer
3. Tjänster
4. Kunskap

Referenser först eftersom både `ReferenceCard.astro` och `src/data/referenser.ts` redan visar datadriven arkitektur och eftersom referensstandarden nu är definierad.

## Exit criterion – Fas 2

Fasen är klar när:

- gemensamma komponentkandidater är identifierade
- sidtypsspecifika komponentkandidater är identifierade
- verkligt unika block är separerade från duplicerad design
- SEO/schema-centralisering är beslutad som målbild
- breadcrumbs och FAQ har definierats som single-source data
- referenser är vald som första implementationspilot
- nästa fas kan definiera schema/content model utan att gissa layoutansvar

Alla kriterier ovan är uppfyllda i denna inventering.