// Initialize AOS
AOS.init({
    once: true, // Whether animation should happen only once - while scrolling down
    mirror: false, // Whether elements should animate out while scrolling past them
});

// Featured mentors data with only Facebook and GitHub
let featuredMentors = [{
    name: "Mr. Kim Chansokpheng",
    role: "Mentor",
    image: "../img-about/Teacher2.jpg",
    description: "Learning from others is my favorite.",
    socialLinks: [{
        platform: "facebook",
        url: "https://www.facebook.com/share/19vE4S9jre/?mibextid=wwXIfr",
        icon: "fab fa-facebook-f"
    }, {
        platform: "github",
        url: "https://github.com/sokpheng001",
        icon: "fab fa-github"
    }]
}, {
    name: "Ms. Eung Lyzhia",
    role: "Mentor",
    image: "../img-about/Teacher1.jpg",
    description: "Every single step, challenges make him stronger...",
    socialLinks: [{
        platform: "facebook",
        url: " https://www.facebook.com/share/153E3fLo6W/?mibextid=wwXIfr",
        icon: "fab fa-facebook-f"
    }, {
        platform: "github",
        url: "https://github.com/lyzhiaa",
        icon: "fab fa-github"
    }]
}];

// Team members data with only Facebook and GitHub
let members = [{
    name: "Tak Sreytim",
    role: "Member",
    image: "../img-about/Sreytim.png",

    socialLinks: [{
        platform: "facebook",
        url: "https://www.facebook.com/share/1Cps1QHR8R/?mibextid=wwXIfr",
        icon: "fab fa-facebook-f"
    }, {
        platform: "github",
        url: "https://github.com/sreytim",
        icon: "fab fa-github"
    }]
}, {
    name: "So Sampoleu",
    role: "Member",
    image: "../img-about/Ponlue.jpg",
    socialLinks: [{
        platform: "facebook",
        url: "https://www.facebook.com/share/1ApxsYhmPm/?mibextid=wwXIfr",
        icon: "fab fa-facebook-f"
    }, {
        platform: "github",
        url: "https://github.com/SoSamponleu",
        icon: "fab fa-github"
    }]
}, {
    name: "Dy Chandara",
    role: "Member",
    image: "../img-about/Dara.jpg",
    socialLinks: [{
        platform: "facebook",
        url: "https://facebook.com/dachandara",
        icon: "fab fa-facebook-f"
    }, {
        platform: "github",
        url: "https://github.com/dachandara",
        icon: "fab fa-github"
    }]
}, {
    name: "Chhorn sengleang",
    role: "Member",
    image: "../img-about/Leng.jpg",
    socialLinks: [{
        platform: "facebook",
        url: "https://www.facebook.com/share/1BJBEwNune/?mibextid=wwXIfr",
        icon: "fab fa-facebook-f"
    }, {
        platform: "github",
        url: "https://github.com/seavleng",
        icon: "fab fa-github"
    }]
}, {
    name: "Dy Riya",
    role: "Member",
    image: "../img-about/riya.jpg",
    socialLinks: [{
        platform: "facebook",
        url: "https://www.facebook.com/share/15sjY61YM1/?mibextid=wwXIfr",
        icon: "fab fa-facebook-f"
    }, {
        platform: "github",
        url: " https://github.com/Dyriya/pre-uni-istad",
        icon: "fab fa-github"
    }]
}, {
    name: "Saing Senthay",
    role: "Member",
    image: "../img-about/Thay.jpg",
    socialLinks: [{
        platform: "facebook",
        url: "https://www.facebook.com/share/1APDaKJms6/",
        icon: "fab fa-facebook-f"
    }, {
        platform: "github",
        url: "https://github.com/Saing-Sengthay",
        icon: "fab fa-github"
    }]
}, {
    name: "Oeurn Selachhari",
    role: "Member",
    image: "../img-about/Chhari.jpg",
    socialLinks: [{
        platform: "facebook",
        url: "https://facebook.com/odomsakchhert",
        icon: "fab fa-facebook-f"
    }, {
        platform: "github",
        url: "https://github.com/odomsakchhert",
        icon: "fab fa-github"
    }]
}];

