document.addEventListener("DOMContentLoaded", () => {
  const amountInput = document.getElementById("amount");
  const fromCurrencySelect = document.getElementById("from-currency");
  const toCurrencySelect = document.getElementById("to-currency");
  const resultDiv = document.getElementById("result");
  const spinner = document.getElementById("spinner");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const h1 = document.querySelector("h1");

  async function fetchRates() {
    const apiKey = '86d10139070c6507bcc58156';
    const baseCurrency = fromCurrencySelect.value;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response Data:", data); // Debugging log
      return data;
    } catch (error) {
      console.error("Error fetching rates:", error.message); // Log error message
      throw error;
    }
  }

  async function convert() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
      resultDiv.innerText = "Please enter a valid amount.";
      resultDiv.style.opacity = 1;
      return;
    }

    spinner.style.display = "block";

    try {
      const data = await fetchRates();
      
      // Debugging: Check available rates
      console.log(`Available rates for ${fromCurrency}:`, data.conversion_rates);

      if (!data.conversion_rates || !data.conversion_rates[toCurrency]) {
        throw new Error(`Rate for ${toCurrency} not found`);
      }

      const rate = data.conversion_rates[toCurrency];
      const result = amount * rate;
      resultDiv.innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
      console.error("Error fetching conversion rate:", error.message);
      resultDiv.innerText = "Error fetching conversion rate.";
    } finally {
      spinner.style.display = "none";
      resultDiv.style.opacity = 1;
    }
  }

  // Event listeners
  amountInput.addEventListener("input", convert);
  fromCurrencySelect.addEventListener("change", convert);
  toCurrencySelect.addEventListener("change", convert);

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    document
      .querySelectorAll("input, select")
      .forEach((el) => el.classList.toggle("dark-mode"));
    resultDiv.classList.toggle("dark-mode");
    h1.classList.toggle("dark-mode");
    darkModeToggle.classList.toggle("dark-mode");
  });

  convert();
});
