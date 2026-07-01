// Video catalog — edit this list to add, remove, or update uploads.
// game: "poe" (Path of Exile) or "tli" (Torchlight Infinite)
// url: the direct YouTube watch link for that video, e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"
//      Leave as "" to fall back to the channel page.
const videos = [
  {title:"Ice Lance Youga1 Deletes SS20 | 15T DPS", url:"https://youtu.be/2qDKS2ry-Xo", views:"3.5K", time:"1 month ago", dur:"15:55", game:"tli", badge:"Torchlight Infinite"},
  {title:"5T+ DPS and Freezing Everything – Ice Lance Youga1 SS12", url:"https://youtu.be/9_a7UdYkWAk", views:"2.8K", time:"1 month ago", dur:"9:19", game:"tli", badge:"Torchlight Infinite"},
  {title:"1T DPS Chromatic Shot Youga1 | Full Build Guide SS12 Lunaria", url:"https://youtu.be/HuOswOSyXTg", views:"637", time:"2 months ago", dur:"9:23", game:"tli", badge:"Torchlight Infinite"},
  {title:"Build Diary #2 – 60B DPS Achieved! Chromatic Shot Youga1 SS12 Lunaria", url:"https://youtu.be/Mu38K7-iaUo", views:"446", time:"2 months ago", dur:"11:44", game:"tli", badge:"Torchlight Infinite"},
  {title:"Build Diary #1 – Chromatic Shot Youga1 (Early Progress) SS12 Lunaria | TLI", url:"https://youtu.be/NHy8yIF72fg", views:"423", time:"2 months ago", dur:"9:23", game:"tli", badge:"Torchlight Infinite"},
  {title:"Yet another Minion Pact Blade Vortex Occultist (Poison Edition) | PoE Mirage 3.28", url:"https://youtu.be/ptg0WE5ClD4", views:"7.7K", time:"3 months ago", dur:"13:16", game:"poe", badge:"Path of Exile"},
  {title:"Creeping Frost of Floes Final Update | Cold DoT Build | PoE Mirage League 3.28", url:"https://youtu.be/lLNDJde_sNg", views:"2.5k", time:"3 months ago", dur:"10:18", game:"poe", badge:"Path of Exile"},
  {title:"Creeping Frost of Floes Update #1 | Cold DoT Progress | PoE Mirage League 3.28", url:"https://youtu.be/u0FRXIwGB1k", views:"2k", time:"3 months ago", dur:"6:06", game:"poe", badge:"Path of Exile"},
  {title:"Creeping Frost of Floes – League Start Plan (3.28) | PoE Mirage League | Cold DoT Power", url:"https://youtu.be/SiWAJzRrxHg", views:"4.6k", time:"3 months ago", dur:"7:00", game:"poe", badge:"Path of Exile"},
  {title:"Youga 1 Ice Lance 10T+ DPS | SS20 Down | S11 Vorax | Torchlight Infinite", url:"https://youtu.be/9aI3-ZapcFI", views:"2.8K", time:"4 months ago", dur:"11:59", game:"tli", badge:"Torchlight Infinite"},
  {title:"Youga1 Ice Lance 5T+ Build Guide Update | SS11 Vorax | Torchlight Infinite", url:"https://youtu.be/t6C9eSbDRSw", views:"1.3K", time:"4 months ago", dur:"15:02", game:"tli", badge:"Torchlight Infinite"},
  {title:"Youga1 Ice Lance 1T Build Guide to Profound | S11 Vorax", url:"https://youtu.be/sgYb0V3X3tY", views:"1.7K", time:"5 months ago", dur:"16:46", game:"tli", badge:"Torchlight Infinite"},
  {title:"Youga 1 Ice Lance Build Diary #2 | Traveler 8 Down | Vorax SS11", url:"https://youtu.be/4gFj9Re2Uks", views:"651", time:"5 months ago", dur:"14:10", game:"tli", badge:"Torchlight Infinite"},
  {title:"Youga1 Build Diary #1 | Ice Lance Build | T7 Down | Vorax SS11", url:"https://youtu.be/504ts6XL6iE", views:"1.3K", time:"5 months ago", dur:"9:48", game:"tli", badge:"Torchlight Infinite"},
  {title:"Bitter Instinct FIXES Retaliation Skills! Eviscerate Ignite PoE 3.27", url:"https://youtu.be/8K6CElI17gA", views:"2.5K", time:"7 months ago", dur:"14:27", game:"poe", badge:"Path of Exile"},
  {title:"Wintertide Brand Elementalist Build Diary #2 (Final Update) – PoE 3.27", url:"https://youtu.be/0WRqZ-Zwc3g", views:"1.3K", time:"7 months ago", dur:"7:23", game:"poe", badge:"Path of Exile"},
  {title:"Wintertide Brand Elementalist Diary #1 – PoE 3.27", url:"https://youtu.be/c8qANejUiFA", views:"1K", time:"7 months ago", dur:"11:28", game:"poe", badge:"Path of Exile"},
  {title:"Forbidden Rite Occultist Update & Wintertide Brand League Start | POE 3.27", url:"https://youtu.be/0QVO1tBsNZk", views:"2.4K", time:"8 months ago", dur:"16:59", game:"poe", badge:"Path of Exile"},
  {title:"Iris 2 Build Diary #5 – 2 Trillion DPS Final Update | TLI SS10 Overrealm", url:"https://youtu.be/8Wjtm22tjmo", views:"3.6K", time:"8 months ago", dur:"9:01", game:"tli", badge:"Torchlight Infinite"},
  {title:"Iris 2 Build Diary #4 – 600B DPS Blasting Profound | TLI SS10 Overrealm", url:"https://youtu.be/7AyafV9Z6iY", views:"2.7K", time:"8 months ago", dur:"15:19", game:"tli", badge:"Torchlight Infinite"},
  {title:"Iris 2 Build Diary #3 – 70B DPS Update TLI | SS10 Overrealm", url:"https://youtu.be/rVzzJ84k_uI", views:"1.6K", time:"8 months ago", dur:"10:44", game:"tli", badge:"Torchlight Infinite"},
  {title:"Iris 2 Build Diary #2 | T8 Traveler down| TLI (Overrealm)", url:"https://youtu.be/xe9E7EGK_14?si=955l6h1TmYfM1SvG", views:"2.6k", time:"8 months ago", dur:"24:31", game:"tli", badge:"Torchlight Infinite"},
  {title:"Iris 2 Build Diary #1 | T7 Traveler Defeated | Torchlight Infinite (Overrealm)", url:"https://youtu.be/8nppVpk10s4?si=j8o8RIUK4TI80_VO", views:"3.5k", time:"8 months ago", dur:"7:06", game:"tli", badge:"Torchlight Infinite"},
  {title:"Yet Another Forbidden Rite Occultist variant from the atlasverse?!?! | 90 all max res!! (Poe 3.26)", url:"https://youtu.be/RcOABgRm_T0?si=AzCWgShbTy0neNmA", views:"9.1k", time:"11 months ago", dur:"8:32", game:"poe", badge:"Path of Exile"}
];
