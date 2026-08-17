# AVAB Astro-projekt

Detta repo innehåller AVAB:s webbplats i Astro.

## Snabbstart

```sh
npm run dev
npm run build
npm run preview
```

## Viktigaste startpunkterna

- `AGENTS.md` – regler för AI-agenter och arbetsdisciplin.
- `CLAUDE.md` – motsvarande instruktioner för Claude.
- `docs/README.md` – officiellt dokumentationsnav och regelhierarki.
- `TODO.md` – projektets enda levande att-göra-lista.

Vid större arbete: börja i `docs/README.md`, klassificera uppgiften och läs endast relevant Active-standard/workflow.

## Projektkarta

| Område | Plats | Ansvar |
|---|---|---|
| Publika routes | `src/pages/` | Nuvarande Astro-routes. Befintliga sidor kan fortfarande innehålla äldre kopierad markup under migration. |
| Delade komponenter | `src/components/` | Återkommande UI och sidprimitives. |
| Layouts | `src/layouts/` | Gemensamma layouts där de används. |
| Global design | `src/styles/avab.css` | Projektets huvudsakliga globala stylesheet. |
| Data | `src/data/` | Strukturerad data som används av nuvarande implementation. |
| Dokumentation | `docs/` | Gällande standarder, workflows, arkitektur och projektplaner. |
| Äldre dokument | `src/docs/` | Migrationskälla; behandlas inte automatiskt som gällande standard. |
| Publika assets | `public/` | Bilder, ikoner och andra statiska filer. |

## Arkitekturprincip för nya standardsidor

Nya standardiserade innehållssidor ska **inte** skapas genom att kopiera en hel befintlig `index.astro` och bygga om HTML/CSS sida för sida.

Målriktningen är:

```text
strukturerat innehåll/data
        ↓
schema/validering
        ↓
delad template/komponenter
        ↓
publik route
```

Det gör att design, SEO, metadata, responsivitet och gemensamma sektioner kan ändras centralt.

Denna arkitektur migreras stegvis. Faktisk kod är alltid sanningskälla för vad som redan är implementerat; dokumentation får inte användas för att låtsas att en framtida modell redan finns.

## Sidtyper

Den officiella sidtypskartan finns i:

`docs/architecture/page-types.md`

Minst följande typer används som arbetsmodell:

- reference
- environment
- service
- knowledge
- listing
- special

Referenser är första pilot för strukturerat innehåll.

## AI och innehållsarbete

Normal sidredigering ska följa:

`docs/workflows/ai-page-authoring.md`

AI ska i första hand ändra innehåll/data. Ändringar i exempelvis `src/components/`, `src/layouts/`, `src/styles/`, build/config eller schemas räknas som arkitektur-/utvecklingsarbete och får inte smygas in i en vanlig innehållsuppgift.

Scope-regler finns i:

`docs/architecture/ai-write-scope.md`

## Canonical domän

AVAB:s canonical domän är:

```text
https://avab.eu/
```

`www` är endast alias/redirect och ska inte introduceras som canonical källa i nya metadata, schema eller interna absoluta webbplats-URL:er.

## Mobil och responsivitet

Gällande mobilstandard:

`docs/standards/global/mobile.md`

QA-workflow:

`docs/workflows/mobile-qa.md`

Återkommande problem ska lösas globalt eller i delad komponent innan sidspecifika patchar används.

## Viktiga repo-regler

- GitHub är gemensam sanningskälla.
- AI-genererade ändringar sker normalt på branch + PR, inte direkt till `main`.
- Git ska vara historiken; skapa inte nya arbetskopior med namn som `gammal`, `ny`, `final2` eller `trasig`.
- Äldre `.txt`, preview-filer, zip-backuper och alternativa Astro-filer kan finnas kvar från tidigare arbete. De ska inte antas vara aktiva bara för att de ligger i repot.
- Radera inte sådant material utan verifiering av imports, routes och användning.
- Kör `npm run build` före godkännande av kodändringar.

## Dokumentationsprincip

En regel ska ha en primär hemvist. Länka till gällande standard i stället för att kopiera samma regel till flera markdownfiler.

Se `docs/architecture/documentation-rules.md` för full regelhierarki.
