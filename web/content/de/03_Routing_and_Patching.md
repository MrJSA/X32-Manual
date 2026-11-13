# Kapitel 03: Routing, Patching & Signalverteilung

Die Routing-Matrix des Behringer X32 und Midas M32 ist eines der flexibelsten und zugleich meistunterschätzten Systeme des Mischpults. Seit Firmware 4.0 wurde die ursprüngliche feste Einteilung in Achter-Blöcke durch das **User 1:1 Routing** erweitert. Damit lässt sich jede physische Buchse (lokale XLRs, Stagebox-AES50, Erweiterungskarte oder Aux-Klinken) völlig frei und einzeln auf jeden beliebigen Kanalzug oder Ausgang patchen.

Dieses Kapitel erläutert die Routing-Architektur, Signalabgriffpunkte (Tap Points), Ein- und Ausgangs-Patching sowie praxisbewährte Routing-Vorlagen.

---

## 1. Übersicht der Routing-Architektur

Das Mischpult unterscheidet zwischen drei getrennten Ebenen: **Physische Anschlüsse**, die **Patch-Matrix** und der **Kanalzug (Channel Strip)**:

| Stufe | Wo am Pult | Was Sie wählen |
|---|---|---|
| **1. Physische Anschlüsse** | — | Local XLR 1–32, AES50 A 1–48, AES50 B 1–48, Card 1–32, Aux In 1–6 |
| **2. User-Input-Patch** *(Firmware 4.x)* | Routing → Reiter **User** | Eine beliebige physische Buchse für jeden der User In 1–32 |
| **3. Eingangsblöcke** | Routing → Reiter **Home** | Für die Eingänge 1–8, 9–16, 17–24 und 25–32 jeweils: Local, AES50 A/B (1–8 … 41–48), Card (1–8 … 25–32) oder User In |
| **4. Kanalquelle** | Channel → Config → **Source** | Auf 1:1 lassen (Kanal 1 = In 1, Kanal 2 = In 2, …) |

> [!TIP]
> **Grundregel:** Verändern Sie die individuelle Kanalquelle im Menü **Channel → Config** nur bei speziellem Channel-Splitting. Belassen Sie die Kanalquellen immer auf 1:1 (`In 1` bis `In 32`) und führen Sie alle Patch-Änderungen zentral im Menü **ROUTING** durch. Dies verhindert unübersichtliche Fehlzuweisungen und stumme Kanäle bei der Fehlersuche.

---

## 2. Block-Routing vs. User 1:1 Routing

### Klassisches Block-Routing (Firmware 1.x – 3.x):
Eingänge und Ausgänge wurden ausschließlich in festen Achter-Gruppen geroutet:
- Inputs 1–8 = Local 1–8
- Inputs 9–16 = Local 9–16
- Inputs 17–24 = AES50 A 1–8
- Inputs 25–32 = AES50 A 9–16

*Die Einschränkung:* Wer 28 Kanäle von der Bühne über eine Stagebox empfing und 4 drahtlose Funkstrecken am FOH-Pult einstecken wollte, musste für die 4 Funkmikrofone einen vollen 8er-Block der Bühnen-Stagebox opfern.

### Firmware 4.x User Routing:
User Routing bietet vollständige 1:1-Freiheit:
- **User In (32 Slots)**: Jeder einzelne Slot kann frei auf jeden beliebigen physischen Eingang geschaltet werden (Local 1–32, AES50 A 1–48, AES50 B 1–48, Card 1–32, Aux In 1–6, Talkback).
- **User Out (48 Slots)**: Benutzerdefinierte Ausgangs-Patchbay für physische Eingänge, Mix-Busse, Matrizen, Main LR, Monitorbus oder Direktausgänge.

---

## 3. Signalabgriffpunkte (Output Tap Points)

