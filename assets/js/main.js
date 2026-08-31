/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Show menu */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Hide menu */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav_link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav_link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById("header");

  window.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  // serviceID - templateID - #form - publicKey
  emailjs
    .sendForm(
      "service_3ibnc8r",
      "template_6czvam8",
      "#contact-form",
      "O4IqrkeElHS8PYxMq",
    )
    .then(
      () => {
        // Show sent message
        contactMessage.textContent = "Message sent successfully ✅";

        // Remove message after five seconds
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        // Clear input fields
        contactForm.reset();
      },
      () => {
        // Show error message
        contactMessage.textContent = "Message not sent (service error) ❌";
      },
    );
};

contactForm.addEventListener("submit", sendEmail);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

// Link the ID of each section (section id="home") to each link (a href="#home")
// and activate the link with the class .active-link
const scrollActive = () => {
  // We get the position by scrolling down
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id, // id of each section
      top = section.offsetTop - 50, // Distance from the top edge
      height = section.offsetHeight, // Element height
      link = document.querySelector(".nav_menu a[href*=" + id + "]"); // id nav link

    if (!link) return;

    link.classList.toggle(
      "active-link",
      scrollY > top && scrollY <= top + height,
    );
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme,
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  //reset: true // Animation Repeat
});

sr.reveal(`.home_profile, .about_img, .contact_mail`, { origin: "right" });
sr.reveal(
  `.home_name, .home_info,
           .about_container .section_title-1, .about_info, .contact_social, .contact_data`,
  { origin: "left" },
);
sr.reveal(`.services_card, .projects_card`, { interval: 100 });

/*=============== SMOOTH CUSTOM CURSOR ===============*/
const customCursor = document.getElementById("custom-cursor");

if (customCursor) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentX = mouseX;
  let currentY = mouseY;

  let cursorActive = false;

  /* Mouse Move */
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    if (!cursorActive) {
      cursorActive = true;
      customCursor.classList.add("is-visible");
    }
  });

  /* Smooth Movement */
  function animateCursor() {
    currentX += (mouseX - currentX) * 0.18;
    currentY += (mouseY - currentY) * 0.18;

    customCursor.style.left = `${currentX}px`;
    customCursor.style.top = `${currentY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  /* Interactive Elements */
  const cursorTargets = document.querySelectorAll(
    "a, button, input, textarea, select, .nav_toggle, .nav_close, .change-theme",
  );

  cursorTargets.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      customCursor.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      customCursor.classList.remove("cursor-hover");
    });
  });

  /* Click */
  document.addEventListener("mousedown", () => {
    customCursor.classList.add("cursor-click");
  });

  document.addEventListener("mouseup", () => {
    customCursor.classList.remove("cursor-click");
  });

  /* Leave Page */
  document.addEventListener("mouseleave", () => {
    customCursor.classList.remove("is-visible");
  });

  document.addEventListener("mouseenter", () => {
    customCursor.classList.add("is-visible");
  });
}

/*==================================================
  AI ASSISTANT — OPEN / CLOSE
==================================================*/

const aiAssistant = document.getElementById("ai-assistant");
const aiToggle = document.getElementById("ai-toggle");
const aiClose = document.getElementById("ai-close");
const aiInput = document.getElementById("ai-input");

/*-----------------------------------------------
  Open AI
-----------------------------------------------*/

if (aiAssistant && aiToggle) {
  aiToggle.addEventListener("click", () => {
    aiAssistant.classList.add("ai-open");

    // Focus input after animation starts
    setTimeout(() => {
      aiInput?.focus();
    }, 300);
  });
}

/*-----------------------------------------------
  Close AI
-----------------------------------------------*/

if (aiAssistant && aiClose) {
  aiClose.addEventListener("click", () => {
    aiAssistant.classList.remove("ai-open");

    aiInput?.blur();
  });
}

/*-----------------------------------------------
  ESC → Close AI
-----------------------------------------------*/

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    aiAssistant?.classList.remove("ai-open");

    aiInput?.blur();
  }
});

/*==================================================
  AI ASSISTANT — CHAT
==================================================*/

const aiForm = document.getElementById("ai-form");
const aiMessages = document.getElementById("ai-messages");

/*-----------------------------------------------
  Add Message
-----------------------------------------------*/

function addAIMessage(message, type) {
  const messageWrapper = document.createElement("div");

  messageWrapper.classList.add(
    "ai-message",
    type === "user" ? "ai-message-user" : "ai-message-bot",
  );

  if (type === "bot") {
    messageWrapper.innerHTML = `
      <div class="ai-message-avatar">
        <i class="ri-sparkling-2-fill"></i>
      </div>

      <div class="ai-message-content">
        <p></p>
      </div>
    `;

    messageWrapper.querySelector("p").textContent = message;
  } else {
    messageWrapper.innerHTML = `
      <div class="ai-message-content">
        <p></p>
      </div>
    `;

    messageWrapper.querySelector("p").textContent = message;
  }

  aiMessages.appendChild(messageWrapper);

  aiMessages.scrollTop = aiMessages.scrollHeight;
}

/*-----------------------------------------------
  Send Message
-----------------------------------------------*/

if (aiForm) {
  aiForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = aiInput.value.trim();

    if (!message) return;

    /* User message */

    addAIMessage(message, "user");

    /* Clear input */

    aiInput.value = "";

    /* Loading */

    const loading = document.createElement("div");

    loading.className = "ai-message ai-message-bot";

    loading.innerHTML = `
      <div class="ai-message-avatar">
        <i class="ri-sparkling-2-fill"></i>
      </div>

      <div class="ai-message-content">
        <p class="ai-loading">
          <span></span>
          <span></span>
          <span></span>
        </p>
      </div>
    `;

    aiMessages.appendChild(loading);

    aiMessages.scrollTop = aiMessages.scrollHeight;

    try {
      const response = await fetch("/.netlify/functions/ai", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await response.json();

      /* Remove loading */

      loading.remove();

      if (!response.ok || !data.success) {
        addAIMessage("Sorry, I couldn't process that message.", "bot");

        return;
      }

      /* AI response */

      addAIMessage(data.message, "bot");
    } catch (error) {
      console.error(error);

      loading.remove();

      addAIMessage(
        "I'm having trouble connecting right now. Please try again.",
        "bot",
      );
    }
  });
}
