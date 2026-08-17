# Fas 3 – Content model och referenspilot

**Status:** Implemented, pending/with build verification as noted below  
**Date:** 2026-08-17

## Mål

Bevisa att en AVAB-referens kan drivas av validerad strukturerad data i stället för en stor unik `index.astro`, utan att ändra den publika URL:en.

## Implementerat

### Astro Content Collection

`src/content.config.ts` definierar collectionen `references` med Astro 6:s `glob()` loader och Zod-schema.

Schemat validerar bland annat:

- sidtyp och publiceringsstatus
- canonical route-format för `/referenser/<slug>/`
- titel, sammanfattning och SEO
- kund/publiceringsgodkännande och plats
- miljöer och tekniker
- uppdragets behov, ansvar och resultat
- faktarader och strukturerade innehållsblock
- hero/galleri med alt-text
- FAQ
- relaterade tjänster och referenser

### Pilotdata

`src/content/references/minnebergsskolan-arvika.json` är första riktiga entryn.

Innehållet är mappat från den tidigare Minnebergssidan och innehåller kärnfakta om:

- skola för 900 elever
- klassrum/lärarrum
- 20 hörsalar
- 18 informationsskärmar
- hörslingor
- aula med Crestron, DMX och Dante
- FAQ och SEO

### Gemensam referensrendering

`src/components/references/ReferencePage.astro` renderar:

- canonical SEO och social metadata
- Article/WebPage/Breadcrumb/FAQ JSON-LD
- breadcrumbs
- hero
- fakta
- behov / AVAB:s ansvar / resultat
- leveransomfattning
- teknisk fördjupning
- galleri när fler bilder finns
- FAQ
- relaterade tjänster
- CTA

Canonical genereras alltid från `https://avab.eu` + content-entryns slug.

### Tunn route

`src/pages/referenser/minnebergsskolan-arvika/index.astro` är reducerad till en tunn route-loader som:

1. hämtar `minnebergsskolan-arvika` via `getEntry()`
2. stoppar build tydligt om entryn saknas
3. skickar data till `ReferencePage.astro`

Den publika URL:en är oförändrad.

### Samma data till referenskortet

`ReferenceCard.astro` använder under migrationen legacy-registret som lista över befintliga referenser, men försöker läsa en content-entry från sluggen. Finns en entry används dess data för kortets titel, bild, alt, sammanfattning, filter och featured-status.

Detta gör Minneberg till första referensen där samma content-entry driver både detaljsida och kortdata.

## Arkitekturval

### Content Collections valdes framför en ny ren TypeScript-registry

Skäl:

- inbyggd schema-validering
- genererade TypeScript-typer
- standard-API med `getEntry()`/`getCollection()`
- lokala JSON/YAML/Markdown-källor kan användas utan nytt CMS
- tydlig framtida väg till dynamisk route efter att alla legacy-sidor migrerats

### Stegvis migration valdes framför en enda `[...slug].astro` nu

Det minskar risken att gamla routes eller specialinnehåll försvinner. Varje referens kan migreras, jämföras och godkännas innan nästa tas.

## Guardrail som drogs fram från Fas 5

Befintlig GitHub Action kör endast deploy vid push till `main`. En separat `.github/workflows/validate-pr.yml` har därför lagts till för PR-build utan deployment.

Detta är avsiktligt: en AI-branch ska kunna bevisa att Astro bygger innan merge utan att testmiljön skrivs över.

## Kvar innan massmigrering

- visuell jämförelse av Minnebergspiloten mot önskad referensstandard på desktop och mobil
- verifiera att allt viktigt innehåll från den tidigare långa sidan är representerat eller medvetet omprioriterat
- kontrollera buildstatus för PR-workflow
- därefter migrera ytterligare 1–2 olika referenstyper före full utrullning

## Exit criterion

Fas 3 är tekniskt godkänd när PR-build passerar med collection/schema/pilot och Minneberg renderas från structured content utan unik fullsidelayout. Visuellt godkännande är en separat regression innan massmigrering.
