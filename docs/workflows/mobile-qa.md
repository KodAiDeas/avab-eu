# AVAB – mobilinventering och QA

**Status:** Active  
**Owner:** AVAB-projektet  
**Scope:** Alla publika AVAB-sidor  
**Standard:** `docs/standards/global/mobile.md`  
**Last reviewed:** 2026-08-17  
**Replaces:** `src/docs/AVAB-mobilinventering.md`

## Syfte

Detta workflow beskriver hur hela webbplatsen ska inventeras, prioriteras, åtgärdas och verifieras för mobil. Målet är att hitta återkommande grundproblem och lösa dem centralt innan sidspecifika korrigeringar görs.

## Fas 0 – verifiera kod mot deployment

Innan massändringar:

- fastställ vilken branch/commit som är deployad på testmiljön
- verifiera att arbetsbranchen motsvarar den version som granskas
- kontrollera serverunika/opushade skillnader
- jämför routes i deployment och repo
- dokumentera avvikelser

**Stopregel:** Om testmiljö och arbetsbranch inte motsvarar varandra ska avvikelsen lösas eller dokumenteras före visuell massinventering.

## Fas 1 – bygg sann route-lista

Ta med:

- startsida och huvudsidor
- alla miljösidor
- alla tjänstesidor
- kunskapssidor
- referensindex och alla publika referenser
- kalkylatorer/interaktiva routes
- policy- och informationssidor

Ta inte med som publika routes utan särskilt skäl:

- `index-gammal.*`
- filer med `trasig`, `pre`, `ful` eller liknande arbetsnamn
- preview-HTML
- `.txt`-kopior
- zip-filer

Inventeringsmatris:

| Route | Sidtyp | 360 | 390 | 430 | 768 | Problem | Scope | Prioritet | Status |
|---|---|---|---|---|---|---|---|---|---|
| `/.../` | environment | ⬜ | ⬜ | ⬜ | ⬜ | – | – | – | Ej granskad |

## Fas 2 – kodinventering

Sök särskilt efter:

- fasta width/min-width/height/min-height
- `100vw` med padding/marginal
- absolute/fixed/sticky-positionering
- `overflow:hidden` och horisontell overflow
- `display:none` i mobilregler
- duplicerade lokala media queries
- CTA-varianter och överstyrningar
- grids med aggressiv `minmax()`/`min-width`
- tabeller, iframes, video, embeds
- formfält under 16 px
- hoverberoenden
- sidspecifik CSS som duplicerar global CSS

Klassificera fynd som **Globalt**, **Komponent**, **Sidtyp/mall** eller **Sidspecifikt**. Börja aldrig med sidspecifik patch om rotproblemet finns på flera routes.

## Fas 3 – visuell inventering

Primära bredder: **360, 390, 430 och 768 px**. Gör dessutom **320 px** gränstest för overflow på representativa sidor och problemkomponenter.

Kontrollera per sida:

- header/navigation och sticky-beteende
- hero, H1, ingress, bildbeskärning och CTA
- touchytor och CTA-hierarki
- grids, kort, padding och overflow
- bilder/media
- formulär och specialkomponenter
- footer

Följ Definition of Done i `docs/standards/global/mobile.md`.

## Fas 4 – prioritering

- **P0:** kritisk navigation/innehåll/formulär obrukbart, allvarlig overflow eller klippning.
- **P1:** återkommande globalt fel, sticky överlapp, dålig CTA-hierarki, för små touchytor, viktigt innehåll dolt.
- **P2:** spacing, typografi, bildbeskärning eller lokala inkonsekvenser.
- **P3:** polish utan funktionell påverkan.

## Fas 5 – åtgärdsordning

1. deployment/branch-paritet
2. P0
3. globala grundregler
4. delade komponenter
5. sidtyper/mallar
6. sidspecifika undantag
7. P2/P3
8. full regression

Global ändring regressionstestas minst på startsida, miljösida, tjänstesida, referens, kontakt/formulär samt relevant specialkomponent.

## Fas 6 – hero/CTA

Inventera antal CTA:er, långa etiketter, lokala överstyrningar och återkommande `.hero-actions`/`.cta-actions`. Normal riktning är 52–56 px mobilhöjd, 12–16 px gap, högst två fullstora CTA:er och tertiär tredje handling.

Ändra inte CTA-texter automatiskt om betydelsen kan förändras.

## Fas 7 – dolt mobilinnehåll

Klassificera varje dolt block som:

- duplicerat
- dekorativt
- sekundärt men värdefullt
- väsentligt

Väsentligt innehåll får inte döljas som layoutlösning.

## Fas 8 – regression och godkännande

Arbetet är inte klart förrän:

- samtliga aktiva routes är inventerade
- P0/P1 är åtgärdade eller explicit blockerade
- 320 px inte har horisontell sidscroll
- 360/390/430 är visuellt godkända
- 768 saknar brytpunktsregression
- mobilmeny/sticky header fungerar
- CTA-hierarki är konsekvent
- inga viktiga block döljs utan motivering
- formulär/interaktiva komponenter fungerar
- build passerar
- visuell verifiering är genomförd

Om browserautomation inte fungerar får uppgiften inte markeras fullt verifierad. Dokumentera vad som är kodverifierat och vad som återstår manuellt.
