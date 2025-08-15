// Sample comments data
let commentsData = [
  {
    name: "សុភា ចាន់",
    avatar: "SC",
    time: "២ ម៉ោងមុន",
    comment: "ព្រឹត្តិការណ៍នេះគួរឱ្យចាប់អារម្មណ៍ណាស់! តើនៅមានកន្លែងទំនេរទេ?",
    likes: 5,
    liked: false,
  },
  {
    name: "វុទ្ធី រ៉ា",
    avatar: "VR",
    time: "៤ ម៉ោងមុន",
    comment:
      "អរគុណសម្រាប់ការរៀបចំព្រឹត្តិការណ៍ល្អបែបនេះ។ ខ្ញុំនឹងចូលរួមដោយប្រាកដ!",
    likes: 3,
    liked: false,
  },
  {
    name: "ស្រីមុំ កែវ",
    avatar: "SK",
    time: "៦ ម៉ោងមុន",
    comment: "តើមានការផ្សាយផ្ទាល់ទេ? សម្រាប់អ្នកដែលមិនអាចចូលរួមបាន។",
    likes: 2,
    liked: false,
  },
];

// Current event data and related events
let currentEvent = null;
let favoriteEvents = new Set();
let relatedEventsData = [];
let currentCarouselIndex = 0;
let totalCarouselItems = 0;
let isCarouselAnimating = false;
const eventsPerPage = 4; // Adjusted to match new responsive layout (lg:w-1/4)

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

// Format date to English for display
function formatDateToEnglish(dateStr) {
  if (!dateStr) return "Date not available";
  const date = new Date(dateStr);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return date.toLocaleDateString("en-US", options);
}

// Load event data
function loadEventData() {
  // Try to get event data from localStorage
  const savedEventData = localStorage.getItem("selectedEvent");

  if (savedEventData) {
    currentEvent = JSON.parse(savedEventData);
    console.log("Loaded event data:", currentEvent);
    // Clear the localStorage after loading
    localStorage.removeItem("selectedEvent");
  }

  if (!currentEvent) {
    // Fallback to sample data if no event is selected
    console.warn("No event data found, using fallback data");
    currentEvent = {
      id: 1,
      title: "Sample Sports Event",
      description:
        "This is a sample sports event. Please navigate from the events page to see real event data.",
      date: new Date().toISOString(),
      location: "Sample Location",
      latitude: 11.5564,
      longitude: 104.9282,
      category: "Sample Category",
      image:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
      locationLink:
        "https://maps.google.com/maps?q=11.5564,104.9282&output=embed&z=15",
    };
  }

  // Update DOM elements with event data
  updateEventDisplay();

  // Fetch related events after loading current event
  fetchRelatedEvents();
}

// Fetch related events from API (same as popular events from home page)
async function fetchRelatedEvents() {
  try {
    const apiUrl = "https://sport-hub.eunglyzhia.social/api/v1/sports";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }

    const sports = await response.json();

    if (Array.isArray(sports) && sports.length > 0) {
      // Filter out current event and get random related events
      relatedEventsData = sports
        .filter((sport) => sport.id !== currentEvent.id)
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 8); // Get up to 8 related events

      initializeRelatedEventsCarousel();
    } else {
      displayNoRelatedEvents();
    }
  } catch (error) {
    console.error("Failed to fetch related events:", error);
    displayNoRelatedEvents();
  }
}

// Display message when no related events are available
function displayNoRelatedEvents() {
  const carousel = document.getElementById("relatedEventsCarousel");
  if (carousel) {
    carousel.innerHTML = `
              <section class="flex justify-center items-center w-full h-64">
                  <p class="text-gray-500">No related events available.</p>
              </section>
          `;
  }
}

// Initialize related events carousel with infinite loop
function initializeRelatedEventsCarousel() {
  if (relatedEventsData.length === 0) {
    displayNoRelatedEvents();
    return;
  }

  const carousel = document.getElementById("relatedEventsCarousel");
  const indicators = document.getElementById("relatedIndicators");
  const prevBtn = document.getElementById("relatedPrevBtn");
  const nextBtn = document.getElementById("relatedNextBtn");

  if (!carousel || !indicators) return;

  carousel.innerHTML = "";
  indicators.innerHTML = "";

  const minEventsForLoop = eventsPerPage * 3;
  let eventsToDisplay = [...relatedEventsData];

  while (
    eventsToDisplay.length < minEventsForLoop &&
    relatedEventsData.length > 0
  ) {
    eventsToDisplay = [...eventsToDisplay, ...relatedEventsData];
  }

  const firstClones = eventsToDisplay.slice(0, eventsPerPage);
  const lastClones = eventsToDisplay.slice(-eventsPerPage);

  const infiniteEvents = [...lastClones, ...eventsToDisplay, ...firstClones];
  totalCarouselItems = infiniteEvents.length;

  infiniteEvents.forEach((event) => {
    const eventCard = createRelatedEventCard(event);
    carousel.appendChild(eventCard);
  });

  // Check if cards are rendered before calculating width
  if (!carousel.querySelector("article")) return;

  const totalPages = Math.ceil(eventsToDisplay.length / eventsPerPage);

  for (let i = 0; i < totalPages; i++) {
    const indicator = document.createElement("button");
    indicator.className = `w-3 h-3 rounded-full transition-colors duration-300 ${
      i === 0 ? "bg-accent" : "bg-gray-300"
    }`;
    indicator.addEventListener("click", () => goToCarouselPage(i));
    indicators.appendChild(indicator);
  }

  currentCarouselIndex = eventsPerPage;

  const cardElement = carousel.querySelector("article");
  const cardWidth = cardElement.offsetWidth;

  carousel.style.transform = `translateX(-${
    currentCarouselIndex * cardWidth
  }px)`;
  carousel.style.transition = "none";

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      if (isCarouselAnimating) return;
      moveToPrevious();
    });

    nextBtn.addEventListener("click", () => {
      if (isCarouselAnimating) return;
      moveToNext();
    });
  }

  setInterval(() => {
    if (!isCarouselAnimating) {
      moveToNext();
    }
  }, 4000);

  setTimeout(() => {
    carousel.style.transition = "transform 0.5s ease-in-out";
  }, 50);
}

// Move to next slide with infinite loop
function moveToNext() {
  if (isCarouselAnimating) return;

  const carousel = document.getElementById("relatedEventsCarousel");
  if (!carousel || !carousel.querySelector("article")) return;

  isCarouselAnimating = true;

  const cardElement = carousel.querySelector("article");
  const cardWidth = cardElement.offsetWidth;

  currentCarouselIndex++;
  carousel.style.transform = `translateX(-${
    currentCarouselIndex * cardWidth
  }px)`;

  const originalEventsLength = relatedEventsData.length;
  const eventsToDisplay =
    originalEventsLength >= 9
      ? originalEventsLength
      : originalEventsLength * Math.ceil(9 / originalEventsLength);

  setTimeout(() => {
    if (currentCarouselIndex >= eventsPerPage + eventsToDisplay) {
      carousel.style.transition = "none";
      currentCarouselIndex = eventsPerPage;
      carousel.style.transform = `translateX(-${
        currentCarouselIndex * cardWidth
      }px)`;

      setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease-in-out";
        isCarouselAnimating = false;
      }, 50);
    } else {
      isCarouselAnimating = false;
    }

    updateIndicators();
  }, 500);
}

// Move to previous slide with infinite loop
function moveToPrevious() {
  if (isCarouselAnimating) return;

  const carousel = document.getElementById("relatedEventsCarousel");
  if (!carousel || !carousel.querySelector("article")) return;

  isCarouselAnimating = true;

  const cardElement = carousel.querySelector("article");
  const cardWidth = cardElement.offsetWidth;

  currentCarouselIndex--;

  if (currentCarouselIndex < eventsPerPage) {
    carousel.style.transition = "none";
    const originalEventsLength = relatedEventsData.length;
    const eventsToDisplay =
      originalEventsLength >= 9
        ? originalEventsLength
        : originalEventsLength * Math.ceil(9 / originalEventsLength);
    currentCarouselIndex = eventsPerPage + eventsToDisplay - 1;
    carousel.style.transform = `translateX(-${
      currentCarouselIndex * cardWidth
    }px)`;

    setTimeout(() => {
      carousel.style.transition = "transform 0.5s ease-in-out";
      currentCarouselIndex--;
      carousel.style.transform = `translateX(-${
        currentCarouselIndex * cardWidth
      }px)`;

      setTimeout(() => {
        isCarouselAnimating = false;
        updateIndicators();
      }, 500);
    }, 50);
  } else {
    carousel.style.transform = `translateX(-${
      currentCarouselIndex * cardWidth
    }px)`;

    setTimeout(() => {
      isCarouselAnimating = false;
      updateIndicators();
    }, 500);
  }
}

// Update indicators based on current position
function updateIndicators() {
  const indicators = document.querySelectorAll("#relatedIndicators button");
  if (indicators.length === 0) return;

  const originalEventsLength = relatedEventsData.length;
  const eventsToDisplay =
    originalEventsLength >= 9
      ? originalEventsLength
      : originalEventsLength * Math.ceil(9 / originalEventsLength);

  let adjustedIndex = currentCarouselIndex - eventsPerPage;
  if (adjustedIndex < 0) adjustedIndex = 0;
  if (adjustedIndex >= eventsToDisplay) adjustedIndex = eventsToDisplay - 1;

  const currentPage = Math.floor(adjustedIndex / eventsPerPage);
  const activeIndicator = Math.min(currentPage, indicators.length - 1);

  indicators.forEach((indicator, index) => {
    if (index === activeIndicator) {
      indicator.classList.remove("bg-gray-300");
      indicator.classList.add("bg-accent");
    } else {
      indicator.classList.remove("bg-accent");
      indicator.classList.add("bg-gray-300");
    }
  });
}

// Create related event card
function createRelatedEventCard(event) {
  const card = document.createElement("article");
  // **UPDATED** - Using responsive width classes and padding for spacing
  card.className =
    "flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer";

  card.addEventListener("click", () => {
    navigateToEvent(event);
  });

  const imageUrl =
    event.imageUrls && event.imageUrls.length > 0
      ? event.imageUrls[0]
      : "https://placehold.co/320x200/3b82f6/ffffff?text=Event+Image";

  const eventDate = event.createdAt
    ? new Date(event.createdAt).toLocaleDateString()
    : "No date";

  // **UPDATED** - Card content is wrapped in a new div for styling and a card-image class is added.
  card.innerHTML = `
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden h-full transform hover:-translate-y-1 transition-transform duration-300">
              <figure class="h-48 overflow-hidden">
                  <img src="${imageUrl}" alt="${event.name || "Related Event"}" 
                       class="w-full h-full object-cover transition-transform duration-300 hover:scale-105 card-image"
                       onerror="this.onerror=null;this.src='https://placehold.co/320x200/3b82f6/ffffff?text=Image+Error';">
              </figure>
              <section class="p-4">
                  <h4 class="text-lg font-bold mb-2 custom-text line-clamp-2">${
                    event.name || "Untitled Event"
                  }</h4>
                  <time class="text-sm text-gray-500 mb-2 block english-text">${eventDate}</time>
                  <p class="text-gray-600 text-sm line-clamp-3">${
                    event.description
                      ? event.description.substring(0, 100) +
                        (event.description.length > 100 ? "..." : "")
                      : "No description available."
                  }</p>
              </section>
          </div>
      `;

  return card;
}

// Navigate to selected event
function navigateToEvent(event) {
  const eventData = {
    id: event.id || Date.now(),
    title: event.name || "Untitled Event",
    description:
      event.description || "No description available for this event.",
    date: event.createdAt || new Date().toISOString(),
    location: event.location || "Location not specified",
    category: event.category || "Sports",
    image:
      event.imageUrls && event.imageUrls.length > 0
        ? event.imageUrls[0]
        : "https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image",
    latitude: event.latitude || null,
    longitude: event.longitude || null,
    locationLink: event.locationLink || null,
  };

  localStorage.setItem("selectedEvent", JSON.stringify(eventData));
  window.location.reload();
}

// Go to specific carousel page
function goToCarouselPage(pageIndex) {
  if (isCarouselAnimating) return;

  const carousel = document.getElementById("relatedEventsCarousel");
  if (!carousel || !carousel.querySelector("article")) return;

  isCarouselAnimating = true;

  const cardElement = carousel.querySelector("article");
  const cardWidth = cardElement.offsetWidth;

  const targetIndex = eventsPerPage + pageIndex * eventsPerPage;
  currentCarouselIndex = targetIndex;

  carousel.style.transform = `translateX(-${
    currentCarouselIndex * cardWidth
  }px)`;

  setTimeout(() => {
    isCarouselAnimating = false;
    updateIndicators();
  }, 500);
}

// Update the display with current event data
function updateEventDisplay() {
  if (!currentEvent) return;

  document.getElementById("eventTitle").textContent =
    currentEvent.title || "Event Title";
  document.getElementById("eventDescription").textContent =
    currentEvent.description || "No description available for this event.";
  document.getElementById("eventDate").textContent = formatDateToEnglish(
    currentEvent.date
  );
  document.getElementById("eventLocation").textContent =
    currentEvent.location || "Location not specified";
  document.getElementById("mapLocation").textContent =
    currentEvent.location || "Location not specified";
  document.getElementById("categoryBadge").textContent =
    currentEvent.category || "Category";

  const eventImage = document.getElementById("eventMainImage");
  if (eventImage) {
    eventImage.src =
      currentEvent.image ||
      "https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image";
    eventImage.alt = currentEvent.title || "Event Image";
    eventImage.onerror = function () {
      this.onerror = null;
      this.src = "https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image";
    };
  }

  updateMapDisplay();
  updateHeartButtonState();
  document.title = `${currentEvent.title || "Event"} - Sportshub`;
}

// Update map display
function updateMapDisplay() {
  const locationMap = document.getElementById("locationMap");
  if (!locationMap) return;

  if (currentEvent.locationLink) {
    locationMap.src = currentEvent.locationLink;
  } else if (currentEvent.latitude && currentEvent.longitude) {
    locationMap.src = `https://maps.google.com/maps?q=${currentEvent.latitude},${currentEvent.longitude}&output=embed&z=15`;
  } else if (currentEvent.location) {
    const encodedLocation = encodeURIComponent(currentEvent.location);
    locationMap.src = `https://maps.google.com/maps?q=${encodedLocation}&output=embed&z=15`;
  } else {
    locationMap.src =
      "https://maps.google.com/maps?q=Phnom+Penh,+Cambodia&output=embed&z=12";
  }
}

// Update heart button state
function updateHeartButtonState() {
  const mainHeartBtn = document.getElementById("mainHeartBtn");
  if (!mainHeartBtn || !currentEvent) return;

  if (favoriteEvents.has(currentEvent.id)) {
    mainHeartBtn.classList.remove("text-gray-300");
    mainHeartBtn.classList.add("text-red-500");
  } else {
    mainHeartBtn.classList.remove("text-red-500");
    mainHeartBtn.classList.add("text-gray-300");
  }
}

// Create comments
function createComments() {
  const commentsContainer = document.getElementById("commentsContainer");
  if (!commentsContainer) return;

  const commentsHtml = commentsData
    .map(
      (comment, index) => `
          <section class="flex space-x-3">
              <figure class="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                  <span>${comment.avatar}</span>
              </figure>
              <section class="flex-1">
                  <section class="bg-gray-50 rounded-lg p-3">
                      <section class="flex items-center space-x-2 mb-1">
                          <span class="font-medium custom-text">${
                            comment.name
                          }</span>
                          <span class="text-xs text-gray-500">${
                            comment.time
                          }</span>
                      </section>
                      <p class="text-gray-700 text-sm">${comment.comment}</p>
                  </section>
                  <section class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <button class="hover:text-accent transition-colors like-btn" onclick="likeComment(this, ${index})" ${
        comment.liked ? "disabled" : ""
      }>
                          <i class="fas fa-thumbs-up mr-1 ${
                            comment.liked ? "text-accent" : ""
                          }"></i> 
                          Like (<span class="like-count">${
                            comment.likes
                          }</span>)
                      </button>
                      <button class="hover:text-accent transition-colors">Reply</button>
                  </section>
              </section>
          </section>
      `
    )
    .join("");

  commentsContainer.innerHTML = commentsHtml;
}

