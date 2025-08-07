// Data for different sections
const heroData = [{
    image: "./src/image/istad.png"
}, {
    image: "./src/image/football.png"
}, {
    image: "./src/image/vb.png"
}];

const newEventsData = [{
    image: "./src/image/istad.png",
    category: "Football",
    title: "កម្មវិធីលេងកីឡា សាមគ្គីភាតរភាព របស់គ្រួសារ ISTAD នៃវិទ្យាស្ថាន សាយអិនស៍ អេន ថេក ណូ ឡជី អ៊ែតវ៉ានស៍ ឌីវេឡុបម៉ិន (ISTAD)",
    date: "ISTAD - July 30, 2025",
    description: "នាថ្ងៃសៅរ៍ ទី៥ ខែកក្កដា ឆ្នាំ២០២៥ វិទ្យាស្ថាន សាយអិនស៍ អេន ថេកណឡជី អ៊ែតវ៉ានស៍ ឌីវេឡុបម៉ិន (ISTAD) បានរៀបចំកម្មវិធីលេងកីឡា ការលេងល្បែងកម្សាន្ត សាមគ្គីភាតរភាព ដោយមានការចូលរួមពី លោកគ្រូនាយក លោកគ្រូអ្នកគ្រូ ព្រមទាំងសិស្សនិស្សិត អាហារូបករណ៍ Fullstack Web development ជំនាន់ទី ១, អាហារូបករណ៍ ព័ត៌មានវិទ្យាកម្រិតមូលដ្ឋាន(Foundation) ជំនាន់ទី ៤, អាហារូបករណ៍បច្ចេកវិទ្យាឌីជីថល (Pre-university) ជំនាន់ទី ៤ និងថ្នាក់សញ្ញាបត្របច្ចេកទេស ជាន់ខ្ពស់ (Associate)  ប្រកបដោយភាពសប្បាយរីករាយ។"
}, {
    image: "./src/image/vb.png",
    category: "Basketball",
    title: "ក្រុមបាល់ទះនារីកម្ពុជាបន្តឈ្នះម្ចាស់ផ្ទះថៃឈរលេខ១ក្នុងពូល ជម្រុះប៉ារ៉ាឡាំពិក",
    date: "ISTAD - August 1, 2025",
    description: "នៅ​យប់​ ថ្ងៃ​ទី​១០ ខែ​មករានេះ ក្រុម​កីឡា​បាល់ទះ​នារី​ជម្រើស​ជាតិ​កម្ពុជា​បាន​យក​ឈ្នះ​ក្រុម​បាល់បោះនារីម្ចាស់​ផ្ទះ​ថៃ ដោយ​លទ្ធផល ៩-២ ដើម្បី​ឈរ​លេខ១​ក្នុងពូល B សម្រាប់​វិញ្ញាសាសា​៣​ទល់​៣ ក្នុង​ការ​​ប្រកួត​ជើង​ឯក​តំបន់អាស៊ី-អូសេអានី IWBF AOZ Championship និង​ជម្រុះ​ព្រឹត្តិការណ៍​កីឡា​ប៉ារ៉ាឡាំពិក ឆ្នាំ​២០២៤ នៅ​ប្រទេស​ថៃ។"
}];

