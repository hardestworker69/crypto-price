// Replace with your CoinMarketCap API key
const apiKey = "4451afd9-de7c-4027-8719-2e907fe98dfb";
const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

// Select DOM elements
const tableBody = document.querySelector("#crypto-table tbody");
const refreshBtn = document.getElementById("refresh-btn");

// Headers for API request
const headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': apiKey,  // Your API Key goes here
};

// API parameters to fetch Bitcoin's data
const params = {
    'start': '1',    // Start with Bitcoin (first in list)
    'limit': '1',    // Only fetch the first cryptocurrency (Bitcoin)
    'convert': 'USD' // Convert the price to USD
};

// Function to format the params into a query string
function formatParams(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

// Function to fetch cryptocurrency data and update the table
function fetchCryptoData() {
    // Format the params as a query string
    const queryString = formatParams(params);
    const fullUrl = `${url}?${queryString}`;

    console.log('Fetching data from URL:', fullUrl); // Log the full URL for debugging

    fetch(fullUrl, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('API Response:', data); // Log the API response for debugging

        // Clear previous table rows
        tableBody.innerHTML = '';

        // Check if data is available and it's Bitcoin
        if (data.data && data.data.length > 0) {
            const coin = data.data[0];  // Bitcoin is the first item in the response

            const row = document.createElement("tr");

            const coinName = document.createElement("td");
            coinName.textContent = `${coin.name} (${coin.symbol})`;

            const coinPrice = document.createElement("td");
            coinPrice.textContent = `$${coin.quote.USD.price.toFixed(2)}`;

            row.appendChild(coinName);
            row.appendChild(coinPrice);
            tableBody.appendChild(row);
        } else {
            console.error("Error: No data found for Bitcoin.");
        }
    })
    .catch(error => {
        console.error("Error fetching data: ", error);
    });
}

// Initial data fetch
fetchCryptoData();

// Refresh data when button is clicked
refreshBtn.addEventListener("click", fetchCryptoData);
