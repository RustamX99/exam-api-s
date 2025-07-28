const container = document.getElementById("container");
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const input = document.getElementById("searchInput");
const loader = document.getElementById("loader");

let data = [];

const getData = async () => {
  loader.classList.remove('hidden')
  let res = await fetch("https://fakestoreapi.com/products");
  let result = await res.json();
  data = result;
  console.log(data);
  loader.classList.add("hidden")
  showData(data);
};

function showData(products) {
  container.innerHTML = "";
  products.map((product) => {
    const card = document.createElement("div");
    card.classList.add(
      "w-[300px]", "p-4", "bg-white", "rounded-xl", "shadow",
      "flex", "flex-col", "items-center", "text-center", "gap-3"
    );

    card.innerHTML = `
      <img src="${product.image}" class="w-[200px] h-[200px] object-contain" alt="${product.title}" />
      <h2 class="text-lg font-bold text-gray-800">${product.title}</h2>
      <p class="text-sm text-gray-600">Category: ${product.category}</p>
      <div class="flex gap-3 items-center">
        <span class="text-green-500 font-semibold">$${product.price}</span>
        <button class="buy-btn px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          Sotib olish
        </button>
      </div>
    `;
    container.appendChild(card);
  });
};

const filterAndSortData = () => {
  let filteredData = [...data];


  const category = select1.value;
  if (category !== "All") {
    filteredData = filteredData.filter(product => product.category === category);
  }

  const searchTerm = input.value.toLowerCase();
  if (searchTerm) {
    filteredData = filteredData.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  const sortOrder = select2.value;
  if (sortOrder === "from money") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "to money") {
    filteredData.sort((a, b) => b.price - a.price);
  }

  showData(filteredData);
};

select1.addEventListener("change", filterAndSortData);
select2.addEventListener("change", filterAndSortData);
input.addEventListener("input", filterAndSortData);

getData();

// if (data) {
//   loader.classList.add("hidden");
// } else {
//   loader.classList.remove("hidden")
// }