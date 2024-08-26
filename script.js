async function convert() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    document.getElementById(
      "result"
    ).innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    document.getElementById("result").innerText =
      "Error fetching conversion rate.";
  }
}
