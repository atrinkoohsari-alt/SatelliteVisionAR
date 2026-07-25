const video = document.getElementById("camera");
const info = document.getElementById("info");

const satelliteName = document.getElementById("satelliteName");
const prevSatellite = document.getElementById("prevSatellite");
const nextSatellite = document.getElementById("nextSatellite");

let currentIndex = 0;

let latitude = null;
let longitude = null;
let heading = 0;

// دوربین
navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: "environment"
    }
})
.then(stream => {
    video.srcObject = stream;
})
.catch(err => {
    info.innerHTML = "Camera Error:<br>" + err.message;
});

// GPS
if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(

        function(position){

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            updateInfo();

        },

        function(error){

            info.innerHTML = "GPS Error:<br>" + error.message;

        }

    );

}

// قطب نما
if (window.DeviceOrientationEvent){

    window.addEventListener("deviceorientation", function(event){

        if(event.alpha != null){

            heading = Math.round(event.alpha);

            updateInfo();

        }

    });

}

// محاسبه آزیموت
function getSatelliteAzimuth(){

    if(latitude == null || longitude == null)
        return null;

    const sat = satellites[currentIndex];

    if(sat.type === "starlink")
        return null;

    return calculateAzimuth(
        latitude,
        longitude,
        sat.longitude
    );

}

// بروزرسانی اطلاعات
function updateInfo(){

    satelliteName.innerText = satellites[currentIndex].name;

    if(latitude == null || longitude == null){

        info.innerHTML = "در انتظار GPS ...";

        return;

    }

    const sat = satellites[currentIndex];

    if(sat.type === "starlink"){

        info.innerHTML =
        "🚀 Starlink<br><br>به زودی اضافه می‌شود.";

        return;

    }

    const az = getSatelliteAzimuth();

    const elevation = calculateElevation(
        latitude,
        longitude,
        sat.longitude
    );

    const skew = calculateSkew(
        latitude,
        longitude,
        sat.longitude
    );

    let diff = Math.abs(heading - az);

    if(diff > 180)
        diff = 360 - diff;

    const crosshair = document.getElementById("crosshair");

    if(diff < 5){
        crosshair.style.color = "lime";
    }
    else if(diff < 15){
        crosshair.style.color = "yellow";
    }
    else{
        crosshair.style.color = "red";
    }

    info.innerHTML =
    "Latitude : " + latitude.toFixed(6) +
    "<br>Longitude : " + longitude.toFixed(6) +
    "<br><br>Satellite : " + sat.name +
    "<br>Azimuth : " + az.toFixed(1) + "°" +
    "<br>Elevation : " + elevation.toFixed(1) + "°" +
    "<br>LNB Skew : " + skew.toFixed(1) + "°" +
    "<br>Heading : " + heading + "°" +
    "<br>Distance : " + diff.toFixed(1) + "°";

}

// ماهواره بعدی
nextSatellite.onclick = function(){

    currentIndex++;

    if(currentIndex >= satellites.length)
        currentIndex = 0;

    updateInfo();

};

// ماهواره قبلی
prevSatellite.onclick = function(){

    currentIndex--;

    if(currentIndex < 0)
        currentIndex = satellites.length - 1;

    updateInfo();

};
