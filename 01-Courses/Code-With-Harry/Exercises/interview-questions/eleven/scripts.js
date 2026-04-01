const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 75000, inStock: true },
    { id: 2, name: "Headphones", category: "Electronics", price: 2500, inStock: false },
    { id: 3, name: "Coffee Mug", category: "Kitchen", price: 499, inStock: true },
    { id: 4, name: "Smartwatch", category: "Electronics", price: 12000, inStock: true },
    { id: 5, name: "Notebook", category: "Stationery", price: 199, inStock: true },
    { id: 6, name: "Water Bottle", category: "Kitchen", price: 899, inStock: false }
];

const filterConditions = [
    { key: "category", value: "Electronics" },
    { key: "inStock", value: true },
    { key: "priceBelow", value: 1000 },
    { key: "name", value: "Laptop" }
];


function filterProducts(products, condition) {
    const key = condition.key;
    const value = condition.value;

    return products.filter(product => {
        if (key === "priceBelow"){
            return product.price < value;
        }
        return product[key] === value;
    });
}

for (const condition of filterConditions) {
    const result = filterProducts(products, condition);
    console.log(`Filter -> ${condition.key}: ${condition.value}`);
    console.log(result);
}
