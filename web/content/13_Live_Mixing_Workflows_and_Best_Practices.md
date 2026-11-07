# Chapter 13: Live Mixing Workflows, System Tuning & Best Practices

Delivering an exceptional live mix requires more than technical feature knowledge; it demands disciplined gain staging, rigorous soundcheck methodology, intelligent loudspeaker system alignment, feedback management, and tailored broadcast streaming.

This chapter provides a complete live soundcheck checklist, internal PA processor tuning, acoustic feedback elimination, broadcast streaming loudness mastery, and a live troubleshooting diagnostic tree.

---

## 1. Step-by-Step Live Soundcheck Checklist

Follow this battle-tested operational checklist for every concert, service, or event:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LIVE SOUNDCHECK PROTOCOL                              │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. POWER-UP SEQUENCE:                                                       │
│    Console & digital stageboxes ON FIRST ──► PA Amplifiers & Subs ON LAST!  │
│    (Power down in reverse: Amps OFF FIRST, then console).                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. LINE CHECK & PREAMP GAIN STAGING:                                        │
│    - Keep channel faders DOWN (-∞).                                         │
│    - Solo channel in PFL (Pre-Fader Listen).                                │
│    - Performer plays at maximum realistic volume.                           │
│    - Set Analog Gain to average -18 dBFS, transient peaks at -12 to -8 dBFS.│
│    - Immediately engage LOW CUT (HPF): 80-140 Hz for vocals, 80 Hz guitars. │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. RING OUT STAGE MONITORS (BEFORE MUSICIANS ARRIVE):                       │
│    - Bring vocal mics up in stage wedges until slight ringing begins.       │
│    - Identify ringing frequencies on the RTA.                               │
│    - Notch out ringing using bus 6-band PEQ or TruEQ graphic EQ.            │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. DIAL IN MUSICIAN MONITORS (SENDS ON FADERS):                             │
│    - Engage Sends on Faders on Bus 1 (Monitor 1).                           │
│    - Ask performer what they need: establish vocal, pitch reference, beat.  │
│    - Repeat for all stage wedges and in-ear mixes.                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. BALANCE FRONT OF HOUSE MIX:                                              │
│    - Drums & Bass first (lock in kick beater snap and bass fundamental).    │
│    - Acoustic & Electric Guitars (carve space around 400 Hz for clarity).   │
│    - Keyboards & Backing Tracks.                                            │
│    - Lead Vocals on top: compress 3:1 to 4:1, add vocal presence at 3.5 kHz.│
│    - Backing Vocals: blend underneath lead vocal.                           │
│    - Time-based FX: Add subtle hall/vintage plate reverb and stereo delay.  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. PA System Processing & Tuning with Matrices

Avoid feeding PA amplifiers directly from the Main LR bus. Instead, route Main LR through **Matrices 1–4** to unlock independent speaker tuning, crossover filtering, and distance delay.

```
Main Left/Right Bus
        │
        ├──► [MATRIX 1: Main PA Left]  ──► 6-band PEQ + Limiter ──► XLR Out 15
        ├──► [MATRIX 2: Main PA Right] ──► 6-band PEQ + Limiter ──► XLR Out 16
        ├──► [MATRIX 3: Front Fills]   ──► Delay ~18 ms + HPF    ──► XLR Out 13
        └──► [MATRIX 4: Delay Balcony] ──► Delay ~44 ms + PEQ    ──► XLR Out 14
```

### Delay Calculation for Time-Alignment:
Sound travels through air at approximately **1.13 feet per millisecond (0.343 meters per millisecond)** at 20°C (68°F).
$$\text{Delay (ms)} = \frac{\text{Distance in Feet}}{1.13} = \frac{\text{Distance in Meters}}{0.343}$$

- *Front Fill Example*: Front fill speakers sitting on the stage lip are 18 feet in front of the drum kit. Set Front Fill delay to **16 ms** so the acoustic drum snap and front fill speaker output arrive at the front row at the exact same instant.
- *Delay Tower Example*: Balcony speakers located 60 feet down the hall require:
  $$\text{Delay} = \frac{60}{1.13} \approx 53.1\text{ ms}$$

---

## 3. Feedback Elimination & Microphone Polar Patterns

Acoustic feedback occurs when sound from a loudspeaker enters a microphone, gets re-amplified, and loops continuously into a runaway oscillation.

