
/*  CODIGO PARA ANIMAÇÃO */
    window.onscroll = function () {
      var div = document.querySelector('.BigDiv');
      if (window.scrollY > 30) { /* Quando o scroll ultrapassa deteminada px */
        div.classList.add('visible'); /* Torna a div visível */
      } else {
        div.classList.remove('visible'); /* Torna a div invisível */
      }

      function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top <= window.innerHeight * 0.8 && // Começa a aparecer um pouco antes de chegar ao topo
          rect.bottom >= 0
        );
      }

      function checkVisibility() {
        const divs = document.querySelectorAll('.BigDiv');
        divs.forEach(function (div) {
          if (isInViewport(div)) {
            div.classList.add('visible');
          } else {
            div.classList.remove('visible');
          }
        });
      }


      // Roda no carregamento e no scroll

      window.addEventListener('scroll', checkVisibility);
      window.addEventListener('load', checkVisibility);
    };



    const menu = document.getElementById('menu');
    const sidebar = document.getElementById('sidebar');

   
    menu.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
