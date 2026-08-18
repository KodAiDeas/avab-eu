# Fas 7 – Migrering av Referenser

**Status:** In progress – design reconciliation first  
**Owner:** AVAB-projektet  
**Branch:** `agent/ai-content-system`  
**Last reviewed:** 2026-08-18

## Mål
Migrera befintliga referenssidor från stora sidspecifika `index.astro`-filer till `src/content/references/*` + gemensam `ReferencePage.astro`, utan URL-byte eller ny lokal sid-CSS.

## Visuell source of truth

Den live-publicerade Minnebergsskolan-sidan är nu godkänd designpilot för hur AVAB:s referenssidor ska se ut.

Det innebär:

**live Minneberg-design → återskapa designmönstren i gemensam datadriven `ReferencePage` → verifiera strukturen med Säffle simhall som migrationspilot → fortsätt migreringen**

Inte:

**nuvarande generiska `ReferencePage` → migrera alla legacy-sidor → rätta designen senare**

Den tidigare lokala designbranchen behöver därför inte vara blockerande för Fas 7. Om den senare räddas kan den användas som jämförelsematerial, men live-sidan är designmässig source of truth.

Structured-content-arkitekturen, Zod-schemat, AI-workflows, guardrails och branch/PR-flödet ska bevaras.

## Pilotroller

### Minnebergsskolan – designpilot
Minnebergsskolan definierar den visuella riktningen och vilka återkommande block referenssystemet måste kunna uttrycka. Den används för att forma den gemensamma datadrivna renderern.

### Säffle simhall – migrationspilot
När Minnebergsskolan fungerar visuellt och tekniskt i structured-content-arkitekturen ska **Säffle simhall vara första riktiga pilot för migrering av en annan referens**.

Säffle används för att verifiera att:
- modellen är generell och inte Minneberg-hårdkodad,
- en annan miljö och annan teknisk leverans kan uttryckas med samma renderer,
- innehållet kan migreras utan ny sidspecifik CSS,
- befintlig URL, SEO, verifierade fakta och bilder kan bevaras,
- desktop och mobil håller samma visuella standard.

Ingen bredare referensmigrering ska starta förrän Säffle-piloten är visuellt och tekniskt godkänd.

## Fas 7A – Återskapa live-designen i structured-content-arkitekturen

### Mål
Göra Minnebergsskolan till första både tekniskt och visuellt godkända structured-content-referensen.

### Arbetsordning
1. Inventera live Minnebergsskolan visuellt och strukturellt.
2. Identifiera återkommande designmönster: breadcrumb, hero, fakta, sektioner, boxar, media/text, färgväxling, FAQ, CTA och relaterat innehåll.
3. Jämför live-designen med nuvarande `ReferencePage.astro` och reference-komponenter i `agent/ai-content-system`.
4. Flytta generella designmönster till gemensamma reference-komponenter/primitives i stället för att kopiera hela live-sidans markup.
5. Anpassa content-schemat endast när live-designen visar ett verkligt återkommande strukturerat behov som dagens schema inte kan uttrycka.
6. Bevara centraliserad SEO, canonical `https://avab.eu/`, FAQ/schema, breadcrumbs och verifierade fakta från structured-content-systemet.
7. Kör `npm run validate`.
8. Visuellt jämför structured Minneberg mot live-piloten på desktop och mobil.
9. Kör därefter Säffle simhall som första riktiga migrationspilot för att bevisa att samma struktur fungerar på en annan referenstyp.

### Stoppregel
Inga ytterligare legacy-referenser får migreras under Fas 7A utöver den uttryckligen beslutade Säffle-piloten efter att Minneberg är godkänd.

De redan tekniskt migrerade referenserna får användas som regressionstest men inte betraktas som visuellt godkända förrän den nya gemensamma designen är på plats.

### Exit criterion Fas 7A
- Structured Minneberg följer live-designen tillräckligt nära på desktop och mobil.
- Ingen fullsidig Minneberg-specifik CSS/markup har kopierats in som standardlösning.
- Säffle simhall fungerar som visuellt och tekniskt godkänd migrationspilot med samma renderer.
- `npm run validate` passerar.

