// Sample comments data
let commentsData = [{
    name: "សុភា ចាន់",
    avatar: "SC",
    time: "២ ម៉ោងមុន",
    comment: "ព្រឹត្តិការណ៍នេះគួរឱ្យចាប់អារម្មណ៍ណាស់! តើនៅមានកន្លែងទំនេរទេ?",
    likes: 5,
    liked: false
}, {
    name: "វុទ្ធី រ៉ា",
    avatar: "VR",
    time: "៤ ម៉ោងមុន",
    comment: "អរគុណសម្រាប់ការរៀបចំព្រឹត្តិការណ៍ល្អបែបនេះ។ ខ្ញុំនឹងចូលរួមដោយប្រាកដ!",
    likes: 3,
    liked: false
}, {
    name: "ស្រីមុំ កែវ",
    avatar: "SK",
    time: "៦ ម៉ោងមុន",
    comment: "តើមានការផ្សាយផ្ទាល់ទេ? សម្រាប់អ្នកដែលមិនអាចចូលរួមបាន។",
    likes: 2,
    liked: false
}];

// Current event data
let currentEvent = null;
let favoriteEvents = new Set(); // Track favorite event IDs

// Format date to Khmer
function formatDateToKhmer(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    const months = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
        'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Load event data
function loadEventData() {
    // Try to get event data from localStorage
    const savedEventData = localStorage.getItem('selectedEvent');
    const savedFavorites = localStorage.getItem('favoriteEvents');

    if (savedEventData) {
        currentEvent = JSON.parse(savedEventData);
    }

    if (savedFavorites) {
        favoriteEvents = new Set(JSON.parse(savedFavorites));
    }

    if (!currentEvent) {
        // Fallback to sample data if no event is selected
        currentEvent = {
            id: 1,
            title: "ISTAD Football Championship 2025",
            description: "This is an exciting sports event organized by ISTAD. Join us for a day filled with competition, fun activities, and great prizes. All skill levels are welcome to participate.",
            date: "2025-08-15",
            time: "14:00",
            location: "ISTAD Campus, Phnom Penh",
            locationLink: "https://maps.google.com/maps?q=ISTAD+Campus,+Phnom+Penh&t=&z=13&ie=UTF8&iwloc=&output=embed",
            category: "football",
            image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
            contact: "012 345 678"
        };
    }

    // Update DOM elements with event data
    document.getElementById('eventTitle').textContent = currentEvent.title;
    document.getElementById('eventDescription').textContent = currentEvent.description || 'No description available for this event.';
    document.getElementById('eventDate').textContent = formatDateToKhmer(currentEvent.date);
    document.getElementById('eventLocation').textContent = currentEvent.location;
    document.getElementById('mapLocation').textContent = currentEvent.location;
    document.getElementById('categoryBadge').textContent = currentEvent.category;
    document.getElementById('eventMainImage').src = currentEvent.image;
    document.getElementById('eventMainImage').alt = currentEvent.title;

    // Update map if location link is provided
    if (currentEvent.locationLink) {
        document.getElementById('locationMap').src = currentEvent.locationLink;
    }

    // Update heart button state
    const mainHeartBtn = document.getElementById('mainHeartBtn');
    if (favoriteEvents.has(currentEvent.id)) {
        mainHeartBtn.classList.remove('text-gray-300');
        mainHeartBtn.classList.add('text-red-500');
    }

    // Update favorite count in header
    updateFavoriteCount();

    // Update page title
    document.title = `${currentEvent.title} - Sportshub`;
}

// Header Component
function createHeader() {
    return `
        <section class="custom-bg shadow-sm border-b border-gray-200">
            <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section class="flex justify-between items-center py-4">
                    <section class="flex items-center cursor-pointer" onclick="goBackToHome()">
                        <img src="../img-about/logo.png" alt="Logo" class="h-10">
                    </section>

                    <nav class="hidden md:flex space-x-8">
                        <a href="../../index.html" class="custom-text hover:text-blue-600 transition-colors font-medium">Home</a>
                        <a href="../html/event.html" class="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Event</a>
                        <a href="../html/about.html" class="custom-text hover:text-blue-600 transition-colors font-medium">About</a>
                    </nav>

                    <section class="flex items-center space-x-4">
                        <button id="headerFavoriteBtn" class="p-2 text-gray-600 hover:text-red-500 transition-colors relative">
                            <i class="fas fa-heart text-xl"></i>
                            <span id="headerFavoriteCount" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hidden">0</span>
                        </button>

                        <button class="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <i class="fas fa-user-circle text-xl"></i>
                        </button>

                        <button onclick="goBackToHome()" class="post-button text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                            <i class="fas fa-arrow-left"></i>
                            <span>Back</span>
                        </button>
                    </section>
                </section>
            </section>
        </section>
    `;
}

// Footer Component
function createFooter() {
    return `
    <footer class="custom-bg text-gray-800 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-5 gap-8">
                <div>
                    <h1 class="text-lg font-semibold mb-4 khmer-text">Organized By</h1>
                    <img src="../img-about/istad.png" alt="ISTAD Logo" class="w-20 h-15 mb-4">
                </div>
                <div>
                    <h1 class="text-lg font-semibold mb-4 khmer-text">Prepared By</h1>
                    <img src="../img-about/logo.png" alt="sportshub Logo" class="w-21 h-20 mb-4">
                </div>
                <nav>
                    <h3 class="text-lg font-semibold mb-4 khmer-text">Category</h3>
                    <ul class="space-y-2 text-[#000249] ">
                        <li><a href="#" class="hover:text-blue-600 transition-colors">Football</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">Basketball</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">Swimming</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">Tennis</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">Golf</a></li>
                    </ul>
                </nav>
                <nav>
                    <h3 class="text-lg font-semibold mb-4 khmer-text">Quick Links</h3>
                    <ul class="space-y-2 text-[#000249] ">
                        <li><a href="#" class="hover:text-blue-600 transition-colors">All News</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">Event</a></li>
                        <li><a href="#" class="hover:text-blue-600 transition-colors">About Us</a></li>
                    </ul>
                </nav>
                <nav>
                    <h3 class="text-lg font-semibold mb-4">Connect With Us</h3>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors"><i class="fab fa-facebook-f text-xl"></i></a>
                        <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors"><i class="fab fa-telegram text-xl"></i></a>
                        <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors"><i class="fab fa-instagram text-xl"></i></a>
                        <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors"><i class="fab fa-youtube text-xl"></i></a>
                    </div>
                </nav>
            </div>
            <div class="border-t border-gray-300 mt-8 pt-8 text-center">
                <p class="text-[#000249] text-sm">© 2025 SportHub. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
    `;
}

// Create comments
function createComments() {
    const commentsContainer = document.getElementById('commentsContainer');
    if (!commentsContainer) return;
    const commentsHtml = commentsData.map(comment => `
        <section class="flex space-x-3">
            <figure class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                <span>${comment.avatar}</span>
            </figure>
            <section class="flex-1">
                <section class="bg-gray-50 rounded-lg p-3">
                    <section class="flex items-center space-x-2 mb-1">
                        <span class="font-medium custom-text">${comment.name}</span>
                        <span class="text-xs text-gray-500">${comment.time}</span>
                    </section>
                    <p class="text-gray-700 text-sm">${comment.comment}</p>
                </section>
                <section class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <button class="hover:text-blue-600 transition-colors like-btn" onclick="likeComment(this)">
                        <i class="fas fa-thumbs-up mr-1"></i> Like (<span class="like-count">${comment.likes}</span>)
                    </button>
                    <button class="hover:text-blue-600 transition-colors">Reply</button>
                </section>
            </section>
        </section>
    `).join('');
    commentsContainer.innerHTML = commentsHtml;
}

// Navigation function
function goBackToHome() {
    localStorage.setItem('favoriteEvents', JSON.stringify(Array.from(favoriteEvents)));
    window.history.back(); // More generic back navigation
}


// Update favorite count in header
function updateFavoriteCount() {
    const favoriteCount = document.getElementById('headerFavoriteCount');
    if (!favoriteCount) return;
    const count = favoriteEvents.size;
    if (count > 0) {
        favoriteCount.textContent = count;
        favoriteCount.classList.remove('hidden');
    } else {
        favoriteCount.classList.add('hidden');
    }
}

// Share functions
function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(currentEvent.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
}

function shareToTelegram() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${currentEvent.title} - ${currentEvent.location}`);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

function shareToInstagram() {
    copyEventLink();
    alert('Event link copied! You can paste it in your Instagram post or story.');
}

function copyEventLink() {
    const eventLink = window.location.href;
    navigator.clipboard.writeText(eventLink).then(() => {
        alert('Event link copied to clipboard!');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = eventLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Event link copied to clipboard!');
    });
}

// Interactive functions
function toggleHeart(heartElement) {
    if (!currentEvent) return;
    if (favoriteEvents.has(currentEvent.id)) {
        favoriteEvents.delete(currentEvent.id);
        heartElement.classList.remove('text-red-500');
        heartElement.classList.add('text-gray-300');
    } else {
        favoriteEvents.add(currentEvent.id);
        heartElement.classList.add('text-red-500');
        heartElement.classList.remove('text-gray-300');
    }
    updateFavoriteCount();
    localStorage.setItem('favoriteEvents', JSON.stringify(Array.from(favoriteEvents)));
}

function likeComment(button) {
    const countSpan = button.querySelector('.like-count');
    const currentCount = parseInt(countSpan.textContent);
    countSpan.textContent = currentCount + 1;
    button.classList.add('text-blue-600');
    button.disabled = true;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('header').innerHTML = createHeader();
    document.getElementById('footer').innerHTML = createFooter();

    loadEventData();
    createComments();

    document.getElementById('mainHeartBtn').addEventListener('click', function() {
        toggleHeart(this);
    });

    document.getElementById('openMapBtn').addEventListener('click', function() {
        if (currentEvent.locationLink) {
            window.open(currentEvent.locationLink.replace('embed', 'maps'), '_blank');
        } else {
            const encodedLocation = encodeURIComponent(currentEvent.location);
            window.open(`https://maps.google.com/maps?q=${encodedLocation}`, '_blank');
        }
    });

    document.getElementById('postCommentBtn').addEventListener('click', function() {
        const commentText = document.getElementById('commentText');
        if (commentText.value.trim()) {
            const newComment = {
                name: "អ្នកប្រើប្រាស់",
                avatar: "AP",
                time: "ទើបតែ",
                comment: commentText.value.trim(),
                likes: 0,
                liked: false
            };
            commentsData.unshift(newComment);
            createComments();
            commentText.value = '';

            const successMsg = document.createElement('div');
            successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
            successMsg.textContent = 'Comment posted successfully!';
            document.body.appendChild(successMsg);
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        } else {
            alert('Please write a comment first.');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            goBackToHome();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            copyEventLink();
        }
    });
});