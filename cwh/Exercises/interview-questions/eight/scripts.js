const testNumbers = [1, 3, 5, 10, 15, 20, 25, 30, 42, 55];

function display(element) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(element * 2)
            resolve()
        }, 500);
    })
}

async function mapping(arr) {
    for (const element of arr) {
        await display(element);
    }

}

mapping(testNumbers)