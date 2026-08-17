# AVAB – dokumentationsnav

Detta är den officiella ingången till AVAB-projektets dokumentation.

Målet är att människor, ChatGPT, Claude, Codex och andra AI-agenter ska kunna hitta rätt regel utan att läsa hela repot eller gissa vilken fil som gäller.

## Dokumenthierarki

När instruktioner överlappar gäller följande ordning, högst prioritet först:

1. användarens uttryckliga instruktion för aktuell uppgift
2. `AGENTS.md` / relevant agentspecifik instruktion
3. Active-standard i `docs/standards/`
4. Active-workflow i `docs/workflows/`
5. arkitekturbeslut i `docs/architecture/`
6. projektspecifikationer i `docs/projects/`
7. Deprecated äldre dokument endast som migrations-/historikkälla
8. Archived dokument

Om två gällande dokument motsäger varandra ska AI inte välja tyst. Konflikten ska flaggas och vid behov läggas under `Behöver beslut` i `TODO.md`.

## Aktiva startpunkter

### Globala standarder
- [`standards/global/mobile.md`](standards/global/mobile.md) – mobil/responsiv UI för alla publika sidor.

### Sidstandarder
- [`standards/pages/reference.md`](standards/pages/reference.md) – canonical standard för alla referenser under `/referenser/`.

### AI-workflows
- [`workflows/ai-page-authoring.md`](workflows/ai-page-authoring.md) – **router och gemensamt startflöde** för alla nya/ändrade publika sidor.
- [`workflows/create-reference.md`](workflows/create-reference.md) – skapa eller migrera `reference`; använder implementerad content collection.
- [`workflows/create-standard-page.md`](workflows/create-standard-page.md) – skapa `environment`, `service` eller `knowledge` utan att låtsas att schema/template finns när de ännu saknas.
- [`workflows/modify-existing-page.md`](workflows/modify-existing-page.md) – ändra befintlig sida med minsta korrekta scope.
- [`workflows/special-page-change.md`](workflows/special-page-change.md) – ändra startsida, kontakt och andra `special`-routes.
- [`workflows/mobile-qa.md`](workflows/mobile-qa.md) – inventering, prioritering och verifiering av mobil UI.

### Arkitektur
- [`architecture/documentation-rules.md`](architecture/documentation-rules.md) – dokumenthierarki och livscykel.
- [`architecture/page-types.md`](architecture/page-types.md) – officiell sidtypskarta + routing till workflows.
- [`architecture/ai-write-scope.md`](architecture/ai-write-scope.md) – vad en normal innehållsagent får och inte får ändra.
- [`architecture/content-model.md`](architecture/content-model.md) – gemensam content-riktning; faktisk kod är sanningskälla för implementerade schemas.
- [`architecture/component-architecture.md`](architecture/component-architecture.md) – målbild för gemensamma layouts, sidtypskomponenter och primitives.

### Pågående projekt
- [`projects/ai-content-system/README.md`](projects/ai-content-system/README.md) – fasplanen för AI-baserat innehållssystem.
- [`projects/ai-content-system/phase-0-audit.md`](projects/ai-content-system/phase-0-audit.md) – nulägesinventering och risker.
- [`projects/ai-content-system/phase-2-component-audit.md`](projects/ai-content-system/phase-2-component-audit.md) – faktisk duplicering och komponentkandidater.
- [`projects/ai-content-system/phase-4-workflows.md`](projects/ai-content-system/phase-4-workflows.md) – workflow-kontrakt och deterministiska exempel.
- [`projects/ai-content-system/document-migration-map.md`](projects/ai-content-system/document-migration-map.md) – dokumentmigrationsstatus.

## Struktur

```text
docs/
├── README.md
├── standards/
│   ├── global/
│   └── pages/
├── workflows/
├── architecture/
├── projects/
└── archive/
```

### `standards/`
Normativa regler för hur AVAB ska byggas och fungera. En standard beskriver **vad som gäller**, inte en tillfällig arbetsplan.

### `workflows/`
Steg-för-steg-flöden för återkommande arbete.

### `architecture/`
Tekniska principer, content model, komponentansvar, dokumentationsregler och beslut som påverkar flera delar av systemet.

### `projects/`
Avgränsade förändringsprojekt. Öppet arbete representeras fortfarande i `TODO.md`.

### `archive/`
Historik med fortsatt dokumentationsvärde. Git används annars som primär historik.

## Single source of truth

- `TODO.md` är enda levande listan för öppna arbetsuppgifter.
- `docs/README.md` är navigationsnav och regelhierarki.
- `docs/standards/` är sanningskälla för gällande standarder.
- Kod och komponenter är sanningskälla för faktisk implementation.

Markdown ska inte användas för att duplicera implementation som kan göras säkrare i delade komponenter, schemas eller tester.

## Route efter sidtyp och uppgift

AI ska börja i `docs/workflows/ai-page-authoring.md` och först klassificera **sidtyp + uppgiftstyp**.

Exempel:

```text
ny referens
→ pageType: reference
→ task: create
→ workflows/create-reference.md
→ standards/pages/reference.md
→ faktisk content collection/schema
```

```text
ny miljösida
→ pageType: environment
→ task: create
→ workflows/create-standard-page.md
→ kontrollera om environment-standard/schema/template faktiskt finns
```

```text
ändra befintlig sida
→ task: modify
→ workflows/modify-existing-page.md
→ sidtypens faktiska implementation
```

Läs inte hela dokumentträdet för varje uppgift.

## Implementation kontra målbild

Ett Active-workflow kan beskriva hur AI ska agera även innan alla sidtypers schemas/templates är implementerade. Det är **inte** samma sak som att tekniken redan finns.

I nuläget är Referens första fullt implementerade structured-content-pilot. Miljö/Tjänst/Kunskap ska följa samma workflow-principer men får inte automatiskt få duplicerade fullsidiga Astro-filer för att fylla ett arkitekturgap.

## Namnkonvention

Använd små bokstäver och kebab-case för nya dokument. Undvik `ny`, `gammal`, `final`, `version2`, `trasig` eller datum i filnamn. Historik hanteras av Git.

## Statusfält

Större standarder och projekt bör börja med:

```text
Status: Draft | Active | Deprecated | Archived
Owner: ...
Last reviewed: YYYY-MM-DD
Replaces: ...
```

Endast Active-standarder ska betraktas som gällande normativ regel om inte annat uttryckligen anges.

## Äldre `src/docs/`

De fyra tidigare dokumenten i `src/docs/` är markerade **Deprecated** och pekar på sina efterföljare i `docs/`. De ska inte användas som gällande regel. Historiskt innehåll finns i Git-historiken.
