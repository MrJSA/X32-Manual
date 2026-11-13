# Kapitel 06: Kanalbearbeitungs-Architektur

Jeder Eingangskanal des Behringer X32 und Midas M32 verfügt über einen leistungsfähigen internen Bearbeitungszug, der von der 40-Bit-Fließkomma-DSP in Echtzeit berechnet wird. Jeder Kanalzug umfasst Phasenumkehr, ein steilflankiges Low-Cut-Filter, ein flexibles Gate/Expander/Ducker-Modul, Einschleifpunkte (Inserts), einen 4-Band vollparametrischen Equalizer mit Echtzeit-Analyzer (RTA), einen vollwertigen Dynamik-Kompressor/Limiter mit nativer paralleler Mischung sowie Bus-Zuweisungen.

Dieses Kapitel beschreibt den Signalfluss im Kanalzug, die Funktionsweise aller Bearbeitungsblöcke und praxiserprobte Einstellwerte für den Live-Betrieb.

---

## 1. Signalfluss-Architektur im Kanalzug

Das Verständnis der internen Bearbeitungsreihenfolge ist entscheidend, um das Zusammenspiel von Filtern, Kompressor und Fader zu beherrschen:

| # | Block | Bereich / Optionen | Hinweise |
|---|---|---|---|
| 1 | **Eingangsquelle** | Lokale XLR, AES50, Card oder Aux | |
| 2 | **Analog Gain** | -12 bis +60 dB | Bei aktivem HA Gain Split stattdessen digitaler Trim |
| 3 | **Polarität (Ø)** | Ein / aus | 180° elektrische Phasenumkehr |
| 4 | **Low Cut** | 20–400 Hz, 12 dB/Okt. | Hochpassfilter |
| 5 | **Gate / Duck** | Expander 2/3/4, Gate, Ducker | Mit Sidechain-Key-Filter |
| — | *Insert-Punkt PRE* | Internes Effekt-Rack oder Aux | Optional |
| 6 | **4-Band-PEQ** | Low, Lo-Mid, Hi-Mid, High | Low Cut, Shelving, PEQ, High Cut |
| 7 | **Dynamik** | Kompressor / Limiter / Expander | RMS/Peak, paralleler Mix % |
| — | *Insert-Punkt POST* | Internes Effekt-Rack oder Aux | Optional |
| 8 | **Kanal-Mute** | Ein / aus | Wirkung auf Pre/Post-Fader-Sends einstellbar |
| 9 | **100-mm-Fader** | -∞ bis +10 dB | |
| 10 | **Panorama / Balance** | | → Main-Stereobus (L/R) und Mono-/Center-Bus |
| 11 | **Bus-Sends** | Mix-Busse 1–16 | Abgriffe: In/LC, Pre-EQ, Post-EQ, Pre-Fade, Post-Fade, Subgroup |

> [!NOTE]
> **Reihenfolge von EQ und Dynamik umschaltbar:** Die Reihenfolge von Equalizer und Kompressor kann getauscht werden. Auf der Seite **Channel → Config** lässt sich **EQ Pre/Post Dyn** umschalten. Liegt der Kompressor *vor* dem EQ, verhindern spätere EQ-Anhebungen ein unerwünschtes Pumpen des Kompressors.

---

## 2. Low-Cut-Filter (Hochpassfilter / HPF)

Das Low-Cut-Filter ist ein aktives Butterworth-Hochpassfilter mit 12 dB/Oktave Flankensteilheit, einstellbar von **20 Hz bis 400 Hz**.

### Warum Low-Cut Pflicht auf fast jedem Kanal ist:
- **Subwoofer-Schutz**: Verhindert, dass Infraschall, Trittschall vom Bühnenboden, Schläge gegen das Stativ oder Klimaanlagen-Rumpeln die Subwoofer überlasten.
- **Headroom-Schonung**: Tiefe Frequenzen fressen enorme Verstärkerleistung. Das Wegfiltern unhörbaren Bassmülls schafft gewaltigen Headroom im Gesamtsystem.
- **Sprachverständlichkeit**: Beseitigt Explosivlaute („P“- und „B“-Pops) und Mikrofon-Handhabungsgeräusche zuverlässig.

### Richtwerte für Trennfrequenzen:

