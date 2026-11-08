# Chapter 07: Mix Buses, Sends-on-Faders & Matrices

The Behringer X32 and Midas M32 internal architecture includes **25 time-aligned mix buses**: 16 configurable Mix Buses, 6 Matrix Buses, and the Main Left, Right, and Center/Mono buses. 

This chapter details mix bus tap configurations, the Sends-on-Faders workflow, stage monitoring (wedges vs. in-ears), audio subgroups versus DCAs, parallel drum processing, and matrix system tuning.

---

## 1. The 16 Mix Buses Architecture

The 16 Mix Buses serve multiple roles across live and studio environments:
- **Auxiliary Sends**: Stage floor wedges, in-ear monitors (IEMs), headphone mixes.
- **Effects Sends**: Feeding internal reverb, delay, and modulation processors (typically Buses 13–16).
- **Audio Subgroups**: Grouping drums, backing vocals, or horns for collective bus processing.

| Tap | Picks up the signal … | Result |
|---|---|---|
| **Pre-EQ** | Before the channel EQ and dynamics | Raw, unprocessed tone |
| **Post-EQ** | After the EQ, before the compressor | No compressor pumping |
| **Pre-Fader** | After EQ and dynamics | **Independent** of the channel fader |
| **Post-Fader** | After fader, pan and mute | Follows the FOH fader balance |
| **Subgroup** | Fixed 0 dB into the bus | The bus fader controls the group volume |

### Mix Bus Processing Capabilities:
Every one of the 16 mix buses features its own complete processing chain:
1. **6-Band Fully Parametric EQ**: Bands 1 and 6 can switch between Low/High Cut, Shelving, or Parametric peaking.
2. **Dynamics Processor**: Complete compressor/limiter with RMS/Peak detection and make-up gain.
3. **Insert Slot**: Can insert any virtual rack effect or external hardware unit.
4. **Bus Delay**: Adjustable up to **500 ms** for acoustic time-alignment.
5. **Stereo Linking**: Buses can be linked in adjacent odd/even pairs (1+2, 3+4, 5+6, etc.) for stereo in-ear monitoring.

---

## 2. The Sends-on-Faders (SoF) Workflow

Mixing stage monitors and effects sends using small rotary knobs can be slow and inaccurate. The **Sends on Faders** mode transforms the motorized faders into physical send controls.

Press **SENDS ON FADER** (it flashes red), then either:

| Method | You select … | The faders then show … | Example |
|---|---|---|---|
| **1 – Bus view** | A bus (e.g. Bus 1, vocalist wedge) | Left 16 faders = **each channel's send into that bus**; the bus fader = the bus master | Fader 1 = kick into Bus 1, fader 2 = snare into Bus 1 |
| **2 – Channel view** | A channel (e.g. Ch 1, lead vocal) | Right 8 faders = **that channel's send to each mix bus** | Fader 1 = vocal to Bus 1, fader 2 = vocal to Bus 2 |

### To Exit Sends on Faders:
Press the flashing red **SENDS ON FADER** button again. The console faders instantly return to their normal house mix positions.

---

## 3. Floor Monitors (Wedges) vs. In-Ear Monitors (IEMs)

### A. Floor Monitors (Stage Wedges):
- **Mandatory Setting**: Configure buses feeding floor wedges to **PRE-FADER** (or Post-EQ).
- *Why Pre-Fader is Mandatory*: If a stage wedge is post-fader, every time the FOH engineer pushes or pulls a fader in the house, the volume in the musician's wedge changes. If the FOH engineer pulls down a vocalist during a quiet speech, the singer can no longer hear themselves. If the FOH engineer pushes a guitar solo, the wedge can instantly feed back into the microphones.
- **Feedback Ringing**: Insert a **Dual TruEQ** or use the bus's onboard 6-band PEQ with narrow notch filters (Q = 8.0) to cut stage feedback rings identified on the RTA.

### B. In-Ear Monitors (IEMs):
- **Stereo Bus Linking**: Link adjacent buses (e.g., Bus 1+2 for Lead Singer IEM, Bus 3+4 for Drummer IEM).
- **Pan Positioning**: Panning individual instruments in the performer's ears creates spatial separation, lowering the required overall volume and reducing ear fatigue.
- **Reverb in In-Ears**: Musicians love vocal reverb in their ears. Route the stereo returns of **FX 1 (Reverb)** to the musician's IEM bus using Sends on Faders.
- **Hearing Protection Limiting**: **Always engage the bus dynamics compressor in Limiter mode (Ratio: 100:1, Attack: 0 ms, Fast Release)** on every IEM bus. Set the threshold so it never clamps down during normal singing, but will instantly catch dropped microphones, guitar unplug pops, or accidental digital spikes before they damage the musician's hearing!

---

## 4. Audio Subgroups vs. DCAs

Many engineers confuse Subgroups and DCAs. While both allow controlling multiple channels with a single fader, they work entirely differently:

