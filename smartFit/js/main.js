// === Kontakt – jednoduchá validace formuláře ===

// Najdeme formulář a status zprávu (ale jen pokud jsme na contact.html)
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // zabrání klasickému odeslání / reloadu stránky

        // Načtení hodnot
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Základní kontrola
        if (!name || !email || !message) {
            contactStatus.textContent = "Vyplň prosím všechna pole.";
            contactStatus.classList.remove("success");
            contactStatus.classList.add("error");
            return;
        }

        // Velmi jednoduchá kontrola e-mailu (jen jestli obsahuje @)
        if (!email.includes("@")) {
            contactStatus.textContent = "Zadej prosím platný e-mail.";
            contactStatus.classList.remove("success");
            contactStatus.classList.add("error");
            return;
        }

        // Kdyby tu byl backend, tady bychom data poslali na server.
        // My jen zobrazíme potvrzení:
        contactStatus.textContent = "Děkujeme za zprávu! Ozveme se ti co nejdříve.";
        contactStatus.classList.remove("error");
        contactStatus.classList.add("success");

        // Vyčištění formuláře
        contactForm.reset();
    });
}

// === Výběr cenové varianty na stránce "Cena" ===

const planButtons = document.querySelectorAll(".select-plan");
const selectedPlanText = document.getElementById("selectedPlan");

if (planButtons.length > 0 && selectedPlanText) {
    planButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const planName = this.dataset.planName;
            const planPrice = this.dataset.planPrice;

            // Aktualizace textu shrnutí
            selectedPlanText.textContent = `Vybral sis variantu ${planName} za ${planPrice}.`;

            // Zvýraznění vybrané karty
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

// === Přepínání světlý / tmavý režim + localStorage ===

const themeToggleBtn = document.getElementById("themeToggle");
const rootElement = document.documentElement; // <html>

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
    // Načíst uložený theme nebo default "light"
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener("click", function () {
        const isDark = rootElement.classList.contains("dark-theme");
        const newTheme = isDark ? "light" : "dark";
        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

// === Výběr barvy hodinek na homepage ===

const mainWatchImage = document.getElementById("mainWatchImage");
const colorButtons = document.querySelectorAll(".color-option");
const selectedColorText = document.getElementById("selectedColorText");

if (mainWatchImage && colorButtons.length > 0 && selectedColorText) {
    // Inicializace barevných koleček podle data atributu
    colorButtons.forEach(function(button) {
        const circle = button.querySelector(".color-circle");
        const circleColor = button.dataset.colorCircle;
        if (circle && circleColor) {
            circle.style.backgroundColor = circleColor;
        }

        button.addEventListener("click", function() {
            // Odebereme active ze všech
            colorButtons.forEach(btn => btn.classList.remove("active"));

            // Přidáme active aktuálnímu
            this.classList.add("active");

            const newImageSrc = this.dataset.imageSrc;
            const colorName = this.dataset.colorName;

            if (newImageSrc) {
                mainWatchImage.src = newImageSrc;
                mainWatchImage.alt = `Chytré hodinky SmartFit One – ${colorName}`;
            }

            // ➜ Restart animace
            mainWatchImage.classList.remove("watch-image-animate");
            // vynutíme reflow, aby šla animace pustit znovu
            void mainWatchImage.offsetWidth;
            mainWatchImage.classList.add("watch-image-animate");

            selectedColorText.textContent = `Aktuální barva: ${colorName}`;
        });
    });
}


