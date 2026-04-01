let rand = () => {
    return Math.round(Math.random() * 5) + 2
}

let delay_arr = () => {
    let a = []
    for (let i = 0; i < 7; i++) {
        a.push(rand())
    }
    return (a.map(value => value * 1000))
}

let delay = delay_arr()
console.log(delay)

var scare = [
    "Initializing Hacking",
    "Reading your files",
    "Password files detected",
    "Sending all passwords and personal files to server",
    "Cleaning files",
    "Good Night"
];

async function adder(str, del) {
    return new Promise(resolve => {
        setTimeout(() => {
            let div = document.createElement('div')
            div.innerHTML = str
            document.body.append(div)
            resolve(div)
        }, del)
    })
}

async function terminal() {
    setInterval(()=>{
        let last=document.getElementsByTagName('div')
        last=last[last.length-1]
        if (last.innerHTML.endsWith("...")){
            last.innerHTML=last.innerHTML.slice(0,last.innerHTML.length-3)
        }
        else {
            last.innerHTML+="."
        }
    },100)
    for (let i = 0; i < scare.length; i++) {
        await adder(scare[i],delay[i])
    }
}

terminal()