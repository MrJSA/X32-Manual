# Chapter 03: Routing, Patching & Signal Distribution

The routing matrix of the Behringer X32 and Midas M32 is one of the most flexible and misunderstood components of the console. Firmware 4.x expanded the original "blocks-of-eight" architecture by introducing **User 1:1 Routing**, allowing any physical connector (local XLR, stagebox AES50, expansion card, or auxiliary jack) to be patched to any channel or output independently.

This chapter breaks down the routing architecture, tap points, input and output patching, and real-world stage setups.

---

## 1. Routing Architecture Overview

The console distinguishes between three separate stages: **Physical Hardware**, the **Patchbay**, and the **Console Channel Strip**:

| Stage | Where on the console | What you choose |
|---|---|---|
| **1. Physical connectors** | — | Local XLR 1–32, AES50 A 1–48, AES50 B 1–48, Card 1–32, Aux In 1–6 |
| **2. User input patch** *(Firmware 4.x)* | Routing → **User** tab | Any physical socket for each of User In 1–32 |
| **3. Input blocks** | Routing → **Home** tab | For inputs 1–8, 9–16, 17–24 and 25–32 each: Local, AES50 A/B (1–8 … 41–48), Card (1–8 … 25–32) or User In |
| **4. Channel source** | Channel → Config → **Source** | Leave it 1:1 (Ch 1 = In 1, Ch 2 = In 2, …) |

> **Rule of Thumb:** Never change individual channel sources in the **Channel → Config** screen unless doing complex channel-splitting. Keep channel sources mapped 1:1 (`In 1` through `In 32`) and perform all custom patching in the **ROUTING** menu. This prevents ghost patches and muted-channel troubleshooting headaches.

---

## 2. Block Routing vs. User 1:1 Routing

### Legacy Block Routing (Firmware 1.x – 3.x):
Inputs and outputs were routed strictly in groups of eight:
- Inputs 1–8 = Local 1–8
- Inputs 9–16 = Local 9–16
- Inputs 17–24 = AES50 A 1–8
- Inputs 25–32 = AES50 A 9–16

*The limitation:* If you had a 28-channel digital snake on stage and 4 wireless microphone receivers at Front of House, bringing in the 4 wireless mics forced you to sacrifice an entire block of 8 stagebox channels.

### Firmware 4.x User Routing:
User Routing provides complete 1:1 freedom:
- **User In (32 Slots)**: Each slot can select any physical input on the console (Local 1–32, AES50 A 1–48, AES50 B 1–48, Card 1–32, Aux In 1–6, Talkback).
- **User Out (48 Slots)**: Custom output patch selecting from physical inputs, internal mix buses, matrices, Main LR, monitor bus, or direct outputs.

---

## 3. Output Tap Points (Signal Pick-Off Positions)

When routing any signal to an analog XLR output, Aux output, P16 Ultranet bus, or Card track, you must specify its **Tap Point**. Choosing the wrong tap point is the number one cause of monitor and recording issues.

| Tap point | Picks up the signal … | Typical use |
|---|---|---|
| **In / LC** | Right after the headamp and low cut; before gate, EQ and dynamics | Multitrack recording, direct outs |
| **Pre EQ** | After the gate, before EQ and compressor | Raw-tone feeds |
| **Post EQ** | After the EQ, before the compressor | Monitor mixes without compressor pumping |
| **Pre Fader** | After EQ and dynamics, **before** mute and fader | Stage wedges and in-ear mixes |
| **Post Fader** | After fader, pan and mute | Effects sends, broadcast and recording mixes that follow FOH |

| Tap Point | Characteristics | Recommended Application |
|---|---|---|
| **IN / LC** | Completely clean, untouched raw audio directly after preamp and low cut. Fader movements, mutes, EQ, and compressors have zero effect. | **Multitrack DAW Recording**: Guarantees raw tracks for post-production re-mixing. |
| **PRE EQ** | Includes preamp and gate; bypasses EQ and dynamics. | Specialty monitoring or parallel external processing. |
| **POST EQ** | Includes preamp, gate, and EQ; bypasses channel compressor. | Sending to broadcast or external recording when EQ is desired without channel compression pumping. |
| **PRE FADER** | Includes EQ and compression; **independent** of channel fader movements and mutes. | **Stage Floor Wedges & In-Ear Monitors (IEMs)**: Ensures the FOH engineer's fader rides do not alter stage musicians' monitor volumes. |
| **POST FADER** | Dependent on channel fader, pan, and mute status. | **Reverb/Delay FX Sends**, **Main PA Speakers**, **Matrix Feeds**, **Delay Towers**, and **Live Stream Mixes**. |
| **SUBGROUP** | Direct audio summing without variable send level (fixed unity gain). | Drum subgroups, horn sections, or choir stems. |

### The "+M" Taps: Making a Pre-Fader Tap Follow the Mute

In the output tap list, every tap before the fader exists twice: `IN/LC` and `IN/LC+M`, `Pre EQ` and `Pre EQ+M`, `Post EQ` and `Post EQ+M`, `Pre Fader` and `Pre Fader+M`. **+M means "with mute".**

All taps before the fader also sit before the channel's **Mute** button. A direct out tapped at `Pre Fader` therefore keeps playing when the channel is muted at front of house.

| Tap | Channel muted at FOH | Use it for |
|---|---|---|
| **Pre Fader** | The output **keeps playing** | Multitrack recording; in-ear feeds that must stay open during soundcheck while the PA is muted |
| **Pre Fader+M** | The output is **muted too** | P16 personal mixers and direct outs during the show: a mic muted at FOH (feedback, speech break, backstage chatter) is also silent in the musicians' ears |

`Post Fader` needs no +M version: it always follows the mute.

