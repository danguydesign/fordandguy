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
