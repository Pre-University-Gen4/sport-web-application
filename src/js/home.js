// Function to fetch sports data from the API
async function fetchSportsData() {
    const apiUrl = 'https://sport-hub.eunglyzhia.social/api/v1/sports';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch sports data:", error);
        return []; // Return an empty array in case of an error
    }
}

// Data for different sections - will be populated from the API
let heroData = [];
let newEventsData = [];
let popularEventsData = [];
let sportsCategoriesData = [];

// Hero Section Logic
let currentHeroIndex = 0;
let heroInterval;

function initHero() {
    const container = document.getElementById('hero-container');
    const indicators = document.getElementById('hero-indicators');

    if (!container || !indicators) return;

    // Clear existing content
    container.innerHTML = '';
    indicators.innerHTML = '';


    // NOTE: You may need to adjust how you select hero data from the API response.
    // Here we are assuming the first 3 items are for the hero section.
    heroData.forEach((slide, index) => {
        const slideElement = document.createElement('section');
        slideElement.className = `hero-slide absolute inset-0 w-full h-full ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
        // NOTE: Adjust 'slide.image' to match the image property from your API
        slideElement.innerHTML = `<img src="${slide.image}" alt="Hero Image" class="w-full h-full object-cover">`;
        container.appendChild(slideElement);

        // Create indicator
        const indicator = document.createElement('button');
        indicator.className = `w-3 h-3 rounded-full transition-all ${index === 0 ? 'bg-white' : 'bg-white/50'}`;
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        indicator.addEventListener('click', () => showHeroSlide(index));
        indicators.appendChild(indicator);
    });

    startHeroRotation();
}

function showHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('#hero-indicators button');

    if (slides.length === 0) return;

    slides[currentHeroIndex].classList.remove('opacity-100');
    slides[currentHeroIndex].classList.add('opacity-0');
    indicators[currentHeroIndex].classList.remove('bg-white');
    indicators[currentHeroIndex].classList.add('bg-white/50');

    currentHeroIndex = index;

    slides[currentHeroIndex].classList.remove('opacity-0');
    slides[currentHeroIndex].classList.add('opacity-100');
    indicators[currentHeroIndex].classList.remove('bg-white/50');
    indicators[currentHeroIndex].classList.add('bg-white');
}

function nextHeroSlide() {
    const nextIndex = (currentHeroIndex + 1) % heroData.length;
    showHeroSlide(nextIndex);
}

function prevHeroSlide() {
    const prevIndex = (currentHeroIndex - 1 + heroData.length) % heroData.length;
    showHeroSlide(prevIndex);
}

function startHeroRotation() {
    if (heroData.length > 1) {
        heroInterval = setInterval(nextHeroSlide, 8000);
    }
}

function stopHeroRotation() {
    clearInterval(heroInterval);
}


// New Events Section Logic
let currentNewEventIndex = 0;
let newEventInterval;

function initNewEvents() {
    const container = document.getElementById('new-events-container');
    if (!container) return;

    container.innerHTML = ''; // Clear static content

    // NOTE: You'll need to decide which events are "new".
    // This example assumes the first 2 events from the API are "new".
    newEventsData.forEach((event) => {
        const eventElement = document.createElement('article');
        eventElement.className = 'card-container hidden cursor-pointer'; // All start hidden
        // NOTE: Adjust the properties like 'event.image', 'event.title', etc.,
        // to match the fields in your API's data structure.
        eventElement.innerHTML = `
            <section class="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 items-stretch h-[400px] hover:shadow-lg transition-shadow duration-300">
                <section class="md:w-2/5 w-full">
                    <img src="${event.image}" alt="${event.title}" class="rounded-lg w-full h-full object-cover max-h-[300px]">
                </section>
                <section class="md:w-3/5 w-full flex flex-col justify-center h-full">
                    <h3 class="text-xl font-bold lg:text-2xl my-2 leading-tight khmer-text" style="color: #000249;">${event.title}</h3>
                    <time class="text-gray-500 text-sm mb-4 english-text">${new Date(event.date).toLocaleDateString()}</time>
                    <p class="text-gray-600 leading-relaxed text-justify khmer-text flex-1 overflow-hidden" style="color: #000249;">${event.description}</p>
                </section>
            </section>
        `;

        eventElement.addEventListener('click', () => {
            localStorage.setItem('selectedEvent', JSON.stringify(event));
            window.location.href = './home_detail.html';
        });

        container.appendChild(eventElement);
    });

    if (container.children.length > 0) {
        container.children[0].classList.remove('hidden');
        container.children[0].classList.add('block');
    }

    startNewEventRotation();
}


function showNewEvent(index) {
    const events = document.querySelectorAll('#new-events-container .card-container');
    if (events.length === 0) return;

    events[currentNewEventIndex].classList.add('hidden');
    events[currentNewEventIndex].classList.remove('block');

    currentNewEventIndex = index;

    events[currentNewEventIndex].classList.remove('hidden');
    events[currentNewEventIndex].classList.add('block');
}

function nextNewEvent() {
    const nextIndex = (currentNewEventIndex + 1) % newEventsData.length;
    showNewEvent(nextIndex);
}

function prevNewEvent() {
    const prevIndex = (currentNewEventIndex - 1 + newEventsData.length) % newEventsData.length;
    showNewEvent(prevIndex);
}

function startNewEventRotation() {
    if (newEventsData.length > 1) {
        newEventInterval = setInterval(nextNewEvent, 10000);
    }
}

function stopNewEventRotation() {
    clearInterval(newEventInterval);
}

// Popular Events Section Logic
let popularEventsVisible = 6;

function initPopularEvents() {
    renderPopularEvents();
}

function renderPopularEvents() {
    const container = document.getElementById('popular-events-grid');
    const seeMoreBtn = document.getElementById('popular-see-more');
    if (!container || !seeMoreBtn) return;

    container.innerHTML = '';

    const eventsToRender = popularEventsData.slice(0, popularEventsVisible);

    eventsToRender.forEach(event => {
        const eventElement = document.createElement('article');
        eventElement.className = 'bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300';
        // NOTE: Adjust property names like 'event.image', 'event.title', 'event.date'
        eventElement.innerHTML = `
            <img src="${event.image}" class="w-full h-48 object-cover" alt="${event.title}">
            <section class="p-4">
                <h3 class="text-lg card-title mb-2 leading-tight khmer-text" style="color: #000249;">${event.title}</h3>
                <time class="text-gray-400 text-xs english-text">${new Date(event.date).toLocaleDateString()}</time>
            </section>
        `;
        container.appendChild(eventElement);
    });

    if (popularEventsVisible >= popularEventsData.length) {
        seeMoreBtn.style.display = 'none';
    } else {
        seeMoreBtn.style.display = 'inline-block';
    }
}


function showMorePopularEvents() {
    popularEventsVisible += 4;
    renderPopularEvents();
}


// Sports Categories Section Logic
let sportsCategoriesVisible = 6;

function initSportsCategories() {
    renderSportsCategories();
}

function renderSportsCategories() {
    const container = document.getElementById('sports-categories-grid');
    const seeMoreBtn = document.getElementById('sports-see-more');
    if (!container || !seeMoreBtn) return;

    container.innerHTML = '';

    const categoriesToRender = sportsCategoriesData.slice(0, sportsCategoriesVisible);

    categoriesToRender.forEach(sport => {
        const sportElement = document.createElement('article');
        sportElement.className = 'bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300';
        // NOTE: Adjust property names like 'sport.image', 'sport.title', 'sport.description'
        sportElement.innerHTML = `
            <img src="${sport.image}" class="w-full h-48 object-cover" alt="${sport.title}">
            <section class="p-4">
                <h3 class="text-lg card-title mb-2 leading-tight khmer-text" style="color: #000249;">${sport.title}</h3>
                <p class="text-sm khmer-text" style="color: #000249;">${sport.description}</p>
            </section>
        `;
        container.appendChild(sportElement);
    });

    if (sportsCategoriesVisible >= sportsCategoriesData.length) {
        seeMoreBtn.style.display = 'none';
    } else {
        seeMoreBtn.style.display = 'inline-block';
    }
}

function showMoreSportsCategories() {
    sportsCategoriesVisible += 4;
    renderSportsCategories();
}

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', async function() {
    const allSports = await fetchSportsData();

    if (allSports && allSports.length > 0) {
        // --- DATA MAPPING ---
        // NOTE: This is where you map your API data to the different sections.
        // You may need to adjust this logic based on your API's structure.
        // For example, you might have different API endpoints for each section.

        // Example: Use the first 3 for the hero section
        heroData = allSports.slice(0, 3).map(item => ({ image: item.thumbnail_url })); // Adjust property name

        // Example: Use the next 2 as "new" events
        newEventsData = allSports.slice(3, 5).map(item => ({
            image: item.thumbnail_url,
            title: item.name,
            date: item.created_at, // or another date field
            description: item.description,
            category: item.category ? item.category.name : 'General' // Example of handling nested object
        }));

        // Example: Use the rest as "popular" events
        popularEventsData = allSports.slice(5).map(item => ({
            image: item.thumbnail_url,
            title: item.name,
            date: item.created_at
        }));

        // Example: Use all of them for the sports categories
        sportsCategoriesData = allSports.map(item => ({
            image: item.thumbnail_url,
            title: item.name,
            description: item.description
        }));


        // --- INITIALIZE SECTIONS ---
        initHero();
        initNewEvents();
        initPopularEvents();
        initSportsCategories();
    }


    // Hero navigation
    const heroPrevBtn = document.getElementById('hero-prev');
    const heroNextBtn = document.getElementById('hero-next');
    if (heroPrevBtn && heroNextBtn) {
        heroPrevBtn.addEventListener('click', () => {
            stopHeroRotation();
            prevHeroSlide();
            startHeroRotation();
        });
        heroNextBtn.addEventListener('click', () => {
            stopHeroRotation();
            nextHeroSlide();
            startHeroRotation();
        });
    }

    // New events navigation
    const newEventsPrevBtn = document.getElementById('new-events-prev');
    const newEventsNextBtn = document.getElementById('new-events-next');
    if (newEventsPrevBtn && newEventsNextBtn) {
        newEventsPrevBtn.addEventListener('click', () => {
            stopNewEventRotation();
            prevNewEvent();
            startNewEventRotation();
        });
        newEventsNextBtn.addEventListener('click', () => {
            stopNewEventRotation();
            nextNewEvent();
            startNewEventRotation();
        });
    }

    // See more buttons
    const popularSeeMoreBtn = document.getElementById('popular-see-more');
    if (popularSeeMoreBtn) {
        popularSeeMoreBtn.addEventListener('click', showMorePopularEvents);
    }

    const sportsSeeMoreBtn = document.getElementById('sports-see-more');
    if (sportsSeeMoreBtn) {
        sportsSeeMoreBtn.addEventListener('click', showMoreSportsCategories);
    }
});