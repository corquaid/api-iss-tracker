# Track the International Space Station live!

![Tracker screenshot](https://github.com/corquaid/api-iss-tracker/blob/main/api-iss-tracker-screenshot.png)

This is a one-page Javascript app showing the live position, orbital parameters and crew information for the ISS.

I used [Leaflet.js](https://leafletjs.com/) maps (with a cool day/night terminator overlay from [@joergdietrich](https://github.com/joergdietrich/Leaflet.Terminator)) and called the "Where the ISS at?" REST [API](https://wheretheiss.at/w/developer) to retrieve the orbital data of the station.

The crew information is hard-coded but I'd like to create an API in the future that provides lots of relevant crew information too.
