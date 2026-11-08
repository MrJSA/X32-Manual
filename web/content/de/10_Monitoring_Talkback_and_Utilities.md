# Kapitel 10: Abhören, Solo, Talkback & Hilfswerkzeuge

Ein Mischpult ist nur so leistungsfähig wie die Kontrolle des Toningenieurs über das akustische Geschehen: präzises Abhören, direkte Kommunikation mit der Bühne, Signalüberprüfung und das automatische Verwalten vieler offener Sprachmikrofone. Das Behringer X32 und Midas M32 bieten hierfür eine eigene Regie-Abhörsektion, getrennte Talkback-Matrizen (Talk A & B), einen Testsignal-Oszillator, einen 100-Band-Echtzeit-Analyzer (RTA) sowie einen 8-Kanal Dan-Dugan-Sprachautomixer.

Dieses Kapitel beschreibt Solo-Modi, Talkback-Routing, Testtöne zur Systemüberprüfung und den Einsatz des Automixers.

---

## 1. Regieraum- & Kopfhörer-Monitoring

Oben rechts auf der Pultoberfläche befindet sich die dedizierte Sektion **MONITOR**. Diese steuert sowohl die physischen Control-Room-Ausgänge auf der Rückseite (für Nahfeldmonitore) als auch die beiden 6,35-mm-Kopfhörerbuchsen an den vorderen Seitenwangen des Mischpults.

| Bedienelement | Funktion |
|---|---|
| **Level-Regler** | Eigene analoge Lautstärke für die Monitor- und Kopfhörerausgänge |
| **Mono** | Schaltet die Abhöre auf Mono |
| **Dim** | Senkt den Abhörpegel um 20 dB ab |
| **Talk A / Talk B** | Aktivieren das Talkback |
| **Talk-Level-Regler** | Vorverstärkung des Talkback-Mikrofons |

### Solo-Modi & Abhör-Logik:
Drücken Sie die Taste **MONITOR** neben dem Bildschirm, um die Einstellungen aufzurufen:

| Einstellung | Was Sie hören | Wofür |
|---|---|---|
| **PFL** (Pre-Fader Listen) | Das unverfälschte Signal direkt nach Gain und Low Cut; Fader und Mute haben keinen Einfluss | Einpegeln und Prüfen auf Brummen |
| **AFL** (After-Fader Listen) | Das Signal nach Fader, Panorama und Mute | Abhören von Stereo-In-Ear-Mischungen und Subgruppen |
| **Exclusive Solo** | Ein: ein Solo hebt alle anderen auf. Aus: Solos addieren sich | Aus, um mehrere Kanäle zusammen abzuhören |
| **Solo Dims** | Die Abhöre wird bei aktivem Solo um 20 dB abgesenkt | Schutz vor plötzlich lauten Signalen |

---

## 2. Talkback A & Talkback B Kommunikationsmatrix

Das Pult besitzt zwei voneinander unabhängige Talkback-Signalwege: **Talkback A** und **Talkback B**.

| Talkback-Quelle | Beschreibung |
|---|---|
| **Internes Mikrofon** | Eingebaute Kondensatorkapsel mit Kugelcharakteristik |
| **Externes Mikrofon** | Eigene XLR-Talkback-Buchse auf der Rückseite (+48V möglich) |

Die Ziele werden für Talk A und Talk B getrennt festgelegt; eine typische Belegung:

| Ziel | Typischer Einsatz | Ansprechen? |
|---|---|---|
| **Mix-Busse 1–8** | Bodenmonitore | ✔ |
| **Mix-Busse 9–16** | In-Ears der Musiker | ✔ |
| **Matrizen 1–6** | Garderobe / Backstage | Optional |
| **Main LR** | Saal-PA | ✘ **Während der Show immer aus** |

### Taster vs. Schalter (Push-to-Talk vs. Latch):
- **Tastbetrieb (Momentary)**: Halten Sie `TALK A` gedrückt, während Sie sprechen. Loslassen trennt die Verbindung sofort.
- **Dauerbetrieb (Latch)**: Ein kurzer Druck schaltet Talkback dauerhaft ein; erneuter Druck schaltet es aus. (Das Latch-Verhalten wird unter **Monitor → Talkback** eingestellt.)

