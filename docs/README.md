# AVAB – dokumentationsnav

Detta är den officiella ingången till AVAB-projektets dokumentation.

Målet är att människor, ChatGPT, Claude, Codex och andra AI-agenter ska kunna hitta rätt regel utan att läsa hela repot eller gissa vilken fil som gäller.

## Dokumenthierarki

När instruktioner överlappar gäller följande ordning, högst prioritet först:

1. Användarens uttryckliga instruktion för den aktuella uppgiften.
2. `AGENTS.md` / relevant agentspecifik instruktion.
3. Gällande standard i `docs/standards/`.
4. Gällande workflow i `docs/workflows/`.
5. Arkitekturbeslut i `docs/architecture/`.
6. Projektspecifikationer i `docs/projects/`.
7. Äldre dokument i `src/docs/` under migrationsperioden.
8. Arkiverade dokument.

Om två gällande dokument motsäger varandra ska AI:n inte välja tyst. Konflikten ska flaggas och vid behov läggas under `Behöver beslut` i `TODO.md`.

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
Steg-för-steg-flöden för återkommande arbete, exempelvis skapa ny referens, modifiera befintlig sida eller genomföra mobil-QA.

### `architecture/`
Tekniska principer, content model, komponentansvar, dokumentationsregler och andra beslut som påverkar flera delar av systemet.

Aktiva arkitekturdokument:

- `docs/architecture/documentation-rules.md` – hur dokumentation klassificeras och prioriteras.
- `docs/architecture/page-types.md` – officiella sidtyper och routing för AI.
- `docs/architecture/ai-write-scope.md` – vilka filer en innehållsagent normalt får respektive inte får ändra.

### `projects/`
Avgränsade förändringsprojekt med mål, faser, status, beroenden och Definition of Done. Projektens öppna arbete ska fortfarande representeras i `TODO.md`; projektdokumentet ersätter inte TODO.

Aktuellt projekt:

- `docs/projects/ai-content-system/README.md`
- `docs/projects/ai-content-system/phase-0-audit.md`
- `docs/projects/ai-content-system/document-migration-map.md`

### `archive/`
Historik och ersatta dokument. Arkiverade filer är inte gällande standard.

## Single source of truth

- `TODO.md` är enda levande listan för öppna arbetsuppgifter.
- `docs/README.md` är index och regelhierarki för dokumentationen.
- `docs/standards/` är sanningskälla för gällande standarder.
- Kod och komponenter är sanningskälla för faktisk implementation.

Markdown ska inte användas för att duplicera implementation som kan göras ofelbar i delade komponenter, schemas eller tester.

## Namnkonvention

Använd små bokstäver och kebab-case för nya dokument:

- `reference.md`
- `mobile.md`
- `create-reference.md`
- `content-model.md`

Undvik nya filer med ord som `ny`, `gammal`, `final`, `version2`, `trasig` eller datum i filnamnet. Historik hanteras av Git.

## Statusfält

Större standarder och projekt bör börja med:

```text
Status: Draft | Active | Deprecated | Archived
Owner: ...
Last reviewed: YYYY-MM-DD
Replaces: ...
```

Endast dokument med `Status: Active` ska betraktas som gällande standard, om inte annat uttryckligen anges.

## Pågående migration

Dokument under `src/docs/` migreras kontrollerat inom projektet `docs/projects/ai-content-system/README.md`. De ska inte massraderas innan innehåll, länkar och TODO-referenser har inventerats.

Fas 0-baseline är dokumenterad i `docs/projects/ai-content-system/phase-0-audit.md`. Nästa migrationssteg är Fas 1: göra den nya dokumentstrukturen till enda entydiga aktiva struktur innan template-/content-model-refaktor börjar.