| Instrument / Quelle | Empfohlene Grenzfrequenz | Begründung |
|---|---|---|
| **Sprache / Kanzel / Moderation** | 120 Hz – 160 Hz | Entfernt Dröhnen im Brusttonbereich und mechanischen Körperschall. |
| **Lead- & Background-Vocals** | 100 Hz – 140 Hz | Macht Stimmen durchsetzungsfähig, ohne das warme Fundament abzuschneiden. |
| **Akustikgitarre** | 80 Hz – 100 Hz | Bändigt dröhnende Korpusresonanzen und beugt Bass-Feedback vor. |
| **E-Gitarre** | 80 Hz – 100 Hz | Säubert den Tiefmull der Lautsprecherbox; lässt Raum für den E-Bass. |
| **Snare Drum** | 80 Hz | Filtert Übersprechungen der Bassdrum aus dem Kessel heraus. |
| **Toms** | 60 Hz – 80 Hz | Erhält den satten Kessel-Wumms, stoppt aber Sub-Rumpeln. |
| **Becken / Overheads** | 120 Hz – 250 Hz | Overheads sollen Beckenbrillanz einfangen, nicht den Schalldruck der Kick. |
| **E-Bass** | 30 Hz – 40 Hz | Schützt Lautsprechermembranen vor Infraschall unterhalb der H-Saite (31 Hz). |
| **Bassdrum (Kick)** | 25 Hz – 30 Hz | Erhält den Tiefbass-Druckschub, filtert aber taumelnde Membran-Hübe. |
| **Keyboards / Synth** | 40 Hz – 60 Hz | Verhindert, dass Sub-Bass-Presets den Gesamt-Mix verschmieren. |

---

## 3. Gate, Expander & Ducker

Das X32 bietet fünf verschiedene Betriebsmodi in der Gate-Sektion:

| Modus | Ratio | Verhalten |
|---|---|---|
| **Expander 2** | 1:2 | Sanfte Absenkung unterhalb des Thresholds |
| **Expander 3** | 1:3 | Mittlere Absenkung |
| **Expander 4** | 1:4 | Kräftige Absenkung |
| **Gate** | — | Hartes Stummschalten unterhalb des Thresholds |
| **Duck** | — | Senkt das Signal ab, wenn das **Steuersignal den Threshold übersteigt** |

### Parameter:
- **Threshold** (-80 dB bis 0 dB): Schwellenwert, ab dem das Modul öffnet.
- **Range** (0 dB bis 60 dB): Absenktiefe bei geschlossenem Gate. (Ein Wert von 12–18 dB klingt im Live-Mix deutlich natürlicher und musikalischer als ein abruptes 60-dB-Abschneiden!).
- **Attack** (0 bis 120 ms): Öffnungsgeschwindigkeit. Für Drums immer **0 ms** (sofortiges Öffnen).
- **Hold** (0,02 ms bis 2000 ms): Haltedauer, die das Gate nach Unterschreiten des Schwellenwerts noch voll geöffnet bleibt.
- **Release** (5 ms bis 4000 ms): Ausschwingzeit, in der das Gate sanft zufährt.

### Key-Filter (Sidechain-Filterung):
Das Steuersignal kann frequenzselektiv gefiltert werden:
- **Filtermodi**: Low Cut (6/12 dB), High Cut (6/12 dB) oder Peak (Bandpass, Q 0,3–10,0).
- **Frequenz**: 20 Hz bis 20 kHz.
- **Key Source**: Intern (`Self`) oder jeder andere beliebige Kanalzug bzw. Mix-Bus.

### Praxiseinsatz von Gate & Ducker:
1. **Snare-Übersprechungen auf Toms ausblenden**:
   - Modus auf **Expander 3** mit **15 dB Range** stellen.
   - Key-Filter auf **Peak** bei **120 Hz bis 180 Hz** (Grundton des jeweiligen Toms) einstellen.
   - Das Gate öffnet nun nur noch beim tatsächlichen Anschlag des Toms, während laute Snare-Schläge und Beckenbeilagen ignoriert werden.
2. **Sidechain-Ducking von E-Bass durch die Kickdrum**:
   - Wählen Sie den **E-Bass**-Kanal und schalten Sie das Gate in den Modus **DUCK**.
   - Als **Key Source** wählen Sie den Kanal der **Kickdrum**.
   - **Range** auf **4 dB bis 6 dB**, Attack auf **5 ms**, Release auf **80 ms** stellen.
   - *Ergebnis*: Bei jedem Kick-Schlag senkt sich der Bass für den Bruchteil einer Sekunde um 5 dB ab. Kick und Bass verzahnen sich perfekt, ohne dass sich die Tiefbässe gegenseitig überlagern.