### Send Tap vs. Output Tap: Two Different Settings

A monitor mix has **two** tap settings, and they are easy to mix up:

| Setting | Where | Value for a stage wedge | Why |
|---|---|---|---|
| **Channel sends into the bus** | Select the bus → `VIEW` in the Config/Preamp section → send tap (set per odd/even bus pair) | **Pre Fader** | FOH fader moves don't change the monitor mix |
| **Output tap of the bus** | **ROUTING → Out 1–16** → tap of the output that carries the bus | **Post Fader** | The bus master fader (and its mute) controls the wedge level |

If the output tap is set to Pre Fader instead, the bus master fader does nothing and the wedge can only be turned down at the amplifier.

---

## 4. Output Routing Tabs Explained

Press the **ROUTING** button to view the output tabs:

### A. Out 1–16 Tab (Analog XLR Outputs)
Controls the 16 physical XLR male outputs on the rear panel (or routed to digital stageboxes via AES50):
- **Output 1–16**: Assign Category (Main, Mix Bus, Matrix, Direct Out) and Tap Point.
- Standard assignment:
  - Outs 1–8: Mix Buses 1–8 (Stage monitors / IEMs).
  - Outs 9–12: Mix Buses 9–12 (Additional monitors / Subgroups).
  - Out 13: Matrix 1 (Front Fills).
  - Out 14: Mono/Center Bus (Subwoofers).
  - Out 15 & 16: Main Left & Main Right (Main PA).

### B. Aux Out Tab (1/4" TRS Outputs)
Controls the 6 balanced 1/4" TRS jacks on the rear panel:
- Perfect for feeding green rooms, lobby speakers, video feeds, or hardware outboard processors.
- Aux 5 and Aux 6 include parallel RCA jacks for consumer recording decks.

### C. Ultranet Tab (P16 Personal Monitoring)
Assigns 16 discrete audio streams to the Ultranet EtherCON port. Connects directly to Behringer P16-D distribution hubs and P16-M personal mixers:
- Standard practice: Tap channels at **Pre-Fader** or **Post-EQ** so stage performers hear their tone without being affected by FOH fader balancing.
- For the show, prefer the **+M** version (`Pre Fader+M`) so channels muted at FOH are also muted on the personal mixers.

### D. Card Out Tab (32-Channel DAW / USB Expansion)
Assigns 32 audio channels sent over the expansion card (X-USB, X-LIVE, X-DANTE):
- For live recording, route **Local 1–32** or **AES50 A 1–32** directly to Card Out.
- Tap channels at **IN / LC** to record pristine preamps without console compression or EQ.

### E. AES50 A Out & AES50 B Out Tabs (48 Channels Each)
Transmits digital audio out of the EtherCON snake ports to stageboxes, personal monitor systems (DP48), or secondary mixing consoles.

---

## 5. Practical Routing Recipes

### Recipe 1: 28 Stagebox Inputs + 4 FOH Wireless Microphones
*Scenario:* An S32 stagebox on stage carries 28 inputs over AES50 Port A. Four wireless handheld receivers sit locally in the FOH rack plugged into Local XLR inputs 1–4.

1. Press **ROUTING** and page to the **User** tab.
2. Select **User In** (first encoder).
3. Set **Inputs 1 through 28** to `AES50 A 1` through `AES50 A 28`.
4. Set **Inputs 29 through 32** to `Local In 1` through `Local In 4`.
5. Page to the **Home** (Inputs) tab.
6. Set the four input blocks:
   - `Inputs 1-8`   = **User In 1-8**
   - `Inputs 9-16`  = **User In 9-16**
   - `Inputs 17-24` = **User In 17-24**
   - `Inputs 25-32` = **User In 25-32**
7. *Result:* Channels 1–28 mix the stage snake; channels 29–32 mix the local wireless microphones without wasting an entire block of 8 stagebox inputs!

### Recipe 2: Recording 30 Inputs + Main PA Mix over USB
*Scenario:* You want to multitrack 30 channels into a laptop DAW via USB, but want Card Tracks 31 and 32 to record the final stereo house mix.

1. Route Main L/R to Aux Out:
   - Go to **Routing → Aux Out**.
   - Set `Aux Out 5` = **Main L**, Tap: **Post Fader**.
   - Set `Aux Out 6` = **Main R**, Tap: **Post Fader**.
2. Build User Output Patch:
   - Go to **Routing → User** and select **User Out**.
   - Set Slots 1–30 to `Local In 1–30` (or `AES50 A 1–30`).
   - Set Slot 31 to `Aux Out 5`.
   - Set Slot 32 to `Aux Out 6`.
3. Assign Card Outputs:
   - Go to **Routing → Card Out**.
   - Set all 4 card blocks to **User Out 1–8**, **User Out 9–16**, **User Out 17–24**, and **User Out 25–32**.
4. *Result:* Your DAW records 30 pristine raw input tracks on tracks 1–30, and the fully processed stereo board mix on tracks 31–32!

### Recipe 3: Instant Virtual Soundcheck Toggle
*Scenario:* Instantly switch all 32 console channels from live stage preamps to multitrack DAW playback from your computer.

1. **Live Performance Setting**:
   - `Routing → Home`: Inputs 1–32 set to `AES50 A 1–32` (or `Local 1–32`).
2. **Virtual Soundcheck Setting**:
   - `Routing → Home`: Inputs 1–32 switched to `Card 1–8`, `Card 9–16`, `Card 17–24`, and `Card 25–32`.
3. Store this toggle into two Snippets (e.g., `Snippet 01: VSC ON`, `Snippet 02: VSC OFF`) targeting only the **Routing** parameter. You can now toggle the entire console between live and playback with a single button press!
