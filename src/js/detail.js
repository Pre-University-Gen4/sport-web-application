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

  // Format date to English for display
  function formatDateToEnglish(dateStr) {
      if (!dateStr) return 'Date not available';
      const date = new Date(dateStr);
      const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
      };
      return date.toLocaleDateString('en-US', options);
  }

  // Load event data
  function loadEventData() {
      // Try to get event data from localStorage
      const savedEventData = localStorage.getItem('selectedEvent');

      if (savedEventData) {
          currentEvent = JSON.parse(savedEventData);
          console.log('Loaded event data:', currentEvent);
          // Clear the localStorage after loading
          localStorage.removeItem('selectedEvent');
      }

      if (!currentEvent) {
          // Fallback to sample data if no event is selected
          console.warn('No event data found, using fallback data');
          currentEvent = {
              id: 1,
              title: "Sample Sports Event",
              description: "This is a sample sports event. Please navigate from the events page to see real event data.",
              date: new Date().toISOString(),
              location: "Sample Location",
              latitude: 11.5564,
              longitude: 104.9282,
              category: "Sample Category",
              image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
              locationLink: "https://maps.google.com/maps?q=11.5564,104.9282&output=embed&z=15"
          };
      }

      // Update DOM elements with event data
      updateEventDisplay();
  }

  // Update the display with current event data
  function updateEventDisplay() {
      if (!currentEvent) return;

      // Update basic information
      document.getElementById('eventTitle').textContent = currentEvent.title || 'Event Title';
      document.getElementById('eventDescription').textContent = currentEvent.description || 'No description available for this event.';
      document.getElementById('eventDate').textContent = formatDateToEnglish(currentEvent.date);
      document.getElementById('eventLocation').textContent = currentEvent.location || 'Location not specified';
      document.getElementById('mapLocation').textContent = currentEvent.location || 'Location not specified';
      document.getElementById('categoryBadge').textContent = currentEvent.category || 'Category';

      // Update event image
      const eventImage = document.getElementById('eventMainImage');
      if (eventImage) {
          eventImage.src = currentEvent.image || 'https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image';
          eventImage.alt = currentEvent.title || 'Event Image';

          // Add error handling for image
          eventImage.onerror = function() {
              this.onerror = null;
              this.src = 'https://placehold.co/800x400/3b82f6/ffffff?text=Event+Image';
          };
      }

      // Update map
      updateMapDisplay();

      // Update heart button state
      updateHeartButtonState();

      // Update page title
      document.title = `${currentEvent.title || 'Event'} - Sportshub`;
  }

  // Update map display
  function updateMapDisplay() {
      const locationMap = document.getElementById('locationMap');
      if (!locationMap) return;

      if (currentEvent.locationLink) {
          locationMap.src = currentEvent.locationLink;
      } else if (currentEvent.latitude && currentEvent.longitude) {
          // Create Google Maps embed URL from coordinates
          locationMap.src = `https://maps.google.com/maps?q=${currentEvent.latitude},${currentEvent.longitude}&output=embed&z=15`;
      } else if (currentEvent.location) {
          // Create Google Maps embed URL from location name
          const encodedLocation = encodeURIComponent(currentEvent.location);
          locationMap.src = `https://maps.google.com/maps?q=${encodedLocation}&output=embed&z=15`;
      } else {
          // Default to Phnom Penh if no location data
          locationMap.src = "https://maps.google.com/maps?q=Phnom+Penh,+Cambodia&output=embed&z=12";
      }
  }

  // Update heart button state
  function updateHeartButtonState() {
      const mainHeartBtn = document.getElementById('mainHeartBtn');
      if (!mainHeartBtn || !currentEvent) return;

      if (favoriteEvents.has(currentEvent.id)) {
          mainHeartBtn.classList.remove('text-gray-300');
          mainHeartBtn.classList.add('text-red-500');
      } else {
          mainHeartBtn.classList.remove('text-red-500');
          mainHeartBtn.classList.add('text-gray-300');
      }
  }

  // Header Component
  function createHeader() {
      return `
                <section class="custom-bg shadow-sm border-b border-gray-200">
                    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <section class="flex justify-between items-center py-4">
                            <section class="flex items-center cursor-pointer" onclick="goBackToHome()">
                                <img src="../../image/logo/logo.png" alt="Logo" class="h-10" onerror="this.onerror=null;this.src='https://placehold.co/40x40/3b82f6/ffffff?text=Logo';">
                            </section>

                            <nav class="hidden md:flex space-x-8">
                                <a href="../../index.html" class="custom-text hover:text-accent transition-colors font-medium english-text">Home</a>
                                <a href="../html/event.html" class="custom-text hover:text-accent transition-colors font-medium english-text">Event</a>
                                <a href="../html/about.html" class="custom-text hover:text-accent transition-colors font-medium english-text">About</a>
                            </nav>

                            <section class="flex items-center space-x-4">
                                <button class="p-2 text-gray-600 hover:text-red-500 transition-colors">
                                    <i class="fas fa-heart text-xl"></i>
                                </button>

                                <button class="p-2 text-gray-600 hover:text-accent transition-colors">
                                    <i class="fas fa-user-circle text-xl"></i>
                                </button>

                                <button onclick="goBackToHome()" class="post-button text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                                    <i class="fas fa-arrow-left"></i>
                                    <span class="english-text">Back</span>
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
            <footer class="custom-bg py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid md:grid-cols-5 gap-8">
                        <div>
                            <h3 class="text-lg font-semibold mb-4 english-text">Organized By</h3>
                            <img src="../../image/logo/istad.png" alt="ISTAD Logo" class="w-20 h-15 mb-4" onerror="this.onerror=null;this.src='https://placehold.co/80x60/000249/ffffff?text=ISTAD';">
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold mb-4 english-text">Prepared By</h3>
                            <img src="../../image/logo/logo.png" alt="sportshub Logo" class="w-21 h-20 mb-4" onerror="this.onerror=null;this.src='https://placehold.co/84x80/000249/ffffff?text=Logo';">
                        </div>
                        <nav>
                            <h3 class="text-lg font-semibold mb-4 english-text">Category</h3>
                            <ul class="space-y-2">
                                <li><a href="#" class="custom-text hover:text-accent transition-colors english-text">Football</a></li>
                                <li><a href="#" class="custom-text hover:text-accent transition-colors english-text">Basketball</a></li>
                                <li><a href="#" class="custom-text hover:text-accent transition-colors english-text">Swimming</a></li>
                                <li><a href="#" class="custom-text hover:text-accent transition-colors english-text">Tennis</a></li>
                                <li><a href="#" class="custom-text hover:text-accent transition-colors english-text">Golf</a></li>
                            </ul>
                        </nav>
                        <nav>
                            <h3 class="text-lg font-semibold mb-4 english-text">Quick Links</h3>
                            <ul class="space-y-2">
                                <li><a href="../../index.html" class="custom-text hover:text-accent transition-colors english-text">All News</a></li>
                                <li><a href="../html/event.html" class="custom-text hover:text-accent transition-colors english-text">Event</a></li>
                                <li><a href="../html/about.html" class="custom-text hover:text-accent transition-colors english-text">About Us</a></li>
                            </ul>
                        </nav>
                        <nav>
                            <h3 class="text-lg font-semibold mb-4 english-text">Connect With Us</h3>
                            <div class="flex space-x-4">
                                <a href="#" class="text-gray-600 hover:text-accent transition-colors" aria-label="Follow us on Facebook">
                                    <i class="fab fa-facebook-f text-xl"></i>
                                </a>
                                <a href="#" class="text-gray-600 hover:text-accent transition-colors" aria-label="Follow us on Telegram">
                                    <i class="fab fa-telegram text-xl"></i>
                                </a>
                                <a href="#" class="text-gray-600 hover:text-accent transition-colors" aria-label="Follow us on Instagram">
                                    <i class="fab fa-instagram text-xl"></i>
                                </a>
                                <a href="#" class="text-gray-600 hover:text-accent transition-colors" aria-label="Follow us on YouTube">
                                    <i class="fab fa-youtube text-xl"></i>
                                </a>
                            </div>
                        </nav>
                    </div>
                    <div class="border-t border-gray-300 mt-8 pt-8 text-center">
                        <p class="custom-text text-sm english-text">© 2025 SportHub. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
            `;
  }

  // Create comments
  function createComments() {
      const commentsContainer = document.getElementById('commentsContainer');
      if (!commentsContainer) return;

      const commentsHtml = commentsData.map((comment, index) => `
                <section class="flex space-x-3">
                    <figure class="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-medium text-sm">
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
                            <button class="hover:text-accent transition-colors like-btn" onclick="likeComment(this, ${index})" ${comment.liked ? 'disabled' : ''}>
                                <i class="fas fa-thumbs-up mr-1 ${comment.liked ? 'text-accent' : ''}"></i> 
                                Like (<span class="like-count">${comment.likes}</span>)
                            </button>
                            <button class="hover:text-accent transition-colors">Reply</button>
                        </section>
                    </section>
                </section>
            `).join('');

      commentsContainer.innerHTML = commentsHtml;
  }

  // Navigation functions
  function goBackToHome() {
      window.location.href = '../../index.html';
  }

  // Share functions
  function shareToFacebook() {
      if (!currentEvent) return;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(currentEvent.title);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
  }

  function shareToTelegram() {
      if (!currentEvent) return;
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
      if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(eventLink).then(() => {
              showNotification('Event link copied to clipboard!', 'success');
          }).catch(() => {
              fallbackCopyToClipboard(eventLink);
          });
      } else {
          fallbackCopyToClipboard(eventLink);
      }
  }

  // Fallback copy function for older browsers
  function fallbackCopyToClipboard(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
          document.execCommand('copy');
          showNotification('Event link copied to clipboard!', 'success');
      } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
          showNotification('Unable to copy link. Please copy manually: ' + text, 'error');
      }

      document.body.removeChild(textArea);
  }

  // Show notification function
  function showNotification(message, type = 'success') {
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white font-medium ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`;
      notification.textContent = message;

      document.body.appendChild(notification);

      // Auto remove after 3 seconds
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
          heartElement.classList.remove('text-red-500');
          heartElement.classList.add('text-gray-300');
          showNotification('Removed from favorites', 'success');
      } else {
          favoriteEvents.add(currentEvent.id);
          heartElement.classList.add('text-red-500');
          heartElement.classList.remove('text-gray-300');
          showNotification('Added to favorites', 'success');
      }
  }

  function likeComment(button, commentIndex) {
      if (commentIndex >= 0 && commentIndex < commentsData.length && !commentsData[commentIndex].liked) {
          commentsData[commentIndex].likes++;
          commentsData[commentIndex].liked = true;

          const countSpan = button.querySelector('.like-count');
          const icon = button.querySelector('.fas');

          countSpan.textContent = commentsData[commentIndex].likes;
          button.classList.add('text-accent');
          icon.classList.add('text-accent');
          button.disabled = true;

          showNotification('Comment liked!', 'success');
      }
  }

  // Initialize page
  document.addEventListener('DOMContentLoaded', function() {
      console.log('Detail page loading...');

      // Load components
      document.getElementById('header').innerHTML = createHeader();
      document.getElementById('footer').innerHTML = createFooter();

      // Load event data and update display
      loadEventData();
      createComments();

      // Set up event listeners
      const mainHeartBtn = document.getElementById('mainHeartBtn');
      if (mainHeartBtn) {
          mainHeartBtn.addEventListener('click', function() {
              toggleHeart(this);
          });
      }

      const openMapBtn = document.getElementById('openMapBtn');
      if (openMapBtn) {
          openMapBtn.addEventListener('click', function() {
              if (currentEvent.locationLink) {
                  window.open(currentEvent.locationLink.replace('output=embed', 'output=maps'), '_blank');
              } else if (currentEvent.latitude && currentEvent.longitude) {
                  window.open(`https://maps.google.com/maps?q=${currentEvent.latitude},${currentEvent.longitude}`, '_blank');
              } else if (currentEvent.location) {
                  const encodedLocation = encodeURIComponent(currentEvent.location);
                  window.open(`https://maps.google.com/maps?q=${encodedLocation}`, '_blank');
              }
          });
      }

      const postCommentBtn = document.getElementById('postCommentBtn');
      if (postCommentBtn) {
          postCommentBtn.addEventListener('click', function() {
              const commentText = document.getElementById('commentText');
              if (commentText && commentText.value.trim()) {
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
                  showNotification('Comment posted successfully!', 'success');
              } else {
                  showNotification('Please write a comment first.', 'error');
              }
          });
      }

      // Keyboard shortcuts
      document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
              goBackToHome();
          }
          if ((e.ctrlKey || e.metaKey) && e.key === 's') {
              e.preventDefault();
              copyEventLink();
          }
      });

      console.log('Detail page loaded successfully');
  });