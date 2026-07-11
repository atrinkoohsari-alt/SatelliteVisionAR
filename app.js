const video = document.getElementById("camera");

navigator.mediaDevices.getUserMedia({
video:{
facingMode:"environment"
}
})
.then(stream=>{
video.srcObject=stream;
})
.catch(err=>{
console.log(err);
document.getElementById("info").innerHTML = err.name + "<br>" + err.message;
});
// گرفتن موقعیت GPS

if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(

        function(position){

            document.getElementById("info").innerHTML =

            "Latitude : " + position.coords.latitude + "<br>" +

            "Longitude : " + position.coords.longitude;

        },

        function(error){

            document.getElementById("info").innerHTML =

            "GPS Error : " + error.message;

        }

    );

}
// Compass

if (window.DeviceOrientationEvent) {

    window.addEventListener("deviceorientation", function(event) {

        let heading = event.alpha;

        if (heading !== null) {

            document.getElementById("info").innerHTML +=
            "<br>Heading : " + Math.round(heading) + "°"

checkDirection(Math.round(heading));
        }

    });

}
// جهت تقریبی ماهواره یاهست در ایران
const satelliteAzimuth = 238;

// بررسی جهت
function checkDirection(currentHeading){

    const diff = Math.abs(currentHeading - satelliteAzimuth);

    if(diff < 5){
        document.getElementById("crosshair").style.background = "lime";
    }else{
        document.getElementById("crosshair").style.background = "red";
    }

                }
