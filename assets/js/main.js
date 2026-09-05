document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("mainNavbar");
    const year = document.getElementById("currentYear");
    const contactForm =
        document.getElementById("contactForm");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    const handleNavbar = () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    handleNavbar();

    window.addEventListener(
        "scroll",
        handleNavbar,
        { passive: true }
    );

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    document
        .querySelectorAll(".reveal")
        .forEach((element) => {

            observer.observe(element);

        });

    const navigationLinks =
        document.querySelectorAll(
            "#navbarMenu .nav-link"
        );


    navigationLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                const menu =
                    document.getElementById(
                        "navbarMenu"
                    );

                if (
                    menu &&
                    menu.classList.contains("show")
                ) {

                    const collapse =
                        bootstrap.Collapse
                            .getOrCreateInstance(
                                menu
                            );

                    collapse.hide();

                }

            }
        );

    });


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                const nombre =
                    document.getElementById(
                        "nombre"
                    );

                const correo =
                    document.getElementById(
                        "correo"
                    );

                const mensaje =
                    document.getElementById(
                        "mensaje"
                    );


                if (
                    !nombre.value.trim() ||
                    !correo.checkValidity() ||
                    !mensaje.value.trim()
                ) {

                    event.preventDefault();

                    contactForm.classList.add(
                        "was-validated"
                    );

                    return;

                }

            }
        );

    }

});