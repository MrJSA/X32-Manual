# Chapter 14: Network Setup, Remote Control & Software

Remote wireless control allows audio engineers to mix from anywhere in a venue—evaluating acoustic coverage from balcony seats, front rows, and under-balcony shadows while adjusting parameters in real time. The Behringer X32 and Midas M32 feature an Ethernet remote control interface supporting dedicated software, third-party tablet apps, and Open Sound Control (OSC) automation.

This chapter details network configuration, live-venue Wi-Fi optimization, X32-Edit, Mixing Station customization, and the OSC protocol.

---

## 1. Console Network Configuration

The console connects to networks via its rear-panel 100 Mbps RJ45 Ethernet jack:

| Setting (SETUP → Network) | Example value |
|---|---|
| **DHCP** | **Off** (recommended for live shows) |
| **IP address** | 192.168.1.50 |
| **Subnet mask** | 255.255.255.0 |
| **Gateway** | 192.168.1.1 |

### Why Static IP is Essential:
While DHCP allows a router to assign an IP address automatically, **DHCP leases can expire or refresh mid-concert**, causing tablets and remote laptops to drop their connections during crucial mixing moments. Assigning a permanent, static IP address ensures uninterrupted communication.

---

## 2. Live-Venue Wi-Fi Optimization Rules

Mixing from an iPad in an empty room during afternoon soundcheck is easy; maintaining control when 800 audience members fill the hall with smartphones is an entirely different engineering challenge.

| Rule | Why |
|---|---|
| **Use 5 GHz (or 6 GHz / Wi-Fi 6) only — turn the 2.4 GHz radio off** | 2.4 GHz is crowded with audience phones, Bluetooth and wireless guitar systems, which causes dropouts |
| **Mount the router high, with line of sight** | Bodies absorb 5 GHz signals. Put the router on a stand at least 2.5–3 m (8–10 ft) above the audience's heads |
| **Use WPA2/WPA3 with a strong password** | Keeps anyone else off the mixer's network. Hiding the SSID doesn't help: phones keep probing anyway, and some tablets reconnect less reliably to hidden networks |

---

## 3. Remote Mixing Software Compared

### A. X32-Edit (Official PC / Mac / Linux Software)
A 1:1 software replica of the physical console surface:
- **Synchronization Dialog**: When connecting, X32-Edit prompts:
  - **Console → PC**: *Safe option!* Downloads the console's live state to your computer.
  - **PC → Console**: *DANGER!* Uploads the computer's current file to the console, overwriting all active settings on the mixer!
- **Offline Show Preparation**: Build complete shows, name scribble strips, set up user routing, and configure scene cues at home before arriving at the venue.

### B. Mixing Station (Cross-Platform Mobile App)
Created by developer David Schumann, **Mixing Station** (Windows, macOS, iOS, Android, Linux) is widely regarded as the premier remote mixing tool:
- **Fully Customizable Layouts**: Build high-density custom channel strips, hiding unused channels to fit 24 faders on a single tablet screen.
- **Custom Action Buttons**: Add dedicated buttons for "Mute FX", "Tap Tempo", "Solo Lead Vocal", or "Toggle VSC".
- **Floating Faders & Layers**: Pin key lead vocal and DCA faders to the edge of the screen so they remain accessible regardless of which layer you navigate.
- **Fine Fader Resolution**: Pinch-to-zoom fader travel for precision 0.1 dB level rides.

### C. Personal In-Ear Monitor Apps (M32-Q / X32-Q)
Allows band members to adjust their own monitor mixes using smartphones:
- **Bus Locking Protection**: Lock each musician's app strictly to their assigned Mix Bus (e.g., Drummer locked to Bus 3–4), preventing performers from accidentally altering Front of House faders or other band members' monitors.

---

## 4. Open Sound Control (OSC) Protocol

The X32 communicates over standard Ethernet UDP packets using the **Open Sound Control (OSC)** protocol on port **10023**.

**Port:** UDP **10023**. Addresses are hierarchical paths followed by a type tag and a value:

| Address | Type | Value | Effect |
|---|---|---|---|
| `/ch/01/mix/fader` | `,f` | `0.75` | Ch 1 fader to 0 dB |
| `/ch/01/mix/on` | `,i` | `1` | Unmutes Ch 1 |
| `/bus/01/mix/fader` | `,f` | `0.75` | Bus 1 master fader to 0 dB |
| `/main/st/mix/fader` | `,f` | `0.75` | Main LR master fader to 0 dB |
| `/ch/01/config/name` | `,s` | `"VOCAL"` | Sets the scribble strip name |

> [!IMPORTANT]
> **The `/xremote` heartbeat:** to receive live fader moves and meter updates from the console, external software must send `/xremote` at least once every 10 seconds.

This open UDP protocol allows the console to be integrated with custom automation controllers, stream decks, theater cues, and external software control panels.
