document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value
  };

  await fetch("http://localhost:3000/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  alert("Mensagem enviada!");
});
