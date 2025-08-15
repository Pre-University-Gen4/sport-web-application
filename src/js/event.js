// --- UPDATED: Global variables now refer to events from API ---
let eventsData = []; // Stores all events from API
let filteredEvents = []; // Stores filtered events
let favoriteEvents = new Set(); // Stores favorite event IDs
let showOnlyFavorites = false;
let currentDisplayCount = 6;
const LOAD_MORE_COUNT = 3;

// --- Helper Functions ---

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

function generateId() {
  return Date.now() + Math.random();
}

function formatDateToEnglish(dateStr) {
  if (!dateStr) return "Date not available";
  const date = new Date(dateStr);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// --- Data Fetching and Mapping ---

/**
 * Maps an event object from the API to a card format.
 * @param {object} event - An event object from the API
 * @returns {object} - An object formatted for display in a card
 */
function mapEventToCardData(event) {
  // Extract category name, handle both direct category objects and nested category objects
  let categoryName = "uncategorized";

  if (event.category && event.category.name) {
    categoryName = event.category.name.toLowerCase();
  }

  // Map common category variations to standard names
  const categoryMappings = {
    "basket ball": "basketball",
    taekwondo: "taekwondo",
    "sea games": "games",
    "sport game": "games",
    olympics: "olympics",
    uncategorized: "uncategorized",
  };

  // Apply category mapping if available
  const mappedCategory = categoryMappings[categoryName] || categoryName;

  return {
    id: event.id,
    uuid: event.uuid,
    title: event.name,
    description: event.description || "No description available",
    date: event.createdAt, // Using createdAt as the event date
    location: event.locationName || "Location not specified",
    latitude: event.latitude,
    longitude: event.longitude,
    category: mappedCategory,
    categoryDisplay: event.category ? event.category.name : "Uncategorized",
    image:
      event.imageUrls && event.imageUrls.length > 0
        ? event.imageUrls[0]
        : "https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image",
  };
}

/**
 * Fetches events data from the API to initialize the application.
 */
async function fetchAndInitializeData() {
  try {
    const response = await fetch(
      "https://sport-hub.eunglyzhia.social/api/v1/events"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiData = await response.json();

    // Map the events data to the format our cards expect
    eventsData = apiData.map(mapEventToCardData);
    filteredEvents = [...eventsData];

    console.log("Fetched events:", eventsData.length); // Debug log
    console.log("Event categories found:", [
      ...new Set(eventsData.map((e) => e.category)),
    ]); // Debug log

    // Now that data is loaded, render the initial cards
    renderCards();

    // Return a promise to indicate completion
    return Promise.resolve();
  } catch (error) {
    console.error("Failed to fetch events:", error);
    const eventsContainer = document.getElementById("eventsContainer");
    eventsContainer.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <p class="text-gray-500 text-lg">Failed to load events. Please try again later.</p>
                <button onclick="fetchAndInitializeData()" class="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover">
                    Try Again
                </button>
            </div>
        `;
    document.getElementById("seeMoreBtn").classList.add("hidden");
    return Promise.reject(error);
  }
}

/**
 * Fetches sport categories and populates the filter dropdown.
 * Also adds categories found in events for comprehensive filtering.
 */
async function populateCategoryFilter() {
  const categoryFilter = document.getElementById("categoryFilter");
  try {
    // Fetch categories from sport categories API
    const response = await fetch(
      "https://sport-hub.eunglyzhia.social/api/v1/sport_categories"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories = await response.json();

    // Start with "All Categories" option
    let optionsHTML = '<option value="">All Categories</option>';

    // Create a set to track unique categories
    const uniqueCategories = new Set();

    // Add categories from the sport categories API
    categories.forEach((category) => {
      const categoryKey = category.name.toLowerCase();
      const displayName = category.name;

      // Map common variations
      let filterValue = categoryKey;
      if (categoryKey === "basket ball") filterValue = "basketball";
      else if (categoryKey === "sport game") filterValue = "games";
      else if (categoryKey === "sea games") filterValue = "games";

      if (!uniqueCategories.has(filterValue)) {
        uniqueCategories.add(filterValue);
        optionsHTML += `<option value="${filterValue}">${displayName}</option>`;
      }
    });

    // Add categories found in events data (if eventsData is loaded)
    if (eventsData && eventsData.length > 0) {
      const eventCategories = [
        ...new Set(eventsData.map((event) => event.category)),
      ];
      eventCategories.forEach((category) => {
        if (category && !uniqueCategories.has(category)) {
          uniqueCategories.add(category);
          const displayName =
            category.charAt(0).toUpperCase() + category.slice(1);
          optionsHTML += `<option value="${category}">${displayName}</option>`;
        }
      });
    }

    // Add "Uncategorized" option
    if (!uniqueCategories.has("uncategorized")) {
      optionsHTML += '<option value="uncategorized">Uncategorized</option>';
    }

    categoryFilter.innerHTML = optionsHTML;
  } catch (error) {
    console.error("Failed to fetch sport categories:", error);

    // Fallback: Create categories from events data if available
    if (eventsData && eventsData.length > 0) {
      let fallbackHTML = '<option value="">All Categories</option>';
      const eventCategories = [
        ...new Set(eventsData.map((event) => event.category)),
      ];
      eventCategories.forEach((category) => {
        if (category) {
          const displayName =
            category.charAt(0).toUpperCase() + category.slice(1);
          fallbackHTML += `<option value="${category}">${displayName}</option>`;
        }
      });
      categoryFilter.innerHTML = fallbackHTML;
    } else {
      categoryFilter.innerHTML =
        '<option value="">Error loading categories</option>';
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

  const dateElement = eventItem.date
    ? `
        <div class="flex items-center text-gray-500 text-sm mb-2">
            <i class="fas fa-calendar-alt mr-2"></i>
            <span>${formatDateToEnglish(eventItem.date)}</span>
        </div>`
    : "";

  // Use categoryDisplay if available, otherwise format the category
  const categoryDisplayName =
    eventItem.categoryDisplay ||
    eventItem.category.charAt(0).toUpperCase() + eventItem.category.slice(1);

  return `
        <article class="bg-white rounded-lg border border-gray-200 overflow-hidden card-hover" data-category="${
          eventItem.category
        }" data-event-id="${eventItem.id}" onclick="navigateToEventDetail(${
    eventItem.id
  })">
            <figure class="aspect-video relative">
                <div class="category-badge">${categoryDisplayName}</div>
                <img src="${eventItem.image}" alt="${
    eventItem.title
  }" class="event-image w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image';">
                <div class="absolute top-3 right-3 heart-circle">
                    <i class="fas fa-heart ${
                      isFavorite ? "text-red-500" : "text-gray-300"
                    } cursor-pointer text-sm" data-event-id="${
    eventItem.id
  }" onclick="event.stopPropagation(); toggleFavoriteHeart(this, ${
    eventItem.id
  })"></i>
                </div>
            </figure>
            <div class="p-4">
                <h3 class="font-semibold custom-text mb-2 khmer-text line-clamp-2" title="${
                  eventItem.title
                }">${eventItem.title}</h3>
                ${dateElement}
                <address class="flex items-center text-gray-500 text-sm not-italic mb-2">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    <span class="truncate">${eventItem.location}</span>
                </address>
                <p class="text-gray-600 text-16px line-clamp-3">${
                  eventItem.description
                }</p>
            </div>
        </article>
    `;
}

/**
 * Navigation logic for event details.
 */
function navigateToEventDetail(eventId) {
  const selectedEvent = eventsData.find((event) => event.id === eventId);
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
      locationLink: `https://maps.google.com/maps?q=${selectedEvent.latitude},${selectedEvent.longitude}&output=embed&z=15`,
    };

    // Store event data for detail page
    localStorage.setItem("selectedEvent", JSON.stringify(eventForDetail));

    // Navigate to detail page
    window.location.href = "./../html/detail.html";
  } else {
    console.error("Event not found with ID:", eventId);
    alert("Sorry, event details could not be loaded.");
  }
}

