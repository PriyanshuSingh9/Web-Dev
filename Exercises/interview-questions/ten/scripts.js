function randomDelay() {
  return (Math.random() + 1) * 1000; 
}

async function brewCoffee(type) {
  return new Promise((resolve) => {
    const time = randomDelay();
    setTimeout(() => {
      resolve(`☕ Your ${type} is ready! Enjoy!`);
    }, time);
  });
}

brewCoffee("Cappuccino").then((message) => console.log(message));
