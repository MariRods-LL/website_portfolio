

   
    const overlay = document.getElementById('overlay');
   const closeBtn = document.getElementById('closeBtn')
    const modalText = document.getElementById('modalText');
    const modalImg = document.getElementById('modalImg');
    const skills = document.querySelectorAll('.skill');
   ;

    const skillData = {
      porg_soft: {
        text: "Capacidade de analisar problemas e propor soluções lógicas",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Logic-dice.jpg/240px-Logic-dice.jpg"
      },
      design_ilus: {
        text: "Linguagem usada para consultar e manipular bancos de dados relacionais.",
        img: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png"
      },
      dev_game: {
        text: "Python e React.js: combinação poderosa para backend e frontend modernos.",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
      },
      ti: {
        text: "Linguagem robusta e orientada a objetos para aplicações multiplataforma.",
        img: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
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
