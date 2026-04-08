document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
 const token = grecaptcha.getResponse();
  const data = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
    token
  };

if (!token) {
  alert("Confirme o reCAPTCHA");
  return;
}

  const res = await fetch("https://website-portfolio-o8vp.onrender.com/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
});
console.log("Token recebido:", token);
console.log("Resposta do Google:", res);
const result = await res.json();

if (res.ok) {
  alert("Mensagem enviada!");
} else {
  alert(result.error || "Erro ao enviar");
}


});