const popularEventsData = [{
    image: "./src/image/my.png",
    title: "ប្រធានក្រុមបាល់ទាត់ផ្ការីកគ្រប់រដូវ ជម្រះមន្ទិលមហាជន លើការ ប្រកួតបាល់ទាត់មិត្ដភាព នៅកូរ៉េ។ ដើម្បីបង្កើតចំណង់មិត្តភាព​ និង...",
    date: "Jan 25, 2025"
}, {
    image: "./src/image/vbboy.png",
    title: "ក្រុមបាល់ទះរបស់ជម្រើសជាតិឥណ្ឌូណេស៊ីទទួលបានមេដាយមាសនិង​ក្រុមបាល់ទះជម្រើសជាតិកម្ពុជា ​ទទួលបាន​​​មេដាយប្រាក់...",
    date: "Jan 25, 2025"
}, {
    image: "./src/image/tdon.png",
    title: "ការប្រកួតកីឡាតេក្វាន់ដូ WT ជើងឯកថ្នាក់ជាតិ ឆ្នាំ២០២៣ មានកីឡាករ កីឡាការិនីសរុប ១២០នាក់ចូលរួម​ប្រជែង​មេដាយ មាស...",
    date: "Jan 25, 2025"
}, {
    image: "./src/image/swimon.png",
    title: "កីឡាហែលទឹកផ្តល់អត្ថប្រយោជន៍​យ៉ាងច្រើន​ដល់សុខភាព រាងកាយ និងផ្លូវចិត្ត...",
    date: "Jan 25, 2025"
}, {
    image: "./src/image/tdon.png",
    title: "ការប្រកួតកីឡាវាយសី វិញ្ញាសាវាយជាគូចម្រុះ (បុរស-នារី) ដែល កម្ពុជាទទួលបានមេដាយមាស កីឡា​វាយ​សី​ជួយ​បន្ថយហានិភ័យ​ពី​​...",
    date: "Jan 25, 2025"
}, {
    image: "./src/image/Boxing.png",
    title: "កីឡាករប្រដាល់ ៣ រូបដែលធ្វើអោយពិភពលោក ស្គាល់កណ្ដាប់ដៃអ៊ុយក្រែន",
    date: "Jan 20, 2025"
}, {
    image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Bun.Sophearum/Social(39)/686b71b14c08e_1751871900_medium.jpg",
    title: "ពិធីប្រណាំងទូកនៅឥណ្ឌូនេស៊ី កំពុងទទួលការចាប់អារម្មណ៍ដោយសារក្មេងប្រុសម្នាក់!",
    date: "Jan 15, 2025"
}, {
    image: "https://cdn.sabay.com/cdn/media.sabay.com/media/Chin-Sopheak/CS-(11)/68628cda3c80a_1751289000_medium.jpg",
    title: "កម្ពុជា​ ឈរនៅលេខរៀងលើគេបង្អស់​ ដោយដណ្ដើមមេដាយ​ ៩០គ្រឿង ក្នុងព្រឹត្ដិការណ៍ប្រកួត ITF​ ឆ្នាំនេះ",
    date: "Jan 12, 2025"
}];

const sportsCategoriesData = [{
    image: "./src/image/ski.png",
    title: "កីឡាជិះ​ស្គី​ទឹកកក",
    description: "កីឡាជិះស្គីទឹកកក គឺជាប្រភេទ កីឡាដែល ប្រព្រឹត្តិទៅនៅរដូវរងា..."
}, {
    image: "./src/image/golf.png",
    title: "កីឡាវាយកូនហ្កោល",
    description: "កីឡាវាយកូនហ្គោលគឺជាកីឡាដ៏មានប្រជាប្រិយភាពមួយដែលលេងនៅលើវាលស្មៅ..."
}, {
    image: "./src/image/swim.png",
    title: "កីឡាហែលទឹក",
    description: "កីឡាហែលទឹកគឺជាប្រភេទកីឡាមួយដែលមានប្រជាប្រិយភាពជាសកល..."
}, {
    image: "./src/image/football.png",
    title: "កីឡាបាល់ទាត់",
    description: "កីឡាបាល់ទាត់គឺជាកីឡាប្រកួតគ្នារវាងក្រុម ២ ដែលមាន អ្នកលេងនីមួយៗ ១១ នាក់..."
}, {
    image: "./src/image/run.png",
    title: "កីឡារត់ប្រណាំង",
    description: "កីឡារត់ប្រណាំងគឺជាប្រភេទ កីឡាអត្តពល កម្មដ៏ល្បីល្បាញ់..."
}, {
    image: "./src/image/vb.png",
    title: "កីឡាបាល់ទះ",
    description: "កីឡាបាល់ទះគឺជាកីឡាក្រុមមួយប្រភេទដែលលេងដោយក្រុមពីរ មានសមាជិក..."
}, {
    image: "./src/image/bkb.png",
    title: "កីឡាបាល់បោះ",
    description: "បាល់បោះគឺជាកីឡាក្រុមដែល​មានអ្នកលេង ៥នាក់​ក្នុងមួយ​ក្រុម។គោលបំណង..."
}];

