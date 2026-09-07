## A feladat célja

Készíts egy **Hangulatnapló** nevű webalkalmazást, amelyben a felhasználó rögzítheti az adott naphoz kapcsolódó hangulatát és egy rövid szöveges bejegyzést.

Az alkalmazásban a hangulatokhoz tartozó bejegyzéseket lehessen létrehozni, megtekinteni, módosítani és törölni, valamint a rögzített adatokból egyszerű statisztikákat is kell készíteni.

---

## Kötelező technológiák

A feladat elkészítéséhez az alábbi technológiákat kell használni:

* **Vite alapú alkalmazás**
* **Retool API használata**
* **HTML**
* **CSS**
* **TypeScript**
* **stb...**

---

# 1. oldal – Új hangulatbejegyzés

Az első oldal feladata új hangulatbejegyzés létrehozása.

## Hangulatnapló
### Új bejegyzés

**Hogyan érzed magad?**
😀 😐 😢 😴 😡

**Szöveges leírás** [ szöveges beviteli mező ]

**[ Mentés GOMB ]**

### Követelmények

A felhasználó:

1. válasszon egy hangulatot az előre megadott hangulatok közül;
2. adjon meg egy szöveges leírást;
3. mentse el a bejegyzést.

A mentés során az adatokat a **Retool API megfelelő végpontjára** kell elküldeni.

A bejegyzés legalább az alábbi adatokat tartalmazza:

* azonosító (`id`)
* hangulat
* szöveges leírás
* dátum/időpont

Sikeres mentés után a felhasználó kapjon egyértelmű visszajelzést.

---

# 2. oldal – Bejegyzések kezelése

A második oldalon kell megvalósítani a bejegyzések **teljes CRUD kezelését**.

A CRUD műveletek:

* **Create** – új bejegyzés létrehozása
* **Read** – bejegyzések lekérése és megjelenítése
* **Update** – meglévő bejegyzés módosítása
* **Delete** – meglévő bejegyzés törlése

Az oldalon jelenjenek meg a korábban rögzített bejegyzések.

Például:

| Dátum       | Hangulat | Leírás                   | Műveletek          |
| ----------- | -------- | ------------------------ | ------------------ |
| 2026.09.06. | 😀       | Ma nagyon jó napom volt. | Módosítás / Törlés |
| 2026.09.05. | 😐       | Átlagos nap volt.        | Módosítás / Törlés |
| 2026.09.04. | 😢       | Nehéz napom volt.        | Módosítás / Törlés |

### Követelmények

A felhasználó tudjon:

* minden bejegyzést lekérni;
* egy bejegyzést módosítani;
* egy bejegyzést törölni;
* új bejegyzést létrehozni.

A módosítás és törlés során is a **Retool API végpontokat** kell használni.

Törlés előtt legyen megerősítés, például:

> Biztosan törölni szeretnéd ezt a bejegyzést?

---

# 3. oldal – Statisztikák

A harmadik oldalon a rögzített hangulatbejegyzések alapján kell statisztikákat készíteni.

Meg kell jeleníteni, hogy az egyes hangulatokból hány bejegyzés található.

Például:

## Hangulatok statisztikája

| Hangulat | Bejegyzések száma |
| -------- | ----------------: |
| 😀       |                12 |
| 😐       |                 8 |
| 😢       |                 4 |
| 😴       |                 6 |
| 😡       |                 2 |

A statisztikának **dinamikusan az API-ból lekért adatok alapján** kell elkészülnie.

Tehát nem elfogadható, ha a fenti számokat fixen beírjátok a programba.

### Megjelenítési követelmény

A statisztikákat legalább táblázatos vagy kártyás formában kell megjeleníteni.

**Plusz lehetőség:** a statisztikák grafikonon vagy diagramon is megjeleníthetők.

---

# Navigáció

Az alkalmazásban legyen navigáció a három oldal között:

* **Új bejegyzés**
* **Bejegyzések**
* **Statisztikák**

A navigáció segítségével minden oldalról elérhető legyen a másik két oldal.

---

# API használata

Az alkalmazás adatkezelését **Retool API végpontok használatával** kell megvalósítani.

A frontend feladata az API-val történő kommunikáció, például:

* `GET` – adatok lekérése
* `POST` – új adat létrehozása
* `PUT` vagy `PATCH` – adat módosítása
* `DELETE` – adat törlése

A pontos HTTP metódust és végpontot a rendelkezésre bocsátott API dokumentáció alapján kell használni.

Az API-hívásokat TypeScriptben, megfelelő hibakezeléssel kell megvalósítani.

---

# Megjelenés

Az alkalmazás legyen:

* áttekinthető;
* egységes megjelenésű;
* könnyen kezelhető;
* reszponzív;
* megfelelően formázott.

A három oldal használjon egységes fejlécet és navigációt.

A kiválasztott hangulat legyen vizuálisan jól megkülönböztethető.

---

# Beadás

A projektet **Git repositoryban** kell elkészíteni.

### Beadandó:

**A Git repository linkje.**

A repository tartalmazza:

* a teljes forráskódot;
* a `package.json` fájlt;
* a Vite projekt összes szükséges fájlját;
* a projekt futtatásához szükséges konfigurációkat.

A projektnek a repository klónozása után telepíthetőnek és futtathatónak kell lennie.