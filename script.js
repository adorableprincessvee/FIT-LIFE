 // Navigation Active Link Highlighting
      const sections = document.querySelectorAll("section");
      const navLinks = document.querySelectorAll("nav a");

      window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 80;
          if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
          }
        });

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
          }
        });

        // Scroll Progress Bar
        const scrollProgress = document.querySelector(".scroll-progress");
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + "%";

        // Show/Hide Floating Button
        const floatingBtn = document.querySelector(".floating-btn");
        if (window.pageYOffset > 300) {
          floatingBtn.classList.add("show");
        } else {
          floatingBtn.classList.remove("show");
        }
      });

      // Typing Animation
      const texts = [
        "Physical Fitness,",
        "Weight Gain,",
        "Strength Training,",
        "Fat Loss,",
        "Weightlifting,",
        "Running.",
      ];

      let count = 0;
      let index = 0;
      let currentText = "";
      let letter = "";
      let isDeleting = false;

      function type() {
        if (count === texts.length) {
          count = 0;
        }

        currentText = texts[count];

        if (isDeleting) {
          letter = currentText.substring(0, index--);
        } else {
          letter = currentText.substring(0, index++);
        }

        document.getElementById("typing").textContent = letter;

        if (!isDeleting && index === currentText.length) {
          isDeleting = true;
          setTimeout(type, 1500);
          return;
        } else if (isDeleting && index === 0) {
          isDeleting = false;
          count++;
        }

        const speed = isDeleting ? 60 : 100;
        setTimeout(type, speed);
      }

      type();

      // Toggle Mobile Menu
      function toggleMenu() {
        const menuToggle = document.querySelector(".toggle");
        const navigator = document.querySelector(".navigator");
        menuToggle.classList.toggle("active");
        navigator.classList.toggle("active");
      }

      // Close menu when clicking on a nav link (mobile)
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          const menuToggle = document.querySelector(".toggle");
          const navigator = document.querySelector(".navigator");
          if (navigator.classList.contains("active")) {
            menuToggle.classList.remove("active");
            navigator.classList.remove("active");
          }
        });
      });

      // Scroll to Top Function
      function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Prevent horizontal scroll
      document.body.style.overflowX = "hidden";