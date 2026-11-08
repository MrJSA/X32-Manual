# Kapitel 08: DCAs, Stummschaltgruppen & Fader-Management

Modernes Live-Mixing erfordert die simultane Kontrolle über 30 bis 40 Kanäle unter extremem Zeitdruck. Während einer schnellen Show ständig durch Fader-Bänke zu blättern, um ein einzelnes Instrument anzupassen, ist unpraktikabel. Das Behringer X32 und Midas M32 stellen hierfür zwei zentrale Organisationswerkzeuge bereit: **8 DCAs (Digitally Controlled Amplifiers)** mit **DCA-Spill** sowie **6 Master-Mute-Gruppen**.

Dieses Kapitel beschreibt die DCA-Architektur, das unterschiedliche Verhalten bei Pre/Post-Fader-Sends, den DCA-Spill-Workflow und bewährte Mute-Gruppen-Strategien.

---

## 1. Was ist ein DCA (Digitally Controlled Amplifier)?

Ein DCA fungiert als Fernsteuerung für eine Gruppe von Kanal-Fadern. Angelehnt an analoge VCAs (Voltage Controlled Amplifiers) gilt: **Durch einen DCA fließt niemals ein Audiosignal**.

Beispiel: drei Schlagzeug-Kanäle sind **DCA 1 (Drums)** zugewiesen, der DCA-Fader wird um **4 dB** heruntergezogen:

| Kanal | Kanalfader | DCA 1 | Effektiver Pegel |
|---|---|---|---|
| **Kanal 1 – Kick** | 0 dB | -4 dB | **-4 dB** |
| **Kanal 2 – Snare** | -6 dB | -4 dB | **-10 dB** |
| **Kanal 3 – Toms** | -3 dB | -4 dB | **-7 dB** |

Das Lautstärkeverhältnis zwischen den Kanälen bleibt exakt erhalten.

### Warum DCAs statt Subgruppen nutzen?
- **Kein DSP-Verbrauch**: DCAs verbrauchen keine internen Mix-Busse, EQs oder Dynamikblöcke.
- **Stereo-Panorama bleibt erhalten**: Kanäle behalten ihre individuelle Pan-Position in der Stereosumme.
- **Schnelle Zuweisung**: Kanäle können innerhalb von Sekunden hinzugefügt oder entfernt werden.

---

## 2. Bewährte DCA-Belegung für Live-Konzerte

Eine praxiserprobte 8-DCA-Konfiguration für Konzerte und Veranstaltungen:

| DCA | Name | Zugeordnete Kanäle | Einsatzzweck |
|---|---|---|---|
| **DCA 1** | **DRUMS** | Kick, Snare, Toms, Hi-Hat, Overheads | Gesamtes Schlagzeug mit einem Fader anpassen. |
| **DCA 2** | **BASS** | Bass-DI, Bassverstärker-Mikrofon, Synth | Das Fundament der Rhythmusgruppe kontrollieren. |
| **DCA 3** | **GITARREN** | E-Gitarren Links/Rechts, Akustikgitarren | Gitarrenanteil im Verhältnis zu Keys regeln. |
| **DCA 4** | **KEYS / TRACKS**| Keyboards, Flügel, Synthesizer, Zuspieler | Elektronische Begleitelemente im Pegel angleichen. |
| **DCA 5** | **LEAD VOX** | Lead-Sänger 1 & 2, Pastor, Moderation | Hauptstimmen transparent über dem Mix halten. |
| **DCA 6** | **CHOR / CHORUS** | Backing-Vocals, Chor | Gesangsharmonien hinter den Lead-Gesang mischen. |
| **DCA 7** | **FX RETURNS** | FX 1L/R bis FX 4L/R (Hall & Delay) | Gesamte Raumatmosphäre und Effektniveau regeln. |
| **DCA 8** | **BAND MASTER**| Alle Musikinstrumente (ohne Gesang/Sprache)| Schnelle Dämpfung der Band bei Ansagen. |

### So weisen Sie Kanäle einem DCA zu:
1. **Schnellzugriff auf der Bedienoberfläche**:
   - Halten Sie die Taste **SELECT** des gewünschten DCAs (z. B. DCA 1) gedrückt.
   - Drücken Sie bei gehaltener DCA-Select-Taste die blau leuchtenden **SELECT**-Tasten aller gewünschten Kanäle.
   - Lassen Sie die DCA-Select-Taste los. Alle gewählten Kanäle sind nun mit diesem DCA verknüpft.
2. **Kanal-Home-Bildschirm**:
   - Wählen Sie den Kanal an, öffnen Sie **HOME** und blättern Sie zur Spalte **DCA Groups**. Mit dem Drehregler schalten Sie DCA 1 bis 8 ein oder aus.

---

## 3. Der kritische DCA-Fallstrick: Pre-Fader vs. Post-Fader Sends!

Dies ist einer der folgenschwersten Bedienfehler an Digitalpulten:

| Send-Art | Typischer Einsatz | Wirkt der DCA darauf? |
|---|---|---|
| **Post-Fader-Sends** | Hall, Delay, Streaming-Matrizen | **Ja** — wird der Drum-DCA leiser gezogen, sinkt auch der Hall-Send der Drums |
| **Pre-Fader-Sends** | Bühnenmonitore, In-Ears | **Nein** — wird der Gesangs-DCA leiser gezogen, bleiben die In-Ears völlig unverändert |

