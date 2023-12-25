var arr = [
    {
        name: "Sweet Item",
        price: "$ 5",
        img: "img/sweets-1.jpeg",
        category: "SWEETS",
    },
    {
        name: "Cupcake Item",
        price: "$ 5",
        img: "img/cupcake-1.jpeg",
        category: "CUPCAKES",
    },
    {
        name: "Cake Item",
        price: "$ 5",
        img: "img/cake-1.jpeg",
        category: "CAKES",
    },
    {
        name: "Dougnut Item",
        price: "$ 5",
        img: "img/doughnut-1.jpeg",
        category: "DOUGHNUTS",
    },
    {
        name: "Sweet Item",
        price: "$ 10",
        img: "img/sweets-2.jpeg",
        category: "SWEETS",
    },
    {
        name: "Cupcake Item",
        price: "$ 10",
        img: "img/cupcake-2.jpeg",
        category: "CUPCAKES",
    },
    {
        name: "Dougnut Item",
        price: "$ 10",
        img: "img/doughnut-3.jpeg",
        category: "DOUGHNUTS",
    },
    {
        name: "Cupcake Item",
        price: "$ 10",
        img: "img/cupcake-3.jpeg",
        category: "CUPCAKES",
    },
    {
        name: "Sweets Item",
        price: "$ 10",
        img: "img/sweets-3.jpeg",
        category: "SWEETS",
    }
]

function show(arr) {
    var total = document.getElementById("total");
    total.innerHTML = "";

    arr.forEach(element => {
        const { name, img } = element;

        var product = document.createElement("div");
        product.classList.add("product-card", "col-4", "mb-4", "px-2");
        product.setAttribute("data-category", element.category);

        var card = document.createElement("div");
        card.classList.add("card");
        product.appendChild(card);

        var imgDiv = document.createElement("div");
        imgDiv.classList.add("card-image");
        imgDiv.style
        card.appendChild(imgDiv);

        var imgProduct = document.createElement("img");
        imgProduct.classList.add("card-img-top");
        imgProduct.setAttribute("src", img);
        imgDiv.appendChild(imgProduct);

        var bodyDiv = document.createElement("div");
        bodyDiv.classList.add("card-body", "p-3", "d-flex", "flex-inline", "justify-content-between");
        card.appendChild(bodyDiv);

        var title = document.createElement("p");
        title.classList.add("card-title", "my-0");
        title.textContent = name;
        bodyDiv.appendChild(title);

        var price = document.createElement("p");
        price.classList.add("card-price", "my-0");
        price.textContent = element.price;
        bodyDiv.appendChild(price);

        total.appendChild(product);
    });

}

function filterCake() {
    var total = document.getElementById("total");
    total.innerHTML = "";

    // Lấy ra các sản phẩm có category là "CAKES"
    var cakes = arr.filter(function (item) {
        return item.category === "CAKES";
    });

    cakes.forEach(element => {
        const { name, img } = element;

        var product = document.createElement("div");
        product.className = "product-card col-4 mb-4 px-2";
        product.setAttribute("data-category", element.category);

        var card = document.createElement("div");
        card.className = "card";
        product.appendChild(card);

        var imgDiv = document.createElement("div");
        imgDiv.className = "card-image";
        card.appendChild(imgDiv);

        var imgProduct = document.createElement("img");
        imgProduct.className = "card-img-top";
        imgProduct.setAttribute("src", img);
        imgDiv.appendChild(imgProduct);

        var bodyDiv = document.createElement("div");
        bodyDiv.className = "card-body p-3 d-flex flex-inline justify-content-between";
        card.appendChild(bodyDiv);

        var title = document.createElement("p");
        title.className = "card-title my-0";
        title.textContent = name;
        bodyDiv.appendChild(title);

        var price = document.createElement("p");
        price.className = "card-price my-0";
        price.textContent = element.price;
        bodyDiv.appendChild(price);

        total.appendChild(product);
    });
}

