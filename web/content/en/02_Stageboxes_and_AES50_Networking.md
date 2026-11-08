# Chapter 02: Digital Snakes, Stageboxes & AES50 Networks

The SuperMAC AES50 networking protocol, developed by Sony Pro Audio and refined by Klark Teknik, is the digital backbone of the Behringer X32 and Midas M32 ecosystems. Carrying 48 channels of bidirectional 24-bit 48 kHz digital audio over a single network cable with sub-millisecond latency, AES50 replaces heavy analog copper snake multicables with lightweight, interference-free digital connections.

This chapter details the AES50 protocol, stagebox hardware (S16, S32, SD8/16, DL16, DL32), mandatory shielded cabling requirements, master/slave clock synchronization, cascading, and multi-console gain sharing.

---

## 1. The SuperMAC AES50 Protocol

Each AES50 port (Port A and Port B) transmits and receives:
- **48 Bidirectional Channels**: 48 channels in, 48 channels out at 48 kHz (or 44.1 kHz) 24-bit PCM.
- **Ultra-Low Latency**: Latency across the link is deterministic: exactly 3 samples (~62.5 microseconds at 48 kHz).
- **Control Data**: Carries headamp remote commands (gain, +48V phantom power, stagebox status) multiplexed directly inside the audio stream.

| Port | Channels | Connector |
|---|---|---|
| **AES50 Port A** | 48 in / 48 out | Neutrik EtherCON |
| **AES50 Port B** | 48 in / 48 out | Neutrik EtherCON |
| **Total** | **96 in / 96 out** | |

---

## 2. Stagebox Hardware Models Compared

| Model | Analog Inputs | Analog Outputs | Preamp Class | Key Features |
|---|---|---|---|---|
| **Behringer S16** | 16 XLR Mic/Line | 8 XLR Line | Midas-designed programmable | Ultranet P16 port, dual ADAT optical outs, cascade port. |
| **Behringer S32** | 32 XLR Mic/Line | 16 XLR Line | Midas-designed programmable | Dual AES50 ports, Ultranet port, dual ADAT outs, compact 3U chassis. |
| **Behringer SD8** | 8 Combo (XLR/TRS)| 8 XLR Line | Midas-designed programmable | 2 Hi-Z instrument inputs, 2 built-in Ultranet distribution ports. |
| **Behringer SD16**| 16 Combo (XLR/TRS)| 8 XLR Line | Midas-designed programmable | 4 Hi-Z instrument inputs, 4 built-in Ultranet distribution ports. |
| **Midas DL16** | 16 XLR Mic/Line | 8 XLR Line | **Genuine Midas Pro Preamps**| Warm analog saturation characteristics, gold-plated Neutrik connectors. |
| **Midas DL32** | 32 XLR Mic/Line | 16 XLR Line | **Genuine Midas Pro Preamps**| 32 Pro preamps, 16 balanced XLR outs, dual AES50, dual ADAT. |

---

## 3. MANDATORY REQUIREMENT: Shielded Cable & EtherCON

> **CRITICAL WARNING:** You **MUST NEVER** use standard unshielded (UTP) computer network cable for AES50 connections!

| Step | What happens |
|---|---|
| **1. Static builds up** | When snakes are pulled across a stage or uncoiled, static electricity of up to 15,000 volts builds up on the PVC cable jacket. |
| **2. It discharges into the port** | With **unshielded (UTP)** cable, the charge sparks straight into the data pins of the console port. |
| **3. The damage** | Instant clock sync loss (a loud pop), audio muting on stage, and possibly permanent destruction of the AES50 transceiver chips. |

### Mandatory Cable Specifications:
1. **Shielded Twisted Pair**: **STP, FTP, or SF/UTP** Cat5e or Cat6 cable with foil or braided shield.
2. **Neutrik EtherCON Shells**: Metal EtherCON barrel connectors on both ends.
3. **Continuous Grounding**: The metal shell of the connector **must be physically soldered to the cable shield wire** on both ends to drain static charges harmlessly into the chassis ground before reaching data pins.
4. **Maximum Cable Run**: Maximum certified distance is **100 meters (330 feet)**.

