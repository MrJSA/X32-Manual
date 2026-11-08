# Kapitel 04: Firmware 4.x User Routing & 1:1-Patching

*Funktionsweise des User-Input- und User-Output-Patchings ab Firmware 4.0, typische Einsatzszenarien und Schritt-für-Schritt-Einrichtung am Mischpult sowie in der Remote-Software.*

---

## 1. Warum User Routing unverzichtbar ist

Vor Firmware 4.0 konnten Eingänge und Ausgänge am X32 ausschließlich in **starren Achter-Blöcken** gepatcht werden. Kanäle 1–8 stammten entweder komplett von den lokalen Preamps 1–8, von AES50 A 1–8 oder von der USB-Karte – immer als geschlossene Einheit.

Dies führte in der Live-Praxis schnell zu massiver Kanalverschwendung:

- Auf der Bühne stehen 28 Mikrofone an einer digitalen Stagebox, am FOH-Pult befinden sich 4 Funkempfänger. Beim klassischen Block-Routing belegten die 4 Funkstrecken einen kompletten 8er-Block lokaler Eingänge – 4 wertvolle Kanäle der Stagebox blieben ungenutzt.
- Sie benötigten nur ein einziges Signal von einer zweiten Stagebox, mussten dafür jedoch einen vollen Achterblock reservieren.

Der bisherige Behelfsweg bestand darin, die **Kanalquelle** jedes einzelnen Kanalzugs manuell umzustellen (Channel → Config → Source). Das funktionierte zwar, verteilte die Patch-Logik jedoch über 32 verschiedene Menüseiten. Schnell lag unbemerkt dasselbe Mikrofon auf zwei Kanälen: Muted man den einen, war das Mikrofon immer noch hörbar, und die Fehlersuche im Live-Stress begann.

Das mit Firmware 4.0 eingeführte **User Routing** bietet ein echtes, zentrales 1:1-Patching. Jeder einzelne der 32 Eingangskanäle und bis zu 48 Ausgänge können völlig unabhängig mit jeder beliebigen Signalquelle belegt werden.

> [!NOTE]
> **Voraussetzung:** Firmware 4.0 oder neuer auf dem X32 / M32. Ältere Firmware-Versionen besitzen den Reiter *User* im Routing-Menü noch nicht.

---

## 2. Der Signalweg zum Kanalzug

| Schritt | Wo | Was passiert |
|---|---|---|
| **1. Physischer Eingang** | — | Local 1–32, AES50 A 1–48, AES50 B 1–48, Card 1–32, Aux In 1–6, Talkback int/ext |
| **2. User-Patch** | Routing → User | User In 1 … 32, jeder wählt eine der Quellen oben |
| **3. Eingangsblock** | Routing → Home | Eingänge 1–8 = *User In 1-8*, 9–16 = *User In 9-16*, 17–24 = *User In 17-24*, 25–32 = *User In 25-32* |
| **4. Kanal** | Channel → Config | Quelle IN 1 … 32 — **auf 1:1 lassen** |

Drei Einstellungen müssen ineinandergreifen:

1. Der **User Input Patch** legt fest, welche physische Buchse den Slot *User In N* speist.
2. Der **Eingangsblock** auf der Routing-Home-Seite muss auf *User In* geschaltet sein (z. B. *User In 1-8*). Andernfalls wird das User-Patching für diesen Block ignoriert. Sie können Blocktypen mischen: Kanäle 1–24 von AES50 und Kanäle 25–32 aus dem User Patch.
3. Die **Kanalquelle (Channel Source)** sollte auf Standard (1:1) verbleiben (Kanal N = Input N). Alle individuellen Zuordnungen gehören in das zentrale User-Patching.

---

## 3. User In im Vergleich zu User Out

| Merkmal | User In | User Out |
|---|---|---|
| Verfügbare Slots | 32 | 48 |
| Wählbare Signalquellen | Local 1-32, AES50 A 1-48, AES50 B 1-48, Card 1-32, Aux In 1-6, Talkback intern / extern | Alle Quellen von User In **plus** die 16 XLR-Outs, P16 1-16, Aux Out 1-6 und Monitor L/R |
| Zielanwendung | Die 32 Eingangskanäle (Eingangsblöcke *User In 1-8 …*) sowie Card- und AES50-Ausgänge | Card-Ausgänge und AES50 A / B-Ausgänge (Blöcke *User Out 1-8 … 41-48*) |
| Einschränkung | — | Kann nicht direkt eigene Kanalzüge des Pultes speisen |

User Out dient der flexiblen Bereitstellung von Signalströmen für **externe Geräte**: Mehrspur-Recorder, Streaming-Rechner oder Zweitmischpulte.

> [!TIP]
> **Mix-Busse und Matrizen in User Out einbinden:** Mix-Busse und Matrizen tauchen nicht direkt als Quelle in User Out auf. Weisen Sie den Bus oder die Matrix zuerst einem physischen Ausgang zu (z. B. *Aux Out 5 = Matrix 1, Post Fader*), und wählen Sie anschließend diesen Ausgang (*Aux Out 5*) im User-Out-Patch aus.

---

## 4. Schritt-für-Schritt-Konfiguration am Mischpult

