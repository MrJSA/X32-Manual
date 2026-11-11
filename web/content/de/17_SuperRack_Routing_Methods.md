# Kapitel 17: SuperRack Performer – Routing-Methoden

Die X32-Erweiterungskarte ist auf **32 Eingangs- und 32 Ausgangskanäle** begrenzt. Diese Grenze ist die zentrale Rahmenbedingung jedes SuperRack-Setups: Es muss entschieden werden, wie die 32 Sends und Returns auf **direkte Eingangsbearbeitung**, **Insert-Punkte** und **Bus-Bearbeitung** verteilt werden.

Dieses Kapitel stellt sechs Routing-Rezepte vor. A bis E reichen vom einfachsten bis zum anspruchsvollsten; F nutzt das User Routing der Firmware 4, um einzelne Kanäle statt Achter-Blöcke auszuwählen.

| Methode | Was wird bearbeitet | Belegte Kartenkanäle | Schwierigkeit |
|---|---|---|---|
| **A: Direct Input** | Alle 32 Eingangskanäle (vor der Kanalbearbeitung) | 32 / 32 | Einfach |
| **B: Aux-Insert** | Bis zu 6 Mono-Insert-Punkte auf beliebigen Kanälen, Bussen, Matrizen oder Main LR | 8 raus / 6 rein | Einfach |
| **C: Hybrid 24 + 6** | 24 Eingänge direkt + 6 Insert-Punkte | 32 / 32 | Mittel |
| **D: Inserts + Subgruppen + Eingänge** | 16 Eingänge + 6 Inserts + 8 Subgruppenkanäle (+ Stream-Signal) | 32 / 32 | Fortgeschritten |
| **E: X-DANTE + Dante Virtual Soundcard** | Wie B, aber über Dante statt USB | Dante | Mittel |
| **F: User Routing (Kanäle auswählen)** | 24 frei gewählte Kanäle + 6 Insert-Punkte + Stream-Signal, Kanalnummern bleiben gleich | 32 / 32 | Mittel |

> **Vor dem Start:** Die Einrichtung aus [Kapitel 16](16_SuperRack_Performer_Setup.md) abschließen: 48 kHz, Karte im 32 × 32-Modus, Preamp-Gains eingestellt.

---

## Methode A: Direct Input (alle 32 Kanäle)

Die Standardmethode mit der geringsten Latenz. Alle 32 Quellen gehen direkt nach den Preamps zu SuperRack und kommen zurück in die Kanalzüge.

**Signalweg:** Preamp → Card Out → SuperRack (Plugins) → Card In → Kanalzug (Gate, EQ, Dynamik, Fader)

### Routing am Pult

**1. `ROUTING → Card Out`:** dieselben *Quellen* senden, die die Kanäle normalerweise nutzen.

| Card-Out-Block | Quelle (Beispiel: alles lokal) | Alternativen |
|---|---|---|
| 1–8 | Local 1–8 | AES50 A 1–8 |
| 9–16 | Local 9–16 | AES50 A 9–16 |
| 17–24 | Local 17–24 | AES50 B 1–8 / Local 1–8 |
| 25–32 | Local 25–32 | User In 25–32 |

> **X32 Rack / Compact mit 16-Kanal-Stagebox:** z. B. `Card Out 1–16 = AES50 A 1–16`, `17–32 = Local 1–16`. Mit dem User Routing der Firmware 4 kann einfach auf allen vier Blöcken `User In 1–32` gewählt werden (siehe [Kapitel 04](04_Firmware_4x_User_Routing.md)).

**2. `ROUTING → Input`:** die Karte zurück auf die Kanäle legen.

| Eingangsblock | Quelle |
|---|---|
| Ch 1–8 | Card 1–8 |
| Ch 9–16 | Card 9–16 |
| Ch 17–24 | Card 17–24 |
| Ch 25–32 | Card 25–32 |

**3. SuperRack:** Eingang von Rack *n* = `Mono → Input n`; der Ausgang folgt automatisch.

