# Chapter 15: Live Mixing Workflows, System Tuning & Best Practices

Delivering an exceptional live mix requires more than technical feature knowledge; it demands disciplined gain staging, rigorous soundcheck methodology, intelligent loudspeaker system alignment, feedback management, and tailored broadcast streaming.

This chapter provides a complete live soundcheck checklist, internal PA processor tuning, acoustic feedback elimination, broadcast streaming loudness mastery, and a live troubleshooting diagnostic tree.

---

## 1. Step-by-Step Live Soundcheck Checklist

Follow this battle-tested operational checklist for every concert, service, or event:

| Step | What to do |
|---|---|
| **1. Power-up order** | Console and digital stageboxes **on first**, PA amplifiers and subs **on last**. Power down in reverse: amps off first, then the console. |
| **2. Line check & gain** | Faders down (-∞), solo the channel in **PFL**, let the performer play at full realistic volume, set analog gain to average **-18 dBFS** with peaks at -12 to -8 dBFS, then engage **Low Cut** (80–140 Hz vocals, 80 Hz guitars). |
| **3. Ring out the wedges** *(before the musicians arrive)* | Bring vocal mics up in the wedges until a slight ring starts, find the frequency on the **RTA**, notch it with the bus 6-band PEQ or a TruEQ graphic EQ. |
| **4. Musician monitors** | Use **Sends on Faders** on Bus 1 (monitor 1), ask what the performer needs (own vocal, pitch reference, beat) and repeat for every wedge and in-ear mix. |
| **5. Balance the FOH mix** | Drums & bass first (kick beater and bass fundamental) → acoustic & electric guitars (carve space around 400 Hz) → keys & tracks → lead vocal on top (compress 3:1–4:1, presence at 3.5 kHz) → backing vocals underneath → subtle hall / plate reverb and stereo delay. |

---

## 2. PA System Processing & Tuning with Matrices

Avoid feeding PA amplifiers directly from the Main LR bus. Instead, route Main LR through **Matrices 1–4** to unlock independent speaker tuning, crossover filtering, and distance delay.

| Matrix | Zone | Fed from | Processing | Output |
|---|---|---|---|---|
| **1** | Main PA left | Main L | 6-band PEQ + limiter | XLR Out 15 |
| **2** | Main PA right | Main R | 6-band PEQ + limiter | XLR Out 16 |
| **3** | Front fills | Main L/R | Delay ~18 ms + HPF | XLR Out 13 |
| **4** | Balcony delays | Main L/R | Delay ~44 ms + PEQ | XLR Out 14 |

### Delay Calculation for Time-Alignment:
Sound travels through air at approximately **1.13 feet per millisecond (0.343 meters per millisecond)** at 20°C (68°F).
$$\text{Delay (ms)} = \frac{\text{Distance in Feet}}{1.13} = \frac{\text{Distance in Meters}}{0.343}$$

- *Front Fill Example*: Front fill speakers sitting on the stage lip are 18 feet in front of the drum kit. Set Front Fill delay to **16 ms** so the acoustic drum snap and front fill speaker output arrive at the front row at the exact same instant.
- *Delay Tower Example*: Balcony speakers located 60 feet down the hall require:
  $$\text{Delay} = \frac{60}{1.13} \approx 53.1\text{ ms}$$

---

## 3. Feedback Elimination & Microphone Polar Patterns

Acoustic feedback occurs when sound from a loudspeaker enters a microphone, gets re-amplified, and loops continuously into a runaway oscillation.

| Polar pattern | Example | Least sensitive at | Where the wedge goes |
|---|---|---|---|
| **Cardioid** | Shure SM58 | 180° (directly behind) | **Directly behind** the mic stand |
| **Super- / hypercardioid** | Shure Beta 58A | 120° and 240° (it has a rear lobe at 180°) | **Off to the sides** — two wedges at about 60° either side of the rear. Never directly behind a Beta 58A! |

### Ringing Out Wedges with the RTA:
1. Turn on the stage wedge amplifier and solo the monitor bus.
2. Slowly raise the lead vocal microphone fader in the monitor until it begins to ring.
3. Look at the **RTA display on the monitor bus EQ screen**: a sharp vertical spike will jump up at the feedback frequency (e.g., 2.5 kHz or 630 Hz).
4. Engage a narrow parametric notch filter (**Q = 8.0**) or pull down the corresponding band on a **TruEQ**, dropping that specific frequency by **-3 dB to -5 dB**.
5. Push the volume again. Notch the next ringing frequency.
6. Stop after 3 to 4 cuts. Excessive notching hollows out the vocal tone.

Ring out with the microphones **where they will be used**, with their low cut engaged, and with the real wedge positions. Treat each microphone on its own and note the result: it is a good starting point for the next show in the same room.