// Navigation functions
function goBackToHome() {
  window.location.href = "../../index.html";
}

// Share functions
function shareToFacebook() {
  if (!currentEvent) return;
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(currentEvent.title);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`,
    "_blank"
  );
}

function shareToTelegram() {
  if (!currentEvent) return;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    `${currentEvent.title} - ${currentEvent.location}`
  );
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
}

function shareToInstagram() {
  copyEventLink();
  alert("Event link copied! You can paste it in your Instagram post or story.");
}

function copyEventLink() {
  const eventLink = window.location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(eventLink)
      .then(() => {
        showNotification("Event link copied to clipboard!", "success");
      })
      .catch(() => {
        fallbackCopyToClipboard(eventLink);
      });
  } else {
    fallbackCopyToClipboard(eventLink);
  }
}

// Fallback copy function for older browsers
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showNotification("Event link copied to clipboard!", "success");
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
    showNotification(
      "Unable to copy link. Please copy manually: " + text,
      "error"
    );
  }

  document.body.removeChild(textArea);
}

// Show notification function
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white font-medium ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// Interactive functions
function toggleHeart(heartElement) {
  if (!currentEvent) return;

  if (favoriteEvents.has(currentEvent.id)) {
    favoriteEvents.delete(currentEvent.id);
    heartElement.classList.remove("text-red-500");
    heartElement.classList.add("text-gray-300");
    showNotification("Removed from favorites", "success");
  } else {
    favoriteEvents.add(currentEvent.id);
    heartElement.classList.add("text-red-500");
    heartElement.classList.remove("text-gray-300");
    showNotification("Added to favorites", "success");
  }
}

function likeComment(button, commentIndex) {
  if (
    commentIndex >= 0 &&
    commentIndex < commentsData.length &&
    !commentsData[commentIndex].liked
  ) {
    commentsData[commentIndex].likes++;
    commentsData[commentIndex].liked = true;

    const countSpan = button.querySelector(".like-count");
    const icon = button.querySelector(".fas");

    countSpan.textContent = commentsData[commentIndex].likes;
    button.classList.add("text-accent");
    icon.classList.add("text-accent");
    button.disabled = true;

    showNotification("Comment liked!", "success");
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  console.log("Detail page loading...");
  initHamburgerMenu();

  loadEventData();
  createComments();

  const mainHeartBtn = document.getElementById("mainHeartBtn");
  if (mainHeartBtn) {
    mainHeartBtn.addEventListener("click", function () {
      toggleHeart(this);
    });
  }

  const openMapBtn = document.getElementById("openMapBtn");
  if (openMapBtn) {
    openMapBtn.addEventListener("click", function () {
      if (currentEvent.locationLink) {
        window.open(
          currentEvent.locationLink.replace("output=embed", "output=maps"),
          "_blank"
        );
      } else if (currentEvent.latitude && currentEvent.longitude) {
        window.open(
          `https://maps.google.com/maps?q=11.5862081419765,104.885882453093`,
          "_blank"
        );
      } else if (currentEvent.locationName) {
        const encodedLocation = encodeURIComponent(currentEvent.locationName);
        window.open(
          `https://maps.google.com/maps?q=${encodedLocation}`,
          "_blank"
        );
      }
    });
  }

  const postCommentBtn = document.getElementById("postCommentBtn");
  if (postCommentBtn) {
    postCommentBtn.addEventListener("click", function () {
      const commentText = document.getElementById("commentText");
      if (commentText && commentText.value.trim()) {
        const newComment = {
          name: "អ្នកប្រើប្រាស់",
          avatar: "AP",
          time: "ទើបតែ",
          comment: commentText.value.trim(),
          likes: 0,
          liked: false,
        };
        commentsData.unshift(newComment);
        createComments();
        commentText.value = "";
        showNotification("Comment posted successfully!", "success");
      } else {
        showNotification("Please write a comment first.", "error");
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      goBackToHome();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      copyEventLink();
    }
  });

  console.log("Detail page loaded successfully");
});
