# AVAB – content model

**Status:** Active  
**Owner:** AVAB-projektet  
**Scope:** Strukturerat innehåll för standardiserade sidtyper  
**Last reviewed:** 2026-08-17

## Syfte

Content model skiljer sidans innehåll från dess presentation. Standarder beskriver vad en sida ska kommunicera; content collections och schema definierar vilka data som krävs för att rendera detta konsekvent.

## Teknisk implementation

Projektet kör Astro 6.4.7 och använder Astro Content Collections för referenspiloten.

- Collection-konfiguration: `src/content.config.ts`
- Referensdata: `src/content/references/`
- Gemensam rendering: `src/components/references/ReferencePage.astro`
- Pilot: `src/content/references/minnebergsskolan-arvika.json`
- Befintlig URL behålls via en tunn routefil under `src/pages/referenser/<slug>/index.astro` under migrationsperioden.

Astro-schemat validerar entry-data vid build. En referens som saknar obligatoriska fält eller har ogiltig slug ska därför inte kunna passera normal build.

## Referensmodell – Active

### Identitet och publicering

```text
pageType: reference
status: draft | published
slug
title
shortTitle
eyebrow
summary
featured
publishedDate
updatedDate?
completedYear?
```

### Kund och plats

```text
customer.publicDisplay
customer.publicationApproved
location.publicDisplay
```

### Klassificering

```text
environments[]
technologies[]
```

Dessa identifierare ska följa samma taxonomi som referensöversikten tills taxonomin senare centraliseras.

### Uppdrag

```text
role
scope
needs
responsibility
result
facts[]
scopeItems[]
detailSections[]
```

`detailSections` är strukturerade textblock och får inte innehålla fri HTML eller CSS-konfiguration.

### Bilder

```text
heroImage.src
heroImage.alt
heroImage.caption?
gallery[].src
gallery[].alt
gallery[].caption?
```

Bildvägar ska vara publika paths som börjar med `/`. Alt-text valideras som obligatorisk för alla bilder i modellen.

### FAQ

```text
faq[].question
faq[].answer
```

Samma FAQ-data används av både synlig FAQ och FAQPage structured data. Separat kopia av FAQ-schema ska inte skrivas i contentfilen.

### Relationer

```text
relatedServices[].label
relatedServices[].href
relatedReferences[]
```

Relationer använder interna paths/sluggar, inte kopierad markup.

### SEO

```text
seo.title
seo.description
seo.noindex
```

Canonical skrivs inte i contentfilen. Den genereras som `https://avab.eu` + `slug` i den gemensamma referenskomponenten.

## En datakälla per referens

När en referens finns i content collection ska collection-entry vara primär källa för både detaljsidan och dess referenskort.

Under stegvis migration finns äldre poster kvar i `src/data/referenser.ts`. `ReferenceCard.astro` försöker därför först läsa en content-entry med samma slug och använder den när den finns. Legacy-posten används endast som fallback för ännu omigrerade referenser.

När alla referenser är migrerade ska fallback-registret avvecklas eller reduceras till central taxonomi om det fortfarande behövs.

## Presentation får inte läcka in i modellen

Contentfiler får inte innehålla:

- CSS-klasser som styr unik layout
- färgkoder
- pixelvärden
- antal gridkolumner
- HTML-fragment för standardsektioner
- duplicerad JSON-LD
- canonical-URL

Sådant hör hemma i komponenter, layout och designsystem.

## Migreringsregel

Migrera en referens i taget:

1. skapa validerad entry i `src/content/references/`
2. mappa allt relevant befintligt innehåll utan att ändra URL
3. gör routefilen till tunn collection-loader
4. verifiera att referenskortet använder samma entry
5. kör build och visuell regression
6. ta först därefter bort eventuell legacy-data som inte längre behövs

## Pilotstatus

Minnebergsskolan är första implementerade pilot. Den bevisar content collection + schema + gemensam rendering + samma data i referenskortet.

Piloten är inte mall för att massmigrera resterande referenser utan regressionstest. Nästa referenser ska migreras stegvis efter att pilotens rendering granskats.
