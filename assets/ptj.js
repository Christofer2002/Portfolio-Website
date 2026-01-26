const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Skills ===============*/

/*const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      
*/

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*======================= Portfolio Swiper ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
// Dark theme and icon class names
const themeButton = document.getElementById("theme-button");
// tippy instances for tooltips (initialized after translations load)
let themeTippyInstance = null;
let langTippyInstance = null;
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Default to dark theme if no preference is saved
if (!selectedTheme) {
  // Set dark theme as default
  document.body.classList.add(darkTheme);
  themeButton.classList.add(iconTheme);
  // Save the default in localStorage
  localStorage.setItem("selected-theme", "dark");
  localStorage.setItem("selected-icon", "uil-moon");
} else {
  // Apply the previously saved theme and icon
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
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

// Helper functions to get the current theme and icon
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

/* ===================== I18N / Language Toggle ===================== */
// Load translations from assets/i18n.json, provide language toggle and persist selection
let translations = {};
const langToggle = document.getElementById("lang-toggle");

function setElementTextPreserveIcon(el, text) {
  if (!el) return;
  // If element has no element children, replace textContent entirely
  const hasElementChild = Array.from(el.childNodes).some((n) => n.nodeType === Node.ELEMENT_NODE);
  if (!hasElementChild) {
    el.textContent = text;
    return;
  }

  // Try to replace an existing text node (commonly the first child)
  for (let i = 0; i < el.childNodes.length; i++) {
    const n = el.childNodes[i];
    if (n.nodeType === Node.TEXT_NODE) {
      n.nodeValue = text;
      return;
    }
  }

  // Otherwise insert a text node at the beginning
  el.insertBefore(document.createTextNode(text), el.firstChild);
}

function setLanguage(lang) {
  if (!translations[lang]) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = translations[lang][key];
    if (!value) return;

    // Inputs/textarea: set placeholder when appropriate
    const tag = el.tagName.toLowerCase();
    if (tag === "input" || tag === "textarea") {
      el.placeholder = value;
      return;
    }

    // Preserve icons/elements inside buttons/anchors
    setElementTextPreserveIcon(el, value);
  });

  if (langToggle) langToggle.textContent = lang === "en" ? "ES" : "EN";
  localStorage.setItem("language", lang);

  // Set tooltip and accessible label for theme and language controls
  try {
    const themeTooltip = translations[lang] && translations[lang].tooltip_theme ? translations[lang].tooltip_theme : '';
    const langTooltip = translations[lang] && translations[lang].tooltip_language ? translations[lang].tooltip_language : '';

    if (themeButton) {
      themeButton.setAttribute('title', themeTooltip);
      themeButton.setAttribute('aria-label', themeTooltip);
      // initialize or update tippy
      if (window.tippy) {
        if (themeTippyInstance) {
          themeTippyInstance.setContent(themeTooltip);
        } else {
          themeTippyInstance = tippy(themeButton, { content: themeTooltip, delay: [0, 0], placement: 'bottom', arrow: true, theme: 'light' });
        }
      }
    }

    if (langToggle) {
      langToggle.setAttribute('title', langTooltip);
      langToggle.setAttribute('aria-label', langTooltip);
      if (window.tippy) {
        if (langTippyInstance) {
          langTippyInstance.setContent(langTooltip);
        } else {
          langTippyInstance = tippy(langToggle, { content: langTooltip, delay: [0, 0], placement: 'bottom', arrow: true, theme: 'light' });
        }
      }
    }
  } catch (e) {
    // ignore
  }

  // Update CV download link href if provided in translations
  try {
    const cvLink = document.getElementById("cv-download");
    if (cvLink && translations[lang] && translations[lang].cv_href) {
      cvLink.setAttribute("href", translations[lang].cv_href);
    }
  } catch (e) {
    // ignore
  }
}

// Initialize translations
document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/i18n.json")
    .then((r) => r.json())
    .then((data) => {
      translations = data;
      const saved = localStorage.getItem("language");
      if (saved && translations[saved]) {
        setLanguage(saved);
        return;
      }

      // Detect browser language (prefer 'es' if startsWith 'es')
      const navLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
      const defaultLang = navLang.startsWith("es") ? "es" : "en";
      setLanguage(defaultLang);
    })
    .catch((err) => {
      console.warn("Failed to load translations via fetch:", err);
      // Fallback to inline translations injected in HTML (useful when opening file://)
      if (window && window.__I18N_INLINE) {
        translations = window.__I18N_INLINE;
        const saved = localStorage.getItem("language");
        if (saved && translations[saved]) {
          setLanguage(saved);
        } else {
          const navLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
          const defaultLang = navLang.startsWith("es") ? "es" : "en";
          setLanguage(defaultLang);
        }
        return;
      }
      console.error("Failed to load translations:", err);
    });

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const current = localStorage.getItem("language") || "en";
      const next = current === "en" ? "es" : "en";
      setLanguage(next);
    });
  }
});