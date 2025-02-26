document.addEventListener("DOMContentLoaded", function () {
    const windows = document.querySelectorAll(".window");

    windows.forEach((win) => {
        const closeButton = win.querySelector(".close");
        const minimizeButton = win.querySelector(".minimize");
        const extraButton = win.querySelector(".extra-button");
        const content = win.querySelector(".window-content");

        // Close window on 'X' icon click
        closeButton.addEventListener("click", function () {
            win.style.display = "none";
        });

        // Minimize window content on '-' icon click
        minimizeButton.addEventListener("click", function () {
            if (content.classList.contains("minimized")) {
                content.classList.remove("minimized");
                content.style.maxHeight = "400px"; // Restore size
            } else {
                content.classList.add("minimized");
                content.style.maxHeight = "0"; // Collapse
            }
        });

        // Extra button placeholder functionality
        extraButton.addEventListener("click", function () {
            console.log("Extra button clicked - add functionality here!");
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    galleryItems.forEach(img => {
        img.onload = function() {
            const item = this.parentElement;
            if (this.naturalHeight > this.naturalWidth) {
                item.classList.add('portrait');
            } else {
                item.classList.add('landscape');
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const dateTimeElement = document.getElementById("date-time");
    const locationElement = document.getElementById("location");
    const weatherElement = document.getElementById("weather");

    // Function to update time every second
    function updateTime() {
        const now = new Date();
        dateTimeElement.textContent = now.toLocaleString();
    }
    updateTime();
    setInterval(updateTime, 1000);

    // Function to get user location
    function getLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            locationElement.textContent = "Geolocation not supported";
        }
    }

    function showPosition(position) {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        locationElement.textContent = `Lat: ${lat}, Lon: ${lon}`;
        getWeather(lat, lon);
    }

    function showError(error) {
        locationElement.textContent = "Location unavailable";
        weatherElement.textContent = "Weather unavailable";
    }

    // Function to fetch weather data
    function getWeather(lat, lon) {
        const apiKey = "Y2d2edc2d35d71b002b63e42e65775b66"; // Replace with actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Weather data unavailable");
                }
                return response.json();
            })
            .then(data => {
                weatherElement.textContent = `Weather: ${data.main.temp}°C, ${data.weather[0].description}`;
            })
            .catch(error => {
                weatherElement.textContent = "Weather unavailable";
            });
    }

    // Call functions
    getLocation();
});







