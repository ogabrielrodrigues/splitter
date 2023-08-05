IMask(document.querySelector("#bill"), {
  mask: Number,
  scale: 2,
  radix: ",",
  mapToRadix: ["."],
  thousandsSeparator: ".",
  min: 0,
  max: 99999,
});

IMask(document.querySelector("#custom"), {
  mask: Number,
  scale: 2,
  min: 0,
  max: 100,
});

IMask(document.querySelector("#people"), {
  mask: Number,
  scale: 2,
  min: 0,
  max: 100,
});

let tip_percent = "0%";

const childrenNodes = document.querySelector("#select_tip").children;
const children = [...childrenNodes];
children.pop();

const bill_input = document.querySelector("#bill");
const custom_input = document.querySelector("#custom");
const people_input = document.querySelector("#people");

function caculateTip() {
  if (tip_percent === "0%") {
    document.querySelector("#select_tip").classList.add("error");
    return;
  }

  document.querySelector("#select_tip").classList.remove("error");

  const bill = parseFloat(bill_input.value);
  const selected_tip = parseInt(tip_percent.split("%")[0]);
  const people = parseInt(people_input.value);

  const tip_amount = (bill * selected_tip) / 100 / people;
  const tip_total = (bill * selected_tip) / 100;

  document.querySelector("#tip_amount").innerHTML = isNaN(tip_amount)
    ? "0.00"
    : tip_amount.toFixed(2);
  document.querySelector("#total").innerHTML = isNaN(tip_total)
    ? "0.00"
    : tip_total.toFixed(2);
}

function resetTip() {
  bill_input.value = "";
  custom_input.value = "";
  people_input.value = "";

  const selector_container = document.querySelector("#select_tip");

  children.forEach((el) => {
    selector_container.classList.remove(`selected${children.indexOf(el) + 1}`);
  });

  document.querySelector("#tip_amount").innerHTML = "0.00";
  document.querySelector("#total").innerHTML = "0.00";
  bill_input.focus()
}

function selectTip(e) {
  const selector_container = document.querySelector("#select_tip");

  children.forEach((el) => {
    selector_container.classList.remove(`selected${children.indexOf(el) + 1}`);
  });

  if (e.target.getAttribute("id") === "custom") {
    tip_percent = `${e.target.value}%`;
  } else {
    let i = children.indexOf(e.target);

    selector_container.classList.add(`selected${i + 1}`);

    const selected_tip = e.target.innerHTML;

    tip_percent = selected_tip;
  }

  caculateTip()
}

children.forEach((el) => {
  el.addEventListener("click", selectTip);
});
bill_input.addEventListener("keyup", caculateTip);
custom_input.addEventListener("keyup", selectTip);
people_input.addEventListener("keyup", caculateTip);
document.querySelector("#reset").addEventListener("click", resetTip);