/**
 * Toggles the favorite status for an event.
 */
function toggleFavoriteHeart(heartElement, eventId) {
  if (favoriteEvents.has(eventId)) {
    favoriteEvents.delete(eventId);
    heartElement.classList.remove("text-red-500");
    heartElement.classList.add("text-gray-300");
  } else {
    favoriteEvents.add(eventId);
    heartElement.classList.add("text-red-500");
    heartElement.classList.remove("text-gray-300");
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
  const favoriteCount = document.getElementById("favoriteCount");
  const count = favoriteEvents.size;
  if (count > 0) {
    favoriteCount.textContent = count;
    favoriteCount.classList.remove("hidden");
  } else {
    favoriteCount.classList.add("hidden");
  }
}

/**
 * Renders the event cards.
 */
function renderCards(append = false) {
  const eventsContainer = document.getElementById("eventsContainer");
  const seeMoreBtn = document.getElementById("seeMoreBtn");

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
    seeMoreBtn.classList.add("hidden");
    return;
  }

  const cardsToShow = filteredEvents.slice(0, currentDisplayCount);

  eventsContainer.innerHTML = cardsToShow
    .map((eventItem) => createEventCard(eventItem))
    .join("");

  if (currentDisplayCount >= filteredEvents.length) {
    seeMoreBtn.classList.add("hidden");
  } else {
    seeMoreBtn.classList.remove("hidden");
  }
}

