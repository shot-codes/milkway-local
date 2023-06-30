# Milkyway

## Install and Run

```bash
pnpm i
pnpm run dev
```

## To Dos

- Bugs

  - [ ] HTML is still present when zoomed out. This results in miss-clicks and HTML needs to be removed after it has faded out.
  - [ ] Fix zoomed in scroll heights
  - [x] Pressing back button before planet zoom is complete results in the HTML sticking around.
    - This has been partially mitigated by just removing the delay on the opacity. Should re-address this together with the outright removal of the html when faded out.

- [x] Migrate from threlte v5 to threlte v6

  - [x] Revamp moon handling
    - [x] - Moon texture handling
  - [x] Fix fog
  - [x] Fix float parameters (projector and horses)
  - [x] Fix GlTF
  - [x] Stop interactivity propagation

- [ ] Chat

  - [x] Chat API vs Completions API
  - [ ] Chat API: Add previous response messages to query (maintain state in frontend)
  - [ ] Split data into smaller embeddings (Adding context to each Eg. Lactobio: Is compliant because...)
  - [ ] Interface
    - [ ] Frontend error handling
  - [ ] Gather content from website for every company
  - [ ] Enrich company data by scraping cvr-virk
  - [ ] Upgrade to Vercel Pro (This is needed to increase the timeout of serverless functions. Once we get our MF network sorted we can run everything locally, which will also speed up the response time.)

- [ ] Planets

  - [ ] Update planet structure to reflect the corporate structure (as seen below)
  - [ ] Replace HTML content with native three text and geometries (This is to address issues on safari)
  - [ ] Change images out with logos
  - [x] Revamp materials definition/loading
  - [ ] Moon materials replaced with lamina materials

- [ ] Sun

  - [ ] Replace floating projector screen with video playing warped and playing over planet
  - [ ] Add playback controls (play/pause/restart)
  - [ ] Content
    - [ ] Contact information (email address + potential mail-to)
    - [ ] Descriptive text

- [ ] Analytics

  - [ ] Total visits
  - [ ] Gateway to company sites?

- [ ] Make the ferrari an easter egg (one idea is to hide it in the chatbot)
- [ ] Slow+dampened global lighting following camera/toggles on zoom in.

## Corporate Structure

- Partner equity
  - Nordisk Innovation
- Confinze
- Zibra AS
  - Zibrasport
  - Zybersafe
  - Motus
- PeopleVentures
  - 1 planets tbd
  - PV Sentispec
  - Zoios?
- Inqvation
  - Byon8
  - Inniti
  - LT Health
  - Mxney
  - Next11
  - Onomondo
  - Passendo
  - Radiobotics
  - Saninudge
  - Son of a Tailer
  - Spiio
  - Tiimo
  - Cortrium (product as planet)
- LactoBio (maybe special treatment)
- Mindfuture (maybe special treatment)
  - Mindfuture tech
    - M2Call
  - Hub (with video)
  - Life with artificials
- Equestrian
  - Bregnerødgård
  - Quinta da Varzea
- CSR
  - Nguvu