| Feature | Audio Subgroup | DCA Group |
|---|---|---|
| **Audio Flow** | Sums actual audio signals together into a bus | Passes **no audio**; remote fader automation offset |
| **Processing** | Has 6-band PEQ, compressor, insert rack, and bus delay | No processing of any kind |
| **Summing** | Audio must be unassigned from Main LR and routed to the bus | Channels remain assigned to Main LR |
| **Send Behavior** | Fixed 0 dB send from channels (on/off assignment) | Proportional fader ride across all assigned channels |
| **Best Application** | Drum bus compression, parallel drum smash, backing vocal glue | Controlling overall volume of horn sections, band stems, or FX |

### Setting Up an Audio Subgroup:
1. Select the channels you wish to group (e.g., Channels 1–8: Drums).
2. On **Channel → Main**, unassign them from **STEREO LR**. (They will no longer feed the house directly).
3. Route the channels to **Bus 1–2** with send level set to **0 dB (Unity)** and bus tap set to **Subgroup**.
4. Link **Bus 1 and Bus 2** as a stereo pair.
5. Select **Bus 1–2**, route it to **STEREO LR**, and raise its master fader to 0 dB.
6. You now have complete drum bus processing: apply EQ, insert a bus compressor, and control the entire drum kit with Bus Faders 1–2.

---

## 5. Parallel Drum Smash (New York Compression)

Parallel compression blends an uncompressed, dynamic drum kit with an extremely smashed, aggressively compressed duplicate:

| Path | Routing | Processing | Result |
|---|---|---|---|
| **Dry** | Drum channels 1–8 → Main stereo LR | None extra | Dynamic, punchy drums |
| **Crushed** | Drum channels 1–8 → Bus 1–2 (subgroup) → Main LR | Fair Compressor or Ultimo 1176 (all-buttons mode), 10–15 dB gain reduction, fast attack, fast release | Blend in under the dry drums with the Bus 1–2 fader at about -10 to -6 dB |

*Result:* The dry drums preserve transient snap and stick attack, while the parallel crushed bus adds massive room tone, body, and sustain without muddying the mix.

---

## 6. The 6 Matrix Mixes: "A Mix of Mixes"

A Matrix mixer does not receive inputs from individual channels. Instead, it takes inputs from **Mix Buses 1–16, Main Left/Right, and Mono/Center**:

| Matrix inputs | Matrix | Outputs |
|---|---|---|
| Mix buses 1–16, Main Left/Right, Mono / Center | **Matrix 1–6** | Analog XLR outputs (or any other output) |

### Why Use Matrices for PA System Distribution?
Feeding your PA amplifiers or active speakers directly from the Main LR fader leaves you vulnerable: if someone bumps the master fader, speaker tuning and delays are disturbed. By feeding PA zones through Matrices, your Main LR fader mixes the show, while Matrices manage speaker processing.

### Matrix Processing Features:
- **6-Band Parametric EQ**: Dedicated room tuning per speaker zone.
- **Limiter**: Protects amplifiers and drivers from over-excursion.
- **Output Delay (0 to 500 ms)**: Critical for distance time-alignment.

### Typical Matrix Distribution Setup:

| Matrix | Zone | Fed from | Processing |
|---|---|---|---|
| **1** | Left PA main | Main L, post-fader | |
| **2** | Right PA main | Main R, post-fader | |
| **3** | Front fills | Main L/R, post-fader | Delay ~18 ms, HPF 120 Hz |
| **4** | Balcony delays | Main L/R, post-fader | Delay ~45 ms |
| **5** | Live stream / web | Main L/R + ambient stage mics | Limiter, -14 LUFS |
| **6** | Cry room / foyer | Main L/R | Mono sum |

### Time-Aligning Delay Speakers:
Sound travels through air at approximately **1.13 feet per millisecond (0.343 meters per millisecond)** at 20°C (68°F).
- *Example:* If your Balcony Delay speakers are **50 feet (15.2 meters)** from the main stage PA:
  $$\text{Delay} = \frac{50\text{ feet}}{1.13\text{ ft/ms}} \approx 44.2\text{ ms}$$
- Enter **44.2 ms** on Matrix 4's delay line. The sound from the main PA and the delay speakers will arrive at the listener's ears simultaneously, eliminating echo and comb filtering.

---

## 7. Main Stereo Bus & Aux-Fed Subwoofers

### Option A: Standard Stereo Main LR (Subwoofers on Crossover)
Main L/R feeds a system crossover or sub-satellite PA. All console channels feed the subwoofers equally based on their low-end content.

### Option B: Aux-Fed Subwoofers (Subwoofers on Mono/Center Bus)
Feed subwoofers exclusively from the console's **Mono / Center bus**:
1. Patch the physical subwoofer amplifier output to **Out 14** (Source: **Mono / Center**, Tap: **Post-Fader**).
2. In the console, assign **only instruments with real sub-bass content** to the Mono bus:
   - Kick Drum: `MONO ON`
   - Bass Guitar: `MONO ON`
   - Synth Bass / Keyboards: `MONO ON`
   - Floor Tom: `MONO ON`
   - All Vocals, Acoustic Guitars, Cymbals, and Speech mics: `MONO OFF`
3. *Benefit:* Vocal plosives, microphone handling noise, and stage foot-thumps can **never** trigger the subwoofers, resulting in an exceptionally clean, punchy, and transparent low-end mix!
