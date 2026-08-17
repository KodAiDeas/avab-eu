# Dokumentmigration – AVAB

**Status:** Draft  
**Last reviewed:** 2026-08-17

Detta dokument är arbetsunderlag för fas 0–1 i AI Content System-projektet. `TODO.md` är fortfarande enda levande listan för öppet arbete.

## Verifierade dokument i nuvarande `src/docs/`

| Nuvarande fil | Typ idag | Bedömning | Målplats | Åtgärd |
|---|---|---|---|---|
| `src/docs/AVAB-standard-mobil.md` | Standard | Gällande | `docs/standards/global/mobile.md` | Migrera, behåll innehåll, uppdatera länkar |
| `src/docs/AVAB-mobilinventering.md` | Workflow/QA-plan | Gällande arbetsflöde | `docs/workflows/mobile-qa.md` | Migrera och uppdatera standardlänk |
| `src/docs/AVAB-standard-referensprojekt.md` | Standard + arkitektur + mall | Delvis gällande, terminologi behöver normaliseras till Referenser | `docs/standards/pages/reference.md` + delar till `docs/architecture/content-model.md` | Dela upp utan att tappa krav |
| `src/docs/avab-design-referenssida-inkopare.md` | Designkoncept | Koncept, inte ensam sanningskälla | relevant material in i `docs/standards/pages/reference.md`; resten archive | Konsolidera och arkivera efter jämförelse |

## Viktiga konflikter/avvikelser att lösa

### Referens vs referensprojekt
Projektets publika språk och URL-struktur använder `Referenser`. Standardfilen heter fortfarande `AVAB-standard-referensprojekt.md` och innehåller exempelstruktur med `/referensprojekt/`. Detta ska normaliseras så dokumentation och faktisk route använder samma terminologi.

### Referensstandarden innehåller flera dokumenttyper
Den befintliga referensstandarden innehåller både:
- redaktionella krav,
- SEO-regler,
- content-model-idéer,
- filstruktur,
- sidordning,
- exempelmall.

Vid migration ska dessa separeras efter ansvar. Sidstandarden ska beskriva vad en referens måste innehålla; content model och teknisk implementation ska ligga under architecture.

### Designkonceptet får inte överstyra tyst
`avab-design-referenssida-inkopare.md` beskriver uttryckligen sig själv som koncept. Relevanta godkända principer kan föras in i Active-standarden först efter jämförelse med nuvarande referenssidor och kundens senaste designbeslut.

## Repo-hygien som bör tas i separat scope

Inventeringen av repository-trädet visar även flera filer som inte är dokumentation men som bör hanteras senare:

- `index-gammal.astro`
- filer med `trasig` i namnet
- `index.txt` / `index2.txt`
- preview-HTML
- zip-arkiv i repository root
- dubbletter som `SiteHeader1.astro` / `SiteFooter1.astro`

Dessa ska inte raderas i dokumentmigrationsfasen utan verifiering. De indikerar dock att samma princip behövs även för kodbasens arkiv/historik: Git ska vara historik, inte filnamn med `gammal`, `ny` eller `trasig`.

## Nästa inventeringssteg

1. Sök efter alla `.md` i hela repot, inte bara `src/docs/`.
2. Sök efter länkar till gamla dokumentnamn i kod, TODO och instruktioner.
3. Klassificera varje dokument: Standard / Workflow / Architecture / Project / Archive.
4. Identifiera överlappande eller motstridiga regler.
5. Migrera en dokumentfamilj i taget och uppdatera alla referenser samtidigt.
6. Radera gamla filer först efter att inga aktiva referenser återstår.

## Stopregel

Ingen gammal standardfil tas bort enbart för att en ny mappstruktur skapats. Migrationen är klar först när innehållet är överfört, interna länkar är uppdaterade och den gamla filen inte längre behövs som sanningskälla.