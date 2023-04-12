const table = document.querySelector('table');

fetch('https://api.binance.com/api/v3/ticker/price')
.then(response => response.json())
.then(data => {
    console.log(data);
    data.forEach(element => {
        table.innerHTML += `
        <tr>
            <td>${element.symbol}</td>
            <td>${element.price}</td>
        </tr>
        `;
    });
});