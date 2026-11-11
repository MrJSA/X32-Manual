# Kapitel 18: SuperRack – Latenz, Puffergröße & Bild-Ton-Synchronität

Jedes Digitalpult hat Latenz, und jeder Insert (interne Effekte, eine externe analoge Schleife oder ein Computer mit SuperRack Performer) fügt etwas hinzu. Bei SuperRack ist die **Puffergröße** der wichtigste Hebel: Sie tauscht Latenz gegen CPU-Last.

---

## 1. Was der Puffer macht

SuperRack bearbeitet Audio in Blöcken („Puffern“). Ein Block muss vollständig empfangen sein, bevor er bearbeitet und zurückgeschickt werden kann.

| | Kleiner Puffer (32 Samples) | Großer Puffer (1024+ Samples) |
|---|---|---|
| **Latenz** | ✔ Niedrig | ✘ Hoch |
| **CPU-Last** | ✘ Hoch | ✔ Sehr niedrig |
| **Stabilität** | ✘ Gefahr von Klicks und Aussetzern | ✔ Sehr stabil |

Beispiel aus der Praxis: Mit 32 belegten Kanälen lag die CPU-Auslastung auf demselben Rechner bei etwa 12 % mit 512 Samples und bei etwa 31 % (mit roten Überlastwarnungen) mit 32 Samples. Ganz ohne Plugins: etwa 0 % bei 2048 gegenüber etwa 12 % bei 32.

---

## 2. Round-Trip-Latenz (X32 bei 48 kHz, Direct-Input-Methode)

| Puffer (Samples) | Gesamtlatenz | Entspricht einem Abstand von* |
|---:|---:|---|
| 32 | **5,9 ms** | ≈ 2 m |
| 64 | **7,2 ms** | ≈ 2,5 m |
| 96 | **8,56 ms** | ≈ 3 m |
| 128 | **9,9 ms** | ≈ 3,4 m |
| 192 | **12,5 ms** | ≈ 4,3 m |
| 256 | **15,2 ms** | ≈ 5,2 m |
| 512 | **25 ms** | ≈ 8,6 m |
| 1024 | **47,23 ms** | ≈ 16 m |
| 2048 | **89,9 ms** | ≈ 31 m |

\* *Schall legt etwa 34 cm pro Millisekunde zurück. 5,9 ms Latenz klingen so, als stünde man etwa 2 m von einem Bodenmonitor entfernt, was auf den meisten Bühnen ohnehin normal ist.*

