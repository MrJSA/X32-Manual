# Kapitel 11: Personal Monitoring: P16 & Midas DP48

Personal-Monitoring-Systeme ermöglichen es Musikern auf der Bühne, ihren eigenen In-Ear-Mix völlig autark nach ihren persönlichen Wünschen einzustellen – ohne die Aufmerksamkeit des FOH-Toningenieurs zu beanspruchen. Das Behringer X32 und Midas M32 unterstützen zwei etablierte Personal-Monitoring-Systeme: das **Behringer Powerplay P16** (über das Ultranet-Protokoll) und das **Midas DP48** (über AES50).

Dieses Kapitel beschreibt das Ultranet-Protokoll, Patching-Strategien für 16 Kanäle, die Einbindung von Atmo-Mikrofonen und die Midas-DP48-Integration.

---

## 1. Das Behringer Ultranet Powerplay P16 System

Der proprietäre **Ultranet**-Digitalbus überträgt bis zu 16 unkomprimierte Audiokanäle mit 24 Bit und 48 kHz über Standard-Netzwerkkabel (Cat5e):

```
┌─────────────────────────────────────────────────────────────┐
│ MISCHPULT: [ULTRANET OUT] (EtherCON RJ45)                   │
│    │                                                        │
│    ▼ (Geschirmtes Cat5e-Kabel)                              │
│ [P16-D VERTEILER-HUB] ──► Liefert Audio & Fernspeisung      │
│    ├──► Cat5e ──► P16-M Personal Mixer (Schlagzeuger)       │
│    ├──► Cat5e ──► P16-M Personal Mixer (Bassist)            │
│    ├──► Cat5e ──► P16-M Personal Mixer (Lead-Sänger)        │
│    └──► Cat5e ──► P16-M Personal Mixer (Keyboarder)         │
└─────────────────────────────────────────────────────────────┘
```

### Der P16-M Personal Mixer:
- **16 Kanalwahltasten**: Eigene Lautstärke, Stereo-Panorama, Solo und Mute pro Kanal.
- **3-Band-EQ mit semiparametrischen Mitten**: Individuelle Klangkorrektur auf jedem Kanal ohne Auswirkung auf die Saalmischung.
- **Integrierter Gehörschutz-Limiter**: Schützt das Gehör des Musikers vor versehentlichen Pegelspitzen.

---

## 2. Ultranet-Routing & Abgriffpunkte

Öffnen Sie **ROUTING → ULTRANET**, um die 16 P16-Kanäle zu belegen:

```
┌─────────────────────────────────────────────────────────────┐
│ ULTRANET-PATCHING-REGELN:                                   │
│ - Quelle: Kanal, Mix-Bus, Matrix, Direct Out oder Main      │
│ - Tap Point: ZWINGEND [POST-EQ] oder [PRE-FADER]!           │
└─────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **Zwingende Abgriff-Regel für Personal-Mixer:**
> Stellen Sie den Tap Point auf **POST-EQ** oder **PRE-FADER**!
> Verwenden Sie **niemals Post-Fader**: Steht Ultranet auf Post-Fader, verändert jedes Nachjustieren des FOH-Mischers im Saal sofort die Lautstärke im Ohr des Musikers. Pre-Fader liefert den fertigen Kanalklang inklusive EQ, trennt den Musiker aber zuverlässig von den Faderbewegungen der Saalmischung.

---

## 3. Die „16-Kanal-Strategie“ (The 16-Channel Squeeze)

Da eine typische Band oft 24 bis 32 Kanäle umfasst, müssen Einzelsignale für die 16 P16-Kanäle geschickt gebündelt werden:

| P16 Kanal | Signalquelle | Routing-Methode |
|---|---|---|
| **01** | Kick Drum | Direct Out (Kanal 1) |
| **02** | Snare Drum | Direct Out (Kanal 2) |
| **03** | Drums Summe (Toms/Overheads) | Mix-Bus 11 (Subgruppe) |
| **04** | E-Bass | Direct Out (Kanal 4) |
| **05** | E-Gitarre 1 | Direct Out (Kanal 5) |
| **06** | E-Gitarre 2 | Direct Out (Kanal 6) |
| **07** | Akustikgitarre | Direct Out (Kanal 7) |
| **08** | Keyboards / Flügel | Mix-Bus 12 (Stereo-Subgruppe) |
| **09** | Klick & Einzähler (Guide) | Direct Out (Aux In / Ch 9) |
| **10** | Zuspieler / Backing Tracks | Mix-Bus 13 (Stereo-Subgruppe) |
| **11** | Lead-Gesang 1 | Direct Out (Kanal 16) |
| **12** | Lead-Gesang 2 / Gast | Direct Out (Kanal 17) |
| **13** | Backing-Vocals / Chor | Mix-Bus 14 (Subgruppe) |
| **14** | Moderation / Kanzel | Direct Out (Kanal 32) |
| **15** | Atmo-Mikrofone Publikum | Direct Out (Crowd-Mikrofon Kanal 30) |
| **16** | Gesangshall (FX Reverb) | Direct Out (FX 1L Return) |

### Warum Atmo-Mikrofone auf Kanal 15 unverzichtbar sind:
Werden gut isolierende In-Ear-Ohrhörer getragen, fühlt sich der Musiker akustisch von der Außenwelt abgeschnitten (Kofferraum-Gefühl). Er hört weder den Beifall des Publikums noch Zurufe der Bandkollegen.
- Richten Sie zwei Kondensatormikrofone von der Bühne ins Publikum.
- Weisen Sie diese **nur** dem P16-Kanal 15 zu (niemals auf die Saalanlage schalten!).
- Der Musiker kann sich nun das Publikum nach eigenem Wunsch im Ohr dazumischen.

---

## 4. Midas DP48 Dual-48-Kanal Personal Mixer

Das **Midas DP48** stellt eine neue Generation dar und arbeitet direkt über **AES50** statt Ultranet:

```
┌─────────────────────────────────────────────────────────────┐
│ MIDAS DP48 BESONDERHEITEN:                                  │
│ 1. 48 Audiokanäle über AES50 (Cat5e).                       │
│ 2. ZWEI VÖLLIG UNABHÄNGIGE MISCHUNGEN (Mix A und Mix B):    │
│    Zwei Musiker (z. B. Drummer & Bassist) teilen sich EIN   │
│    Gerät mit getrennten Stereokopfhörerausgängen!           │
│ 3. 12 STEREO-GRUPPEN: Fasst Kanäle auf 12 Fader zusammen.   │
│ 4. INTEGRIERTES ATMO-MIKROFON: Mischt Raumklang direkt ein. │
│ 5. EINGEBAUTER SD-CARD-RECORDER: Zeichnet Proben direkt auf.│
└─────────────────────────────────────────────────────────────┘
```

### Anschluss des DP48 am Mischpult:
1. Verbinden Sie den **AES50 Port B** des Mischpults über ein geschirmtes Cat5e-Kabel mit dem Eingang des DP48 (oder schleifen Sie es über die Stageboxen durch).
2. Öffnen Sie am Pult **ROUTING → AES50 B OUT**.
3. Senden Sie die gewünschten Kanalblöcke (Kanäle 1–32 und Busse 1–16) auf AES50 B 1–48.
4. Am DP48 weisen Sie die Signale den **12 Gruppen** zu (z. B. Gruppe 1 = Drums, Gruppe 2 = Bass, Gruppe 3 = Gitarren, Gruppe 4 = Gesang).
5. Die Musiker stellen ihre In-Ear-Mischung mit den Drehreglern und dem kontrastreichen Farbdisplay ein – mit vollem Stereo-Panorama, EQ, Hall und Limiter pro Gruppe.
