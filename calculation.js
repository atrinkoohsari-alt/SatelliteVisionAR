function toRadians(degrees){
    return degrees * Math.PI / 180;
}

function toDegrees(radians){
    return radians * 180 / Math.PI;
}

function calculateAzimuth(latitude, longitude, satelliteLongitude){

    const lat = toRadians(latitude);
    const dLon = toRadians(satelliteLongitude - longitude);

    let azimuth = Math.atan(
        Math.tan(dLon) / Math.sin(lat)
    );

    azimuth = toDegrees(azimuth);

    if(dLon > 0){
        azimuth = 180 - azimuth;
    }else{
        azimuth = 180 + Math.abs(azimuth);
    }

    return azimuth;
}