// Function to render featured mentors
function renderFeaturedMentors() {
    const featuredMentorsContainer = document.getElementById('featuredMentors');
    if (!featuredMentorsContainer) return; // Exit if element not found
    featuredMentorsContainer.innerHTML = '';

    featuredMentors.forEach((mentor, index) => {
                const mentorCard = document.createElement('div');
                // Add AOS attributes here
                mentorCard.setAttribute('data-aos', 'fade-up');
                mentorCard.setAttribute('data-aos-delay', index * 100);
                mentorCard.className = 'bg-white rounded-xl p-6 border border-gray-200 transition-shadow';

                const socialLinksHTML = mentor.socialLinks.map(social =>
                    `<a href="${social.url}" class="text-[#000249] hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                <i class="${social.icon} text-lg"></i>
            </a>`
                ).join('');

                mentorCard.innerHTML = `
            <div class="text-center">
                <div class="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                    ${mentor.image ?
                        `<img src="${mentor.image}" alt="${mentor.name}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/96x96/cccccc/ffffff?text=Mentor'; this.nextElementSibling.style.display='block';">
                         <span class="w-full h-full bg-gradient-to-b from-gray-400 to-[#000249] hidden"></span>` :
                        `<span class="w-full h-full bg-gradient-to-b from-gray-400 to-[#000249]"></span>`
                    }
                </div>
                <h3 class="font-bold text-[#000249] text-base mb-2">${mentor.name}</h3>
                <p class="text-blue-600 font-semibold text-sm mb-4">${mentor.role}</p>
                <div class="flex justify-center space-x-4">
                    ${socialLinksHTML}
                </div>
            </div>
        `;
        featuredMentorsContainer.appendChild(mentorCard);
    });
}

// Function to render team members in 3-4 layout
function renderMembers() {
    const membersRow1 = document.getElementById('membersRow1');
    const membersRow2 = document.getElementById('membersRow2');

    if (!membersRow1 || !membersRow2) return; // Exit if elements not found

    // Clear both rows
    membersRow1.innerHTML = '';
    membersRow2.innerHTML = '';

    members.forEach((member, index) => {
        const memberCard = document.createElement('div');
        // Add AOS attributes here
        memberCard.setAttribute('data-aos', 'zoom-in-up');
        memberCard.setAttribute('data-aos-delay', index * 50);
        memberCard.className = 'bg-white rounded-xl p-6 border border-gray-200 transition-shadow';

        const socialLinksHTML = member.socialLinks.map(social =>
            `<a href="${social.url}" class="text-[#000249] hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
                <i class="${social.icon} text-lg"></i>
            </a>`
        ).join('');

        memberCard.innerHTML = `
            <div class="text-center">
                <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    ${member.image ?
                        `<img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://placehold.co/96x96/cccccc/ffffff?text=Member'; this.nextElementSibling.style.display='block';">
                         <span class="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 hidden"></span>` :
                        '<span class="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600"></span>'
                    }
                </div>
                <h4 class="font-bold text-[#000249] text-base mb-2">${member.name}</h4>
                <p class="text-[#000249] text-sm mb-4">${member.role}</p>
                <div class="flex justify-center space-x-4">
                    ${socialLinksHTML}
                </div>
            </div>
        `;

        // First 3 go to row 1, rest go to row 2
        if (index < 3) {
            membersRow1.appendChild(memberCard);
        } else {
            membersRow2.appendChild(memberCard);
        }
    });
}

// Utility functions for image changes
function changeHeroImage(imageUrl) {
    const heroImage = document.getElementById('heroImage');
    if (heroImage) heroImage.src = imageUrl;
}

function changeStadiumImage(imageUrl) {
    const stadiumImage = document.getElementById('stadiumImage');
    if (stadiumImage) stadiumImage.src = imageUrl;
}

// Functions to manage featured mentors
function addFeaturedMentor(name, role, image = null, description = '', socialLinks = []) {
    featuredMentors.push({ name, role, image, description, socialLinks });
    renderFeaturedMentors();
}

function removeFeaturedMentor(index) {
    featuredMentors.splice(index, 1);
    renderFeaturedMentors();
}

function updateMentorSocials(index, socialLinks) {
    if (featuredMentors[index]) {
        featuredMentors[index].socialLinks = socialLinks;
        renderFeaturedMentors();
    }
}

function updateMentorImage(index, imageUrl) {
    if (featuredMentors[index]) {
        featuredMentors[index].image = imageUrl;
        renderFeaturedMentors();
    }
}

// Functions to manage team members
function addMember(name, role, image = null, socialLinks = []) {
    members.push({ name, role, image, socialLinks });
    renderMembers();
}

function removeMember(index) {
    members.splice(index, 1);
    renderMembers();
}

function updateMemberImage(index, imageUrl) {
    if (members[index]) {
        members[index].image = imageUrl;
        renderMembers();
    }
}

function updateMemberSocials(index, socialLinks) {
    if (members[index]) {
        members[index].socialLinks = socialLinks;
        renderMembers();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedMentors();
    renderMembers();
    // Re-initialize AOS after dynamic content is loaded
    AOS.refresh();
});