1. Drücken Sie die Taste **ROUTING** und blättern Sie mit den Pfeiltasten nach rechts zum Reiter **User**.
2. Der **erste Dreh-Encoder** schaltet zwischen *User In* (Eingänge) und *User Out* (Ausgänge) um.
3. Wählen Sie den gewünschten Slot (z. B. User In 1) und stellen Sie mit den weiteren Encodern die physische Quelle ein.
4. Wechseln Sie zurück zum Reiter **Home** und stellen Sie die benötigten Eingangsblöcke auf **User In 1-8 / 9-16 / 17-24 / 25-32**.
5. Für Mehrspuraufnahmen öffnen Sie den Reiter **Card Out** (oder *AES50 A/B Out*) und wählen dort ebenfalls die passenden User-Blöcke. Mit dem sechsten Encoder blättern Sie durch die 32 Card-Kanäle und prüfen, welches Signal auf jedem liegt.

---

## 5. Typische Praxisszenarien

### Szenario 1: Stagebox plus Funkstrecken am FOH
28 Mikrofone an einer AES50-Stagebox, 4 Funkempfänger am FOH-Pult.

| User In Slot | Physische Signalquelle |
|---|---|
| 1–28 | AES50 A 1–28 |
| 29–32 | Local In 1–4 (oder Aux In 1–4) |

Eingangsblöcke: 1–8, 9–16, 17–24 und 25–32 auf *User In*. Kein Eingang wird verschenkt, und alle Funkstrecken stehen direkt am Mischplatz zur Verfügung.

### Szenario 2: Zwei Stageboxen und lokale Zuspielungen
Das Schlagzeug belegt 12 Eingänge an Stagebox A, der Rest der Band liegt an Stagebox B, und zwei Ansage-Mikrofone sind lokal angeschlossen.

| User In Slot | Physische Signalquelle |
|---|---|
| 1–12 | AES50 A 1–12 |
| 13–28 | AES50 B 1–16 |
| 29–30 | Aux In 1–2 |

Das Patching muss nicht sequentiell sein. Ein Bass-Rig mit zwei Ausgängen an Stagebox B kann auf die Kanäle 17/18 (*AES50 B 1-2*) gelegt werden, während die umliegenden Kanäle weiterhin von Stagebox A kommen.

### Szenario 3: Mehrspuraufnahme mit identischem Kanalabgriff
Stellen Sie die Card-Ausgänge auf **User In 1–32**. Die Aufnahmesoftware zeichnet exakt die den Kanälen zugeordneten Eingangssignale auf (Spur 1 = Kanal 1). Für den **Virtual Soundcheck** schalten Sie die Eingangsblöcke einfach auf **Card 1–8 … 25–32** um – alle Kanäle spielen sofort ihre aufgezeichneten Spuren ab.

### Szenario 4: 30 Einzelspuren + PA-/Streaming-Summe aufzeichnen
Card-Ausgänge auf **User Out 1–32**:

| User Out Slot | Signalquelle |
|---|---|
| 1–30 | Local In 1–30 (Bühneneingänge) |
| 31–32 | Summenausgänge (z. B. *Out 15 / Out 16* oder *Aux Out 5 / 6* mit Matrix) |

Die DAW oder Streaming-Software empfängt die Mischung auf den Card-Eingängen 31/32. Erwartet Ihre Streaming-Software die Mischung auf den ersten beiden Kanälen, legen Sie sie stattdessen auf User Out 1/2 und die 30 Eingänge auf 3–32.

### Szenario 5: Ein zweites Mischpult über AES50 B speisen
Stellen Sie die AES50-B-Ausgänge auf **User Out 1-8 … 41-48**. Damit wählen Sie bis zu 48 Signale für das andere Pult aus: Eingänge beider Stageboxen, Card-Rückwege, beliebige Ausgänge, P16-Feeds oder den Monitorbus.

---

## 6. Typische Fehlerquellen

- **Ein Eingang auf zwei Kanälen:** Wurde eine Kanalquelle manuell verstellt, kann ein Mikrofon auf zwei Fadern liegen. Das Stummschalten eines Kanals schaltet das Mikrofon dann nicht stumm. Belassen Sie die Kanalquellen auf 1:1 und nutzen Sie stets das User Patching.
- **Eingangsblock nicht auf User In gestellt:** Das Konfigurieren der User-Slots bewirkt nichts, solange der entsprechende 8er-Block im Home-Menü nicht auf *User In* steht.
- **Kein Umpatchen während des Live-Konzerts:** Jedes Umpatchen trennt die bisherige Signalverbindung augenblicklich. Speichern Sie vor Änderungen stets eine Szene (oder ein Routing-Preset in der LIBRARY).
- **Vorverstärker-Gain folgt dem physischen Eingang:** Nach dem Umpatchen regelt Kanalzug 2 möglicherweise den Gain der Stagebox-Buchse A2 statt des lokalen Eingangs 2. Der Gain gehört zur Buchse, nicht zum Fader.

---

*X32 ist eine Marke von Behringer / Music Tribe, M32 von Midas. Die praktischen Setup-Abläufe in diesem Handbuch orientieren sich an bewährter Praxis der Mischpulttechnik und an Routing-Anleitungen.*
