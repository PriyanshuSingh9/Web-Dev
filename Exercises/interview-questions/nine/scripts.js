function delay(){
    return Number((Math.random()+0.5)*1000);
}

function confirm(item,del){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(`Your Order for ${item} Confirmed!!!`)
        },del)
    })
    
}

async function placeOrder(item) {
    const confirmation =await confirm(item,delay())
    return(confirmation)
}

const items = ["Laptop", "Headphones", "Phone Case", "Smartwatch", "Keyboard"];

items.forEach(item => {
    placeOrder(item).then(msg=>console.log(msg))
});

