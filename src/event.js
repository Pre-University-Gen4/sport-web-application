// Global variables
let eventsData = [{
        id: 1,
        title: "កម្ពុជាធ្វើម្ចាស់ផ្ទះរៀបចំការប្រកួតកីឡាវាយកូនហ្គោលនៃការប្រកួតកីឡាអន្តរជាតិ",
        description: "ការប្រកួតកីឡាបាល់ទាត់រវាងនិស្សិតដ៏អស្ចារ្យ",
        date: "2025-02-15",
        location: "ទីលានកីឡា ISTAD",
        locationLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62540.49962881492!2d104.88699570861851!3d11.567535195752065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095144cbdbf311%3A0x2588e1ac1787eb64!2sWat%20Phnom%20Daun%20Penh!5e0!3m2!1sen!2skh!4v1754378695201!5m2!1sen!2skh',
        category: "golf",
        image: "../Photo_Event/Id6_Even.jpg"
    }, {
        id: 2,
        title: "ការប្រកីឡាការិនីរត់ប្រណាំង ប៊ូ សំណាង ទោះទៅដល់ទីក្រោយគេ តែឈ្នះបេះដូងប្រជាជនកម្ពុជាកួតហែលទឹក ក្នុងអាងហែលទឹក",
        description: "ការប្រកួតហែលទឹកសម្រាប់អ្នកចូលចិត្តកីឡា",
        date: "2025-02-20",
        location: "អាងហែលទឹកជាតិ",
        locationLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1d62540.49962881492!2d104.88699570861851!3d11.567535195752065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095144cbdbf311%3A0x2588e1ac1787eb64!2sWat%20Phnom%20Daun%20Penh!5e0!3m2!1sen!2skh!4v1754378695201!5m2!1sen!2skh',
        category: "swimming",
        image: "../Photo_Event/Id2_Even.jpg"
    },
    {
        id: 3,
        title: "ការប្រកួតកីឡា តេក្វាន់ ដូ អាយធីអែហ្វ អាស៊ីអាគ្នេយ៍លើក ទី២  ឆ្នាំ២០២៥​ In CAMBODIA",
        description: "ការប្រកួតហែលទឹកសម្រាប់អ្នកចូលចិត្តកីឡា",
        date: "2025-02-20",
        location: "អាងហែលទឹកជាតិ",
        locationLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62540.49962881492!2d104.88699570861851!3d11.567535195752065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095144cbdbf311%3A0x2588e1ac1787eb64!2sWat%20Phnom%20Daun%20Penh!5e0!3m2!1sen!2skh!4v1754378695201!5m2!1sen!2skh',
        category: "swimming",
        image: "../Photo_Event/Id3_Even.jpg"
    },
    {
        id: 4,
        title: "អបអរសាទរពិធីបើកការប្រកួតកីឡាជាតិលើកទី៤  និង កីឡា ជាតិ ជនពិការ លើកទី២",
        description: "ការប្រកួតហែលទឹកសម្រាប់អ្នកចូលចិត្តកីឡា",
        date: "2025-02-20",
        location: "អាងហែលទឹកជាតិ",
        locationLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62540.49962881492!2d104.88699570861851!3d11.567535195752065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095144cbdbf311%3A0x2588e1ac1787eb64!2sWat%20Phnom%20Daun%20Penh!5e0!3m2!1sen!2skh!4v1754378695201!5m2!1sen!2skh',
        category: "basketball",
        image: "../Photo_Event/Id4_Even.jpg"
    },
    {
        id: 5,
        title: "ការប្រកួតកីឡាបាល់បោះលើវិញ្ញាសា ៣ទល់៣ រវាងកម្ពុជា និងថៃ",
        description: "ការប្រកួតហែលទឹកសម្រាប់អ្នកចូលចិត្តកីឡា",
        date: "2025-02-20",
        location: "អាងហែលទឹកជាតិ",
        locationLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62540.49962881492!2d104.88699570861851!3d11.567535195752065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095144cbdbf311%3A0x2588e1ac1787eb64!2sWat%20Phnom%20Daun%20Penh!5e0!3m2!1sen!2skh!4v1754378695201!5m2!1sen!2skh',
        category: "tennis",
        image: "../Photo_Event/Id5_Even.jpg"
    },
    {
        id: 6,
        title: "ការប្រកួតកីឡាបាល់បោះលើវិញ្ញាសា ៣ទល់៣ រវាងកម្ពុជា និងថៃ",
        description: "ការប្រកួតហែលទឹកសម្រាប់អ្នកចូលចិត្តកីឡា",
        date: "2025-02-20",
        location: "អាងហែលទឹកជាតិ",
        locationLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62540.49962881492!2d104.88699570861851!3d11.567535195752065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095144cbdbf311%3A0x2588e1ac1787eb64!2sWat%20Phnom%20Daun%20Penh!5e0!3m2!1sen!2skh!4v1754378695201!5m2!1sen!2skh',
        category: "tennis",
        image: "../Photo_Event/Id5_Even.jpg"
    },
    // Additional events for "See More" functionality
    {
        id: 7,
        title: "International Basketball Championship 2025",
        description: "A thrilling basketball tournament featuring teams from around the world",
        date: "2025-03-10",
        location: "Olympic Sports Complex",
        locationLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7937414488034!2d104.91444121533492!3d11.568633291834647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6b%3A0x6b66703c5fc0c7cc!2sInstitute%20of%20Science%20and%20Technology%20Advanced%20Development!5e0!3m2!1sen!2skh!4v1642150234567!5m2!1sen!2skh',
        category: "basketball",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=400&fit=crop"
    },
    {
        id: 8,
        title: "Tennis Masters Series Final",
        description: "The ultimate tennis showdown between world's best players",
        date: "2025-03-15",
        location: "National Tennis Center",
        locationLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7937414488034!2d104.91444121533492!3d11.568633291834647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6b%3A0x6b66703c5fc0c7cc!2sInstitute%20of%20Science%20and%20Technology%20Advanced%20Development!5e0!3m2!1sen!2skh!4v1642150234567!5m2!1sen!2skh',
        category: "tennis",
        image: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&h=400&fit=crop"
    },
    {
        id: 9,
        title: "Marathon Running Challenge",
        description: "Annual city marathon open for all fitness levels",
        date: "2025-03-22",
        location: "City Center",
        locationLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7937414488034!2d104.91444121533492!3d11.568633291834647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6b%3A0x6b66703c5fc0c7cc!2sInstitute%20of%20Science%20and%20Technology%20Advanced%20Development!5e0!3m2!1sen!2skh!4v1642150234567!5m2!1sen!2skh',
        category: "running",
        image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop"
    }
];

let filteredEvents = [...eventsData];
let favoriteEvents = new Set(); // Track favorite event IDs
let showOnlyFavorites = false;
let currentDisplayCount = 6; // Initially show 6 events
const LOAD_MORE_COUNT = 3; // Load 3 more events each time

// Generate unique ID
function generateId() {
    return Date.now() + Math.random();
}

// Format date to English
function formatDateToEnglish(dateStr) {
    const date = new Date(dateStr);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

// Create event card HTML
function createEventCard(event, index, isNew = false) {
    const isFavorite = favoriteEvents.has(event.id);
    const newClass = isNew ? 'event-card-new' : '';

    return `
        <article class="bg-white rounded-lg shadow-md overflow-hidden card-hover ${newClass}" data-category="${event.category}" data-event-id="${event.id}" onclick="navigateToEventDetail(${event.id})">
            <figure class="aspect-video relative">
                <div class="category-badge">${event.category}</div>
                <img src="${event.image}" alt="${event.title}" class="event-image">
                <div class="absolute top-3 right-3 heart-circle">
                    <i class="fas fa-heart ${isFavorite ? 'text-red-500' : 'text-gray-300'} cursor-pointer text-sm" data-event-id="${event.id}" onclick="event.stopPropagation(); toggleEventHeart(this, ${event.id})"></i>
                </div>
            </figure>
            <div class="p-4">
                <h3 class="font-semibold custom-text mb-2 khmer-text">${event.title}</h3>
                <div class="flex items-center text-gray-500 text-sm mb-2">
                    <i class="fas fa-calendar-alt mr-2"></i>
                    <span>${formatDateToEnglish(event.date)}</span>
                </div>
                <address class="flex items-center text-gray-500 text-sm not-italic">
                    <i class="fas fa-map-marker-alt mr-2"></i>
                    <span>${event.location}</span>
                </address>
            </div>
        </article>
    `;
}

// Navigation function to event detail page
function navigateToEventDetail(eventId) {
    const selectedEvent = eventsData.find(event => event.id === eventId);
    if (selectedEvent) {
        // Store event data and favorites in memory for the detail page
        window.selectedEventData = selectedEvent;
        window.favoriteEventsArray = Array.from(favoriteEvents);
        // Open detail page in same window
        window.location.href = 'event_detail.html';
    }
}

// Function to toggle heart on event cards
function toggleEventHeart(heartElement, eventId) {
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

    // If we're in favorites-only mode, re-apply filters
    if (showOnlyFavorites) {
        applyFilters();
    }
}

// Update favorite count in header
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

// Render events with pagination
function renderEvents(append = false) {
    const eventsContainer = document.getElementById('eventsContainer');
    const seeMoreBtn = document.getElementById('seeMoreBtn');

    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-span-3 text-center py-12">
                <i class="fas fa-search text-gray-400 text-4xl mb-4"></i>
                <p class="text-gray-500 text-lg">No events found matching your criteria</p>
            </div>
        `;
        seeMoreBtn.classList.add('hidden');
        return;
    }

    const eventsToShow = filteredEvents.slice(0, currentDisplayCount);

    if (append) {
        // Get only the new events to append
        const newEvents = filteredEvents.slice(currentDisplayCount - LOAD_MORE_COUNT, currentDisplayCount);
        const newEventsHTML = newEvents
            .map((event, index) => createEventCard(event, currentDisplayCount - LOAD_MORE_COUNT + index, true))
            .join('');
        eventsContainer.insertAdjacentHTML('beforeend', newEventsHTML);
    } else {
        eventsContainer.innerHTML = eventsToShow
            .map((event, index) => createEventCard(event, index))
            .join('');
    }

    // Show/hide "See More" button
    if (currentDisplayCount >= filteredEvents.length) {
        seeMoreBtn.classList.add('hidden');
    } else {
        seeMoreBtn.classList.remove('hidden');
    }
}

// Filter functionality
function initFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        filteredEvents = eventsData.filter(event => {
            // Favorite filter
            const favoriteMatch = !showOnlyFavorites || favoriteEvents.has(event.id);

            // Category filter
            const categoryMatch = !selectedCategory || event.category === selectedCategory;

            // Search filter
            const searchMatch = !searchTerm ||
                event.title.toLowerCase().includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm) ||
                event.category.toLowerCase().includes(searchTerm) ||
                (event.description && event.description.toLowerCase().includes(searchTerm));

            return favoriteMatch && categoryMatch && searchMatch;
        });

        // Reset display count when filters change
        currentDisplayCount = 6;
        renderEvents();
    }

    // Make applyFilters available globally
    window.applyFilters = applyFilters;

    categoryFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
}

// Initialize "See More" functionality
function initSeeMore() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');

    seeMoreBtn.addEventListener('click', function() {
        currentDisplayCount += LOAD_MORE_COUNT;
        renderEvents(true);

        // Smooth scroll to the new content
        setTimeout(() => {
            const newCards = document.querySelectorAll('.event-card-new');
            if (newCards.length > 0) {
                newCards[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 100);
    });
}

// Modal functionality
function initModal() {
    const postEventBtn = document.getElementById('postEventBtn');
    const postEventModal = document.getElementById('postEventModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const eventForm = document.getElementById('eventForm');
    const eventImage = document.getElementById('eventImage');
    const imagePreview = document.getElementById('imagePreview');

    // Open modal
    postEventBtn.addEventListener('click', function() {
        postEventModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal functions
    function closeModalFunc() {
        postEventModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        eventForm.reset();
        imagePreview.classList.add('hidden');
    }

    closeModal.addEventListener('click', closeModalFunc);
    cancelBtn.addEventListener('click', closeModalFunc);

    // Close modal when clicking overlay
    postEventModal.addEventListener('click', function(e) {
        if (e.target === postEventModal) {
            closeModalFunc();
        }
    });

    // Image preview
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

    // Handle form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            id: generateId(),
            title: document.getElementById('eventTitle').value,
            description: document.getElementById('eventDescription').value,
            date: document.getElementById('eventDate').value,
            location: document.getElementById('eventLocation').value,
            locationLink: document.getElementById('eventLocationLink').value || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7937414488034!2d104.91444121533492!3d11.568633291834647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e96d257a6b%3A0x6b66703c5fc0c7cc!2sInstitute%20of%20Science%20and%20Technology%20Advanced%20Development!5e0!3m2!1sen!2skh!4v1642150234567!5m2!1sen!2skh',
            category: document.getElementById('eventCategory').value,
            image: imagePreview.src || 'https://via.placeholder.com/800x400'
        };

        // Add to events array
        eventsData.unshift(formData);
        filteredEvents = [...eventsData];

        // Reset display count and re-render events
        currentDisplayCount = 6;
        renderEvents();

        // Close modal and show success
        closeModalFunc();
        alert('Event posted successfully!');
    });
}

// Hero image navigation
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

    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showImage(currentImageIndex);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render initial events
    renderEvents();

    // Initialize all functionality
    initManualImageNavigation();
    initModal();
    initFilters();
    initSeeMore();

    // Initialize favorite button in header
    document.getElementById('favoriteBtn').addEventListener('click', function() {
        showOnlyFavorites = !showOnlyFavorites;

        if (showOnlyFavorites) {
            this.classList.add('text-red-500');
            this.classList.remove('text-gray-600');
        } else {
            this.classList.remove('text-red-500');
            this.classList.add('text-gray-600');
        }

        // Reset display count when toggling favorites
        currentDisplayCount = 6;
        // Apply filters to show/hide favorite events
        window.applyFilters();
    });
});