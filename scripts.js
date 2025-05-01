document.addEventListener("DOMContentLoaded", function() {
    // Select DOM elements
    const navbar = document.getElementById('nav');
    const categoryDropdown = document.getElementById("category");
    const cropDropdown = document.getElementById("crop");
    const calculateButton = document.getElementById("calculateButton");
    const enterButton = document.getElementById("enterButton");
    const startDateInput = document.getElementById("startDate");
    const resultBox = document.getElementById("result");
    const cropGuideBox = document.getElementById("crop-guide");
    
    // Set current date as minimum for the date picker
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    startDateInput.setAttribute('min', formattedDate);
    startDateInput.value = formattedDate;
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY >= 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize crop dropdown based on category selection
    categoryDropdown.addEventListener("change", function() {
        cropDropdown.innerHTML = ""; // Clear previous options
        
        const selectedCategory = this.value;
        
        if (selectedCategory === "kharif") {
            addCropOption("Rice");
            addCropOption("Sweet Corn");
            addCropOption("Millet");
            addCropOption("Sorghum");
            addCropOption("Pearl Millet");
            addCropOption("Sugarcane");
            addCropOption("Cotton");
            addCropOption("Groundnut");
            addCropOption("Soybeans");
            addCropOption("Turmeric");
            addCropOption("Maize");
            addCropOption("Sunflower");
            addCropOption("Paddy");
        } else if (selectedCategory === "rabi") {
            addCropOption("Wheat");
            addCropOption("Barley");
            addCropOption("Mustard");
            addCropOption("Chickpeas");
            addCropOption("Lentils");
            addCropOption("Peas");
            addCropOption("Rapeseed");
            addCropOption("Fennel");
        }
    });

    // Helper function to add crop options
    function addCropOption(cropName) {
        const option = document.createElement("option");
        option.text = cropName;
        cropDropdown.add(option);
    }

    // Trigger change event to populate initial crop options
    categoryDropdown.dispatchEvent(new Event('change'));

    // Calculate timeline button click handler
    calculateButton.addEventListener("click", function() {
        if (!startDateInput.value) {
            displayToast("Please select a start date", "error");
            return;
        }

        const selectedCategory = categoryDropdown.value;
        const selectedCrop = cropDropdown.value;
        const startDate = new Date(startDateInput.value);
        let endDate;
        
        // Calculate key dates
        const landPreparationDate = new Date(startDate);
        landPreparationDate.setDate(landPreparationDate.getDate() + 15);
        
        const sowingDate = new Date(landPreparationDate);
        sowingDate.setDate(sowingDate.getDate() + 15);
        
        const harvestDate = new Date(sowingDate);
        
        // Set harvest date based on crop type
        if (selectedCategory === "kharif" && selectedCrop === "Rice") {
            harvestDate.setDate(harvestDate.getDate() + 120); // 4 months
            endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 6);
        } else if (selectedCategory === "kharif" && selectedCrop === "Sweet Corn") {
            harvestDate.setDate(harvestDate.getDate() + 80); // ~2.5-3 months
            endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 4);
        } else if (selectedCategory === "rabi" && selectedCrop === "Wheat") {
            harvestDate.setDate(harvestDate.getDate() + 150); // 5 months
            endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 6);
        } else if (selectedCategory === "rabi" && selectedCrop === "Barley") {
            harvestDate.setDate(harvestDate.getDate() + 120); // 4 months
            endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 5);
        } else {
            harvestDate.setDate(harvestDate.getDate() + 120); // Default: 4 months
            endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 5);
        }
        
        // Calculate days remaining
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        const currentDate = new Date();
        
        const daysTillLandPreparation = Math.max(0, Math.round(Math.abs((landPreparationDate - currentDate) / oneDay)));
        const daysTillSowing = Math.max(0, Math.round(Math.abs((sowingDate - currentDate) / oneDay)));
        const daysTillHarvest = Math.max(0, Math.round(Math.abs((harvestDate - currentDate) / oneDay)));
        
        // Format dates for display
        const formatDate = (date) => {
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        };
        
        // Create timeline HTML
        let timelineHTML = `
            <h5 class="text-primary mb-3">Crop Timeline for ${selectedCrop}</h5>
            <div class="timeline-item">
                <div class="timeline-label">Land Preparation</div>
                <div class="timeline-date">${formatDate(landPreparationDate)}</div>
                <div class="timeline-days">${daysTillLandPreparation} days from now</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-label">Sowing Date</div>
                <div class="timeline-date">${formatDate(sowingDate)}</div>
                <div class="timeline-days">${daysTillSowing} days from now</div>
            </div>
            <div class="timeline-item">
                <div class="timeline-label">Expected Harvest</div>
                <div class="timeline-date">${formatDate(harvestDate)}</div>
                <div class="timeline-days">${daysTillHarvest} days from now</div>
            </div>
        `;
        
        resultBox.innerHTML = timelineHTML;
        resultBox.style.display = "block";
        
        // Add CSS for timeline
        const style = document.createElement('style');
        style.innerHTML = `
            .timeline-item {
                padding: 8px 0;
                border-left: 2px solid var(--primary-color);
                padding-left: 15px;
                margin-bottom: 10px;
                position: relative;
            }
            .timeline-item:before {
                content: "";
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--primary-color);
                left: -6px;
                top: 12px;
            }
            .timeline-label {
                font-weight: 600;
                color: var(--gray-800);
            }
            .timeline-date {
                color: var(--primary-color);
            }
            .timeline-days {
                font-size: 0.9rem;
                color: var(--gray-400);
            }
        `;
        
        if (!document.querySelector('#timeline-styles')) {
            style.id = 'timeline-styles';
            document.head.appendChild(style);
        }
    });

    // View growing guide button click handler
    enterButton.addEventListener("click", function() {
        const selectedCategory = categoryDropdown.value;
        const selectedCrop = cropDropdown.value;
        
        if (selectedCategory === "rabi") {
            switch (selectedCrop) {
                case "Wheat":
                    cropGuideBox.innerHTML = getRabiWheatSteps();
                    break;
                case "Barley":
                    cropGuideBox.innerHTML = getRabiBarleySteps();
                    break;
                case "Mustard":
                    cropGuideBox.innerHTML = getRabiMustardSteps();
                    break;
                case "Chickpeas":
                    cropGuideBox.innerHTML = getRabiChickpeasSteps();
                    break;
                case "Lentils":
                    cropGuideBox.innerHTML = getRabiLentilsSteps();
                    break;
                case "Rapeseed":
                    cropGuideBox.innerHTML = getRabiRapeseedSteps();
                    break;
                case "Fennel":
                    cropGuideBox.innerHTML = getRabiFennelSteps();
                    break;
                default:
                    cropGuideBox.innerHTML = getDefaultGuideMessage();
            }
        } else if (selectedCategory === "kharif") {
            switch (selectedCrop) {
                case "Rice":
                    cropGuideBox.innerHTML = getKharifRiceSteps();
                    break;
                case "Sweet Corn":
                    cropGuideBox.innerHTML = getKharifCornSteps();
                    break;
                case "Millet":
                    cropGuideBox.innerHTML = getKharifMilletSteps();
                    break;
                case "Sorghum":
                    cropGuideBox.innerHTML = getKharifSorghumSteps();
                    break;
                case "Pearl Millet":
                    cropGuideBox.innerHTML = getKharifPearlMilletSteps();
                    break;
                case "Sugarcane":
                    cropGuideBox.innerHTML = getKharifSugarcaneSteps();
                    break;
                case "Cotton":
                    cropGuideBox.innerHTML = getKharifCottonSteps();
                    break;
                case "Groundnut":
                    cropGuideBox.innerHTML = getKharifGroundnutSteps();
                    break;
                case "Soybeans":
                    cropGuideBox.innerHTML = getKharifSoybeansSteps();
                    break;
                case "Turmeric":
                    cropGuideBox.innerHTML = getKharifTurmericSteps();
                    break;
                case "Maize":
                    cropGuideBox.innerHTML = getKharifMaizeSteps();
                    break;
                case "Sunflower":
                    cropGuideBox.innerHTML = getKharifSunflowerSteps();
                    break;
                case "Paddy":
                    cropGuideBox.innerHTML = getKharifPaddySteps();
                    break;
                default:
                    cropGuideBox.innerHTML = getDefaultGuideMessage();
            }
        }
        
        // Scroll to guide if on mobile
        if (window.innerWidth < 992) {
            document.querySelector('.guide-card').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Default message for unavailable guides
    function getDefaultGuideMessage() {
        return `
            <div class="text-center p-4">
                <i class="fas fa-seedling text-primary mb-3" style="font-size: 3rem;"></i>
                <h4>Guide Not Available</h4>
                <p>We're still growing our knowledge base. This crop guide will be available soon!</p>
            </div>
        `;
    }

    // Toast notification system
    function displayToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            </div>
            <div class="toast-message">${message}</div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
        
        // Add CSS for toast
        const style = document.createElement('style');
        style.innerHTML = `
            .toast-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                background: white;
                border-radius: 5px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                z-index: 1000;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                max-width: 350px;
            }
            .toast-notification.show {
                transform: translateX(0);
            }
            .toast-icon {
                margin-right: 12px;
                font-size: 1.2rem;
            }
            .toast-info .toast-icon {
                color: var(--primary-color);
            }
            .toast-error .toast-icon {
                color: #dc3545;
            }
            .toast-message {
                font-size: 0.9rem;
            }
        `;
        
        if (!document.querySelector('#toast-styles')) {
            style.id = 'toast-styles';
            document.head.appendChild(style);
        }
    }

    // Weather API integration
    function fetchWeather(location) {
        // Replace 'YOUR_API_KEY' with an actual OpenWeatherMap API key
        const apiKey = 'YOUR_API_KEY'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
        
        // Placeholder weather data (since API key might not work)
        const placeholderWeather = {
            temp: 28,
            location: location,
            rain: 0,
            wind: 8.5,
            conditions: 'sunny'
        };
        
        try {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    updateWeatherUI({
                        temp: Math.round(data.main.temp - 273.15),
                        location: data.name,
                        rain: data.rain ? data.rain['1h'] : 0,
                        wind: data.wind.speed,
                        conditions: getWeatherCondition(data.weather[0].id)
                    });
                })
                .catch(error => {
                    console.log('Using placeholder weather data:', error);
                    updateWeatherUI(placeholderWeather);
                });
        } catch (error) {
            console.log('Using placeholder weather data:', error);
            updateWeatherUI(placeholderWeather);
        }
    }
    
    // Update weather UI elements
    function updateWeatherUI(weatherData) {
        document.querySelector('.weather-temp .temp').textContent = weatherData.temp;
        document.querySelector('.location').textContent = weatherData.location;
        
        // Update icon based on conditions
        const weatherIcon = document.querySelector('.weather-icon i');
        weatherIcon.className = ''; // Clear previous classes
        weatherIcon.classList.add('wi');
        
        switch(weatherData.conditions) {
            case 'rain':
                weatherIcon.classList.add('wi-rain');
                break;
            case 'clouds':
                weatherIcon.classList.add('wi-cloudy');
                break;
            case 'thunderstorm':
                weatherIcon.classList.add('wi-thunderstorm');
                break;
            case 'snow':
                weatherIcon.classList.add('wi-snow');
                break;
            case 'mist':
                weatherIcon.classList.add('wi-fog');
                break;
            default:
                weatherIcon.classList.add('wi-day-sunny');
        }
        
        document.querySelector('.rain').textContent = `${weatherData.rain} mm`;
        document.querySelector('.wind').textContent = `${weatherData.wind} km/h`;
    }
    
    // Helper to convert weather code to condition
    function getWeatherCondition(code) {
        if (code >= 200 && code < 300) return 'thunderstorm';
        if (code >= 300 && code < 600) return 'rain';
        if (code >= 600 && code < 700) return 'snow';
        if (code >= 700 && code < 800) return 'mist';
        if (code === 800) return 'sunny';
        if (code > 800) return 'clouds';
        return 'sunny';
    }
    
    // Call weather API with default location
    fetchWeather('Himalayas');
    
    // Growing guides
    function getRabiWheatSteps() {
        return `
            <h4>Rabi - Wheat</h4>
            <h5>Step 1: Land Preparation</h5>
            <p><em>Prepare the land well in advance to ensure optimal growth conditions for Rabi wheat. Follow these sub-steps:</em></p>
          <ul>
            <li>
                Clear the land of any existing crops, weeds, and debris. 
            </li>
            <li>
                Plow the field to break up the soil and remove any clods.
            </li>
          </ul>
            <h5>Step 2: Seed selection and sowing</h5>
            <p><em>Select high-quality seeds that are specifically bred for Rabi wheat cultivation. Here's what you should do: </em></p>
          <ul>
            <li>
                Choose certified seeds from reliable sources to ensure good germination and disease resistance.
            </li>
            <li>
                Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.
            </li>
          </ul>
            <h5>Step 3: Grain Maturation and Harvest</h5>
            <ul>
            <li>
            The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.
            </li>
            <li>
            The wheat crop is ready for harvest when the grains have reached the desired maturity and moisture content.
            </li>
            </ul>
        `;
    }
    
    function getRabiBarleySteps() {
        return `
            <h4>Rabi - Barley</h4>
            <h5>Step 1: Land Preparation</h5>
            <p><em><b>Prepare the land well in advance to ensure optimal growth conditions for Rabi Barley. Follow these sub-steps:</b></em></p>
          <ul>
            <li>
                Clear the land of any existing crops, weeds, and debris. 
            </li>
            <li>
                Plow the field to break up the soil and remove any clods.
            </li>
          </ul>
            <h5>Step 2: Seed selection and sowing</h5>
            <p><em><b>Select high-quality seeds that are specifically bred for Rabi wheat cultivation. Here's what you should do:</b> </em></p>
          <ul>
            <li>
                Choose certified seeds from reliable sources to ensure good germination and disease resistance.
            </li>
            <li>
                Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.
            </li>
          </ul>
            <h5>Step 3: Grain Maturation and Harvest</h5>
            <p><em><b>The time duration for barley growth and the specific time of the year to grow barley can vary depending on various factors</b></em></p>
            <ul>
            <li>
            The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.
            </li>
            <li>
            The wheat crop is ready for harvest when the grains have reached the desired maturity and moisture content.
            </li>
            </ul>
        `;
    }

    function getKharifRiceSteps() {
        return `
            <h4>Kharif - Rice</h4>
            <h5>Step 1: Land Preparation</h5>
            <p><em><b>Prepare the land well in advance to ensure optimal growth conditions for Kharif rice. Follow these sub-steps:</b></em></p>
          <ul>
            <li>
                Clear the land of any existing crops, weeds, and debris. 
            </li>
            <li>
                Plow the field to break up the soil and remove any clods.
            </li>
          </ul>
            <h5>Step 2: Seed selection and sowing</h5>
            <p><em><b>Select high-quality seeds that are specifically bred for Rabi wheat cultivation. Here's what you should do:</b> </em></p>
          <ul>
            <li>
                Choose certified seeds from reliable sources to ensure good germination and disease resistance.
            </li>
            <li>
                Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.
            </li>
          </ul>
            <h5>Step 3: Grain Maturation and Harvest</h5>
            <p><em><b>Rice is typically categorized into two main types: "upland" or "dryland" rice and "paddy" or "wetland" rice:</b></em></p>
            <ul>
            <li>
            The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.
            </li>
            <li>
            The wheat crop is ready for harvest when the grains have reached the desired maturity and moisture content.
            </li>
            </ul>
        `;
    }

    function getKharifCornSteps() {
        return `
            <h4>Kharif - Sweet Corn</h4>
            <h5>Step 1: Land Preparation</h5>
            <p><em><b>Prepare the land well in advance to ensure optimal growth conditions for Kharif Sweet Corn. Follow these sub-steps: </b></em></p>
          <ul>
            <li>
                Clear the land of any existing crops, weeds, and debris. 
            </li>
            <li>
                Plow the field to break up the soil and remove any clods.
            </li>
          </ul>
            <h5>Step 2: Seed selection and sowing</h5>
            <p><em><b>Select high-quality seeds that are specifically bred for Rabi wheat cultivation. Here's what you should do: </b></em></p>
          <ul>
            <li>
                Choose certified seeds from reliable sources to ensure good germination and disease resistance.
            </li>
            <li>
                Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.
            </li>
          </ul>
            <h5>Step 3: Grain Maturation and Harvest</h5>
            <p><em><b>Sweet corn is a warm-season crop that thrives in areas with long, sunny days and moderate temperatures:</b></em></p>
            <ul>
            <li>
            The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.
            </li>
            <li>
            The wheat crop is ready for harvest when the grains have reached the desired maturity and moisture content.
            </li>
            </ul>
        `;
    }
    
    // Placeholder functions for other crop guides
    function getRabiMustardSteps() { return getDefaultGuideMessage(); }
    function getRabiChickpeasSteps() { return getDefaultGuideMessage(); }
    function getRabiLentilsSteps() { return getDefaultGuideMessage(); }
    function getRabiRapeseedSteps() { return getDefaultGuideMessage(); }
    function getRabiFennelSteps() { return getDefaultGuideMessage(); }
    function getKharifMilletSteps() { return getDefaultGuideMessage(); }
    function getKharifSorghumSteps() { return getDefaultGuideMessage(); }
    function getKharifPearlMilletSteps() { return getDefaultGuideMessage(); }
    function getKharifSugarcaneSteps() { return getDefaultGuideMessage(); }
    function getKharifCottonSteps() { return getDefaultGuideMessage(); }
    function getKharifGroundnutSteps() { return getDefaultGuideMessage(); }
    function getKharifSoybeansSteps() { return getDefaultGuideMessage(); }
    function getKharifTurmericSteps() { return getDefaultGuideMessage(); }
    function getKharifMaizeSteps() { return getDefaultGuideMessage(); }
    function getKharifSunflowerSteps() { return getDefaultGuideMessage(); }
    function getKharifPaddySteps() { return getDefaultGuideMessage(); }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
