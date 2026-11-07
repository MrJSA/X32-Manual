# Kapitel 09: Virtuelles Effektrack & Processors

Das Behringer X32 und Midas M32 verfügen über ein internes **virtuelles 19"-Effektrack mit 8 Stereo-Slots**, berechnet von dedizierten 40-Bit-Signalprozessoren. Das Mischpult macht schweres analoges Outboard-Equipment überflüssig, indem es legendäre Studio-Klassiker akkurat emuliert – darunter UREI 1176, Teletronix LA-2A, Fairchild 670, Pultec EQP-1A / MEQ-5, SPL Transient Designer, BBE Sonic Maximizer, EMT 250 sowie grafische 31-Band-Equalizer.

Dieses Kapitel beschreibt die Architektur des Effekt-Racks, die Arbeitsweisen Send/Return vs. Insert und die wichtigsten virtuellen Prozessoren.

---

## 1. Architektur des virtuellen Effekt-Racks

Die 8 FX-Slots unterliegen festen Architektur-Regeln:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ FX-SLOTS 1 BIS 4 (DOPPELTE NUTZUNG):                                        │
│ - Modus A: SIDECHAIN / SEND-RETURN (Hall, Delay, Modulation)                │
│   Gespeist von Mix-Bussen 13–16 ──► Berechnet in FX 1–4 ──► FX 1–4 Return   │
│ - Modus B: INSERT-PROZESSOR                                                 │
│   Direkt in Kanäle, Mix-Busse, Matrizen oder Main LR eingeschleift          │
├─────────────────────────────────────────────────────────────────────────────┤
│ FX-SLOTS 5 BIS 8 (REIN ALS INSERT NUTZBAR):                                 │
│ - Ausschließlich für Kanal-, Bus-, Matrix- oder Summen-Inserts reserviert. │
│   (Grafische EQs, Vintage-Kompressoren, Pultec-EQs, De-Esser, Enhancer)     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Die zwei Signal-Workflows:

```
A. SEND / RETURN WORKFLOW (Zeitbasierte Effekte wie Hall und Delay):
   Kanal-Fader ──► Mix-Bus 13 (Post-Fader Send) ──► FX Slot 1 (Reverb)
                                                          │
   FX 1 Return Fader (Aux/FX Layer) ◄─────────────────────┘
   (Steuert Gesamtlautstärke des Halls auf der Hauptsumme)

B. INSERT WORKFLOW (Dynamik- und Klangbearbeitung):
   Kanal In ──► Low-Cut ──► Gate ──► [INSERT-PUNKT: FX 5 (1176)] ──► EQ ──► Fader
   (100% des Audiosignals fließen seriell durch das Effektgerät)
```

---

## 2. Legendäre Vintage-Dynamikprozessoren

### A. Ultimo Compressor (Emulation des UREI 1176LN Peak Limiter)
Der schnellste und bissigste analoge Kompressor der Tonstudiogeschichte mit extrem schneller Feldeffekttransistor-Schaltung (FET).
- **Regler**:
  - `INPUT`: Treibt das Signal in den Schwellenwert (mehr Input = mehr Kompression).
  - `OUTPUT`: Make-up-Ausgangsverstärkung.
  - `ATTACK`: 20 bis 800 Mikrosekunden (*Achtung: 7 ist am schnellsten, 1 am langsamsten!*).
  - `RELEASE`: 50 bis 1100 Millisekunden (*Achtung: 7 ist am schnellsten, 1 am langsamsten!*).
  - `RATIO`: 4:1 (sanft), 8:1, 12:1, 20:1 und „ALL“ (der legendäre britische All-Buttons-In-Modus).
- **Einsatzbereiche**: Snare Drum (liefert den typischen Peitschenknall), druckvoller Rock-Gesang, E-Bass mit Durchsetzungskraft und parallele Drum-Subgruppen.

### B. Leisure Compressor (Emulation des Teletronix LA-2A Leveling Amplifier)
Modelliert den legendären Röhren-Opto-Kompressor mit T4-Elektrolumineszenzzelle.
- **Regler**: **Peak Reduction** (bestimmt die Kompressionstiefe) und **Gain** (Aufholverstärkung) mit **Compress / Limit**-Umschalter.
- **Zweistufiger Release**: Erholt sich in den ersten 60 ms um 50%, gefolgt von einem sanften, mehrere Sekunden dauernden Ausschwingen.
- **Einsatzbereiche**: Seidiger Lead-Gesang, Akustikgitarren und Kontrabass. Ein LA-2A klingt konstruktionsbedingt niemals harsch oder unmusikalisch.

### C. Fair Compressor (Emulation des Fairchild 670 Variable-Mu Röhrenkompressors)
Emuliert den legendären, tonnenschweren 20-Röhren-Stereokompressor, berühmt für analoge Wärme, Dichte und musikalischen „Zusammenhalt“ (Glue).
- **Einsatzbereiche**: Stereo-Schlagzeugsumme, Akustik-Ensembles und Main-LR-Mastering.

---

## 3. Röhren-Equalizer & Klangformer

### A. Vintage EQ1A (Pultec EQP-1A Röhren-Equalizer)
Legendärer passiver Röhren-Equalizer mit der berühmten Schaltungstrick-Möglichkeit:
- **Der Pultec-Bass-Trick**: Gleichzeitiges Anheben (`Boost`) und Absenken (`Atten`) bei 30 Hz oder 60 Hz. Durch leicht versetzte Filterkurven entsteht ein satter Bass-Schub mit gleichzeitig aufgeräumten Tiefmitten – ideal für Bassdrum und E-Bass!

### B. Wave Designer (SPL Transient Designer Emulation)
Ermöglicht pegelunabhängige Bearbeitung von Anschlagstransienten und Sustain:
- **ATTACK**: Verstärkt den Klick und Anschlag von Kickdrum und Snare (+), oder glättet harten Plektrum-Anschlag (-).
- **SUSTAIN**: Verlängert das Ausschwingen des Kessels (+), oder dämpft lästiges Nachhallen von Toms in halligen Räumen ab (-).

---

## 4. Hall- & Raumeffekte (Reverbs)

- **Vintage Reverb (EMT 250)**: Legendärer digitaler Weltraum-Hall; erzeugt offene, schwebende Hallräume, die Gesangsstimmen im Mix nach vorne tragen.
- **Hall / Room / Plate Reverbs**: Ausgezeichnete Lexicon-Style Algorithmen für dichte Plattenhall-Sounds auf Snares und natürliche Räume für Akustikinstrumente.
- **Stereo Delay**: Präzise rhythmische Echos synchronisierbar über Tap-Tempo.
