# Behringer X32 / Midas M32 Umfassendes Technisches Handbuch

Ein vollständiges, praxisnahes und detailliertes Referenzhandbuch für Konfiguration, Routing, Signalbearbeitung und Mischung auf den digitalen Mischpulten Behringer X32 und Midas M32 (Firmware 4.x).

---

## Inhaltsverzeichnis des Handbuchs

| Kapitel | Titel | Kernbereiche & Schwerpunkte |
|---|---|---|
| **[01](01_Hardware_Overview_and_Surface_Anatomy.md)** | **[Hardware-Übersicht & Konsolen-Topografie](01_Hardware_Overview_and_Surface_Anatomy.md)** | Oberflächenaufbau, Fader-Bänke, Kanalzug-Anatomie, 7"-Bildschirmnavigation, Scribble Strips und Rückseitenanschlüsse. |
| **[02](02_Stageboxes_and_AES50_Networking.md)** | **[Digitale Snakes, Stageboxen & AES50-Netzwerke](02_Stageboxes_and_AES50_Networking.md)** | SuperMAC AES50-Protokoll, S16/S32/SD/DL Stageboxen, geschirmte STP-Kabel, Clocking und Kaskadierung. |
| **[03](03_Routing_and_Patching.md)** | **[Routing, Patching & Signalverteilung](03_Routing_and_Patching.md)** | Achter-Blöcke, Signalabgriffe, XLR Out, Aux Out, Ultranet, Card Out und praxisbewährte Routing-Vorlagen. |
| **[04](04_Firmware_4x_User_Routing.md)** | **[Firmware 4.x User Routing (1:1-Patching)](04_Firmware_4x_User_Routing.md)** | Flexibles 1:1-Patching ohne Achter-Block-Grenzen, User In und User Out, Funkstrecken-Integration. |
| **[05](05_Gain_Staging_and_Preamps.md)** | **[Gain Staging, Vorverstärker & Headamps](05_Gain_Staging_and_Preamps.md)** | Analoger Preamp vs. digitaler Trim, +48V Phantomspeisung, Polarität, Gain Split und Headamp-Sharing. |
| **[06](06_Channel_Processing.md)** | **[Kanalbearbeitungs-Architektur](06_Channel_Processing.md)** | Low-Cut (HPF), Gate / Expander / Ducker, 4-Band parametrischer EQ, Kompressor / Limiter, parallele Mischung. |
| **[07](07_Mixing_Buses_and_Sends.md)** | **[Mix-Busse, Sends-on-Faders & Matrizen](07_Mixing_Buses_and_Sends.md)** | 16 Mix-Busse, Abgriffpunkte, Monitore vs. In-Ear, Sends-on-Faders, Audiountergruppen und 6 Matrix-Mischungen. |
| **[08](08_DCA_and_Mute_Groups.md)** | **[DCAs, Stummschaltgruppen & Fader-Management](08_DCA_and_Mute_Groups.md)** | DCAs vs. Subgruppen, Pre/Post-Fader-Send-Verhalten, DCA-Spill ab FW 4.x und 6 Master-Mute-Gruppen. |
| **[09](09_Effects_Rack_and_Plugins.md)** | **[Virtuelles Effektrack & 30+ Prozessoren](09_Effects_Rack_and_Plugins.md)** | 8-Slot-Effektrack, Send- vs. Insert-Effekte, Vintage-Kompressoren (1176, LA-2A, Fairchild), Pultec-EQs, Reverbs. |
| **[10](10_Monitoring_Talkback_and_Utilities.md)** | **[Abhören, Solo, Talkback & Hilfswerkzeuge](10_Monitoring_Talkback_and_Utilities.md)** | Regieraum & Kopfhörer, AFL/PFL-Solomodi, Talkback A/B-Matrix, Testoszillator und Dugan-Sprachautomixer. |
| **[11](11_Personal_Monitoring_DP48_and_P16.md)** | **[Personal Monitoring: P16 & Midas DP48](11_Personal_Monitoring_DP48_and_P16.md)** | Ultranet Powerplay P16-Mischer, 16-Kanal-Patchstrategien und Midas DP48 Dual-48-Kanal-Monitoring über AES50. |
| **[12](12_Scenes_Cues_and_Snippets.md)** | **[Szenen, Cues, Snippets & Show-Steuerung](12_Scenes_Cues_and_Snippets.md)** | Show-Hierarchie, Gesamtszenen-Snapshots, chirurgische Snippets, Parameter Safes, Channel Safes und MIDI. |
| **[13](13_Recording_and_Expansion_Cards.md)** | **[Recording, Wiedergabe & Erweiterungskarten](13_Recording_and_Expansion_Cards.md)** | 2-Spur-USB-WAV-Recorder, 32x32-X-USB-Interface, autarkes X-LIVE Dual-SD-Recording und Virtual Soundcheck. |
| **[14](14_Network_Remote_Control_and_Software.md)** | **[Netzwerkkonfiguration, Fernsteuerung & Software](14_Network_Remote_Control_and_Software.md)** | Statische IP vs. DHCP, 5-GHz-WLAN-Empfehlungen, X32-Edit, Mixing Station-App und OSC-Fernsteuerung. |
| **[15](15_Live_Mixing_Workflows_and_Best_Practices.md)** | **[Live-Mixing-Workflows & System-Tuning](15_Live_Mixing_Workflows_and_Best_Practices.md)** | Soundcheck-Ablauf, Virtual Soundcheck, Delay-Zeiten berechnen, Feedback bekämpfen, Streaming-Lautheit. |

---

## Hinweise zur Nutzung dieses Handbuchs

- **Pult-Architektur**: Das X32 verarbeitet **40 Eingangskanäle** (32 Mikrofon-/Line-Kanäle + 8 Aux-Kanäle: Aux In 1–6 plus die 2 Kanäle des USB-Players; die 8 Stereo-FX-Returns kommen hinzu), **25 Mix-Busse** (16 Mix-Busse + 6 Matrizen + Main LCR) sowie **8 virtuelle Stereo-Effektprozessoren**.
- **Kompatibilität**: Sämtliche Parameterwerte, Signalpfade und Workflows in diesem Leitfaden gelten gleichermaßen für das **Behringer X32 (Full Console)**, **X32 Compact**, **X32 Producer**, **X32 Rack**, **X32 Core** sowie die gesamte **Midas M32 / M32R**-Serie ab Firmware 4.0.
- **Grundregel des Signalflusses**: Der Preamp-Gain gehört zum **physikalischen Anschluss**, während digitaler Trim, Bearbeitungsstufen und Faderpegel zum **Kanalzug** gehören.
