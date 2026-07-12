const video = document.getElementById("camera");
const info = document.getElementById("info");
const satelliteSelect = document.getElementById("satelliteSelect");
let currentSatellite = satellites[0];
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

let satelliteAzimuth = 238;

if ("geolocation" in navigator){

    navigator.geolocation.getCurrentPosition(function(position){

        latitude = position.coords.latitude.toFixed(6);
        longitude = position.coords.longitude.toFixed(6);

        // updateInfo();

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

    let diff = Math.abs(currentHeading - satelliteAzimuth);

    // اگر اختلاف از ۱۸۰ بیشتر شد، از مسیر کوتاه‌تر حساب کن
    if (diff > 180) {
        diff = 360 - diff;
    }

    if (diff < 5){
        document.getElementById("crosshair").style.background = "lime";
    }else if(diff < 15){
        document.getElementById("crosshair").style.background = "yellow";
    }else{
        document.getElementById("crosshair").style.background = "red";
    }

}
satelliteSelect.addEventListener("change", function () {

    currentSatellite = satellites[this.value];

    console.log(currentSatellite);

    if (currentSatellite.longitude != null) {
        satelliteAzimuth = 180 + (currentSatellite.longitude - longitude);
    }

    updateInfo();

});
