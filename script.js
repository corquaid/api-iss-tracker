// // Initialise map and set destination html div
let issMap = new L.map('map-container', {
  maxBounds: ([-90, -180], [90, 180]),
  maxBoundsViscosity: 1,
  // minZoom: 1
  worldCopyJump: true
}).setView([30, 0], 1.5);

issMap.addControl(new L.Control.Fullscreen({
  title: {
    'false': 'View FullScreen',
    'true': 'Exit FullScreen'
  }
}));

// // Point to map address and set attribution to be displayed on map
L.tileLayer('https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=I5jJIO0gVFZgkPhGgi1t', {
  attribution: '&copy; MapTiler &copy; OpenStreetMap contributors &copy; Jörg Dietrich &copy; WTIA REST API</a>',
  // noWrap: true
}).addTo(issMap);

// Add terminator feature to map (from Jörg Dietrich)
L.terminator().addTo(issMap);

// Add map scale
L.control.scale({
  maxWidth: 100,
  metric: true
}).addTo(issMap);

// Create custom marker icon
let issIcon = L.icon({
iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/International_Space_Station_%28Expedition_58_Patch%29.svg/500px-International_Space_Station_%28Expedition_58_Patch%29.svg.png',
iconSize: [70, 50],
// iconAnchor: 
})

// Create ISS marker
let marker = L.marker([-180,90], {
icon: issIcon,
title: 'International Space Station Position',
alt: 'ISS icon'
}).addTo(issMap);

// Create circle marker
let circle = L.circle([-180, 90], {
  radius: 2300000,
  color: '#00E000',
  title: 'Visible ISS Horizon',
  opacity: 0
}).addTo(issMap);

// Create Sun icon and marker
let sunIcon = L.icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Sun_wearing_sunglasses.svg/1024px-Sun_wearing_sunglasses.svg.png',
  iconSize: [60, 60]
})

let sun = L.marker([90, -180], {
  icon: sunIcon,
  title: 'Sun Position',
  alt: 'Sun icon'
}).addTo(issMap)

// ===========================================================
// API call function
// ===========================================================

let firstCall = true;

const  getIssLocation = async() => {
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();
  
  // Destructure new variables from JSON data
  const { latitude, 
          longitude,
          velocity,
          altitude,
          solar_lat,
          solar_lon,
          visibility,
          footprint
        } = data;

  // console.log(latitude);
  // console.log(longitude);
  // console.log(solar_lat);
  // console.log(solar_lon);
  // console.log(visibility);
  // console.log(footprint);

  // Set marker and circle marker position to API lat/long co-ordinates
  marker.setLatLng([latitude, longitude]);

  circle.setLatLng([latitude, longitude]);

  // Conditional statement to account for different scales on ISS and solar longitude values
  if (solar_lon > 180) {
    sun.setLatLng([solar_lat, solar_lon - 360]);
  } else {
    sun.setLatLng([solar_lat, solar_lon]);
  }
  
  // Set map to centre on marker position
  if (firstCall) {
  issMap.setView([latitude, longitude], 3)
  firstCall = false; 
  } 

  // Set lat and long to html
  if (latitude > 0) {
    document.getElementById("lat-data").innerText = latitude.toFixed(2) + '° N';
  } else {
    document.getElementById("lat-data").innerText = (latitude * -1).toFixed(2) + '° S';
  }

  if (longitude > 0) {
    document.getElementById("long-data").innerText = longitude.toFixed(2) + '° E';
  } else {
    document.getElementById("long-data").innerText = (longitude * -1).toFixed(2) + '° W';
  }

  document.getElementById("velocity").innerText = (velocity / 3600).toFixed(2);
  document.getElementById("altitude").innerText = altitude.toFixed(2);
  document.getElementById("visibility").innerText = visibility;
  
// Set up references for re-centering function

// focusMap(latitude, longitude);

}

setInterval (getIssLocation, 1000);


// Map recentre function

const centreMap = async() => {
  const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
  const data = await response.json();

  const { latitude, longitude } = data;

  issMap.setView([latitude, longitude], 3);
}

// =======================================================
// People on ISS function
// Spacecraft currently docked with ISS
// National flags called from https://www.countryflags.io/
// =======================================================

