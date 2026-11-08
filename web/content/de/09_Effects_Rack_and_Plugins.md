# Kapitel 09: Virtuelles Effekt-Rack & Prozessoren

Das Behringer X32 und Midas M32 verfügen über ein internes **virtuelles 19"-Effekt-Rack mit 8 Slots**, berechnet von dedizierten 40-Bit-Signalprozessoren. Das Mischpult macht sperriges Outboard-Equipment überflüssig, indem es legendäre analoge Vintage-Hardware originalgetreu nachbildet – darunter UREI 1176, Teletronix LA-2A, Fairchild 670, Pultec EQP-1A / MEQ-5, SPL Transient Designer, BBE Sonic Maximizer, EMT 250 sowie grafische 31-Band-Equalizer mit „True Response“.

Dieses Kapitel beschreibt die Rack-Architektur, den Signalfluss Send vs. Insert, eine detaillierte Parameter-Analyse aller 30+ virtuellen Prozessoren und praxisnahe Mix-Workflows.

---

## 1. Architektur des virtuellen Racks & Routing-Modi

Die 8 FX-Slots unterliegen festen Architektur-Regeln:

| FX-Slots | Nutzbar als | Typische Prozessoren |
|---|---|---|
| **1–4** (doppelte Nutzung) | **Send / Return** — gespeist von den Mix-Bussen 13–16, Rückweg über die FX-1–4-Return-Fader | Reverbs, Delays, Modulation |
| | **Insert** — direkt in Kanälen, Mix-Bussen, Matrizen oder Main LR | Jeder Insert-Effekt |
| **5–8** (nur Insert) | **Insert** in Kanälen, Bussen, Matrizen oder Main LR | Grafische EQs, Vintage-Kompressoren, Pultec-EQs, De-Esser, Enhancer |

### Die zwei Signal-Workflows:

| Workflow | Signalweg | Was Sie steuern |
|---|---|---|
| **A. Send / Return** (zeitbasierte Effekte) | Kanalfader → Mix-Bus 13 (Post-Fader-Send) → FX-Slot 1 (Reverb) → FX-1-Return-Fader (Aux/FX-Layer) | Der Return-Fader regelt den gesamten Hallanteil im Main LR |
| **B. Insert** (Dynamik & Klangformer) | Kanal-In → Low Cut → Gate → **Insert-Punkt: FX 5 (1176)** → EQ → Fader | 100 % des Kanalsignals laufen seriell durch den Prozessor |

---

## 2. Vintage-Dynamikprozessoren

### A. Ultimo Compressor (Emulation des UREI 1176LN Peak Limiter)
Der schnellste und druckvollste Analog-Kompressor der Aufnahmegeschichte – nachgebildet wird eine extrem schnelle Gain-Reduction-Schaltung mit Feldeffekttransistor (FET).

| Regler | Bereich | Hinweise |
|---|---|---|
| **Input** | — | Treibt das Signal in den Threshold: mehr Input = mehr Kompression |
| **Output** | — | Make-up-Ausgangspegel |
| **Attack** | 20–800 µs | **7 ist am schnellsten, 1 am langsamsten** |
| **Release** | 50–1100 ms | **7 ist am schnellsten, 1 am langsamsten** |
| **Ratio** | 4:1, 8:1, 12:1, 20:1, **ALL** | 4:1 ist sanft; ALL ist der britische „All-Buttons-In“-Modus |
- **Ideal für**: Snare (mehr Crack und Körper), aggressive Rock-Vocals, Biss beim E-Bass und parallele Drum-Subgruppen.
- **Der „All-Buttons-In“-Modus**: Ratio-Taste `ALL` wählen. Die Kompressorschaltung verzerrt musikalisch, hebt den Raumanteil drastisch an und erzeugt den klassisch aggressiven „Drum-Crush“-Sound.

