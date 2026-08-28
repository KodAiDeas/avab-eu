# Dokumentmigration – AVAB

**Status:** Active  
**Last reviewed:** 2026-08-17

Detta dokument följer dokumentmigreringen i AI Content System-projektet. `TODO.md` är fortfarande enda levande listan för öppet arbete.

## Fas 1 – genomförda migrationer

| Tidigare fil | Tidigare typ | Ny canonical plats | Status |
|---|---|---|---|
| `src/docs/AVAB-standard-mobil.md` | Mobilstandard | `docs/standards/global/mobile.md` | Migrerad; gammal fil Deprecated |
| `src/docs/AVAB-mobilinventering.md` | Workflow/QA | `docs/workflows/mobile-qa.md` | Migrerad; gammal fil Deprecated |
| `src/docs/AVAB-standard-referensprojekt.md` | Blandad standard/arkitektur/mall | `docs/standards/pages/reference.md` + `docs/architecture/content-model.md` | Konsoliderad; gammal fil Deprecated |
| `src/docs/avab-design-referenssida-inkopare.md` | Designkoncept | `docs/standards/pages/reference.md` | Relevanta principer konsoliderade; gammal fil Deprecated |

Historiskt innehåll behöver inte dupliceras i `docs/archive/` enbart för säkerhets skull; Git-historiken bevarar tidigare versioner. Arkiv används bara när ett gammalt dokument fortfarande behöver läsas som sammanhållen historisk kontext.

## Konflikter som lösts

### Referenser vs referensprojekt

Canonical publik terminologi är nu **Referenser** och canonical route-familj är `/referenser/`. Nya standarder använder inte `/referensprojekt/`.

### Root README vs målarkitektur

Den tidigare root-`README.md` instruerade att nya sidor skulle få unik text/HTML direkt i varje `index.astro`. README är nu omskriven så att målriktningen är strukturerat innehåll/data + delade templates/components, samtidigt som faktisk nuvarande implementation fortfarande verifieras i kod.

### Standard vs koncept

Referensens tekniska arkitekturprincip och designkonceptets inköparfokuserade informationshierarki är nu sammanförda i `docs/standards/pages/reference.md`. Tekniska schema-/content model-frågor ligger separat i `docs/architecture/content-model.md`.

## Aktiv canonical dokumentation efter Fas 1

### Standarder

- `docs/standards/global/mobile.md`
- `docs/standards/pages/reference.md`

### Workflows

- `docs/workflows/ai-page-authoring.md`
- `docs/workflows/mobile-qa.md`

### Arkitektur

- `docs/architecture/documentation-rules.md`
- `docs/architecture/page-types.md`
- `docs/architecture/ai-write-scope.md`
- `docs/architecture/content-model.md` – Draft till Fas 3

### Projekt

- `docs/projects/ai-content-system/README.md`
- `docs/projects/ai-content-system/phase-0-audit.md`
- detta dokument

## Repo-hygien – separat migreringsspår

Fas 0 identifierade även material som kan förvirra AI och belasta repot:

- `index-gammal.astro`
- filer med `trasig`, `pre`, `ful` eller liknande arbetsnamn
- `index.txt` / `index2.txt`
- preview-HTML
- flera stora zip-arkiv i repo-root
- dubbletter som `SiteHeader1.astro` / `SiteFooter1.astro`

Dessa har **inte** massraderats i Fas 1. Före borttagning ska aktiva imports, routes och eventuell unik källinformation verifieras. Git ska därefter vara historiken i stället för parallella filkopior.

## Kvarvarande dokumentarbete

Följande standarder finns ännu inte som Active och ska skapas först när reglerna är verifierade och behövs:

- environment
- service
- knowledge
- global SEO
- accessibility
- images
- bredare design-systemstandard

Skapa inte tomma placeholder-dokument bara för att fylla en mappstruktur.

## Fas 1 exit criterion

Fas 1 kan anses dokumentmässigt klar när:

- root README pekar rätt
- aktiva standarder/workflows indexeras av `docs/README.md`
- äldre `src/docs` är Deprecated och pekar på canonical efterföljare
- aktiva instruktioner/TODO inte längre länkar till gamla standarder som gällande källa
- en ny AI-session kan börja i `AGENTS.md` + `docs/README.md` och entydigt hitta rätt regel

Nästa arkitektursteg är Fas 2: inventera faktiska återkommande komponenter/sektioner och definiera vilka delar som ska centraliseras i kod innan content-schema implementeras.
