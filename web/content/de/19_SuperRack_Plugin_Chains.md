# Kapitel 19: SuperRack – Plugin-Ketten für Gesang & Summe

Dieses Kapitel dokumentiert bewährte Waves-Plugin-Ketten für den Live-Einsatz mit X32 und SuperRack Performer: eine komplette **Kette für den Leadgesang** und eine **Kette für Main LR / Summenbus**. Die Werte sind Startpunkte: immer nach Gehör und nach der Gain-Reduction-Anzeige anpassen.

---

## 1. Vor dem Start: Pult- vs. Waves-Bearbeitung

Bei der **Direct-Input-Methode** ([Kapitel 17, Methode A](17_SuperRack_Routing_Methods.md#methode-a-direct-input-alle-32-kanale)) sitzt SuperRack **vor** der Kanalbearbeitung des Pults. Übernimmt Waves Gate, EQ und Kompression, diese Sektionen im X32-Kanal ausschalten:

| X32-Kanalsektion | Einstellung |
|---|---|
| Low Cut | **Aus** |
| Gate | **Aus** |
| EQ | **Aus** |
| Dynamics | **Aus** |

Das vermeidet doppelte Bearbeitung und hält die Signalkette nachvollziehbar.

Mit einem **Aux-Insert** in **Post**-Position ([Methode B](17_SuperRack_Routing_Methods.md#methode-b-aux-insert-6-insert-punkte)) können EQ und Dynamik des Pults stattdessen erhalten bleiben und Waves dahinter folgen. Das ist hilfreich für Tonhöhenkorrektur, die auf einem bereits bereinigten Signal besser arbeitet.

---

## 2. Die Leadgesangs-Kette

| # | Plugin | Typ | Aufgabe |
|---|---|---|---|
| 1 | **PSE** | Gate / Expander | Rauschen und Übersprechen entfernen |
| 2 | **F6 RTA** | EQ / dynamischer EQ | Klangformung, Mulm kontrollieren |
| 3 | **C6** | Multiband-Kompressor | Den Stimmumfang ausgleichen |
| 4 | **CLA-76** | FET-Kompressor | Präsente, nach vorne gerückte Kompression |
| 5 | **CLA-2A** | Opto-Leveler | Spitzen glätten |
| 6 | **R-DeEsser** | De-Esser | Zischlaute zähmen |
| 7 | **Waves Tune Real-Time** | Tonhöhenkorrektur | Optional |

> **Tipp:** Die Reihenfolge folgt der Logik **aufräumen → EQ → Multiband-Dynamik → Hauptkompression → Spitzen glätten → De-Essing → Tuning**. De-Esser und Tuner können je nach Arbeitsweise woanders sitzen; wichtig ist EQ vor Kompression.

### 2.1 PSE (Primary Source Expander): Gate / Expander
Reduziert Bühnenübersprechen zwischen den Phrasen, ohne das harte Abhacken eines klassischen Gates.

| Parameter | Einstellung | Hinweise |
|---|---|---|
| **Range** | **−12 dB** (Start) | Bis −20 dB auf lauten Bühnen; max. etwa −60 dB |
| **Threshold** | Nach Gehör | −60 bis 0 dB; ab hier greift der Expander |
| **Release** | Slow / Medium / Fast | Wie schnell er schließt, wenn der Gesang unter den Threshold fällt |

### 2.2 F6 RTA: Dynamischer EQ mit frei verschiebbaren Bändern
Statischer EQ plus dynamische (pegelabhängige) EQ-Bänder.

| Band | Einstellung | Zweck |
|---|---|---|
| **Hochpass** | **≈ 110 Hz** (von 80 Hz angehoben) | Rumpeln und Griffgeräusche entfernen |
| **Dynamisches Band** | **220 Hz**, Threshold **−31 dB**, max. **−4 dB** | Entfernt Mulm in den unteren Mitten *nur*, wenn der Gesang laut wird; leise Passagen behalten ihren vollen Körper |
| **Mitten-Absenkung** | Sanfter Cut um **5–6 kHz** | Härte entfernen |

### 2.3 C6: Multiband-Kompressor
Komprimiert jeden Teil des Spektrums separat, damit der Gesang über den gesamten Stimmumfang gleichmäßig bleibt (tiefe Töne sind leiser, Töne in der Mitte des Umfangs lauter).

| Band | Bereich (Beispiel) |
|---|---|
| Tief | 16 Hz – 250 Hz |
| Untere Mitten | 250 Hz – 740 Hz |
| Obere Mitten | 740 Hz – 2 kHz |
| Höhen | 2 kHz – 20 kHz |
| Floating Band 1 | ≈ 195 Hz (Kontrolle des Nahbesprechungseffekts) |
| Floating Band 2 | Frei |

- **Release:** ARC (Auto Release Control) oder manuell. Im manuellen Modus gibt es Attack, Release, **Range** (max. Kompression) und **Gain** (EQ-artiges Make-up pro Band).
- **Behavior:** **Opto**, **Knee 0.2**.
- **Ziel-Gain-Reduction:** **3–6 dB**, je nachdem, wie kräftig gesungen wird.
- Mit den **Solo**-Tasten der Bänder anhören, was jedes Band macht (Nahbesprechung, Mitten, Silben und Zischlaute).

### 2.4 CLA-76: FET-Kompressor (1176-Emulation)
Der präsente Hauptkompressor, der den Gesang im Mix nach vorne schiebt. Vergleichbar mit dem internen **Ultimo Compressor** des X32 ([Kapitel 09](09_Effects_Rack_and_Plugins.md)).

| Parameter | Einstellung |
|---|---|
| **Ratio** | **12:1** |
| **Attack** | Mittel-langsam |
| **Release** | Schnell |
| **Input / Output** | Input aufdrehen für mehr Kompression, Pegel mit Output angleichen |
| **Ziel-GR** | **3–10 dB** |

> **Hinweis:** Wie beim Hardware-1176 bedeuten **höhere Zahlen schnelleres** Attack und Release (7 = am schnellsten, 1 = am langsamsten).

### 2.5 CLA-2A: Opto-Leveler (LA-2A-Emulation)
Fängt nur die lautesten Töne ab, die am CLA-76 vorbeikommen, damit kein Wort aus dem Mix heraussticht.

- **Ziel-GR:** **1–2 dB**, nur in den lautesten Passagen.

### 2.6 R-DeEsser (Renaissance DeEsser)
Zähmt laute „S“-Laute, besonders nachdem starke Kompression die Zischlaute nach vorne geholt hat.

### 2.7 Waves Tune Real-Time (optional)
Tonhöhenkorrektur in Echtzeit.

| Parameter | Einstellung |
|---|---|
| **Tonart / Skala** | Die Tonart des Songs (z. B. B-Dur) für die besten Ergebnisse |
| **Rückfalloption** | **Chromatic**: korrigiert auf den nächsten Halbton und funktioniert ohne Kenntnis der Tonart |
| **Note Transition Speed** | **≈ 50 ms** klingt natürlich; **0 ms** erzeugt einen harten „Roboter“-Effekt mit hörbaren Tonsprüngen |

**Etikette & Praxis:**
- Den Einsatz von Tonhöhenkorrektur immer vorher mit Künstler oder musikalischer Leitung absprechen.
- In einem lauten, halligen Raum werden leicht unsaubere Töne verdeckt; im **Livestream** sind sie deutlich hörbar. Waves Tune (auch im chromatischen Modus) lohnt sich daher besonders auf dem Broadcast-Mix.
- Tonhöhenkorrektur arbeitet auf einem vorbereinigten Signal besser; daher einen **Aux-Insert in Post**-Position hinter EQ und Dynamik des Pults in Betracht ziehen.

---

## 3. Kette für Main LR / Summenbus

Über einen **Stereo-Aux-Insert** auf Main LR einschleifen (z. B. `Aux 3/4` oder `Aux 5/6`, Post), das SuperRack-Rack auf **Stereo** gestellt.

| # | Plugin | Aufgabe |
|---|---|---|
| 1 | **SSL G-Master Buss Compressor** | „Glue“-Kompression |
| 2 | **L2 Ultramaximizer** | Brickwall-Limiter |

### 3.1 SSL G-Master Buss Compressor

| Parameter | Einstellung |
|---|---|
| **Attack** | **10 ms** |
| **Release** | **Auto** oder **0,1 s** |
| **Ratio** | **4:1** |
| **Threshold** | Ein paar dB sanfte „Glue“-Kompression |

### 3.2 L2 Ultramaximizer
Ein Brickwall-Limiter mit Look-Ahead, der den Endpegel kontrolliert und die Dynamik reduziert. Nützlich für einen gleichmäßigen Pegel, besonders bei Streams.

> **Warnung:** Der L2 fügt **64 Samples** Latenz (Look-Ahead) zusätzlich zum SuperRack-Puffer hinzu.

---

## 4. Notfall-Workflow

Der große Vorteil von Aux-Inserts: **Ein Tastendruck umgeht SuperRack**. Stürzt der Computer ab, knackst das Audio oder ist mitten in der Show der Laptop-Akku leer:

1. Den Kanal bzw. Main LR anwählen.
2. `INSERT` (Bereich Config/Preamp) drücken, um den Insert zu deaktivieren.
3. Das Audio läuft wieder durch das Pult, und die Show geht weiter.

Für Kanäle, die per **Direct-Input-Methode** bearbeitet werden, einen Snippet vorbereiten, der die Eingangsblöcke auf ihre physischen Quellen zurückschaltet ([Kapitel 12](12_Scenes_Cues_and_Snippets.md)), und grundlegende EQ- und Dynamik-Einstellungen als Kanal-Presets speichern, um sie schnell wieder aktivieren zu können.

---

## 5. Kurzreferenz

| Plugin | Rolle | Wichtigste Einstellung | Ziel |
|---|---|---|---|
| PSE | Expander / Gate | Range −12 dB | Übersprechen entfernen |
| F6 RTA | Dynamischer EQ | HPF 110 Hz, 220 Hz dynamisch −4 dB | Klarheit |
| C6 | Multiband-Kompressor | Opto, Knee 0.2 | 3–6 dB GR |
| CLA-76 | FET-Kompressor | 12:1, Attack mittel-langsam, Release schnell | 3–10 dB GR |
| CLA-2A | Opto-Leveler | — | 1–2 dB GR |
| R-DeEsser | De-Esser | — | „S“-Laute zähmen |
| Waves Tune RT | Tonhöhe | Tonart oder chromatisch, 50 ms | Optional |
| SSL Comp (Summe) | Bus-Glue | 10 ms / Auto / 4:1 | Sanfte GR |
| L2 (Summe) | Limiter | — | Endpegel (+64 Samples) |