### Unterschiede zwischen den Methoden
- **Direct Input** ([Kapitel 17, Methode A](17_SuperRack_Routing_Methods.md#methode-a-direct-input-alle-32-kanale)): die Werte oben.
- **Aux-Insert** ([Methode B](17_SuperRack_Routing_Methods.md#methode-b-aux-insert-6-insert-punkte)): etwa **+0,37 ms** (z. B. 6,27 ms statt 5,9 ms bei 32 Samples), weil das Pult den Kanal bearbeitet, hinausschickt und wieder empfängt, bevor es weitermacht.
- **X-DANTE + Dante Virtual Soundcard:** etwa **10 ms** bei 32 Samples (DVS 4 ms + Karte 0,25 ms + Puffer); 128 Samples bringen etwa 4 ms zusätzlich.
- **Mehrere Durchgänge** (Eingangs-Rack + Insert + Gruppe + Main-LR-Insert) addieren sich: Jeder Durchgang kostet einen vollen Round-Trip.
- **Plugins mit Look-Ahead** bringen eigene Latenz mit (z. B. Waves **L2**: 64 Samples, etwa 1,3 ms).

### Abtastrate
Das X32 mit **48 kHz** betreiben. Bei 44,1 kHz steigt die Latenz im gesamten System (Pult-I/O, SuperRack und Plugins) um rund **9 %**.

---

## 3. Wie viel Latenz ist akzeptabel?

| Einsatz | Toleranz | Empfehlung |
|---|---|---|
| **In-Ear-Monitoring (IEM)** | Sehr gering | SuperRack **aus** dem IEM-Weg heraushalten (Doppel-Patch) |
| **Bodenmonitore** | Unter 10–15 ms | ≤ 128 Samples |
| **PA / Saal (FOH)** | Bis etwa 15 ms unbemerkt | ≤ 256 Samples; kleiner ist immer besser |
| **Broadcast / Livestream** | Oft sind mehr als 50 ms sogar **von Vorteil** | Große Puffer sind in Ordnung (siehe Bild-Ton-Synchronität unten) |

### PA / Saal
Bis etwa **15 ms** bemerkt das Publikum nichts. Nur in der ersten Reihe hört man den direkten Bühnenschall und kurz danach die PA; der Großteil des Publikums hört hauptsächlich die PA. Für Firmenveranstaltungen mit Lavalier-Mikrofonen sind etwa 10 ms problemlos nutzbar.

### Bodenmonitore
Ab etwa **10–15 ms** bemerken Musiker einen Unterschied im Monitor.

### In-Ear-Monitoring: die Doppel-Patch-Strategie
In-Ear-Nutzer bemerken Latenz viel früher, weil sie die eigene Stimme über Knochenschall und zusätzlich verzögert über den In-Ear hören. Die Lösung: dasselbe Mikrofon auf zwei Kanäle legen.

| Kanal | Bearbeitung | Speist |
|---|---|---|
| **Kanal A** | SuperRack-Plugins | Main LR (PA) |
| **Kanal B** | Nur Gate, EQ und Dynamik des X32, kein SuperRack | Mix-Busse → In-Ears |

- Dieselbe Quelle auf **zwei Kanäle** patchen, mit User Routing ([Kapitel 04](04_Firmware_4x_User_Routing.md)) oder über die Quellenwahl eines zweiten Kanals.
- Bei Aux-Inserts gibt es eine Alternative: Die Monitor-Sends **vor** dem Insert-Punkt abgreifen. Die Stimme wird zuerst im Pult bearbeitet, auf die Monitore geschickt und dann für die PA durch SuperRack geführt.

---

## 4. Broadcast: Latenz gezielt nutzen

In Streaming-Umgebungen kommt **der Ton fast immer vor dem Bild** an, weil Kameras, Bildmischer, Router und Embedder jeweils Frames an Verzögerung hinzufügen. Statt am Pultausgang eine Audioverzögerung einzustellen, kann SuperRack mit einem **größeren Puffer** laufen: Die CPU-Last sinkt drastisch, und der Ton rückt näher ans Bild.

### Dauer eines Frames

**Frame-Dauer (ms) = 1000 / Bildrate (fps)**

| Bildrate | 1 Frame | 2 Frames | 3 Frames |
|---|---:|---:|---:|
| 59,94 fps | 16,7 ms | 33,4 ms | **≈ 50 ms** |
| 29,97 fps | 33,4 ms | 66,7 ms | **≈ 100 ms** |
| 24 fps | 41,7 ms | 83,3 ms | **≈ 125 ms** |

Typische Videosysteme hängen **2–3 Frames** hinterher. Beispiel: Ein 59,94-fps-System mit 3 Frames Verzögerung (etwa 50 ms) → ein SuperRack-Puffer von **1024** (47,2 ms) bringt den Ton nahezu exakt synchron, bei fast null CPU-Last.

> **Warnung:** Das nur auf einem **eigenen Broadcast-Mix** machen (z. B. ein separates Pult oder ein reiner Broadcast-Signalweg). Dieselbe Latenz im Saal oder auf den Monitoren wäre inakzeptabel.

---

## 5. Praxisempfehlungen

1. Mit **64** Samples beginnen und die CPU prüfen. Auf **32** gehen, wenn der Rechner Reserven hat, oder auf **128**, wenn er sich schwertut.
2. Niemals rote CPU-Warnungen oder hörbare Klicks hinnehmen: stattdessen den Puffer erhöhen.
3. Den SuperRack-Computer dediziert halten (keine Bildschirmaufnahme, kein OBS). Schon eine Bildschirmaufnahme kann Puffer von 512–1024 erzwingen.
4. So wenige Racks wie nötig verwenden (`Setup → Settings → 8/32/64 Racks`).
5. In-Ear-Signale aus dem SuperRack-Weg heraushalten.
6. Immer eine Rückfallebene haben. Bei Aux-Inserts mit `INSERT` SuperRack sofort umgehen ([Kapitel 17, Methode B](17_SuperRack_Routing_Methods.md#methode-b-aux-insert-6-insert-punkte)). Bei der Direct-Input-Methode einen **Snippet** speichern, der die Eingangsblöcke zurück auf `Local` / `AES50` schaltet ([Kapitel 12](12_Scenes_Cues_and_Snippets.md)).
