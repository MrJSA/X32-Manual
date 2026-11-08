# Kapitel 07: Mix-Busse, Sends-on-Faders & Matrizen

Die interne Audio-Architektur des Behringer X32 und Midas M32 umfasst **25 zeitkorrigierte Mix-Busse**: 16 frei konfigurierbare Mix-Busse, 6 Matrix-Busse sowie die drei Hauptsummen Left, Right und Center/Mono.

Dieses Kapitel beschreibt die Abgriffpunkte der Mix-Busse, den Sends-on-Faders-Workflow, Bühnen-Monitoring (Monitore vs. In-Ear), Audio-Subgruppen im Vergleich zu DCAs, parallele Schlagzeugkompression und die PA-Systemansteuerung über Matrizen.

---

## 1. Die Architektur der 16 Mix-Busse

Die 16 Mix-Busse erfüllen in Live- und Studio-Umgebungen drei zentrale Aufgaben:
- **Aux-Sends**: Monitorwege für Bodenmonitore, In-Ear-Monitoring (IEM) und Kopfhörermischungen.
- **Effekt-Sends**: Zuspielung an interne Hall-, Delay- und Modulationseffekte (traditionell Busse 13–16).
- **Audio-Subgruppen**: Zusammenfassung von Schlagzeug, Chor oder Bläsern für gemeinsame Gruppenbearbeitung.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ DIE 16 MIX-BUSSE KÖNNEN WIE FOLGT ABGEGRIFFEN WERDEN:                       │
│                                                                             │
│ [Pre-EQ]    ──► Vor dem Kanal-EQ/Dynamikblock (reines Rohsignal)            │
│ [Post-EQ]   ──► Nach EQ, vor dem Kompressor (kein Kompressorpumpen im Monitor)│
│ [Pre-Fader] ──► Nach EQ & Dynamik; VÖLLIG UNABHÄNGIG vom Fader des Kanals   │
│ [Post-Fader]──► Nach Fader, Pan & Mute (folgt den Faderbewegungen der Front)│
│ [Subgroup]  ──► Feste 0-dB-Summierung; Bus-Fader steuert die Gesamtlautstärke│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Bearbeitungsfunktionen jedes einzelnen Mix-Busses:
Jeder der 16 Mix-Busse verfügt über eine vollwertige eigene Bearbeitungskette:
1. **6-Band vollparametrischer EQ**: Bänder 1 und 6 umschaltbar auf Low/High Cut, Shelving oder Peak.
2. **Dynamik-Prozessor**: Kompressor/Limiter mit RMS/Peak-Detektion und Make-up Gain.
3. **Insert-Slot**: Beliebige interne Rack-Effekte oder externe Hardware einschleifbar.
4. **Bus-Delay**: Einstellbar bis zu **500 ms** für akustische Laufzeitkorrekturen.
5. **Stereoverkopplung**: Ungerade/gerade Paare (1+2, 3+4, 5+6 usw.) können für Stereo-In-Ear-Mischungen verlinkt werden.

---

## 2. Der Sends-on-Faders-Workflow (SoF)

Das Einstellen von Monitormischungen über kleine Drehknöpfe ist unübersichtlich. Der Modus **Sends on Fader** verwandelt die Motorfader des Pultes auf Knopfdruck in echte Monitor-Send-Regler.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     [SENDS ON FADER] (Blinkt rot)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│ METHODE 1: EINEN BUS WÄHLEN (z. B. Bus 1 - Gesangsmonitor)                  │
│ - Taste SENDS ON FADER drücken (blinkt rot).                                │
│ - Die linken 16 Fader zeigen nun die SEND-ANTEILE jedes Kanals auf Bus 1!   │
│   (Fader 1 = Kick auf Bus 1, Fader 2 = Snare auf Bus 1 usw.)                │
│ - Der rechte Bus-Masterfader steuert die Gesamtlautstärke von Bus 1.        │
├─────────────────────────────────────────────────────────────────────────────┤
│ METHODE 2: EINEN KANAL WÄHLEN (z. B. Kanal 1 - Lead-Gesang)                 │
│ - Taste SENDS ON FADER drücken (blinkt rot).                                │
│ - Die rechten 8 Fader zeigen, wie laut DIESER KANAL auf jeden Bus geht!     │
│   (Fader 1 = Gesang auf Bus 1, Fader 2 = Gesang auf Bus 2 usw.)             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### So beenden Sie den Modus:
Drücken Sie die rot blinkende Taste **SENDS ON FADER** erneut. Die Motorfader fahren augenblicklich auf ihre regulären FOH-Positionen zurück.

---

## 3. Bühnenmonitore (Wedges) vs. In-Ear-Monitoring (IEM)

