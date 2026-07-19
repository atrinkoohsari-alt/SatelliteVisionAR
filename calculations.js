function calculateAzimuth(latitude, longitude, satelliteLongitude){

    return 180 + (satelliteLongitude - longitude);

}

function calculateElevation(latitude, longitude, satelliteLongitude){

    return 0;

}

function calculateSkew(latitude, longitude, satelliteLongitude){

    return 0;

}
