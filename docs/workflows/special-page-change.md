# Workflow: ändra Special-sida

**Status:** Active  
**Owner:** AVAB-projektet  
**Scope:** `special`  
**Last reviewed:** 2026-08-17

## Syfte

Special-sidor som startsida, kontakt, integritetspolicy och andra unika routes ska följa samma globala regler men får inte automatiskt tvingas in i en standardmall bara för konsekvensens skull.

## Grundregel

Special betyder inte "fria händer". AI ska fortfarande återanvända globala komponenter, design tokens, metadataregler, mobilstandard och canonical-domän.

## 1. Läs faktisk sida och beroenden

Kontrollera routefil, importerade komponenter, global CSS och eventuell formulär-/scriptlogik innan ändring.

## 2. Klassificera ändringen

- ren contentändring → minsta relevanta ändring,
- visuell ändring → kontrollera först om gemensam komponent kan användas,
- funktionell ändring → behandla som utvecklingsarbete,
- återkommande mönster → överväg om komponenten hör hemma globalt.

## 3. Förbjuden genväg

Skapa inte en ny generell content model för en enstaka specialsida utan tydlig återanvändningsnytta.

Exempel: `/kontakt/` behöver inte ett eget generellt sidtypsschema bara för att kunna byta en rubrik.

## 4. Globala krav

Även special-sidor ska följa:

- `https://avab.eu/` som canonical root,
- gemensam header/footer,
- mobilstandard,
- tillgänglig rubrikhierarki och fokus/touchbeteende,
- meningsfull metadata,
- gemensamma komponenter framför lokala kopior när de passar.

## 5. Validering

Kontrollera build samt relevant funktionell/visuell QA. För formulär och interaktiva specialfunktioner krävs särskild testning av det faktiska beteendet.

## Stopregel

Om en specialsidesändring skapar ett mönster som sannolikt behövs på flera sidtyper ska lösningen omklassificeras till global komponent-/arkitekturändring i stället för att dupliceras lokalt.
