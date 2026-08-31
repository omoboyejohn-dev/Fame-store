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

/* =========================
   PRODUCTS
========================= */

const productsGrid =
    document.getElementById("productsGrid");


function formatProductPrice(amount) {

    const number =
        Number(amount) || 0;

    return "₦" +
        number.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

}


function loadProducts() {

    if (!productsGrid) return;

    const productsRef =
        collection(db, "products");

    const productsQuery =
        query(
            productsRef,
            orderBy("createdAt", "desc")
        );


    onSnapshot(
        productsQuery,

        snapshot => {

            productsGrid.innerHTML = "";


            if (snapshot.empty) {

                productsGrid.innerHTML = `
                    <div class="products-empty">
                        No gifts are available yet.
                    </div>
                `;

                return;

            }


            snapshot.forEach(productDoc => {

                const product =
                    productDoc.data();


                const name =
                    product.name ||
                    product.productName ||
                    "Gift";


                const price =
                    product.price || 0;


                const image =
                    product.imageUrl ||
                    product.image ||
                    "https://via.placeholder.com/600x400?text=Fame+Store";


                const destination =
                    product.destination ||
                    "Global Delivery";


                const category =
                    product.category ||
                    "Gift";


                const card =
                    document.createElement("div");


                card.className =
                    "product-card";


                card.innerHTML = `

                    <img
                        class="product-image"
                        src="${image}"
                        alt="${name}"
                        loading="lazy"
                        onerror="this.src='https://via.placeholder.com/600x400?text=Fame+Store'"
                    >

                    <div class="product-content">

                        <div class="product-category">
                            ${category}
                        </div>

                        <div class="product-name">
                            ${name}
                        </div>

                        <div class="product-destination">
                            📍 ${destination}
                        </div>

                        <div class="product-bottom">

                            <div class="product-price">
                                ${formatProductPrice(price)}
                            </div>

                            <button
                                class="order-product-btn"
                                data-id="${productDoc.id}">

                                Send Gift

                            </button>

                        </div>

                    </div>

                `;


                const orderButton =
                    card.querySelector(
                        ".order-product-btn"
                    );


                orderButton.addEventListener(
                    "click",
                    () => {

                        /*
                         * Change this page later if
                         * you create a dedicated
                         * product-order page.
                         */

                        window.location.href =
                            "usa.html?product=" +
                            encodeURIComponent(
                                productDoc.id
                            );

                    }
                );


                productsGrid.appendChild(card);

            });

        },

        error => {

            console.error(
                "PRODUCT LOAD ERROR:",
                error
            );


            productsGrid.innerHTML = `

                <div class="products-error">

                    Unable to load products.
                    Please refresh the page.

                </div>

            `;

        }
    );

}


/* Load products */

loadProducts();
