# Kapitel 02: Digitale Snakes, Stageboxen & AES50-Netzwerke

Das digitale Audionetzwerk-Protokoll SuperMAC AES50, ursprünglich von Sony Pro Audio entwickelt und von Klark Teknik verfeinert, bildet das digitale Rückgrat der Behringer X32- und Midas M32-Ökosysteme. Es überträgt bis zu 48 bidirektionale Audiokanäle mit 24 Bit und 48 kHz über ein einzelnes Netzwerkkabel bei einer Latenz im Sub-Millisekunden-Bereich. Damit ersetzt AES50 schwere, rauschanfällige analoge Multicores durch leichte, verlustfreie digitale Verbindungen.

Dieses Kapitel erläutert das AES50-Protokoll, die verschiedenen Stagebox-Modelle (S16, S32, SD8/16, DL16, DL32), die zwingenden Anforderungen an geschirmte Netzwerkkabel, Clock-Synchronisation, Kaskadierung und Gain-Sharing bei mehreren Pulten.

---

## 1. Das SuperMAC AES50-Protokoll

Jeder AES50-Port (Port A und Port B) überträgt und empfängt gleichzeitig:
- **48 bidirektionale Audiokanäle**: 48 Kanäle hinein, 48 Kanäle hinaus bei 48 kHz (oder 44,1 kHz) 24-Bit-PCM.
- **Ultra-niedrige Latenz**: Die Latenz über die Netzwerkstrecke ist deterministisch: exakt 3 Samples (~62,5 Mikrosekunden bei 48 kHz).
- **Steuerdaten**: Überträgt Vorverstärker-Steuerbefehle (Gain, +48V Phantomspeisung, Statusmeldungen) gemultiplext direkt im Datenstrom.

```
┌─────────────────────────────────────────────────────────────┐
│ PULTRÜCKSEITE:                                              │
│ [ AES50 PORT A ] ──► 48 In / 48 Out (Neutrik EtherCON)      │
│ [ AES50 PORT B ] ──► 48 In / 48 Out (Neutrik EtherCON)      │
│                                                             │
│ Gesamte Netzwerkkapazität: 96 Kanäle In / 96 Kanäle Out!    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Stagebox-Hardware im Vergleich

| Modell | Analoge Eingänge | Analoge Ausgänge | Vorverstärker-Klasse | Besonderheiten |
|---|---|---|---|---|
| **Behringer S16** | 16 XLR Mic/Line | 8 XLR Line | Midas-Design, programmierbar | Ultranet P16-Port, 2x optischer ADAT-Out, Kaskadier-Port. |
| **Behringer S32** | 32 XLR Mic/Line | 16 XLR Line | Midas-Design, programmierbar | 2 AES50-Ports, Ultranet-Port, 2 ADAT-Outs, kompaktes 3HE-Gehäuse. |
| **Behringer SD8** | 8 Combo (XLR/Klinke)| 8 XLR Line | Midas-Design, programmierbar | 2 Hi-Z Instrumenteneingänge, 2 integrierte Ultranet-Ports. |
| **Behringer SD16**| 16 Combo (XLR/Klinke)| 8 XLR Line | Midas-Design, programmierbar | 4 Hi-Z Instrumenteneingänge, 4 integrierte Ultranet-Ports. |
| **Midas DL16** | 16 XLR Mic/Line | 8 XLR Line | **Echte Midas Pro Preamps** | Legendäre Midas-Analogübertrager-Charakteristik, vergoldete Neutrik-Buchsen. |
| **Midas DL32** | 32 XLR Mic/Line | 16 XLR Line | **Echte Midas Pro Preamps** | 32 Pro Preamps, 16 symmetrische XLR-Outs, duales AES50, duales ADAT. |

---

## 3. ZWINGENDE VORSCHRIFT: Geschirmte STP-Kabel & EtherCON

> [!WARNING]
> Verwenden Sie für AES50-Verbindungen **unter keinen Umständen** ungeschirmte (UTP) Standard-Computer-Netzwerkkabel!

```
┌─────────────────────────────────────────────────────────────┐
│          DIE GEFAHR DURCH ELEKTROSTATISCHE ENTLADUNG        │
├─────────────────────────────────────────────────────────────┤
│ 1. Beim Ziehen oder Abrollen von Netzwerkkabeln über Teppiche│
│    oder Bühnenböden bauen sich enorme statische Spannungen  │
│    (bis zu 15.000 Volt) auf dem PVC-Kabelmantel auf.        │
├─────────────────────────────────────────────────────────────┤
│ 2. Bei einem UNGESCHIRMTEN (UTP) Kabel entlädt sich dieser   │
│    Funke direkt in die Datenpins der Pultbuchse.            │
├─────────────────────────────────────────────────────────────┤
│ 3. DIE FOLGEN:                                              │
│    - Sofortiger Verlust der Taktsynchronisation (lauter KNALL)│
│    - Vollständige Stummschaltung der gesamten PA             │
│    - Dauerhafte Zerstörung der AES50-Transceiver-Bausteine   │
│      (Cirrus Logic / Klark Teknik) auf der Pultplatine!     │
└─────────────────────────────────────────────────────────────┘
```

### Technische Mindestanforderungen an AES50-Kabel:
1. **Geschirmtes Twisted-Pair-Kabel**: **STP, FTP oder SF/UTP** Cat5e- oder Cat6-Kabel mit Folien- oder Geflechtschirm.
2. **Neutrik EtherCON-Metallgehäuse**: Robuste Metallhülsen an beiden Steckerenden.
3. **Durchgehende Schirmerdung**: Das Metallgehäuse des EtherCON-Steckers **muss beidseitig fest mit dem Schirmdraht des Kabels verlötet oder gecrimpt sein**, um statische Aufladungen sicher über das Gehäuse abzuleiten.
4. **Maximale Kabellänge**: Die zertifizierte Maximallänge beträgt **100 Meter**.

---

## 4. Master / Slave Clock-Synchronisation

In jedem digitalen Audionetzwerk darf **genau ein Gerät als Taktgeber (Clock Master)** fungieren. Alle anderen Geräte müssen als Empfänger (Clock Slaves) arbeiten.

```
┌───────────────────────────┐         AES50 Cat5e         ┌───────────────────────────┐
│ FRONT-OF-HOUSE-PULT       ├────────────────────────────►│ MONITOR-PULT              │
│ Synchronisation: INTERNAL │                             │ Synchronisation: AES50 A  │
│ (CLOCK MASTER: 48 kHz)    │                             │ (CLOCK SLAVE: 48 kHz)     │
└─────────────┬─────────────┘                             └───────────────────────────┘
              │ AES50 Cat5e
              ▼
