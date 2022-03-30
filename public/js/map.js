var map = null;
const mapDivEl = document.querySelector("#map");

// checks if browser supports geolocation
function getLocation() {
  // if browser supports location, prompt for location and generate map
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, getDefaultPosition, {
      timeout: 250,
    });
  } else {
    //   else hardcode location to Nashville
    getMap(36.1627, -86.7816);
    map.on("click", mapClick);
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
  map.on("click", mapClick);
}

// default function to hardcode nashville if user doesn't want to share location
function getDefaultPosition() {
  getMap(36.1627, -86.7816);
  map.on("click", mapClick);
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

// test function for pop-ups
function mapPost(post) {
  var flagIcon = L.Icon.extend({
    options: {
      iconUrl: "/images/flag-icon.png",
      iconSize: [40, 50],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    },
  });

  var postIcon = new flagIcon();

  // add marker
  L.marker([post.post_lat, post.post_lon], { icon: postIcon })
    .addTo(map)
    .bindPopup(
      `
      <div class="post-popup">
        <a class="popup-link" href="/post/${post.id}"><h2>${post.title}</h2></a>
            <p> ${post.post_content}</p>
      </div>`,
      {
        autoClose: false,
      }
    );
}

var mapClick = function (e) {
  console.log("Map was clicked");

  // get lat and lon from the mouse click location
  let lat = e.latlng.lat.toFixed(7);
  let lon = e.latlng.lng.toFixed(7);

  let latDisplay = document.querySelector("#lat-display");
  let lonDisplay = document.querySelector("#lon-display");

  // change value of lat/lon displays to equal lat/lon
  if (latDisplay && lonDisplay) {
    latDisplay.textContent = lat;
    lonDisplay.textContent = lon;
  }

  // generate
  console.log(lat, lon);
};

getLocation();