### Eigenschaften
- ✔ Geringste Latenz (etwa 5,9 ms bei 32 Samples Puffer, siehe [Kapitel 18](18_SuperRack_Latency_and_Buffer.md)).
- ✔ Alle 32 Kanäle werden bearbeitet.
- ✘ SuperRack sitzt **vor** Gate, EQ und Dynamik des Pults. Plugins lassen sich nicht hinter die Kanalbearbeitung setzen.
- ✘ Busse, Matrizen und Main LR lassen sich nicht ohne Weiteres bearbeiten.
- **Tipp:** Übernimmt Waves Gate, EQ und Kompression komplett, auf diesen Kanälen Low Cut, Gate, EQ und Dynamik des Pults **ausschalten**, um doppelte Bearbeitung zu vermeiden.

---

## Methode B: Aux-Insert (6 Insert-Punkte)

Das Insert-System des X32 wurde für externe Hardware entwickelt: Ein Signal verlässt das Pult über **Aux Out 1–6** und kommt über **Aux In 1–6** zurück. Werden diese Aux-Anschlüsse auf die Karte umgepatcht, wird SuperRack zu einem „Hardware“-Insert, der auf **jedem** Kanal, Mix-Bus, jeder Matrix oder dem Main-LR-Bus sitzen kann.

**Signalweg:** Kanal oder Bus → Insert (Aux *n*) → Card Out *n* → SuperRack → Card In *n* → Aux In *n* → zurück in Kanal oder Bus

### Routing am Pult

**1. `ROUTING → Input → Aux In` = `Card 1–6`**
- Die umgepatchten physischen Aux-Eingänge stehen nicht mehr zur Verfügung. Wird Aux 5/6 für einen Musik-Player gebraucht? Stattdessen `Card 1–4` (oder `Card 1–2`) wählen, um die übrigen Aux-Eingänge zu behalten.

**2. `ROUTING → Card Out → 1–8` = `Aux 1–6 / Mon`**
- Das ist die **Aux-Out**-Seite.
- Die Kartenkanäle **7–8 führen das Monitor-Signal (Control Room) L/R**. Sie werden nicht ans Pult zurückgeführt; in SuperRack ignorieren (oder zum Aufnehmen des Abhörsignals nutzen).
- Die physischen Aux-Ausgänge stehen dann ebenfalls nicht mehr für andere Zwecke zur Verfügung.

> **Warnung:** Als Card-Out-Quelle **nicht** Aux **In** wählen. Damit wird der Rückweg in sich selbst zurückgeschickt und es entsteht eine Rückkopplungsschleife.

**3. Insert auf einem Kanal oder Bus**
1. Den Kanal (oder Bus, Matrix, Main LR) anwählen.
2. Im Bereich **Config/Preamp** `VIEW` drücken (oder `HOME → Config` öffnen).
3. Den **Insert**-Encoder nach unten auf `Aux 1` drehen (unterhalb der internen FX 1–8) und **Connect** drücken.
4. Position wählen: **Pre** (vor EQ und Dynamik) oder **Post** (nach EQ und Dynamik).
5. **Insert** drücken, um ihn zu aktivieren.

**4. SuperRack:** Rack-Eingang `Mono → Input 1`; der Ausgang folgt automatisch.

### Stereo-Inserts (z. B. Main LR)
Ein Stereo-Bus belegt **zwei** aufeinanderfolgende Aux-Inserts. Wird auf Main LR `Aux 3` gewählt, nutzt das Pult automatisch `Aux 3 + 4`; `Aux 5` belegt `Aux 5 + 6`. In SuperRack das Rack auf **Stereo → Inputs 3–4** stellen (die Ausgänge folgen), damit Stereo-gekoppelte Plugins wie Bus-Kompressor oder Limiter L/R gemeinsam bearbeiten.

