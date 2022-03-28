var map = null;
const mapDivEl = document.querySelector("#map");

// checks if browser supports geolocation
function getLocation() {
  // if browser supports location, prompt for location and generate map
  if (navigator.geolocation) {
    var userLocation = navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    //   else hardcode location to Nashville
    getMap(36.1627, -86.7816);
  }
}

// gets user position
function getPosition(position) {
  // log found lat+lon to console
  console.log(
    "Your Location: " +
      position.coords.latitude +
      ", " +
      position.coords.longitude
  );
  //   generate map using user position
  getMap(position.coords.latitude, position.coords.longitude);
}

// function to generate map
function getMap(lat, lon) {
  // if map is not initiated, generate map. otherwise set new View and add marker
  if (map === null) {
    map = L.map("map").setView([lat, lon], 13);
    console.log(map);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1Ijoid2luZ3JhbTEiLCJhIjoiY2t5dzl6Z2t1MDYyNjJucXBiNHdvcTd5diJ9.GqWwwJ4INQXw49NCNZuEQQ",
      }
    ).addTo(map);

    L.marker([lat, lon]).addTo(map);
  } else {
    map.setView([lat, lon], 13);

    L.marker([lat, lon]).addTo(map);
  }
}

getLocation();
getMap(36.1627, -86.7816);
