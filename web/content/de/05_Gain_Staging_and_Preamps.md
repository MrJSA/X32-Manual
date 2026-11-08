# Kapitel 05: Gain Staging, Vorverstärker & Headamps

Gain Staging ist das fundamentale Fundament jeder Tontechnik – sowohl live auf der Bühne als auch im Aufnahmestudio. Auf digitalen Mischpulten wie dem Behringer X32 und Midas M32 garantiert ein sauberes Einpegeln den bestmöglichen Rauschabstand, erhält die maximale Dynamik und schützt vor digitaler Übersteuerung (Clipping).

Dieses Kapitel erläutert analoge Vorverstärker im Vergleich zu digitalem Trim, digitale Pegelkalibrierung, Phantomspeisungs-Sicherheitsregeln, Polaritätsumkehr, Gain-Sharing über AES50 und den Gain-Split-Modus.

---

## 1. Analoger Vorverstärker (Headamp) vs. digitaler Trim

Das X32 besitzt zwei getrennte Pegelstufen in seinem Eingangssignalfluss:

| Stufe | Bereich | Funktion |
|---|---|---|
| **1. Physischer XLR-Eingang** | — | Mikrofon- oder Line-Signal kommt an |
| **2. Analoger Vorverstärker** (Midas-Design) | -12 dB bis +60 dB, 0,5-dB-Schritte | Stellt den analogen Pegel **vor** dem A/D-Wandler ein |
| **3. A/D-Wandler** (Cirrus) | 24 Bit, 114 dB Dynamikumfang | Wandelt ins Digitale |
| **4. Digitaler Trim** | -18 dB bis +18 dB, 0,25-dB-Schritte | Digitale Verstärkung in der 40-Bit-DSP |
| **5. Bearbeitung** | — | Low Cut → Gate → EQ → Dynamik → Fader |

### Die wesentlichen Unterschiede:

| Merkmal | Analoger Preamp (Headamp) | Digitaler Trim |
|---|---|---|
| **Position** | Analoge Schaltung vor dem A/D-Wandler | Digitaler Signalprozessor nach dem A/D-Wandler |
| **Regelbereich** | -12,0 dB bis +60,0 dB | -18,0 dB bis +18,0 dB |
| **Rauscheinfluss** | Entscheidend: legt den Signal-Rausch-Abstand (SNR) fest | Ändert digitalen Pegel; hebt auch das Grundrauschen mit an |
| **Hardware-Bindung** | Fest an die **physische Buchse** gekoppelt | An den **Kanalzug des Pultes** gekoppelt |
| **Mehrfachbelegung** | Gemeinsam genutzt, wenn mehrere Kanäle denselben Eingang nutzen | Völlig unabhängig pro Kanalzug, selbst bei geteilten Eingängen |

> [!IMPORTANT]
> **Zentrales Grundprinzip:** Der Preamp-Gain gehört zur **physischen Buchse** (lokale XLR-Buchse 1–32 oder Stagebox-AES50-Buchse 1–48), *nicht* zum Faderzug. Liegen Kanal 1 und Kanal 17 beide auf Local In 1, verändert das Verstellen des analogen Gains auf Kanal 1 auch das Signal auf Kanal 17.

---

## 2. Digitales Metering & die -18-dBFS-Zielmarke

Im Gegensatz zu analogen Mischpulten, bei denen der Arbeitspegel bei `0 VU` (+4 dBu) liegt und danach noch 18 bis 24 dB analoger Headroom bis zur weichen Sättigung verbleiben, existiert in digitalen Systemen eine unnachgiebige Obergrenze bei **0 dBFS (decibels Full Scale)**. Jeder Pegel über 0 dBFS führt zu digitalem Rechteck-Clipping und unerträglichen Verzerrungen.

### Die digitale Pegelskala des X32:

| Pegel-LED | Pegel | Bedeutung |
|---|---|---|
| **CLIP** | 0 dBFS | Hartes digitales Clipping — Verzerrung, niemals erreichen |
| **-6** | -6 dBFS | Höchster sicherer Pegel für Transienten-Spitzen |
| **-12** | -12 dBFS | Normaler Spitzenpegelbereich |
| **-18** | -18 dBFS | **Nenn-Zielpegel** (= 0 VU / +4 dBu), die erste gelbe LED |
| **-30** | -30 dBFS | Normaler Dauerpegel |
| **-60** | -60 dBFS | Signal vorhanden |

