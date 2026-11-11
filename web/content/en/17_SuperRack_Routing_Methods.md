# Chapter 17: SuperRack Performer Routing Methods

The X32 expansion card is limited to **32 channels in and 32 channels out**. That limit is the central design constraint for every SuperRack setup: you decide how to spend those 32 sends and returns between **direct input processing**, **insert points**, and **bus processing**.

This chapter presents six routing recipes. A to E go from the simplest to the most advanced; F uses firmware 4 User Routing to choose individual channels instead of blocks of eight.

| Method | What gets processed | Card channels used | Difficulty |
|---|---|---|---|
| **A: Direct Input** | All 32 input channels (before channel processing) | 32 / 32 | Easy |
| **B: Aux Insert** | Up to 6 mono insert points on any channel, bus, matrix or Main LR | 8 out / 6 in | Easy |
| **C: Hybrid 24 + 6** | 24 inputs direct + 6 insert points | 32 / 32 | Medium |
| **D: Inserts + Subgroups + Inputs** | 16 inputs + 6 inserts + 8 subgroup channels (+ stream feed) | 32 / 32 | Advanced |
| **E: X-DANTE + Dante Virtual Soundcard** | Same as B, over Dante instead of USB | Dante | Medium |
| **F: User Routing (channel picking)** | Any 24 channels you choose + 6 insert points + stream feed, channel numbers unchanged | 32 / 32 | Medium |

> **Before you start:** Complete the setup in [Chapter 16](16_SuperRack_Performer_Setup.md): 48 kHz, card in 32 × 32 mode, preamp gains set.

---

## Method A: Direct Input (All 32 Channels)

The standard and lowest-latency method. All 32 sources are sent to SuperRack straight after the preamps and returned into the channel strips.

**Signal path:** Preamp → Card Out → SuperRack (plugins) → Card In → channel strip (gate, EQ, dynamics, fader)

### Console Routing

**1. `ROUTING → Card Out`:** send the *same sources* your channels normally use.

| Card Out block | Source (example: all local) | Alternative examples |
|---|---|---|
| 1–8 | Local 1–8 | AES50 A 1–8 |
| 9–16 | Local 9–16 | AES50 A 9–16 |
| 17–24 | Local 17–24 | AES50 B 1–8 / Local 1–8 |
| 25–32 | Local 25–32 | User In 25–32 |

> **X32 Rack / Compact with a 16-channel stagebox:** e.g. `Card Out 1–16 = AES50 A 1–16`, `17–32 = Local 1–16`. With firmware 4 User Routing you can simply use `User In 1–32` on all four blocks (see [Chapter 04](04_Firmware_4x_User_Routing.md)).

**2. `ROUTING → Input`:** return the card into the channels.

| Input block | Source |
|---|---|
| Ch 1–8 | Card 1–8 |
| Ch 9–16 | Card 9–16 |
| Ch 17–24 | Card 17–24 |
| Ch 25–32 | Card 25–32 |

**3. SuperRack:** rack *n* input = `Mono → Input n`; the output follows automatically.

### Characteristics
- ✔ Lowest latency (about 5.9 ms at a 32-sample buffer, see [Chapter 18](18_SuperRack_Latency_and_Buffer.md)).
- ✔ All 32 channels processed.
- ✘ SuperRack sits **before** the console's gate, EQ and dynamics. You cannot place plugins after channel processing.
- ✘ Buses, matrices and Main LR cannot easily be processed.
- **Tip:** If Waves does all the gating, EQ and compression, switch **off** the console's Low Cut, Gate, EQ and Dynamics on those channels to avoid double processing.

---

## Method B: Aux Insert (6 Insert Points)

The X32's insert system was designed for external hardware: a signal leaves on **Aux Out 1–6** and returns on **Aux In 1–6**. By re-patching those aux connectors to the card, SuperRack becomes a "hardware" insert that can be placed on **any** channel, mix bus, matrix or the Main LR bus.

**Signal path:** channel or bus → insert (Aux *n*) → Card Out *n* → SuperRack → Card In *n* → Aux In *n* → back into the channel or bus

### Console Routing

**1. `ROUTING → Input → Aux In` = `Card 1–6`**
- You lose the physical Aux inputs that you re-patch. Need Aux 5/6 for a music player? Choose `Card 1–4` (or `Card 1–2`) instead to keep the remaining aux inputs.

