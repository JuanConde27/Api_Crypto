const form = document.getElementById('form');
const searchInput = document.getElementById('search');
const tbody = document.querySelector('tbody');
let data; 

fetch('https://api.binance.com/api/v3/ticker/price')
.then(response => response.json())
.then(responseData => {
    data = responseData; // Asignar el valor de responseData a la variable data
    console.log(data);
    data.forEach(element => {
        tbody.innerHTML += `
        <tr>
            <td>${element.symbol}</td>
            <td>${element.price}</td>
        </tr>
        `;
    });
})
.catch(error => {
    console.log('Error:', error);
});

form.addEventListener('input', (event) => {
    event.preventDefault(); 

    const searchValue = searchInput.value.toUpperCase(); // Obtener el valor del campo de búsqueda en mayúsculas
    const filteredData = data.filter((item) => item.symbol.toUpperCase().includes(searchValue) || item.price.toUpperCase().includes(searchValue)); // Filtrar los datos

    tbody.innerHTML = ''; 

    filteredData.forEach((element) => {
        tbody.innerHTML += `
            <tr>
                <td>${element.symbol}</td>
                <td>${element.price}</td>
            </tr>
        `;
    });
});