Wann immer ein Signal auf einen analogen XLR-Ausgang, einen Aux-Ausgang, den Ultranet-Bus (P16) oder eine Spur der USB-Karte geroutet wird, muss der **Abgriffpunkt (Tap Point)** festgelegt werden. Ein falsch gewählter Abgriffpunkt ist die häufigste Ursache für Probleme beim Monitoring oder Recording.

| Abgriffpunkt | Greift das Signal ab … | Typischer Einsatz |
|---|---|---|
| **In / LC** | Direkt nach Vorverstärker und Low Cut; vor Gate, EQ und Dynamik | Mehrspuraufnahme, Direct Outs |
| **Pre EQ** | Nach dem Gate, vor EQ und Kompressor | Feeds mit Rohklang |
| **Post EQ** | Nach dem EQ, vor dem Kompressor | Monitormischungen ohne Kompressorpumpen |
| **Pre Fader** | Nach EQ und Dynamik, **vor** Mute und Fader | Bühnenmonitore und In-Ear-Mischungen |
| **Post Fader** | Nach Fader, Panorama und Mute | Effekt-Sends, Broadcast- und Aufnahmemischungen, die dem FOH folgen |

| Abgriffpunkt | Signalcharakteristik | Empfohlener Einsatzzweck |
|---|---|---|
| **IN / LC** | Völlig unverändertes, sauberes Rohsignal direkt nach Gain und Hochpassfilter. Faderbewegungen, Mute, EQ und Kompressor haben keinerlei Auswirkung. | **Mehrspur-DAW-Aufnahme**: Garantiert saubere Rohspuren für den späteren Studio-Mixdown. |
| **PRE EQ** | Signal inklusive Gain und Gate; umgeht EQ und Kompressor. | Spezielle Monitoranwendungen oder externes Parallel-Processing. |
| **POST EQ** | Signal inklusive Gain, Gate und EQ; umgeht den Kanalkompressor. | Mitschnitte oder Broadcast-Sends, wenn EQ-Korrekturen gewünscht sind, aber kein Kompressorpumpen auf der Aufnahme landen soll. |
| **PRE FADER** | Signal inklusive EQ und Dynamikbearbeitung; **völlig unabhängig** von Kanal-Faderstellung und Mute. | **Bühnenmonitore & In-Ear-Monitoring (IEM)**: Faderbewegungen des FOH-Mischers verändern nicht die Lautstärke im Ohr der Musiker! |
| **POST FADER** | Streng abhängig von Faderstellung, Panorama und Mute-Status des Kanals. | **Effekt-Sends (Hall/Delay)**, **Haupt-PA-Lautsprecher**, **Matrizen**, **Delay-Lines** und **Livestream-Mischungen**. |
| **SUBGROUP** | Feste 1:1-Summierung ohne Pegelregler (feste Einheitsverstärkung / 0 dB). | Schlagzeug-Subgruppen, Bläsersätze oder Chöre. |

### Die „+M“-Abgriffe: Pre-Fader-Abgriff, der dem Mute folgt

In der Liste der Ausgangsabgriffe gibt es jeden Abgriff vor dem Fader doppelt: `IN/LC` und `IN/LC+M`, `Pre EQ` und `Pre EQ+M`, `Post EQ` und `Post EQ+M`, `Pre Fader` und `Pre Fader+M`. **+M bedeutet „mit Mute“.**

Alle Abgriffe vor dem Fader liegen auch vor der **Mute**-Taste des Kanals. Ein Direct Out mit Abgriff `Pre Fader` spielt deshalb weiter, wenn der Kanal am FOH stummgeschaltet wird.

| Abgriff | Kanal am FOH stummgeschaltet | Einsatz |
|---|---|---|
| **Pre Fader** | Der Ausgang **spielt weiter** | Mehrspuraufnahme; In-Ear-Feeds, die beim Soundcheck trotz stummer PA offen bleiben sollen |
| **Pre Fader+M** | Der Ausgang ist **ebenfalls stumm** | P16-Personal-Mixer und Direct Outs während der Show: Ein am FOH stummgeschaltetes Mikrofon (Rückkopplung, Redepause, Gespräche hinter der Bühne) ist auch im Ohr der Musiker stumm |

