const $button = document.querySelector(".button-access");

$button.addEventListener("click", async (ev) => {
  ev.preventDefault();

  const token = localStorage.getItem("token");

  const _res = await fetch("/access", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await _res.json();
  console.log(res);
});
