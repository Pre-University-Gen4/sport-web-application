// --- UPDATED: Global variables now refer to events from API ---
let eventsData = []; // Stores all events from API
let filteredEvents = []; // Stores filtered events
let favoriteEvents = new Set(); // Stores favorite event IDs
let showOnlyFavorites = false;
let currentDisplayCount = 6;
const LOAD_MORE_COUNT = 3;

// --- Helper Functions ---

function generateId() {
    return Date.now() + Math.random();
}

function formatDateToEnglish(dateStr) {
    if (!dateStr) return 'Date not available';
    const date = new Date(dateStr);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

// --- Data Fetching and Mapping ---

/**
 * Maps an event object from the API to a card format.
 * @param {object} event - An event object from the API
 * @returns {object} - An object formatted for display in a card
 */
function mapEventToCardData(event) {
    // Extract category name, handle both direct category objects and nested category objects
    let categoryName = 'uncategorized';

    if (event.category && event.category.name) {
        categoryName = event.category.name.toLowerCase();
    }

    // Map common category variations to standard names
    const categoryMappings = {
        'basket ball': 'basketball',
        'taekwondo': 'taekwondo',
        'sea games': 'games',
        'sport game': 'games',
        'olympics': 'olympics',
        'uncategorized': 'uncategorized'
    };

    // Apply category mapping if available
    const mappedCategory = categoryMappings[categoryName] || categoryName;

    return {
        id: event.id,
        uuid: event.uuid,
        title: event.name,
        description: event.description || 'No description available',
        date: event.createdAt, // Using createdAt as the event date
        location: event.locationName || 'Location not specified',
        latitude: event.latitude,
        longitude: event.longitude,
        category: mappedCategory,
        categoryDisplay: event.category ? event.category.name : 'Uncategorized',
        image: event.imageUrls && event.imageUrls.length > 0 ? event.imageUrls[0] : 'https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image'
    };
}

/**
 * Fetches events data from the API to initialize the application.
 */
async function fetchAndInitializeData() {
    try {
        const response = await fetch('https://sport-hub.eunglyzhia.social/api/v1/events');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiData = await response.json();

        // Map the events data to the format our cards expect
        eventsData = apiData.map(mapEventToCardData);
        filteredEvents = [...eventsData];

        console.log('Fetched events:', eventsData.length); // Debug log
        console.log('Event categories found:', [...new Set(eventsData.map(e => e.category))]); // Debug log

        // Now that data is loaded, render the initial cards
        renderCards();

        // Return a promise to indicate completion
        return Promise.resolve();

    } catch (error) {
        console.error("Failed to fetch events:", error);
        const eventsContainer = document.getElementById('eventsContainer');
        eventsContainer.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <p class="text-gray-500 text-lg">Failed to load events. Please try again later.</p>
                <button onclick="fetchAndInitializeData()" class="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover">
                    Try Again
                </button>
            </div>
        `;
        document.getElementById('seeMoreBtn').classList.add('hidden');
        return Promise.reject(error);
    }
}

/**
 * Fetches sport categories and populates the filter dropdown.
 * Also adds categories found in events for comprehensive filtering.
 */
async function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    try {
        // Fetch categories from sport categories API
        const response = await fetch('https://sport-hub.eunglyzhia.social/api/v1/sport_categories');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();

        // Start with "All Categories" option
        let optionsHTML = '<option value="">All Categories</option>';

        // Create a set to track unique categories
        const uniqueCategories = new Set();

        // Add categories from the sport categories API
        categories.forEach(category => {
            const categoryKey = category.name.toLowerCase();
            const displayName = category.name;

            // Map common variations
            let filterValue = categoryKey;
            if (categoryKey === 'basket ball') filterValue = 'basketball';
            else if (categoryKey === 'sport game') filterValue = 'games';
            else if (categoryKey === 'sea games') filterValue = 'games';

            if (!uniqueCategories.has(filterValue)) {
                uniqueCategories.add(filterValue);
                optionsHTML += `<option value="${filterValue}">${displayName}</option>`;
            }
        });

        // Add categories found in events data (if eventsData is loaded)
        if (eventsData && eventsData.length > 0) {
            const eventCategories = [...new Set(eventsData.map(event => event.category))];
            eventCategories.forEach(category => {
                if (category && !uniqueCategories.has(category)) {
                    uniqueCategories.add(category);
                    const displayName = category.charAt(0).toUpperCase() + category.slice(1);
                    optionsHTML += `<option value="${category}">${displayName}</option>`;
                }
            });
        }

        // Add "Uncategorized" option
        if (!uniqueCategories.has('uncategorized')) {
            optionsHTML += '<option value="uncategorized">Uncategorized</option>';
        }

        categoryFilter.innerHTML = optionsHTML;

    } catch (error) {
        console.error("Failed to fetch sport categories:", error);

        // Fallback: Create categories from events data if available
        if (eventsData && eventsData.length > 0) {
            let fallbackHTML = '<option value="">All Categories</option>';
            const eventCategories = [...new Set(eventsData.map(event => event.category))];
            eventCategories.forEach(category => {
                if (category) {
                    const displayName = category.charAt(0).toUpperCase() + category.slice(1);
                    fallbackHTML += `<option value="${category}">${displayName}</option>`;
                }
            });
            categoryFilter.innerHTML = fallbackHTML;
        } else {
            categoryFilter.innerHTML = '<option value="">Error loading categories</option>';
            categoryFilter.disabled = true;
        }
    }
}

// --- UI Functions ---

/**
 * Creates a card for an event.
 */
function createEventCard(eventItem) {
    const isFavorite = favoriteEvents.has(eventItem.id);

    const dateElement = eventItem.date ? `
        <div class="flex items-center text-gray-500 text-sm mb-2">
            <i class="fas fa-calendar-alt mr-2"></i>
            <span>${formatDateToEnglish(eventItem.date)}</span>
        </div>` : '';

    // Use categoryDisplay if available, otherwise format the category
    const categoryDisplayName = eventItem.categoryDisplay ||
        (eventItem.category.charAt(0).toUpperCase() + eventItem.category.slice(1));

    return `
        <article class="bg-white rounded-lg shadow-md overflow-hidden card-hover" data-category="${eventItem.category}" data-event-id="${eventItem.id}" onclick="navigateToEventDetail(${eventItem.id})">
            <figure class="aspect-video relative">
                <div class="category-badge">${categoryDisplayName}</div>
                <img src="${eventItem.image}" alt="${eventItem.title}" class="event-image w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image';">
                <div class="absolute top-3 right-3 heart-circle">
                    <i class="fas fa-heart ${isFavorite ? 'text-red-500' : 'text-gray-300'} cursor-pointer text-sm" data-event-id="${eventItem.id}" onclick="event.stopPropagation(); toggleFavoriteHeart(this, ${eventItem.id})"></i>
                </div>
            </figure>
            <div class="p-4">
                <h3 class="font-semibold custom-text mb-2 khmer-text line-clamp-2" title="${eventItem.title}">${eventItem.title}</h3>
                ${dateElement}
                <address class="flex items-center text-gray-500 text-sm not-italic mb-2">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    <span class="truncate">${eventItem.location}</span>
                </address>
                <p class="text-gray-600 text-16px line-clamp-3">${eventItem.description}</p>
            </div>
        </article>
    `;
}

/**
 * Navigation logic for event details.
 */
function navigateToEventDetail(eventId) {
    const selectedEvent = eventsData.find(event => event.id === eventId);
    if (selectedEvent) {
        console.log("Navigating to detail for event:", selectedEvent);

        // Prepare event data for detail page with proper structure
        const eventForDetail = {
            id: selectedEvent.id,
            uuid: selectedEvent.uuid,
            title: selectedEvent.title,
            description: selectedEvent.description,
            date: selectedEvent.date,
            location: selectedEvent.location,
            latitude: selectedEvent.latitude,
            longitude: selectedEvent.longitude,
            category: selectedEvent.categoryDisplay || selectedEvent.category,
            image: selectedEvent.image,
            // Create Google Maps embed URL
            locationLink: `https://maps.google.com/maps?q=${selectedEvent.latitude},${selectedEvent.longitude}&output=embed&z=15`
        };

        // Store event data for detail page
        localStorage.setItem('selectedEvent', JSON.stringify(eventForDetail));

        // Navigate to detail page
        window.location.href = './../html/detail.html';
    } else {
        console.error('Event not found with ID:', eventId);
        alert('Sorry, event details could not be loaded.');
    }
}

