// const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies/inr.json";

// const dropdowns = document.querySelectorAll(".dropdown select");

// for (let select of dropdowns) {
//   for (let currCode in countryList) {
//     let newOptions = document.createElement("option");
//     newOptions.innerText = currCode;
//     newOptions.value = currCode;
//     if (select.name = "from" && currCode === "USD") {
//       newOptions.select = selected;
//     } else if (select.name = "to" && currCode === "INR") {
//       newOptions.select = selected;
//     }
//     select.append(newOptions);
//   }
// }currency

const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");




// for(codes in countryList) {
//     console.log(code,countryList(code))
// }

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
  select.addEventListener("change" ,(evt) => {
    updateFlag(evt.target)
  }); 
}

const updateFlag=(element) => {
    let currCode=element.value;
    let countryCode = countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" ,async (evt) => {
evt.preventDefault();
let amount = document.querySelector(".ammount input");
let amtVal = amount.value;
if (amtVal === "" || amtVal < 1 ) {
  amtVal=1;
  amount.value="1";
}
const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  // Fetch data
  const url = `${BASE_URL}/${from}.json`;
  const response = await fetch(url);
  const data = await response.json();
  const rate = data[from][to];

  let finalAmount = (amtVal * rate).toFixed(2);

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})
