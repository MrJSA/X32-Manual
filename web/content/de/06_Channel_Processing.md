# Kapitel 06: Kanalbearbeitungs-Architektur

Jeder Eingangskanal des Behringer X32 und Midas M32 verfügt über einen leistungsfähigen internen Bearbeitungszug, der von der 40-Bit-Fließkomma-DSP in Echtzeit berechnet wird. Jeder Kanalzug umfasst Phasenumkehr, ein steilflankiges Low-Cut-Filter, ein flexibles Gate/Expander/Ducker-Modul, Einschleifpunkte (Inserts), einen 4-Band vollparametrischen Equalizer mit Echtzeit-Analyzer (RTA), einen vollwertigen Dynamik-Kompressor/Limiter mit nativer paralleler Mischung sowie Bus-Zuweisungen.

Dieses Kapitel beschreibt den Signalfluss im Kanalzug, die Funktionsweise aller Bearbeitungsblöcke und praxiserprobte Einstellwerte für den Live-Betrieb.

---

## 1. Signalfluss-Architektur im Kanalzug

Das Verständnis der internen Bearbeitungsreihenfolge ist entscheidend, um das Zusammenspiel von Filtern, Kompressor und Fader zu beherrschen:

```
[Eingangsquelle] (Lokale XLR, AES50, Card oder Aux)
      │
      ▼
┌──────────────┐
│ ANALOG GAIN  │  (Bzw. digitaler Trim bei aktivem HA Gain Split)
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ POLARITÄT (Ø)│  180° elektrische Phasenumkehr
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ LOW CUT      │  20 Hz - 400 Hz (12 dB/Oktave Hochpassfilter)
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ GATE / DUCK  │  Expander 2/3/4, Gate, Ducker (Sidechain-Filter)
└──────┬───────┘
      │
      ├──────────────────────► [INSERT-PUNKT: PRE] (Internes Effektrack oder Aux)
      ▼
┌──────────────┐
│ 4-BAND PEQ   │  Low, Lo-Mid, Hi-Mid, High (Low Cut, Shelving, PEQ, High Cut)
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ DYNAMIK      │  Kompressor / Limiter / Expander (RMS/Peak, Mix %)
└──────┬───────┘
      │
      ├──────────────────────► [INSERT-PUNKT: POST] (Internes Effektrack oder Aux)
      ▼
┌──────────────┐
│ KANAL-MUTE   │  Stummschaltung des Kanals (Pre/Post-Fader-Sends konfigurierbar)
└──────┬───────┘
      │
      ▼
┌──────────────┐
│ 100mm FADER  │  Kanalpegel (-∞ bis +10 dB)
└──────┬───────┘
      │
      ├──────────────────────► [PANORAMA / BALANCE] ──► MAIN STEREO BUS (L/R)
      │                                             ──► MONO / CENTER BUS
      ▼
┌──────────────┐
│ BUS SENDS    │  Mix-Busse 1-16 (Abgriff: In/LC, Pre-EQ, Post-EQ, Pre-Fade, Post-Fade)
└──────────────┘
```

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

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ BETRIEBSMODI:                                                                │
│ 1. EXPANDER 2 (1:2 Ratio)  - Sanfte Absenkung unterhalb des Schwellenwerts   │
│ 2. EXPANDER 3 (1:3 Ratio)  - Mittlere Absenkung                              │
│ 3. EXPANDER 4 (1:4 Ratio)  - Kräftige Absenkung                              │
│ 4. GATE                    - Hartes Stummschalten unterhalb des Thresholds   │
│ 5. DUCK                    - Senkt Signal ab, wenn Steuersignal Threshold ÜBERSTEIGT│
└──────────────────────────────────────────────────────────────────────────────┘
```

### Parameter:
- **Threshold** (-80 dB bis 0 dB): Schwellenwert, ab dem das Modul öffnet.
- **Range** (0 dB bis 60 dB): Absenktiefe bei geschlossenem Gate. (Ein Wert von 12–18 dB klingt im Live-Mix deutlich natürlicher und musikalischer als ein abruptes 60-dB-Abschneiden!).
- **Attack** (0 bis 120 ms): Öffnungsgeschwindigkeit. Für Drums immer **0 ms** (sofortiges Öffnen).
- **Hold** (0,02 ms bis 2000 ms): Haltedauer, die das Gate nach Unterschreiten des Schwellenwerts noch voll geöffnet bleibt.
- **Release** (5 ms bis 4000 ms): Ausschwingzeit, in der das Gate sanft zufährt.

### Key-Filter (Sidechain-Filterung):
Das Steuersignal kann frequenzselektiv gefiltert werden:
- **Filtermodi**: Low Cut, High Cut oder Peak (Bandpass).
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

---

## 4. 4-Band vollparametrischer Equalizer (PEQ)

Jeder Eingangskanal verfügt über vier vollwertige parametrische Bänder. Band 1 (Low) und Band 4 (High) können alternativ als Kuhschwanz- (Shelving) oder Schnittfilter (Cut) arbeiten:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  BAND 1 (LOW)     : Low Cut (12 dB/Okt), Low Shelving oder Parametrisch (PEQ)│
│  BAND 2 (LO MID)  : Parametrisch (PEQ)                                       │
│  BAND 3 (HI MID)  : Parametrisch (PEQ)                                       │
│  BAND 4 (HIGH)    : High Cut (12 dB/Okt), High Shelving oder Parametrisch    │
├──────────────────────────────────────────────────────────────────────────────┤
│  Frequenzbereich  : 20 Hz bis 20 kHz (in feinen 1/3-Oktav-Schritten)         │
│  Gain-Bereich     : -15.0 dB bis +15.0 dB (0,5-dB-Schritte)                  │
│  Güte Q (Breite)  : 0.3 (breit, 2,5 Oktaven) bis 10.0 (chirurgisch schmal)   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Echtzeit-Analyzer (RTA):
Drücken Sie `VIEW` im EQ-Bereich. Das Display blendet den 100-Band-RTA direkt hinter der Filterkurve ein:
- **Abgriff**: **Pre** (zeigt das unveränderte Rohsignal) oder **Post** (zeigt das Ergebnis nach dem EQ).

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
  - *Langsam (20–40 ms)*: Lässt den Anschlagstransienten ungehindert durch, bevor komprimiert wird – sorgt für maximalen Klick und Druck bei Drums.
- **Knee** (0 = Hard Knee bis 5 = Soft Knee): Sanfterer Übergang in die Kompression.
- **Detektion**: **RMS** (gehörrichtig, musikalisch weich) vs. **Peak** (blitzschnell auf Spitzen reagierend).
- **Make-up Gain** (0 dB bis 24 dB): Gleicht den durch Kompression verlorenen Ausgangspegel wieder aus.

### Integrierte parallele Kompression (Der MIX-Regler):
Jeder Kanalkompressor im X32 besitzt einen integrierten **MIX-Regler (0% bis 100%)**:
- **100%**: Reines komprimiertes Signal (seriell).
- **40% – 50%**: Mischt 50% unkomprimiertes Originalsignal mit 50% brachial komprimiertem Signal (New-York-Style Parallelkompression).
- *Vorteil*: Sie können eine Snare Drum oder Gesangsstimme mit 10:1 Ratio und 10 dB Gain-Reduction massiv verdichten und durch Zurückdrehen des MIX-Reglers auf **45%** volle Transientenfrische und unendliches Sustain vereinen.

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
3. Fader, Mute, EQ, Kompressor und Preamp-Gain bewegen sich ab sofort synchron.
4. Die Panoramaregler werden automatisch spiegelbildlich auf 100% Links und 100% Rechts gepannt.
