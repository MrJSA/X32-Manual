# Kapitel 07: Mix-Busse, Sends-on-Faders & Matrizen

Die interne Audio-Architektur des Behringer X32 und Midas M32 umfasst **25 zeitkorrigierte Mix-Busse**: 16 frei konfigurierbare Mix-Busse, 6 Matrix-Busse sowie die drei Hauptsummen Left, Right und Center/Mono.

Dieses Kapitel beschreibt die Abgriffpunkte der Mix-Busse, den Sends-on-Faders-Workflow, Bühnen-Monitoring (Monitore vs. In-Ear), Audio-Subgruppen im Vergleich zu DCAs, parallele Schlagzeugkompression und die PA-Systemansteuerung über Matrizen.

---

## 1. Die Architektur der 16 Mix-Busse

Die 16 Mix-Busse erfüllen in Live- und Studio-Umgebungen drei zentrale Aufgaben:
- **Aux-Sends**: Monitorwege für Bodenmonitore, In-Ear-Monitoring (IEM) und Kopfhörermischungen.
- **Effekt-Sends**: Zuspielung an interne Hall-, Delay- und Modulationseffekte (traditionell Busse 13–16).
- **Audio-Subgruppen**: Zusammenfassung von Schlagzeug, Chor oder Bläsern für gemeinsame Gruppenbearbeitung.

| Abgriff | Greift das Signal ab … | Ergebnis |
|---|---|---|
| **Pre-EQ** | Vor Kanal-EQ und Dynamik | Unbearbeiteter Rohklang |
| **Post-EQ** | Nach dem EQ, vor dem Kompressor | Kein Kompressorpumpen im Monitor |
| **Pre-Fader** | Nach EQ und Dynamik | **Unabhängig** vom Kanalfader |
| **Post-Fader** | Nach Fader, Panorama und Mute | Folgt den Faderbewegungen am FOH |
| **Subgroup** | Feste 0 dB auf den Bus | Der Bus-Fader regelt die Gesamtlautstärke der Gruppe |

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

Taste **SENDS ON FADER** drücken (blinkt rot), dann:

| Methode | Sie wählen … | Die Fader zeigen dann … | Beispiel |
|---|---|---|---|
| **1 – Bus-Ansicht** | Einen Bus (z. B. Bus 1, Gesangsmonitor) | Linke 16 Fader = **Send jedes Kanals auf diesen Bus**; der Bus-Fader = Bus-Master | Fader 1 = Kick auf Bus 1, Fader 2 = Snare auf Bus 1 |
| **2 – Kanal-Ansicht** | Einen Kanal (z. B. Kanal 1, Lead-Gesang) | Rechte 8 Fader = **Send dieses Kanals auf jeden Mix-Bus** | Fader 1 = Gesang auf Bus 1, Fader 2 = Gesang auf Bus 2 |

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

| Weg | Routing | Bearbeitung | Ergebnis |
|---|---|---|---|
| **Trocken** | Drum-Kanäle 1–8 → Main Stereo LR | Keine zusätzliche | Dynamischer, knackiger Drumsound |
| **Gequetscht** | Drum-Kanäle 1–8 → Bus 1–2 (Subgruppe) → Main LR | Fair Compressor oder Ultimo 1176 (All-Buttons-Modus), 10–15 dB Gain-Reduction, schneller Attack, schneller Release | Mit dem Bus-1–2-Fader bei etwa -10 bis -6 dB unter die trockenen Drums mischen |

*Ergebnis:* Die trockenen Drums behalten Transienten-Knack und Stick-Anschlag, während der parallel gequetschte Bus massiven Raumklang, Körper und Sustain hinzufügt, ohne den Mix zu verschmieren.

---

## 6. Die 6 Matrix-Mischungen: „Der Mix vom Mix“

Ein Matrix-Mischer empfängt keine einzelnen Kanalzüge, sondern speist sich ausschließlich aus **Mix-Bussen 1–16, Main Left/Right und Mono/Center**:

| Matrix-Eingänge | Matrix | Ausgänge |
|---|---|---|
| Mix-Busse 1–16, Main Left/Right, Mono / Center | **Matrix 1–6** | Analoge XLR-Ausgänge (oder jeder andere Ausgang) |

### Warum Matrizen für die PA-Verteilung?
Wird die PA (Endstufen oder aktive Lautsprecher) direkt vom Main-LR-Fader gespeist, ist das riskant: Stößt jemand gegen den Masterfader, geraten Lautsprecherabstimmung und Delays durcheinander. Laufen die PA-Zonen über Matrizen, mischt der Main-LR-Fader die Show, während die Matrizen das Lautsprecher-Processing übernehmen.

### Bearbeitungsfunktionen der Matrizen:
- **6-Band parametrischer EQ**: Eigene Raumabstimmung pro Lautsprecherzone.
- **Limiter**: Schützt Endstufen und Treiber vor Überlastung.
- **Ausgangs-Delay (0 bis 500 ms)**: Unverzichtbar für die Laufzeitkorrektur nach Entfernung.

### Typische Matrix-Verteilung in Beschallungssystemen:
| Matrix | Zone | Gespeist von | Bearbeitung |
|---|---|---|---|
| **1** | Main PA links | Main L, post-fader | |
| **2** | Main PA rechts | Main R, post-fader | |
| **3** | Frontfills Bühne | Main L/R, post-fader | Delay ~18 ms, HPF 120 Hz |
| **4** | Balkon / Delayline | Main L/R, post-fader | Delay ~45 ms |
| **5** | Livestream / Web | Main L/R + Atmo-Mikrofone | Limiter, -14 LUFS |
| **6** | Foyer / Nebenraum | Main L/R | Mono-Summe |

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