```
┌─────────────────────────────────────────────────────────────┐
│           MICROPHONE POLAR PATTERNS & MONITOR PLACEMENT     │
├─────────────────────────────────────────────────────────────┤
│ 1. CARDIOID (e.g., Shure SM58):                             │
│    - Maximum rejection (null point) is directly at 180°     │
│      (dead rear).                                           │
│    ► POSITION WEDGE: DIRECTLY BEHIND THE MICROPHONE STAND!  │
├─────────────────────────────────────────────────────────────┤
│ 2. SUPER-CARDIOID / HYPER-CARDIOID (e.g., Shure Beta 58A):  │
│    - Most sensitive at the front, but has a REAR LOBE at 180°│
│    - Maximum rejection null points sit at 120° and 240°     │
│      (off to the sides).                                    │
│    ► POSITION WEDGES: OFF TO THE SIDES (DUAL WEDGES AT 60°) │
│      Never place a wedge directly behind a Beta 58A!        │
└─────────────────────────────────────────────────────────────┘
```

### Ringing Out Wedges with the RTA:
1. Turn on the stage wedge amplifier and solo the monitor bus.
2. Slowly raise the lead vocal microphone fader in the monitor until it begins to ring.
3. Look at the **RTA display on the monitor bus EQ screen**: a sharp vertical spike will jump up at the feedback frequency (e.g., 2.5 kHz or 630 Hz).
4. Engage a narrow parametric notch filter (**Q = 8.0**) or pull down the corresponding band on a **TruEQ**, dropping that specific frequency by **-3 dB to -5 dB**.
5. Push the volume again. Notch the next ringing frequency.
6. Stop after 3 to 4 cuts. Excessive notching hollows out the vocal tone.

---

## 4. Live Streaming / Broadcast Mix Mastery

### The Room vs. Broadcast Dilemma:
A great Front of House mix will sound terrible on a live internet broadcast:
- In the venue, acoustic stage volume (drums, guitar amps) fills the room naturally. The FOH engineer pushes vocals loudly and pulls down drum and guitar faders.
- On a direct feed to YouTube or Facebook, the broadcast audience hears almost no drums or guitars, while the vocal sits uncomfortably loud and dry on top.

```
┌─────────────────────────────────────────────────────────────┐
│                 BROADCAST MATRIX SOLUTION                   │
├─────────────────────────────────────────────────────────────┤
│ 1. Create a dedicated BROADCAST MIX on Matrix 5–6.          │
│ 2. Feed Matrix 5–6 from a dedicated pre-fader Mix Bus or    │
│    custom User Output patch.                                │
│ 3. Boost drums and rhythm guitars by +4 to +6 dB to replace │
│    lost acoustic stage energy.                              │
│ 4. Blend in stage ambient crowd microphones for room tone.  │
│ 5. INSERT A MASTERING PROCESSOR on Matrix 5–6:              │
│    - Combinator (5-Band Multiband Compressor) OR            │
│    - Fair Compressor + Precision Limiter.                   │
│ 6. TARGET LOUDNESS: Target -14 LUFS (YouTube) or            │
│    -16 LUFS (Facebook Live) with true-peak ceiling at -1 dB.│
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Live Troubleshooting Diagnostic Tree

When problems arise during a live performance, follow this rapid elimination tree:

### "No Sound Coming From Channel X":
1. **Solo (PFL) the Channel**: Does the 6-segment input meter light up?
   - *NO*: Check physical cable, microphone, stagebox patch, and +48V phantom power.
   - *YES*: Signal is arriving at the preamp. Proceed to step 2.
2. **Check Gate Status**: Is the gate light (`G`) on?
   - If illuminated red, the gate is closed. Pull the gate threshold down.
3. **Check Channel Mute**: Is the red `MUTE` button active?
4. **Check Mute Groups & DCAs**:
   - Is a Master Mute Group flashing?
   - Is a DCA assigned to this channel pulled down to -∞?
5. **Check Bus Assignment**:
   - On **Channel → Main**, verify **STEREO LR** is illuminated blue.
6. **Check Master Fader**: Is the Main LR fader raised above -∞?

### "Loud Digital Pop & Audio Muting":
- **Diagnosis**: Electrostatic discharge (ESD) or clock loss on AES50.
- **Fix**: Immediately replace unshielded Cat5 cable with **Shielded Twisted Pair (STP)** with grounded Neutrik EtherCON connectors. Verify FOH console synchronization is set to **INTERNAL**.

### "Musician Says In-Ear Monitor Didn't Change":
- **Diagnosis**: FOH engineer adjusted a DCA fader or channel fader.
- **Fix**: Stage in-ears are fed pre-fader! Engage **Sends on Faders** on that musician's mix bus to adjust their personal volume.

### "Reverb Sounds Washed Out on Speech":
- **Diagnosis**: Reverb returns were left active when the speaker began talking.
- **Fix**: Tap **MUTE GRP 3 (FX MUTE)** immediately when the song concludes.