### Das Katastrophen-Szenario aus der Praxis:
Ein Lead-Sänger signalisiert von der Bühne, dass ihm sein Gesangsmikrofon in den Ohren dröhnt. Der FOH-Techniker zieht DCA 5 (Lead Vox) um 10 dB herunter. Das Publikum hört den Sänger nun kaum noch – aber **die Lautstärke im In-Ear des Sängers hat sich um kein einziges Dezibel verändert**.

> [!WARNING]
> Benutzen Sie **niemals** DCA-Fader, um Monitormischungen auf der Bühne anzupassen! Bühnenmonitore und In-Ears werden pre-fader gespeist. Um Monitorpegel zu ändern, nutzen Sie **Sends on Faders** auf dem Mix-Bus des jeweiligen Musikers.

---

## 4. Die DCA-Spill-Funktion ab Firmware 4.x

Ab Firmware 4.0 bietet das X32 **DCA Spill**. Damit entfällt das manuelle Suchen von Einzelkanälen in verschiedenen Faderbänken vollständig:

| Schritt | Aktion | Ergebnis |
|---|---|---|
| **1** | Die **SELECT**-Taste eines DCAs drücken (z. B. DCA 1) | Die linken 16 Fader zeigen sofort die Mitglieder dieses DCAs |
| **2** | Die ausgeklappten Fader anpassen | z. B. Kick In, Kick Out, Snare Top, Snare Bottom, Rack Tom, Floor Tom, Hi-Hat, Overheads — dem DCA zugewiesene Busse (etwa Drum-Subgruppen) werden ebenfalls ausgeklappt |
| **3** | Die **SELECT**-Taste des DCAs erneut drücken | Die linken Fader kehren zu ihrer normalen Bank zurück |

---

## 5. Master-Mute-Gruppen (Gruppen 1–6)

Direkt unterhalb des 7"-Bildschirms befinden sich **6 dedizierte Master-Mute-Tasten**. Ein Druck schaltet alle zugewiesenen Kanäle, Busse oder Effektrückwege synchron stumm.

### Empfohlene Belegung der Mute-Gruppen:
| Mute-Gruppe | Name | Schaltet stumm |
|---|---|---|
| **1** | Gesamte Band | Drum-, Bass-, Gitarren- und Keyboard-Kanäle |
| **2** | Gesang | Alle Gesangsmikrofone |
| **3** | FX Mute | Alle Hall- und Delay-Returns — **unverzichtbar** |
| **4** | Bühnen-DIs | Akustikgitarren, Bass-DI und Keyboards |
| **5** | Medien / Zuspieler | Einlassmusik und Videowiedergabe |
| **6** | General-Mute | Notfall-Mute für die gesamte Bühne |

### Warum „FX MUTE“ unverzichtbar ist:
Fängt ein Sänger oder Redner zwischen zwei Stücken an zu sprechen, wirkt eine hallige 3,5-Sekunden-Hallfahne auf der Sprache extrem unprofessionell und zerstört die Textverständlichkeit.
- Weisen Sie die Rückwege FX 1 bis FX 4 der Gruppe **MUTE GRP 3 (FX MUTE)** zu.
- Drücken Sie `MUTE GRP 3` in der Sekunde, in der das Lied endet: Die Sprache ist sofort trocken und klar.
- Drücken Sie `MUTE GRP 3` beim Auftakt des nächsten Songs erneut, um den satten Gesangshall wieder zu aktivieren.

### So weisen Sie Kanäle einer Mute-Gruppe zu:
1. Die Menütaste **MUTE GRP** neben dem Display drücken.
2. Die physische **Mute-Group-Taste (1–6)** auf der Oberfläche gedrückt halten.
3. Währenddessen die **MUTE**-Tasten aller Kanäle, Busse oder FX-Returns drücken, die zugewiesen werden sollen.
4. Die Taste loslassen. Die roten Mute-LEDs blinken nun synchron, sobald diese Mute-Gruppe aktiviert wird.

---

## 6. Mute-Einstellungen im System (Setup-Menü)

Unter **SETUP → CONFIG** legen Sie das Mute-Verhalten fest:
- **Mute Pre-Fader Sends (Yes / No)**:
  - Bei **NO**: Das Stummschalten eines Kanals betrifft nur die Saal-PA; der Musiker hört sich weiterhin auf seinem Bühnenmonitor.
  - Bei **YES**: Das Stummschalten eines Kanals schaltet das Mikrofon überall stumm, auch auf allen Bühnenmonitoren und In-Ears. (Für Live-Beschallung empfohlen, um Rückkopplungen offener Mikrofone im Stativ zu vermeiden.)
- **Harter Mute vs. weicher DCA-Mute**:
  - Wird ein Kanal über einen DCA stummgeschaltet, blinkt seine Mute-Taste.
  - Wird ein Kanal direkt in seinem eigenen Kanalzug stummgeschaltet, leuchtet seine Mute-Taste dauerhaft rot. Das Aufheben des DCA-Mutes hebt einen manuell im Kanalzug gesetzten Mute nicht auf!
