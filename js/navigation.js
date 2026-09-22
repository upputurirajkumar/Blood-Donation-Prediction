/**
 * BLOODINTEL — Navigation & Interactive Scroll Architecture
 */

(function () {
  'use strict';

  class NavigationController {
    constructor() {
      this.navbar = document.getElementById('main-navbar');
      this.navLinks = document.querySelectorAll('.nav-link[data-target]');
      this.mobileToggle = document.getElementById('mobile-menu-toggle');
      this.mobileDrawer = document.getElementById('mobile-drawer');
      this.sections = document.querySelectorAll('section[id]');
      this.init();
    }

    init() {
      this.bindScrollEvents();
      this.bindClickEvents();
      this.bindMobileEvents();
      this.initIntersectionObserver();
    }

    bindScrollEvents() {
      window.addEventListener('scroll', () => {
        if (!this.navbar) return;
        if (window.scrollY > 40) {
          this.navbar.classList.add('nav-scrolled');
        } else {
          this.navbar.classList.remove('nav-scrolled');
        }
      }, { passive: true });
    }

    bindClickEvents() {
      // Smooth scroll for all anchor targets
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#' || href === '') return;
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const navHeight = this.navbar ? this.navbar.offsetHeight : 70;
            const topPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
            window.scrollTo({
              top: topPos,
              behavior: 'smooth'
            });

            // Close mobile menu if open
            if (this.mobileDrawer && this.mobileDrawer.classList.contains('open')) {
              this.mobileDrawer.classList.remove('open');
            }
          }
        });
      });
    }

    bindMobileEvents() {
      if (this.mobileToggle && this.mobileDrawer) {
        this.mobileToggle.addEventListener('click', () => {
          this.mobileDrawer.classList.toggle('open');
        });

        // Close on backdrop or outside click
        this.mobileDrawer.addEventListener('click', (e) => {
          if (e.target === this.mobileDrawer) {
            this.mobileDrawer.classList.remove('open');
          }
        });
      }
    }

    initIntersectionObserver() {
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            this.navLinks.forEach((link) => {
              if (link.getAttribute('data-target') === id) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -40% 0px'
      });

      this.sections.forEach((sec) => observer.observe(sec));
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.BloodIntelNavigation = new NavigationController();
  });
})();
