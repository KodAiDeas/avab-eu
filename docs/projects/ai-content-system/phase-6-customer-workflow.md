# Fas 6 – säker kundworkflow utan VS Code

**Status:** Complete baseline  
**Owner:** AVAB-projektet  
**Last reviewed:** 2026-08-17

## Resultat

Fas 6 etablerar ett operativt sätt att arbeta mot AVAB-repot från ChatGPT/Claude utan lokal utvecklingsmiljö.

Detta är inte ett separat publiceringssystem. GitHub fortsätter vara sanningskälla och branch + PR + validering är säkerhetsgränsen.

## Implementerat

- Active workflow: `docs/workflows/customer-chat-authoring.md`
- gemensam router: `docs/workflows/ai-page-authoring.md`
- sidtypsspecifika workflows från Fas 4
- write-scope/risknivåer
- separat branch + draft PR som normalregel
- PR-validation från Fas 5
- structured-content Referens som första fungerande content-sidtyp

## Bevis i det pågående projektet

Arbetet i Fas 0–6 har utförts direkt mot GitHub-branchen `agent/ai-content-system` och draft PR #1 utan att kunden behövt arbeta i VS Code.

Minnebergsskolans referenspilot har:

- content entry
- schema-validering
- gemensam renderer
- samma data till referenskort
- canonical under `https://avab.eu/`
- grön GitHub Actions-validering

Det visar att det tekniska kärnflödet för en implementerad sidtyp kan hanteras via chatten.

## Säkerhetsmodell

### Kunden ska kunna göra

- beskriva en ny sida eller ändring i naturligt språk
- ge fakta och bilder
- be AI skapa eller uppdatera content
- få en PR att granska
- fortsätta dialogen från mobil

### AI ska automatiskt göra

- klassificera sidtyp
- läsa rätt standard/workflow
- skilja content från arkitektur
- använda branch, inte `main`
- validera med CI
- redovisa osäker fakta
- lämna merge till mänskligt beslut

### AI ska inte göra

- uppfinna projektfakta
- kringgå saknat schema genom legacy-copy/paste
- blanda global CSS/refaktorering i vanlig content-PR
- tolka grön build som visuell godkänd rendering
- merge:a utan uttryckligt mandat

## Begränsningar kvar

### Preview per PR

Automatisk preview-deployment är ännu inte implementerad. Nuvarande `deploy.yml` deployar endast `main` till test2. Därför kan GitHub Actions verifiera build/guardrails men inte ännu ge kunden en unik preview-URL per PR.

Detta är den viktigaste kvarvarande UX-förbättringen för ett helt mobilvänligt granskningsflöde.

### Sidtyper utöver Referens

Environment, Service och Knowledge har generella workflows men ännu inte samma färdiga structured-content schema/template som Referens. Kundflödet är därför fullt tekniskt implementerat först för sidtyper vars content model finns i kod.

Special-sidor förblir utvecklings-/designarbete när ändringen påverkar unik struktur.

### Visuell QA

Build och guardrails ersätter inte visuell regression på desktop/mobil. Automatiserad screenshot/preview-QA kan läggas till senare men mänsklig visuell kontroll behövs fortfarande före bred migration/publicering.

## Rekommenderat verkligt kundflöde

```text
1. Kunden skriver i chatten
2. AI klassificerar create/modify + pageType
3. AI använder repo-reglerna
4. AI frågar bara efter blockerande fakta
5. AI skapar dedikerad branch
6. AI ändrar minsta möjliga content-scope
7. AI öppnar draft PR
8. GitHub Actions validerar
9. Kunden granskar PR + preview när sådan finns
10. Kunden godkänner
11. Merge/publicering sker separat
```

## Exit criterion

**Uppfyllt som baseline för Referens:** kunden kan arbeta via chatten utan lokal utvecklingsmiljö och AI behöver inte modifiera designsystemet för en normal structured-content referens.

Fas 6 betyder inte att alla sidtyper redan är migrerade. Det är Fas 7:s uppgift.

## Nästa fas

Fas 7 migrerar befintliga sidor till systemet, en sidtyp i taget. Referenser ska migreras först och visuellt jämföras före/efter innan gammal duplicerad markup/CSS tas bort.