**2. `ROUTING → Card Out → 1–8` = `Aux 1–6 / Mon`**
- This is the **Aux Out** side.
- Card channels **7–8 carry the Monitor (Control Room) L/R** signal. They are not returned to the console; ignore them in SuperRack (or use them to record the monitor feed).
- The physical Aux Outs are now also unavailable for other use.

> **Warning:** Do **not** select Aux **In** as the Card Out source. That sends the return back into itself and creates a feedback loop.

**3. Insert on a channel or bus**
1. Select the channel (or bus, matrix, Main LR).
2. Press `VIEW` in the **Config/Preamp** section (or open `HOME → Config`).
3. Turn the **Insert** encoder down to `Aux 1` (below the internal FX 1–8) and press **Connect**.
4. Choose the position: **Pre** (before EQ and dynamics) or **Post** (after EQ and dynamics).
5. Press **Insert** to engage it.

**4. SuperRack:** rack input `Mono → Input 1`; the output follows automatically.

### Stereo Inserts (e.g. Main LR)
A stereo bus occupies **two** consecutive aux inserts. Selecting `Aux 3` on Main LR automatically uses `Aux 3 + 4`; `Aux 5` uses `Aux 5 + 6`. In SuperRack, set the rack to **Stereo → Inputs 3–4** (the outputs follow) so stereo-linked plugins such as a bus compressor or limiter process L/R together.

### Characteristics
- ✔ Works on channels, mix buses, matrices and Main LR.
- ✔ **Pre or Post** channel processing. For example, put Waves Tune *after* the console's EQ and dynamics so it tracks pitch more reliably.
- ✔ **Instant bypass:** press `INSERT` on the console to drop SuperRack out of the signal path. This is your failsafe if the computer crashes, crackles or runs out of battery mid-show.
- ✔ Can be combined with Method A: a channel processed by Method A can additionally get a post-processing aux insert (two racks on one microphone).
- ✘ Only **6 mono** insert points (= 3 stereo).
- ✘ Uses up the Aux In/Out connectors.
- ✘ About 0.37 ms more latency than Method A.

---

## Method C: Hybrid (24 Direct Inputs + 6 Aux Inserts)

Combines Methods A and B within the 32-channel limit. Card channels 1–8 are reserved for the aux inserts, so the direct input processing is **shifted up by 8 channels** and the last 8 input channels bypass SuperRack. Ideal for channels that don't need plugins anyway (playback tracks, click/cue, announcement mics).

### Card Channel Map

| Card ch. | Card Out (to SuperRack) | Card In (back to the console) |
|---|---|---|
| 1–6 | Aux Out 1–6 | → Aux In 1–6 (insert returns) |
| 7–8 | Monitor L/R (unused) | — |
| 9–16 | Local 1–8 | → Channels 1–8 |
| 17–24 | Local 9–16 | → Channels 9–16 |
| 25–32 | Local 17–24 | → Channels 17–24 |
| — | — | Channels 25–32 = Local 25–32 (direct, no SuperRack) |

### Console Routing

| Page | Block | Source |
|---|---|---|
| `ROUTING → Input` | Ch 1–8 | Card 9–16 |
| | Ch 9–16 | Card 17–24 |
| | Ch 17–24 | Card 25–32 |
| | Ch 25–32 | Local 25–32 (or your stagebox) |
| | Aux In | Card 1–6 |
| `ROUTING → Card Out` | 1–8 | Aux 1–6 / Mon |
| | 9–16 | Local 1–8 |
| | 17–24 | Local 9–16 |
| | 25–32 | Local 17–24 |

With AES50 stageboxes, replace `Local` with the `AES50 A` / `AES50 B` blocks as appropriate.

### SuperRack Rack Layout

| Rack | Input | Purpose |
|---|---|---|
| 1–6 | Inputs 1–6 | Aux inserts 1–6 (e.g. Stereo 1–2 for Main LR) |
| 7–8 | — | Leave empty (monitor feed), or shift all racks by two |
| 9–32 | Inputs 9–32 | Console channels 1–24 |

> **Tip:** Name the racks after the console channels, not the card channels: rack 9 is channel 1!