### A. Bodenmonitore (Wedges):
- **Zwingende Einstellung**: Busse für Bodenmonitore müssen auf **PRE-FADER** (oder Post-EQ) stehen.
- *Warum Pre-Fader Pflicht ist*: Bei Post-Fader würde jede Faderbewegung des FOH-Mischers die Lautstärke auf der Bühne verändern. Zieht der Mischer Gesang im Saal leiser, hört sich der Musiker selbst nicht mehr. Schiebt er ein Gitarrensolo laut, pfeift der Monitor auf der Bühne sofort in Rückkopplung.
- **Rückkopplungen einpfeifen**: Schleifen Sie einen **Dual TruEQ** ein oder nutzen Sie den 6-Band-PEQ des Busses mit schmalen Kerbfiltern (Q = 8,0), um die im RTA erkannten Feedback-Frequenzen gezielt abzusenken.

### B. In-Ear-Monitoring (IEM):
- **Stereo-Bus-Linking**: Verlinken Sie zwei Busse zu einem Stereopaar (z. B. Bus 1+2 für Sänger-IEM).
- **Panorama-Staffelung**: Durch gezieltes Verteilen der Instrumente im Stereofeld der Ohrhörer hören Musiker jedes Detail wesentlich klarer bei deutlich geringerer Gesamtlautstärke.
- **Hall auf den Ohren**: Musiker wünschen sich oft Raumhall. Mischen Sie die Stereo-Returns von **FX 1 (Reverb)** über Sends on Faders auf den IEM-Bus des Musikers.
- **Gehörschutz durch Limiter**: **Aktivieren Sie zwingend den Bus-Kompressor im Limiter-Modus (Ratio: 100:1, Attack: 0 ms, schneller Release)** auf jedem In-Ear-Bus. Der Schwellenwert wird so gesetzt, dass er im normalen Spiel nicht eingreift, aber herunterfallende Mikrofone oder herausgezogene Gitarrenkabel blitzschnell abfängt, bevor Gehörschäden entstehen!

---

## 4. Audio-Subgruppen vs. DCAs

Viele Techniker verwechseln Subgruppen und DCAs. Beide steuern mehrere Kanäle mit einem einzigen Fader, funktionieren aber völlig unterschiedlich:

| Eigenschaft | Audio-Subgruppe | DCA-Gruppe |
|---|---|---|
| **Audiosignal** | Summiert echte Audiosignale physikalisch zusammen | Führt **kein Audio**; reine Fernsteuerungs-Offsets |
| **Bearbeitung** | Eigener 6-Band-EQ, Kompressor, Insert-Rack und Delay | Keinerlei Signalbearbeitung |
| **Zuweisung** | Kanäle müssen von Main LR entkoppelt und auf den Bus geroutet werden | Kanäle bleiben direkt auf Main LR geschaltet |
| **Send-Verhalten** | Fester 0-dB-Send der Kanäle (nur Ein/Aus-Zuweisung) | Proportionale Faderfahrt über alle zugewiesenen Kanäle |
| **Bester Einsatz** | Schlagzeug-Buskompression, parallele Drum-Kompression, Chor-„Glue“ | Lautstärke von Bläsersätzen, Band-Stems oder Effekten steuern |

### Eine Audio-Subgruppe einrichten:
1. Die zu gruppierenden Kanäle auswählen (z. B. Kanäle 1–8: Drums).
2. Unter **Channel → Main** die Zuweisung zu **STEREO LR** aufheben. (Sie speisen den Saal dann nicht mehr direkt.)
3. Die Kanäle mit Send-Pegel **0 dB (Unity)** auf **Bus 1–2** routen und den Bus-Abgriff auf **Subgroup** stellen.
4. **Bus 1 und Bus 2** als Stereopaar verlinken.
5. **Bus 1–2** auswählen, auf **STEREO LR** routen und den Masterfader auf 0 dB stellen.
6. Nun steht eine vollständige Drum-Bus-Bearbeitung zur Verfügung: EQ anwenden, einen Bus-Kompressor einschleifen und das gesamte Schlagzeug mit den Bus-Fadern 1–2 steuern.

---

## 5. Parallele Schlagzeugkompression (New York Compression)

Parallele Kompression kombiniert ein dynamisches, knackiges Schlagzeug mit einer extrem stark komprimierten Kopie:

```
[DRUM-KANÄLE 1-8]
        │
        ├──► Direkt auf [MAIN STEREO LR] ──► (Knackiger, dynamischer Drumsound)
        │
        └──► Gesendet auf [BUS 1-2 (SUBGRUPPE)]
                     │
                     ▼
             [EXTREM-KOMPRESSOR]
             - Fair Compressor oder Ultimo 1176 (All-Buttons-Modus)
             - 10 bis 15 dB massive Pegelreduktion
             - Sehr schneller Attack, schneller Release
                     │
                     ▼
             [BUS 1-2 FADER] ───────────────► Unter Main LR dazumischen (-10 bis -6 dB)
```

