// -----Variables-----
const pageBody = document.querySelector( 'body' );

// -----Functions-----
function preventScroll() {
  pageBody.classList.toggle('fixed') ;
}

// -----Product page accordion-----

var acc = document.getElementsByClassName("accordion");

  if (acc.length) {

  for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function() {
      this.classList.toggle("plus");
      var panel = this.nextElementSibling;
      panel.classList.toggle("closed");
    }
  }
  acc[0].onclick();
  acc[1].onclick();
  acc[2].onclick();
}


// -----Product page accordion-----

const siteSearch = document.querySelector(".site-search");

if (siteSearch) {

  const searchButton = document.querySelector(".search-button");
  const searchWidget = document.querySelector(".widget_product_search");

  searchWidget.setAttribute( 'id', 'site-search' );
  searchButton.setAttribute( 'aria-expanded', 'false' );
  searchWidget.setAttribute( 'aria-expanded', 'false' );
  searchWidget.setAttribute( 'aria-label', 'Navigation-search' );

  function toggleSearch() {
    siteSearch.classList.toggle("toggled");
    preventScroll();
    var expanded = siteSearch.classList.contains( 'toggled' ) ? 'true' : 'false';
    searchButton.setAttribute( 'aria-expanded', expanded );
    searchWidget.setAttribute( 'aria-expanded', expanded );

  };

  searchButton.addEventListener( 'click', () => {
    toggleSearch();
  } );

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
       if ( siteSearch.classList.contains("toggled") ) {
         toggleSearch();
       }
    }
  });
}
