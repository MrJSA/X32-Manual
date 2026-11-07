# Chapter 10: Monitoring, Solo, Talkback & Utilities

A mixing console is only as effective as the engineer's ability to accurately monitor audio, communicate with the stage, verify signal continuity, and manage multiple open microphones. The Behringer X32 and Midas M32 include dedicated control room monitoring circuitry, dual talkback communication matrices, an onboard test signal oscillator, a 100-band Real-Time Analyzer (RTA), and a 8-channel Dan Dugan-style speech automixer.

This chapter details solo modes, talkback routing, system calibration with the oscillator, and speech automixing.

---

## 1. Control Room & Headphone Monitoring

Located on the upper right of the console surface is the dedicated **MONITOR** section. This hardware drives both the physical rear-panel Control Room outputs (for studio monitors or booth speakers) and the dual 1/4" headphone jacks located on the front underside cheeks of the mixer.

```
┌─────────────────────────────────────────────────────────────┐
│ MONITOR / HEADPHONE CONTROLS:                               │
│ - LEVEL KNOB: Independent analog volume control             │
│ - MONO BUTTON: Collapses monitor feed to mono               │
│ - DIM BUTTON: Attenuates monitor output level (-20 dB)      │
│ - TALK A & TALK B BUTTONS: Talkback activation              │
│ - TALK LEVEL KNOB: Preamp gain for talkback microphone      │
└─────────────────────────────────────────────────────────────┘
```

### Solo Modes & Logic:
Press the **MONITOR** screen button to access the configuration tab:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. PFL (PRE-FADER LISTEN):                                  │
│    Listens to raw audio directly after preamp and low cut.  │
│    Fader position and mutes have zero effect.               │
│    *Essential for*: Checking input gain and line hum.       │
├─────────────────────────────────────────────────────────────┤
│ 2. AFL (AFTER-FADER LISTEN):                                │
│    Listens to signal after fader, pan, and mute.            │
│    *Essential for*: Checking stereo IEM mixes and subgroups.│
├─────────────────────────────────────────────────────────────┤
│ 3. EXCLUSIVE SOLO (Solo In Place Toggle):                    │
│    - Active: Pressing any Solo button releases all others.  │
│    - Inactive: Solos accumulate, allowing group listening.  │
├─────────────────────────────────────────────────────────────┤
│ 4. SOLO DIMS:                                               │
│    Automatically lowers monitor level by 20 dB whenever a   │
│    channel is soloed, preventing sudden acoustic ear blast. │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Talkback A & Talkback B Communication Matrix

The console features two completely independent talkback paths: **Talkback A** and **Talkback B**.

```
┌─────────────────────────────────────────────────────────────┐
│ TALKBACK SOURCES:                                           │
│ 1. INTERNAL MIC: Built-in omnidirectional condenser capsule │
│ 2. EXTERNAL MIC: Dedicated rear XLR talkback input (+48V)   │
├─────────────────────────────────────────────────────────────┤
│ DESTINATION MATRIX (Assign independently for Talk A & B):   │
│ [X] Mix Buses 1-8  (Stage Floor Wedges)                     │
│ [X] Mix Buses 9-16 (Musician In-Ear Monitors)               │
│ [ ] Matrices 1-6   (Green Room / Backstage Foyer)           │
│ [ ] Main LR        (House PA ── Leave OFF during show!)     │
└─────────────────────────────────────────────────────────────┘
```

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

```
┌─────────────────────────────────────────────────────────────┐
│                    HOW THE AUTOMIXER WORKS                  │
├─────────────────────────────────────────────────────────────┤
│ Problem with multiple open speech mics:                     │
│ 4 panel members speaking into 4 open mics results in:       │
│ - Comb filtering (hollow acoustic phase cancellation)       │
│ - Multiplied room reverberation and HVAC noise              │
│ - Extreme risk of acoustic feedback                         │
├─────────────────────────────────────────────────────────────┤
│ Dugan Gain-Sharing Solution:                                │
│ The total system gain is held constant at Unity (0 dB).     │
│ - When Speaker A speaks: Mic A gets 100% gain;              │
│   Mics B, C, and D are instantly attenuated by -15 dB!      │
│ - When Speaker A & B converse: Gain splits 50/50.           │
│ - All adjustments occur seamlessly in milliseconds with     │
│   zero audible gating artifacts or lost word syllables!     │
└─────────────────────────────────────────────────────────────┘
```

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