## Exit criterion Fas 7 Referenser
Fas 7 för sidtypen `reference` är inte klar förrän alla aktiva referenser använder samma structured-content-modell och gemensamma renderer, build/guardrails passerar och visuell regression har genomförts på representativa desktop- och mobilvyer.

## Migreringsprincip
- Behåll befintlig route `/referenser/<slug>/`.
- Flytta verifierade fakta, SEO, FAQ, bilder och relationer till content entry.
- Routefilen ska endast ladda rätt entry och rendera `ReferencePage`.
- Skapa inte ny lokal `<style>` eller unik fullsidig markup.
- Återanvänd endast fakta som redan finns på legacy-sidan eller annat verifierat underlag.
- Kontrollera att bilder faktiskt finns i `public/assets/`; gamla filnamn får inte följa med blint.
- Gissa inte nytt bildmotiv när en gammal projektspecifik asset saknas. Spåra säker omdöpning eller lämna sidan i legacy tills bilden kan verifieras.
- CI/guardrails måste vara gröna innan en migreringsvåg räknas som tekniskt godkänd.

## Statusmatris

### Migrerade tekniskt – 6 av 14
- `minnebergsskolan-arvika` – pilot från Fas 3; ska nu göras visuellt lik live-designen.
- `saffle-simhall` – tekniskt migrerad tidigare; ska användas som första riktiga migrationspilot efter godkänd Minneberg-design.
- `sannerudshallen-kil` – Fas 7 våg 1; bildmotiv måste fortfarande visuellt verifieras.
- `hanza-konferens-tocksfors` – Fas 7 våg 1.
- `hundfjallshotellet-hundfjallscenter-salen` – Fas 7 våg 2.
- `sorby-sporthall-kumla` – Fas 7 våg 2.

Dessa sex är tekniskt kompatibla med structured-content-systemet men ska inte räknas som visuellt godkända förrän Fas 7A är klar.

### Återstår – 8 av 14
- `arjangs-simhall`
- `claessons-restaurang-konferens`
- `ekhagsskolan-dals-langed`
- `friskis-solstadens-sportcenter`
- `kroppkarrs-ip-fotboll`
- `lesjofors-ab`
- `lundsbergs-skola-gym`
- `nordic-wellness-orebro-marieberg`

## Bildmappning som blockerar säker massmigrering

Flera återstående legacy-sidor pekar fortfarande på projektspecifika filnamn som inte finns i dagens `public/assets`. Detta får inte lösas genom att AI väljer en semantiskt liknande generisk bild på känsla.

Bildstruktureringen i commit `6d4420f1e47e6b2e0b9f2f3955a3c21d11dd49a6` visar att 39 assets döptes om och 295 referenser uppdaterades över 42 filer. Den verifierar flera säkra mappningar, bland annat Säffle → `tegelbyggnad-glasfasad-entre.webp`, Minneberg → `modern-trafasad-innergard.webp`, Hundfjäll → `fjallanlaggning-vinterkvall.webp`, Sörby → `sporthall-interior-linjer.webp` och Hanza → `konferensrum-stor-skarm-bord.webp`. De återstående projektspecifika namnen måste spåras separat eller visuellt verifieras.

## Teknisk verifiering hittills

GitHub Actions `Validate pull request` run 27 stoppade först migreringen på en saknad legacy-asset. Efter korrigering passerade run 28 hela `npm run validate`.

Efter migrering av Hundfjäll och Sörby passerade run 33 hela `npm run validate`. Därmed är de sex nuvarande structured-content-referenserna tekniskt kompatibla med schema, guardrails och build.

## Nästa steg

Nästa implementation är Fas 7A: porta live Minneberg-designen till den gemensamma structured-content-renderern. När Minneberg är visuellt godkänd används Säffle simhall som första riktiga migrationspilot. Först efter godkänd Säffle-pilot återupptas bredare migrering av återstående referenser.