### B. Leisure Compressor (Emulation des Teletronix LA-2A Leveling Amplifier)
Bildet den legendären elektro-optischen Röhren-Abschwächer mit seiner warmen T4-Optozelle nach.
- **Bedienelemente**: **Peak Reduction** (Kompressionstiefe) und **Gain** (Make-up-Ausgangspegel), dazu ein Schalter **Compress / Limit**.
- **Zweistufiges Release**: Erst 50 % Erholung in 60 ms, danach ein allmähliches Release über mehrere Sekunden – abhängig davon, wie stark das Signal komprimiert wurde.
- **Ideal für**: Weiche Lead-Vocals, Akustikgitarren und Kontrabass. Ein LA-2A klingt praktisch nie hart oder unmusikalisch.

### C. Fair Compressor (Emulation des Fairchild 670 Variable-Mu-Röhrenkompressors)
Bildet den 30 kg schweren Stereo-Mastering-Kompressor mit 20 Röhren nach, berühmt für analoge Wärme, Dichte und zusammenhaltenden „Glue“.
- **Bedienelemente**: Input Gain, Threshold, DC Bias und **Time Constant (Presets 1–6)**.
  - *Time Constants 1–4*: Feste Attack-Zeit mit schnellem bis langsamem Release.
  - *Time Constants 5–6*: Programmabhängiges Auto-Release.
- **Betriebsarten**: Dual Mono, Stereo gekoppelt oder **Mitte-Seite (M/S)**.
- **Ideal für**: „Glue“ auf der Stereosumme, Drum-Subgruppen und akustische Streicher-Ensembles.

### D. Combinator (5-Band-Multiband-Kompressor)
Nachgebildet nach dem Behringer **MDX8000**, einem Multiband-Kompressor mit zwei Höheneinheiten; im X32 ist er ein Stereo-Prozessor (zweikanalig) mit fünf Bändern: **Low, Low-Mid, Mid, High-Mid und High**.
- **Globale Regler**: Mix (0–100 % Effektanteil), zweistufiges Attack (0–19; Anfangs-Attack ca. 0,5 ms bei 19 bis ca. 1,5 ms bei 0, volle Kompression nach ca. 8 ms), Release (20 ms – 3 s oder Auto), Ratio, Crossover-Lage und Crossover-Flankensteilheit (**12 oder 48 dB/Okt.** – erzeugt ca. 0,7 ms Latenz, bei zeitlich ausgerichteten Inserts beachten) sowie globaler Ausgangs-Gain.
- **Regler pro Band**: Threshold und Band-Gain für jedes Band; die Peak-Meter-Anzeige hilft beim Einstellen der Thresholds.
- **Spectral Balance Control (SBC)**: Fügt pro Band unabhängig bis zu **10 dB** automatisches Make-up-Gain hinzu, damit starke Kompression in einem Band den Gesamtklang nicht verändert.
- **Vorsicht bei Band Solo**: Band Solo ist *destruktiv* – es verändert den tatsächlichen Ausgang des Prozessors, nicht nur den Kopfhörer. Niemals während der Show auf einem PA-Insert verwenden.
- **Ideal für**: Main-LR-Summe, Livestream-/Broadcast-Matrix-Feeds und das Glätten unruhiger Backing-Vocal-Gruppen.

---

## 3. Vintage-Equalizer

### A. X-Tec EQ1 (Pultec EQP-1A Programm-Equalizer)
Eine originalgetreue Nachbildung des passiven Röhren-Equalizers, der die Geschichte der Musikproduktion geprägt hat.
- **Der berühmte „Pultec-Bass-Trick“**:
  - Der Pultec besitzt getrennte Regler für **Boost** und **Attenuate** auf derselben tiefen Frequenz (20, 30, 60 oder 100 Hz).
  - Da Boost- und Cut-Kurve leicht unterschiedliche Bandbreiten und Flanken haben, erzeugt **gleichzeitiges Anheben und Absenken** einen massiven, fokussierten Tiefbass-Punch und räumt die matschigen unteren Mitten direkt darüber aus!
- **Höhen-Sektion**: Wählbare Boost-Frequenz (3 bis 16 kHz) mit variabler Bandbreite (Q) plus separates High-Attenuation-Shelf (5, 10 oder 20 kHz).
- **Ideal für**: Bassdrum (60-Hz-Trick), E-Bass und seidige „Luft“ auf Vocals (Boost bei 12 kHz oder 16 kHz).

