// Wait for the HTML document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // The API endpoint URL
    const apiUrl = "https://sport-hub.eunglyzhia.social/api/v1/sports";

    // Get the container element from the HTML where the sport cards will be displayed
    const sportsContainer = document.getElementById("sports-container");
    const newEventsContainer = document.getElementById("new-events-container");

    // Pagination variables
    let allSports = [];
    let currentPage = 0;
    const sportsPerPage = 8;

    /**
     * Initializes the hamburger menu for mobile view.
     */
    function initHamburgerMenu() {
        const menuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");

        if (menuButton && mobileMenu) {
            menuButton.addEventListener("click", () => {
                mobileMenu.classList.toggle("hidden");
            });
        }
    }

    /**
     * Initialize modern hero slider with smooth transitions
     */
    function initModernHeroSlider() {
        const slides = document.querySelectorAll(".slide");
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");
        const dotsContainer = document.querySelector(".slider-dots");
        const heroSlider = document.querySelector(".hero-slider");

        if (!slides.length || !prevBtn || !nextBtn || !dotsContainer || !heroSlider) {
            console.error("Slider component not found. Please check your HTML structure.");
            return;
        }

        let currentIndex = 0;
        const slideCount = slides.length;
        let autoPlayInterval;

        // --- Create Navigation Dots ---
        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.addEventListener("click", () => {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        });
        const dots = dotsContainer.querySelectorAll(".dot");

        // --- Core Function to Change Slide ---
        function goToSlide(index) {
            if (index < 0) index = slideCount - 1;
            if (index >= slideCount) index = 0;

            currentIndex = index;

            slides.forEach((slide, i) => {
                slide.classList.remove("active");
                if (i === currentIndex) {
                    slide.classList.add("active");

                    const aosElements = slide.querySelectorAll("[data-aos]");
                    aosElements.forEach((el) => el.classList.remove("aos-animate"));
                    setTimeout(() => {
                        aosElements.forEach((el) => el.classList.add("aos-animate"));
                    }, 50);
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });
        }

        // --- Navigation Functions ---
        const nextSlide = () => goToSlide(currentIndex + 1);
        const prevSlide = () => goToSlide(currentIndex - 1);

        // --- Auto-Play Functionality ---
        const startAutoPlay = () => (autoPlayInterval = setInterval(nextSlide, 5000));
        const stopAutoPlay = () => clearInterval(autoPlayInterval);
        const resetAutoPlay = () => { stopAutoPlay();
            startAutoPlay(); };

        // --- Event Listeners ---
        nextBtn.addEventListener("click", () => { nextSlide();
            resetAutoPlay(); });
        prevBtn.addEventListener("click", () => { prevSlide();
            resetAutoPlay(); });
        heroSlider.addEventListener("mouseenter", stopAutoPlay);
        heroSlider.addEventListener("mouseleave", startAutoPlay);

        // --- Initialize Slider ---
        goToSlide(0);
        startAutoPlay();
    }

    /**
     * Fetches sports data from the API and populates the page with sport cards.
     */
    async function fetchSportsData() {
        if (sportsContainer) {
            sportsContainer.innerHTML =
                '<p class="text-center col-span-full text-gray-500 custom-text">Loading sports...</p>';
        }
        if (newEventsContainer) {
            newEventsContainer.innerHTML =
                '<p class="text-center text-gray-500 custom-text">Loading new events...</p>';
        }

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}`);
            const sports = await response.json();

            if (Array.isArray(sports) && sports.length > 0) {
                allSports = sports;

                initNewEvents(sports.slice(0, 5));

                displaySportsPage(0);
            } else {
                if (sportsContainer) {
                    sportsContainer.innerHTML =
                        '<p class="text-center col-span-full">No sports found.</p>';
                }
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);

            const newEventsSection = document.getElementById("new-events-section");
            const popularSportsSection = document.getElementById("popular-sports-section");
            const seeMoreNav = document.getElementById("popular-see-more") ? .parentElement;

            if (newEventsSection) newEventsSection.style.display = "none";
            if (popularSportsSection) popularSportsSection.style.display = "none";
            if (seeMoreNav) seeMoreNav.style.display = "none";

            const errorContainer = document.getElementById("error-404-container");
            if (errorContainer) {
                errorContainer.classList.remove("hidden");
                errorContainer.classList.add("flex");
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

        if (page === 0 && sportsContainer) {
            sportsContainer.innerHTML = "";
        }

        sportsToShow.forEach((sport) => {
            createSportCard(sport);
        });

        updateSeeMoreButton();
    }

    /**
     * Update see more button state
     */
    function updateSeeMoreButton() {
        const seeMoreBtn = document.getElementById("popular-see-more");
        if (!seeMoreBtn) return;

        const currentlyDisplayed = sportsContainer.children.length;
        seeMoreBtn.style.display = currentlyDisplayed >= allSports.length ? "none" : "inline-block";
    }

    /**
     * Navigate to detail page with event data
     */
    function navigateToDetail(sport) {
        const eventData = {
            id: sport.id || Date.now(),
            uuid: sport.uuid,
            title: sport.name || "Untitled Event",
            description: sport.description || "No description available for this event.",
            date: sport.createdAt || new Date().toISOString(),
            location: sport.location || "Location not specified",
            category: sport.category ? .name || "Sports",
            image: sport.imageUrls ? .[0] || "https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image",
            latitude: sport.latitude || null,
            longitude: sport.longitude || null,
            locationLink: sport.locationLink || null,
        };

        localStorage.setItem("selectedEvent", JSON.stringify(eventData));
        window.location.href = "./src/html/detail.html";
    }

    /**
     * Creates an HTML card for a single sport and appends it to the container.
     */
    function createSportCard(sport) {
        if (!sportsContainer) return;

        const card = document.createElement("article");
        card.className =
            "bg-white rounded-lg border border-gray-200 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 max-w-sm w-full cursor-pointer";

        card.addEventListener("click", () => {
            navigateToDetail(sport);
        });

        const imageUrl = sport.imageUrls ? .[0] || "https://placehold.co/600x400/f0f0f0/ccc?text=No+Image";

        card.innerHTML = `
        <figure class="h-48 overflow-hidden">
            <img src="${imageUrl}" alt="${sport.name || "Sport image"}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" onerror="this.onerror=null;this.src='https://placehold.co/600x400/f0f0f0/ccc?text=Image+Error';">
        </figure>
        <section class="p-4">
            <h3 class="text-lg font-bold mb-2 custom-text truncate" title="${sport.name || "Untitled Sport"}">${sport.name || "Untitled Sport"}</h3>
            <p class="text-sm text-gray-600 line-clamp-3">${sport.description || "No description available."}</p>
        </section>
    `;

        sportsContainer.appendChild(card);
    }

    /**
     * Initialize new events section
     */
    function initNewEvents(eventsData) {
        if (!newEventsContainer || !eventsData.length) {
            if (newEventsContainer) {
                newEventsContainer.innerHTML =
                    '<p class="text-center text-gray-500">No new events available.</p>';
            }
            return;
        }

        let currentEventIndex = 0;
        let eventInterval;

        newEventsContainer.innerHTML = "";

        eventsData.forEach((event, index) => {
            const eventElement = document.createElement("article");
            eventElement.className =
                "new-event-card w-full flex-shrink-0 cursor-pointer";
            if (index !== 0) eventElement.classList.add("hidden");

            eventElement.addEventListener("click", () => {
                navigateToDetail(event);
            });

            const imageUrl = event.imageUrls ? .[0] || "https://placehold.co/400x300/3b82f6/ffffff?text=Event+Image";
            const eventDate = event.createdAt ?
                new Date(event.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) :
                "No date";

            eventElement.innerHTML = `
          <section class="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 flex flex-col md:flex-row gap-6 items-stretch w-full h-auto md:h-[350px] transition-shadow duration-300">
              <figure class="md:w-2/5 w-full h-64 md:h-full">
                  <img src="${imageUrl}" alt="${event.name || "Event"}" 
                       class="rounded-lg w-full h-full object-cover"
                       onerror="this.onerror=null;this.src='https://placehold.co/400x300/3b82f6/ffffff?text=Image+Error';">
              </figure>
              <section class="md:w-3/5 w-full flex flex-col justify-center">
                  <h3 class="text-xl font-bold lg:text-2xl my-2 leading-tight custom-text">${event.name || "Untitled Event"}</h3>
                  <time class="text-gray-500 text-sm mb-4 english-text">${eventDate}</time>
                  <p class="text-gray-600 leading-relaxed text-base custom-text flex-1 overflow-hidden line-clamp-4">${event.description || "No description available."}</p>
              </section>
          </section>
      `;

            newEventsContainer.appendChild(eventElement);
        });

        newEventsContainer.classList.add("flex", "transition-transform", "duration-500", "ease-in-out");

        function showNewEvent(index) {
            const events = document.querySelectorAll(".new-event-card");
            if (!events.length) return;

            events.forEach((card) => card.classList.add("hidden"));
            events[index].classList.remove("hidden");
            currentEventIndex = index;
        }

        function startEventRotation() {
            if (eventsData.length > 1) {
                eventInterval = setInterval(() => {
                    const nextIndex = (currentEventIndex + 1) % eventsData.length;
                    showNewEvent(nextIndex);
                }, 8000);
            }
        }

        const newEventsPrevBtn = document.getElementById("new-events-prev");
        const newEventsNextBtn = document.getElementById("new-events-next");

        if (newEventsPrevBtn && newEventsNextBtn) {
            newEventsPrevBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                clearInterval(eventInterval);
                const prevIndex = (currentEventIndex - 1 + eventsData.length) % eventsData.length;
                showNewEvent(prevIndex);
                startEventRotation();
            });

            newEventsNextBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                clearInterval(eventInterval);
                const nextIndex = (currentEventIndex + 1) % eventsData.length;
                showNewEvent(nextIndex);
                startEventRotation();
            });
        }

        startEventRotation();
    }

    // Event listener for see more button
    const seeMoreBtn = document.getElementById("popular-see-more");
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener("click", () => {
            currentPage++;
            displaySportsPage(currentPage);
        });
    }

    // Initialize hamburger menu
    initHamburgerMenu();

    // Initialize modern hero slider
    initModernHeroSlider();

    // Fetch sports data
    fetchSportsData();
});