/**
 * Resets all filters to show all events.
 */
function resetFilters() {
  document.getElementById("categoryFilter").value = "";
  document.getElementById("searchInput").value = "";
  showOnlyFavorites = false;
  const favoriteBtn = document.getElementById("favoriteBtn");
  favoriteBtn.classList.remove("text-red-500");
  favoriteBtn.classList.add("text-gray-600");
  applyFilters();
}

// --- Initialization Functions ---

/**
 * Applies filters to the list of events.
 */
function initFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  const searchInput = document.getElementById("searchInput");

  window.applyFilters = function () {
    // Made global
    const selectedCategory = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    // Filter the main eventsData array
    filteredEvents = eventsData.filter((event) => {
      const favoriteMatch = !showOnlyFavorites || favoriteEvents.has(event.id);
      const categoryMatch =
        !selectedCategory ||
        event.category.toLowerCase() === selectedCategory.toLowerCase();
      const searchMatch =
        !searchTerm ||
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm);
      return favoriteMatch && categoryMatch && searchMatch;
    });

    currentDisplayCount = 6;
    renderCards();
  };

  categoryFilter.addEventListener("change", window.applyFilters);
  searchInput.addEventListener("input", window.applyFilters);
}

/**
 * See More logic to load more event cards.
 */
function initSeeMore() {
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  seeMoreBtn.addEventListener("click", function () {
    currentDisplayCount += LOAD_MORE_COUNT;
    renderCards();
  });
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
    console.error(
      "Slider component not found. Please check your HTML structure."
    );
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
    // Clamp index
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;

    currentIndex = index;

    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === currentIndex) {
        slide.classList.add("active");
        // Refresh AOS for elements in the new active slide
        const aosElements = slide.querySelectorAll("[data-aos]");
        aosElements.forEach((el) => {
          el.classList.remove("aos-animate");
        });
        setTimeout(() => {
          aosElements.forEach((el) => {
            el.classList.add("aos-animate");
          });
        }, 50);
      }
    });

    // Update dots
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
  const resetAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  // --- Event Listeners ---
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });

  heroSlider.addEventListener("mouseenter", stopAutoPlay);
  heroSlider.addEventListener("mouseleave", startAutoPlay);

  // --- Initialize Slider ---
  goToSlide(0);
  startAutoPlay();
}
////////////////////////////////////////////////////////////////////////////////
// // Post Event Modal functionality
// function initPostEventModal() {
//     const postEventBtn = document.getElementById('postEventBtn');
//     const postEventModal = document.getElementById('postEventModal');
//     const closeModal = document.getElementById('closeModal');
//     const cancelBtn = document.getElementById('cancelBtn');
//     const eventForm = document.getElementById('eventForm');
//     const eventImage = document.getElementById('eventImage');
//     const imagePreview = document.getElementById('imagePreview');

//     // Show modal when post button is clicked
//     if (postEventBtn) {
//         postEventBtn.addEventListener('click', function() {
//             postEventModal.classList.add('active');
//             document.body.style.overflow = 'hidden'; // Prevent background scrolling
//         });
//     }

//     // Hide modal functions
//     function hideModal() {
//         postEventModal.classList.remove('active');
//         document.body.style.overflow = ''; // Restore scrolling
//         resetForm();
//     }