### B. X-Tec EQ5 (Pultec MEQ-5 Mitten-Equalizer)
Als Ergänzung zum EQP-1A konzipiert und ganz auf die kritischen Mittenfrequenzen ausgerichtet.
- **Low Mid Peak**: Anhebung bei 200, 300, 500, 700 oder 1000 Hz.
- **Mid Dip (Notch)**: Absenkung von 200 Hz bis 7 kHz (gezieltes Entfernen von Matsch und Härte).
- **High Mid Peak**: Anhebung bei 1,5, 2, 3, 4 oder 5 kHz.
- **Ideal für**: E-Gitarren, Snare-Körper, Präsenz bei Vocals und Bläsersätze.

---

## 4. Präzisions-Dynamik- & Klangprozessoren

### A. Dual / Stereo De-Esser (Emulation des SPL 1219)
Erkennt und dämpft automatisch scharfe Zischlaute („S“, „T“, „Sch“) mittels dynamischer Sidechain-Filterung.
- **Bedienelemente**: Tuning-Frequenz, Threshold und Bandbreite.
- **Stimmlagen-Umschalter**: Optimiert die Erkennung für männliche oder weibliche Stimmlagen.
- **Vorteil**: Stoppt schrille Zischlaute transparent, ohne den Rest der Gesangsdarbietung dumpf zu machen.

### B. Wave Designer (SPL Transient Designer)
Ein pegelunabhängiger Hüllkurven-Former, der Attack und Sustain perkussiver Klänge komplett neu formt, ohne von einem Lautstärke-Threshold abzuhängen.
- **ATTACK-Regler (-100 % bis +100 %)**:
  - Anheben (+20 % bis +50 %): Betont Stick-Anschlag und Transienten-Punch bei Bassdrum und Snare deutlich.
  - Absenken (-20 % bis -40 %): Mildert harten Plektrum-Anschlag bei Slap-Bass oder kräftig geschlagenen Akustikgitarren.
- **SUSTAIN-Regler (-100 % bis +100 %)**:
  - Anheben: Holt Raumanteil und Becken-Ausklang hervor.
  - Absenken (-30 % bis -60 %): Strafft klingelnde Toms und beseitigt dröhnendes Ausklingen ohne klassisches Gate.

### C. Precision Limiter
Ein sauberer Brickwall-Peak-Limiter mit Lookahead, variablem Squeeze-Threshold und Auto-Release.
- **Ideal für**: Schutz der In-Ear-Monitore (IEMs) der Musiker vor Gehörschäden und für Livestream-Matrizen, die vorgegebene Lautheitsgrenzen ohne Clipping einhalten müssen.

### D. Sound Maxer (BBE 482i Sonic Maximizer)
Richtet die Phase der Frequenzen aus, indem tiefe und mittlere Frequenzen leicht verzögert werden, sodass hohe Frequenzen zuerst am Ohr ankommen (wie in der natürlichen Akustik).
- **Bedienelemente**: Low Contour (straffe Bassanhebung) und Process (Klarheit in den Höhen).
- **Ideal für**: Belebung dumpfer Akustikgitarren, aktiver Bässe, Playbacks und älterer PA-Systeme.

### E. Dual / Stereo Enhancer (im Stil des SPL Vitalizer)
Psychoakustischer Obertongenerator, der Bassfrequenzen anreichert und den oberen Obertönen durch dynamische Phasenfilterung kristallklaren Glanz verleiht.

---

## 5. Grafische Equalizer (GEQ & TruEQ)

Das Pult bietet zwei unterschiedliche grafische 31-Band-Equalizer im Terzabstand:
- **Standard Stereo / Dual GEQ**: Klassischer, analog nachgebildeter grafischer Equalizer mit konstanter Güte (Constant-Q).
- **TruEQ (True Response GEQ)**: Patentierter Algorithmus, der benachbarte Filterbänder neu berechnet, um Überlappung und Welligkeit zwischen den Bändern zu beseitigen. Wird 1 kHz um -6 dB abgesenkt, sinkt *nur* 1 kHz – 800 Hz und 1,25 kHz bleiben unberührt.
- **Ideal für**: Inserts auf den Mix-Bussen der Bühnenmonitore, um Rückkopplungsfrequenzen herauszufiltern.

---

## 6. Zeitbasierte Effekte (Reverbs & Delays)

