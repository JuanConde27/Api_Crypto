const form = document.getElementById('form');
const searchInput = document.getElementById('search');
const tbody = document.querySelector('tbody');
const paginar = document.getElementById('paginar');
const atras = document.getElementById('atras');

const PAGE_SIZE = 12;
let data;
let currentPage = 1;

function updateTable() {
    const searchValue = searchInput.value.toUpperCase();
    const filteredData = data.filter((item) => item.symbol.toUpperCase().includes(searchValue) || item.price.toUpperCase().includes(searchValue));
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageData = filteredData.slice(start, end);

    tbody.innerHTML = '';

    pageData.forEach((element) => {
        tbody.innerHTML += `
            <tr>
                <td>${element.symbol}</td>
                <td>${element.price}</td>
            </tr>
        `;
    });
}

function updatePagination() {
    const searchValue = searchInput.value.toUpperCase();
    const filteredData = data.filter((item) => item.symbol.toUpperCase().includes(searchValue) || item.price.toUpperCase().includes(searchValue));
    const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

    paginar.innerHTML = '';
    if (currentPage < totalPages) {
        const button = document.createElement('button');
        button.innerText = 'Siguiente';
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            currentPage++;
            updateTable();
            updatePagination();
        });
        paginar.appendChild(button);
    }

    if (currentPage > 1) {
        const backButton = document.createElement('button');
        backButton.innerText = 'Atras';
        backButton.addEventListener('click', (event) => {
            event.stopPropagation();
            currentPage--;
            updateTable();
            updatePagination();
        });
        atras.innerHTML = '';
        atras.appendChild(backButton);
    } else {
        atras.innerHTML = '';
    }
}

fetch('https://api.binance.com/api/v3/ticker/price')
    .then(response => response.json())
    .then(responseData => {
        data = responseData; // Asignar el valor de responseData a la variable data
        console.log(data);
        updateTable();
        updatePagination();
    })
    .catch(error => {
        console.log('Error:', error);
    });

form.addEventListener('input', (event) => {
    event.preventDefault();

    currentPage = 1;
    updateTable();
    updatePagination();
});

//cuando la pantalla sea menor a 520px el texto del input cambia a buscar 
function myFunction(x) {
    if (x.matches) { // If media query matches
        document.getElementById("search").placeholder = "Buscar";
    } else {
        document.getElementById("search").placeholder = "Buscar criptomoneda";
    }
}

var x = window.matchMedia("(max-width: 520px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes