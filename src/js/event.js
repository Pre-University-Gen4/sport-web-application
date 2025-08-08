// --- MODIFIED: Global variables now refer to categories ---
let categoriesData = []; // Was eventsData
let filteredCategories = []; // Was filteredEvents
let favoriteCategories = new Set(); // Was favoriteEvents
let showOnlyFavorites = false;
let currentDisplayCount = 6;
const LOAD_MORE_COUNT = 3;

// --- Helper Functions (Unchanged) ---

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
 * NEW: Maps a category object from the API to a card format.
 * This creates placeholder data to fit the card structure.
 * @param {object} category - A category object from the API (e.g., {id: 1, name: 'football'}).
 * @returns {object} - An object formatted for display in a card.
 */
function mapCategoryToCardData(category) {
    const capitalizedName = category.name.charAt(0).toUpperCase() + category.name.slice(1);
    return {
        id: category.id,
        title: capitalizedName,
        description: `Find the latest news and events for ${capitalizedName}.`, // Generic description
        date: null, // No date for a category
        location: 'Various Locations', // Generic location
        category: category.name, // The category is the name itself
        // Use a dynamic placeholder image service for relevant visuals
        image: `https://source.unsplash.com/800x400/?${category.name},sport`
    };
}

/**
 * MODIFIED: Fetches category data from the API to initialize the application.
 */
async function fetchAndInitializeData() {
    try {
        const response = await fetch('https://sport-hub.eunglyzhia.social/api/v1/sport_categories');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const apiData = await response.json();

        // Map the category data to the format our cards expect
        categoriesData = apiData.map(mapCategoryToCardData);
        filteredCategories = [...categoriesData];

        // Now that data is loaded, render the initial cards
        renderCards();

    } catch (error) {
        console.error("Failed to fetch categories:", error);
        const eventsContainer = document.getElementById('eventsContainer');
        eventsContainer.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <p class="text-gray-500 text-lg">Failed to load categories. Please try again later.</p>
            </div>
        `;
        document.getElementById('seeMoreBtn').classList.add('hidden');
    }
}

/**
 * MODIFIED: Fetches categories and populates the filter dropdown.
 */
async function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    try {
        const response = await fetch('https://sport-hub.eunglyzhia.social/api/v1/sport_categories');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categories = await response.json();

        let optionsHTML = '<option value="">All Categories</option>';
        categories.forEach(category => {
            const displayName = category.name.charAt(0).toUpperCase() + category.name.slice(1);
            optionsHTML += `<option value="${category.name.toLowerCase()}">${displayName}</option>`;
        });
        categoryFilter.innerHTML = optionsHTML;

    } catch (error) {
        console.error("Failed to fetch sport categories:", error);
        categoryFilter.innerHTML = '<option value="">Error loading categories</option>';
        categoryFilter.disabled = true;
    }
}


// --- UI Functions ---

/**
 * MODIFIED: Creates a card for a category.
 */
function createCategoryCard(categoryItem) {
    const isFavorite = favoriteCategories.has(categoryItem.id);

    // Since a category doesn't have a specific date, we hide that element.
    const dateElement = categoryItem.date ? `
        <div class="flex items-center text-gray-500 text-sm mb-2">
            <i class="fas fa-calendar-alt mr-2"></i>
            <span>${formatDateToEnglish(categoryItem.date)}</span>
        </div>` : '';

    return `
        <article class="bg-white rounded-lg shadow-md overflow-hidden card-hover" data-category="${categoryItem.category}" data-event-id="${categoryItem.id}" onclick="navigateToCategoryDetail(${categoryItem.id})">
            <figure class="aspect-video relative">
                <div class="category-badge">${categoryItem.title}</div>
                <img src="${categoryItem.image}" alt="${categoryItem.title}" class="event-image">
                <div class="absolute top-3 right-3 heart-circle">
                    <i class="fas fa-heart ${isFavorite ? 'text-red-500' : 'text-gray-300'} cursor-pointer text-sm" data-event-id="${categoryItem.id}" onclick="event.stopPropagation(); toggleFavoriteHeart(this, ${categoryItem.id})"></i>
                </div>
            </figure>
            <div class="p-4">
                <h3 class="font-semibold custom-text mb-2 khmer-text">${categoryItem.title}</h3>
                ${dateElement}
                <address class="flex items-center text-gray-500 text-sm not-italic">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    <span>${categoryItem.location}</span>
                </address>
            </div>
        </article>
    `;
}

/**
 * MODIFIED: Navigation logic for category details (if you build a detail page).
 */
function navigateToCategoryDetail(categoryId) {
    const selectedCategory = categoriesData.find(cat => cat.id === categoryId);
    if (selectedCategory) {
        // You would pass this data to a category_detail.html page
        console.log("Navigating to detail for category:", selectedCategory);
        // window.selectedCategoryData = selectedCategory;
        // window.location.href = 'category_detail.html';
    }
}

/**
 * MODIFIED: Toggles the favorite status for a category.
 */
function toggleFavoriteHeart(heartElement, categoryId) {
    if (favoriteCategories.has(categoryId)) {
        favoriteCategories.delete(categoryId);
        heartElement.classList.remove('text-red-500');
        heartElement.classList.add('text-gray-300');
    } else {
        favoriteCategories.add(categoryId);
        heartElement.classList.add('text-red-500');
        heartElement.classList.remove('text-gray-300');
    }
    updateFavoriteCount();

    if (showOnlyFavorites) {
        applyFilters();
    }
}

/**
 * MODIFIED: Updates the favorite count based on categories.
 */
function updateFavoriteCount() {
    const favoriteCount = document.getElementById('favoriteCount');
    const count = favoriteCategories.size;
    if (count > 0) {
        favoriteCount.textContent = count;
        favoriteCount.classList.remove('hidden');
    } else {
        favoriteCount.classList.add('hidden');
    }
}

/**
 * MODIFIED: Renders the category cards.
 */
function renderCards(append = false) {
    const eventsContainer = document.getElementById('eventsContainer');
    const seeMoreBtn = document.getElementById('seeMoreBtn');

    if (filteredCategories.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i class="fas fa-search text-gray-400 text-4xl mb-4"></i>
                <p class="text-gray-500 text-lg">No categories found matching your criteria</p>
            </div>
        `;
        seeMoreBtn.classList.add('hidden');
        return;
    }

    const cardsToShow = filteredCategories.slice(0, currentDisplayCount);

    // Use the new createCategoryCard function
    eventsContainer.innerHTML = cardsToShow
        .map(categoryItem => createCategoryCard(categoryItem))
        .join('');

    if (currentDisplayCount >= filteredCategories.length) {
        seeMoreBtn.classList.add('hidden');
    } else {
        seeMoreBtn.classList.remove('hidden');
    }
}


// --- Initialization Functions ---

/**
 * MODIFIED: Applies filters to the list of categories.
 */
function initFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');

    window.applyFilters = function() { // Made global
        const selectedCategory = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        // Filter the main categoriesData array
        filteredCategories = categoriesData.filter(cat => {
            const favoriteMatch = !showOnlyFavorites || favoriteCategories.has(cat.id);
            const categoryMatch = !selectedCategory || cat.category.toLowerCase() === selectedCategory.toLowerCase();
            const searchMatch = !searchTerm || cat.title.toLowerCase().includes(searchTerm);
            return favoriteMatch && categoryMatch && searchMatch;
        });

        currentDisplayCount = 6;
        renderCards();
    }

    categoryFilter.addEventListener('change', window.applyFilters);
    searchInput.addEventListener('input', window.applyFilters);
}

/**
 * MODIFIED: See More logic now loads more category cards.
 */
function initSeeMore() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    seeMoreBtn.addEventListener('click', function() {
        currentDisplayCount += LOAD_MORE_COUNT;
        // This function needs to be smarter to append, for now, we'll re-render
        renderCards();
    });
}

/**
 * REMOVED: The initModal function is no longer needed.
 * Please REMOVE the "Post Event" button from your HTML file.
 */

function initManualImageNavigation() {
    const images = ['heroImage1', 'heroImage2', 'heroImage3'];
    let currentImageIndex = 0;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showImage(index) {
        images.forEach((imageId, i) => {
            const img = document.getElementById(imageId);
            if (i === index) {
                img.classList.remove('fade-out');
                img.classList.add('fade-in');
            } else {
                img.classList.remove('fade-in');
                img.classList.add('fade-out');
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
    // MODIFIED: Call the new main data fetching function
    fetchAndInitializeData();
    populateCategoryFilter();

    // Initialize all other functionality
    initManualImageNavigation();
    // REMOVED: initModal();
    initFilters();
    initSeeMore();

    document.getElementById('favoriteBtn').addEventListener('click', function() {
        showOnlyFavorites = !showOnlyFavorites;
        this.classList.toggle('text-red-500', showOnlyFavorites);
        this.classList.toggle('text-gray-600', !showOnlyFavorites);
        window.applyFilters();
    });
});