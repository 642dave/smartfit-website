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
