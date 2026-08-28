# AVAB – sidtyper

**Status:** Active  
**Owner:** AVAB-projektet  
**Last reviewed:** 2026-08-17

## Syfte

Varje publik sida ska klassificeras innan en AI väljer standard, workflow eller content model. Sidtypen styr vilka regler som ska läsas och vilken teknisk modell som får användas.

## Standardiserade sidtyper

### `reference`
**Routefamilj:** `/referenser/<slug>/`  
**Pilot:** `/referenser/minnebergsskolan-arvika/`

Verifierbart kundcase/referens. Målarkitekturen är nu implementerad som första pilot med Astro Content Collection + schema + gemensam referensrenderer. En normal ny/migrerad referens ska följa `docs/workflows/create-reference.md` och ska inte kräva unik CSS eller fullsidig markup.

### `environment`
**Routefamilj:** `/miljo/<slug>/`  
**Pilot/riktningsreferens:** `/miljo/simhall/`

Beskriver AVAB:s lösningar för en miljö, exempelvis simhall, skola, industri eller gym. Målarkitektur: gemensamma miljöprimitives/sektioner med kontrollerade variationer. Ny sida routas via `docs/workflows/create-standard-page.md`. Content-schema/template ska verifieras i faktisk kod innan det antas finnas.

### `service`
**Routefamilj:** `/tjanster/<slug>/`

Beskriver en tjänst/kompetens. Målarkitektur: gemensam tjänstemodell där det är praktiskt, med dokumenterade specialsektioner vid verkligt behov. Ny sida routas via `docs/workflows/create-standard-page.md`.

### `knowledge`
**Routefamilj:** `/kunskap/<slug>/`

Guider och kunskapsartiklar. Målarkitektur: artikel/content model med gemensam metadata, typografi och relaterat innehåll. Ny sida routas via `docs/workflows/create-standard-page.md`.

### `listing`
Exempel: `/referenser/`.

Indexerar eller presenterar poster från en annan content model. Listing-sidor ska konsumera data från källan och inte ha egna duplicerade register. Ändring av listingens layout/funktion behandlas som utvecklingsarbete; ändring av en post görs i källdatat när möjligt.

## Special/custom

Följande klassas tills vidare som `special` och får inte automatiskt tvingas in i standardmall:

- `/`
- `/kontakt/`
- `/integritetspolicy/`
- `/rastsignal/`

En specialroute kan senare omklassificeras om flera sidor visar samma stabila mönster. Ändringar routas via `docs/workflows/special-page-change.md`.

## Routingregel för AI

### Skapa/migrera

- Referens → `create-reference.md` + reference-standard.
- Miljö → `create-standard-page.md` + relevant Active standard när sådan finns.
- Tjänst → `create-standard-page.md` + relevant Active standard när sådan finns.
- Kunskap → `create-standard-page.md` + relevant Active standard när sådan finns.
- Listing → ändra källdata framför duplicerat register; layout/funktion = utvecklingsarbete.
- Special → `special-page-change.md`; anta inte standardmall.

### Ändra befintligt

Alla sidtyper börjar i `docs/workflows/modify-existing-page.md`, som därefter använder sidtypens faktiska implementation och regler.

## Viktig implementationregel

Målarkitektur och faktisk implementation är två olika saker. En AI får inte anta att Miljö/Tjänst/Kunskap redan har content schema/template bara för att sidtypen är definierad här. Kod är sanningskälla för vad som faktiskt är implementerat.

Om en ny standardsida endast kan skapas genom att kopiera en stor legacy-`index.astro` med lokal CSS ska normal content-authoring stoppas och arbetet omklassificeras till sidtypsarkitektur eller uttrycklig legacy-ändring.

## Namnregel

Publikt språk är svenska: `Referenser`, `Miljöer`, `Tjänster`, `Kunskap`. Interna stabila sidtyps-ID använder engelska singularformer: `reference`, `environment`, `service`, `knowledge`, `listing`, `special`.
