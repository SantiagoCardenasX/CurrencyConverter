document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultDiv = document.getElementById('result');
    const spinner = document.getElementById('spinner');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    async function fetchRates() {
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrencySelect.value}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    }

    async function convert() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            resultDiv.innerText = 'Please enter a valid amount.';
            resultDiv.style.opacity = 1; // Asegura que el resultado esté visible
            return;
        }

        spinner.style.display = 'block';

        try {
            const data = await fetchRates();
            const rate = data.rates[toCurrency];
            const result = amount * rate;

            // Retraso para mostrar el resultado
            setTimeout(() => {
                resultDiv.innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
                resultDiv.style.opacity = 1;
            }, 500); // Retraso de 500ms

        } catch (error) {
            console.error('Error fetching conversion rate:', error);
            resultDiv.innerText = 'Error fetching conversion rate.';
            resultDiv.style.opacity = 1; // Asegura que el resultado esté visible
        } finally {
            setTimeout(() => {
                spinner.style.display = 'none';
            }, 500); // Retraso para ocultar el spinner después de 500ms
        }
    }

    // Event listeners
    amountInput.addEventListener('input', convert);
    fromCurrencySelect.addEventListener('change', convert);
    toCurrencySelect.addEventListener('change', convert);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.container').classList.toggle('dark-mode');
        document.querySelectorAll('input, select').forEach(el => el.classList.toggle('dark-mode'));
        resultDiv.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('dark-mode');
    });

    // Initial conversion
    convert();
});
