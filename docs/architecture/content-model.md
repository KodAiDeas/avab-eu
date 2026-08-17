# AVAB – content model

**Status:** Draft  
**Owner:** AVAB-projektet  
**Scope:** Strukturerat innehåll för standardiserade sidtyper  
**Last reviewed:** 2026-08-17

## Syfte

Detta dokument skiljer innehållsmodell från sidstandard och visuell implementation. Sidstandarder beskriver **vad sidan måste kommunicera**. Content model beskriver **vilka strukturerade fält som behövs för att systemet ska kunna rendera och validera detta konsekvent**.

Exakt implementation fastställs i Fas 3 efter kontroll mot aktuell Astro-version och befintlig kod. Projektet använder i nuläget Astro 6.4.7.

## Principer

- Content och presentation ska separeras där det ger tydlig nytta.
- Normalt sidinnehåll ska kunna ändras utan global CSS eller component edits.
- Obligatoriska fält ska valideras automatiskt där praktiskt möjligt.
- Fält som styr layout ska vara få, kontrollerade och helst enums/booleans framför fri CSS-liknande konfiguration.
- URL/slug, SEO, bilder och relationer ska ha gemensamma regler.
- En ny content model får inte skapa ett parallellt system utan migrationsplan för befintliga sidor.

## Gemensamma fält – kandidat

Följande är en första normaliserad modell, inte ännu ett låst schema:

```text
pageType
slug
status
title
summary
seo.title
seo.description
hero.image
hero.alt
relatedItems
```

`status` bör minst kunna skilja draft/publicerad. Exakta fältnamn bestäms vid implementation och ska sedan vara stabila.

## Referenser – pilot

Referenser är första pilot eftersom repot redan har `ReferenceCard.astro`, `src/data/referenser.ts` och många individuellt kodade referenssidor.

Kandidatgrupper:

### Identitet

```text
slug
title
shortTitle
summary
category/environment
featured
```

### Publicering

```text
status
publishedDate
updatedDate
completedYear/completedDate
```

### Kund och plats

```text
customer.publicDisplay
customer.publicationApproved
location.publicDisplay
```

Exakt kundnamn ska vara separat från offentlig visning så att publiceringsgodkännande kan hanteras utan att redaktören måste skriva om hela sidan.

### Uppdrag

```text
role
scope
needs
responsibility
result
challenge? 
implementation?
technicalDetails?
```

Fördjupningsfält ska vara valfria. Tomma sektioner ska inte renderas.

### Fakta

```text
environment
projectPeriod?
deliveryForm?
statusLabel?
services[]
products[]?
```

### Bilder

```text
heroImage.src
heroImage.alt
heroImage.caption?
gallery[].src
gallery[].alt
gallery[].caption?
```

### Verifiering

```text
testimonial?
verification?
support?
```

Kundcitat eller kundidentifiering ska ha explicit publiceringsgodkännande där det krävs.

### Relationer

```text
relatedServices[]
relatedReferences[]
```

Relationer bör använda stabila sluggar/identifierare, inte kopierad presentationsmarkup.

### SEO

```text
seo.title
seo.description
seo.noindex?
```

Canonical ska genereras från canonical site `https://avab.eu/` + route, inte skrivas för hand i varje contentfil.

## Vad modellen inte ska innehålla

Undvik fält som egentligen är CSS eller layoutimplementation, exempelvis godtyckliga färgkoder, pixelvärden, grid-kolumner eller HTML-fragment för standardsektioner. Sådana val hör hemma i designsystem/template.

## Nästa beslut i Fas 3

1. verifiera hur Astro 6 content collections passar nuvarande projekt
2. jämför content collection mot typed TypeScript-data för referenspiloten
3. inventera `src/data/referenser.ts` och faktisk användning
4. mappa Minnebergsskolan och ytterligare 1–2 representativa referenser till modellen
5. definiera schema och dynamic route/template
6. definiera migration utan URL-förändringar
7. validera bildreferenser, alt, slug och metadata i build

## Stopregel

Detta Draft-dokument får inte användas som bevis för att content collections redan är implementerade. Faktisk kod är sanningskälla för implementation tills Fas 3 är genomförd.