3. **Automatisches Ducking von Musik bei Sprache**:
   - Aux-In-Kanäle haben keine Gate-Sektion (Abschnitt 8). Legen Sie die Hintergrundmusik deshalb auf ein Paar **normaler Eingangskanäle**: Stellen Sie deren Quelle auf der Seite **Config** auf den Aux In oder den USB-Player. Modus auf **DUCK** stellen und als Key Source das Mikrofon des Pastors bzw. Moderators wählen. Die Musik wird automatisch leiser, sobald jemand spricht.

---

## 4. 4-Band vollparametrischer Equalizer (PEQ)

Jeder Eingangskanal verfügt über vier vollwertige parametrische Bänder. Band 1 (Low) und Band 4 (High) können alternativ als Kuhschwanz- (Shelving) oder Schnittfilter (Cut) arbeiten:

| Band | Filtertypen |
|---|---|
| **1 – Low** | Low Cut (12 dB/Okt.), Low Shelving oder parametrisch |
| **2 – Lo Mid** | Parametrisch |
| **3 – Hi Mid** | Parametrisch |
| **4 – High** | High Cut (12 dB/Okt.), High Shelving oder parametrisch |

| Parameter | Bereich |
|---|---|
| **Frequenz** | 20 Hz bis 20 kHz (feine 1/3-Oktav-Schritte) |
| **Gain** | -15,0 dB bis +15,0 dB (0,5-dB-Schritte) |
| **Q (Bandbreite)** | 0,3 (breit, 2,5 Oktaven) bis 10,0 (chirurgisch schmal, 1/10 Oktave) |

### Echtzeit-Analyzer (RTA):
Drücken Sie `VIEW` im EQ-Bereich. Das Display blendet den 100-Band-RTA direkt hinter der Filterkurve ein:
- **RTA-Modus**: Balkenanzeige oder Spektrogramm (Wasserfall).
- **Abgriff**: **Pre** (zeigt das unveränderte Rohsignal) oder **Post** (zeigt das Ergebnis nach dem EQ).

### Die „Sweep and Destroy“-EQ-Technik:
So beseitigen Sie klingelnde Resonanzen, Feedback-Frequenzen oder nasale Töne:
1. Ein parametrisches Mittenband wählen (Band 2 oder 3).
2. Q schmal einstellen (**Q = 5,0 bis 8,0**) und den Gain um **+9 dB** anheben.
3. Den Frequenzregler langsam durch das Spektrum fahren, während der Musiker singt oder spielt.
4. Sobald die störende Frequenz unangenehm heraussticht, anhalten.
5. Den Gain von +9 dB auf **-3 dB bis -6 dB** umkehren und das Q etwas verbreitern (**Q = 2,0 bis 3,0**). Die störende Resonanz verschwindet, ohne dem Instrument seine Musikalität zu nehmen.

> **Nicht zum Einpfeifen von Monitoren:** Eine Anhebung um +9 dB regt Raumresonanzen an, die bei Show-Pegel nie koppeln würden. Am Ende senkt man Frequenzen ab, die gar kein Problem waren. Um echte Rückkopplungsfrequenzen zu finden, den Pegel anheben, bis das erste Pfeifen einsetzt, und die Frequenz am RTA ablesen ([Kapitel 15](15_Live_Mixing_Workflows_and_Best_Practices.md)).

### EQ-Spickzettel für Instrumente:

| Instrument | Frequenz | Einstellung | Warum |
|---|---|---|---|
| **Gesang** | 80–140 Hz | Low Cut | Gegen Explosivlaute und Bühnenrumpeln |
| | 200–300 Hz | 2–3 dB absenken | Weniger Matsch / Nahbesprechungseffekt |
| | 1,0–1,5 kHz | Schmal absenken | Entfernt den billigen „Megafon“-Klang |
| | 3,0–4,0 kHz | Sanft anheben | Sprachverständlichkeit und Artikulation |
| | 10–12 kHz | High Shelf +2 dB | Weicher, luftiger Glanz |
| **Snare** | 80 Hz | Low Cut | |
| | 200–240 Hz | 2–4 dB anheben | Snare-„Fleisch“ und Körper |
| | 600–900 Hz | Schmale Kerbe -4 dB | Entfernt den hohlen Pappkarton-Ring |
| | 2,5–3,5 kHz | 2–3 dB anheben | Stick-Anschlag und Attack |
| | 8 kHz | High Shelf | Teppich-Brillanz |
| **Bassdrum** | 30 Hz | Low Cut | |
| | 50–70 Hz | 3 dB anheben | Sub-Bass-Druck |
| | 250–400 Hz | 4–8 dB tief absenken | Räumt den matschigen Pappkarton-Klang aus |
| | 3,5–5,0 kHz | 3–5 dB anheben | Schlägel-Klick, setzt sich gegen dichte Gitarren durch |
| **E-Gitarre** | 80 Hz | Low Cut | |
| | 400–500 Hz | 2–3 dB absenken | Entfernt Matsch, schafft Platz für den Bass |
| | 2,0–3,5 kHz | Sanft anheben | Holt die Gitarre nach vorne |
| | 6,5 kHz | High Cut | Entfernt digitales Amp-Modeler-Kratzen |

---

## 5. Dynamik: Kompressor, Limiter & Parallele Kompression

Der Kanalkompressor glättet Dynamiksprünge, sorgt für Durchsetzungsfähigkeit und liefert kontrollierten Druck.

### Parameter:
- **Threshold** (-60 dB bis 0 dB): Schwellenwert, ab dem komprimiert wird.
- **Ratio** (1,1:1 bis 100:1 / Limiter): Kompressionsrate.
  - *2:1*: Sanftes Einebnen für Akustikgitarren oder Chor.
  - *3:1 bis 4:1*: Standardwert für Live-Gesang und E-Bass.
  - *8:1 bis 10:1*: Kräftige Zähmung für dynamische Drums.
  - *100:1*: Hard-Knee-Spitzenwertbegrenzer (Limiter).
- **Attack** (0 bis 120 ms): Ansprechzeit.
  - *Schnell (0–5 ms)*: Fängt Pegelspitzen ab; glättet Gesang.
  - *Langsam (20–50 ms)*: Lässt den Anschlagstransienten ungehindert durch, bevor komprimiert wird – sorgt für maximalen Klick und Druck bei Drums.
- **Hold** (0 bis 2000 ms) & **Release** (10 bis 4000 ms): Erholzeit nach der Kompression. (Das Release sollte natürlich mit dem Tempo des Songs atmen; für Gesang typischerweise 100–200 ms).
- **Knee** (0 = Hard Knee bis 5 = Soft Knee): Sanfterer Übergang in die Kompression.
- **Detektion**: **RMS** (gehörrichtig, musikalisch weich) vs. **Peak** (blitzschnell auf Spitzen reagierend).
- **Make-up Gain** (0 dB bis 24 dB): Gleicht den durch Kompression verlorenen Ausgangspegel wieder aus.

### Integrierte parallele Kompression (Der MIX-Regler):
Jeder Kanalkompressor im X32 besitzt einen integrierten **MIX-Regler (0% bis 100%)**:
- **100%**: Reines komprimiertes Signal (seriell).
- **50%**: Mischt 50% unkomprimiertes Originalsignal mit 50% brachial komprimiertem Signal (New-York-Style Parallelkompression).
- *Vorteil*: Sie können eine Snare Drum oder Gesangsstimme mit 10:1 Ratio und 10 dB Gain-Reduction massiv verdichten und den MIX-Regler dann auf **40%** zurückdrehen. So erhalten Sie maximalen Druck, klare Transienten und endloses Sustain, ohne dass es gequetscht oder erstickt klingt.

### Rezept: Eine fette Snare
Eine Einstellung, die den „Ton“ des Kessels verlängert, ohne den Anschlag zu ersticken:

| Parameter | Wert |
|---|---|
| **Ratio** | 5:1 |
| **Attack** | 20–30 ms |
| **Release** | 80–125 ms |
| **Knee** | 4 (weich) |
| **Gain Reduction** | 3–6 dB bei einem normalen Backbeat |

