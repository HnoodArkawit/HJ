/**
* Template Name: Restaurantly
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.addEventListener("DOMContentLoaded", function() {
    // الحصول على جميع عناصر الفلاتر
    const filters = document.querySelectorAll('.menu-filters li');
    
    // تعيين الحدث للنقر على كل عنصر
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // إزالة الكلاس النشط من كل العناصر
            filters.forEach(f => f.classList.remove('filter-active'));
            
            // إضافة الكلاس النشط للعنصر الحالي
            this.classList.add('filter-active');
            
            // الحصول على الفلتر المحدد
            const filterValue = this.getAttribute('data-filter');
            
            // إخفاء كل العناصر
            const items = document.querySelectorAll('.isotope-item');
            items.forEach(item => {
                item.style.display = 'none';
            });
            
            // إظهار العناصر التي تطابق الفلتر
            const visibleItems = document.querySelectorAll(filterValue);
            visibleItems.forEach(item => {
                item.style.display = 'block';
            });
        });
    });
});

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

    //function getLocation() {
    //    if (navigator.geolocation) {
    //        navigator.geolocation.getCurrentPosition(function (position) {
    //            const latitude = position.coords.latitude;
    //            const longitude = position.coords.longitude;
    //            const location = `https://www.google.com/maps/@${latitude},${longitude},15z`; // تعبير مدمج هنا

    //            document.getElementById('location').value = location;
    //        }, function (error) {
    //            console.error('Error getting location:', error);
    //            alert('لم نتمكن من الحصول على موقعك. يرجى المحاولة مرة أخرى.');
    //        });
    //    } else {
    //        alert('التحكم في الموقع غير مدعوم على هذا المتصفح.');
    //    }
    //}

    document.getElementById('booking-form').addEventListener('submit', function(event) {
      event.preventDefault(); // منع إعادة تحميل الصفحة
  
      // جمع البيانات من الفورم
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const location = document.getElementById('location').value;
  
      // جمع النص المختار من القائمة المنسدلة
      const peopleSelect = document.getElementById('people');
      const people = peopleSelect.options[peopleSelect.selectedIndex].text; // النص المختار
  
      const message = document.querySelector('textarea[name="message"]').value;
  
      // إعداد البيانات لإرسالها عبر EmailJS
      const templateParams = {
          name: name,
          email: email,
          phone: phone,
          date: date,
          location: location,
          people: people, // الآن سيعرض النص المختار
          message: message
      };
  
      // إرسال البريد الإلكتروني باستخدام EmailJS
          emailjs.send('service_zp6fv1g', 'template_2vpaqjt', templateParams)
    .then(function(response) {
        alert('تم إرسال البيانات بنجاح!', response.status, response.text);
    }, function(error) {
        console.error('حدث خطأ أثناء إرسال البيانات:', error); // عرض التفاصيل في وحدة التحكم
        alert('حدث خطأ أثناء إرسال البيانات: ' + JSON.stringify(error)); // عرض رسالة الخطأ
    });

  });
  
  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);



})();