### Die Goldenen Einpegel-Regeln:
1. **Effektivwert (RMS)**: Pegeln Sie den Vorverstärker so ein, dass Gesang oder Instrumente bei normalem Spiel durchschnittlich bei **-18 dBFS** liegen (die -18-dB-LED, die erste gelbe LED, leuchtet).
2. **Dynamische Spitzen (Transienten)**: Kurze Pegelspitzen (Kick-Drum-Kick, Snare-Schläge, laute Schreie) dürfen kurzzeitig zwischen **-12 dBFS und -6 dBFS** aufblinken.
3. **Niemals die rote CLIP-LED erreichen**: Leuchtet die rote Clip-LED auch nur einmal kurz auf, reduzieren Sie den analogen Gain sofort um 4 bis 6 dB.

---

## 3. Schritt-für-Schritt-Anleitung zum Einpegeln

Befolgen Sie während des Soundchecks genau diesen Ablauf:

1. **Kanal auf Solo schalten**: Drücken Sie die Taste `SOLO` des Kanals. Stellen Sie sicher, dass im Monitor-Menü **PFL (Pre-Fader Listen)** aktiv ist, damit Sie den unverfälschten Vorverstärkerpegel auf der Hauptpegelanzeige sehen.
2. **Fader unten lassen**: Belassen Sie den Fader auf -∞ (unten), damit während des Einpegelns keine lauten Pegelsprünge über die PA oder Monitore ertönen. EQ und Kompressor bleiben zunächst im Bypass.
3. **Musiker mit voller Dynamik spielen lassen**: Bitten Sie den Musiker, mit der **maximalen Live-Lautstärke** zu spielen oder zu singen (kein schüchternes Testen).
4. **Analogen Gain einstellen**: Drehen Sie den physischen `GAIN`-Drehregler oben links im Kanalzug, bis der Pegel im Durchschnitt bei **-18 dBFS** liegt und Transienten zwischen **-12 dBFS und -8 dBFS** liegen.
5. **Low-Cut (HPF) aktivieren**: Schalten Sie sofort den `LOW CUT`-Filter ein, um Trittschall und Griffgeräusche auszublenden, bevor sie nachfolgende Kompressoren unbemerkt triggern.

---

## 4. Phantomspeisung (+48V): Regeln & Sicherheit

Das Pult kann jede der 32 XLR-Buchsen und angeschlossene AES50-Stageboxen separat mit +48V Gleichspannung versorgen.

### Wann +48V aktiviert werden muss:
- **Kondensatormikrofone**: Gesangsmikrofone, Kleinmembraner, Overheads, Grenzflächenmikrofone.
- **Aktive DI-Boxen**: Aktive Direktboxen, die Speisung für ihre Elektronik benötigen.
- **Aktive Bändchenmikrofone**: Moderne Bändchen mit integriertem Vorverstärker.

### Wann +48V AUS bleiben muss:
- **Dynamische Mikrofone**: Shure SM58, Beta 57A, Sennheiser e935 (vertragen Phantomspeisung bei korrekter Verkabelung, benötigen sie aber nicht).
- **Passive Bändchenmikrofone**: Phantomspeisung kann empfindliche passive Aluminiumbändchen irreparabel beschädigen oder zerstören, falls Patchfelder oder fehlerhafte Kabel verwendet werden.
- **Line-Pegel-Geräte & Keyboards**: Synthesizer, DJ-Mixer, Laptops und Gitarren-Modeler. 48V an Line-Ausgängen kann Ausgangskondensatoren zerstören.

> [!WARNING]
> Schalten Sie den Kanal **immer stumm (MUTE)**, bevor Sie +48V ein- oder ausschalten. Das Schalten von Phantomspeisung auf einem offenen Kanal erzeugt einen massiven Gleichspannungs-Knall, der Hochtöner zerstören und das Gehör schädigen kann.

---

## 5. Phasenumkehr (Polarity Inversion / 180° Flip)

Die Polaritätstaste (`Ø`) dreht die elektrische Phasenlage des Signals um 180 Grad. Dies ist essenziell, wenn zwei Mikrofone dieselbe Schallquelle aus unterschiedlichen Richtungen oder Abständen aufnehmen.

| Mikrofon | Wenn sich das Fell nach unten bewegt | Polarität |
|---|---|---|
| **Snare oben** | Membran wird hineingedrückt → **positive** Spannung | Normal |
| **Snare unten** | Membran wird herausgezogen → **negative** Spannung | **Umkehren (Ø ein)**, damit beide Mikrofone phasengleich sind |

1. **Snare Top & Snare Bottom**:
   - Das obere Mikrofon wird von oben angestrahlt (positive Halbwelle).
   - Das untere Mikrofon blickt von unten auf das Resonanzfell (negative Halbwelle).
   - Ohne Phasenumkehr löschen sich die tiefen Frequenzen gegenseitig aus – die Snare klingt dünn und hohl. **Polarität am Bottom-Mikrofon umkehren**.
2. **Bassdrum Innen & Außen (Kick In / Kick Out)**:
   - Zwei Mikrofone in und vor der Basstrommel weisen oft Phasenauslöschungen im Bereich von 60–100 Hz auf. Hören Sie beide zusammen ab und drehen Sie an einem die Phase – behalten Sie die Einstellung mit dem druckvolleren Bassfundament.
3. **Bass-DI & Bass-Verstärkermikrofon**:
   - Das DI-Signal kommt ohne Verzögerung am Pult an, während das Mikrofon vor der Box die Schall-Laufzeit durch die Luft erfährt. Ein Phasendreh oder ein kurzes Input-Delay schafft saubere Summierung.
4. **Akustikgitarre mit Tonabnehmer und Mikrofon**:
   - Die Kombination eines internen Piezo-Tonabnehmers (unter dem Steg) mit einem externen Kondensatormikrofon erzeugt häufig Kammfiltereffekte. Das Umkehren der Polarität eines Kanals stellt oft die akustische Wärme wieder her.

---

## 6. Gain-Sharing über AES50 bei mehreren Konsolen

In modernen Produktionen wird ein Satz Stageboxen (z. B. Behringer S32 oder Midas DL32) routinemäßig von zwei oder drei Mischpulten (FOH, Monitor und Broadcast) gleichzeitig genutzt:

| Gerät | Verbunden mit | Clock | Preamp-Steuerung |
|---|---|---|---|
| **Stagebox (S32 / DL32)** | FOH-Pult, AES50 Port A | — | Wird ferngesteuert |
| **FOH-Pult** | Stagebox (Port A), Monitorpult (Port B) | **Master** | **HA Remote aktiv** — steuert die analogen Vorverstärker |
| **Monitorpult** | FOH-Pult, AES50 | Slave | Nur digitaler Trim |

### Das Gain-Konflikt-Problem:
Dreht der FOH-Mischer mitten im Song den Vorverstärker eines Gesangsmikrofons um 6 dB nach oben, wird dieses Signal auf der Monitor-Konsole augenblicklich ebenfalls um 6 dB lauter – die Musiker erschrecken im In-Ear und es drohen gefährliche Rückkopplungen auf der Bühne.

### Die Lösung: Remote-HA-Steuerung (SETUP → GLOBAL):
1. Öffnen Sie **SETUP → GLOBAL**.
2. Bestimmen Sie eine Konsole als **Preamp-Master** (meist das Monitorpult, das direkt an der Stagebox hängt).
3. Die andere Konsole empfängt den digitalen Datenstrom ohne Zugriff auf die Vorverstärker. Wählen Sie in den globalen Optionen den AES50-Port, dessen Pult die analogen Vorverstärker steuern darf (z. B. **AES50 Port A**), und bestätigen Sie **Enable HA** – die lokalen Preamp-Einstellungen werden dabei vom steuernden Pult überschrieben.

---

## 7. Der HA-Gain-Split-Modus (Unabhängiger digitaler Trim)

Firmware 4.x bietet mit **HA Gain Split** vollständige Pegelunabhängigkeit für alle vernetzten Mischpulte:

### So aktivieren Sie HA Gain Split:
1. Führen Sie den Soundcheck durch und stellen Sie saubere analoge Headamp-Pegel auf allen Eingängen ein.
2. Drücken Sie **SETUP** und öffnen Sie den Reiter **Global** (dieselbe Seite, auf der auch die Remote-HA-Einstellung liegt).
3. Schalten Sie **HA Gain Split** auf **ON**.

| Einstellung | Wo | Ergebnis |
|---|---|---|
| **HA Gain Split: ON** | SETUP → **Global** | Die analogen Vorverstärker sind verriegelt |
| **Gain-Regler der Kanäle** | Jeder Kanalzug | Steuern nun den **digitalen Trim**, -18,0 dB bis +18,0 dB in 0,25-dB-Schritten |

### Die Wirkung von Gain Split:
- Der physische `GAIN`-Drehregler jedes Kanalzugs steuert nun automatisch den **digitalen Trim (-18 dB bis +18 dB)**.
- Veränderungen des Trims wirken ausschließlich im DSP-Kanal dieses spezifischen Pultes; die analoge Vorstufe und alle anderen vernetzten Pulte bleiben absolut unberührt.
- Sollte während des Konzerts doch eine echte analoge Gain-Änderung zwingend nötig sein, kann sie weiterhin gezielt im Menü **SETUP → PREAMPS** vorgenommen werden.