function filterCupCake() {
    var total = document.getElementById("total");
    total.innerHTML = "";

    // Lấy ra các sản phẩm có category là "CUPCAKES"
    let cupCake = arr.filter(function (item) {
        return item.category === "CUPCAKES";
    });

    cupCake.forEach(element => {
        const { name, img } = element;

        var product = document.createElement("div");
        product.className = "product-card col-4 mb-4 px-2";
        product.setAttribute("data-category", element.category);

        var card = document.createElement("div");
        card.className = "card";
        product.appendChild(card);

        var imgDiv = document.createElement("div");
        imgDiv.className = "card-image";
        card.appendChild(imgDiv);

        var imgProduct = document.createElement("img");
        imgProduct.className = "card-img-top";
        imgProduct.setAttribute("src", img);
        imgDiv.appendChild(imgProduct);

        var bodyDiv = document.createElement("div");
        bodyDiv.className = "card-body p-3 d-flex flex-inline justify-content-between";
        card.appendChild(bodyDiv);

        var title = document.createElement("p");
        title.className = "card-title my-0";
        title.textContent = name;
        bodyDiv.appendChild(title);

        var price = document.createElement("p");
        price.className = "card-price my-0";
        price.textContent = element.price;
        bodyDiv.appendChild(price);

        total.appendChild(product);
    });
}

function filterSweets() {
    var total = document.getElementById("total");
    total.innerHTML = "";

    // Lấy ra các sản phẩm có category là "SWEETS"
    let sweets = arr.filter(function (item) {
        return item.category === "SWEETS";
    });

    sweets.forEach(element => {
        const { name, img } = element;

        var product = document.createElement("div");
        product.className = "product-card col-4 mb-4 px-2";
        product.setAttribute("data-category", element.category);

        var card = document.createElement("div");
        card.className = "card";
        product.appendChild(card);

        var imgDiv = document.createElement("div");
        imgDiv.className = "card-image";
        card.appendChild(imgDiv);

        var imgProduct = document.createElement("img");
        imgProduct.className = "card-img-top";
        imgProduct.setAttribute("src", img);
        imgDiv.appendChild(imgProduct);

        var bodyDiv = document.createElement("div");
        bodyDiv.className = "card-body p-3 d-flex flex-inline justify-content-between";
        card.appendChild(bodyDiv);

        var title = document.createElement("p");
        title.className = "card-title my-0";
        title.textContent = name;
        bodyDiv.appendChild(title);

        var price = document.createElement("p");
        price.className = "card-price my-0";
        price.textContent = element.price;
        bodyDiv.appendChild(price);

        total.appendChild(product);
    });
}

function filterDoughnuts() {
    var total = document.getElementById("total");
    total.innerHTML = "";

    // Lấy ra các sản phẩm có category là "DOUGHNUTS"
    let doughnuts = arr.filter(function (item) {
        return item.category === "DOUGHNUTS";
    });

    doughnuts.forEach(element => {
        const { name, img } = element;

        var product = document.createElement("div");
        product.className = "product-card col-4 mb-4 px-2";
        product.setAttribute("data-category", element.category);

        var card = document.createElement("div");
        card.className = "card";
        product.appendChild(card);

        var imgDiv = document.createElement("div");
        imgDiv.className = "card-image";
        card.appendChild(imgDiv);

        var imgProduct = document.createElement("img");
        imgProduct.className = "card-img-top";
        imgProduct.setAttribute("src", img);
        imgDiv.appendChild(imgProduct);

        var bodyDiv = document.createElement("div");
        bodyDiv.className = "card-body p-3 d-flex flex-inline justify-content-between";
        card.appendChild(bodyDiv);

        var title = document.createElement("p");
        title.className = "card-title my-0";
        title.textContent = name;
        bodyDiv.appendChild(title);

        var price = document.createElement("p");
        price.className = "card-price my-0";
        price.textContent = element.price;
        bodyDiv.appendChild(price);

        total.appendChild(product);
    });
}


// Search BY BUTTON by JS
// const searchBtnJS = document.getElementById('search-btn');
// const searchInput = document.getElementById('search-item');
// searchBtnJS.addEventListener('click', function () {
//     const keyword = searchInput.value.toLowerCase();

//     const filteredCategories = arr.filter(category => {
//         return category.name.toLowerCase().includes(keyword);
//     });
//     console.log(filteredCategories);
//     show(filteredCategories);
// });
const searchInput = document.getElementById('search-item');
searchInput.addEventListener('keyup', function () {
    const keyword = searchInput.value.toLowerCase();

    const filteredCategories = arr.filter(category => {
        return category.name.toLowerCase().includes(keyword);
    });
    console.log("ok");
    console.log(filteredCategories);
    show(filteredCategories);
});

