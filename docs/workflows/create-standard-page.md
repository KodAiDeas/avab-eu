# Workflow: skapa standardiserad AVAB-sida

**Status:** Active  
**Owner:** AVAB-projektet  
**Scope:** `environment`, `service`, `knowledge`  
**Last reviewed:** 2026-08-17

## Syfte

Detta workflow används för nya eller större omskrivningar av standardiserade Miljö-, Tjänst- och Kunskapssidor. Det gemensamma arbetsflödet ska vara samma oavsett om kunden använder ChatGPT, Claude eller Codex.

Referenser har ett separat fullt implementerat workflow. För Miljö, Tjänst och Kunskap är målarkitekturen definierad men respektive content-schema/template kan ännu saknas. AI får därför inte låtsas att en teknisk modell finns innan den verifierats i koden.

## 1. Identifiera sidtyp

Klassificera exakt en primär sidtyp:

- `environment` → normalt `/miljo/<slug>/`
- `service` → normalt `/tjanster/<slug>/`
- `knowledge` → normalt `/kunskap/<slug>/`

Klassificera efter sidans syfte, inte bara efter layoutlikhet.

### Environment
Beskriver ett kund-/verksamhetssammanhang och hur AVAB:s lösningar passar där, till exempel simhall, skola, gym eller industri.

### Service
Beskriver en tjänst, kompetens eller lösningsförmåga som kunden kan köpa eller efterfråga.

### Knowledge
Svarar i första hand på en kunskapsfråga, vägleder eller förklarar ett ämne.

## 2. Läs rätt underlag

Alltid:

1. `AGENTS.md`
2. `docs/README.md`
3. `docs/workflows/ai-page-authoring.md`
4. `docs/architecture/page-types.md`
5. `docs/architecture/ai-write-scope.md`
6. relevant Active sidstandard om den finns
7. faktisk kod/schema/template för sidtypen om den finns
8. representativa befintliga sidor av samma typ

Dokumenterade mål får inte behandlas som implementerad kod.

## 3. Kontrollera implementation före skrivning

AI ska uttryckligen avgöra om sidtypen har:

- Active sidstandard,
- content model/schema,
- gemensam renderer/template,
- stabil routekonvention,
- automatiska valideringar.

### Om allt finns
Skapa/uppdatera strukturerat content enligt den faktiska modellen.

### Om schema/template saknas
Skapa inte automatiskt en ny stor fullsidig `index.astro` för att komma runt arkitekturen.

Gör i stället något av följande beroende på uppgiftens scope:

1. vid ren innehållsbeställning: ta fram ett strukturerat innehållsunderlag och markera teknisk publicering som blockerad av ännu ej implementerad sidtyp,
2. vid uttryckligt utvecklingsuppdrag: klassificera arbetet som arkitekturimplementation för sidtypen och följ projektets komponent-/content-principer,
3. vid liten ändring av befintlig legacy-sida: ändra minsta nödvändiga content utan att introducera ett nytt lokalt designsystem.

## 4. Gemensam input för standardsidor

AI ska återanvända känd information och bara fråga efter verkligt saknade uppgifter.

### Gemensamt

- sidans ämne/syfte,
- önskad publik route eller slug om relevant,
- målgrupp,
- huvudbudskap,
- primär CTA,
- tillgängliga bilder,
- fakta/påståenden som måste vara korrekta,
- relevanta interna länkar,
- SEO-fokus utan sökordsstapling.

### Environment – extra

- vilken miljö/verksamhet sidan gäller,
- vanligaste kundbehoven,
- tekniska/operativa utmaningar,
- relevanta lösningar/tjänster,
- representativa referenser,
- typiska köpare/beslutsfattare om känt.

### Service – extra

- vad tjänsten faktiskt omfattar,
- när kunden behöver den,
- leverans-/arbetsprocess,
- gränssnitt mot andra entreprenörer/tjänster,
- verifierbara fördelar/resultat,
- relevanta miljöer och referenser.

### Knowledge – extra

