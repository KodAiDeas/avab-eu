# Fas 5 – guardrails och automatisk validering

**Status:** Complete baseline  
**Owner:** AVAB-projektet  
**Reviewed:** 2026-08-17  
**Branch:** `agent/ai-content-system`

## Syfte

Göra de viktigaste AI-reglerna maskinkontrollerade i pull requests så att fel normalt upptäcks innan merge.

## Implementerat

### PR-validering

`.github/workflows/validate-pr.yml` kör på pull requests mot `main` och:

1. checkar ut full Git-historik för diff-baserade regler,
2. använder Node 22,
3. installerar låsta beroenden med `npm ci`,
4. kör `npm run validate`.

`npm run validate` kör först AVAB:s guardrails och därefter `astro build`.

### Repo-guardrails

`scripts/validate-site.mjs` kontrollerar i nuläget:

- nya källkodsrader under `src/pages`, `src/components`, `src/layouts`, `src/content` och `src/data` får inte introducera `https://www.avab.eu`; canonical webbplats är `https://avab.eu/`,
- nya standardroutes under Referenser, Miljöer, Tjänster och Kunskap får inte introducera nya sid-specifika `<style>`-block,
- alla JSON-poster i den implementerade `references`-collectionen måste vara giltig JSON,
- publicerad referens måste ha `customer.publicationApproved=true`,
- hero- och gallery-bilder i reference content måste finnas under `public/`,
- dessa bilder måste ha meningsfull alt-text,
- `relatedServices` och `relatedReferences` i reference content måste peka på routes som finns i `src/pages`.

### Schema/build

Astro Content Collections + Zod i `src/content.config.ts` fortsätter att validera strukturen och `astro build` måste passera.

## Legacy-strategi

Guardrails ska stoppa **nya fel** utan att göra hela PR-flödet oanvändbart på grund av redan kända legacy-avvikelser.

Därför är regler som `www.avab.eu` och ny lokal `<style>` diff-baserade. Befintliga gamla förekomster hanteras i separata migrations-/TODO-arbeten, bland annat AVAB-012.

Structured content är däremot nytt och kontrolleras fullt ut, inte bara på ändrade rader.

## Verifiering

GitHub Actions `Validate pull request`, run 16, passerade efter att guardrailen kopplats in.

Det verifierar att:

- guardrail-scriptet körs i PR,
- `npm ci` fungerar,
- guardrails passerar på aktuell branch,
- Astro-build passerar efter guardrails.

## Medvetet ej automatiserat ännu

Följande ska byggas ut när respektive arkitektur finns eller legacy är migrerad:

- generell kontroll av alla interna länkar i all Astro-markup,
- komplett alt-textkontroll av legacy-HTML/Astro,
- metadata/canonical-regler för alla gamla fullsidiga Astro-sidor,
- guardrails för environment/service/knowledge content collections när deras schemas implementeras,
- preview-deployment per PR.

En första generell Astro-länkskanning försöktes i Fas 5 men connectorn misslyckades vid filuppdateringen. Den betraktas därför inte som implementerad.

## Säkerhetsfynd utanför denna fas

`npm install`/tidigare build rapporterade 7 dependency vulnerabilities (1 low, 6 high). Detta hanteras separat som `AVAB-014`; Fas 5 gör ingen automatisk breaking dependency-uppgradering.

## Exit criterion

Fas 5-baseline är uppfylld när en PR automatiskt måste passera både AVAB-specifika guardrails och Astro build innan den kan betraktas som tekniskt validerad.

Nästa fas är Fas 6: säkert kundworkflow utan VS Code.