/**
 * Toggles the favorite status for an event.
 */
function toggleFavoriteHeart(heartElement, eventId) {
    if (favoriteEvents.has(eventId)) {
        favoriteEvents.delete(eventId);
        heartElement.classList.remove('text-red-500');
        heartElement.classList.add('text-gray-300');
    } else {
        favoriteEvents.add(eventId);
        heartElement.classList.add('text-red-500');
        heartElement.classList.remove('text-gray-300');
    }
    updateFavoriteCount();

    if (showOnlyFavorites) {
        applyFilters();
    }
}

/**
 * Updates the favorite count based on events.
 */
function updateFavoriteCount() {
    const favoriteCount = document.getElementById('favoriteCount');
    const count = favoriteEvents.size;
    if (count > 0) {
        favoriteCount.textContent = count;
        favoriteCount.classList.remove('hidden');
    } else {
        favoriteCount.classList.add('hidden');
    }
}

/**
 * Renders the event cards.
 */
function renderCards(append = false) {
    const eventsContainer = document.getElementById('eventsContainer');
    const seeMoreBtn = document.getElementById('seeMoreBtn');

    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i class="fas fa-search text-gray-400 text-4xl mb-4"></i>
                <p class="text-gray-500 text-lg">No events found matching your criteria</p>
                <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover">
                    Clear Filters
                </button>
            </div>
        `;
        seeMoreBtn.classList.add('hidden');
        return;
    }

    const cardsToShow = filteredEvents.slice(0, currentDisplayCount);

    eventsContainer.innerHTML = cardsToShow
        .map(eventItem => createEventCard(eventItem))
        .join('');

    if (currentDisplayCount >= filteredEvents.length) {
        seeMoreBtn.classList.add('hidden');
    } else {
        seeMoreBtn.classList.remove('hidden');
    }
}

/**
 * Resets all filters to show all events.
 */
function resetFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('searchInput').value = '';
    showOnlyFavorites = false;
    const favoriteBtn = document.getElementById('favoriteBtn');
    favoriteBtn.classList.remove('text-red-500');
    favoriteBtn.classList.add('text-gray-600');
    applyFilters();
}

// --- Initialization Functions ---

/**
 * Applies filters to the list of events.
 */
function initFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');

    window.applyFilters = function() { // Made global
        const selectedCategory = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        // Filter the main eventsData array
        filteredEvents = eventsData.filter(event => {
            const favoriteMatch = !showOnlyFavorites || favoriteEvents.has(event.id);
            const categoryMatch = !selectedCategory || event.category.toLowerCase() === selectedCategory.toLowerCase();
            const searchMatch = !searchTerm ||
                event.title.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm);
            return favoriteMatch && categoryMatch && searchMatch;
        });

        currentDisplayCount = 6;
        renderCards();
    }

    categoryFilter.addEventListener('change', window.applyFilters);
    searchInput.addEventListener('input', window.applyFilters);
}

/**
 * See More logic to load more event cards.
 */
function initSeeMore() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    seeMoreBtn.addEventListener('click', function() {
        currentDisplayCount += LOAD_MORE_COUNT;
        renderCards();
    });
}

/**
 * Initialize manual image navigation for hero slider.
 */
function initManualImageNavigation() {
    const images = ['heroImage1', 'heroImage2', 'heroImage3'];
    let currentImageIndex = 0;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showImage(index) {
        images.forEach((imageId, i) => {
            const img = document.getElementById(imageId);
            if (img) {
                if (i === index) {
                    img.classList.remove('fade-out');
                    img.classList.add('fade-in');
                } else {
                    img.classList.remove('fade-in');
                    img.classList.add('fade-out');
                }
            }
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        });
    }
}

// --- DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing event page...'); // Debug log

    // Fetch and initialize events data first
    fetchAndInitializeData().then(() => {
        // After events are loaded, populate category filter with both API categories and event categories
        populateCategoryFilter();
    });

    // Initialize all other functionality
    initManualImageNavigation();
    initFilters();
    initSeeMore();

    // Favorite button functionality
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            showOnlyFavorites = !showOnlyFavorites;
            this.classList.toggle('text-red-500', showOnlyFavorites);
            this.classList.toggle('text-gray-600', !showOnlyFavorites);
            window.applyFilters();
        });
    }
});

/**
 * Initialize manual image navigation for hero slider with auto-rotation.
 */
function initManualImageNavigation() {
    const images = ['heroImage1', 'heroImage2', 'heroImage3'];
    let currentImageIndex = 0;
    let autoRotateInterval;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showImage(index) {
        images.forEach((imageId, i) => {
            const img = document.getElementById(imageId);
            if (img) {
                if (i === index) {
                    img.classList.remove('fade-out');
                    img.classList.add('fade-in');
                } else {
                    img.classList.remove('fade-in');
                    img.classList.add('fade-out');
                }
            }
        });
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    }

    function startAutoRotate() {
        autoRotateInterval = setInterval(nextImage, 10000); // 10 seconds
    }

    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
    }

    function restartAutoRotate() {
        stopAutoRotate();
        startAutoRotate();
    }

    // Manual navigation event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevImage();
            restartAutoRotate(); // Restart auto-rotation after manual navigation
        });

        nextBtn.addEventListener('click', () => {
            nextImage();
            restartAutoRotate(); // Restart auto-rotation after manual navigation
        });
    }

    // Start auto-rotation when page loads
    startAutoRotate();

    // Optional: Pause auto-rotation when user hovers over the hero section
    const heroSection = document.querySelector('.relative figure');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoRotate);
        heroSection.addEventListener('mouseleave', startAutoRotate);
    }
}

// Add this code to your existing event.js file
// Replace the existing postEventBtn event listener with this complete modal functionality

// Post Event Modal functionality
function initPostEventModal() {
    const postEventBtn = document.getElementById('postEventBtn');
    const postEventModal = document.getElementById('postEventModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const eventForm = document.getElementById('eventForm');
    const eventImage = document.getElementById('eventImage');
    const imagePreview = document.getElementById('imagePreview');

    // Show modal when post button is clicked
    if (postEventBtn) {
        postEventBtn.addEventListener('click', function() {
            postEventModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Hide modal functions
    function hideModal() {
        postEventModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        resetForm();
    }

    // Close modal when X button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    // Close modal when Cancel button is clicked
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideModal);
    }

    // Close modal when clicking outside the modal content
    postEventModal.addEventListener('click', function(e) {
        if (e.target === postEventModal) {
            hideModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && postEventModal.classList.contains('active')) {
            hideModal();
        }
    });

    // Image preview functionality
    if (eventImage) {
        eventImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Form submission
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                title: document.getElementById('eventTitle').value,
                description: document.getElementById('eventDescription').value,
                date: document.getElementById('eventDate').value,
                location: document.getElementById('eventLocation').value,
                latitude: parseFloat(document.getElementById('eventLatitude').value),
                longitude: parseFloat(document.getElementById('eventLongitude').value),
                category: document.getElementById('eventCategory').value,
                image: eventImage.files[0]
            };

            // Here you would typically send the data to your API
            console.log('Event data to submit:', formData);

            // Show success message (replace with actual API call)
            alert('Event posted successfully!');

            // Hide modal and reset form
            hideModal();
        });
    }

    // Reset form function
    function resetForm() {
        if (eventForm) {
            eventForm.reset();
        }
        if (imagePreview) {
            imagePreview.classList.add('hidden');
            imagePreview.src = '';
        }
    }
}

// Update your DOMContentLoaded event listener to include the modal initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing event page...'); // Debug log

    // Fetch and initialize events data first
    fetchAndInitializeData().then(() => {
        // After events are loaded, populate category filter with both API categories and event categories
        populateCategoryFilter();
    });

    // Initialize all functionality
    initManualImageNavigation();
    initFilters();
    initSeeMore();
    initPostEventModal(); // Add this line

    // Favorite button functionality
    const favoriteBtn = document.getElementById('favoriteBtn');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            showOnlyFavorites = !showOnlyFavorites;
            this.classList.toggle('text-red-500', showOnlyFavorites);
            this.classList.toggle('text-gray-600', !showOnlyFavorites);
            window.applyFilters();
        });
    }

    // Remove or comment out the old postEventBtn event listener that just shows an alert
    // const postEventBtn = document.getElementById('postEventBtn');
    // if (postEventBtn) {
    //     postEventBtn.addEventListener('click', function() {
    //         alert('Post Event functionality would be implemented here');
    //     });
    // }
});