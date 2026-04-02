const btn = document.getElementById("btnAdd");

btn.addEventListener("click", adicionarItem);

function adicionarItem() {
  const input = document.getElementById("inputItem");
  const lista = document.getElementById("lista");

  if (input.value.trim() === "") return;

  const li = document.createElement("li");

  const left = document.createElement("div");
  left.classList.add("item-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = input.value;

  checkbox.onchange = () => {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    span.style.opacity = checkbox.checked ? "0.5" : "1";
  };

  const remover = document.createElement("span");
  remover.innerHTML = "🗑️";
  remover.classList.add("remover");

  remover.onclick = () => {
    li.remove();
    mostrarToast();
  };

  left.appendChild(checkbox);
  left.appendChild(span);

  li.appendChild(left);
  li.appendChild(remover);

  lista.appendChild(li);

  input.value = "";
}

function mostrarToast() {
  const toast = document.getElementById("toast");
  toast.style.display = "flex";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function fecharToast() {
  document.getElementById("toast").style.display = "none";
}
