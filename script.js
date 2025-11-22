const showPasswordToggle = document.getElementById("showPasswordToggle");
const passwordInput = document.getElementById("passwordInput");

if (showPasswordToggle && passwordInput) {
  showPasswordToggle.addEventListener("click", () => {
    const isActive = showPasswordToggle.classList.toggle("active");
    showPasswordToggle.setAttribute("aria-pressed", String(isActive));
    passwordInput.type = isActive ? "text" : "password";
  });
}

const panel = document.querySelector(".login-panel");
if (panel) {
  panel.addEventListener("mousemove", (event) => {
    const { left, top, width, height } = panel.getBoundingClientRect();
    const x = ((event.clientX - left) / width - 0.5) * 10;
    const y = ((event.clientY - top) / height - 0.5) * 10;

    panel.style.setProperty("--tiltX", `${y}deg`);
    panel.style.setProperty("--tiltY", `${-x}deg`);
    panel.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${-x}deg)`;
  });

  panel.addEventListener("mouseleave", () => {
    panel.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  });
}

