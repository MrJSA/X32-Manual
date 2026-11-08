# Kapitel 15: Live-Mixing-Workflows, System-Einmessung & Best Practices

Ein überragender Live-Mix erfordert mehr als reine Funktionskenntnisse des Mischpults: Er verlangt diszipliniertes Gain-Staging, eine methodische Soundcheck-Struktur, intelligente Lautsprecher-Einmessung, Feedback-Bekämpfung und eine saubere Broadcast-Streaming-Ausspielung.

Dieses Kapitel bietet eine praxiserprobte Soundcheck-Checkliste, PA-Systemabstimmung über Matrizen, Beseitigung akustischer Rückkopplungen, Lautheitsoptimierung für Live-Streams und einen strukturierten Diagnosebaum zur schnellen Fehlersuche.

---

## 1. Schritt-für-Schritt Live-Soundcheck-Checkliste

Dieser Ablaufplan hat sich in unzähligen Konzerten, Gottesdiensten und Events bewährt:

| Schritt | Was zu tun ist |
|---|---|
| **1. Einschaltreihenfolge** | Pult und digitale Stageboxen **zuerst** einschalten, Endstufen und Subs **zuletzt**. Ausschalten umgekehrt: erst die Endstufen, dann das Pult. |
| **2. Line-Check & Gain** | Fader unten (-∞), Kanal in **PFL** auf Solo, Musiker mit voller realistischer Lautstärke spielen lassen, analogen Gain auf durchschnittlich **-18 dBFS** mit Spitzen bei -12 bis -8 dBFS einstellen, dann **Low Cut** aktivieren (80–140 Hz Gesang, 80 Hz Gitarren). |
| **3. Monitore einpfeifen** *(bevor die Musiker kommen)* | Gesangsmikrofone auf den Monitoren hochziehen, bis es leicht zu klingeln beginnt, die Frequenz im **RTA** finden und mit dem 6-Band-PEQ des Busses oder einem TruEQ absenken. |
| **4. Monitore der Musiker** | Mit **Sends on Faders** auf Bus 1 (Monitor 1) fragen, was der Musiker braucht (eigene Stimme, Tonreferenz, Beat), und für jeden Monitor und In-Ear-Mix wiederholen. |
| **5. FOH-Mix ausbalancieren** | Erst Drums & Bass (Bassdrum-Klick und Bass-Grundton) → Akustik- & E-Gitarren (Platz um 400 Hz schaffen) → Keys & Zuspieler → Lead-Gesang obenauf (3:1–4:1 komprimieren, Präsenz bei 3,5 kHz) → Backing-Vocals darunter → dezenter Hall / Plate und Stereo-Delay. |

---

## 2. PA-Systemoptimierung & Lautsprecher-Einmessung mit Matrizen

Die Saal-Endstufen sollten niemals direkt vom Main LR Bus angesteuert werden. Stattdessen wird der Main LR Bus über die **Matrizen 1–4** ausgespielt, um Zugriff auf unabhängige Entzerrung, Frequenzweichen-Filter und Laufzeitverzögerungen (Delay) zu erhalten.

| Matrix | Zone | Gespeist von | Bearbeitung | Ausgang |
|---|---|---|---|---|
| **1** | Main PA links | Main L | 6-Band-PEQ + Limiter | XLR Out 15 |
| **2** | Main PA rechts | Main R | 6-Band-PEQ + Limiter | XLR Out 16 |
| **3** | Frontfills | Main L/R | Delay ~18 ms + HPF | XLR Out 13 |
| **4** | Balkon / Delayline | Main L/R | Delay ~44 ms + PEQ | XLR Out 14 |

### Laufzeitverzögerung (Delay) berechnen:
Um Frontfills oder Delay-Lines an die Haupt-PA anzupassen, gilt folgende physikalische Faustformel (Schallgeschwindigkeit bei 20 °C ca. 343 m/s):
$$\text{Verzögerung (ms)} \approx \frac{\text{Distanz (Meter)}}{0{,}343}$$
- Beispiel: Steht eine Delay-Lautsprecherreihe 15 Meter vor der Hauptbühne:
  $$\frac{15}{0{,}343} \approx 43{,}7 \text{ ms Verzögerung}$$
- Im Tab **Routing → Out 1–16** die entsprechende Ausgangsbuchse anwählen und das Ausgangs-Delay exakt auf diesen Wert einstellen.

---

## 3. Akustische Rückkopplungen (Feedback) eliminieren

Rückkopplungen entstehen, wenn der vom Lautsprecher abgestrahlte Schall wieder in das Mikrofon gelangt und sich im Kreis aufschaukelt.

| Richtcharakteristik | Beispiel | Am unempfindlichsten bei | Wohin der Monitor gehört |
|---|---|---|---|
| **Niere** | Shure SM58 | 180° (direkt hinten) | **Direkt hinter** das Mikrofonstativ |
| **Super- / Hyperniere** | Shure Beta 58A | 120° und 240° (hat eine rückwärtige Keule bei 180°) | **Seitlich** — zwei Monitore etwa 60° links und rechts der Rückseite. Niemals direkt hinter ein Beta 58A! |

### Einpfeifen (Ringing Out) von Monitoren mit dem RTA:
1. Den Monitor-Verstärker einschalten und den Monitor-Bus auf Solo abhören.
2. Das Lead-Gesangsmikrofon im Monitor langsam aufziehen, bis ein leichtes Schwingen hörbar wird.
3. Auf den **RTA im EQ-Bildschirm des Monitor-Busses** schauen: Eine scharfe Frequenzspitze springt sofort ins Auge (z. B. 2,5 kHz oder 630 Hz).
4. Ein schmales parametrisches Kerbfilter (**Q = 8,0**) aktivieren oder das entsprechende Band auf einem **TruEQ** um **-3 dB bis -5 dB** absenken.
5. Die Lautstärke erneut behutsam anheben und die nächste pfeifende Frequenz ziehen.
6. Nach 3 bis 4 Absenkungen stoppen – übermäßiges Filtern führt zu einem hohlen, unnatürlichen Stimmenklang.

---

## 4. Live-Streaming- & Broadcast-Mischung

### Der Unterschied zwischen Saal und Übertragung:
Ein hervorragender Saal-Mix klingt im Live-Stream oft dünn und unausgewogen:
- Im Raum füllt der natürliche akustische Schalldruck von Schlagzeug und Gitarrenverstärkern den Saal. Der Saaltechniker zieht die Stimmen laut auf und lässt Instrumente leiser.
- Im direkten Stream auf YouTube oder Facebook hört das Publikum kaum Schlagzeug oder Gitarren, während die Stimme unangenehm laut und trocken über allem liegt.

| Schritt | Was zu tun ist |
|---|---|
| **1. Eigene Mischung** | Eine eigene Broadcast-Mischung auf **Matrix 5–6** anlegen |
| **2. Speisen** | Von einem eigenen Broadcast-Mix-Bus (z. B. Bus 15–16, pre-fader), bei Bedarf plus Main LR |
| **3. Neu ausbalancieren** | Drums und Rhythmusgitarren um +4 bis +6 dB anheben, um die akustische Bühnenenergie zu ersetzen, die im Stream fehlt |
| **4. Raumklang** | Atmo- bzw. Publikumsmikrofone dazumischen |
| **5. Mastern** | **Combinator** oder **Fair Compressor + Precision Limiter** in Matrix 5–6 einschleifen |
| **6. Lautheit** | Ziel **-14 LUFS** (YouTube) oder **-16 LUFS** (Facebook Live), True-Peak-Obergrenze **-1 dB** |

---

## 5. Live-Fehlersuche: Der Diagnosebaum

Treten während einer Live-Aufführung Probleme auf, führt dieser strukturierte Diagnosebaum schnell zur Ursache:

### „Kein Signal auf Kanal X“:
1. **Kanal auf Solo (PFL) schalten**: Schlägt die 6-Segment-Pegelanzeige aus?
   - *NEIN*: Physisches Kabel, Mikrofon, Stagebox-Patch und +48V-Phantomspeisung prüfen.
   - *JA*: Das Signal kommt am Vorverstärker an. Weiter zu Schritt 2.
2. **Noise-Gate prüfen**: Leuchtet die Gate-LED (`G`) rot?
   - Wenn rot: Das Gate ist geschlossen. Den Threshold-Regler nach unten drehen.
3. **Kanal-Mute prüfen**: Leuchtet die rote `MUTE`-Taste am Fader?
4. **Mute-Gruppen & DCAs prüfen**:
   - Blinkt eine Master-Mute-Gruppe?
   - Steht ein DCA, dem der Kanal zugeordnet ist, ganz unten auf -∞?
5. **Bus-Zuweisung prüfen**:
   - Im Tab **Channel → Main** kontrollieren, ob **STEREO LR** blau leuchtet.
6. **Master-Fader prüfen**: Steht der Main LR Fader über -∞?

### „Lautes digitales Knallen & Audio-Mute“:
- **Ursache**: Elektrostatische Entladung (ESD) oder Clock-Verlust auf der AES50-Leitung.
- **Lösung**: Ungeschirmtes Cat5-Kabel unverzüglich durch **geschirmtes Kabel (STP)** mit geerdeten Neutrik EtherCON-Steckern ersetzen. Kontrollieren, ob die Synchronisation der FOH-Konsole auf **INTERNAL** steht.

### „Musiker hört keine Veränderung im In-Ear“:
- **Ursache**: Der FOH-Techniker hat fälschlicherweise den Saal-Fader oder DCA bewegt.
- **Lösung**: Bühnen-Monitore werden Pre-Fader versorgt! **Sends on Faders** auf dem entsprechenden Monitor-Bus aktivieren, um die Lautstärke für den Musiker anzupassen.

### „Starker Hall stört bei Ansagen/Sprache“:
- **Ursache**: Hall-Returns blieben nach dem Song aktiv.
- **Lösung**: Sofort nach dem letzten Akkord auf **MUTE GRP 3 (FX MUTE)** drücken.
