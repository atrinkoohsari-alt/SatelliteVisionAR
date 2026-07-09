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