//     // Close modal when X button is clicked
//     if (closeModal) {
//         closeModal.addEventListener('click', hideModal);
//     }

//     // Close modal when Cancel button is clicked
//     if (cancelBtn) {
//         cancelBtn.addEventListener('click', hideModal);
//     }

//     // Close modal when clicking outside the modal content
//     postEventModal.addEventListener('click', function(e) {
//         if (e.target === postEventModal) {
//             hideModal();
//         }
//     });

//     // Close modal with Escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && postEventModal.classList.contains('active')) {
//             hideModal();
//         }
//     });

//     // Image preview functionality
//     if (eventImage) {
//         eventImage.addEventListener('change', function(e) {
//             const file = e.target.files[0];
//             if (file) {
//                 const reader = new FileReader();
//                 reader.onload = function(e) {
//                     imagePreview.src = e.target.result;
//                     imagePreview.classList.remove('hidden');
//                 };
//                 reader.readAsDataURL(file);
//             }
//         });
//     }

//     // Form submission
//     if (eventForm) {
//         eventForm.addEventListener('submit', async function(e) {
//             e.preventDefault();
//             const submitBtn = this.querySelector('button[type="submit"]');
//             const originalBtnText = submitBtn.innerHTML;
//             submitBtn.disabled = true;
//             submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Posting...';

//             // Use FormData to handle file uploads
//             const formData = new FormData();
//             formData.append('name', document.getElementById('eventTitle').value);
//             formData.append('description', document.getElementById('eventDescription').value);
//             formData.append('date', document.getElementById('eventDate').value);
//             formData.append('locationName', document.getElementById('eventLocation').value);
//             formData.append('latitude', document.getElementById('eventLatitude').value);
//             formData.append('longitude', document.getElementById('eventLongitude').value);
//             // The API likely expects the category name string.
//             formData.append('category_name', document.getElementById('eventCategory').value);

//             const imageFile = document.getElementById('eventImage').files[0];
//             if (imageFile) {
//                 formData.append('image', imageFile);
//             }

//             try {
//                 const response = await fetch('https://sport-hub.eunglyzhia.social/api/v1/events', {
//                     method: 'POST',
//                     body: formData,
//                     // Do NOT set a 'Content-Type' header when using FormData,
//                     // the browser will automatically set it to 'multipart/form-data' with the correct boundary
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json().catch(() => ({
//                         message: 'Could not parse error response.'
//                     }));
//                     throw new Error(`API Error: ${response.status} - ${errorData.message || 'Failed to post event'}`);
//                 }

//                 // --- Success ---
//                 alert('Event posted successfully!');
//                 hideModal();

//                 // Refresh the events list to show the new event
//                 console.log('Refreshing event list after posting...');
//                 await fetchAndInitializeData();

//             } catch (error) {
//                 console.error('Failed to submit event:', error);
//                 alert(`An error occurred while posting the event:\n${error.message}`);
//             } finally {
//                 // Restore button state
//                 submitBtn.disabled = false;
//                 submitBtn.innerHTML = originalBtnText;
//             }
//         });
//     }

//     // Reset form function
//     function resetForm() {
//         if (eventForm) {
//             eventForm.reset();
//         }
//         if (imagePreview) {
//             imagePreview.classList.add('hidden');
//             imagePreview.src = '';
//         }
//     }
// }
///////////////////////////////////////////////////////////////////////

// --- DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded - Initializing event page..."); // Debug log
  initHamburgerMenu();

  // Fetch and initialize events data first
  fetchAndInitializeData().then(() => {
    // After events are loaded, populate category filter with both API categories and event categories
    populateCategoryFilter();
  });

  // Initialize all other functionality
  initModernHeroSlider();
  initFilters();
  initSeeMore();
  // initPostEventModal(); // Initialize modal with new submission logic

  // Favorite button functionality
  const favoriteBtn = document.getElementById("favoriteBtn");
  if (favoriteBtn) {
    favoriteBtn.addEventListener("click", function () {
      showOnlyFavorites = !showOnlyFavorites;
      this.classList.toggle("text-red-500", showOnlyFavorites);
      this.classList.toggle("text-gray-600", !showOnlyFavorites);
      window.applyFilters();
    });
  }
});