*Ergebnis:* Die trockenen Drums behalten Transienten-Knack und Stick-Anschlag, während der parallel gequetschte Bus massiven Raumklang, Körper und Sustain hinzufügt, ohne den Mix zu verschmieren.

---

## 6. Die 6 Matrix-Mischungen: „Der Mix vom Mix“

Ein Matrix-Mischer empfängt keine einzelnen Kanalzüge, sondern speist sich ausschließlich aus **Mix-Bussen 1–16, Main Left/Right und Mono/Center**:

```
┌─────────────────┐
│ Mix-Busse 1-16  │ ──┐
├─────────────────┤   │      ┌──────────────┐
│ Main Left/Right │ ──┼─────►│ MATRIX 1 - 6 │ ──► [Analoge XLR-Ausgänge]
├─────────────────┤   │      └──────────────┘
│ Mono / Center   │ ──┘
└─────────────────┘
```

### Warum Matrizen für die PA-Verteilung?
Wird die PA (Endstufen oder aktive Lautsprecher) direkt vom Main-LR-Fader gespeist, ist das riskant: Stößt jemand gegen den Masterfader, geraten Lautsprecherabstimmung und Delays durcheinander. Laufen die PA-Zonen über Matrizen, mischt der Main-LR-Fader die Show, während die Matrizen das Lautsprecher-Processing übernehmen.

### Bearbeitungsfunktionen der Matrizen:
- **6-Band parametrischer EQ**: Eigene Raumabstimmung pro Lautsprecherzone.
- **Limiter**: Schützt Endstufen und Treiber vor Überlastung.
- **Ausgangs-Delay (0 bis 500 ms)**: Unverzichtbar für die Laufzeitkorrektur nach Entfernung.

### Typische Matrix-Verteilung in Beschallungssystemen:
```
MATRIX 1 (Main PA Links)     ◄── Gespeist von Main L (Post-Fader)
MATRIX 2 (Main PA Rechts)    ◄── Gespeist von Main R (Post-Fader)
MATRIX 3 (Frontfills Bühne)  ◄── Gespeist von Main L/R (verzögert um ~18 ms, HPF bei 120 Hz)
MATRIX 4 (Balkon / Delayline)◄── Gespeist von Main L/R (verzögert um ~45 ms)
MATRIX 5 (Livestream / Web)  ◄── Gespeist von Main L/R + Atmo-Mikrofone (Limiter auf -14 LUFS)
MATRIX 6 (Foyer / Nebenraum) ◄── Gespeist von Main L/R (Mono-Summe)
```

### Laufzeitverzögerung (Delay) berechnen:
Schall legt in der Luft bei 20°C etwa **0,343 Meter pro Millisekunde (1 Meter in ~2,9 ms)** zurück.
- *Beispiel:* Stehen Delay-Lautsprecher **15 Meter** von der Hauptbühne entfernt:
  $$\text{Delay} = \frac{15\text{ Meter}}{0,343\text{ m/ms}} \approx 43,7\text{ ms}$$
- Tragen Sie **43,7 ms** auf Matrix 4 ein. Haupt-PA und Delayline treffen exakt zeitgleich am Ohr des Zuhörers ein – kein störendes Echo!

---

## 7. Main Stereo Bus & Subwoofer über Aux/Mono (Aux-Fed Subs)

### Option A: Standard-Stereo Main LR (Subwoofer über Frequenzweiche)
Main L/R speist eine System-Frequenzweiche oder eine Sub-/Satelliten-PA. Alle Kanäle des Pultes gelangen entsprechend ihrem Tiefbassanteil gleichermaßen in die Subwoofer.

### Option B: Aux-gespeiste Subwoofer (Subwoofer auf dem Mono/Center-Bus)
Die Subwoofer werden ausschließlich vom **Mono-/Center-Bus** des Pultes gespeist:
1. Den Subwoofer-Verstärker an **Out 14** anschließen (Quelle: **Mono / Center**, Abgriff: **Post-Fader**).
2. Am Mischpult weisen Sie **ausschließlich Instrumente mit echtem Tiefbass** dem Mono-Bus zu:
   - Kick Drum: `MONO EIN`
   - E-Bass: `MONO EIN`
   - Synthesizer / Keyboards: `MONO EIN`
   - Standtom: `MONO EIN`
   - Alle Gesangsmikrofone, Akustikgitarren, Becken und Sprache: `MONO AUS`
3. *Vorteil:* Trittschall, Plosivlaute aus Gesangsmikrofonen und Rumpeln auf der Bühne können den Subwoofer **niemals** anregen. Das Low-End klingt extrem aufgeräumt, trocken und druckvoll!