| Effekt-Prozessor | Charakter & Architektur | Optimaler Einsatz |
|---|---|---|
| **Vintage Reverb** | Emulation des legendären **EMT 250** (1976), des ersten vollelektronischen (digitalen) Halls. Warme, samtige, offene Diffusion; Nachhallzeit 0,4–4,5 s. | Lead-Vocals, Snare, Akustikgitarren. |
| **Plate Reverb / Rich Plate** | Helle, dichte mechanische Hallplatte mit schnellem Aufbau und schimmernder Höhenfahne. | Rock-Drums, moderne Pop-Vocals, Bläser. |
| **Hall Reverb** | Weitläufige Konzertsaal-Simulation mit einstellbarem Pre-Delay und Raumgröße. | Orchester-Streicher, Chöre, Balladen. |
| **Room Reverb / Ambience** | Enge, natürliche Raumreflexionen ohne lange Hallfahne. | Natürlichen Drum-Raumklang zu trockenen Direktsignalen hinzufügen. |
| **Stereo Delay** | Zwei unabhängige Delays mit Cross-Feedback, Low-/High-Cut-Filtern und Tap-Tempo-Sync. | Slapback auf Lead-Vocals, Stereo-Ping-Pong-Echos auf Gitarren. |
| **3-Tap Delay / Rhythm Delay**| Tempo-synchrones Multi-Tap-Delay mit eigenem Panorama und Pegel pro Tap. | Komplexe rhythmische Wiederholungen und atmosphärische Gitarrenflächen. |
| **Tape Delay** | Warmes Vintage-Bandecho mit Nachbildung von Flutter, Wow und Bandsättigung. | Rockabilly-Vocals, klassische E-Gitarren-Soli. |

---

## 7. Modulation, Pitch & Spezialprozessoren

- **Chorus, Flanger & Phaser**: Klassische analoge Eimerketten-Modulation (BBD) mit Stereo-Cross-Panning und Geschwindigkeitsreglern.
- **Rotary Speaker**: Originalgetreue Emulation eines Leslie-122-Kabinetts mit getrennt umschaltbarer langsamer/schneller Rotorgeschwindigkeit für Hammond-Orgeln und psychedelische Gitarren.
- **Sub Monster**: Subharmonischer Synthesizer, der die tiefen Frequenzen analysiert und darunter einen synthetischen Ton eine Oktave tiefer erzeugt. Hervorragend für dünne Bassdrums und E-Bass.
- **Pitch Shifter**: Zweistimmiger Tonhöhen-Transponierer (-12 bis +12 Halbtöne, Feinverstimmung in Cent). +4 Cent links und -4 Cent rechts ergeben eine üppige Vocal-Dopplung im Stil der 80er.
- **Guitar Amp & Tube Stage**: Röhrensättigung, Boxen-Emulationen und Verzerrerschaltungen für direkt per DI abgenommene Gitarren und Keyboards.

---

## 8. Hall auf die In-Ear-Monitore der Musiker schicken

Sänger performen mit Hall auf ihren In-Ears durchweg besser. So gehen Sie Schritt für Schritt vor:

1. **Hall-Rack prüfen**: Sicherstellen, dass FX-Slot 1 mit **Vintage Reverb** geladen ist, von **Bus 13** gespeist wird und auf **FX 1L / FX 1R** zurückkommt.
2. **IEM-Bus des Musikers wählen**: **Bus 1–2** (In-Ear des Lead-Sängers) auswählen.
3. **Sends on Faders aktivieren**: Taste **SENDS ON FADER** drücken (blinkt rot).
4. **FX-Return-Layer aufrufen**: In der linken Faderbank die Layer-Taste **AUX IN / FX RET** drücken.
5. **FX-Return-Fader hochziehen**: Den Return-Fader **FX 1L/R** auf etwa -10 dB bis -6 dB schieben.
6. **Sends on Faders verlassen**: **SENDS ON FADER** erneut drücken, um zum Saal-Mix zurückzukehren.
7. *Ergebnis:* Der Sänger hört einen schönen Stereo-Hall auf den Ohren, während der FOH-Techniker den Hall-Fader im Saal weiterhin zu 100 % unabhängig steuert!
