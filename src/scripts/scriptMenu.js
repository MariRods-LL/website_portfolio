

   
    const overlay = document.getElementById('overlay');
   const closeBtn = document.getElementById('closeBtn')
    const modalText = document.getElementById('modalText');
    const modalImg = document.getElementById('modalImg');
    const skills = document.querySelectorAll('.skill');
   ;

    const skillData = {
      porg_soft: {
        text: "Nos últimos anos, desenvolvi competências de programação de software e web,  aprendendo a realizar aplicações eficientes e seguras, com foco na funcionalidade.  Trabalhei e testei diferentes linguagens e tecnologias essenciais para atender todas as necessidades e trazendo uma ótima experiência para usuário, continuo evoluindo e aplicando boas práticas de código.",
        img: ""
      },
      design_ilus: {
        text: "Na área de ilustração, utilizo criatividade, senso estético e muita atenção aos detalhes ao desenvolver identidades visuais, interfaces, ilustrações e elementos gráficos. ",
        img: ""
      },
      dev_game: {
        text: " Atuei no desenvolvimento de jogos, criando mecânicas, sistemas interativos, buscando sempre equilibrar diversão, desempenho e estabilidade para oferecer uma experiência imersiva ao jogador.",
        img: ""
      },
      ti: {
        text: "Possuo conhecimentos ampliados em tecnologia da informação, incluindo hardware, software, sistemas operacionais, redes e manutenção. permite-me diagnosticar problemas, prestar suporte, otimizar sistemas e integrar soluções tecnológicas de forma eficiente e confiável.",
        img: "assets/images/myart/programming.png"
      }
    };

    skills.forEach(skill => {
      skill.addEventListener('click', () => {
        const key = skill.getAttribute('data-skill');
        modalText.textContent = skillData[key].text;
        modalImg.src = skillData[key].img;
        overlay.classList.add('active');
      });
    });

    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
