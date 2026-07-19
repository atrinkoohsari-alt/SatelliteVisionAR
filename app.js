const video = document.getElementById("camera");
const info = document.getElementById("info");

const satelliteName = document.getElementById("satelliteName");
const prevSatellite = document.getElementById("prevSatellite");
const nextSatellite = document.getElementById("nextSatellite");

let currentIndex = 0;

let latitude = "";
let longitude = "";
let heading = 0;

navigator.mediaDevices.getUserMedia({
    video:{
        facingMode:"environment"
    }
})
.then(stream=>{
    video.srcObject = stream;
})
.catch(err=>{
    info.innerHTML = err.message;
});

// GPS
if("geolocation" in navigator){

    navigator.geolocation.getCurrentPosition(function(position){

        latitude = position.coords.latitude.toFixed(6);
        longitude = position.coords.longitude.toFixed(6);

        updateInfo();

    },function(error){

        info.innerHTML = error.message;

    });

}

// Compass
if(window.DeviceOrientationEvent){

    window.addEventListener("deviceorientation",function(event){

        if(event.alpha != null){

            heading = Math.round(event.alpha);

            updateInfo();

        }

    });

}

function getSatelliteAzimuth(){

    const sat = satellites[currentIndex];

    if(sat.type == "starlink"){
        return null;
    }

    if(latitude == "" || longitude == ""){
        return null;
    }

    return calculateAzimuth(
        Number(latitude),
        Number(longitude),
        sat.longitude
    );

}

function updateInfo(){

    satelliteName.innerText = satellites[currentIndex].name;

    let az = getSatelliteAzimuth();

    if(az == null){

        info.innerHTML =
        "🚀 Starlink<br><br>در نسخه بعدی فعال می‌شود.";

        return;

    }

    let diff = Math.abs(heading - az);

    if(diff > 180)
        diff = 360 - diff;

    document.getElementById("crosshair").style.color =
        diff < 5 ? "lime" :
        diff < 15 ? "yellow" : "red";

    info.innerHTML =
    "Latitude : " + latitude +
    "<br>Longitude : " + longitude +
    "<br><br>Satellite : " + satellites[currentIndex].name +
    "<br>Azimuth : " + Math.round(az) + "°" +
    "<br>Heading : " + heading + "°" +
    "<br>Distance : " + Math.round(diff) + "°";

}

nextSatellite.onclick = function(){

    currentIndex++;

    if(currentIndex >= satellites.length)
        currentIndex = 0;

    updateInfo();

}

prevSatellite.onclick = function(){

    currentIndex--;

    if(currentIndex < 0)
        currentIndex = satellites.length - 1;

    updateInfo();

}
