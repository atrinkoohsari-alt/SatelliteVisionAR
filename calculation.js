function toRadians(degrees){
    return degrees * Math.PI / 180;
}

function toDegrees(radians){
    return radians * 180 / Math.PI;
}

// محاسبه آزیموت واقعی
function calculateAzimuth(latitude, longitude, satelliteLongitude){

    const lat = toRadians(latitude);
    const dLon = toRadians(satelliteLongitude - longitude);

    let az = Math.atan2(
        Math.tan(dLon),
        Math.sin(lat)
    );

    az = toDegrees(az);

    az = 180 - az;

    if(az < 0) az += 360;
    if(az > 360) az -= 360;

    return az;

}

// محاسبه ارتفاع

function calculateElevation(latitude, longitude, satelliteLongitude){

    const lat = toRadians(latitude);

    const dLon = toRadians(satelliteLongitude - longitude);

    const cosPsi =
        Math.cos(lat) *
        Math.cos(dLon);

    const elevation =
        Math.atan(
            (cosPsi - 0.1512) /
            Math.sqrt(1 - cosPsi*cosPsi)
        );

    return toDegrees(elevation);

}

// محاسبه چرخش LNB

function calculateSkew(latitude, longitude, satelliteLongitude){

    const lat = toRadians(latitude);

    const dLon =
        toRadians(
            satelliteLongitude - longitude
        );

    return toDegrees(
        Math.atan(
            Math.sin(dLon) /
            Math.tan(lat)
        )
    );

}
 