- huvudfrågan/intentionen,
- vilken nivå läsaren förväntas ha,
- fakta/källunderlag som kräver verifiering,
- vilka frågor artikeln ska besvara,
- relevant nästa steg/CTA.

## 5. Fakta AI inte får hitta på

Gäller alla sidtyper:

- kundspecifika resultat,
- priser,
- exakta prestanda- eller mätvärden,
- lagkrav/standardkrav utan verifiering,
- produktgarantier,
- certifieringar,
- projekterings-/installationsomfattning,
- referenser eller kundrelationer som inte finns,
- påståenden om AVAB:s kapacitet som saknar stöd.

För kunskapsinnehåll ska extern, tidskänslig eller tekniskt kritisk fakta verifieras mot lämplig primär källa när uppgiften kräver det.

## 6. AI får föreslå men inte besluta tyst

AI får föreslå:

- rubriker och informationshierarki,
- CTA-text,
- SEO-title/description,
- FAQ-frågor baserade på faktiskt innehåll,
- interna länkar,
- bildplacering,
- vilka sektioner som kan utelämnas när underlag saknas.

AI får inte på egen hand ändra global design, navigation, routefamilj eller sidtypens schema inom en vanlig contentuppgift.

## 7. Bilder och alt-text

- återanvänd befintliga assets där möjligt,
- verifiera att filen finns innan publicering,
- alt-text beskriver relevant motiv/funktion,
- dekorativ bild ska inte få påhittad SEO-alt,
- bildtext får innehålla mer kontext än alt-text när den är relevant,
- skapa inte en falsk filreferens för en bild som kunden bara beskrivit men ännu inte laddat upp.

## 8. Metadata och URL

- canonical root är alltid `https://avab.eu/`,
- unik SEO-title och description,
- en H1,
- konsekvent breadcrumb från faktisk routehierarki,
- strukturerad data ska genereras från samma faktaunderlag som synligt innehåll där möjligheten finns,
- `www` ska inte introduceras som canonical.

## 9. Internlänkning

Prioritera naturliga relationer:

- Environment → relevanta tjänster + referenser,
- Service → relevanta miljöer + referenser + kunskap,
- Knowledge → relevanta tjänster/miljöer + nästa steg,
- undvik länkar bara för SEO om de inte hjälper användaren.

Verifiera att interna mål existerar eller uttryckligen planeras.

## 10. Ändringsscope

Normal contentuppgift ska inte ändra:

- `src/components/**`,
- `src/layouts/**`,
- `src/styles/**`,
- `src/content.config.ts`,
- build/deploy/CI,
- andra sidtyper,

om det inte uttryckligen krävs och arbetet har klassificerats som arkitektur-/utvecklingsarbete.

## 11. Branch, validering och PR

Arbeta i separat branch/PR.

Validera med den bästa kontroll som faktiskt finns för sidtypen. När schema finns ska schema + build passera. När schema ännu saknas ska PR:n tydligt ange den begränsningen.

PR:n ska beskriva:

- sidtyp,
- route,
- om ändringen är content eller arkitektur,
- vad som skapats/ändrats,
- vilka standarder/modeller som användes,
- valideringsresultat,
- kvarstående mänsklig verifiering.

## Stopregel

Om en ny Environment/Tjänst/Kunskapssida endast kan skapas genom att kopiera en befintlig fullsidig Astro-fil och börja göra lokal CSS: **stoppa normal content-authoring**.

Det betyder att sidtypens gemensamma template/content model ska implementeras eller att arbetet uttryckligen måste godkännas som en tillfällig legacy-ändring.

## Definition of Done

En standardsida är färdig först när den följer sidtypens faktiska Active-regler, återanvänder gemensam arkitektur där sådan finns, har verifierad metadata/bilder/länkar, passerar tillgänglig validering och ligger i PR för granskning. Om sidtypens schema/template ännu inte är implementerat får ett innehållsunderlag vara komplett, men sidan får inte beskrivas som tekniskt publiceringsklar.