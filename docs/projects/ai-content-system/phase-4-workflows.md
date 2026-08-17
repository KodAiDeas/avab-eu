# Fas 4 – AI-workflows

**Status:** Complete  
**Owner:** AVAB-projektet  
**Last reviewed:** 2026-08-17

## Mål

Samma användarintention ska routas till samma typ av arbete och samma säkerhetsgränser oavsett om kunden använder ChatGPT, Claude, Codex eller annan AI-agent.

## Workflow-kedja

```text
användarens instruktion
        ↓
ai-page-authoring.md
        ↓
klassificera sidtyp + uppgiftstyp
        ↓
┌────────────────────────────────────────────┐
│ reference → create-reference.md            │
│ environment/service/knowledge              │
│           → create-standard-page.md        │
│ modify    → modify-existing-page.md        │
│ special   → special-page-change.md         │
└────────────────────────────────────────────┘
        ↓
Active standard + faktisk kod/schema
        ↓
content / architecture scope
        ↓
validering → branch → PR
```

## Gemensamt kontrakt mellan AI-klienter

Alla agenter ska:

1. identifiera sidtyp före filredigering,
2. identifiera create/modify/migrate/architecture,
3. läsa bara relevant Active-standard/workflow,
4. verifiera faktisk implementation innan målarkitektur används,
5. återanvända redan given input,
6. bara efterfråga saknade kritiska fakta,
7. aldrig fabricera kund-/projekt-/teknikfakta,
8. hålla contentarbete borta från shared components/CSS/schema som default,
9. använda `https://avab.eu/` som canonical root,
10. validera med schema/build när det finns,
11. lämna ändringen i branch/PR med kvarstående osäkerheter dokumenterade.

## Deterministiska exempel

### Exempel A – ny referens

Input:

> Lägg upp vår nya referens för X. Här är kund, plats, leverans, bilder och resultat.

Förväntad routing:

`reference + create → create-reference.md`

Förväntat resultat:

- kontroll mot reference-standard,
- bara saknade fakta efterfrågas,
- content-entry skapas enligt faktisk collection schema,
- ingen ny lokal CSS,
- route/canonical bevaras/följer standard,
- build/PR validation.

### Exempel B – ny miljösida

Input:

> Vi behöver en ny miljösida för museum.

Förväntad routing:

`environment + create → create-standard-page.md`

Om environment-schema/template ännu saknas:

- AI samlar strukturerat innehållsunderlag,
- AI får inte kopiera Simhall till en ny stor `index.astro` som normal lösning,
- teknisk implementation klassificeras separat som environment-arkitektur.

### Exempel C – ändra text på befintlig tjänst

Input:

> Ändra ingressen på ljudsystem-sidan.

Förväntad routing:

`service + modify → modify-existing-page.md`

Förväntat resultat:

- faktisk implementation läses,
- minsta contentdiff görs,
- ingen migration eller CSS-refaktor sker som bieffekt.

### Exempel D – ändra kontaktsidans formulär

Input:

> Lägg till ett nytt obligatoriskt fält i kontaktformuläret.

Förväntad routing:

`special + modify → special-page-change.md`

Detta är funktionellt utvecklingsarbete, inte vanlig content-redigering.

## Viktig avgränsning efter Fas 4

Workflow-systemet gäller nu hela sajten. Teknisk content model/template är däremot ännu bara fullt implementerad för referenspiloten.

Det är avsiktligt:

- workflows kan definiera säkert beteende för alla sidtyper,
- varje sidtyps schema/template implementeras först när arkitekturen är verifierad,
- AI får inte fylla tekniska luckor med duplicerad legacy-markup.

## Exit criterion

Uppfyllt när:

- ett generellt router-workflow finns,
- create/modify/special-flöden är separerade,
- Referens har ett implementerat create/migrate-workflow,
- Miljö/Tjänst/Kunskap har samma input-/fakta-/scope-/PR-kontrakt,
- workflows innehåller stopregler för ej implementerad sidarkitektur,
- dokumentationsnav och sidtypskarta pekar på exakta workflows.

## Nästa fas

Fas 5 ska flytta så många prose-regler som praktiskt möjligt till automatisk enforcement: schema/build, canonical, alt/metadata, internlänkar och scope-/duplication-kontroller.