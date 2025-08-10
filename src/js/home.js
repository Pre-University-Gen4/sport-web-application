// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // The API endpoint URL
    const apiUrl = 'https://sport-hub.eunglyzhia.social/api/v1/sports';

    // Get the container element from the HTML where the sport cards will be displayed
    const sportsContainer = document.getElementById('sports-container');
    const newEventsContainer = document.getElementById('new-events-container');

    // Pagination variables
    let allSports = [];
    let currentPage = 0;
    const sportsPerPage = 8;

    /**
     * Initialize hero image slider with auto-rotation and manual controls
     */
    function initHeroSlider() {
        const heroImages = [
            document.getElementById('heroImage1'),
            document.getElementById('heroImage2'),
            document.getElementById('heroImage3')
        ];

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        let currentImageIndex = 0;
        let slideInterval;

        // Function to show a specific image
        function showImage(index) {
            // Hide all images
            heroImages.forEach((img, i) => {
                if (img) {
                    img.classList.remove('fade-in');
                    img.classList.add('fade-out');
                    img.style.opacity = '0';
                    img.style.zIndex = '1';
                }
            });

            // Show current image
            if (heroImages[index]) {
                heroImages[index].classList.remove('fade-out');
                heroImages[index].classList.add('fade-in');
                heroImages[index].style.opacity = '1';
                heroImages[index].style.zIndex = '2';
            }

            currentImageIndex = index;
        }

        // Function to go to next image
        function nextImage() {
            const nextIndex = (currentImageIndex + 1) % heroImages.length;
            showImage(nextIndex);
        }

        // Function to go to previous image
        function prevImage() {
            const prevIndex = (currentImageIndex - 1 + heroImages.length) % heroImages.length;
            showImage(prevIndex);
        }

        // Function to start auto-rotation
        function startAutoRotation() {
            slideInterval = setInterval(() => {
                nextImage();
            }, 10000); // 10 seconds
        }

        // Function to reset auto-rotation
        function resetAutoRotation() {
            clearInterval(slideInterval);
            startAutoRotation();
        }

        // Initialize - show first image
        showImage(0);

        // Add event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nextImage();
                resetAutoRotation();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                prevImage();
                resetAutoRotation();
            });
        }

        // Start auto-rotation
        startAutoRotation();

        // Pause auto-rotation when user hovers over the slider
        const heroSection = document.querySelector('section.relative.w-full.h-\\[890px\\]');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            heroSection.addEventListener('mouseleave', () => {
                startAutoRotation();
            });
        }
    }

    /**
     * Fetches sports data from the API and populates the page with sport cards.
     */
    async function fetchSportsData() {
        // Display a loading message while fetching data
        if (sportsContainer) {
            sportsContainer.innerHTML = '<p class="text-center col-span-full text-gray-500">Loading sports...</p>';
        }

        try {
            // Fetch data from the API using the provided URL
            const response = await fetch(apiUrl);

            // Check if the HTTP request was successful (status code 200-299)
            if (!response.ok) {
                // If not successful, throw an error to be caught by the catch block
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }

            // Parse the JSON data from the response body
            const sports = await response.json();

            // Check if the API returned an array and it contains data
            if (Array.isArray(sports) && sports.length > 0) {
                // Store all sports for pagination
                allSports = sports;

                // Initialize new events with some items
                initNewEvents(sports.slice(0, 2));

                // Display first 8 sports cards
                displaySportsPage(0);
            } else {
                // If the array is empty, display a "not found" message
                if (sportsContainer) {
                    sportsContainer.innerHTML = '<p class="text-center col-span-full">No sports found.</p>';
                }
            }

        } catch (error) {
            // If any error occurs during the fetch operation, log it to the console
            console.error('There was a problem with the fetch operation:', error);
            // Display a user-friendly error message on the page
            if (sportsContainer) {
                sportsContainer.innerHTML = '<p class="text-center col-span-full text-red-500">Failed to load sports data. Please check your connection and try again.</p>';
            }
            if (newEventsContainer) {
                newEventsContainer.innerHTML = '<p class="text-center text-red-500">Failed to load new events.</p>';
            }
        }
    }

    /**
     * Display sports for a specific page
     */
    function displaySportsPage(page) {
        const startIndex = page * sportsPerPage;
        const endIndex = startIndex + sportsPerPage;
        const sportsToShow = allSports.slice(startIndex, endIndex);

        // Clear the container
        if (sportsContainer) {
            sportsContainer.innerHTML = '';

            // Add sports cards for this page
            sportsToShow.forEach(sport => {
                createSportCard(sport);
            });

            // Update see more button visibility
            updateSeeMoreButton(page);
        }
    }

    /**
     * Update see more button state
     */
    function updateSeeMoreButton(page) {
        const seeMoreBtn = document.getElementById('popular-see-more');
        const totalPages = Math.ceil(allSports.length / sportsPerPage);

        if (seeMoreBtn) {
            if (page + 1 >= totalPages) {
                seeMoreBtn.style.display = 'none';
            } else {
                seeMoreBtn.style.display = 'inline-block';
                seeMoreBtn.textContent = 'មើលបន្ថែម';
            }
        }
    }

    /**
     * Navigate to detail page with event data
     */
    function navigateToDetail(sport) {
        // Prepare event data for detail page
        const eventData = {
            id: sport.id || Date.now(),
            title: sport.name || 'Untitled Event',
            description: sport.description || 'No description available for this event.',
            date: sport.createdAt || new Date().toISOString(),
            location: sport.location || 'Location not specified',
            category: sport.category || 'Sports',
            image: sport.imageUrls && sport.imageUrls.length > 0 ? sport.imageUrls[0] : 'https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image',
            latitude: sport.latitude || null,
            longitude: sport.longitude || null,
            locationLink: sport.locationLink || null
        };

        // Save event data to localStorage
        localStorage.setItem('selectedEvent', JSON.stringify(eventData));

        // Navigate to detail page
        window.location.href = './src/html/detail.html';
    }

    /**
     * Creates an HTML card for a single sport and appends it to the container.
     * @param {object} sport - The sport object containing details like name, description, and imageUrls.
     */
    function createSportCard(sport) {
        // Create the main <article> element for the card
        const card = document.createElement('article');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 max-w-sm w-full cursor-pointer';

        // Add click event to navigate to detail page
        card.addEventListener('click', () => {
            navigateToDetail(sport);
        });

        // --- Card Image ---
        const img = document.createElement('img');
        // Use the first image URL from the array. If the array is empty or doesn't exist, use a placeholder.
        img.src = sport.imageUrls && sport.imageUrls.length > 0 ? sport.imageUrls[0] : 'https://placehold.co/600x400/f0f0f0/ccc?text=No+Image';
        img.alt = sport.name || 'Sport image';
        img.className = 'w-full h-48 object-cover';
        // Add an error handler in case the image link is broken
        img.onerror = () => {
            img.src = 'https://placehold.co/600x400/f0f0f0/ccc?text=Image+Error';
            img.alt = `Error loading image for ${sport.name}`;
        };

        // --- Card Content ---
        const contentSection = document.createElement('section');
        contentSection.className = 'p-4';

        // --- Card Title (h3) ---
        const title = document.createElement('h3');
        title.className = 'text-22px font-bold mb-2 leading-tight text-[#000249] truncate';
        title.textContent = sport.name || 'Untitled Sport';
        title.title = sport.name || 'Untitled Sport'; // Show full name on hover if truncated

        // --- Card Description (p) ---
        const description = document.createElement('p');
        description.className = 'text-16px text-[#000249]';
        // Use the description if available, otherwise show a default message.
        // Truncate the text to 100 characters to keep cards a consistent size.
        description.textContent = sport.description ?
            (sport.description.substring(0, 100) + (sport.description.length > 100 ? '...' : '')) :
            'No description available.';

        // Append title and description to the content section
        contentSection.appendChild(title);
        contentSection.appendChild(description);

        // Append the image and content section to the main card element
        card.appendChild(img);
        card.appendChild(contentSection);

        // Append the completed card to the main container on the webpage
        if (sportsContainer) {
            sportsContainer.appendChild(card);
        }
    }

    /**
     * Initialize manual hero slider
     */
    function initManualHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('#hero-indicators button');
        let currentSlide = 0;
        let slideInterval;

        if (slides.length === 0) return;

        // Function to show a specific slide
        function goToSlide(slideIndex) {
            slides[currentSlide].classList.add('opacity-0');
            indicators[currentSlide].classList.remove('bg-white');
            indicators[currentSlide].classList.add('bg-white/50');

            currentSlide = slideIndex;

            slides[currentSlide].classList.remove('opacity-0');
            indicators[currentSlide].classList.add('bg-white');
            indicators[currentSlide].classList.remove('bg-white/50');
        }

        // Function to reset the auto-slide interval
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                const nextIndex = (currentSlide + 1) % slides.length;
                goToSlide(nextIndex);
            }, 5000);
        }

        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
        });

        // Event listeners for next and previous buttons
        const nextButton = document.getElementById('hero-next');
        const prevButton = document.getElementById('hero-prev');

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                const nextIndex = (currentSlide + 1) % slides.length;
                goToSlide(nextIndex);
                resetInterval();
            });

            prevButton.addEventListener('click', () => {
                const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                goToSlide(prevIndex);
                resetInterval();
            });
        }

        // Start the auto-sliding
        if (slides.length > 1) {
            resetInterval();
        }
    }

    /**
     * Initialize new events section
     */
    function initNewEvents(eventsData) {
        if (!newEventsContainer || !eventsData.length) {
            if (newEventsContainer) {
                newEventsContainer.innerHTML = '<p class="text-center text-gray-500">No new events available.</p>';
            }
            return;
        }

        let currentEventIndex = 0;
        let eventInterval;

        // Clear existing content
        newEventsContainer.innerHTML = '';

        eventsData.forEach((event, index) => {
            const eventElement = document.createElement('article');
            eventElement.className = 'card-container hidden cursor-pointer';
            if (index === 0) {
                eventElement.classList.remove('hidden');
                eventElement.classList.add('block');
            }

            // Add click event to navigate to detail page
            eventElement.addEventListener('click', () => {
                navigateToDetail(event);
            });

            const imageUrl = event.imageUrls && event.imageUrls.length > 0 ? event.imageUrls[0] : 'https://placehold.co/400x300/3b82f6/ffffff?text=Event+Image';
            const eventDate = event.createdAt ? new Date(event.createdAt).toLocaleDateString() : 'No date';

            eventElement.innerHTML = `
                <section class="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 items-stretch h-[400px] hover:shadow-lg transition-shadow duration-300">
                    <section class="md:w-2/5 w-full h-[850px]">
                        <img src="${imageUrl}" alt="${event.name || 'Event'}" 
                             class="rounded-lg w-full h-full object-cover max-h-[300px]"
                             onerror="this.onerror=null;this.src='https://placehold.co/400x300/3b82f6/ffffff?text=Image+Error';">
                    </section>
                    <section class="md:w-3/5 w-full flex flex-col justify-center h-full">
                        <h3 class="text-22px font-bold lg:text-2xl my-2 leading-tight custom-text">${event.name || 'Untitled Event'}</h3>
                        <time class="text-gray-500 text-16px mb-4 english-text">${eventDate}</time>
                        <p class="text-gray-600 leading-relaxed text-justify custom-text flex-1 overflow-hidden">${event.description || 'No description available.'}</p>
                    </section>
                </section>
            `;

            newEventsContainer.appendChild(eventElement);
        });

        // Function to show a specific event
        function showNewEvent(index) {
            const events = document.querySelectorAll('#new-events-container .card-container');
            if (events.length === 0) return;

            events[currentEventIndex].classList.add('hidden');
            events[currentEventIndex].classList.remove('block');

            currentEventIndex = index;

            events[currentEventIndex].classList.remove('hidden');
            events[currentEventIndex].classList.add('block');
        }

        // Auto-rotation for events
        function startEventRotation() {
            if (eventsData.length > 1) {
                eventInterval = setInterval(() => {
                    const nextIndex = (currentEventIndex + 1) % eventsData.length;
                    showNewEvent(nextIndex);
                }, 8000);
            }
        }

        // Event listeners for navigation buttons
        const newEventsPrevBtn = document.getElementById('new-events-prev');
        const newEventsNextBtn = document.getElementById('new-events-next');

        if (newEventsPrevBtn && newEventsNextBtn) {
            newEventsPrevBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event card click
                clearInterval(eventInterval);
                const prevIndex = (currentEventIndex - 1 + eventsData.length) % eventsData.length;
                showNewEvent(prevIndex);
                startEventRotation();
            });

            newEventsNextBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event card click
                clearInterval(eventInterval);
                const nextIndex = (currentEventIndex + 1) % eventsData.length;
                showNewEvent(nextIndex);
                startEventRotation();
            });
        }

        // Start the auto-rotation
        startEventRotation();
    }

    // Event listener for see more button
    document.getElementById('popular-see-more').addEventListener('click', () => {
        currentPage++;
        const startIndex = currentPage * sportsPerPage;
        const endIndex = startIndex + sportsPerPage;
        const sportsToShow = allSports.slice(startIndex, endIndex);

        // Add new sports cards to existing ones
        sportsToShow.forEach(sport => {
            createSportCard(sport);
        });

        // Update see more button
        updateSeeMoreButton(currentPage);
    });

    // Initialize hero slider with auto-rotation
    initHeroSlider();

    // Initialize manual hero slider (keeping for compatibility)
    initManualHeroSlider();

    // Call the main function to start the process of fetching and displaying the sports data
    fetchSportsData();
});