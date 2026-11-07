# Kapitel 08: DCAs, Stummschaltgruppen & Fader-Management

Modernes Live-Mixing erfordert die simultane Kontrolle über 30 bis 40 Kanäle unter extremem Zeitdruck. Während einer schnellen Show ständig durch Fader-Bänke zu blättern, um ein einzelnes Instrument anzupassen, ist unpraktikabel. Das Behringer X32 und Midas M32 stellen hierfür zwei zentrale Organisationswerkzeuge bereit: **8 DCAs (Digitally Controlled Amplifiers)** mit **DCA-Spill** sowie **6 Master-Mute-Gruppen**.

Dieses Kapitel beschreibt die DCA-Architektur, das unterschiedliche Verhalten bei Pre/Post-Fader-Sends, den DCA-Spill-Workflow und bewährte Mute-Gruppen-Strategien.

---

## 1. Was ist ein DCA (Digitally Controlled Amplifier)?

Ein DCA fungiert als Fernsteuerung für eine Gruppe von Kanal-Fadern. Angelehnt an analoge VCAs (Voltage Controlled Amplifiers) gilt: **Durch einen DCA fließt niemals ein Audiosignal**.

```
┌─────────────────────────────────────────────────────────────┐
│                    WIE EIN DCA FUNKTIONIERT                 │
├─────────────────────────────────────────────────────────────┤
│ Kanal 1 (Kick)   ──► Fader steht auf   0 dB                 │
│ Kanal 2 (Snare)  ──► Fader steht auf  -6 dB                 │
│ Kanal 3 (Toms)   ──► Fader steht auf  -3 dB                 │
│                                                             │
│ Alle drei Kanäle sind DCA 1 (Drums) zugewiesen.             │
│                                                             │
│ Wird der Fader von DCA 1 um -4 dB nach unten gezogen:       │
│   Kanal 1 wird rechnerisch zu  -4 dB                        │
│   Kanal 2 wird rechnerisch zu -10 dB                        │
│   Kanal 3 wird rechnerisch zu  -7 dB                        │
│                                                             │
│ *Das relative Lautstärkeverhältnis zwischen den Instrumenten│
│  bleibt exakt erhalten!                                     │
└─────────────────────────────────────────────────────────────┘
```

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
   - Wählen Sie den Kanal an, öffnen Sie **HOME** und blättern Sie zur Spalte **DCA Groups**.

---

## 3. Der kritische DCA-Fallstrick: Pre-Fader vs. Post-Fader Sends!

Dies ist einer der folgenschwersten Bedienfehler an Digitalpulten:

```
┌─────────────────────────────────────────────────────────────┐
│                 WIRKUNG DES DCA-FADERS AUF SENDS            │
├─────────────────────────────────────────────────────────────┤
│ 1. POST-FADER SENDS (Hall, Delay, Streaming-Matrizen)       │
│    ► JA: DCA-Bewegungen wirken auf Post-Fader-Sends!        │
│      Wird der Drum-DCA leiser gezogen, wird auch der Hall   │
│      des Schlagzeugs leiser.                                │
├─────────────────────────────────────────────────────────────┤
│ 2. PRE-FADER SENDS (Bühnenmonitore & Musiker-In-Ears)       │
│    ► NEIN: DCA-Bewegungen wirken NICHT auf Pre-Fader-Sends! │
│      Wird der Gesangs-DCA leiser gezogen, bleibt der Gesang │
│      im In-Ear-Hörer des Musikers VOLLSTÄNDIG UNVERÄNDERT!  │
└─────────────────────────────────────────────────────────────┘
```

> [!WARNING]
> Benutzen Sie **niemals** DCA-Fader, um Monitormischungen auf der Bühne anzupassen! Bühnenmonitore und In-Ears werden pre-fader gespeist. Um Monitorpegel zu ändern, nutzen Sie **Sends on Faders** auf dem Mix-Bus des jeweiligen Musikers.

---

## 4. Die DCA-Spill-Funktion ab Firmware 4.x

Ab Firmware 4.0 bietet das X32 **DCA Spill**. Damit entfällt das manuelle Suchen von Einzelkanälen in verschiedenen Faderbänken vollständig:

```
┌─────────────────────────────────────────────────────────────┐
│                      DCA-SPILL-WORKFLOW                     │
├─────────────────────────────────────────────────────────────┤
│ 1. DOPPELKLICKEN Sie auf die SELECT-Taste eines DCAs        │
│    (z. B. DCA 1 für Drums).                                 │
│                                                             │
│ 2. Die linken 16 Fader klappen SOFORT AUF (Spill):          │
│    Fader 1 = Kick In                                        │
│    Fader 2 = Kick Out                                       │
│    Fader 3 = Snare Top                                      │
│    Fader 4 = Snare Bottom                                   │
│    Fader 5 = Rack Tom                                       │
│    Fader 6 = Floor Tom                                      │
│    Fader 7 = Hi-Hat                                         │
│    Fader 8 = Overheads                                      │
│                                                             │
│ 3. Schnelle Korrekturen an Snare- oder Tom-Fadern vornehmen.│
│                                                             │
│ 4. DRÜCKEN Sie die DCA-SELECT-Taste erneut.                 │
│    Die linken Fader kehren augenblicklich zu ihrer normalen │
│    Eingangsbank zurück!                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Master-Mute-Gruppen (Gruppen 1–6)

Direkt unterhalb des 7"-Bildschirms befinden sich **6 dedizierte Master-Mute-Tasten**. Ein Druck schaltet alle zugewiesenen Kanäle, Busse oder Effektrückwege synchron stumm.

### Empfohlene Belegung der Mute-Gruppen:
```
[MUTE GRP 1] : GESAMTE BAND (Schaltet alle Instrumente stumm)
[MUTE GRP 2] : GESANG (Schaltet alle Gesangsmikrofone stumm)
[MUTE GRP 3] : FX MUTE (ESSENZIELL: Schaltet alle Hall- und Delay-Returns stumm!)
[MUTE GRP 4] : BÜHNEN-DIs (Schaltet Akustikgitarren, Bass-DI und Keyboards stumm)
[MUTE GRP 5] : MEDIEN / PAUSENMUSIK (Schaltet Hintergrundmusik stumm)
[MUTE GRP 6] : GENERAL-MUTE (Notfall-Mute für die gesamte Bühne)
```

### Warum „FX MUTE“ unverzichtbar ist:
Fängt ein Sänger oder Redner zwischen zwei Stücken an zu sprechen, wirkt eine hallige 3,5-Sekunden-Hallfahne auf der Sprache extrem unprofessionell und zerstört die Textverständlichkeit.
- Weisen Sie die Rückwege FX 1 bis FX 4 der Gruppe **MUTE GRP 3 (FX MUTE)** zu.
- Drücken Sie `MUTE GRP 3` in der Sekunde, in der das Lied endet: Die Sprache ist sofort trocken und klar.
- Drücken Sie `MUTE GRP 3` beim Auftakt des nächsten Songs erneut, um den satten Gesangshall wieder zu aktivieren.