`Post Fader` braucht keine +M-Variante: Dieser Abgriff folgt dem Mute immer.

### Send-Abgriff und Ausgangs-Abgriff: zwei verschiedene Einstellungen

Eine Monitormischung hat **zwei** Abgriff-Einstellungen, die leicht verwechselt werden:

| Einstellung | Wo | Wert für einen Bühnenmonitor | Warum |
|---|---|---|---|
| **Kanal-Sends in den Bus** | Bus anwählen → `VIEW` in der Sektion Config/Preamp → Send-Abgriff (gilt jeweils für ein ungerade/gerade-Buspaar) | **Pre Fader** | Faderbewegungen am FOH verändern die Monitormischung nicht |
| **Ausgangs-Abgriff des Busses** | **ROUTING → Out 1–16** → Abgriff des Ausgangs, der den Bus führt | **Post Fader** | Der Bus-Masterfader (und sein Mute) regelt die Lautstärke des Monitors |

Steht der Ausgangs-Abgriff stattdessen auf Pre Fader, bewirkt der Bus-Masterfader nichts mehr, und der Monitor lässt sich nur noch an der Endstufe leiser stellen.

---

## 4. Die Ausgangs-Routing-Menüs im Detail

Drücken Sie die Taste **ROUTING**, um die verschiedenen Ausgangs-Tabs zu konfigurieren:

### A. Menü Out 1–16 (Analoge XLR-Ausgänge)
Konfiguriert die 16 rückseitigen XLR-Ausgangsbuchsen (oder über AES50 an digitale Stageboxen gesendete Ausgänge):
- **Output 1–16**: Bestimmt Quellkategorie (Main, Mix Bus, Matrix, Direct Out) und Abgriffpunkt (Tap Point).
- Standard-Belegung:
  - Outs 1–8: Mix-Busse 1–8 (Bühnenmonitore / In-Ear-Wege).
  - Outs 9–12: Mix-Busse 9–12 (Weitere Monitore oder Subgruppen).
  - Out 13: Matrix 1 (Frontfills).
  - Out 14: Mono/Center-Bus (Subwoofer-Weg).
  - Out 15 & 16: Main Left & Main Right (Haupt-Beschallungsanlage).

### B. Menü Aux Out (6,35-mm-Klinkenausgänge)
Konfiguriert die 6 symmetrischen Klinkenbuchsen auf der Pultrückseite:
- Ideal für Zuspielungen in Künstlergarderoben, Foyer-Beschallung, Videomitschnitte oder externe Hardware-Effektgeräte.
- Aux 5 und Aux 6 verfügen über parallele Cinch-Buchsen.

### C. Menü Ultranet (P16 Personal Monitoring)
Weist dem Ultranet-EtherCON-Port 16 diskrete Audiosignale zu. Versorgt Behringer P16-D Signalverteiler und P16-M Personal-Mixer direkt mit Audio und Strom:
- Bewährte Praxis: Signale auf **Pre-Fader** oder **Post-EQ** abgreifen, damit Musiker ihren Bühnensound unabhängig von FOH-Faderfahrten hören.
- Für die Show die **+M**-Variante (`Pre Fader+M`) bevorzugen, damit am FOH stummgeschaltete Kanäle auch auf den Personal-Mixern stumm sind.

### D. Menü Card Out (32-Kanal-DAW / USB-Erweiterung)
Definiert die 32 Audiosignale, die über die Erweiterungskarte (X-USB, X-LIVE, X-DANTE) gesendet werden:
- Für Live-Mitschnitte routen Sie **Local 1–32** oder **AES50 A 1–32** direkt auf Card Out.
- Als Abgriff wählen Sie **IN / LC** für saubere, unkomprimierte Studio-Spuren.

