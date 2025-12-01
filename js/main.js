// === Contact – simple form validation ===

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent default submit / page reload

        // Read values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!name || !email || !message) {
            contactStatus.textContent = "Vyplň prosím všechna pole.";
            contactStatus.classList.remove("success");
            contactStatus.classList.add("error");
            return;
        }

        // Simple email check (only checks for @)
        if (!email.includes("@")) {
            contactStatus.textContent = "Zadej prosím platný e-mail.";
            contactStatus.classList.remove("success");
            contactStatus.classList.add("error");
            return;
        }

        // No backend here
        // Shows a confirmation message only:
        contactStatus.textContent = "Děkujeme za zprávu! Ozveme se ti co nejdříve.";
        contactStatus.classList.remove("error");
        contactStatus.classList.add("success");

        // Clear the form
        contactForm.reset();
    });
}

// === Plan selection on the "Pricing" page ===

const planButtons = document.querySelectorAll(".select-plan");
const selectedPlanText = document.getElementById("selectedPlan");

if (planButtons.length > 0 && selectedPlanText) {
    planButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const planName = this.dataset.planName;
            const planPrice = this.dataset.planPrice;

            // Update summary text
            selectedPlanText.textContent = `Vybral sis variantu ${planName} za ${planPrice}.`;

            // Highlight selected card
            const allCards = document.querySelectorAll(".pricing-card");
            allCards.forEach(function(card) {
                card.classList.remove("selected-plan");
            });

            const parentCard = this.closest(".pricing-card");
            if (parentCard) {
                parentCard.classList.add("selected-plan");
            }
        });
    });
}

// === Light / dark theme toggle + localStorage ===

const themeToggleBtn = document.getElementById("themeToggle");
const rootElement = document.documentElement; // <html> element

function applyTheme(theme) {
    if (!themeToggleBtn) return;

    if (theme === "dark") {
        rootElement.classList.add("dark-theme");
        themeToggleBtn.textContent = "☀️ Světlý režim";
    } else {
        rootElement.classList.remove("dark-theme");
        themeToggleBtn.textContent = "🌙 Tmavý režim";
    }
}

if (themeToggleBtn) {
    // Load stored theme or default to "light"
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener("click", function () {
        const isDark = rootElement.classList.contains("dark-theme");
        const newTheme = isDark ? "light" : "dark";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

// === Watch color selection on homepage ===

const mainWatchImage = document.getElementById("mainWatchImage");
const colorButtons = document.querySelectorAll(".color-option");
const selectedColorText = document.getElementById("selectedColorText");

if (mainWatchImage && colorButtons.length > 0 && selectedColorText) {
    // Initialize color dots based on data attribute
    colorButtons.forEach(function(button) {
        const circle = button.querySelector(".color-circle");
        const circleColor = button.dataset.colorCircle;
        if (circle && circleColor) {
            circle.style.backgroundColor = circleColor;
        }

        button.addEventListener("click", function() {
            
            colorButtons.forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

            const newImageSrc = this.dataset.imageSrc;
            const colorName = this.dataset.colorName;

            if (newImageSrc) {
                mainWatchImage.src = newImageSrc;
                mainWatchImage.alt = `Chytré hodinky SmartFit One – ${colorName}`;
            }

            // ➜ Restart animation
            mainWatchImage.classList.remove("watch-image-animate");
            // Force reflow so the animation can play again
            void mainWatchImage.offsetWidth;
            mainWatchImage.classList.add("watch-image-animate");

            selectedColorText.textContent = `Aktuální barva: ${colorName}`;
        });
    });
}

// === Fade-in effect for sections on scroll ===

const revealTargets = document.querySelectorAll(
    ".hero-section, .color-section, .features-grid, .pricing-grid, .contact-grid, .page-intro"
);

if (revealTargets.length > 0) {
    
    revealTargets.forEach((el) => {
        el.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-visible");
                        observer.unobserve(entry.target); 
                    }
                });
            },
            {
                threshold: 0.15, 
            }
        );

        revealTargets.forEach((el) => observer.observe(el));
    } else {
        // Old browsers fallback 
        revealTargets.forEach((el) => el.classList.add("reveal-visible"));
    }
}

// === Mobile hamburger menu ===
const navToggle = document.getElementById("navToggle");
const siteHeader = document.querySelector(".site-header");

if (navToggle && siteHeader) {
    navToggle.addEventListener("click", () => {
        siteHeader.classList.toggle("nav-open");
    });

    // Optional: close menu after clicking a link
    const navLinks = siteHeader.querySelectorAll(".main-nav a");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            siteHeader.classList.remove("nav-open");
        });
    });
}




