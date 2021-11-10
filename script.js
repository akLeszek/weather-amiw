function check() {
    const localization = document.querySelector("#loc");

    /**
     * Metoda I - XMLHttpRequest 
     * 
     * const xhr = new XMLHttpRequest();
     * xhr.onload = function () {
     * console.log(this.status);
     * console.log(this.responseText);
     * }
     * xhr.open("get", "https://api.openweathermap.org/data/2.5/weather?q=" + localization.value + "&lang=pl&appid=77d83cf19c0356f8b83f9d5e3224509f", true);
     * xhr.send();
    */

    /**
     * Metoda II - Fetch
     * fetch("https://api.openweathermap.org/data/2.5/weather?q=" + localization.value + "&lang=pl&units=metric&appid=77d83cf19c0356f8b83f9d5e3224509f")
     * .then(response => response.json())
     * .then(data => console.log(data));
     */

    async function getWeather() {
        let resp = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + localization.value + "&lang=pl&units=metric&appid=77d83cf19c0356f8b83f9d5e3224509f");
        return resp.json();
    }

    async function renderWeather() {
        try {
            let weather = await getWeather();
            const data = {
                name: weather.name,
                actual_time: new Date (weather.dt * 1000).toLocaleString(),
                sunrise: new Date(weather.sys.sunrise * 1000).toLocaleString().split(',')[1],
                sunset: new Date(weather.sys.sunset * 1000).toLocaleString().split(',')[1],
                temp: weather.main.temp,
                sensed_temp: weather.main.feels_like,
                min_temp: weather.main.temp_min,
                max_temp: weather.main.temp_max,
                description: weather.weather[0].description,
                icon: "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
            }

            let html = `<h1> ${ data.name } </h1>
                        <p> ${ data.actual_time } </p>
                        <div id=temp><h3>Temperatura: ${ data.temp }</h4>
                        <h5>Temp. odczuwalna: ${ data.sensed_temp }</h5>
                        <h5>Temp. minimalna: ${ data.min_temp }</h5>
                        <h5>Temp. maksymalna: ${ data.max_temp }</h5></div>
                        <h4>Wschód słońca: ${ data.sunrise }</h5>
                        <h4>Zachód słońca: ${ data.sunset }</h5>
                        <img src= ${ data.icon } >
                        <h4> ${data.description[0].toUpperCase() + data.description.slice(1) } </h4>`
            let container = document.querySelector('#container');
            container.innerHTML = html;
        } catch (error) {
            alert(`Nie znaleziono miejscowości ${ localization.value }`)
            console.log(error);
        }
    }
    renderWeather()
}