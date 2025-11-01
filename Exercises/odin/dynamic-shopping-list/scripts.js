function addItem() {
  const input = document.querySelector("#inp");
  const item = input.value.trim();

  if (item === "") {
    alert("Enter a value");
    return;
  }

  const list = document.querySelector("#list");

  const row = document.createElement("li");
  row.style.alignItems = "center";
  row.style.gap = "10px";

  const text = document.createElement("span");
  text.textContent = item;

  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";

  row.appendChild(text);
  row.appendChild(checkbox);
  list.appendChild(row);
  input.value = "";
}

function deleteItem(e) {
  const box = e.target;
  const item = box.parentNode;
  item.remove();
}

const add = document.querySelector("#add");
add.addEventListener("click", addItem);

const list = document.querySelector("#list");
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("checkbox")) {
    deleteItem(e);
  }
});
