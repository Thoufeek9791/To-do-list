const table = document.querySelector("table");

let selectedId;

table.addEventListener("click", (event) => {
  let target = event.target;
  let closestTr = target.closest("tr"); //It returns the closest ancestor tr to the td

  if (target.tagName === "TH") {
    //Ignoring the th element
    return;
  }

  if (selectedId != undefined) {
    selectedId.classList.remove("active");
  }

  selectedId = closestTr;
  console.log("clicked", target);
  closestTr.classList.add("active");

  alert(`Hello ${closestTr.children[0].textContent}`);
});

//Task: Donate page

document.addEventListener("click", (event) => {
  const id = event.target.dataset.toggleId;

  if (!id) return;

  const form = document.getElementById(id);
  console.log(id);

  // console.log(form.hidden);
  form.hidden = !form.hidden;
});

const formEl = document.getElementById("donate-form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = event.target.querySelector("input").value;
  //event.target gives form element and we are going to get the input element present inside the form

  alert(`Thank you for Donating: $${input}`);
});