const issInfo = () => {
  
  const crew = [
    {
      name: 'Sergey Ryzhikov',
      country: 'Russia',
      wiki: 'https://en.wikipedia.org/wiki/Sergey_Ryzhikov_(cosmonaut)',
      flag: 'https://www.countryflags.io/ru/shiny/64.png',
      position: 'Commander',
      launch: 1602633600
    },
    {
      name: 'Sergey Kud-Sverchkov',
      country: 'Russia',
      wiki: 'https://en.wikipedia.org/wiki/Sergey_Kud-Sverchkov',
      flag: 'https://www.countryflags.io/ru/shiny/64.png',
      position: 'Flight Engineer',
      launch: 1602633600
    },
    {
      name: 'Kate Rubins',
      country: 'United States',
      wiki: 'https://en.wikipedia.org/wiki/Kathleen_Rubins',
      flag: 'https://www.countryflags.io/us/shiny/64.png',
      position: 'Flight Engineer',
      launch: 1602633600
    },
    {
      name: 'Mike Hopkins',
      country: 'United States',
      wiki: 'https://en.wikipedia.org/wiki/Michael_S._Hopkins',
      flag: 'https://www.countryflags.io/us/shiny/64.png',
      position: 'Flight Engineer',
      launch: 1602633600
    },
    {
      name: 'Victor Glover',
      country: 'United States',
      wiki: 'https://en.wikipedia.org/wiki/Victor_J._Glover',
      flag: 'https://www.countryflags.io/us/shiny/64.png',
      position: 'Flight Engineer',
      launch: 1602633600
    },
    {
      name: 'Shannon Walker',
      country: 'United States',
      wiki: 'https://en.wikipedia.org/wiki/Shannon_Walker',
      flag: 'https://www.countryflags.io/us/shiny/64.png',
      position: 'Flight Engineer',
      launch: 1602633600
    },
    {
      name: 'Soichi Noguchi',
      country: 'Japan',
      wiki: 'https://en.wikipedia.org/wiki/Soichi_Noguchi',
      flag: 'https://www.countryflags.io/jp/shiny/64.png',
      position: 'Flight Engineer',
      launch: 1602633600
    },
  ]

  const dockedSpacecraft = [
    {
      spacecraft: 'Progress MS-14',
      wiki: 'https://en.wikipedia.org/wiki/Progress_MS-14',
      dockDate: 'April 25th 2020',
      flag: 'https://www.countryflags.io/ru/shiny/64.png'
    },
    {
      spacecraft: 'Progress MS-15',
      wiki: 'https://en.wikipedia.org/wiki/Progress_MS-15',
      dockDate: 'July 23rd 2020',
      flag: 'https://www.countryflags.io/ru/shiny/64.png'
    },
    {
      spacecraft: 'Cygnus NG-14',
      wiki: 'https://en.wikipedia.org/wiki/Cygnus_NG-14',
      dockDate: 'Oct 5th 2020',
      flag: 'https://www.countryflags.io/us/shiny/64.png'
    },
    {
      spacecraft: 'Soyuz MS-17',
      wiki: 'https://en.wikipedia.org/wiki/Soyuz_MS-17',
      dockDate: 'Oct 14th 2020',
      flag: 'https://www.countryflags.io/ru/shiny/64.png'
    },
    {
      spacecraft: 'Crew-1 Dragon',
      wiki: 'https://en.wikipedia.org/wiki/SpaceX_Crew-1',
      dockDate: 'Nov 17th 2020',
      flag: 'https://www.countryflags.io/us/shiny/64.png'
    }
  ];

  const expedition = 64;
  document.getElementById("crewname0").innerText = crew[0].name;
  document.getElementById("crewname1").innerText = crew[1].name;
  document.getElementById("crewname2").innerText = crew[2].name;
  document.getElementById("crewname3").innerText = crew[3].name;
  document.getElementById("crewname4").innerText = crew[4].name;
  document.getElementById("crewname5").innerText = crew[5].name;
  document.getElementById("crewname6").innerText = crew[6].name;
  document.getElementById("crewimg0").src = crew[0].flag;
  document.getElementById("crewimg1").src = crew[1].flag;
  document.getElementById("crewimg2").src = crew[2].flag;
  document.getElementById("crewimg3").src = crew[3].flag;
  document.getElementById("crewimg4").src = crew[4].flag;
  document.getElementById("crewimg5").src = crew[5].flag;
  document.getElementById("crewimg6").src = crew[6].flag;
  document.getElementById("crewwiki0").href = crew[0].wiki;
  document.getElementById("crewwiki1").href = crew[1].wiki;
  document.getElementById("crewwiki2").href = crew[2].wiki;
  document.getElementById("crewwiki3").href = crew[3].wiki;
  document.getElementById("crewwiki4").href = crew[4].wiki;
  document.getElementById("crewwiki5").href = crew[5].wiki;
  document.getElementById("crewwiki6").href = crew[6].wiki;
  document.getElementById("exp").innerText = expedition;
  document.getElementById("craftname0").innerText = dockedSpacecraft[0].spacecraft;
  document.getElementById("craftname1").innerText = dockedSpacecraft[1].spacecraft;
  document.getElementById("craftname2").innerText = dockedSpacecraft[2].spacecraft;
  document.getElementById("craftname3").innerText = dockedSpacecraft[3].spacecraft;
  document.getElementById("craftname4").innerText = dockedSpacecraft[4].spacecraft;
  document.getElementById("craftimg0").src = dockedSpacecraft[0].flag;
  document.getElementById("craftimg1").src = dockedSpacecraft[1].flag;
  document.getElementById("craftimg2").src = dockedSpacecraft[2].flag;
  document.getElementById("craftimg3").src = dockedSpacecraft[3].flag;
  document.getElementById("craftimg4").src = dockedSpacecraft[4].flag;
  document.getElementById("craftwiki0").href = dockedSpacecraft[0].wiki;
  document.getElementById("craftwiki1").href = dockedSpacecraft[1].wiki;
  document.getElementById("craftwiki2").href = dockedSpacecraft[2].wiki;
  document.getElementById("craftwiki3").href = dockedSpacecraft[3].wiki;
  document.getElementById("craftwiki4").href = dockedSpacecraft[4].wiki;
}

issInfo();





