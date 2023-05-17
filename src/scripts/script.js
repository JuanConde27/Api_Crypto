const form = document.getElementById("form");
const searchInput = document.getElementById("search");
const tbody = document.querySelector("tbody");
const paginar = document.getElementById("paginar");
const atras = document.getElementById("atras");

const PAGE_SIZE = 12;
const MAX_PAGES_DISPLAYED = 5; // Número máximo de páginas mostradas en el paginador
let data;
let currentPage = 1;

function updateTable() {
  const searchValue = searchInput.value.toUpperCase();
  const filteredData = data.filter(
    (item) =>
      item.symbol.toUpperCase().includes(searchValue) ||
      item.price.toUpperCase().includes(searchValue)
  );
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageData = filteredData.slice(start, end);

  tbody.innerHTML = "";

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
  const filteredData = data.filter(
    (item) =>
      item.symbol.toUpperCase().includes(searchValue) ||
      item.price.toUpperCase().includes(searchValue)
  );
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  paginar.innerHTML = "";

  if (currentPage > 1) {
    const backButton = document.createElement("button")
    backButton.innerText = "Anterior";
    backButton.addEventListener("click", (event) => {
      event.stopPropagation();
      currentPage--;
      updateTable();
      updatePagination();
    });
    paginar.appendChild(backButton);
  }

  const startPage = Math.max(
    currentPage - Math.floor(MAX_PAGES_DISPLAYED / 2),
    1
  );
  const endPage = Math.min(startPage + MAX_PAGES_DISPLAYED - 1, totalPages);

  for (let page = startPage; page <= endPage; page++) {
    const button = document.createElement("button");
    button.innerText = page;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      currentPage = page;
      updateTable();
      updatePagination();
    });
    if (page === currentPage) {
      button.classList.add("active");
    }
    paginar.appendChild(button);
  }

  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.innerText = "Siguiente";
    nextButton.addEventListener("click", (event) => {
      event.stopPropagation();
      currentPage++;
      updateTable();
      updatePagination();
    });
    paginar.appendChild(nextButton);
  }
}

fetch("https://api.binance.com/api/v3/ticker/price")
  .then((response) => response.json())
  .then((responseData) => {
    data = responseData; // Asignar el valor de responseData a la variable data
    console.log(data);
    updateTable();
    updatePagination();
  })
  .catch((error) => {
    console.log("Error:", error);
  });

form.addEventListener("input", (event) => {
  event.preventDefault();
  currentPage = 1;
  updateTable();
  updatePagination();
});

// Cuando la pantalla sea menor a 520px, el texto del input cambia a "Buscar"
function myFunction(x) {
  if (x.matches) {
    // If media query matches
    searchInput.placeholder = "Buscar";
  } else {
    searchInput.placeholder = "Buscar criptomoneda";
  }
}

const x = window.matchMedia("(max-width: 520px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes
