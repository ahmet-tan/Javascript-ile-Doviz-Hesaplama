const selectElem = document.getElementById("selectElem");
const currencySpan = document.getElementById("currencySpan");
const input = document.getElementById("input");
const eventArr = [input, selectElem];

function run() {
  fetch(
    "https://api.freecurrencyapi.com/v1/latest?apikey=WkhHBbTfNQzafTCiGCFLMmZihuov8ho2FdwAHi6M"
  )
    .then((response) => response.json())
    .then((data) => {
      var currencies = data.data;
      var currenciesArr = Object.keys(currencies).map((key) => [
        key,
        currencies[key],
      ]); //returns object to array

      currenciesArr.splice(31, 1); // remove usd in array

      createSelectHTML(currenciesArr);
    });
}

run();

function createSelectHTML(currenciesArr) {
  for (let i = 0; i < currenciesArr.length; i++) {
    selectElem.innerHTML += `<option> ${currenciesArr[i][0]} </option>`; // create option element to dom
  }

  let nf = new Intl.NumberFormat("en-US");

  currencySpan.innerHTML =
    "  USD is equals to " +
    nf.format(input.value * currenciesArr[0][1].toFixed(1)) +
    "  " +
    currenciesArr[0][0]; // initial value

  for (let j = 0; j < eventArr.length; j++) {
    // add eventlistener, input and select elements
    eventArr[j].addEventListener("change", () => {
      for (let i = 0; i < currenciesArr.length; i++) {
        if (selectElem.value == currenciesArr[i][0]) {
          currencySpan.innerHTML =
            nf.format(input.value) +
            " USD is equal to " +
            nf.format(input.value * currenciesArr[i][1].toFixed(1)) +
            " " +
            currenciesArr[i][0];
        }
      }
    });
  }
}
