const addressDisplay = document.querySelector("#address-container");
const mapDisplay = document.querySelector("#new-post-map-container");
const latlonDisplay = document.querySelector("#latlon-display");

var addressSelect = false;
var mapClickSelect = false;
var myLocationSelect = false;

// hides content if clicking on enter address
function addressDisplayHandler() {
  mapDisplay.style = "visibility: hidden; max-height: 0;";
  latlonDisplay.style = "visibility: hidden; max-height: 0;";

  addressDisplay.style.removeProperty("visibility");
  addressDisplay.style.removeProperty("max-height");

  addressSelect = true;
  mapClickSelect = false;
  myLocationSelect = false;
}

// hides content if clicking on map click
function mapDisplayHandler() {
  addressDisplay.style = "visibility: hidden; max-height: 0;";

  mapDisplay.style.removeProperty("visibility");
  mapDisplay.style.removeProperty("max-height");
  latlonDisplay.style.removeProperty("visibility");
  latlonDisplay.style.removeProperty("max-height");

  addressSelect = false;
  mapClickSelect = true;
  myLocationSelect = false;
}

// hides content if clicking on use my location
function myLocationHandler() {
  addressDisplay.style = "visibility: hidden; max-height: 0;";
  mapDisplay.style = "visibility: hidden; max-height: 0;";
  latlonDisplay.style = "visibility: hidden; max-height: 0;";

  addressSelect = false;
  mapClickSelect = false;
  myLocationSelect = true;
}

// function to get post coordinates
async function getPostCoords() {
  switch (document.querySelector("input[name='location']:checked").value) {
    case "Address":
      let address = document.querySelector("#address-input").value;
      let city = document.querySelector("#city-input").value;
      let state = document.querySelector("#state-select").value;

      console.log(address, city, state);

      if (address === null || city === null || state === null) {
        alert("You must enter an address, city, AND state!");
        break;
      } else {
        return await geocodeAddress(address, city, state);
      }
    case "Map click":
      makePostRequest(
        document.querySelector("#lat-display").textContent,
        document.querySelector("#lon-display").textContent
      );
    case "Use my location":
      var position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      makePostRequest(position.coords.latitude, position.coords.longitude);

    default:
      return null;
  }
}

async function geocodeAddress(address, city, state) {
  // positionstack API key: 0162855f8db81c0556289d2f6c3e0a36
  var apiUrl =
    "http://api.positionstack.com/v1/forward?access_key=0162855f8db81c0556289d2f6c3e0a36&query=" +
    address +
    ",%20" +
    city +
    ",%20" +
    state +
    ",%20USA";

  console.log(apiUrl);

  await fetch(apiUrl).then(function (response) {
    if (response.ok) {
      console.log(
        "Connection to PositionStack Forward Geocoding API successful"
      );
      response.json().then(function (data) {
        console.log(
          "address latlong: " + data.data[0].latitude,
          data.data[0].longitude
        );
        makePostRequest(data.data[0].latitude, data.data[0].longitude);
      });
    }
  });
}

function getPos(pos) {
  return {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
  };
}

function getPosError(err) {
  alert("You have to be allowing your location for this option!");
  return null;
}

// function for posting form
async function newFormHandler(event) {
  event.preventDefault();

  //   get post coords then make post request
  await getPostCoords();
}

// make post request with found lat + lon
async function makePostRequest(post_lat, post_lon) {
  console.log("final callback: " + post_lat, post_lon);

  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector(
    'textarea[name="post-content"]'
  ).value;
  const bar_name = document.querySelector('input[name="bar-name"]').value;

  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      post_content,
      bar_name,
      post_lat,
      post_lon,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      console.log(response);
      document.location.replace("/dashboard");
    } else {
      console.log(response.statusText);
    }
  });
}

// EVENT LISTENERS
document
  .querySelector("#address")
  .addEventListener("click", addressDisplayHandler);

document
  .querySelector("#map-click")
  .addEventListener("click", mapDisplayHandler);

document
  .querySelector("#your-location")
  .addEventListener("click", myLocationHandler);

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