- **Warum das weiche Knee:** In einem Set wechseln leise und laute Stücke. Mit Knee 4 setzt die Kompression allmählich ein und arbeitet so bei leisen Passagen wie bei lauten Backbeats, ohne dass der Threshold nachgestellt werden muss.
- **Der Release formt das Ausklingen:** Ein kürzerer Release holt das Sustain des Kessels schneller hoch, ein längerer hält es straffer.
- Das funktioniert nur mit einem sauberen Signal. Ist das Snare-Mikrofon voller Hi-Hat, hebt der Kompressor auch die Hi-Hat an: zuerst die Mikrofonposition korrigieren ([Kapitel 05](05_Gain_Staging_and_Preamps.md)).

### De-Essing: dynamisch statt statisch
Eine feste EQ-Absenkung bei 4–7 kHz reduziert Zischlaute, macht aber auch jede andere Silbe stumpfer. Ein De-Esser aus dem Effektrack ([Kapitel 09](09_Effects_Rack_and_Plugins.md)) als Insert im Gesangskanal senkt das Band nur ab, während tatsächlich ein „S“ erklingt.

---

## 6. Kanal-Inserts

Jeder Kanal kann wahlweise einen der 8 internen virtuellen Rack-Effektprozessoren oder ein externes Hardware-Gerät einschleifen:
1. Öffnen Sie **Channel → Config**.
2. **Insert**: Wählen Sie `FX 1L` bis `FX 8R` oder physische Klinkenbuchsen `Aux 1` bis `Aux 6`.
3. **Insert Position**:
   - **PRE**: Vor EQ und Kompressor eingeschleift.
   - **POST**: Nach EQ und Kompressor eingeschleift.
4. Schalten Sie den Schalter **INSERT ON** ein.

---

## 7. Stereo-Kanalverkopplung (Stereo Linking)

Ungerade und gerade Kanalpaare (z. B. 1+2, 3+4, 15+16) können zu einem echten Stereokanal verknüpft werden:
1. Wählen Sie den ungeraden Kanal (z. B. Kanal 1).
2. Drücken Sie auf der Seite **Config** den Drehknopf **Link** und bestätigen Sie mit `YES`.
3. Beide Scribble-Strips zeigen nun Klammern für die Verkopplung an.
4. **Verhalten der Verkopplung**: Fader, Mute, EQ, Kompressor und Preamp-Gain bewegen sich synchron.
5. **Unabhängiges Panorama**: Die Panoramaregler werden automatisch entkoppelt und gespiegelt (Kanal 1 hart links, Kanal 2 hart rechts), damit das Stereobild erhalten bleibt. Die Link-Regeln legen Sie unter **SETUP → CONFIG → Link Preferences** fest.

---

## 8. Aux-In-Kanäle & FX-Returns: reduzierte Bearbeitung

Alles oben Beschriebene gilt für die Eingangskanäle **1–32**. Die 8 Aux-In-Kanäle (Aux 1–6 plus USB L/R) und die FX-Returns sind schlankere Kanalzüge:

| Block | Kanäle 1–32 | Aux In 1–8 | FX-Returns 1–4 (L/R) |
|---|---|---|---|
| **Gain / Trim** | ✔ | ✔ | — |
| **Polarität** | ✔ | ✔ | — |
| **Low Cut** | ✔ | — | — |
| **Input-Delay** | ✔ | — | — |
| **Gate / Ducker** | ✔ | — | — |
| **Insert** | ✔ | — | — |
| **4-Band-EQ** | ✔ | ✔ | ✔ |
| **Kompressor** | ✔ | — | — |
| **Bus-Sends, Panorama, Fader, Mute** | ✔ | ✔ | ✔ |

Was das in der Praxis bedeutet:
- **Low Cut auf einem Aux-Kanal:** EQ-Band 1 auf **Low Cut** umschalten.
- **Alles, was Dynamik, Gate, Insert oder Delay braucht** (ein Keyboard, das komprimiert werden soll, Musik, die unter Sprache abgesenkt wird, ein Zuspieler, der laufzeitkorrigiert werden muss), gehört auf einen normalen Kanal. Die Quelle eines Kanals kann auf der Seite **Config** ein Aux In oder der USB-Player sein; die Buchse auf der Rückseite muss also nicht gewechselt werden.
- Planen Sie die Eingangsliste entsprechend: Aux Ins eignen sich ideal für Pausenmusik, Click- und Talkback-Rückwege und andere Quellen, die nur Pegel und EQ brauchen.
