# AVAB – AI write scope

**Status:** Active  
**Owner:** AVAB-projektet  
**Last reviewed:** 2026-08-17

## Syfte

Detta dokument skiljer normalt innehållsarbete från utvecklingsarbete. En AI ska inte få bredare ändringsscope bara för att den tekniskt kan skriva till GitHub.

## Grundregel

Minsta nödvändiga scope gäller. En begäran om innehåll får inte tyst bli en design-, routing- eller arkitekturändring.

## Låg risk – normalt innehållsarbete

När respektive content model finns på plats får AI normalt ändra:

- innehåll/data för den aktuella posten,
- uttryckligen tillhörande bilder,
- metadatafält som ingår i sidtypens schema,
- alt-text och bildtexter,
- relationer till befintliga tjänster, miljöer och referenser,
- draft/publication-status enligt workflow.

Ändringen ska ske på separat branch och lämnas som PR.

## Förhöjd risk – kräver explicit utvecklingsscope

AI får inte ändra följande som en bieffekt av vanlig sidproduktion:

- `src/components/`
- `src/layouts/`
- `src/styles/`
- `src/content.config.*` eller motsvarande schemas
- globala navigationer/header/footer
- routingstruktur
- `astro.config.mjs`
- `package.json` / dependencies
- `.github/workflows/`
- deploy-/hostingkonfiguration

Sådana ändringar ska beskrivas som utvecklingsarbete, granskas bredare och regressionstestas på berörda sidtyper.

## Befintligt läge under migration

Innan content models finns fullt implementerade ligger mycket innehåll direkt i `src/pages/**/index.astro`. Under denna övergång får en AI ändra en befintlig sida när användaren uttryckligen begär det, men ska:

1. begränsa ändringen till den aktuella sidan,
2. inte kopiera mönstret som ny långsiktig standard,
3. flagga om ändringen egentligen bör lösas i delad komponent/template,
4. följa dokumenthierarkin i `docs/README.md`.

## Förbjudna genvägar

En innehållsagent ska inte:

- skriva direkt till `main`,
- skapa alternativ TODO-lista,
- skapa nya `index-gammal`, `final`, `v2` eller liknande backupfiler,
- lägga ZIP-backuper i repot som versionshantering,
- duplicera global CSS lokalt för att snabbt få en sida att se rätt ut,
- ändra canonical-domän från `https://avab.eu/`,
- hitta på kundcitat, projektfakta eller mätvärden,
- radera äldre filer enbart utifrån filnamn utan verifiering.

## Eskalering

Om normal innehållsproduktion kräver ändring i hög-risk-scope ska AI stoppa den delen av ändringen och behandla den som ett separat arkitektur-/utvecklingsbehov inom samma PR eller separat PR beroende på omfattning.

## Målbild

När Fas 3–6 är klara ska en typisk begäran som “skapa en ny referens” kunna genomföras genom att endast lägga till/ändra strukturerat innehåll och bilder. Komponenten, layouten, CSS och routingen ska redan finnas.
