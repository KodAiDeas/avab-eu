# Fas 7 – Migrering av Referenser

**Status:** In progress  
**Owner:** AVAB-projektet  
**Branch:** `agent/ai-content-system`  
**Last reviewed:** 2026-08-17

## Mål
Migrera befintliga referenssidor från stora sidspecifika `index.astro`-filer till `src/content/references/*` + gemensam `ReferencePage.astro`, utan URL-byte eller ny lokal sid-CSS.

## Exit criterion
Fas 7 för sidtypen `reference` är inte klar förrän alla aktiva referenser använder samma structured-content-modell och gemensamma renderer, build/guardrails passerar och visuell regression har genomförts på representativa desktop- och mobilvyer.

## Migreringsprincip
- Behåll befintlig route `/referenser/<slug>/`.
- Flytta verifierade fakta, SEO, FAQ, bilder och relationer till content entry.
- Routefilen ska endast ladda rätt entry och rendera `ReferencePage`.
- Skapa inte ny lokal `<style>` eller unik fullsidig markup.
- Återanvänd endast fakta som redan finns på legacy-sidan eller annat verifierat underlag.
- Kontrollera att bilder faktiskt finns i `public/assets/`; gamla filnamn får inte följa med blint.
- CI/guardrails måste vara gröna innan nästa våg räknas som tekniskt godkänd.

## Statusmatris

### Migrerade och tekniskt validerade
- `minnebergsskolan-arvika` – pilot från Fas 3.
- `saffle-simhall` – Fas 7 våg 1.
- `sannerudshallen-kil` – Fas 7 våg 1. Legacy-bildnamnet saknades i `public/assets`; content entry använder den befintliga generiska ishall-asseten `ishall-interior-hogtalare-hero.webp`. Visuell kontroll av att motivet är rätt krävs innan merge.
- `hanza-konferens-tocksfors` – Fas 7 våg 1.

### Återstår
- `arjangs-simhall`
- `claessons-restaurang-konferens`
- `ekhagsskolan-dals-langed`
- `friskis-solstadens-sportcenter`
- `hundfjallshotellet-hundfjallscenter-salen`
- `kroppkarrs-ip-fotboll`
- `lesjofors-ab`
- `lundsbergs-skola-gym`
- `nordic-wellness-orebro-marieberg`
- `sorby-sporthall-kumla`

## Våg 1 – verifiering

GitHub Actions `Validate pull request` run 27 stoppade först migreringen eftersom `/assets/sannerudshallen-fardig-ljudinstallation.jpg` inte finns i `public/assets/`. Detta bekräftar att guardrailen fungerar och att legacy-filreferenser inte kan kopieras okontrollerat.

Efter korrigerad assetreferens passerade run 28 hela `npm run validate`, inklusive guardrails och Astro build.

## Visuell regression

Visuell regression är fortfarande obligatorisk innan bred utrullning/merge. Grön CI verifierar struktur och build men inte att bildval, linjering, höjder, rytm och mobilpresentation är visuellt godkända.

Minst följande ska granskas när preview/dev-server finns:
- Minnebergsskolan – skolreferens med många sektioner.
- Säffle simhall – styrsystem/simhall.
- Sannerudshallen – ishall och korrigerad hero-asset.
- Hanza – konferens/BYOD.

## Nästa migreringsvåg

Fortsätt med resterande referenser i små vågor. Varje våg ska:
1. läsa legacy-sidan,
2. mappa endast verifierat innehåll,
3. kontrollera faktiska assetnamn,
4. ersätta routefilen med tunn loader,
5. köra `npm run validate`,
6. dokumentera avvikelser som kräver visuell eller mänsklig kontroll.

Först när samtliga referenser är migrerade och representativ visuell regression är godkänd får `reference` markeras färdig i Fas 7.
