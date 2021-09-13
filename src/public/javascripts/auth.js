const $form = document.querySelector(".input-container");

$form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  let body, url;

  if (ev.target.mode.value === "sign-up") {
    url = "/auth/sign-up";
    body = JSON.stringify({
      name: ev.target.name.value,
      email: ev.target.email.value,
      password: ev.target.password.value,
    });
  } else {
    url = "/auth/sign-in";
    body = JSON.stringify({
      email: ev.target.email.value,
      password: ev.target.password.value,
    });
  }

  const _res = await fetch(url, {
    method: "POST",
    body,
    headers: {
      "content-type": "application/json",
    },
  });

  const res = await _res.json();
  localStorage.setItem("token", res.token); // token 저장 (web storage)
});
