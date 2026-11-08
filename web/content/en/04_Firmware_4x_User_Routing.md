# Chapter 04: Firmware 4.x User Routing & 1:1 Patching

*How the Firmware 4 User Input and User Output patch works, when to use it, and step-by-step configuration on the console and remote software.*

---

## Why user routing exists

Before firmware 4, the X32 patched inputs and outputs only in **blocks of eight**. Channels 1–8 could come from
the local preamps 1–8, from AES50 A 1–8, from the card, and so on, but always as a whole block.

That gets wasteful quickly:

- Your stage box carries 28 microphones, but your 4 wireless receivers sit next to you at front of house. With
  block routing, the receivers take a whole block of 8 local inputs, so 4 channels are wasted.
- You want only *one* channel from a second stage box. You still have to give it a whole block.

The common workaround was to change each channel's **source** (Channel → Config → Source). It works, but the patch
then lives in 32 different places. It's easy to end up with two channels on the same input without noticing:
you mute one channel, the microphone is still audible, and you have to page through every layer to find where
else it lands.

**User routing** (firmware 4.0 and newer) adds a 1:1 patch. Every one of the 32 channel inputs, and up to 48
outputs, can be fed individually from any source.

> **Requirement:** firmware 4.0 or newer on the X32 / M32. Older firmware has no *User* tab in the routing menu.

---

## How the signal gets to a channel

| Step | Where | What it does |
|---|---|---|
| **1. Physical input** | — | Local 1–32, AES50 A 1–48, AES50 B 1–48, Card 1–32, Aux In 1–6, Talkback int/ext |
| **2. User patch** | Routing → User | User In 1 … 32, each picking one of the sources above |
| **3. Input block** | Routing → Home | Inputs 1–8 = *User In 1-8*, 9–16 = *User In 9-16*, 17–24 = *User In 17-24*, 25–32 = *User In 25-32* |
| **4. Channel** | Channel → Config | Source IN 1 … 32 — **leave these 1:1** |

Three things have to line up:

1. The **user input patch** says which physical input feeds *User In N*.
2. The **input block** on the routing home page must be set to *User In* (for example *User In 1-8*). Otherwise
   the user patch is ignored for that block. You can mix block types, for example inputs 1-24 from AES50 and
   only 25-32 from the user patch.
3. The **channel source** should stay at its default (channel N = input N). Do the custom patching in the user
   patch, not in the channels.

---

## User In vs. User Out

| | User In | User Out |
|---|---|---|
| Slots | 32 | 48 |
| Sources | Local 1-32, AES50 A 1-48, AES50 B 1-48, Card 1-32, Aux In 1-6, Talkback internal / external | everything User In offers **plus** the 16 outputs, P16 1-16, Aux Out 1-6 and Monitor L/R |
| Used by | the 32 channel inputs (input blocks *User In 1-8 …*), and the card / AES50 outputs | the card outputs and AES50 A / B outputs (blocks *User Out 1-8 … 41-48*) |
| Cannot | — | feed the console's own channels |

User Out is for building a custom feed to *another device*: a recorder, a streaming computer or a second console.
It can't feed the X32's own channels.

**Mix buses and matrices are not User Out sources.** To send a bus or matrix into the user output patch, first patch
it to a physical output (for example *Aux Out 5 = Matrix 1, post fader*), then pick that output (*Aux Out 5*) in the
user output patch.

---

## Setting it up on the console

1. Press **ROUTING** and page right with the PAGE buttons until you reach the **User** tab.
2. The **first encoder** switches between the *input* and *output* user patch.
3. Select a slot (User In 1 …) and choose its source. Repeat for each slot you need.
4. Page back to the routing **Home** tab and set each input block that should use the patch to
   **User In 1-8 / 9-16 / 17-24 / 25-32**.
5. For recording, go to the **Card Out** tab (or *AES50 A / B Out*) and choose the user blocks there as well.
   The sixth encoder scrolls through the 32 card channels so you can check what each one carries.

---

## Typical setups

### 1. Stage box plus wireless at front of house

28 microphones on an AES50 stage box, 4 wireless receivers plugged into the console.

| User In | Source |
|---|---|
| 1-28 | AES50 A 1-28 |
| 29-32 | Local 1-4 (or Aux In 1-4, whichever is easier to cable) |

Input blocks 1-8 … 25-32 = *User In*. No input is wasted, and the receivers can sit right next to you.

### 2. Two stage boxes and two local inputs

The drums use 12 inputs of stage box A, the rest of the band is on stage box B, and two announcement mics are
local.

| User In | Source |
|---|---|
| 1-12 | AES50 A 1-12 |
| 13-28 | AES50 B 1-16 |
| 29-30 | Aux In 1-2 |

The patch doesn't have to be in order. A dual-output bass rig on stage box B can go to channels 17/18
(*AES50 B 1-2*) while the surrounding channels keep coming from stage box A.

### 3. Multitrack recording that follows the patch

Set the card outputs to **User In 1-32**. The card then records exactly what lands on the channels, track 1 =
channel 1, whatever the physical source. For a **virtual soundcheck**, switch the input blocks to **Card 1-8 …
25-32**. Every channel then plays back its own recorded track, with no re-patching needed.

### 4. Record 30 inputs and the PA (or stream) mix

Card output = **User Out 1-32**:

| User Out | Source |
|---|---|
| 1-30 | Local 1-30 (the stage inputs) |
| 31-32 | the outputs that carry the PA or stream mix, e.g. *Out 15 / Out 16*, or *Aux Out 5 / 6* after patching Matrix 1 / 2 to them |

The DAW or the streaming software then gets the mix on card inputs 31/32. You can also put the stream mix on
User Out 1/2 and the 30 inputs on 3-32, if your streaming software expects the mix on the first two channels.

### 5. Feeding a second console over AES50 B

Set the AES50 B outputs to **User Out 1-8 … 41-48**. You can then pick up to 48 signals for the other console:
inputs from either stage box, card returns, any of the outputs, P16 feeds or the monitor bus.

---

## Pitfalls

- **One input on two channels.** If a channel's *source* was changed by hand, the same microphone can land on two
  channels. Muting one channel doesn't silence the mic. Keep channel sources 1:1 and patch in the user patch.
- **Block not set to User In.** Setting a user patch slot changes nothing until the matching input block uses it.
- **Re-patching during a show.** Every patch change cuts the old source off immediately. Save a scene (or a
  routing preset in the LIBRARY) before you start.
- **Preamp gain follows the physical input.** After re-patching, channel 2 may be controlling the gain of stage-box
  preamp A2 instead of local preamp 2. The gain belongs to the input, not to the channel.

---

*X32 is a trademark of Behringer / Music Tribe, M32 of Midas. Practical setup workflows in this guide reference verified console engineering best practices and routing walkthroughs.*