### Eigenschaften
- ✔ Funktioniert auf Kanälen, Mix-Bussen, Matrizen und Main LR.
- ✔ **Pre oder Post** Kanalbearbeitung. Zum Beispiel Waves Tune *hinter* EQ und Dynamik des Pults setzen, damit die Tonhöhe zuverlässiger erkannt wird.
- ✔ **Sofortiger Bypass:** `INSERT` am Pult drücken, und SuperRack ist aus dem Signalweg. Das ist die Rückfallebene, falls der Computer abstürzt, knackst oder mitten in der Show der Akku leer ist.
- ✔ Mit Methode A kombinierbar: Ein per Methode A bearbeiteter Kanal kann zusätzlich einen Aux-Insert hinter der Kanalbearbeitung bekommen (zwei Racks auf einem Mikrofon).
- ✘ Nur **6 Mono**-Insert-Punkte (= 3 Stereo).
- ✘ Belegt die Aux-In/Out-Anschlüsse.
- ✘ Etwa 0,37 ms mehr Latenz als Methode A.

---

## Methode C: Hybrid (24 direkte Eingänge + 6 Aux-Inserts)

Kombiniert die Methoden A und B innerhalb der 32-Kanal-Grenze. Die Kartenkanäle 1–8 sind für die Aux-Inserts reserviert, deshalb wird die direkte Eingangsbearbeitung **um 8 Kanäle nach oben verschoben** und die letzten 8 Eingangskanäle laufen an SuperRack vorbei. Ideal für Kanäle, die ohnehin keine Plugins brauchen (Playback-Spuren, Click/Cue, Moderationsmikrofone).

### Belegung der Kartenkanäle

| Kartenkanal | Card Out (zu SuperRack) | Card In (zurück zum Pult) |
|---|---|---|
| 1–6 | Aux Out 1–6 | → Aux In 1–6 (Insert-Returns) |
| 7–8 | Monitor L/R (ungenutzt) | — |
| 9–16 | Local 1–8 | → Kanäle 1–8 |
| 17–24 | Local 9–16 | → Kanäle 9–16 |
| 25–32 | Local 17–24 | → Kanäle 17–24 |
| — | — | Kanäle 25–32 = Local 25–32 (direkt, ohne SuperRack) |

### Routing am Pult

| Seite | Block | Quelle |
|---|---|---|
| `ROUTING → Input` | Ch 1–8 | Card 9–16 |
| | Ch 9–16 | Card 17–24 |
| | Ch 17–24 | Card 25–32 |
| | Ch 25–32 | Local 25–32 (oder die Stagebox) |
| | Aux In | Card 1–6 |
| `ROUTING → Card Out` | 1–8 | Aux 1–6 / Mon |
| | 9–16 | Local 1–8 |
| | 17–24 | Local 9–16 |
| | 25–32 | Local 17–24 |

Bei AES50-Stageboxen `Local` entsprechend durch die Blöcke `AES50 A` / `AES50 B` ersetzen.

### Rack-Belegung in SuperRack

| Rack | Eingang | Zweck |
|---|---|---|
| 1–6 | Inputs 1–6 | Aux-Inserts 1–6 (z. B. Stereo 1–2 für Main LR) |
| 7–8 | — | Leer lassen (Monitor-Signal) oder alle Racks um zwei verschieben |
| 9–32 | Inputs 9–32 | Pultkanäle 1–24 |

> **Tipp:** Die Racks nach den Pultkanälen benennen, nicht nach den Kartenkanälen: Rack 9 ist Kanal 1!

