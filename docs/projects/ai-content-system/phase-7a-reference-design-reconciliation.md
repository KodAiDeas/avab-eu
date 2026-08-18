# Fas 7A – Designförsoning för Referenser

**Status:** Active blocker before further migration  
**Owner:** AVAB-projektet  
**Branch:** `agent/ai-content-system`  
**Design baseline:** `https://test2.avab.eu/referenser/minnebergsskolan-arvika/`  
**Last reviewed:** 2026-08-18

## Beslut

Minnebergsskolans live-version på `test2.avab.eu` är visuell source of truth för hur AVAB:s referenssidor ska upplevas under Fas 7.

`agent/ai-content-system` är samtidigt source of truth för den nya tekniska arkitekturen: structured content, Astro Content Collections, Zod-schema, AI-workflows, guardrails och PR-flöde.

Fas 7 får därför inte välja mellan designen och arkitekturen. Målet är att förena dem:

`structured content -> gemensam ReferencePage/components -> Minneberg-designens visuella språk`

## Varför Fas 7A behövs

Den första generiska `ReferencePage.astro` blev tekniskt ren och byggbar men förenklade bort för många bärande delar av den godkända Minneberg-designen. Det gav en visuell regression trots grön CI.

Detta visar att build/schema inte räcker som migrationsbevis. Designparitet måste vara ett explicit gate-villkor före fortsatt massmigrering.

## Designkontrakt från Minneberg

Den gemensamma referensarkitekturen ska kunna uttrycka följande återkommande mönster utan sidspecifik fullsidig CSS/markup:

1. Breadcrumbrad under header.
2. Hero med bakgrundsbild, eyebrow, tydlig H1, ingress och kontrollerade CTA:er.
3. Helbredds faktaband direkt efter hero.
4. Växlande ljusa/neutrala sektioner för rytm.
5. Intro/leveranssektion med rubrik, lead, brödtext och scope-kort.
6. Tvåkolumnssektioner med text + bild, samt möjlighet att spegelvända ordningen.
7. Flow-/stegkort när processen behöver förklaras.
8. Snippet/AEO-rutor som kompletterande kort svar, inte som separat sidmall.
9. Metrics/proof-strips för verifierade nyckeltal.
10. Bildgalleri med kontrollerade spännvidder/format och captions.
11. Tekniska specialblock, exempelvis signalflöde, endast när de bygger på en generell blocktyp.
12. Tvåkolumns FAQ på desktop och en kolumn på mobil.
13. Fullbredds avslutande CTA med primär handling, sekundär länk och stödjande lista.
14. Konsekvent alignment i överkant för text, rubriker, bilder och kort på desktop.
15. Innehållsdriven höjd; equal-height får inte skapa stora tomma bottenytor.
16. Enkolumnsflöde på mobil för innehålls-/kortblock som standard.

## Vad som inte ska kopieras rakt av

Följande i legacy/pilotsidan ska inte bli normal authoring-modell:

- hårdkodad Minneberg-text i `ReferencePage`
- projektspecifika klassnamn som kräver unik CSS per referens
- manuellt duplicerad SEO/schema
- manuellt duplicerade breadcrumbs
- `www.avab.eu` som canonical källa
- placeholders eller tillfälliga kommentarer som permanent struktur
- unika blocktyper som bara finns för att imitera ett enda projekt

## Arkitekturprincip för implementation

Minsta gemensamma uppsättning återanvändbara block ska användas. Schema får utökas när en verklig återkommande designfunktion saknas, men inte med ett fält per Minneberg-sektion.

Föredragen blockfamilj:

- `intro`
- `cardGrid`
- `mediaText`
- `metrics`
- `steps`
- `snippet`
- `gallery`
- `flow`
- `faq`
- `cta`

Varje blocktyp ska ha kontrollerade varianter i renderer/components. Content får inte bära godtyckliga CSS-klasser eller fri HTML för layout.

## Genomförandeordning

1. Kartlägg Minneberg-pilotens sektioner mot generiska blocktyper.
2. Uppdatera content model/schema endast för återkommande behov som saknas.
3. Bygg/återanvänd delade referenskomponenter för blocken.
4. Gör `ReferencePage.astro` till orkestrerare, inte mega-komponent med projektspecifik logik.
5. Mappa Minnebergs structured content till den nya blockmodellen.
6. Verifiera `npm run validate`.
7. Gör visuell jämförelse mot live-baslinjen på desktop och mobil.
8. När Minneberg är visuellt godkänd: testa Säffle, Hanza och Sörby som variationsprov.
9. Fortsätt resterande referenser först när dessa tester visar att modellen generaliserar.

## Exit criterion för Fas 7A

Fas 7A är klar när:

- Minneberg renderas via structured content + gemensamma komponenter,
- layouten visuellt följer live-baslinjen,
- inga sidspecifika fullsidestyles krävs i route/content,
- canonical/metadata/schema kommer från den nya arkitekturen,
- desktop och mobil är granskade,
- `npm run validate` passerar,
- minst två ytterligare representativa referenser kan använda samma blockmodell utan specialhack.

Först därefter återupptas massmigreringen i Fas 7.