┌───────────────────────────┐
│ STAGEBOX (S32 / DL32)     │
│ (Synchronisiert sich      │
│  automatisch auf AES50)   │
└───────────────────────────┘
```

### Konfigurationsschritte für die Taktsynchronisation:
1. **Front-of-House (Master-Pult)**:
   - Öffnen Sie **SETUP → CONFIG**.
   - Stellen Sie die **Sample Rate** auf `48 kHz` (oder `44.1 kHz`).
   - Wählen Sie unter **Synchronization** den Wert **INTERNAL**. (Ein grünes Symbol leuchtet neben Internal).
2. **Monitor-Pult oder Zweitkonsole (Slave-Pult)**:
   - Öffnen Sie **SETUP → CONFIG**.
   - Wählen Sie unter **Synchronization** den Port **AES50 A** (oder **AES50 B**, passend zur Kabelverbindung).
   - Prüfen Sie, ob in der oberen Statuszeile das grüne Symbol `AES50` dauerhaft leuchtet.

---

## 5. Kaskadierung mehrerer Stageboxen

Zwei 16-Kanal-Stageboxen (z. B. zwei Behringer S16 oder Midas DL16) lassen sich in Reihe schalten, um 32 Eingänge und 16 Ausgänge über ein einziges Kabel zum Mischpult zu übertragen:

```
[MISCHPULT] (AES50 Port A)
    │
    ▼ (Geschirmtes Cat5e-Kabel)
[STAGEBOX 1: S16 #1]
  - Port A: Verbunden mit Pult
  - Port B: Verbunden mit Stagebox 2
  - Betriebsmodus: Standard-Modus (Eingänge 1–16, Ausgänge 1–8)
    │
    ▼ (Kurzes geschirmtes Cat5e-Patchkabel)
[STAGEBOX 2: S16 #2]
  - Port A: Verbunden mit Stagebox 1 Port B
  - Betriebsmodus: Modus "+8" (Eingänge 17–32, Ausgänge 9–16)
```

### Routing-Einstellungen am Mischpult:
- Öffnen Sie **ROUTING → HOME**:
  - `Inputs 1-8`   = **AES50 A 1-8** (Stagebox 1)
  - `Inputs 9-16`  = **AES50 A 9-16** (Stagebox 1)
  - `Inputs 17-24` = **AES50 A 17-24** (Stagebox 2)
  - `Inputs 25-32` = **AES50 A 25-32** (Stagebox 2)
- Öffnen Sie **ROUTING → AES50 A OUT**:
  - `Outputs 1-8`  = **Out 1-8** (Sendet an XLR Out 1–8 der Stagebox 1)
  - `Outputs 9-16` = **Out 9-16** (Sendet an XLR Out 1–8 der Stagebox 2)

---

## 6. Multi-Konsolen-Netzwerk (FOH, Monitor & Broadcast)

Verbindung von FOH-, Monitor- und Broadcast-Pulten zum gemeinsamen Zugriff auf dieselben Bühneneingänge:

```
[STAGEBOX S32] ──► (Port A) ──► [MONITOR-PULT] (Port A)
                                [MONITOR-PULT] (Port B) ──► [FOH-PULT] (Port A)
                                                            [FOH-PULT] (Port B) ──► [BROADCAST]
```

1. **Durchschleifen am Monitorpult**:
   - Das Monitorpult empfängt die Stagebox auf **AES50 Port A**.
   - Um die unveränderten Bühnensignale an FOH weiterzuleiten, stellen Sie am Monitorpult unter **ROUTING → AES50 B OUT** die `Outputs 1-32` direkt auf `AES50 A 1-32`.
   - *Ergebnis*: Das FOH-Pult erhält die originalen Mikrofonkanäle verlustfrei und ohne Latenzverzögerung.
2. **Gain-Split-Schutz**:
   - Das Monitorpult verwaltet die analogen Preamps.
   - Am FOH- und Broadcast-Pult aktivieren Sie unter **SETUP → PREAMPS** die Funktion **HA Gain Split**.
   - FOH und Broadcast können nun unabhängige digitale Trim-Pegel (-18 dB bis +18 dB) anpassen, ohne den Monitormix der Musiker auf der Bühne zu verändern.
