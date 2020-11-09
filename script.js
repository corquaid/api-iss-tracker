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
title: 'International Space Station',
alt: 'ISS icon'
}).addTo(issMap);

// Create circle marker
let circle = L.circle([-180, 90], {
  radius: 2300000,
  color: '#00E000',
  opacity: 0.1
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
// National flags called from https://www.countryflags.io/
// =======================================================

const getCrew = () => {
  
  const crew = [
    {
      name: 'Sergey Ryzhikov',
      country: 'Russia',
      flag: 'https://www.countryflags.io/ru/shiny/64.png',
      position: 'Commander',
      launch: 1602633600
    },
    {
      name: 'Sergey Kud-Sverchkov',
      country: 'Russia',
      flag: 'https://www.countryflags.io/ru/shiny/64.png',
      position: 'Flight Engineer',
      launch: 1602633600
    },
    {
      name: 'Kate Rubins',
      country: 'United States',
      flag: 'https://www.countryflags.io/us/shiny/64.png',
      position: 'Flight Engineer',
      launch: 1602633600
    }
  ]

  const expedition = 64;

  document.getElementById("crew0").innerText = crew[0].name;
  document.getElementById("crew1").innerText = crew[1].name;
  document.getElementById("crew2").innerText = crew[2].name;
  document.getElementById("img0").src = crew[0].flag;
  document.getElementById("img1").src = crew[1].flag;
  document.getElementById("img2").src = crew[2].flag;
  document.getElementById("exp").innerText = expedition;
}

getCrew();





