// breakpoint where swiper will be destroyed
// and switches to a dual-column layout
const breakpoint = window.matchMedia( '(min-width:768px)' );
// keep track of swiper instances to destroy later
let mySwiper;
const breakpointChecker = function() {
   // if larger viewport and multi-row layout needed
   if ( breakpoint.matches === true ) {
      // clean up old instances and inline styles when available
      if ( mySwiper !== undefined ) mySwiper.destroy( true, true );
      // or/and do nothing
      return;
   // else if a small viewport and single column layout needed
   } else if ( breakpoint.matches === false ) {
      // fire small viewport version of swiper
      return enableSwiper();
   }
};

const enableSwiper = function() {
   mySwiper = new Swiper ('.swiper-container', {
      // loop: true,
      // slidesPerView: 'auto',
      // centeredSlides: true,
      // a11y: true,
      // keyboardControl: true,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 30,
      loop: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      paginationClickable: true,
      // Disable preloading of all images
      preloadImages: true,
      // Enable lazy loading
      // lazy: {
      //   loadPrevNext: true,
      // },
   });
};

// keep an eye on viewport size changes
breakpoint.addListener(breakpointChecker);
// kickstart
breakpointChecker();