---

## 4. Master / Slave Clock Synchronization

In digital audio networking, **exactly one device can serve as the Clock Master**. All other devices must operate as Clock Slaves.

| Device | Connection | Synchronization setting | Clock role |
|---|---|---|---|
| **FOH console** | Feeds the stagebox and the monitor console | **Internal**, 48 kHz | **Master** |
| **Monitor console** | AES50 A from the FOH console | **AES50 A** | Slave |
| **Stagebox (S32 / DL32)** | AES50 from the FOH console | Automatic (follows the incoming AES50 stream) | Slave |

### How to Configure Clocking:
1. **Front of House (Master Console)**:
   - Navigate to **SETUP → CONFIG**.
   - Set **Sample Rate** to `48 kHz` (or `44.1 kHz`).
   - Set **Synchronization** to **INTERNAL**. (A green icon appears next to Internal).
2. **Secondary / Monitor Console (Slave)**:
   - Navigate to **SETUP → CONFIG**.
   - Set **Synchronization** to **AES50 A** (or **AES50 B**, matching the cable connection).
   - Verify that the green `AES50` lock indicator illuminates solidly on the top status bar.

---

## 5. Cascading Multiple Stageboxes

You can chain two 16-channel stageboxes (e.g., two Behringer S16s or Midas DL16s) to create a 32-input / 16-output digital snake over a single run of cable back to the console:

| Device | Port A | Port B | Mode switch | Channels |
|---|---|---|---|---|
| **Console** | → Stagebox 1 (Port A) | — | — | — |
| **Stagebox 1 (S16 #1)** | ← Console | → Stagebox 2 (Port A) | Standard | Inputs 1–16, outputs 1–8 |
| **Stagebox 2 (S16 #2)** | ← Stagebox 1 (Port B) | — | **+8** | Inputs 17–32, outputs 9–16 |

All links use shielded Cat5e cable (a short shielded jumper between the two stageboxes).

### On the Mixing Console:
- Navigate to **ROUTING → HOME**:
  - `Inputs 1-8`   = **AES50 A 1-8** (Stagebox 1)
  - `Inputs 9-16`  = **AES50 A 9-16** (Stagebox 1)
  - `Inputs 17-24` = **AES50 A 17-24** (Stagebox 2)
  - `Inputs 25-32` = **AES50 A 25-32** (Stagebox 2)
- Navigate to **ROUTING → AES50 A OUT**:
  - `Outputs 1-8`  = **Out 1-8** (Feeds XLR Outs 1–8 on Stagebox 1)
  - `Outputs 9-16` = **Out 9-16** (Feeds XLR Outs 1–8 on Stagebox 2)

---

## 6. Multi-Console AES50 Network (FOH, Monitors & Broadcast)

Connecting Front of House, Monitor, and Broadcast desks to share stage inputs:

| Link | From | To |
|---|---|---|
| **1** | Stagebox S32 | Monitor desk, **Port A** |
| **2** | Monitor desk, **Port B** | FOH desk, **Port A** |
| **3** | FOH desk, **Port B** | Broadcast desk |

1. **Monitor Console Pass-Through Routing**:
   - The Monitor Desk receives the stagebox on **AES50 Port A**.
   - To pass the raw stage inputs along to FOH, navigate on the Monitor Desk to **Routing → AES50 B Out**.
   - Route `Outputs 1-32` directly from `AES50 A 1-32`.
   - *Result*: The FOH console receives the untouched stagebox streams transparently!
2. **Gain Sharing Protection**:
   - The Monitor Desk controls physical preamps.
   - On the FOH and Broadcast desks, navigate to **SETUP → GLOBAL** and engage **HA Gain Split**.
   - FOH and Broadcast adjust independent digital trim (-18 dB to +18 dB) without disturbing the stage monitor mix.