// Hero Section Logic
let currentHeroIndex = 0;
let heroInterval;

function initHero() {
    const container = document.getElementById('hero-container');
    const indicators = document.getElementById('hero-indicators');

    if (!container || !indicators) return;

    // Create hero slides
    heroData.forEach((slide, index) => {
        const slideElement = document.createElement('section');
        slideElement.className = `hero-slide absolute inset-0 w-full h-full ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
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
    heroInterval = setInterval(nextHeroSlide, 8000);
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

    newEventsData.forEach((event) => {
        const eventElement = document.createElement('article');
        eventElement.className = 'card-container hidden cursor-pointer'; // All start hidden
        eventElement.innerHTML = `
            <section class="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6 items-stretch h-[400px] hover:shadow-lg transition-shadow duration-300">
                <section class="md:w-2/5 w-full">
                    <img src="${event.image}" alt="${event.title}" class="rounded-lg w-full h-full object-cover max-h-[300px]">
                </section>
                <section class="md:w-3/5 w-full flex flex-col justify-center h-full">
                    <h3 class="text-xl font-bold lg:text-2xl my-2 leading-tight khmer-text" style="color: #000249;">${event.title}</h3>
                    <time class="text-gray-500 text-sm mb-4 english-text">${event.date}</time>
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

    // Show the first event
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
    newEventInterval = setInterval(nextNewEvent, 10000);
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

    for (let i = 0; i < Math.min(popularEventsVisible, popularEventsData.length); i++) {
        const event = popularEventsData[i];
        const eventElement = document.createElement('article');
        eventElement.className = 'bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300';
        eventElement.innerHTML = `
            <img src="${event.image}" class="w-full h-48 object-cover" alt="${event.title}">
            <section class="p-4">
                <h3 class="text-lg card-title mb-2 leading-tight khmer-text" style="color: #000249;">${event.title}</h3>
                <time class="text-gray-400 text-xs english-text">${event.date}</time>
            </section>
        `;
        container.appendChild(eventElement);
    }

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

// Sports Categories Section Logic (Commented out but functions retained)
let sportsCategoriesVisible = 6;

function initSportsCategories() {
    const container = document.getElementById('sports-categories-grid');
    if (container) {
        renderSportsCategories();
    }
}

function renderSportsCategories() {
    const container = document.getElementById('sports-categories-grid');
    const seeMoreBtn = document.getElementById('sports-see-more');
    if (!container || !seeMoreBtn) return;

    container.innerHTML = '';

    for (let i = 0; i < Math.min(sportsCategoriesVisible, sportsCategoriesData.length); i++) {
        const sport = sportsCategoriesData[i];
        const sportElement = document.createElement('article');
        sportElement.className = 'bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300';
        sportElement.innerHTML = `
            <img src="${sport.image}" class="w-full h-48 object-cover" alt="${sport.title}">
            <section class="p-4">
                <h3 class="text-lg card-title mb-2 leading-tight khmer-text" style="color: #000249;">${sport.title}</h3>
                <p class="text-sm khmer-text" style="color: #000249;">${sport.description}</p>
            </section>
        `;
        container.appendChild(sportElement);
    }

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

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initHero();
    initNewEvents();
    initPopularEvents();
    initSportsCategories(); // This will run but won't find the elements if they are commented out in HTML

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