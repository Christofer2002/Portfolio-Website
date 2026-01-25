/* global emailjs */

const NOTIFICATIONS = {
  en: {
    notif_fill_fields: "Please fill in all fields",
    notif_invalid_email: "Please enter a valid email address",
    notif_service_error: "Error loading mail service",
    notif_sent_success:
      "Message sent successfully! I will get back to you soon.",
    notif_sent_error: "Failed to send message. Please try again later.",
    notif_sending: "Sending message...",
  },
  es: {
    notif_fill_fields: "Por favor completa todos los campos",
    notif_invalid_email: "Por favor ingresa un correo válido",
    notif_service_error: "Error al cargar el servicio de correo",
    notif_sent_success:
      "¡Mensaje enviado correctamente! Me pondré en contacto pronto.",
    notif_sent_error: "No se pudo enviar el mensaje. Inténtalo más tarde.",
    notif_sending: "Enviando mensaje...",
  },
};

// Small helper: get translated text or fallback
function getText(key) {
  const lang = localStorage.getItem("language") || "en";
  return (
    (NOTIFICATIONS[lang] && NOTIFICATIONS[lang][key]) ||
    (NOTIFICATIONS.en && NOTIFICATIONS.en[key]) ||
    key
  );
}

document.addEventListener("DOMContentLoaded", function () {
  // initialize EmailJS if available
  if (window.emailjs && typeof emailjs.init === "function") {
    try {
      emailjs.init("VyrPQT3vk3zBlk12E");
    } catch (e) {}
  }
  setupContactForm();
});

function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendMessageBtn");
  if (!contactForm || !sendBtn) return;

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!window.emailjs) {
      showNotification(getText("notif_service_error"), "error");
      return;
    }

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      showNotification(getText("notif_fill_fields"), "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification(getText("notif_invalid_email"), "error");
      return;
    }

    sendBtn.disabled = true;
    const originalHTML = sendBtn.innerHTML;
    sendBtn.innerHTML = getText("notif_sending") || "Sending...";

    const templateParams = {
      from_name: name,
      from_email: email,
      email: email,
      message: message,
      time: new Date().toLocaleString(),
      year: new Date().getFullYear(),
      title: "Contact Module · DevByChris",
    };

    try {
      await emailjs.send("service_42jddgo", "template_l0n9d8w", templateParams);
      showNotification(getText("notif_sent_success"), "success");
      contactForm.reset();
    } catch (err) {
      showNotification(getText("notif_sent_error"), "error");
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = originalHTML;
    }
  });

  // click on styled button should submit form
  sendBtn.addEventListener("click", () => contactForm.requestSubmit());
}

function showNotification(message, type) {
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();
  const n = document.createElement("div");
  n.className = `notification notification--${type}`;
  n.textContent = message;

  if (!document.getElementById("notificationStyles")) {
    const style = document.createElement("style");
    style.id = "notificationStyles";
    style.textContent = `
      .notification { position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem; border-radius: 0.5rem; font-size: 0.938rem; font-weight: 500; z-index: 9999; animation: slideIn 0.3s ease-out; max-width: 400px; }
      .notification--success { background-color: #10b981; color: white; }
      .notification--error { background-color: #ef4444; color: white; }
      @keyframes slideIn { from { transform: translateX(450px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(450px); opacity: 0; } }
      @media screen and (max-width: 480px) { .notification { top: 10px; right: 10px; left: 10px; max-width: none; } }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(n);
  setTimeout(() => {
    n.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => n.remove(), 300);
  }, 5000);
}
