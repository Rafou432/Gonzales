(function () {
  "use strict";

  /* Année dans le footer */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -----------------------------------------------
     Sliders avant / après
  ------------------------------------------------ */
  var sliders = document.querySelectorAll("[data-ba]");
  sliders.forEach(function (slider) {
    var range = slider.querySelector(".ba-range");
    var after = slider.querySelector(".ba-after");
    var handle = slider.querySelector(".ba-handle");
    if (!range || !after || !handle) return;

    function update(value) {
      after.style.width = value + "%";
      handle.style.left = value + "%";
    }

    update(range.value);
    range.addEventListener("input", function () {
      update(range.value);
    });
  });

  /* -----------------------------------------------
     Légère apparition au scroll
  ------------------------------------------------ */
  var revealTargets = document.querySelectorAll(
    ".service-card, .ba-slider, .review-card, .cert-item, .stat-item, .why-list li, .value-card, .team-member"
  );
  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el) { el.classList.add("reveal"); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  /* -----------------------------------------------
     Retour en haut
  ------------------------------------------------ */
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    var toggleBackToTop = function () {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    };
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -----------------------------------------------
     Formulaire de contact
     Pas de backend disponible : ouvre le client mail
     de l'utilisateur avec les informations pré-remplies.
  ------------------------------------------------ */
  var form = document.getElementById("contact-form");
  var formNote = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      var subject = "Demande de devis - " + name;
      var body =
        "Nom : " + name + "\n" +
        "Téléphone : " + phone + "\n" +
        "Email : " + email + "\n\n" +
        message;

      var mailto =
        "mailto:contact@goncalves-fils.fr" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;

      if (formNote) {
        formNote.textContent = "Votre messagerie va s'ouvrir pour envoyer votre demande.";
      }
    });
  }
})();
