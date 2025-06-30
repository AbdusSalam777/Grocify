function send() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const feedback = document.getElementById("feedback").value;

  fetch("/send-to-mongo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      feedback,
    }),
  })
    .then(() => {
      console.log("Data sent to backend ");
    })
    .catch((error) => {
      console.log(error);
    });
}