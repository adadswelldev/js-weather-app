window.addEventListener("load", () => {

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    const TEMPERATURESPAN = document.querySelector(".degree-section span");

    console.log(TEMPERATURESPAN);

    const BOLTONLAT = "53.576866";
    const BOLTONLONG = "-2.428219";
    const PROXY = "https://cors-anywhere.herokuapp.com/";
    const DARKSKYAPI = `${PROXY}https://api.darksky.net/forecast/7b415c861b1e989a6879edb2c4637135/${BOLTONLAT},${BOLTONLONG}`;

    fetch(DARKSKYAPI)
        .then(response => {
            return response.json();
        })
        .then (data => {
            temperatureDegree.textContent = data.currently.temperature;
            temperatureDescription.textContent = data.currently.summary;
            locationTimezone.textContent = data.timezone;
            const ICON = data.currently.icon;

            let fahrenheit = data.currently.temperature;
            let celsius = (fahrenheit - 32) * (5/9);
            
            setIcons(ICON, document.querySelector('#icon'));
            temperatureSection.addEventListener('click', () => {
                if (TEMPERATURESPAN.textContent === "F") {
                    TEMPERATURESPAN.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                } else {
                    TEMPERATURESPAN.textContent = "F";
                    temperatureDegree.textContent = fahrenheit;
                }
            })
        })
    

    function setIcons(icon, iconID) {
        const SKYCONS = new Skycons( {color: "white" });
        const CURRENTICON = icon.replace(/-/g, "_").toUpperCase();
        SKYCONS.play();
        return SKYCONS.set(iconID, Skycons[CURRENTICON]);
    }
});
