const video = document.getElementById("camera");
const info = document.getElementById("info");

navigator.mediaDevices.getUserMedia({
    video:{
        facingMode:"environment"
    }
})
.then(stream=>{
    video.srcObject=stream;
})
.catch(err=>{
    info.innerHTML = err.name + "<br>" + err.message;
});

let latitude = "";
let longitude = "";
let heading = 0;

const satelliteAzimuth = 238;

if ("geolocation" in navigator){

    navigator.geolocation.getCurrentPosition(function(position){

        latitude = position.coords.latitude.toFixed(6);
        longitude = position.coords.longitude.toFixed(6);

        updateInfo();

    },function(error){

        info.innerHTML = "GPS Error : " + error.message;

    });

}

if(window.DeviceOrientationEvent){

    window.addEventListener("deviceorientation",function(event){

        if(event.alpha !== null){

            heading = Math.round(event.alpha);

            updateInfo();

            checkDirection(heading);

        }

    });

}

function updateInfo(){

    const diff = Math.abs(heading - satelliteAzimuth);

    info.innerHTML =
    "Latitude : " + latitude +
    "<br>Longitude : " + longitude +
    "<br><br>Heading : " + heading + "°" +
    "<br>Distance : " + diff + "°";

}

function checkDirection(currentHeading){

    const diff = Math.abs(currentHeading - satelliteAzimuth);

    if(diff < 5){

        document.getElementById("crosshair").style.background="lime";

    }else{

        document.getElementById("crosshair").style.background="red";

    }

}