### Placement Comes Before EQ
Every filter you set costs tone. Geometry is free:
- **Never aim a loudspeaker at a microphone.** A direct path from speaker to mic is the most common cause of feedback, even with a directional mic.
- **Wedges point at the performer's ears**, not at the microphone, and sit in the null of its polar pattern (table above).
- **The PA covers the audience, not the stage.** Keep the mains in front of the microphone line and angle them away from it.
- **Keep monitor levels in check.** Every dB less on stage is a dB more margin before feedback, and less spill in every open microphone.

---

## 4. Live Streaming / Broadcast Mix Mastery

### The Room vs. Broadcast Dilemma:
A great Front of House mix will sound terrible on a live internet broadcast:
- In the venue, acoustic stage volume (drums, guitar amps) fills the room naturally. The FOH engineer pushes vocals loudly and pulls down drum and guitar faders.
- On a direct feed to YouTube or Facebook, the broadcast audience hears almost no drums or guitars, while the vocal sits uncomfortably loud and dry on top.

| Step | What to do |
|---|---|
| **1. Separate mix** | Build a dedicated broadcast mix on **Matrix 5–6** |
| **2. Feed it** | From a dedicated broadcast mix bus (e.g. Bus 15–16, pre-fader) plus Main LR as needed |
| **3. Rebalance** | Raise drums and rhythm guitars by +4 to +6 dB to replace the acoustic stage energy the stream doesn't get |
| **4. Room tone** | Blend in the stage ambient / crowd mics |
| **5. Master it** | Insert the **Combinator** or a **Fair Compressor + Precision Limiter** on Matrix 5–6 |
| **6. Loudness** | Aim for **-14 LUFS** (YouTube) or **-16 LUFS** (Facebook Live), true-peak ceiling **-1 dB** |

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

### "Musicians Still Hear a Muted Microphone":
- **Diagnosis**: The personal mixers or direct outs are tapped Pre Fader, which sits before the mute.
- **Fix**: Change the tap to **Pre Fader+M** ([Chapter 03](03_Routing_and_Patching.md)).

### "Bass or Keyboard Sounds Thin Through the DI":
- **Diagnosis**: The pad of a cheap passive DI is filtering the low end, or a stereo TRS cable is plugged into a balanced mono input.
- **Fix**: Switch the pad off, and check the cabling ([Chapter 05](05_Gain_Staging_and_Preamps.md)).

---

## 6. Measuring the System with Smaart or REW

The delay formula in Section 2 gives a starting value. A measurement gives the exact one, and the expansion card makes the console its own measurement interface: no extra audio interface is needed.

| Signal | Path |
|---|---|
| **Test signal** | Measurement software → USB → a card input → a console channel → the loudspeaker output under test |
| **Measurement microphone** | An omnidirectional measurement mic at the listening position → a console input → **Card Out** → software. Do **not** assign this channel to Main LR |
| **Reference** | The same test signal looped straight back to the software on a second card channel, so it can compare what was sent with what arrived |

1. Connect the computer to the card and select it as the audio device in the measurement software.
2. Use the software's pink noise as test signal. A periodic (pseudo-random) pink noise settles quickly and needs little averaging.
3. Measure one loudspeaker at a time: the software's delay finder shows the arrival time of each.
4. Enter the **difference** as delay on the earlier source: the matrix or bus delay (0–500 ms) for loudspeaker zones, such as a top and a sub that stand a few milliseconds apart.
5. Measure both together to confirm they now add up around the crossover frequency. Only then start equalizing.

Polarity alone cannot fix an arrival-time difference; see [Chapter 05](05_Gain_Staging_and_Preamps.md).

---

## 7. Wireless Microphones & In-Ears: RF Basics

A wireless dropout sounds like a console problem and never is one. A few habits prevent most of them:

- **Scan first.** Scan the venue with the receivers (or a scanner) before choosing frequencies, and let the manufacturer's coordination software (e.g. Shure Wireless Workbench, which is free) calculate compatible ones. Look up the local TV transmitters beforehand.
- **Aim directional antennas with their nulls in mind.** A log-periodic (LPDA, "paddle") antenna is least sensitive to the rear. Point it at the stage so that strong TV transmitters lie in that rear null.
- **Watch the timeline during the show.** The coordination software logs RF level, audio level and battery state per channel. It also shows at a glance whether a transmitter is switched on. Read the alert log after the show.
- **Keep transmitters in one place.** Collect handhelds and bodypacks at the monitor desk as the musicians leave the stage; a tray lined with foam keeps them sorted and protected.
- **Lay out the console the same way every time.** For example drums, bass, guitars and vocals on the first fader layer; keys, tracks and talkback on the second. Keep a printed input and patch list at the desk.