> **Firmware 4:** Methode C ist an Achter-Blöcke gebunden: Die bearbeiteten Kanäle verschieben sich, und es sind immer die *letzten* acht Kanäle, die an SuperRack vorbeilaufen. [Methode F](#methode-f-user-routing-einzelne-kanale-auswahlen) nutzt User Routing, um genau die Kanäle auszuwählen, die Plugins bekommen, während jeder Kanal seine Nummer behält.

---

## Methode D: Inserts + Subgruppen über Ultranet + User Routing

Dieses Rezept holt das Maximum aus den 32 Kartenkanälen heraus. Es nutzt das **User In / User Out**-Routing der Firmware 4 ([Kapitel 04](04_Firmware_4x_User_Routing.md)) und die **Ultranet-Ausgänge (P16)** als zusätzlichen Abgriffpunkt für Bus-Signale.

> **Warnung:** Die Ultranet-Ausgänge werden zweckentfremdet. **P16-Personal-Monitoring** ([Kapitel 11](11_Personal_Monitoring_DP48_and_P16.md)) kann an diesem Pult dann nicht gleichzeitig genutzt werden. Außerdem bleiben in diesem Layout, wenn User In für alle Eingangsblöcke genutzt wird, nur 24 User-Eingänge für physische Quellen übrig.

### Ziel des Aufbaus
- 6 Aux-Insert-Punkte (z. B. Vocals 1–3, eine Reserve, Main LR auf Aux 5/6)
- 4 Stereo-Subgruppen (Mix-Bus 5–12), in SuperRack bearbeitet und auf der Aux/FX-Ebene zurückgeführt
- Ein Stereo-Stream-Signal (Matrix 5/6) zum Computer
- 16 direkt bearbeitete Eingangskanäle

### Belegung der Kartenkanäle

| Kartenkanal | User Out (Card Out = User Out 1–32) | User In / Rückweg |
|---|---|---|
| 1–6 | Aux Out 1–6 (Insert-Sends) | Aux In = Card 1–6 |
| 7–8 | Out 11/12 = Matrix 5/6 (Stream-Signal) | — (zu OBS oder einem Recorder) |
| 9–16 | P16 1–8 = Mix-Bus 5–12 (Post Fader) | User In 25–32 |
| 17–32 | Local 1–16 | User In 1–16 → Ch 1–16 |
| — | — | User In 17–24 = Local 17–24 → Ch 17–24 |

### Schritt für Schritt

**1. Subgruppen auf Mix-Bus 5–12**
Busse 5/6, 7/8, 9/10, 11/12 zu vier Stereo-Subgruppen koppeln (oder ungekoppelt als acht Mono-Gruppen lassen). Kanäle zuweisen und diese Kanäle aus Main LR herausnehmen.

**2. `ROUTING → P16 Out` (Ultranet)**
Ultranet 1–8 = **Mix-Bus 5–12**, Abgriffpunkt **Post Fader**.

**3. Stream-Signal (optional)**
Matrix 5/6 → `ROUTING → XLR Out 11/12`.

**4. `ROUTING → User Out`**

| User Out | Quelle |
|---|---|
| 1–6 | Aux Out 1–6 |
| 7–8 | Out 11 / Out 12 (Matrix-5/6-Stream-Signal) |
| 9–16 | P16 1–8 (Subgruppen-Sends) |
| 17–32 | Local 1–16 |

**5. `ROUTING → Card Out`** = `User Out 1–8 / 9–16 / 17–24 / 25–32`.

**6. `ROUTING → User In`**

| User In | Quelle |
|---|---|
| 1–16 | Card 17–32 (bearbeitete Eingänge) |
| 17–24 | Local 17–24 (direkt) |
| 25–32 | Card 9–16 (bearbeitete Subgruppen-Returns) |

**7. `ROUTING → Input`:** Ch 1–32 = `User In 1–32`, Aux In = `Card 1–6`.

**8. Subgruppen-Returns auf die Aux/FX-Ebene verlegen**
Damit die Returns von den Eingangskanälen getrennt bleiben, die **Source** der Kanäle 25–32 (Config-Seite) auf **Off** setzen und die Eingangsquellen **In 25–32** stattdessen den acht Aux-Kanalzügen zuweisen. Die Returns verhalten sich dann wie Gruppen-Master neben den FX-Returns.

**9. Inserts**
- Vocal 1–3: Insert `Aux 1`, `Aux 2`, `Aux 3` (Pre oder Post).
- Main LR: Insert `Aux 5` (belegt Aux 5 + 6), Post.

**10. SuperRack**

| Rack | Eingang |
|---|---|
| 1–4 | Mono 1, 2, 3, 4 (Inserts) |
| 5 | Stereo 5–6 (Main-LR-Insert) |
| — | 7–8 Stream-Signal: kein Rack (wird von der Streaming-Software genutzt) |
| Gruppe 1–4 | Stereo 9–10, 11–12, 13–14, 15–16 |
| Eingänge | Mono 17–32 (Kanäle 1–16) |

### Resultierender Signalweg (Gesang in eine Subgruppe)

| # | Stufe | Durch SuperRack? |
|---|---|---|
| 1 | Mikrofon → Preamp → Card 17 → Eingangs-Rack → Card In 17 → Ch 1 | Ja (Durchgang 1) |
| 2 | Ch 1 Insert Aux 1 → SuperRack → zurück | Ja (Durchgang 2) |
| 3 | Fader → Mix-Bus 5/6 (Gruppe) | — |
| 4 | Ultranet → Card 9/10 → Gruppen-Rack → Card In 9/10 → Gruppen-Return auf der Aux-Ebene | Ja (Durchgang 3) |
| 5 | Gruppen-Return → Main LR → Insert Aux 5/6 → SuperRack → zurück | Ja (Durchgang 4) |
| 6 | Ausgänge | — |

> **Warnung:** Jeder Durchgang durch SuperRack kostet einen vollen Pufferzyklus an Latenz. Ein Signal, das Eingangs-Rack + Insert + Gruppe + Main-LR-Insert durchläuft, sammelt **vier** Round-Trips an. Den Puffer so klein wie möglich halten und dieses Layout nur einsetzen, wo die Latenz für die PA akzeptabel ist.

> **Hinweis zu den Preamps:** Sobald die Kanäle von `User In → Card` kommen, die Vorverstärker in `SETUP → Preamps` an der physischen Quelle einstellen (z. B. `Local 1–8`).

---

## Methode E: X-DANTE-Karte + Dante Virtual Soundcard

Die Aux-Insert-Methode (Methode B) funktioniert genauso mit einer **X-DANTE**-Karte statt einer USB-Karte. SuperRack Performer läuft dann auf einem Laptop mit **Dante Virtual Soundcard (DVS)**.

**Signalweg:** Kanal → Insert Aux *n* → Card Out (Dante) → Netzwerk → DVS → SuperRack → DVS → Netzwerk → Card In (Dante) → Aux In *n* → zurück in den Kanal

### Einrichtung
1. **Pult:** `ROUTING → Card Out 1–8` = `Aux 1–6 / Mon` (oder über User Out), `ROUTING → Input → Aux In` = `Card 1–6`.
2. **DVS:** Kanalanzahl (z. B. 8 × 8) und die niedrigste Latenz (**4 ms**) einstellen. Den Laptop mit dem **Primary**-Port der X-DANTE verbinden, direkt oder über einen Switch.
3. **X-DANTE-Latenz:** im Dante Controller auf **0,25 ms** stellen.
4. **Dante Controller → Device View:** X32-Sendekanäle 1–8 auf die Empfangskanäle des Laptops ziehen und Laptop-Sendekanäle 1–8 auf die X32-Empfangskanäle 1–8. Grüne Markierungen zeigen Signal an.
5. **SuperRack:** Audio-Device = Dante Virtual Soundcard, 48 kHz, Puffer so klein wie praktikabel (z. B. 32).
6. Inserts auf Kanälen oder Main LR genau wie bei Methode B setzen.

### Latenz
Mit X-DANTE auf 0,25 ms, DVS auf 4 ms und 32 Samples Puffer beträgt der gesamte Round-Trip **etwa 10 ms**. Ein SuperRack-Puffer von 128 Samples bringt etwa **4 ms** zusätzlich. Für die PA in mittleren und großen Räumen ist das in Ordnung; für In-Ear-Nutzer siehe die Doppel-Patch-Strategie in [Kapitel 18](18_SuperRack_Latency_and_Buffer.md#in-ear-monitoring-die-doppel-patch-strategie).

---

## Methode F: User Routing (einzelne Kanäle auswählen)

Mit **User In / User Out** der Firmware 4 ([Kapitel 04](04_Firmware_4x_User_Routing.md)) muss die Karte keine ganzen Achter-Blöcke mehr übertragen. Jeder Kartenkanal kann einen beliebigen einzelnen Ein- oder Ausgang führen, und jeder Pultkanal kann von der Karte zurückkommen *oder* direkt von seinem physischen Eingang gespeist werden. Das ermöglicht drei Dinge, die mit Block-Routing nicht gehen:

- **Kanäle auswählen:** Nur die Eingänge, die Plugins brauchen, gehen zu SuperRack, egal wo sie auf dem Pult liegen.
- **Nummerierung behalten:** Kanal 1 bleibt Mikrofon 1, ob er durch SuperRack läuft oder nicht. Anders als bei Methode C verschiebt sich nichts.
- **Sends frei kombinieren:** Insert-Sends, ausgewählte Eingänge und ein Stream-Signal teilen sich die 32 Kartenkanäle in beliebiger Aufteilung.

> **Voraussetzung:** Firmware 4.0 oder neuer. Inserts kommen weiterhin über **Aux In = Card 1–6** zurück (der Aux-In-Block kann nur die ersten sechs Kartenkanäle nutzen), daher die Insert-Sends auf User Out 1–6 lassen.

### Beispiel: 24 ausgewählte Kanäle + 6 Inserts + Stream-Signal

Eine Band mit 32 Eingängen: Drums, Bass, Gitarren und Gesang bekommen Waves-Plugins, Keys, Playback-Spuren und Moderationsmikrofone bleiben nur im Pult. In diesem Beispiel steckt jedes Mikrofon im lokalen Eingang mit der Nummer seines Kanals.

| Kanäle | Instrument | Durch SuperRack? |
|---|---|---|
| 1–10 | Drums | Ja |
| 11–12 | Bass | Ja |
| 13–16 | Gitarren | Ja |
| 17–20 | Keys | Nein, direkt |
| 21–28 | Gesang | Ja |
| 29–32 | Playback, Moderationsmikrofone | Nein, direkt |

### Belegung der Kartenkanäle

| Kartenkanal | Card Out (User Out → SuperRack) | Card In (zurück zum Pult) |
|---|---|---|
| 1–6 | Aux Out 1–6 (Insert-Sends) | Aux In 1–6 (Insert-Returns) |
| 7–8 | Out 15/16 = Stream-Mix | — (für OBS oder einen Recorder) |
| 9–18 | Local 1–10 | → User In 1–10 → Ch 1–10 |
| 19–24 | Local 11–16 | → User In 11–16 → Ch 11–16 |
| 25–32 | Local 21–28 | → User In 21–28 → Ch 21–28 |
| — | — | Ch 17–20 und 29–32: User In = Local, direkt |

### Schritt für Schritt

**1. Stream-Signal (optional):** den Stream-Mix, z. B. Matrix 1/2, auf `ROUTING → XLR Out 15/16` legen. Mix-Busse und Matrizen sind selbst keine User-Out-Quellen und brauchen deshalb zuerst einen physischen Ausgang.

**2. `ROUTING → User` (Output-Patch, erster Encoder):**

| User Out | Quelle |
|---|---|
| 1–6 | Aux Out 1–6 |
| 7–8 | Out 15 / Out 16 |
| 9–18 | Local 1–10 |
| 19–24 | Local 11–16 |
| 25–32 | Local 21–28 |

**3. `ROUTING → Card Out`** = `User Out 1–8 / 9–16 / 17–24 / 25–32`.

**4. `ROUTING → User` (Input-Patch):**

| User In | Quelle |
|---|---|
| 1–16 | Card 9–24 (bearbeitet) |
| 17–20 | Local 17–20 (direkt) |
| 21–28 | Card 25–32 (bearbeitet) |
| 29–32 | Local 29–32 (direkt) |

**5. `ROUTING → Home`:** Eingangsblöcke 1–8 … 25–32 = `User In`, Aux In = `Card 1–6`.

**6. Inserts** wie bei [Methode B](#methode-b-aux-insert-6-insert-punkte), z. B. Vocals 1–3 auf `Aux 1–3` (Post, für Waves Tune), Main LR auf `Aux 5` (belegt Aux 5 + 6).

**7. SuperRack:**

| Rack-Eingang | Rack-Name |
|---|---|
| Mono 1–3 | Gesangs-Inserts 1–3 |
| Mono 4 | Reserve-Insert |
| Stereo 5–6 | Main LR |
| 7–8 | Kein Rack (Stream-Signal) |
| Mono 9–24 | Ch 1–16 |
| Mono 25–32 | Ch 21–28 |

> **Tipp:** Den Pultkanal in jeden Rack-Namen schreiben. Kartenkanal und Pultkanal haben unterschiedliche Nummern, und in der Rack-Liste wird es sonst unübersichtlich.

### Varianten
- **Keine Inserts nötig?** Auch auf User Out 1–8 ausgewählte Eingänge legen. Dann gehen bis zu 32 Kanäle zu SuperRack (oder 30 plus ein Stereo-Stream-Signal), weiterhin in beliebiger Reihenfolge.
- **Stageboxen:** In beiden Patches `AES50 A` / `AES50 B` statt `Local` verwenden. Eingänge mehrerer Stageboxen lassen sich frei kombinieren.
- **Zwei Kanäle von einem Mikrofon:** Um einen Gesangskanal aus dem In-Ear-Weg herauszuhalten ([Kapitel 18](18_SuperRack_Latency_and_Buffer.md#in-ear-monitoring-die-doppel-patch-strategie)), einen User In auf den Karten-Return und einen weiteren User In auf denselben physischen Eingang legen. Der PA-Kanal bekommt die Plugins, der Monitor-Kanal bleibt direkt.

### Preamps
Der Gain gehört zum physischen Eingang. Bei den **direkten** Kanälen funktioniert der Gain-Regler des Kanals weiterhin. Bei Kanälen, die von der **Karte** zurückkommen, den Vorverstärker in `SETUP → Preamps` an der physischen Quelle einstellen (z. B. `Local 1–8`).

### Rückfallebene
Ob ein Kanal durch SuperRack läuft, entscheidet allein der User-In-Patch. Eine Szene oder einen Snippet nur mit Routing ([Kapitel 12](12_Scenes_Cues_and_Snippets.md)) speichern, der User In 1–32 zurück auf die physischen Eingänge setzt. Ein Abruf nimmt das komplette Setup vom Computer. Inserts werden wie gewohnt mit `INSERT` umgangen.

### Eigenschaften
- ✔ Beliebige Kanäle, keine Achter-Blöcke.
- ✔ Kanalnummern, Szenen und Kanal-Presets bleiben mit und ohne SuperRack gleich.
- ✔ Gleiche Latenz wie bei Methode A und B; Kanäle ohne SuperRack bekommen keine zusätzliche Latenz.
- ✔ Keine Ultranet-Ausgänge nötig, P16 bleibt nutzbar (anders als bei Methode D).
- ✘ Nur ab Firmware 4, und zwei Patch-Seiten müssen zusammenpassen: Notizen machen.
- ✘ Insgesamt weiterhin 32 Kartenkanäle, und Inserts belegen Aux In/Out wie bei Methode B.
- ✘ Keine Subgruppen-Bearbeitung ohne den Ultranet-Trick aus Methode D.

---

## Die richtige Methode wählen

| Ausgangslage | Methode |
|---|---|
| Plugins auf **allen** Eingängen, sonst nichts | **A** |
| Plugins auf Main LR, Bussen oder einigen Gesangskanälen | **B** |
| Beides, und 8 Eingangskanäle können ohne Plugins auskommen | **C** |
| Eingänge + Inserts + Gruppenbearbeitung, kein P16 im Einsatz | **D** |
| Das Pult hat eine X-DANTE- statt einer USB-Karte | **E** |
| Firmware 4: Plugins nur auf ausgewählten Kanälen, Kanalnummern bleiben gleich | **F** |