### Best Practice im Live-Betrieb:
- **Talkback A**: Exklusiv auf **Busse 1–8 (Bühnenmonitore & IEM)** geroutet, um während der Probe direkt mit der Band zu kommunizieren.
- **Talkback B**: Geroutet auf **Aux Out / Matrix 6 (Inspizient, Lichtpult oder Garderobe)**, um mit der Crew zu sprechen, ohne die Musiker auf der Bühne zu stören.

---

## 3. Testsignal-Generator (Oszillator)

Der integrierte Oszillator erzeugt präzise Testsignale zur Überprüfung von Verkabelung, Signalwegen, Lautsprecherphasen und zur akustischen Raumabstimmung.

### Signalarten:
1. **Rosa Rauschen (Pink Noise)**: Gleiche Energie pro Oktave. Der akustische Standard für Raum-Entzerrung, RTA-Messungen und die Phasenanpassung der Subwoofer-Trennung.
2. **Weißes Rauschen (White Noise)**: Gleiche Energie pro Hertz. Höhenbetontes Rauschen zur Überprüfung von Hochtontreibern.
3. **Sinuston (Sine Wave)**: Reiner Einzelton, einstellbar von **20 Hz bis 20 kHz** in feinen 1-Hz-Schritten.

### Ablauf der Systemprüfung:
1. **Monitor → Oscillator** aufrufen.
2. **Sine Wave** mit **1000 Hz** (oder **Pink Noise**) wählen.
3. Pegel auf **-20 dBFS** einstellen.
4. Als Ziel **Main L/R** (oder einzelne Mix-Busse) wählen.
5. Generator aktivieren. Hören und prüfen Sie, ob alle Lautsprecher, Endstufen-Racks und Rückleitungen sauber ohne Brummen, Verzerrung oder Aussetzer arbeiten – bevor die Musiker eintreffen.

---

## 4. Der 8-Kanal Dan-Dugan-Automixer

Auf den **Kanälen 1 bis 8** steht ein lizenzierter **Dan Dugan Sprach-Automixer** mit Gain-Sharing-Algorithmus zur Verfügung:

| | Ohne Automixer | Mit Dugan-Gain-Sharing |
|---|---|---|
| **4 offene Sprachmikrofone** | Kammfilter (hohler Klang), vierfacher Raumhall und Lüftungsrauschen, hohe Rückkopplungsgefahr | Die Gesamtverstärkung bleibt konstant bei 0 dB |
| **Eine Person spricht** | Alle vier Mikrofone bleiben voll offen | Dieses Mikrofon erhält vollen Gain, die anderen drei werden um etwa 15 dB abgesenkt |
| **Zwei Personen sprechen** | — | Der Gain teilt sich 50/50 auf |
| **Klang** | — | Änderungen in Millisekunden — keine Gate-Artefakte, keine abgeschnittenen Silben |

### Einrichtung des Automixers:
1. Sprach- und Dialogmikrofone auf die **Kanäle 1 bis 8** patchen.
2. **Channel → Config** aufrufen (oder im Home-Menü den Reiter **Automix** wählen).
3. Den Automixer für die gewünschten Kanäle einschalten.
4. Die Kanäle **Gruppe X** oder **Gruppe Y** zuweisen (so lassen sich zwei unabhängige Diskussionsrunden gleichzeitig betreiben).
5. **Weight (Priorität)**:
   - Legt die relative Empfindlichkeit jedes Mikrofons fest (-12 dB bis +12 dB).
   - Moderator bzw. Hauptredner auf **+3 dB Weight**, Gäste der Runde auf **0 dB** stellen. Spricht der Moderator, bevorzugt das System automatisch seine Stimme gegenüber Teilnehmern, die dazwischenreden.

---

## 5. 100-Band-Echtzeit-Analyzer (RTA)

Das Pult enthält einen hochauflösenden 100-Band-RTA, der in jede Bildschirmebene integriert ist:
- **Balkenanzeige**: Kontrastreiche Frequenzverteilung mit 100 Balken und Peak-Hold-Anzeige.
- **Spektrogramm-Modus**: Fortlaufend scrollende Wasserfall-Anzeige, die dauerhafte Rückkopplungsfrequenzen über die Zeit sichtbar macht.
- **EQ-Kurven-Overlay**: Zeigt das Echtzeit-Spektrum direkt hinter dem Kanal-PEQ und den grafischen 31-Band-Equalizern an, sodass Sie Rückkopplungen während der Show sofort sehen und herausfiltern können.
