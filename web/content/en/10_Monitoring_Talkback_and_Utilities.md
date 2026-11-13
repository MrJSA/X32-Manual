# Chapter 10: Monitoring, Solo, Talkback & Utilities

A mixing console is only as effective as the engineer's ability to accurately monitor audio, communicate with the stage, verify signal continuity, and manage multiple open microphones. The Behringer X32 and Midas M32 include dedicated control room monitoring circuitry, dual talkback communication matrices, an onboard test signal oscillator, a 100-band Real-Time Analyzer (RTA), and a 8-channel Dan Dugan-style speech automixer.

This chapter details solo modes, talkback routing, system calibration with the oscillator, and speech automixing.

---

## 1. Control Room & Headphone Monitoring

Located on the upper right of the console surface is the dedicated **MONITOR** section. This hardware drives both the physical rear-panel Control Room outputs (for studio monitors or booth speakers) and the dual 1/4" headphone jacks located on the front underside cheeks of the mixer.

| Control | Function |
|---|---|
| **Level knob** | Independent analog volume for the monitor / headphone outputs |
| **Mono** | Collapses the monitor feed to mono |
| **Dim** | Lowers the monitor output by 20 dB |
| **Talk A / Talk B** | Activate talkback |
| **Talk level knob** | Preamp gain of the talkback microphone |

### Solo Modes & Logic:
Press the **MONITOR** screen button to access the configuration tab:

| Setting | What you hear | Use it for |
|---|---|---|
| **PFL** (pre-fader listen) | The channel before its fader; fader, mute and DCA levels have no effect | Setting input gain with the fader down, checking for hum |
| **AFL** (after-fader listen) | The signal after fader, pan and mute, including DCA level changes | Checking stereo in-ear mixes, subgroups and DCA groups |
| **Exclusive solo** | On: pressing a solo releases all others. Off: solos add up | Off for listening to a group of channels |
| **Use Dim for PFL** | A PFL solo is turned down by the dim amount | Hot preamp levels don't jump out of the headphones |
| **Select Follows Solo** | Soloing a channel also selects it | The channel strip and screen are on the channel you are listening to |

### PFL or AFL per Type
AFL is switched on separately for three kinds of solo: **Channel Solo AFL**, **MixBus Solo AFL** and **DCA Solo AFL**. Anything not ticked solos as PFL. A proven combination:

| Solo type | Setting | Result |
|---|---|---|
| **Channels** | PFL | Gain setting and line check work with the faders down |
| **Mix buses** | AFL | You hear a monitor mix at the level and pan the musician gets |
| **DCAs** | AFL | Soloing the drum DCA plays the **whole drum group exactly as it is mixed** into the main bus, with every fader and DCA move included |

### Wireless Solo for Tablet Mixing
When mixing from a tablet in the room, and always on an X32 Rack or Core, the headphone jack is out of reach. The solo bus is also present on the **Control Room / Monitor output**:

1. Connect the Control Room outputs to a **wireless in-ear transmitter** (any stereo IEM system).
2. Wear the bodypack receiver while walking the room.
3. Press solo in X32-Mix, X32-Edit or Mixing Station ([Chapter 14](14_Network_Remote_Control_and_Software.md)): the soloed channel or bus is in your ears wherever you stand.

The monitor **Level** knob on the console sets the level into the transmitter; set it once and adjust the listening volume on the bodypack.

---

## 2. Talkback A & Talkback B Communication Matrix

The console features two completely independent talkback paths: **Talkback A** and **Talkback B**.

| Talkback source | Description |
|---|---|
| **Internal mic** | Built-in omnidirectional condenser capsule |
| **External mic** | Dedicated rear XLR talkback input (+48V available) |

Destinations are set separately for Talk A and Talk B; a typical setup:

| Destination | Typical use | Talk to it? |
|---|---|---|
| **Mix buses 1–8** | Stage wedges | ✔ |
| **Mix buses 9–16** | Musicians' in-ear monitors | ✔ |
| **Matrices 1–6** | Green room / backstage | Optional |
| **Main LR** | House PA | ✘ **Leave off during the show** |

### Push-to-Talk vs. Latch Mode:
- **Momentary (Push-to-Talk)**: Hold the `TALK A` button while speaking; releasing it immediately cuts communication.
- **Latch Mode**: Tap `TALK A` once to latch talkback ON; tap again to turn OFF. (Configure latch behavior under **Monitor → Talkback**).

### Production Talkback Best Practice:
- **Talkback A**: Assigned exclusively to **Buses 1–8 (Stage Wedges & Musician IEMs)** to talk directly to the band during rehearsals.
- **Talkback B**: Assigned to **Aux Out / Matrix 6 (Green Room, Stage Manager, or Lighting Booth)** for crew intercom communication without distracting the band.

---

## 3. Test Signal Generator (Oscillator)

The onboard oscillator generates precision test tones for verifying cabling, system continuity, speaker phase, and acoustic room tuning.

### Generator Types:
1. **Pink Noise**: Equal energy per octave. The acoustic standard for room equalization, RTA measurement, and subwoofer crossover phase alignment.
2. **White Noise**: Equal energy per Hertz. High-frequency heavy hiss used for testing HF transducer response.
3. **Sine Wave**: Pure single-frequency test tone adjustable from **20 Hz to 20 kHz** in fine 1 Hz increments.

### System Verification Workflow:
1. Navigate to **Monitor → Oscillator**.
2. Select **Sine Wave** at **1000 Hz** (or **Pink Noise**).
3. Set level to **-20 dBFS**.
4. Set Destination to **Main L/R** (or individual Mix Buses).
5. Unmute the generator. Listen and verify that all speaker enclosures, amp racks, and line returns are functioning cleanly without hum, distortion, or intermittent drops before the performers arrive.

---

## 4. The 8-Channel Automixer (Dan Dugan Gain-Sharing)

Available on **Channels 1 through 8**, the onboard automixer employs a licensed implementation of the industry-standard **Dan Dugan speech gain-sharing algorithm**.

| | Without the automixer | With Dugan gain sharing |
|---|---|---|
| **4 open speech mics** | Comb filtering (hollow sound), four times the room reverb and HVAC noise, high feedback risk | Total gain is held constant at unity (0 dB) |
| **One person speaks** | All four mics stay fully open | That mic gets full gain, the other three drop by about 15 dB |
| **Two people talk** | — | Gain is shared 50/50 |
| **Sound** | — | Changes happen within milliseconds — no gating artifacts, no clipped syllables |

### Setting Up the Automixer:
1. Patch your speech and dialogue microphones into **Channels 1 through 8**.
2. Navigate to **Channel → Config** (or press the **Automix** tab in the Home menu).
3. Enable Automixer for the desired channels.
4. Assign channels to **Group X** or **Group Y** (allows running two independent panels simultaneously).
5. **Weight (Priority)**:
   - Sets the relative sensitivity of each microphone (-12 dB to +12 dB).
   - Set the Moderator / Keynote Pastor to **+3 dB Weight**, and panel guests to **0 dB**. When the moderator speaks, the system automatically prioritizes their voice over interrupting participants.

---

## 5. 100-Band Real-Time Analyzer (RTA)

The console includes a high-resolution 100-band RTA integrated into every screen layer:
- **Bar Display**: High-contrast 100-bar frequency distribution with peak-hold needles.
- **Spectrograph Mode**: Continuous scrolling waterfall display highlighting persistent acoustic feedback frequencies over time.
- **EQ Curve Overlay**: Displays real-time audio spectrum directly behind your channel PEQ and 31-band graphic equalizers, allowing you to instantly visualize and notch out feedback squeals during live performances.