> **Firmware 4:** Method C is stuck with blocks of eight: the processed channels move, and it is always the *last* eight channels that bypass SuperRack. [Method F](#method-f-user-routing-pick-individual-channels) uses User Routing to choose exactly which channels get plugins while every channel keeps its number.

---

## Method D: Inserts + Subgroups via Ultranet + User Routing

This recipe squeezes the maximum out of the 32 card channels using firmware 4 **User In / User Out** routing ([Chapter 04](04_Firmware_4x_User_Routing.md)) and the **Ultranet (P16) outputs** as an extra tap point for bus signals.

> **Warning:** The Ultranet outputs are repurposed. You **cannot use P16 personal monitors** ([Chapter 11](11_Personal_Monitoring_DP48_and_P16.md)) on this console at the same time. Also, when User In is used for all input blocks, only 24 user inputs remain for physical sources in this layout.

### Design Goal
- 6 aux insert points (e.g. Vocals 1–3, a spare, Main LR on Aux 5/6)
- 4 stereo subgroups (Mix Bus 5–12) processed in SuperRack and returned on the Aux/FX layer
- A stereo stream feed (Matrix 5/6) to the computer
- 16 input channels processed directly

### Card Channel Map

| Card ch. | User Out (Card Out = User Out 1–32) | User In / return |
|---|---|---|
| 1–6 | Aux Out 1–6 (insert sends) | Aux In = Card 1–6 |
| 7–8 | Out 11/12 = Matrix 5/6 (stream feed) | — (to OBS or a recorder) |
| 9–16 | P16 1–8 = Mix Bus 5–12 (post fader) | User In 25–32 |
| 17–32 | Local 1–16 | User In 1–16 → Ch 1–16 |
| — | — | User In 17–24 = Local 17–24 → Ch 17–24 |

### Step by Step

**1. Subgroups on Mix Bus 5–12**
Link buses 5/6, 7/8, 9/10, 11/12 as four stereo subgroups (or leave them unlinked for eight mono groups). Assign channels to them and remove those channels from Main LR.

**2. `ROUTING → P16 Out` (Ultranet)**
Set Ultranet 1–8 = **Mix Bus 5–12**, tap point **Post Fader**.

**3. Stream feed (optional)**
Matrix 5/6 → `ROUTING → XLR Out 11/12`.

**4. `ROUTING → User Out`**

| User Out | Source |
|---|---|
| 1–6 | Aux Out 1–6 |
| 7–8 | Out 11 / Out 12 (Matrix 5/6 stream feed) |
| 9–16 | P16 1–8 (subgroup sends) |
| 17–32 | Local 1–16 |

**5. `ROUTING → Card Out`** = `User Out 1–8 / 9–16 / 17–24 / 25–32`.

**6. `ROUTING → User In`**

| User In | Source |
|---|---|
| 1–16 | Card 17–32 (processed inputs) |
| 17–24 | Local 17–24 (direct) |
| 25–32 | Card 9–16 (processed subgroup returns) |

**7. `ROUTING → Input`:** Ch 1–32 = `User In 1–32`, Aux In = `Card 1–6`.

**8. Move the subgroup returns to the Aux/FX layer**
To keep the returns separate from the input channels, set the **Source** of channels 25–32 (Config page) to **Off**, and assign the input sources **In 25–32** to the eight aux-layer strips instead. The returns now behave like group masters next to the FX returns.

**9. Inserts**
- Vocal 1–3: Insert `Aux 1`, `Aux 2`, `Aux 3` (Pre or Post).
- Main LR: Insert `Aux 5` (uses Aux 5 + 6), Post.

**10. SuperRack**

| Rack | Input |
|---|---|
| 1–4 | Mono 1, 2, 3, 4 (inserts) |
| 5 | Stereo 5–6 (Main LR insert) |
| — | 7–8 stream feed: not a rack (used by the streaming app) |
| Group 1–4 | Stereo 9–10, 11–12, 13–14, 15–16 |
| Inputs | Mono 17–32 (channels 1–16) |

### Resulting Signal Path (a vocal into a subgroup)

| # | Stage | Through SuperRack? |
|---|---|---|
| 1 | Mic → preamp → Card 17 → input rack → Card In 17 → Ch 1 | Yes (pass 1) |
| 2 | Ch 1 insert Aux 1 → SuperRack → back | Yes (pass 2) |
| 3 | Fader → Mix Bus 5/6 (group) | — |
| 4 | Ultranet → Card 9/10 → group rack → Card In 9/10 → aux-layer group return | Yes (pass 3) |
| 5 | Group return → Main LR → insert Aux 5/6 → SuperRack → back | Yes (pass 4) |
| 6 | Outputs | — |

> **Warning:** Each pass through SuperRack adds a full buffer cycle of latency. A signal that passes through input rack + insert + group + Main LR insert accumulates **four** round trips. Keep the buffer as small as possible, and use this layout only where front-of-house latency is acceptable.

> **Note on preamps:** Once channels come from `User In → Card`, adjust their headamps in `SETUP → Preamps` on the physical source (e.g. `Local 1–8`).

---

## Method E: X-DANTE Card + Dante Virtual Soundcard

The same aux-insert method (Method B) works with an **X-DANTE** card instead of a USB card. SuperRack Performer runs on a laptop with **Dante Virtual Soundcard (DVS)**.

**Signal path:** channel → insert Aux *n* → Card Out (Dante) → network → DVS → SuperRack → DVS → network → Card In (Dante) → Aux In *n* → back into the channel

### Setup
1. **Console:** `ROUTING → Card Out 1–8` = `Aux 1–6 / Mon` (or via User Out), `ROUTING → Input → Aux In` = `Card 1–6`.
2. **DVS:** set the channel count (e.g. 8 × 8) and the lowest latency (**4 ms**). Connect the laptop to the X-DANTE **primary** port, directly or via a switch.
3. **X-DANTE latency:** set it to **0.25 ms** in Dante Controller.
4. **Dante Controller → Device View:** drag X32 transmit channels 1–8 onto the laptop's receive channels, and laptop transmit 1–8 onto X32 receive channels 1–8. Green markers indicate signal.
5. **SuperRack:** audio device = Dante Virtual Soundcard, 48 kHz, buffer as small as practical (e.g. 32).
6. Insert on channels or Main LR exactly as in Method B.

### Latency
With X-DANTE at 0.25 ms, DVS at 4 ms and a 32-sample buffer, the total round trip is **about 10 ms**. Raising the SuperRack buffer to 128 samples adds about **4 ms** more. That is fine for front of house in medium and large rooms; for in-ear users see the double-patch strategy in [Chapter 18](18_SuperRack_Latency_and_Buffer.md#in-ear-monitors-the-double-patch-strategy).

---

## Method F: User Routing (Pick Individual Channels)

With firmware 4 **User In / User Out** ([Chapter 04](04_Firmware_4x_User_Routing.md)), the card no longer has to carry whole blocks of eight. Every card channel can carry any single input or output, and every channel can be returned from the card *or* fed straight from its physical input. That gives you three things the block methods can't:

- **Pick the channels:** only the inputs that need plugins go to SuperRack, wherever they sit on the console.
- **Keep the numbering:** channel 1 is still mic 1, whether it runs through SuperRack or not. Unlike Method C, nothing shifts.
- **Mix sends freely:** insert sends, picked inputs and a stream feed share the 32 card channels however you like.

> **Requirement:** firmware 4.0 or newer. Inserts still return on **Aux In = Card 1–6** (the Aux In block can only take the first six card channels), so keep the insert sends on User Out 1–6.

### Example: 24 Picked Channels + 6 Inserts + Stream Feed

A 32-input band where drums, bass, guitars and vocals get Waves plugins, while keys, playback tracks and announcement mics stay on the console only. In this example each mic is plugged into the local input with its channel's number.

| Channels | Instrument | Through SuperRack? |
|---|---|---|
| 1–10 | Drums | Yes |
| 11–12 | Bass | Yes |
| 13–16 | Guitars | Yes |
| 17–20 | Keys | No, direct |
| 21–28 | Vocals | Yes |
| 29–32 | Playback, announcement mics | No, direct |

### Card Channel Map

| Card ch. | Card Out (User Out → SuperRack) | Card In (back to the console) |
|---|---|---|
| 1–6 | Aux Out 1–6 (insert sends) | Aux In 1–6 (insert returns) |
| 7–8 | Out 15/16 = stream mix | — (used by OBS or a recorder) |
| 9–18 | Local 1–10 | → User In 1–10 → Ch 1–10 |
| 19–24 | Local 11–16 | → User In 11–16 → Ch 11–16 |
| 25–32 | Local 21–28 | → User In 21–28 → Ch 21–28 |
| — | — | Ch 17–20 and 29–32: User In = Local, direct |

### Step by Step

**1. Stream feed (optional):** patch the stream mix, e.g. Matrix 1/2, to `ROUTING → XLR Out 15/16`. Mix buses and matrices are not User Out sources themselves, so they need a physical output first.

**2. `ROUTING → User` (output patch, first encoder):**

| User Out | Source |
|---|---|
| 1–6 | Aux Out 1–6 |
| 7–8 | Out 15 / Out 16 |
| 9–18 | Local 1–10 |
| 19–24 | Local 11–16 |
| 25–32 | Local 21–28 |

**3. `ROUTING → Card Out`** = `User Out 1–8 / 9–16 / 17–24 / 25–32`.

**4. `ROUTING → User` (input patch):**

| User In | Source |
|---|---|
| 1–16 | Card 9–24 (processed) |
| 17–20 | Local 17–20 (direct) |
| 21–28 | Card 25–32 (processed) |
| 29–32 | Local 29–32 (direct) |

**5. `ROUTING → Home`:** input blocks 1–8 … 25–32 = `User In`, Aux In = `Card 1–6`.

**6. Inserts** as in [Method B](#method-b-aux-insert-6-insert-points), e.g. Vocals 1–3 on `Aux 1–3` (Post, for Waves Tune), Main LR on `Aux 5` (uses Aux 5 + 6).

**7. SuperRack:**

| Rack input | Rack name |
|---|---|
| Mono 1–3 | Vocal inserts 1–3 |
| Mono 4 | Spare insert |
| Stereo 5–6 | Main LR |
| 7–8 | No rack (stream feed) |
| Mono 9–24 | Ch 1–16 |
| Mono 25–32 | Ch 21–28 |

> **Tip:** Write the console channel into each rack name. Card channel and console channel are different numbers, and the rack list is where it gets confusing.

### Variations
- **No inserts needed?** Put picked inputs on User Out 1–8 as well. Then up to 32 channels go to SuperRack (or 30 plus a stereo stream feed), still in any order.
- **Stage boxes:** use `AES50 A` / `AES50 B` inputs in both patches instead of `Local`. Inputs from several stage boxes can be mixed freely.
- **Two channels from one mic:** to keep a vocal out of the in-ear path ([Chapter 18](18_SuperRack_Latency_and_Buffer.md#in-ear-monitors-the-double-patch-strategy)), set one User In to the card return and another User In to the same physical input. The FOH channel gets the plugins, the monitor channel stays direct.

### Preamps
Gain belongs to the physical input. For the **direct** channels the channel's gain knob still works. For channels returning from the **card**, adjust the headamp in `SETUP → Preamps` on its physical source (e.g. `Local 1–8`).

### Failsafe
Only the User In patch decides whether a channel comes through SuperRack. Save a scene, or a Snippet with only the routing included ([Chapter 12](12_Scenes_Cues_and_Snippets.md)), that sets User In 1–32 back to the physical inputs. One recall takes the whole rig off the computer. Inserts are bypassed with `INSERT` as usual.

### Characteristics
- ✔ Any channels you choose, with no blocks of eight.
- ✔ Channel numbers, scenes and channel presets stay the same with or without SuperRack.
- ✔ Same latency as Methods A and B; channels that don't use SuperRack get no extra latency.
- ✔ No Ultranet outputs needed, so P16 stays available (unlike Method D).
- ✘ Firmware 4 only, and two patch pages to keep in sync: take notes.
- ✘ Still 32 card channels in total, and inserts take Aux In/Out as in Method B.
- ✘ No subgroup processing without the Ultranet trick from Method D.

---

## Choosing a Method

| Your situation | Method |
|---|---|
| Plugins on **all** inputs, nothing else | **A** |
| Plugins on Main LR, buses or a few vocals | **B** |
| Both, and you can spare 8 input channels | **C** |
| Inputs + inserts + group processing, no P16 in use | **D** |
| Console has an X-DANTE card instead of USB | **E** |
| Firmware 4: plugins on chosen channels only, channel numbers unchanged | **F** |
