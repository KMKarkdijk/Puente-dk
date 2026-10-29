
(function(){
  "use strict";

  var P = {
    picture:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.7"/><path d="M4 16.5l4.6-4.2 3.6 3.1 3.1-2.6L20 16.5"/>',
    write:'<path d="M4 20l1-4L16.2 4.8a2 2 0 0 1 2.8 2.8L8 19l-4 1z"/><path d="M14.5 6.8l2.7 2.7"/>',
    micbig:'<rect x="9.5" y="2.5" width="5" height="10" rx="2.5"/><path d="M6.5 11a5.5 5.5 0 0 0 11 0"/><path d="M12 16.5V20M9 20.5h6"/><path d="M3.6 8.6a8 8 0 0 0 0 4.8M20.4 8.6a8 8 0 0 1 0 4.8"/>',
    mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0"/><path d="M12 18v3M9 21h6"/>',
    speaker:'<path d="M11 7L7.5 10H4.5v4h3L11 17z"/><path d="M14.6 10a3.4 3.4 0 0 1 0 4M17.4 7.8a7 7 0 0 1 0 8.4"/>',
    play:'<path d="M8 5.2l11 6.8-11 6.8z"/>',
    patient:'<circle cx="10" cy="4.6" r="2.3"/><path d="M10 7.6c-2.1 0-3.5 1.3-3.7 3.3L5.9 14.6h2.2l.5 6.1"/><path d="M11.7 20.7l.5-6.1h1.9l-.8-4.4"/><path d="M17.6 9.2v11.5M16.3 9.2h2.6"/>',
    volunteer:'<circle cx="7.3" cy="5.8" r="2.4"/><path d="M3.8 20.5v-5.6c0-1.9 1.6-3.4 3.5-3.4s3.5 1.5 3.5 3.4v5.6"/><circle cx="17.4" cy="7.6" r="2.1"/><path d="M14.3 20.5v-4.9c0-1.7 1.4-3 3.1-3s3.1 1.3 3.1 3v4.9"/><path d="M11.4 12.6h2.3"/>',
    /* travel — traffic-light pedestrian, bicycle, bus, metro M, car, driven, blocked door */
    walk:'<rect x="9.7" y="1.5" width="4" height="4.3" rx=".8" fill="currentColor" stroke="none"/><g stroke-width="2.7" stroke-linecap="butt"><path d="M11.8 7.2V13"/><path d="M11.8 8.2L7.6 12.4M11.8 8.2l4.6 3.2"/><path d="M11.8 13L7.2 21.4M11.8 13l3.8 4.2 1.8 4.2"/></g>',
    arr:'<path d="M4 12h15M13.5 6l6 6-6 6"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6.5V12l3.8 2.3"/>',
    nav:'<path d="M20.5 3.5L3.8 10.8l7 2.4 2.4 7z"/>',
    givetime:'<g transform="translate(-.5 3) scale(.75)" stroke-width="2.4"><circle cx="10" cy="4.6" r="2.3"/><path d="M10 7.6c-2.1 0-3.5 1.3-3.7 3.3L5.9 14.6h2.2l.5 6.1"/><path d="M11.7 20.7l.5-6.1h1.9l-.8-4.4"/><path d="M17.6 9.2v11.5M16.3 9.2h2.6"/></g><path d="M15 6.5h7M15 20.5h7"/><path d="M15.8 6.5c0 3.2 3.2 3.9 3.2 7s-3.2 3.8-3.2 7M21.2 6.5c0 3.2-3.2 3.9-3.2 7s3.2 3.8 3.2 7"/>',
    bike:'<circle cx="5.6" cy="16.4" r="3.6"/><circle cx="18.4" cy="16.4" r="3.6"/><path d="M5.6 16.4l4.1-7h4.4l4.3 7"/><path d="M9.3 9.4h6.1"/><path d="M12.6 16.4l1.5-7"/><path d="M8.2 8h2.6"/>',
    /* Tall body, a row of three windows, two wheels. The row of windows is what
       separates a bus from a van at a glance. */
    bus:'<rect x="1.6" y="4.2" width="20.8" height="12.6" rx="2.2"/><rect x="3.4" y="6.4" width="4.2" height="4.2" rx=".7"/><rect x="9.9" y="6.4" width="4.2" height="4.2" rx=".7"/><rect x="16.4" y="6.4" width="4.2" height="4.2" rx=".7"/><circle cx="6.4" cy="18.6" r="2.2"/><circle cx="17.6" cy="18.6" r="2.2"/>',
    metro:'<rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3.4"/><path d="M8 16.4V8l4 5.2L16 8v8.4"/>',
    /* A short body with a cabin on top, two wheels. Shorter than the bus, so the
       two pictures cannot be confused. */
    car:'<path d="M6.4 11L9 6.8h6L17.6 11"/><rect x="2.6" y="11" width="18.8" height="5" rx="2"/><circle cx="7.2" cy="17.6" r="2.2"/><circle cx="16.8" cy="17.6" r="2.2"/>',
    /* A car, and somebody else standing next to it. The pair reads by contrast with
       the plain car above: a car on its own means I drive, a car with another person
       means that person drives me. */
    driven:'<path d="M4.3 11.4l1.9-3.2h4.2l1.9 3.2"/><rect x="1.3" y="11.4" width="12.8" height="4.3" rx="1.6"/><circle cx="4.6" cy="17.1" r="1.8"/><circle cx="10.8" cy="17.1" r="1.8"/><circle cx="19.2" cy="5.6" r="2.3"/><path d="M19.2 8.3v6.2M16.4 10.6h5.6M19.2 14.5l-1.9 5.6M19.2 14.5l1.9 5.6"/>',
    /* The door stays whole and readable — a frame and a handle. The "not" is a badge
       in the corner, in red, instead of a line drawn through the door itself. */
    nodoor:'<rect x="2.8" y="2.4" width="11.6" height="19.2" rx="1.4"/><circle cx="12.1" cy="12.4" r="1.15"/><circle cx="18.4" cy="17.6" r="4.6" stroke="var(--clockred)"/><path d="M15.2 14.4l6.4 6.4" stroke="var(--clockred)"/>',
    /* time of day — rays make it a real sun, the arrow gives the direction */
    morning:'<path d="M2.4 20.5h19.2"/><path d="M7.2 20.5a4.8 4.8 0 0 1 9.6 0"/><path d="M12 14.5v-2.4M7.8 16.3L6.1 14.6M16.2 16.3l1.7-1.7"/><path d="M21 19v-7M19.4 13.6L21 12l1.6 1.6"/>',
    noon:'<circle cx="12" cy="12" r="4.2"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6"/>',
    evening:'<path d="M2.4 20.5h19.2"/><path d="M7.2 20.5a4.8 4.8 0 0 1 9.6 0"/><path d="M12 14.5v-2.4M7.8 16.3L6.1 14.6M16.2 16.3l1.7-1.7"/><path d="M21 12v7M19.4 17.4L21 19l1.6-1.6"/>',
    /* length — clock faces with hands, and a red slice for the minutes */
    half:'<path d="M12 12V4.4A7.6 7.6 0 0 1 12 19.6Z" fill="var(--clockred)" fill-opacity=".8" stroke="none"/><circle cx="12" cy="12" r="7.6"/><path d="M12 5.2v1.3M12 17.5v1.3M5.2 12h1.3M17.5 12h1.3"/><path d="M12 12l1.2-4.3M12 12v6.1" stroke-width="2.1"/>',
    threeq:'<path d="M12 12V4.4A7.6 7.6 0 1 1 4.4 12Z" fill="var(--clockred)" fill-opacity=".8" stroke="none"/><circle cx="12" cy="12" r="7.6"/><path d="M12 5.2v1.3M12 17.5v1.3M5.2 12h1.3M17.5 12h1.3"/><path d="M12 12l1.7-4.1M12 12H5.9" stroke-width="2.1"/>',
    full:'<circle cx="9.6" cy="12" r="6.9" fill="var(--clockred)" fill-opacity=".8" stroke="none"/><circle cx="9.6" cy="12" r="6.9"/><path d="M9.6 6.3v1.2M9.6 16.5v1.2M3.9 12h1.2M14.1 12h1.2"/><path d="M9.6 12V7.4M9.6 12l1.9-3.2" stroke-width="2.1"/><path d="M19.6 9.3v5.4M16.9 12h5.4" stroke-width="2.1"/>',
    /* interests */
    coffee:'<path d="M5 8h12v5.5a4.5 4.5 0 0 1-4.5 4.5h-3A4.5 4.5 0 0 1 5 13.5z"/><path d="M17 9.5h1.6a2.2 2.2 0 0 1 0 4.4H17"/><path d="M4 20.5h14"/>',
    ball:'<circle cx="12" cy="12" r="8.2"/><path d="M12 7.2l3.2 2.3-1.2 3.8h-4l-1.2-3.8z"/><path d="M12 3.8v3.4M5.3 9.6l3.5 2M18.7 9.6l-3.5 2M8.1 19.6l1.9-6.3M15.9 19.6L14 13.3"/>',
    music:'<circle cx="7" cy="17.5" r="2.4"/><circle cx="17" cy="15.5" r="2.4"/><path d="M9.4 17.5V7l10-2v10.5"/><path d="M9.4 9.5l10-2"/>',
    cards:'<rect x="4" y="6.5" width="9" height="12.5" rx="1.6"/><path d="M11.5 5.2l6.2 1.7a1.6 1.6 0 0 1 1.1 2l-2.6 9.4"/><path d="M8.5 12.8l-1.4 1.4 1.4 1.4 1.4-1.4z"/>',
    plant:'<path d="M12 20v-7"/><path d="M12 13c0-3 2-5.5 5.5-6-.2 3.6-2.4 6-5.5 6z"/><path d="M12 15.5c-3 0-5-2-5.4-5 3.2.3 5 2.2 5.4 5z"/><path d="M8 20h8"/>',
    pot:'<path d="M4.5 10h15v4.5a4.5 4.5 0 0 1-4.5 4.5H9a4.5 4.5 0 0 1-4.5-4.5z"/><path d="M3 10h18"/><path d="M9 6.5c0-1 1-1.4 1-2.5M13 6.5c0-1 1-1.4 1-2.5"/>',
    paw:'<ellipse cx="7.5" cy="10" rx="1.8" ry="2.3"/><ellipse cx="12" cy="8.5" rx="1.8" ry="2.4"/><ellipse cx="16.5" cy="10" rx="1.8" ry="2.3"/><path d="M12 13c2.8 0 4.6 1.8 4.6 3.7 0 1.6-1.4 2.6-3 2.2-1.1-.3-2.1-.3-3.2 0-1.6.4-3-.6-3-2.2C7.4 14.8 9.2 13 12 13z"/>',
    /* a screen with people sitting in front of it */
    film:'<rect x="2.6" y="2.8" width="18.8" height="10.6" rx="1.4"/><path d="M4.9 5.1h14.2v6h-14.2z" fill="currentColor" fill-opacity=".18" stroke="none"/><circle cx="6.5" cy="17.2" r="1.7"/><path d="M3.4 21.6c0-1.7 1.4-2.9 3.1-2.9s3.1 1.2 3.1 2.9"/><circle cx="12" cy="16.4" r="1.8"/><path d="M8.8 21.6c0-1.8 1.4-3.1 3.2-3.1s3.2 1.3 3.2 3.1"/><circle cx="17.5" cy="17.2" r="1.7"/><path d="M14.4 21.6c0-1.7 1.4-2.9 3.1-2.9s3.1 1.2 3.1 2.9"/>',
    plus:'<path d="M12 5v14M5 12h14" stroke-width="2.2"/>',
    minus:'<path d="M5 12h14" stroke-width="2.2"/>',
    arrU:'<path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" stroke-width="2.2"/>',
    arrD:'<path d="M12 5v14M5.5 12.5L12 19l6.5-6.5" stroke-width="2.2"/>',
    arrL:'<path d="M19 12H5M11.5 5.5L5 12l6.5 6.5" stroke-width="2.2"/>',
    arrR:'<path d="M5 12h14M12.5 5.5L19 12l-6.5 6.5" stroke-width="2.2"/>',
    calendar:'<rect x="3" y="5.5" width="18" height="15" rx="2"/><path d="M3 10h18M8 3.4v4M16 3.4v4"/><path d="M7 13.4h2.4M11 13.4h2.4M15 13.4h2.4M7 17h2.4M11 17h2.4"/>',
    /* the three travel distances, drawn not written */
    rowhouses:'<path d="M1.2 20.6h21.6"/><path d="M1.4 14L5 11.1 8.6 14"/><path d="M2.2 14v6.6M7.8 14v6.6"/><rect x="4.1" y="16.8" width="1.8" height="3.8"/><path d="M8.4 14L12 11.1 15.6 14"/><path d="M9.2 14v6.6M14.8 14v6.6"/><rect x="11.1" y="16.8" width="1.8" height="3.8"/><path d="M15.4 14L19 11.1 22.6 14"/><path d="M16.2 14v6.6M21.8 14v6.6"/><rect x="18.1" y="16.8" width="1.8" height="3.8"/>',
    neigh:'<path d="M1.2 11.8h21.6M1.2 21.2h21.6"/><path d="M2 8.6l2.5-2 2.5 2"/><path d="M2.6 8.6v3.2M6.4 8.6v3.2"/><path d="M8.8 8.6l2.5-2 2.5 2"/><path d="M9.4 8.6v3.2M13.2 8.6v3.2"/><path d="M15.6 8.6l2.5-2 2.5 2"/><path d="M16.2 8.6v3.2M20 8.6v3.2"/><path d="M2 18l2.5-2 2.5 2"/><path d="M2.6 18v3.2M6.4 18v3.2"/><path d="M8.8 18l2.5-2 2.5 2"/><path d="M9.4 18v3.2M13.2 18v3.2"/><path d="M15.6 18l2.5-2 2.5 2"/><path d="M16.2 18v3.2M20 18v3.2"/>',
    skyline:'<path d="M1 21.2h22"/><path d="M2.4 21.2V10.4h4.6v10.8"/><path d="M7 21.2V5.2h4.9v16"/><path d="M11.9 21.2v-7.8h4.2v7.8"/><path d="M16.1 21.2V7.6h5.5v13.6"/><path d="M8.2 7.8h1.3M9.9 7.8h.9M8.2 10.6h1.3M9.9 10.6h.9M8.2 13.4h1.3M9.9 13.4h.9M8.2 16.2h1.3M9.9 16.2h.9"/><path d="M17.3 10.2h1.3M19 10.2h1.2M17.3 13.2h1.3M19 13.2h1.2M17.3 16.2h1.3M19 16.2h1.2"/><path d="M3.5 13h1.1M5 13h1.1M3.5 16h1.1M5 16h1.1"/><path d="M13 16.2h1M14.3 16.2h1"/>',
    book:'<path d="M4 5.5h6a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h6V18h-6a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H4z"/><path d="M12 6.5V19"/>',
    basket:'<path d="M3.5 9.5h17l-1.8 9H5.3z"/><path d="M8.5 9.5L10 4.5M15.5 9.5L14 4.5"/><path d="M9.5 12.5v3M14.5 12.5v3"/>',
    church:'<path d="M12 3v4M10 5h4"/><path d="M6 20v-8l6-4 6 4v8"/><path d="M10 20v-4.5h4V20"/>',
    chat:'<path d="M20 13.5c0 3.3-3.6 6-8 6a10 10 0 0 1-2.6-.3L4.5 20.5l1.2-3.3C4.6 16.1 4 14.9 4 13.5c0-3.3 3.6-6 8-6s8 2.7 8 6z"/>',
    dots:'<circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/>',
    quiet:'<path d="M10 8.5L6.5 11H4v4h2.5L10 17.5z"/><path d="M14.5 10.5l4 4M18.5 10.5l-4 4"/>',
    lively:'<path d="M10 8.5L6.5 11H4v4h2.5L10 17.5z"/><path d="M13.5 10a3.6 3.6 0 0 1 0 5M16.5 7.8a7 7 0 0 1 0 8.9"/>',
    indoor:'<rect x="4" y="6" width="16" height="13" rx="1.6"/><path d="M4 10h16M9 19v-5h6v5"/>',
    outdoor:'<path d="M1.8 20.6h20.4"/><circle cx="6.2" cy="12.6" r="3.6"/><path d="M6.2 16.2v4.4"/><circle cx="12.4" cy="10.4" r="4.3"/><path d="M12.4 14.7v5.9"/><circle cx="18.6" cy="13.6" r="2.9"/><path d="M18.6 16.5v4.1"/>',
    /* requests to the other person */
    slowtalk:'<path d="M2.5 8.2C2.5 5.9 4.7 4 7.5 4s5 1.9 5 4.2-2.2 4.2-5 4.2c-.6 0-1.2-.1-1.7-.2L3.4 13.8l.6-2.4C3.1 10.7 2.5 9.5 2.5 8.2z"/><path d="M5.4 8.2h4.2"/><path d="M14.5 9h7M14.5 21h7"/><path d="M15.2 9c0 2.7 2.8 3.2 2.8 6s-2.8 3.3-2.8 6M20.8 9c0 2.7-2.8 3.2-2.8 6s2.8 3.3 2.8 6"/>',
    hourglass:'<path d="M7 4h10M7 20h10"/><path d="M7.5 4c0 4 4.5 5 4.5 8s-4.5 4-4.5 8M16.5 4c0 4-4.5 5-4.5 8s4.5 4 4.5 8"/>',
    note:'<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
    nocut:'<path d="M2.5 15c0-2.3 2.2-4 4.8-4s4.8 1.7 4.8 4-2.2 4-4.8 4c-.6 0-1.1-.1-1.6-.2L3.5 20l.6-2.1C3.1 17.2 2.5 16.2 2.5 15z"/><path d="M10.5 7.4C10.5 5 12.7 3 16 3s5.5 2 5.5 4.4-2.2 4.4-5.5 4.4c-.5 0-1-.05-1.5-.15L11.8 13l.6-2.2c-1-.8-1.9-2-1.9-3.4z"/><path d="M13 4.8l6 5.2M19 4.8l-6 5.2" stroke="var(--clockred)" stroke-width="2.2"/>',
    house:'<path d="M3.2 11.4L12 4.2l8.8 7.2"/><path d="M5.8 10.4V20h12.4v-9.6"/><path d="M10 20v-5.2h4V20"/>',
    pin:'<path d="M12 21s6.5-6.1 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 14.9 12 21 12 21z"/><circle cx="12" cy="10.4" r="2.4"/>',
    lock:'<rect x="4.5" y="10" width="15" height="10.5" rx="2"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/><circle cx="12" cy="15.2" r="1.3"/>',
    check:'<path d="M5 12.8l4.4 4.2L19 7"/>',
    cross:'<path d="M6 6l12 12M18 6L6 18"/>',
    heart:'<path d="M12 19.5s-7.2-4.3-7.2-9A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.2 2.3c0 4.7-7.2 9-7.2 9z"/>',
    pause:'<rect x="7.5" y="5.5" width="3.5" height="13" rx="1"/><rect x="13" y="5.5" width="3.5" height="13" rx="1"/>',
    chain:'<path d="M9.5 14.5l5-5"/><path d="M11 7.5l1.6-1.6a3.6 3.6 0 0 1 5 5L16 12.5"/><path d="M13 16.5l-1.6 1.6a3.6 3.6 0 0 1-5-5L8 11.5"/>',
    back:'<path d="M19 12H5M11 6l-6 6 6 6"/>'
  };
  function ico(n,s){ s=s||26;
    return '<svg class="ico" width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" '+
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[n]||'')+'</svg>'; }

  var INTERESTS = [
    ['Walking','walk'],['Coffee','coffee'],['Football','ball'],['Music','music'],
    ['Cards and dominoes','cards'],['Gardening','plant'],['Cooking','pot'],['Animals','paw'],
    ['Cinema','film'],['Reading','book'],['Markets','basket'],['Church','church'],
    ['Just talking','chat'],['Something else','plus']
  ];
  /* ---- the only place the travel numbers are written ----
     Change a number here and both the question and the matching rule follow. */
  var RADIUS_KM = {
    'I stay at home':    0,
    'My street':         0.3,
    'My neighbourhood':  2,
    'Across Madrid':     15,
    'No travel':         0    /* set when someone cannot go out alone */
  };
  /* The order here is the order of the circles, from the house outwards. */
  var BANDS = [
    ['I stay at home',   'no distance', 'the visit comes to you'],
    ['My street',        'about 300 m',  'a few minutes on foot'],
    ['My neighbourhood', 'up to 2 km',   'about 20 to 30 minutes on foot'],
    ['Across Madrid',    'up to 15 km',  'by bus or metro']
  ];
  /* Example streets with fixed coordinates. A published page cannot call a map
     service, so the list is small and the points are written in. */
  var STREETS = [
    { s:'Calle de Fuencarral',                area:'Chamberí',          lat:40.4295, lon:-3.7015 },
    { s:'Calle de Bravo Murillo',             area:'Chamberí',          lat:40.4400, lon:-3.7040 },
    { s:'Calle de Embajadores',               area:'Lavapiés',          lat:40.4055, lon:-3.7020 },
    { s:'Paseo de Santa María de la Cabeza',  area:'Arganzuela',        lat:40.3985, lon:-3.6995 },
    { s:'Calle de Alcalá, east end',          area:'Ciudad Lineal',     lat:40.4280, lon:-3.6480 },
    { s:'Calle de Arturo Soria',              area:'Ciudad Lineal',     lat:40.4680, lon:-3.6420 },
    { s:'Paseo de Extremadura',               area:'Latina',            lat:40.3990, lon:-3.7420 },
    { s:'Calle de Marcelo Usera',             area:'Usera',             lat:40.3835, lon:-3.7055 },
    { s:'Avenida de la Albufera',             area:'Puente de Vallecas',lat:40.3880, lon:-3.6620 },
    { s:'Calle Real de Pinto',                area:'Pinto',             lat:40.2420, lon:-3.6985, out:true }
  ];
  /* ---- the map ----
     A published page cannot call a map service, so the map is drawn by hand and the
     points are projected from the coordinates above. Pinto lies outside the city, so
     it sits in a separate band under the map instead of stretching it.               */
  var MAP = { w:300, h:340, lon0:-3.800, lon1:-3.580, lat0:40.330, lat1:40.520 };
  MAP.H = MAP.h;
  MAP.perKm = 16.1;                      /* drawing units per kilometre, both axes */
  function mapXY(t){
    return { x:(t.lon - MAP.lon0)/(MAP.lon1 - MAP.lon0) * MAP.w,
             y:(MAP.lat1 - t.lat)/(MAP.lat1 - MAP.lat0) * MAP.h };
  }
  function mapLatLon(x, y){              /* the other way round: a tap becomes a place */
    return { lon:MAP.lon0 + x/MAP.w*(MAP.lon1 - MAP.lon0),
             lat:MAP.lat1 - y/MAP.h*(MAP.lat1 - MAP.lat0) };
  }
  /* Every line on the map is drawn from real coordinates, so the distances the
     matching rule measures are the distances the map shows. It is still a
     schematic: the courses are simplified and there are no district borders,
     because inventing those would look more exact than it is. */
  var GEO = {
    river: [[40.520,-3.7340],[40.4700,-3.7300],[40.4400,-3.7310],[40.4200,-3.7210],
            [40.4000,-3.7060],[40.3800,-3.6930],[40.3600,-3.6870],[40.3300,-3.6830]],
    m30:   [[40.4730,-3.6960],[40.4650,-3.6690],[40.4400,-3.6600],[40.4100,-3.6680],
            [40.3900,-3.6880],[40.3950,-3.7080],[40.4200,-3.7220],[40.4550,-3.7140]],
    m40:   [[40.5120,-3.6900],[40.4900,-3.6180],[40.4400,-3.5880],[40.3800,-3.6150],
            [40.3480,-3.6880],[40.3600,-3.7480],[40.4100,-3.7880],[40.4800,-3.7800]],
    roads: [
      [[40.4196,-3.6931],[40.4463,-3.6926],[40.4669,-3.6893],[40.4900,-3.6820]],   /* Castellana */
      [[40.4169,-3.7035],[40.4196,-3.6931],[40.4300,-3.6650],[40.4280,-3.6480]],   /* Alcalá */
      [[40.4237,-3.7122],[40.4199,-3.6996]],                                       /* Gran Vía */
      [[40.4669,-3.6893],[40.5100,-3.6700]],                                       /* A-1 */
      [[40.4380,-3.6760],[40.4520,-3.6300],[40.4650,-3.5900]],                     /* A-2 */
      [[40.4020,-3.6720],[40.3950,-3.6200],[40.3900,-3.5900]],                     /* A-3 */
      [[40.3950,-3.6880],[40.3700,-3.6800],[40.3400,-3.6780]],                     /* A-4 */
      [[40.4080,-3.7250],[40.3990,-3.7700],[40.3950,-3.8000]],                     /* A-5 */
      [[40.4400,-3.7250],[40.4700,-3.7700],[40.4900,-3.7950]],                     /* A-6 */
      [[40.3900,-3.7050],[40.3650,-3.7300],[40.3400,-3.7500]]                      /* A-42 */
    ],
    parks: [
      [40.445,-3.775,40.395,-3.725],  [40.4255,-3.690,40.4085,-3.676],
      [40.520,-3.800,40.490,-3.730],  [40.443,-3.730,40.428,-3.720],
      [40.472,-3.620,40.458,-3.600],  [40.397,-3.692,40.388,-3.676],
      [40.382,-3.714,40.374,-3.704],  [40.466,-3.725,40.457,-3.712],
      [40.375,-3.695,40.355,-3.680]
    ],
    stations: [ ['Atocha',40.4065,-3.6895], ['Chamartín',40.4722,-3.6824] ],
    /* Named streets, drawn from their real course. `big` ones appear as soon as you
       zoom in once; the rest come in at the next step. Positions are good to a block
       or so — enough to find your own street, not survey-grade. */
    streets: [
      ['Gran Vía',1,[[40.4237,-3.7122],[40.4208,-3.7050],[40.4199,-3.6996]]],
      ['Calle de Alcalá',1,[[40.4169,-3.7024],[40.4196,-3.6931],[40.4228,-3.6830],[40.4300,-3.6650],[40.4285,-3.6490]]],
      ['Paseo de la Castellana',1,[[40.4250,-3.6920],[40.4350,-3.6900],[40.4463,-3.6926],[40.4600,-3.6900],[40.4669,-3.6893]]],
      ['Paseo del Prado',1,[[40.4196,-3.6931],[40.4155,-3.6930],[40.4085,-3.6920]]],
      ['Paseo de Recoletos',1,[[40.4196,-3.6931],[40.4250,-3.6920]]],
      ['Calle Mayor',1,[[40.4169,-3.7035],[40.4155,-3.7090],[40.4150,-3.7140]]],
      ['Calle de Atocha',1,[[40.4152,-3.7030],[40.4120,-3.6980],[40.4085,-3.6920]]],
      ['Calle de Fuencarral',1,[[40.4208,-3.7016],[40.4255,-3.7015],[40.4290,-3.7010],[40.4345,-3.7030]]],
      ['Calle de Bravo Murillo',1,[[40.4345,-3.7030],[40.4420,-3.7035],[40.4470,-3.7040],[40.4600,-3.7020],[40.4700,-3.7000]]],
      ['Calle de Serrano',1,[[40.4250,-3.6900],[40.4330,-3.6875],[40.4420,-3.6855],[40.4500,-3.6840]]],
      ['Calle de Goya',1,[[40.4258,-3.6895],[40.4255,-3.6760],[40.4250,-3.6680]]],
      ['Calle de la Princesa',1,[[40.4245,-3.7130],[40.4300,-3.7160],[40.4350,-3.7190]]],
      ['Paseo de Santa María de la Cabeza',1,[[40.4050,-3.6950],[40.3985,-3.6995],[40.3920,-3.7020]]],
      ['Calle de Embajadores',1,[[40.4105,-3.7030],[40.4055,-3.7020],[40.3990,-3.7010]]],
      ['Calle de Arturo Soria',1,[[40.4350,-3.6420],[40.4500,-3.6420],[40.4680,-3.6420]]],
      ['Avenida de la Albufera',1,[[40.3980,-3.6700],[40.3900,-3.6640],[40.3840,-3.6580]]],
      ['Paseo de Extremadura',1,[[40.4080,-3.7250],[40.4030,-3.7350],[40.3990,-3.7430]]],
      ["Calle de O'Donnell",0,[[40.4218,-3.6835],[40.4218,-3.6700],[40.4215,-3.6620]]],
      ['Calle de Príncipe de Vergara',0,[[40.4210,-3.6805],[40.4330,-3.6790],[40.4460,-3.6775]]],
      ['Calle del Doctor Esquerdo',0,[[40.4050,-3.6730],[40.4200,-3.6720],[40.4330,-3.6710]]],
      ['Calle de Francisco Silvela',0,[[40.4330,-3.6710],[40.4420,-3.6720]]],
      ['Calle de Toledo',0,[[40.4145,-3.7080],[40.4100,-3.7100],[40.4060,-3.7110]]],
      ['Calle de Segovia',0,[[40.4150,-3.7120],[40.4140,-3.7180],[40.4135,-3.7230]]],
      ['Calle de Génova',0,[[40.4250,-3.6940],[40.4268,-3.6975]]],
      ['Calle de Sagasta',0,[[40.4268,-3.6975],[40.4288,-3.7020],[40.4300,-3.7080]]],
      ['Calle de Alberto Aguilera',0,[[40.4300,-3.7080],[40.4295,-3.7140],[40.4290,-3.7180]]],
      ['Calle de Méndez Álvaro',0,[[40.4040,-3.6880],[40.3950,-3.6830],[40.3900,-3.6800]]],
      ['Avenida de América',0,[[40.4380,-3.6760],[40.4440,-3.6650],[40.4520,-3.6300]]],
      ['Paseo de la Habana',0,[[40.4463,-3.6880],[40.4560,-3.6830],[40.4640,-3.6800]]],
      ['Calle de Marcelo Usera',0,[[40.3870,-3.7080],[40.3835,-3.7055],[40.3800,-3.7040]]],
      ['Calle de Hortaleza',0,[[40.4195,-3.6990],[40.4255,-3.6975],[40.4290,-3.6965]]],
      ['Calle de Santa Engracia',0,[[40.4300,-3.6980],[40.4390,-3.6960],[40.4460,-3.6945]]],
      ['Calle de Ferraz',0,[[40.4245,-3.7160],[40.4300,-3.7200],[40.4350,-3.7220]]],
      ['Calle de Antonio López',0,[[40.3960,-3.7050],[40.3880,-3.7020],[40.3810,-3.6990]]]
    ],
    /* squares and stations people actually navigate by */
    places: [
      ['Puerta del Sol',1,40.4169,-3.7035],   ['Plaza Mayor',1,40.4155,-3.7074],
      ['Plaza de Cibeles',1,40.4196,-3.6931], ['Plaza de Colón',1,40.4255,-3.6915],
      ['Plaza de España',1,40.4237,-3.7122],  ['Atocha',1,40.4065,-3.6895],
      ['Nuevos Ministerios',1,40.4463,-3.6926],['Plaza de Castilla',1,40.4669,-3.6893],
      ['Moncloa',1,40.4350,-3.7190],          ['Cuatro Caminos',1,40.4470,-3.7040],
      ['Plaza de Callao',0,40.4200,-3.7055],  ['Glorieta de Bilbao',0,40.4288,-3.7010],
      ['Alonso Martínez',0,40.4270,-3.6965],  ['Glorieta de Quevedo',0,40.4345,-3.7030],
      ['Plaza de Ventas',0,40.4320,-3.6630],  ['Puerta de Toledo',0,40.4060,-3.7110],
      ['Lavapiés',0,40.4090,-3.7005],         ['Chueca',0,40.4225,-3.6975],
      ['Malasaña',0,40.4265,-3.7045],         ['Plaza de Olavide',0,40.4320,-3.7020],
      ['Tirso de Molina',0,40.4130,-3.7040],  ['Puerta de Alcalá',0,40.4199,-3.6886],
      ['Príncipe Pío',0,40.4080,-3.7200],     ['Santiago Bernabéu',0,40.4531,-3.6883],
      ['Chamartín',0,40.4722,-3.6824]
    ],
    districts: [
      ['Centro',40.4155,-3.7074],      ['Arganzuela',40.3980,-3.6960],
      ['Retiro',40.4080,-3.6760],      ['Salamanca',40.4300,-3.6780],
      ['Chamartín',40.4650,-3.6800],   ['Tetuán',40.4600,-3.7000],
      ['Chamberí',40.4350,-3.7030],    ['Fuencarral',40.4900,-3.7150],
      ['Moncloa',40.4400,-3.7300],     ['Latina',40.4000,-3.7470],
      ['Carabanchel',40.3830,-3.7430], ['Usera',40.3830,-3.7060],
      ['Vallecas',40.3900,-3.6650],    ['Moratalaz',40.4070,-3.6450],
      ['Ciudad Lineal',40.4450,-3.6500],['Hortaleza',40.4750,-3.6400],
      ['Villaverde',40.3480,-3.6900],  ['Villa de Vallecas',40.3700,-3.6200],
      ['Vicálvaro',40.4000,-3.6050],   ['San Blas',40.4300,-3.6150],
      ['Barajas',40.4700,-3.5900]
    ]
  };
  /* a smooth path through projected points */
  function geoPath(pts, closed){
    var q = pts.map(function(p){ return mapXY({lat:p[0], lon:p[1]}); }), i;
    var f = function(p){ return p.x.toFixed(1)+' '+p.y.toFixed(1); };
    var mid = function(a,b){ return {x:(a.x+b.x)/2, y:(a.y+b.y)/2}; };
    if(q.length < 3) return 'M' + q.map(f).join('L');
    var d;
    if(closed){
      d = 'M' + f(mid(q[q.length-1], q[0]));
      for(i=0;i<q.length;i++) d += 'Q' + f(q[i]) + ' ' + f(mid(q[i], q[(i+1)%q.length]));
      return d + 'Z';
    }
    d = 'M' + f(q[0]);
    for(i=1;i<q.length-1;i++) d += 'Q' + f(q[i]) + ' ' + f(mid(q[i], q[i+1]));
    return d + 'L' + f(q[q.length-1]);
  }
  /* which neighbourhood a freely chosen point falls nearest to — this name, and
     never the point itself, is what the other person is shown */
  function nearestArea(pt){
    var best = 'Madrid', bd = 1e9;
    GEO.districts.forEach(function(d){
      var k = km(pt, {lat:d[1], lon:d[2]});
      if(k < bd){ bd = k; best = d[0]; }
    });
    return best;
  }
  function homePoint(){ var v = get('street'); return (v && v.lat !== undefined) ? v : null; }
  /* where the simulated voice answer puts the house */
  var DEMO_HOME = { lat:40.4295, lon:-3.7015, area:'Chamberí' };
  function streetByName(n){ for(var i=0;i<STREETS.length;i++){ if(STREETS[i].s===n) return STREETS[i]; } return null; }
  /* straight-line distance, good enough for a prototype */
  function km(a, b){
    var R = 6371, t = Math.PI/180;
    var dLa = (b.lat-a.lat)*t, dLo = (b.lon-a.lon)*t;
    var x = Math.sin(dLa/2)*Math.sin(dLa/2) +
            Math.cos(a.lat*t)*Math.cos(b.lat*t)*Math.sin(dLo/2)*Math.sin(dLo/2);
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
  }
  function roughly(d){
    if(d < 0.15) return 'a few steps away';
    if(d < 1) return 'about ' + (Math.round(d*10)/10*1000) + ' m';
    if(d < 10) return 'about ' + (Math.round(d*10)/10) + ' km';
    return 'about ' + Math.round(d) + ' km';
  }
  /* Spanish alphabet: Ñ sits after N */
  var LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

  var STEPS = [
    { id:'mode', kind:'single', q:'Which way do you prefer to communicate?',
      greet:'Hello.', big:true, tiles:true,
      opts:[['Pictures','picture'],['Writing','write'],['Voice','micbig']] },
    { id:'role', kind:'single', q:'Are you a volunteer, or did you have a stroke?',
      big:true, tiles:true,
      opts:[['I had a stroke','patient'],['I am a volunteer','volunteer']],
      voiceDemo:'I had a stroke' },
    { id:'name', kind:'name', q:'What is your name?', sub:'First name is enough.', voiceDemo:'CARMEN' },
    { id:'street', kind:'street', q:'Where do you live?',
      sub:'Put the house on the map.', voiceDemo:'Chamberí' },
    { id:'travel', kind:'multi', q:'How would you get to a meeting?', hint:'You can choose more than one.',
      tiles:true, big:true,
      opts:[['I walk','walk'],['Bicycle','bike'],['Bus','bus'],['Metro','metro'],
            ['I drive by car','car'],['Someone drives me','driven'],['I cannot go out alone','nodoor']],
      patientOnlyOpts:['I cannot go out alone'], voiceDemo:'Metro' },
    { id:'distance', kind:'radar', q:'How far could you go for a meeting?', voiceDemo:'Across Madrid' },
    { id:'time', kind:'single', q:'What time of day could you meet someone?', tiles:true,
      opts:[['Morning','morning'],['Afternoon','noon'],['Evening','evening']], voiceDemo:'Morning' },
    { id:'days', kind:'chips', q:'Which days could you meet someone?', hint:'You can choose more than one.',
      opts:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], voiceDemo:'Tue' },
    { id:'length', kind:'multi', q:'How long should a meeting be?', hint:'You can choose more than one.',
      tiles:true,
      opts:[['30 minutes','half'],['45 minutes','threeq'],['One hour or more','full']], voiceDemo:'45 minutes' },
    { id:'interests', kind:'multi', q:'What would you like to do together?', hint:'Choose as many as you want.',
      opts:INTERESTS, tiles:true, limit:6, voiceDemo:'Coffee' },
    { id:'place', kind:'multi', q:'Where would you feel comfortable meeting?', hint:'You can choose more than one.',
      opts:[['Somewhere quiet','quiet'],['Somewhere lively','lively'],['Indoors','indoor'],['Outdoors','outdoor']],
      tiles:true, voiceDemo:'Somewhere quiet' },
    { id:'helps', kind:'multi', patientOnly:true, tiles:true,
      q:'What would you like the other person to do?',
      hint:'These are requests we send to them before you meet.',
      opts:[['Speak slowly to me','slowtalk'],['Give me time to answer','givetime'],
            ['Write key words down for me','note'],['Show me pictures','picture'],
            ['Nothing in particular','dots']],
      voiceDemo:'Give me time to answer' },
    { id:'review', kind:'review' },
    { id:'result', kind:'result' }
  ];

  var LABELS = { mode:'How you communicate', role:'Who you are', name:'Name',
    street:'Where you live', travel:'How you would travel',
    distance:'How far you can go', time:'Time of day',
    days:'Days', length:'Length of meeting', interests:'What you want to do',
    place:'Where you feel comfortable', helps:'What you ask of the other person' };

  var V = function(n,a,ar,la,lo,r,d,t,l,i,note){
    return {name:n,age:a,area:ar,lat:la,lon:lo,r:r,days:d,times:t,lens:l,interests:i,note:note}; };
  var L30=['30 minutes'], L45=['30 minutes','45 minutes'], L60=['30 minutes','45 minutes','One hour or more'];
  var VOLUNTEERS = [
    V('Ana',34,'Chamberí',40.4300,-3.7020,2,['Mon','Wed','Fri'],['Morning'],L60,['Coffee','Walking','Reading'],'Works in a bookshop. First time volunteering.'),
    V('Miguel',67,'Chamberí',40.4315,-3.6995,15,['Tue','Thu'],['Morning','Afternoon'],L60,['Football','Cards and dominoes','Coffee'],'Retired teacher. Two years with a stroke support group.'),
    V('Marta',52,'Chamberí',40.4380,-3.7050,0.3,['Tue','Wed','Thu'],['Morning'],L45,['Church','Cooking','Just talking'],'Cared for her father after his stroke. Does not leave her own street.'),
    V('Beatriz',59,'Chamberí',40.4290,-3.7030,2,['Tue','Thu'],['Morning'],L45,['Church','Reading','Just talking'],'Her husband had a stroke four years ago.'),
    V('Inés',70,'Chamberí',40.4350,-3.7010,2,['Mon','Tue','Wed','Thu','Fri'],['Morning'],L45,['Cards and dominoes','Coffee','Just talking'],'Had a stroke herself six years ago. Volunteers as a peer.'),
    V('Peter',36,'Chamberí',40.4270,-3.7000,15,['Mon','Tue'],['Morning'],L45,['Reading','Coffee','Cinema'],'Moved from Ireland. Speaks English only.'),
    V('Lucía',29,'Arganzuela',40.3990,-3.6990,15,['Sat','Sun'],['Afternoon'],L45,['Animals','Walking','Markets'],'Physiotherapy student. Trained in supported conversation.'),
    V('Sofía',27,'Arganzuela',40.4020,-3.6960,15,['Tue','Thu'],['Afternoon'],L45,['Reading','Music','Just talking'],'Speech therapy student on placement in a rehabilitation unit.'),
    V('Jorge',63,'Latina',40.4000,-3.7400,15,['Tue','Thu','Sat'],['Morning'],L60,['Cinema','Markets','Walking'],'Retired civil servant.'),
    V('Paco',58,'Latina',40.3980,-3.7430,15,['Mon','Tue','Wed','Thu','Fri'],['Evening'],L45,['Music','Cinema','Just talking'],'Office job. Free after work.'),
    V('Rocío',41,'Usera',40.3835,-3.7055,2,['Wed','Sat'],['Morning'],L30,['Cooking','Gardening','Just talking'],'Nurse on shifts. Experience with stroke patients on a ward.'),
    V('Carmen R.',61,'Moratalaz',40.4080,-3.6480,2,['Mon','Wed'],['Afternoon'],L60,['Gardening','Markets','Animals'],'Shop assistant.'),
    V('Nadia',38,'Tetuán',40.4580,-3.7000,15,['Fri','Sat','Sun'],['Afternoon'],L45,['Cooking','Animals','Music'],'Runs a small café. Speaks Spanish and Arabic.'),
    V('Tomás',55,'Carabanchel',40.3900,-3.7450,2,['Mon','Tue','Wed'],['Afternoon'],L30,['Football','Cards and dominoes','Coffee'],'Works nights. Short visits only.'),
    V('Elena P.',47,'Hortaleza',40.4700,-3.6420,15,['Wed','Thu'],['Morning'],L60,['Walking','Gardening','Reading'],'Teacher. Volunteers with an association for older people.'),
    V('Raúl',31,'Ciudad Lineal',40.4280,-3.6480,2,['Sun'],['Afternoon'],L60,['Music','Football','Just talking'],'Works six days a week. Lives at the south end of Ciudad Lineal.'),
    V('Hugo',25,'San Blas',40.4290,-3.6150,15,['Mon','Wed','Fri'],['Evening'],L45,['Cinema','Animals','Music'],'Barista.'),
    V('Diego',23,'Villaverde',40.3480,-3.6900,15,['Thu','Fri'],['Evening'],L60,['Football','Music','Cinema'],'University student.'),
    V('Álvaro',45,'Pinto',40.2420,-3.6985,15,['Sat'],['Morning'],L60,['Walking','Football'],'Self-employed. Lives outside Madrid.'),
    V('Pilar M.',68,'Villa de Vallecas',40.3700,-3.6200,2,['Mon','Thu'],['Morning'],L60,['Gardening','Cooking','Markets'],'Retired. One bus an hour into the centre.')
  ];
  var PATIENTS = [
    { name:'Carmen',age:71,area:'Chamberí',lat:40.4305,lon:-3.7010,r:2,days:['Tue','Thu'],times:['Morning'],lens:L45,
      interests:['Coffee','Reading','Just talking'],note:'Stroke two years ago. Understands everything; speaks in short phrases.',
      helps:['Give me time to answer','Speak slowly to me'] },
    { name:'Joaquín',age:80,area:'Chamberí',lat:40.4330,lon:-3.7040,r:0.3,days:['Mon','Wed','Fri'],times:['Morning'],lens:L60,
      interests:['Football','Just talking','Coffee'],note:'Stopped driving last year. Does not go beyond his own street.',
      helps:['Give me time to answer','Do not finish my sentences'] },
    { name:'Mercedes',age:76,area:'Hortaleza',lat:40.4690,lon:-3.6440,r:2,days:['Tue','Wed','Thu'],times:['Morning'],lens:L45,
      interests:['Markets','Cooking','Just talking'],note:'Hearing loss as well as aphasia. Prefers quiet places.',
      helps:['Speak slowly to me','Give me time to answer'] },
    { name:'Pilar',age:66,area:'Arganzuela',lat:40.3995,lon:-3.6985,r:2,days:['Sat','Sun'],times:['Afternoon'],lens:L45,
      interests:['Walking','Animals','Markets'],note:'Walks with a stick.',
      helps:['Show me pictures','Speak slowly to me'] },
    { name:'Vicente',age:69,area:'Latina',lat:40.3995,lon:-3.7410,r:15,days:['Tue','Thu','Fri'],times:['Evening'],lens:L45,
      interests:['Music','Cinema','Just talking'],note:'Lives alone. Dislikes the telephone.',
      helps:['Write key words down for me','Give me time to answer'] },
    { name:'Tomás',age:74,area:'Carabanchel',lat:40.3905,lon:-3.7440,r:0,days:['Mon','Wed','Fri'],times:['Morning'],lens:L30,
      interests:['Football','Cards and dominoes','Coffee'],note:'Severe aphasia. Cannot go out alone, so a visit has to come to him.',
      helps:['Show me pictures'] },
    { name:'Nuria',age:42,area:'Chamberí',lat:40.4280,lon:-3.7030,r:15,days:['Mon','Tue','Thu'],times:['Evening'],lens:L60,
      interests:['Walking','Music','Reading'],note:'Young survivor. Works part time.',
      helps:['Give me time to answer'] },
    { name:'Rosa',age:73,area:'Ciudad Lineal',lat:40.4680,lon:-3.6420,r:2,days:['Mon','Wed'],times:['Afternoon'],lens:L45,
      interests:['Reading','Church','Just talking'],note:'Lives at the north end of Ciudad Lineal. Low mood since the stroke.',
      helps:['Give me time to answer'] }
  ];
  var AREA = 'Chamberí';

  /* interests: all fourteen are shown from the start, so showAll begins open */
  function freshState(){ return { i:0, a:{}, showAll:{interests:true}, rec:null, heard:null,
    pageSay:'', mapView:null }; }
  var state = freshState();
  var view = document.getElementById('view');
  var sheet = document.getElementById('sheet');

  function role(){ return state.a.role === 'I am a volunteer' ? 'volunteer' : 'patient'; }
  function isVoice(){ return state.a.mode === 'Voice'; }
  function isPics(){ return state.a.mode !== 'Writing'; }
  function active(){ return STEPS.filter(function(s){ return !(s.patientOnly && role()==='volunteer'); }); }
  function step(){ return active()[state.i]; }
  function isQ(s){ return ['single','multi','chips','name','street','radar'].indexOf(s.kind)>=0; }
  function qIndex(){ var L=active(),n=0; for(var k=0;k<state.i;k++){ if(isQ(L[k])) n++; } return n+1; }
  function totalQ(){ return active().filter(isQ).length; }
  function set(id,v){ state.a[id]=v; }
  function get(id){ return state.a[id]; }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]; }); }
  function optsFor(s){
    if(!s.opts) return [];
    if(s.patientOnlyOpts && role()==='volunteer')
      return s.opts.filter(function(o){ return s.patientOnlyOpts.indexOf(o[0])<0; });
    return s.opts;
  }

  /* ---------- speech ---------- */
  var VOICES = [], SS = null;
  try{ if('speechSynthesis' in window){ SS = window.speechSynthesis; } }catch(e){ SS = null; }
  function loadVoices(){ try{ VOICES = (SS && SS.getVoices()) || []; }catch(e){ VOICES = []; } }
  if(SS){ loadVoices(); try{ SS.addEventListener('voiceschanged', loadVoices); }catch(e){ SS.onvoiceschanged = loadVoices; } }
  function pickVoice(){
    if(!VOICES.length) return null;
    var en = VOICES.filter(function(v){ return /^en/i.test(v.lang||''); });
    var local = en.filter(function(v){ return v.localService; });
    return local[0] || en[0] || VOICES[0] || null;
  }
  function sayState(kind, text){
    var o = document.getElementById('sayout'); if(!o) return;
    if(kind==='speaking'){ o.innerHTML = '<p class="saying">'+ico('speaker',20)+' Speaking…</p>'; return; }
    if(kind==='done'){ o.innerHTML = ''; return; }
    o.innerHTML = '<div class="sayout"><p class="kicker">This browser would not play the audio</p>' +
      '<p class="big">'+esc(text)+'</p></div>';
  }
  function sayNow(text){
    if(!SS){ sayState('fail', text); return; }
    var started = false;
    try{
      SS.cancel();
      var u = new SpeechSynthesisUtterance(text), v = pickVoice();
      if(v){ u.voice = v; u.lang = v.lang; } else { u.lang = 'en-GB'; }
      u.rate = 0.85;
      u.onstart = function(){ started = true; sayState('speaking'); };
      u.onend = function(){ sayState('done'); };
      u.onerror = function(){ started ? sayState('done') : sayState('fail', text); };
      SS.speak(u); try{ SS.resume(); }catch(e){}
      setTimeout(function(){
        var live=false; try{ live = SS.speaking || SS.pending; }catch(e){}
        if(!started && !live) sayState('fail', text);
      }, 1400);
    }catch(e){ sayState('fail', text); }
  }
  function spoken(s){
    var t = s.q + '. ';
    if(s.sub) t += s.sub + ' ';
    if(s.kind==='name') t += 'Choose the letters of your first name.';
    else if(s.kind==='radar') t += 'You can choose: ' +
      BANDS.map(function(b){ return b[0] + ', ' + b[1] + ', ' + b[2]; }).join('. ') + '.';
    else if(s.kind==='street') t += 'Tap the map to put your house where you live. ' +
      'You can then drag the house. The point is only used to measure distance. ' +
      'The other person is never shown it, only your neighbourhood.';
    else if(s.opts) t += 'You can choose: ' + optsFor(s).map(function(o){ return Array.isArray(o)?o[0]:o; }).join(', ') + '.';
    return t;
  }
  function listenBtn(kind){
    if(state.a.mode === 'Writing') return '';
    return '<div class="voicebar"><button class="vbtn alt" type="button" data-say="'+kind+'">' +
      ico('speaker',24)+' Listen to this page</button></div><div id="sayout"></div>';
  }

  /* ---------- render ---------- */
  function render(){
    var s = step(), q = isQ(s);
    document.getElementById('steps').textContent = q ? ('Question '+qIndex()+' of '+totalQ()) : '';
    document.getElementById('bar').style.width = (q ? (qIndex()-1)/totalQ()*100 : 100)+'%';
    if(s.kind==='review') return renderReview();
    if(s.kind==='result') return renderResult();
    renderQ(s);
  }

  function voiceBar(s){
    if(state.a.mode === 'Writing') return '';
    if(!isVoice()){
      return '<div class="voicebar"><button class="vbtn alt" type="button" data-say="q">' +
        ico('speaker',24)+' Listen to the question</button></div><div id="sayout"></div>';
    }
    if(state.rec==='on'){
      return '<div class="voicebar"><button class="vbtn" type="button" data-rec="stop" aria-pressed="true">' +
        '<span class="levels"><i></i><i></i><i></i><i></i><i></i></span> Listening… tap to stop</button></div>';
    }
    if(state.heard){
      return '<div class="heard"><p class="kicker">This is what I heard <span class="sim">simulated</span></p>' +
        '<p class="what">“'+esc(state.heard)+'”</p><div class="voicebar" style="margin:0">' +
        '<button class="vbtn" type="button" data-heard="yes">'+ico('check',22)+' Yes, that is right</button>' +
        '<button class="vbtn alt" type="button" data-heard="no">'+ico('cross',22)+' No, try again</button>' +
        '</div></div>';
    }
    return '<div class="voicebar">' +
      '<button class="vbtn alt" type="button" data-say="q">'+ico('play',22)+' Play the question</button>' +
      '<button class="vbtn" type="button" data-rec="start" aria-pressed="false">'+ico('mic',22)+' Answer with your voice</button>' +
      '</div><div id="sayout"></div>';
  }

  var IL = { name:['abc','arr','patient'], street:['house','arr','pin'], travel:['house','arr','bus','arr','pin'],
    distance:['house','arr','walk','arr','pin'], time:['clock','nav'],
    days:['calendar','arr','volunteer'], length:['clock'],
    interests:['coffee','ball','music','cards','chat'], place:['quiet','lively','indoor','outdoor'],
    helps:['slowtalk','hourglass','note'] };
  function illus(s){
    var L = IL[s.id]; if(!L || !isPics()) return '';
    var h = '<div class="illus" aria-hidden="true">';
    L.forEach(function(n){
      h += n==='arr' ? '<span class="ar">'+ico('arr',24)+'</span>'
         : n==='abc' ? '<span class="it abc">ABC</span>'
         : '<span class="it">'+ico(n,34)+'</span>';
    });
    return h + '</div>';
  }
  function renderQ(s){
    var val = get(s.id), tiles = isPics() && (s.kind==='single' || s.kind==='multi');
    var html = s.greet ? '<p class="greet">'+esc(s.greet)+'</p>' : '';
    html += '<h1>'+esc(s.q)+(s.sub?'<span class="sub">'+esc(s.sub)+'</span>':'')+'</h1>';
    if(s.hint) html += '<p class="hint">'+esc(s.hint)+'</p>';
    html += illus(s);
    html += voiceBar(s);

    if(s.kind==='name'){
      if(isPics()){
        var typed = val || '';
        html += '<div class="namebox" id="nameshow">' +
          (typed ? esc(typed) : '<span class="ph">Choose the letters of your name</span>') + '</div>';
        html += '<div class="keys">';
        LETTERS.forEach(function(L){ html += '<button class="key" type="button" data-key="'+L+'">'+L+'</button>'; });
        html += '<button class="key wide" type="button" data-key="_">space</button>';
        html += '<button class="key wide" type="button" data-key="<">delete</button>';
        html += '</div>';
      } else {
        html += '<div class="opts"><input id="nameField" class="field" type="text" value="'+esc(val||'')+'" ' +
                'autocomplete="given-name" placeholder="Your name"></div>';
      }
    } else if(s.kind==='street'){
      html += '<div class="privacy">'+ico('lock',26)+'<span><strong>The spot you choose is only used to measure distance.</strong> ' +
        'The other person never sees it. They are told your neighbourhood and roughly how far away you live.</span></div>';
      html += mapHtml();
    } else if(s.kind==='radar'){
      if(isPics()){
        html += radarHtml(val);
      } else {
        html += '<div class="opts">';
        BANDS.forEach(function(b){
          html += '<button class="opt" type="button" data-pick="'+esc(b[0])+'" aria-pressed="'+(val===b[0])+'">' +
            (isPics()? ico('pin',28) : '') +
            '<span>'+esc(b[0])+' — '+esc(b[1])+'<span class="two">'+esc(b[2])+'</span></span>' +
            ico('check',22).replace('class="ico"','class="ico tick"') + '</button>';
        });
        html += '</div>';
      }
    } else if(s.kind==='chips'){
      /* Each card says the same thing three ways: a colour, the whole word, and a
         strip of the week with that day filled in. The weekend shares one colour
         and carries a sun, because those are the two days that are not work. */
      var FULL = { Mon:'Monday', Tue:'Tuesday', Wed:'Wednesday', Thu:'Thursday',
                   Fri:'Friday', Sat:'Saturday', Sun:'Sunday' };
      html += '<p class="daylead">'+ico('calendar',46)+'</p>';
      html += '<div class="daycards">';
      s.opts.forEach(function(o,n){
        var on = (val||[]).indexOf(o)>=0, wk = (o==='Sat' || o==='Sun'), strip = '';
        s.opts.forEach(function(d,j){
          strip += '<s class="'+(j===n?'me ':'')+(j===5?'gap':'')+'"></s>';
        });
        html += '<button class="daycard" type="button" data-pick="'+esc(o)+'" aria-pressed="'+on+'"' +
          ' aria-label="'+FULL[o]+'" style="--dc:var(--d-'+(wk?'weekend':o.toLowerCase())+')">' +
          '<span class="cap">' + (wk ? ico('noon',16) : '') +
          ico('check',16).replace('class="ico"','class="ico tk"') + '</span>' +
          '<b>'+FULL[o]+'</b><span class="week">'+strip+'</span></button>';
      });
      html += '</div>';
    } else {
      var opts = optsFor(s), cut = false;
      if(s.limit && !state.showAll[s.id] && opts.length>s.limit){ opts = opts.slice(0,s.limit); cut = true; }
      html += '<div class="opts'+(tiles?' tiles':'')+(tiles&&s.big?' big':'')+'">';
      opts.forEach(function(o){
        var on = s.kind==='multi' ? (val||[]).indexOf(o[0])>=0 : val===o[0];
        html += '<button class="opt" type="button" data-pick="'+esc(o[0])+'" aria-pressed="'+on+'">' +
          (isPics() ? ico(o[1], tiles?(s.big?68:46):26) : '') + '<span>'+esc(o[0])+'</span>' +
          ico('check',22).replace('class="ico"','class="ico tick"') + '</button>';
      });
      html += '</div>';
      if(cut) html += '<button class="more" type="button" data-more="'+esc(s.id)+'">Show more</button>';
    }

    var ready = s.kind==='name' ? true :
      (s.kind==='single'||s.kind==='radar'||s.kind==='street') ? !!val : (val||[]).length>0;
    html += '<div class="foot">' +
      (state.i>0 ? '<button class="btn ghost" type="button" data-back="1">'+ico('back',22)+'</button>' : '') +
      '<button class="btn primary" type="button" data-next="1"'+(ready?'':' disabled')+'>Continue</button>' +
      (s.kind==='name' ? '<button class="btn quiet" type="button" data-next="1">Skip</button>' : '') +
      '</div>';
    view.innerHTML = html; bind();
    if(s.kind==='street') wireMap();
    if(s.kind==='radar' && isPics()) wireRadar();
  }

  /* ---------- map of Madrid ----------
     The page carries its own map, because a published artifact cannot call a map
     service. So the view is built here: a viewBox over the drawing, moved by the
     arrows and scaled by the plus and minus buttons. More of the real geometry is
     drawn at each step in, which is what makes zooming worth anything. */
  var ZMIN = 1, ZMAX = 16;
  var ZNAME = [[1,'The whole city'],[2,'Districts'],[4,'Neighbourhoods'],[8,'Streets'],[16,'Streets, close up']];
  function mapView(){
    if(!state.mapView) state.mapView = { z:1, cx:MAP.w/2, cy:MAP.h/2 };
    return state.mapView;
  }
  function viewBox(){
    var v = mapView(), w = MAP.w/v.z, h = MAP.h/v.z;
    return { x:Math.max(0, Math.min(MAP.w-w, v.cx - w/2)),
             y:Math.max(0, Math.min(MAP.h-h, v.cy - h/2)), w:w, h:h };
  }
  function zoomName(){
    var z = mapView().z, n = ZNAME[0][1];
    ZNAME.forEach(function(p){ if(z >= p[0]) n = p[1]; });
    return n;
  }
  /* a scale bar that always fits: 2 km when you can see the city, 100 m when you cannot */
  function scaleStep(vw){
    var want = vw*0.3/MAP.perKm, opts = [2,1,0.5,0.2,0.1,0.05], pick = opts[opts.length-1];
    for(var i=0;i<opts.length;i++){ if(opts[i] <= want){ pick = opts[i]; break; } }
    return { km:pick, units:pick*MAP.perKm,
             label:pick >= 1 ? pick+' km' : Math.round(pick*1000)+' m' };
  }
  /* Where to write a street's name: the point on it nearest the middle of what is on
     screen. A long street then keeps its name wherever you have panned to, instead of
     losing it as soon as its midpoint scrolls away. */
  function labelPoint(pts, vb){
    var cx = vb.x + vb.w/2, cy = vb.y + vb.h/2, best = null, bd = 1e9;
    var q = pts.map(function(c){ return mapXY({lat:c[0], lon:c[1]}); }), i, cand = [];
    for(i=0;i<q.length;i++){
      cand.push(q[i]);
      if(i < q.length-1) cand.push({ x:(q[i].x+q[i+1].x)/2, y:(q[i].y+q[i+1].y)/2 });
    }
    cand.forEach(function(p){
      var d = (p.x-cx)*(p.x-cx) + (p.y-cy)*(p.y-cy);
      if(d < bd){ bd = d; best = p; }
    });
    return best;
  }
  function mapSvg(){
    var vb = viewBox(), z = mapView().z, k = 1/z;
    /* roads keep a constant width on screen, and thicken a little at each step in,
       the way they do on a real map */
    var w = function(n){ return (n * k * (1 + 0.3*Math.log(z)/Math.LN2)).toFixed(3); };
    var vis = function(p, pad){ pad = pad || 0;
      return p.x > vb.x-pad && p.x < vb.x+vb.w+pad && p.y > vb.y-pad && p.y < vb.y+vb.h+pad; };
    var fs = function(n){ return (n*k).toFixed(2); };
    var s = '<svg id="mapsvg" viewBox="'+vb.x.toFixed(2)+' '+vb.y.toFixed(2)+' ' +
            vb.w.toFixed(2)+' '+vb.h.toFixed(2)+'" role="img" ' +
            'aria-label="Map of Madrid, '+zoomName().toLowerCase()+'. Tap where you live.">';
    s += '<rect x="0" y="0" width="'+MAP.w+'" height="'+MAP.h+'" fill="var(--mapland)"/>';
    GEO.parks.forEach(function(b){
      var a = mapXY({lat:b[0], lon:b[1]}), c = mapXY({lat:b[2], lon:b[3]});
      s += '<rect x="'+a.x.toFixed(1)+'" y="'+a.y.toFixed(1)+'" width="'+(c.x-a.x).toFixed(1) +
           '" height="'+(c.y-a.y).toFixed(1)+'" rx="'+(5*k).toFixed(2)+'" fill="var(--mapgreen)"/>';
    });
    s += '<path d="'+geoPath(GEO.river)+'" fill="none" stroke="var(--mapwater)" ' +
         'stroke-width="'+w(6)+'" stroke-linecap="round"/>';
    /* the named streets: the main ones from the first step in, the rest from the second */
    if(z >= 2){
      [0,1].forEach(function(pass){
        s += '<g fill="none" stroke-linecap="round" stroke-linejoin="round">';
        GEO.streets.forEach(function(st){
          if(!st[1] && z < 4) return;
          var c = pass ? (st[1]?'var(--maproadmain)':'var(--maproad)') : (st[1]?'var(--mapcasemain)':'var(--mapline)');
          s += '<path d="'+geoPath(st[2])+'" stroke="'+c+'" stroke-width="'+w(pass ? (st[1]?2.4:1.6) : (st[1]?3.8:2.7))+'"/>';
        });
        s += '</g>';
      });
    }
    [0,1].forEach(function(pass){
      s += '<g fill="none" stroke="'+(pass?'var(--maproadmain)':'var(--mapcasemain)')+'" stroke-width="'+w(pass?2.2:3.6) +
           '" stroke-linecap="round" stroke-linejoin="round">';
      GEO.roads.forEach(function(r){ s += '<path d="'+geoPath(r)+'"/>'; });
      s += '</g>';
    });
    s += '<path d="'+geoPath(GEO.m40,true)+'" fill="none" stroke="var(--mapcasemain)" ' +
         'stroke-width="'+w(2)+'" stroke-dasharray="'+(5*k).toFixed(2)+' ' +
         (5*k).toFixed(2)+'" opacity=".9"/>';
    s += '<path d="'+geoPath(GEO.m30,true)+'" fill="none" stroke="var(--mapcasemain)" ' +
         'stroke-width="'+w(2.8)+'"/>';
    GEO.stations.forEach(function(st){
      var p = mapXY({lat:st[1], lon:st[2]}), r = 2.6*k;
      s += '<rect x="'+(p.x-r).toFixed(2)+'" y="'+(p.y-r).toFixed(2)+'" width="'+(r*2).toFixed(2) +
           '" height="'+(r*2).toFixed(2)+'" rx="'+k.toFixed(2)+'" fill="var(--surface)" ' +
           'stroke="currentColor" stroke-width="'+(1.2*k).toFixed(3)+'" opacity=".65"/>';
    });
    /* a dot for every square that is on screen */
    if(z >= 2){
      GEO.places.forEach(function(pl){
        if(!pl[1] && z < 4) return;
        var p = mapXY({lat:pl[2], lon:pl[3]});
        if(!vis(p, 4*k)) return;
        s += '<circle cx="'+p.x.toFixed(2)+'" cy="'+p.y.toFixed(2)+'" r="'+(1.5*k).toFixed(2) +
             '" fill="currentColor" opacity=".4"/>';
      });
    }

    /* ---- names ----
       Every name wants the same space, so they are gathered first, sorted by how
       much they help you find yourself, and then laid down one by one. A name that
       would land on top of one already placed is left out rather than printed over
       it, which is why the map stays readable as you zoom. */
    var want = [];
    function add(p, text, size, prio, op){
      if(!vis(p, 10*k)) return;
      var edge = 52*k;
      var anc = p.x > vb.x+vb.w-edge ? 'end' : (p.x < vb.x+edge ? 'start' : 'middle');
      var dx = anc==='end' ? -4*k : (anc==='start' ? 4*k : 0);
      want.push({ x:p.x+dx, y:p.y, text:text, size:size*k, prio:prio, anc:anc, op:op });
    }
    if(z >= 2) GEO.places.forEach(function(pl){
      if(!pl[1] && z < 4) return;
      var p = mapXY({lat:pl[2], lon:pl[3]});
      add({x:p.x, y:p.y - 3*k}, pl[0], 7.4, pl[1]?1:3, '.72');
    });
    if(z >= 4) GEO.streets.forEach(function(st){
      if(!st[1] && z < 8) return;
      var p = labelPoint(st[2], vb);
      add({x:p.x, y:p.y - 1.6*k}, st[0], 6.6, st[1]?2:4, '.8');
    });
    GEO.districts.forEach(function(d){
      add(mapXY({lat:d[1], lon:d[2]}), d[0], 8.4, z>=4?5:0, z>=4?'.45':'.62');
    });
    if(z < 4) add(mapXY({lat:40.4730, lon:-3.6960}), 'M-30', 7.6, 6, '.5');
    want.sort(function(a,b){ return a.prio - b.prio; });
    var taken = [];
    s += '<g font-family="inherit" fill="currentColor">';
    want.forEach(function(l){
      var w = l.text.length * l.size * 0.52, hh = l.size * 1.05;
      var x1 = l.anc==='end' ? l.x-w : (l.anc==='start' ? l.x : l.x-w/2);
      var b = { x1:x1, y1:l.y-hh, x2:x1+w, y2:l.y+hh*0.25 }, clash = false;
      for(var i=0;i<taken.length;i++){
        var q = taken[i];
        if(b.x1 < q.x2 && b.x2 > q.x1 && b.y1 < q.y2 && b.y2 > q.y1){ clash = true; break; }
      }
      if(clash) return;
      taken.push(b);
      s += '<text x="'+l.x.toFixed(2)+'" y="'+l.y.toFixed(2)+'" text-anchor="'+l.anc +
           '" font-size="'+l.size.toFixed(2)+'" opacity="'+l.op+'">'+esc(l.text)+'</text>';
    });
    s += '</g>';
    /* scale bar and north, pinned to the corner of whatever is on screen */
    var sc = scaleStep(vb.w), sx = vb.x + 14*k, sy = vb.y + vb.h - 14*k;
    s += '<g fill="none" stroke="currentColor" stroke-width="'+(1.6*k).toFixed(3)+'" opacity=".6">' +
         '<path d="M'+sx.toFixed(2)+' '+sy.toFixed(2)+'h'+sc.units.toFixed(2) +
         'M'+sx.toFixed(2)+' '+(sy-3*k).toFixed(2)+'v'+(6*k).toFixed(2) +
         'M'+(sx+sc.units).toFixed(2)+' '+(sy-3*k).toFixed(2)+'v'+(6*k).toFixed(2)+'"/></g>';
    s += '<text x="'+(sx + sc.units/2).toFixed(2)+'" y="'+(sy - 6*k).toFixed(2)+'" text-anchor="middle" ' +
         'font-family="inherit" font-size="'+fs(7.6)+'" fill="currentColor" opacity=".6">'+sc.label+'</text>';
    var nx = vb.x + vb.w - 16*k, ny = vb.y + vb.h;
    s += '<g stroke="currentColor" fill="currentColor" opacity=".5">' +
         '<path d="M'+nx.toFixed(2)+' '+(ny-12*k).toFixed(2)+'V'+(ny-26*k).toFixed(2) +
         '" stroke-width="'+(1.6*k).toFixed(3)+'" fill="none"/>' +
         '<path d="M'+(nx-3.5*k).toFixed(2)+' '+(ny-22.5*k).toFixed(2)+'l'+(3.5*k).toFixed(2)+' ' +
         (-3.5*k).toFixed(2)+' '+(3.5*k).toFixed(2)+' '+(3.5*k).toFixed(2)+'z" stroke="none"/></g>';
    s += '<text x="'+nx.toFixed(2)+'" y="'+(ny-29*k).toFixed(2)+'" text-anchor="middle" ' +
         'font-family="inherit" font-size="'+fs(7.6)+'" fill="currentColor" opacity=".6">N</text>';
    return s + '</svg>';
  }
  /* Real map: Leaflet + OpenStreetMap tiles. Same controls as before (arrows, + and -). */
  var MADRID = [40.4168, -3.7038], liveMap = null;
  function mapHtml(){
    var home = homePoint();
    var s = '<div class="map live" id="map"><div id="leaflet"></div></div>';
    s += '<div class="mapctl">' +
      '<div class="pad">' +
        '<button type="button" data-pan="up"    aria-label="Move the map up">'+ico('arrU',26)+'</button>' +
        '<button type="button" data-pan="left"  aria-label="Move the map left">'+ico('arrL',26)+'</button>' +
        '<button type="button" data-pan="right" aria-label="Move the map right">'+ico('arrR',26)+'</button>' +
        '<button type="button" data-pan="down"  aria-label="Move the map down">'+ico('arrD',26)+'</button>' +
      '</div>' +
      '<div class="zoomer">' +
        '<button type="button" data-zoom="in"  aria-label="Zoom in">'+ico('plus',30)+'</button>' +
        '<button type="button" data-zoom="out" aria-label="Zoom out">'+ico('minus',30)+'</button>' +
      '</div></div>';
    s += '<p class="zlevel"><span id="zname"></span><button class="more" type="button" id="mapreset">Whole city</button></p>';
    s += '<p class="maplabel" id="maplabel">'+(home?esc(home.area):'')+'</p>';
    s += '<p class="mapsub" id="mapsub">'+(home
      ? 'Drag the house if this is not quite right.'
      : 'Tap the map where you live. Use + to zoom in first if you want to be exact.')+'</p>';
    return s;
  }
  function wireMap(){
    var box = document.getElementById('leaflet');
    if(!box) return;
    if(typeof L === 'undefined'){
      box.innerHTML = '<p class="mapsub">The map could not load. Please check your internet connection.</p>';
      return;
    }
    if(liveMap){ try{ liveMap.remove(); }catch(err){} liveMap = null; }
    var home = homePoint(), label = document.getElementById('maplabel'), zn = document.getElementById('zname');
    var m = liveMap = L.map(box, { zoomControl:false }).setView(home ? [home.lat, home.lon] : MADRID, home ? 15 : 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19,
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors' }).addTo(m);
    var icon = L.divIcon({ className:'', html:'<div class="house-pin">'+ico('house',26)+'</div>', iconSize:[44,44], iconAnchor:[22,22] });
    var marker = null;
    function zoomText(){
      var z = m.getZoom();
      if(zn) zn.textContent = z <= 11 ? 'Whole city' : z <= 13 ? 'City' : z <= 15 ? 'Neighbourhood' : 'Street';
    }
    function commit(ll){
      var area = nearestArea({ lat:ll.lat, lon:ll.lng });
      if(label) label.textContent = area;
      set('street', { lat:ll.lat, lon:ll.lng, area:area });
      var sub = document.getElementById('mapsub');
      if(sub) sub.textContent = 'Drag the house if this is not quite right. You can zoom in with + to move it more exactly.';
      var btn = view.querySelector('[data-next]');
      if(btn) btn.disabled = false;
    }
    function put(ll){
      if(!marker){
        marker = L.marker(ll, { icon:icon, draggable:true, keyboard:true, title:'Your home. Drag it to move it.' }).addTo(m);
        marker.on('dragend', function(){ commit(marker.getLatLng()); });
      } else marker.setLatLng(ll);
    }
    if(home) put(L.latLng(home.lat, home.lon));
    m.on('click', function(e){ put(e.latlng); commit(e.latlng); });
    m.on('zoomend', zoomText); zoomText();
    setTimeout(function(){ m.invalidateSize(); }, 0);
    view.querySelectorAll('[data-pan]').forEach(function(b){
      b.addEventListener('click', function(){
        var sz = m.getSize(), d = { up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] }[b.getAttribute('data-pan')];
        m.panBy([d[0]*sz.x*0.35, d[1]*sz.y*0.35]);
      });
    });
    view.querySelectorAll('[data-zoom]').forEach(function(b){
      b.addEventListener('click', function(){ if(b.getAttribute('data-zoom') === 'in') m.zoomIn(); else m.zoomOut(); });
    });
    var r = document.getElementById('mapreset');
    if(r) r.addEventListener('click', function(){ m.setView(MADRID, 12); });
  }

  /* ---------- how far can you walk? ----------
     Three circles round the house. Each circle carries the picture of what that
     distance looks like: one row of houses, a few streets of houses, the whole
     city. The person drags the figure out to the circle that fits, so the answer
     is given as a distance, not read as a word. No text, by design. */
  var RAD = [0, 0.16, 0.31, 0.46];          /* 0 is the house itself: staying at home */
  var RING_PIC = [null, 'rowhouses', 'neigh', 'skyline'];
  var RING_ANG = [0, -90, -152, -28];       /* degrees; kept apart so nothing overlaps */
  function bandIndex(name){ for(var i=0;i<BANDS.length;i++){ if(BANDS[i][0]===name) return i; } return -1; }
  function radarHtml(val){
    var bi = bandIndex(val);
    var h = '<div class="radar" id="radar">';
    [3,2,1].forEach(function(n){
      h += '<div class="ring r'+n+(bi===n?' on':'')+'" data-ring="'+n+'"></div>';
    });
    RAD.forEach(function(r,i){
      if(!RING_PIC[i]) return;
      var a = RING_ANG[i]*Math.PI/180;
      h += '<button class="rpic'+(bi===i?' on':'')+'" type="button" data-ring="'+i+'" ' +
        'aria-label="'+esc(BANDS[i][0]+', '+BANDS[i][1])+'" ' +
        'style="left:'+(50 + r*100*Math.cos(a)).toFixed(1)+'%;top:'+(50 + r*100*Math.sin(a)).toFixed(1)+'%">' +
        ico(RING_PIC[i], 46) + '</button>';
    });
    /* the house in the middle is a choice too: I do not go out at all */
    h += '<button class="home'+(bi===0?' on':'')+'" type="button" data-ring="0" ' +
      'aria-label="'+esc(BANDS[0][0]+', '+BANDS[0][2])+'">'+ico('house',40)+'</button>';
    h += '<button class="figure" id="figure" type="button" aria-label="Drag the person away ' +
      'from the house to show how far you can go">'+ico('walk',30)+'</button>';
    h += '</div><div style="height:24px"></div>';
    return h;
  }
  function wireRadar(){
    var box = document.getElementById('radar'), fig = document.getElementById('figure');
    if(!box || !fig) return;
    var DOWN = Math.PI/2;                  /* the figure rests below the house, clear of the pictures */
    var bi = bandIndex(get('distance'));
    place(bi>0 ? RAD[bi] : 0.11, DOWN);    /* unanswered, or at home: just below the house */
    indoors(bi===0);

    function place(rf, ang){
      fig.style.left = (50 + rf*100*Math.cos(ang)) + '%';
      fig.style.top  = (50 + rf*100*Math.sin(ang)) + '%';
    }
    function highlight(i){
      box.querySelectorAll('.ring').forEach(function(r){
        r.classList.toggle('on', +r.getAttribute('data-ring') === i); });
      box.querySelectorAll('.rpic, .home').forEach(function(r){
        r.classList.toggle('on', +r.getAttribute('data-ring') === i); });
    }
    /* chosen "I stay at home": the person is indoors, so no figure stands outside */
    function indoors(on){ fig.style.display = on ? 'none' : 'flex'; }
    function nearest(rf){
      var best=0, bd=1e9;
      RAD.forEach(function(r,i){ var d=Math.abs(r-rf); if(d<bd){ bd=d; best=i; } });
      return best;
    }
    function commit(i, ang){
      set('distance', BANDS[i][0]);
      place(i===0 ? 0.11 : RAD[i], ang===undefined ? DOWN : ang);
      highlight(i); indoors(i===0);
      var btn = view.querySelector('[data-next]');
      if(btn) btn.disabled = false;
    }
    function fromEvent(e){
      var b = box.getBoundingClientRect();
      var dx = e.clientX - (b.left + b.width/2), dy = e.clientY - (b.top + b.height/2);
      var rf = Math.min(0.49, Math.sqrt(dx*dx + dy*dy) / b.width);
      return { rf:rf, ang:Math.atan2(dy, dx) };
    }
    var dragging = false;
    fig.addEventListener('pointerdown', function(e){
      dragging = true; try{ fig.setPointerCapture(e.pointerId); }catch(err){} e.preventDefault();
    });
    fig.addEventListener('pointermove', function(e){
      if(!dragging) return;
      var p = fromEvent(e); place(p.rf, p.ang); highlight(nearest(p.rf));
    });
    fig.addEventListener('pointerdown', function(){ indoors(false); });
    fig.addEventListener('pointerup', function(e){
      if(!dragging) return; dragging = false;
      var p = fromEvent(e); commit(nearest(p.rf), p.ang);
    });
    box.addEventListener('click', function(e){
      if(e.target === fig || fig.contains(e.target)) return;
      var pic = e.target.closest ? e.target.closest('.rpic, .home') : null;
      if(pic){ commit(+pic.getAttribute('data-ring')); return; }
      var p = fromEvent(e); commit(nearest(p.rf), p.ang);
    });
    fig.addEventListener('keydown', function(e){
      var cur = bandIndex(get('distance'));
      if(e.key==='ArrowRight'||e.key==='ArrowUp'){ commit(Math.min(BANDS.length-1, cur<0?0:cur+1)); e.preventDefault(); }
      if(e.key==='ArrowLeft'||e.key==='ArrowDown'){ commit(Math.max(0, cur<0?0:cur-1)); e.preventDefault(); }
    });
  }

  function answerText(id){
    var v = get(id);
    if(v===undefined||v===null||v===''||(Array.isArray(v)&&!v.length)) return 'Not answered';
    if(v.lat !== undefined) return v.area + ' (a point you chose on the map)';
    return Array.isArray(v) ? v.join(', ') : v;
  }

  function renderReview(){
    var say = ['This is what I understood. Is it right?'];
    Object.keys(LABELS).forEach(function(id){
      if(id==='helps' && role()==='volunteer') return;
      say.push(LABELS[id] + ': ' + answerText(id) + '.');
    });
    state.pageSay = say.join(' ');
    var html = '<h1>This is what I understood.<span class="sub">Is it right?</span></h1>' +
      listenBtn('page') + '<ul class="review">';
    Object.keys(LABELS).forEach(function(id){
      if(id==='helps' && role()==='volunteer') return;
      html += '<li><div class="grow"><div class="q">'+esc(LABELS[id])+'</div>' +
        '<div class="a">'+esc(answerText(id))+'</div></div>' +
        '<button class="btn quiet" type="button" data-edit="'+id+'">Change</button></li>';
    });
    html += '</ul><div class="foot"><button class="btn ghost" type="button" data-back="1">'+ico('back',22)+'</button>' +
      '<button class="btn primary" type="button" data-next="1">Yes, that is right</button></div>';
    view.innerHTML = html; bind();
  }

  function myRadius(){
    if(staysIn()) return 0;
    var b = get('distance');
    return RADIUS_KM[b] === undefined ? 0 : RADIUS_KM[b];
  }
  function staysIn(){
    return (get('travel')||[]).indexOf('I cannot go out alone') >= 0 ||
           get('distance') === 'I stay at home';
  }
  function myLimitText(){
    if(staysIn())
      return 'you told us a meeting has to come to you, so you do not travel at all';
    var b = get('distance');
    for(var i=0;i<BANDS.length;i++){ if(BANDS[i][0]===b) return 'you said you can go ' + BANDS[i][1]; }
    return 'your travel limit';
  }

  /* Two people can meet when the distance between their homes is no more than
     the sum of what each of them can travel: d(A,B) <= radius(A) + radius(B).
     Distance is filtered first, then days and time of day, and only then are the
     remaining people sorted by shared interests and by how close they live. */
  function findMatch(){
    var pool0 = role()==='patient' ? VOLUNTEERS : PATIENTS;
    var st = homePoint();
    var time = get('time'), days = get('days')||[], ints = get('interests')||[], lens = get('length')||[];
    var myR = myRadius(), noGo = staysIn();
    if(!st) return { blocked:'nostreet' };

    var near = [], closest = null;
    pool0.forEach(function(v){
      var d = km(st, v), reach = myR + v.r, rec = { v:v, d:d, reach:reach };
      if(d <= reach) near.push(rec);
      else if(!closest || (d - reach) < (closest.d - closest.reach)) closest = rec;
    });
    if(!near.length) return { blocked:'distance', nearest:closest, myR:myR, noGo:noGo };

    var free = near.filter(function(c){
      if(time && c.v.times.indexOf(time)<0) return false;
      if(days.length && !days.some(function(d){ return c.v.days.indexOf(d)>=0; })) return false;
      if(lens.length && !lens.some(function(l){ return c.v.lens.indexOf(l)>=0; })) return false;
      return true;
    });
    if(!free.length) return { blocked:'time', myR:myR, noGo:noGo };

    free.forEach(function(c){
      c.shared = ints.filter(function(i){ return c.v.interests.indexOf(i)>=0; });
    });
    free.sort(function(a,b){
      if(b.shared.length !== a.shared.length) return b.shared.length - a.shared.length;
      return a.d - b.d;
    });
    var hit = free[0];
    if(!hit.shared.length) return { blocked:'interests', myR:myR, noGo:noGo };
    return { v:hit.v, d:hit.d, myR:myR, noGo:noGo,
      day:(days.filter(function(d){ return hit.v.days.indexOf(d)>=0; })[0]),
      len:(lens.filter(function(l){ return hit.v.lens.indexOf(l)>=0; })[0]),
      shared:hit.shared[0] };
  }

  function cardLines(list){
    var h = list||[], out = [];
    if(h.indexOf('Speak slowly to me')>=0) out.push('Please speak slowly.');
    if(h.indexOf('Give me time to answer')>=0) out.push('Please give me time to answer.');
    if(h.indexOf('Write key words down for me')>=0) out.push('Please write key words down.');
    if(h.indexOf('Show me pictures')>=0) out.push('Please show me pictures.');
    if(h.indexOf('Do not finish my sentences')>=0) out.push('Please do not finish my sentences.');
    if(!out.length) out.push('Please talk to me normally. I will say if something is difficult.');
    out.push('I understand more than I can say.');
    return out;
  }

  function renderResult(){
    var m = findMatch(), me = get('name') || 'You', html = '';
    if(m.blocked){
      var why;
      if(m.blocked==='distance'){
        var n = m.nearest;
        why = 'The closest person lives ' + roughly(n.d) + ' away. ' +
          'Between you, you can cover ' + (Math.round((m.myR + n.v.r)*10)/10) + ' km, and that is not enough. ';
        why += (m.myR <= n.v.r)
          ? 'The limit is on your side: ' + myLimitText() + '.'
          : 'The limit is on their side: they can only travel ' + n.v.r + ' km from home.';
      } else {
        why = {
          'nostreet':'We do not know where you live, so we cannot check any distance.',
          'time':'People live close enough, but nobody is free on your days, at your time of day, for the length you chose.',
          'interests':'People live close enough and are free when you are, but nobody wants to do the same thing as you.'
        }[m.blocked];
      }
      state.pageSay = 'No match yet. ' + why + ' A person at the partner organisation will look for someone who can come to you, or for a group nearby. Nothing is arranged without your yes.';
      html += '<h1>No match yet.</h1>' + listenBtn('page') +
        '<div class="callout"><h2>Why</h2><p>'+esc(why)+'</p></div>' +
        '<div class="card"><h2>What happens now</h2><p>A person at the partner organisation will look for someone who can come to you, or for a group nearby. They will contact you.</p>' +
        '<p>Nothing is arranged without your yes.</p></div>' +
        '<div class="foot"><button class="btn ghost" type="button" data-back="1">'+ico('back',22)+'</button>' +
        '<button class="btn primary" type="button" data-restart="1">Start again</button></div>';
      view.innerHTML = html; bind(); return;
    }

    var other = m.v, mine = role()==='patient' ? (get('helps')||[]) : null;
    state.pageSay = 'You matched with ' + other.name + ', ' + other.age + '. Both of you said yes. ' +
      m.shared + ' together, ' + (m.day||'a day you are both free') + ', ' +
      (get('time')||'morning').toLowerCase() + ', for ' + (m.len||'45 minutes') + '. ' +
      other.name + ' lives in ' + other.area + ', ' + roughly(m.d) + ' from you. ' +
      other.note + ' ' + (role()==='patient'
        ? 'Before you meet, we will send ' + other.name + ' this: ' + cardLines(mine).join(' ')
        : other.name + ' asks you this: ' + cardLines(other.helps).join(' '));

    html += '<h1>You matched with '+esc(other.name)+'.</h1>' + listenBtn('page') +
      '<div class="pair"><span class="ava me">'+esc((me.charAt(0)||'?').toUpperCase())+'</span>' +
      ico('chain',30).replace('class="ico"','class="ico link"') +
      '<span class="ava">'+esc(other.name.charAt(0))+'</span></div>' +
      '<p class="who">'+esc(me)+' · '+esc(other.name)+', '+other.age+'<br>' +
      '<span class="badge">'+ico('check',16)+' Both of you said yes</span></p>';

    html += '<div class="callout"><p class="kicker">Your meeting</p>' +
      '<h2 style="font-family:var(--font-display);font-size:24px;font-weight:600;margin:0 0 8px">'+esc(m.shared)+' together</h2>' +
      '<p><strong>'+esc(m.day||'A day you are both free')+', '+esc((get('time')||'morning').toLowerCase())+
      ' · '+esc(m.len||'45 minutes')+'</strong></p>' +
      '<p><strong>'+esc(other.area)+' · '+esc(roughly(m.d))+' from you</strong><br>'+esc(other.note)+'</p>' +
      '<p style="color:var(--muted);font-size:15px;margin-bottom:0">We never show '+esc(other.name)+' where exactly you live, and we never show you where they live.</p></div>';

    if(m.noGo){
      html += '<div class="callout warn"><h2>You told us you cannot go out alone</h2>' +
        '<p>So the meeting has to happen at your home, or with someone who comes with you. ' +
        esc(other.name)+' can travel the whole way. The partner organisation arranges this part, not the app.</p></div>';
    }

    html += '<div class="saycard"><p class="kicker">' +
      (role()==='patient' ? 'Sent to '+esc(other.name)+' before you meet' : esc(other.name)+' asks you this') +
      '</p><h2 style="margin:0 0 4px">' +
      (role()==='patient' ? 'What I ask of you' : 'What '+esc(other.name)+' asks of you') + '</h2><ul>' +
      cardLines(role()==='patient' ? mine : other.helps).map(function(l){ return '<li>'+esc(l)+'</li>'; }).join('') +
      '</ul></div>';

    html += '<div class="card"><p class="kicker">What was checked before matching</p><ul class="checks">' +
      ['Distance between your homes: '+esc(roughly(m.d))+'. You can go '+m.myR+' km, '+esc(other.name)+' can go '+other.r+' km, so together you cover '+(Math.round((m.myR+other.r)*10)/10)+' km',
       'How you would travel: '+esc((get('travel')||['not answered']).join(', ')),
       'Days and time you are both free: '+esc((get('days')||[]).join(', ')||'not answered')+' · '+esc(get('time')||''),
       'A meeting length you both accept: '+esc(m.len||''),
       'Something you both want to do: '+esc(m.shared)
      ].map(function(t){ return '<li>'+ico('check',18)+'<span>'+t+'</span></li>'; }).join('') + '</ul></div>';

    html += '<div class="card"><p class="kicker">What this prototype does not do</p>' +
      '<p>It does not verify volunteers, arrange transport, or follow up after a meeting. Those belong to a partner organisation and to a named person there.</p>' +
      '<p>The streets here are examples with fixed coordinates: there is no map service behind them, and the straight-line distance ignores rivers, hills and bus routes. Real home addresses would need secure storage and a lawful basis to hold them, which this prototype does not have.</p></div>';

    html += '<div class="foot"><button class="btn ghost" type="button" data-back="1">'+ico('back',22)+'</button>' +
      '<button class="btn primary" type="button" data-restart="1">Start again</button></div>';
    view.innerHTML = html; bind();
  }

  /* ---------- stop sheet ---------- */
  function openSheet(){
    sheet.innerHTML = '<div class="sheet"><div class="inner" role="dialog" aria-modal="true" aria-label="Stop">' +
      '<h2>Do you want to stop?</h2>' +
      '<button class="opt" type="button" data-sheet="break">'+ico('pause')+'<span>Take a break. Come back later.</span></button>' +
      '<button class="opt" type="button" data-sheet="unwell">'+ico('heart')+'<span>I do not feel well.</span></button>' +
      '<button class="opt" type="button" data-sheet="close">'+ico('cross')+'<span>Keep going</span></button>' +
      '</div></div>';
    sheet.addEventListener('click', onSheet);
  }
  function onSheet(e){
    var b = e.target.closest('[data-sheet]'); if(!b) return;
    var k = b.getAttribute('data-sheet');
    sheet.innerHTML=''; sheet.removeEventListener('click', onSheet);
    if(k==='break'){
      view.innerHTML = '<h1>That is fine.</h1><p class="lead">Your answers are kept. Nothing has been sent to anyone.</p>' +
        '<div class="opts" style="margin-top:28px"><button class="opt" type="button" data-resume="1">'+ico('check')+'Carry on</button></div>';
      bind();
    }
    if(k==='unwell') renderSupport();
  }
  function renderSupport(){
    document.getElementById('bar').style.width='100%';
    document.getElementById('steps').textContent='';
    view.innerHTML = '<h1>Let us stop here.</h1><div class="callout warn">' +
      '<p class="lead" style="margin-bottom:12px">You do not have to answer any more questions today.</p>' +
      '<p><strong>Someone you can talk to now</strong></p>' +
      '<p>[ Partner organisation — name and phone number ]</p>' +
      '<p>[ Local health service — phone number ]</p>' +
      '<span class="todo">Wording and numbers on this screen to be written with a professional</span></div>' +
      '<div class="card"><p>This screen is a fixed rule in the system. It is not a decision the AI makes, and the questions do not continue behind it.</p></div>' +
      '<div class="foot"><button class="btn ghost" type="button" data-restart="1">Start again</button></div>';
    bind();
  }

  /* ---------- events ---------- */
  function go(n){ var L=active(); state.rec=null; state.heard=null;
    state.i = Math.max(0, Math.min(L.length-1, state.i+n)); window.scrollTo(0,0); render(); }

  function bind(){
    view.querySelectorAll('[data-pick]').forEach(function(b){
      b.addEventListener('click', function(){
        var s = step(), v = b.getAttribute('data-pick');
        if(s.kind==='single'||s.kind==='radar'||s.kind==='street'){ set(s.id,v); }
        else { var cur=get(s.id)||[], i=cur.indexOf(v); if(i>=0) cur.splice(i,1); else cur.push(v); set(s.id,cur); }
        render();
      });
    });
    view.querySelectorAll('[data-key]').forEach(function(b){
      b.addEventListener('click', function(){
        var k = b.getAttribute('data-key'), cur = get('name') || '';
        if(k==='<') cur = cur.slice(0,-1);
        else if(k==='_') cur = (cur+' ').slice(0,20);
        else cur = (cur + k).slice(0,20);
        set('name', cur);
        var box = document.getElementById('nameshow');
        if(box) box.innerHTML = cur ? esc(cur) : '<span class="ph">Choose the letters of your name</span>';
      });
    });
    var f = view.querySelector('#nameField');
    if(f) f.addEventListener('input', function(){ set('name', f.value.trim()); });
    view.querySelectorAll('[data-more]').forEach(function(b){
      b.addEventListener('click', function(){ state.showAll[b.getAttribute('data-more')]=true; render(); });
    });
    view.querySelectorAll('[data-say]').forEach(function(b){
      b.addEventListener('click', function(){
        sayNow(b.getAttribute('data-say')==='page' ? (state.pageSay||'') : spoken(step()));
      });
    });
    view.querySelectorAll('[data-rec]').forEach(function(b){
      b.addEventListener('click', function(){
        var k = b.getAttribute('data-rec'), s = step();
        if(k==='start'){
          state.rec='on'; render();
          setTimeout(function(){ if(state.rec!=='on') return;
            state.rec=null; state.heard = s.voiceDemo || 'Yes'; render(); }, 2200);
        } else { state.rec=null; render(); }
      });
    });
    view.querySelectorAll('[data-heard]').forEach(function(b){
      b.addEventListener('click', function(){
        var s = step(), yes = b.getAttribute('data-heard')==='yes', h = state.heard;
        state.heard = null;
        if(yes && h){
          if(s.kind==='name') set('name', h);
          else if(s.kind==='street') set('street', DEMO_HOME);
          else if(s.kind==='single' || s.kind==='radar') set(s.id, h);
          else { var cur=get(s.id)||[]; if(cur.indexOf(h)<0) cur.push(h); set(s.id,cur); }
        }
        render();
      });
    });
    view.querySelectorAll('[data-next]').forEach(function(b){ b.addEventListener('click', function(){ go(1); }); });
    view.querySelectorAll('[data-back]').forEach(function(b){ b.addEventListener('click', function(){ go(-1); }); });
    view.querySelectorAll('[data-edit]').forEach(function(b){
      b.addEventListener('click', function(){
        var id=b.getAttribute('data-edit'), L=active();
        for(var k=0;k<L.length;k++){ if(L[k].id===id){ state.i=k; break; } }
        state.heard=null; window.scrollTo(0,0); render();
      });
    });
    view.querySelectorAll('[data-restart]').forEach(function(b){
      b.addEventListener('click', function(){
        try{ SS && SS.cancel(); }catch(e){}
        state=freshState(); window.scrollTo(0,0); render();
      });
    });
    view.querySelectorAll('[data-resume]').forEach(function(b){ b.addEventListener('click', function(){ render(); }); });
  }

  document.getElementById('stop').addEventListener('click', openSheet);
  render();
})();
