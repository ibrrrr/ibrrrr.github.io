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
// Get all the images in the gallery and the modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');

// Open the modal and display the clicked image
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = item.src; // Set modal image to clicked image
    });
});

// Close the modal when the close button (X) is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal if the user clicks anywhere outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
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







