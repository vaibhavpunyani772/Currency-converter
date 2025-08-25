const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".dropdown select[name='from']");
const toCurr = document.querySelector(".dropdown select[name='to']");
const result = document.querySelector("#result");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update flag based on currency
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Fetch exchange rate
btn.addEventListener("click", async (e) => {
  e.preventDefault();

  let amount = document.querySelector("#amount").value;
  if (amount === "" || amount < 1) {
    amount = 1;
    document.querySelector("#amount").value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  // Fetch data
  const url = `${BASE_URL}/${from}.json`;
  const response = await fetch(url);
  const data = await response.json();
  const rate = data[from][to];

  let finalAmount = (amount * rate).toFixed(2);

  result.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
