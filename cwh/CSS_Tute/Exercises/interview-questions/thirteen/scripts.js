const cart = [
  { name: "Laptop", price: 75000, quantity: 1 },
  { name: "Headphones", price: 2500, quantity: 2 },
  { name: "Notebook", price: 100, quantity: 5 }
];

function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}


console.log("Total cart cost:", calculateTotal(cart));
