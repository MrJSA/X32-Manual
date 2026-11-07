# Kapitel 15: Live-Mixing-Workflows, System-Einmessung & Best Practices

Ein überragender Live-Mix erfordert mehr als reine Funktionskenntnisse des Mischpults: Er verlangt diszipliniertes Gain-Staging, eine methodische Soundcheck-Struktur, intelligente Lautsprecher-Einmessung, Feedback-Bekämpfung und eine saubere Broadcast-Streaming-Ausspielung.

Dieses Kapitel bietet eine praxiserprobte Soundcheck-Checkliste, PA-Systemabstimmung über Matrizen, Beseitigung akustischer Rückkopplungen, Lautheitsoptimierung für Live-Streams und einen strukturierten Diagnosebaum zur schnellen Fehlersuche.

---

## 1. Schritt-für-Schritt Live-Soundcheck-Checkliste

Dieser Ablaufplan hat sich in unzähligen Konzerten, Gottesdiensten und Events bewährt:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      LIVE-SOUNDCHECK-PROTOKOLL                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. EINSCHALT-REIHENFOLGE:                                                   │
│    Mischpult & digitale Stageboxen ZUERST AN ──► Endstufen & Subs ZULETZT!  │
│    (Ausschalten exakt umgekehrt: Endstufen ZUERST AUS, dann Pult).          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. LEITUNGSTEST (LINE CHECK) & GAIN-STAGING:                                │
│    - Kanal-Fader zunächst ganz unten lassen (-∞).                           │
│    - Kanal auf PFL (Pre-Fader Listen) vorhören.                             │
│    - Musiker spielt/singt mit maximaler Live-Lautstärke.                    │
│    - Gain so einpegeln: Durchschnitt bei -18 dBFS, Spitzen bei -12 bis -8.  │
│    - Sofort LOW CUT (HPF) aktivieren: 80–140 Hz für Gesang, 80 Hz Gitarren. │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. BÜHNENMONITORE PFEIFREI MACHEN (RING OUT ── BEVOR DIE BAND KOMMT):       │
│    - Gesangsmikrofone auf den Wedges langsam aufziehen, bis Kanten koppeln. │
│    - Pfeiffrequenzen auf dem RTA (Echtzeit-Analysator) ablesen.             │
│    - Rückkopplungen mit 6-Band-PEQ oder TruEQ schmalbandig absenken.        │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. MUSIKER-MONITORE EINSTELLEN (SENDS ON FADERS):                           │
│    - Sends on Faders auf Bus 1 (Monitor 1) aktivieren.                      │
│    - Musiker fragen, was benötigt wird: Grundstimmung, Tonhöhe, Rhythmus.   │
│    - Für alle weiteren Wedges und In-Ear-Mixe wiederholen.                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. SAALMISCHUNG (FRONT OF HOUSE) AUFBAUEN:                                  │
│    - Drums & Bass zuerst (Kick-Anschlag und Bass-Grundton verzahnen).       │
│    - Akustik- & E-Gitarren (Bereich um 400 Hz aufräumen für Transparenz).   │
│    - Keyboards & Zuspieler.                                                 │
│    - Lead-Vocals obenauf: Kompression 3:1 bis 4:1, Präsenz bei 3,5 kHz.     │
│    - Backing-Vocals: Dezent unter die Hauptstimme betten.                   │
│    - Zeitbasierte Effekte: Subtiler Hall (Hall/Vintage Plate) und Delay.    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. PA-Systemoptimierung & Lautsprecher-Einmessung mit Matrizen

Die Saal-Endstufen sollten niemals direkt vom Main LR Bus angesteuert werden. Stattdessen wird der Main LR Bus über die **Matrizen 1–4** ausgespielt, um Zugriff auf unabhängige Entzerrung, Frequenzweichen-Filter und Laufzeitverzögerungen (Delay) zu erhalten.

```
Main Left/Right Bus
        │
        ├──► [MATRIX 1: Haupt-PA Links]   ──► 6-Band PEQ + Limiter ──► XLR Out 15
        ├──► [MATRIX 2: Haupt-PA Rechts]  ──► 6-Band PEQ + Limiter ──► XLR Out 16
        ├──► [MATRIX 3: Subwoofer (Mono)] ──► Low-Pass 80 Hz + Delay ──► XLR Out 14
        └──► [MATRIX 4: Frontfills]       ──► High-Pass 100 Hz + Delay ──► XLR Out 13
```

### Laufzeitverzögerung (Delay) berechnen:
Um Frontfills oder Delay-Lines an die Haupt-PA anzupassen, gilt folgende physikalische Faustformel (Schallgeschwindigkeit bei 20 °C ca. 343 m/s):
$$\text{Verzögerung (ms)} \approx \frac{\text{Distanz (Meter)}}{0{,}343}$$
- Beispiel: Steht eine Delay-Lautsprecherreihe 15 Meter vor der Hauptbühne:
  $$\frac{15}{0{,}343} \approx 43{,}7 \text{ ms Verzögerung}$$
- Im Tab **Routing → Out 1–16** die entsprechende Ausgangsbuchse anwählen und das Ausgangs-Delay exakt auf diesen Wert einstellen.

---

## 3. Akustische Rückkopplungen (Feedback) eliminieren

Rückkopplungen entstehen, wenn der vom Lautsprecher abgestrahlte Schall wieder in das Mikrofon gelangt und sich im Kreis aufschaukelt.

```
┌─────────────────────────────────────────────────────────────┐
│          RICHTCHARAKTERISTIK & MONITOR-POSITIONIERUNG       │
├─────────────────────────────────────────────────────────────┤
│ 1. NIERE (CARDIOID, z. B. Shure SM58):                      │
│    - Höchste Dämpfung direkt auf der Rückseite (180°).      │
│    ► POSITION DES MONITORS: DIREKT HINTER DEM MIKROFONSTÄNDER│
├─────────────────────────────────────────────────────────────┤
│ 2. SUPER-/HYPERNIERE (z. B. Shure Beta 58A):                │
│    - Höchste Empfindlichkeit vorne, aber RÜCKWÄRTIGE KEULE! │
│    - Maximale Auslöschungspunkte liegen bei 120° und 240°   │
│      (schräg seitlich).                                     │
│    ► POSITION DER MONITORE: SCHRÄG SEITLICH (DOPPEL-WEDGES) │
│      Niemals einen Monitor direkt hinter ein Beta 58A legen!│
└─────────────────────────────────────────────────────────────┘
```

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

```
┌─────────────────────────────────────────────────────────────┐
│                 BROADCAST-MATRIX-LÖSUNG                     │
├─────────────────────────────────────────────────────────────┤
│ 1. Einen eigenen BROADCAST-MIX auf Matrix 5–6 anlegen.      │
│ 2. Matrix 5–6 von einem dedizierten Pre-Fader Mix-Bus oder  │
│    über User-Outputs speisen.                               │
│ 3. Schlagzeug und Rhythmusgitarren um +4 bis +6 dB anheben, │
│    um den fehlenden akustischen Raumschall auszugleichen.   │
│ 4. Atmo-Mikrofone für den Saal-Applaus zumischen.           │
│ 5. MASTERING-PROZESSOR auf Matrix 5–6 einschleifen:         │
│    - Combinator (5-Band-Multiband-Kompressor) ODER          │
│    - Fair Compressor + Precision Limiter.                   │
│ 6. ZIEL-LAUTHEIT: -14 LUFS (YouTube) bzw. -16 LUFS          │
│    (Facebook Live) mit einem True-Peak-Limit von -1 dB.     │
└─────────────────────────────────────────────────────────────┘
```

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