### E. Menüs AES50 A Out & AES50 B Out (Jeweils 48 Kanäle)
Sendet digitale Audiodaten über die EtherCON-Leitungen an Stageboxen, In-Ear-Systeme (DP48) oder Zweitkonsolen.

---

## 5. Drei praxisbewährte Routing-Vorlagen

### Vorlage 1: 28 Stagebox-Eingänge + 4 FOH-Funkmikrofone
*Situation:* Eine S32-Stagebox auf der Bühne liefert 28 Signale über AES50 Port A. Vier Funkempfänger stehen im FOH-Rack und sind an den lokalen XLR-Eingängen 1–4 des Pultes eingesteckt.

1. Drücken Sie **ROUTING** und wechseln Sie zum Tab **User**.
2. Wählen Sie mit dem ersten Encoder **User In**.
3. Stellen Sie die **Slots 1 bis 28** auf `AES50 A 1` bis `AES50 A 28`.
4. Stellen Sie die **Slots 29 bis 32** auf `Local In 1` bis `Local In 4`.
5. Wechseln Sie zum Tab **Home** (Eingangsblöcke).
6. Belegen Sie die vier Eingangsblöcke:
   - `Inputs 1-8`   = **User In 1-8**
   - `Inputs 9-16`  = **User In 9-16**
   - `Inputs 17-24` = **User In 17-24**
   - `Inputs 25-32` = **User In 25-32**
7. *Ergebnis:* Auf den Kanalzügen 1–28 liegt die Bühne; auf den Kanälen 29–32 liegen die lokalen Funkstrecken – ohne dass ein kompletter 8er-Block der Stagebox verloren geht!

### Vorlage 2: 30 Eingänge + Stereosumme über USB aufnehmen
*Situation:* Sie möchten 30 Kanäle einzeln auf einem Laptop aufzeichnen und auf den Spuren 31 und 32 gleichzeitig die fertige Stereosumme für einen Kontrollmitschnitt sichern.

1. Main L/R auf Aux Out legen:
   - Öffnen Sie **Routing → Aux Out**.
   - `Aux Out 5` = **Main L**, Abgriff: **Post Fader**.
   - `Aux Out 6` = **Main R**, Abgriff: **Post Fader**.
2. User-Ausgangspatch anlegen:
   - Öffnen Sie **Routing → User** und wählen Sie **User Out**.
   - Belegen Sie Slots 1–30 mit `Local In 1–30` (oder `AES50 A 1–30`).
   - Belegen Sie Slot 31 mit `Aux Out 5`.
   - Belegen Sie Slot 32 mit `Aux Out 6`.
3. Kartenausgänge zuweisen:
   - Öffnen Sie **Routing → Card Out**.
   - Stellen Sie die 4 Blöcke auf **User Out 1–8**, **User Out 9–16**, **User Out 17–24** und **User Out 25–32**.
4. *Ergebnis:* Ihre DAW zeichnet auf Spur 1–30 unverfälschte Vorverstärkersignale auf und sichert auf Spur 31–32 den abgemischten PA-Mix!

### Vorlage 3: Umschaltung für Virtual Soundcheck mit einem Tastendruck
*Situation:* Schnelles Hin- und Herschalten aller 32 Kanäle zwischen den Live-Mikrofonen der Bühne und den Zuspielspuren der DAW auf dem Computer.

1. **Live-Einstellung**:
   - `Routing → Home`: Inputs 1–32 stehen auf `AES50 A 1–32` (oder `Local 1–32`).
2. **Virtual-Soundcheck-Einstellung**:
   - `Routing → Home`: Inputs 1–32 umgestellt auf `Card 1–8`, `Card 9–16`, `Card 17–24` und `Card 25–32`.
3. Speichern Sie diese Umschaltung in zwei Snippets (z. B. `Snippet 01: VSC EIN`, `Snippet 02: VSC AUS`), die ausschließlich den Parameterbereich **Routing** umfassen. Nun schalten Sie das gesamte Pult mit einem Tastendruck um!
