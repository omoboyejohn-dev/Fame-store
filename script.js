/* =========================
   FAME STORE
   MAIN JAVASCRIPT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");

            if (mobileMenu.classList.contains("active")) {
                menuBtn.innerHTML = "✕";
            } else {
                menuBtn.innerHTML = "☰";
            }

        });


        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");
                menuBtn.innerHTML = "☰";

            });

        });

    }


    /* =========================
       GIFT BUTTONS
    ========================= */

    const giftButtons = document.querySelectorAll(".gift-link");
    const toast = document.getElementById("toast");

    giftButtons.forEach(button => {

        button.addEventListener("click", () => {

            showToast(
                "Gift selection will be available soon."
            );

        });

    });


    /* =========================
       TOAST
    ========================= */

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);

    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(
        ".gift-item, .step, .why-item, .feature-item"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
            "opacity .6s ease, transform .6s ease";

        observer.observe(element);

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const navLinks = document.querySelectorAll(
        '.desktop-nav a[href^="#"]'
    );

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================
       CURRENT YEAR
    ========================= */

    const currentYear = new Date().getFullYear();

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

});
