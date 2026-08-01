/**
 * main.js — single entry point.
 *
 * The page is built so that nothing essential depends on this file: the
 * navigation is plain anchors and the knowledge tabs are a CSS-driven radio
 * group. What follows is progressive enhancement only — the shrinking header,
 * the "About" dropdown and the mobile menu.
 */
(function () {
  "use strict";

  const SCROLL_THRESHOLD = 70;
  const DESKTOP_QUERY = "(min-width: 1024px)";
  const root = document.documentElement;

  /* ---------------------------------------------------------------------
     Header — compact state once the page is scrolled
     --------------------------------------------------------------------- */

  function initHeaderScroll() {
    let ticking = false;

    const update = () => {
      root.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------
     Dropdown — returns a closer so the menu can reset it on resize
     --------------------------------------------------------------------- */

  function initDropdowns() {
    const triggers = Array.from(document.querySelectorAll(".dropdown__trigger"));

    if (!triggers.length) {
      return null;
    }

    const panelFor = (trigger) =>
      document.getElementById(trigger.getAttribute("aria-controls"));

    const close = (trigger) => {
      const panel = panelFor(trigger);

      trigger.setAttribute("aria-expanded", "false");

      if (panel) {
        panel.hidden = true;
      }
    };

    const closeAll = (except) => {
      triggers.forEach((trigger) => {
        if (trigger !== except) {
          close(trigger);
        }
      });
    };

    triggers.forEach((trigger) => {
      const panel = panelFor(trigger);

      if (!panel) {
        return;
      }

      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        closeAll(trigger);
        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.hidden = isOpen;
      });
    });

    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target instanceof Element && !target.closest(".dropdown")) {
        closeAll(null);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") {
        return;
      }

      triggers.forEach((trigger) => {
        if (trigger.getAttribute("aria-expanded") === "true") {
          close(trigger);
          trigger.focus();
        }
      });
    });

    return closeAll;
  }

  /* ---------------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------------- */

  function initMobileMenu(closeDropdowns) {
    const burger = document.querySelector(".burger");
    const nav = document.getElementById("primary-nav");

    if (!burger || !nav) {
      return;
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);

    const close = () => {
      burger.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      root.classList.remove("is-menu-open");
    };

    const open = () => {
      burger.setAttribute("aria-expanded", "true");
      nav.classList.add("is-open");
      root.classList.add("is-menu-open");
    };

    burger.addEventListener("click", () => {
      if (burger.getAttribute("aria-expanded") === "true") {
        close();
      } else {
        open();
      }
    });

    nav.addEventListener("click", (event) => {
      const target = event.target;

      if (
        target instanceof Element &&
        target.closest(".site-nav__link, .dropdown__link, .site-nav__cta")
      ) {
        close();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        close();
        burger.focus();
      }
    });

    desktop.addEventListener("change", (event) => {
      if (event.matches) {
        close();

        if (closeDropdowns) {
          closeDropdowns(null);
        }
      }
    });
  }

  initHeaderScroll();
  initMobileMenu(initDropdowns());
})();
