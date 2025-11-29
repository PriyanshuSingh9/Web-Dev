function go() {
    showCircle(100).then((circle) => {
        circle.classList.add("message-ball")
        circle.append("Kya re gandu")
    })
}

function showCircle(radius) {
    let circle = document.createElement("div")
    circle.classList.add("circle")
    document.body.append(circle)
    circle.style.height = 0
    circle.style.width = 0
    circle.style.top = 50 +"%"
    circle.style.left = 50 +"%"
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            circle.style.height = 2*radius+"px"
            circle.style.width = 2*radius+"px"
            circle.addEventListener('transitionend', function handler() {
                circle.removeEventListener('transitionend', handler);
                resolve(circle)
            });
        }, 0)
    })
}

// function go() {
//     showCircle(150, 150, 100).then(div => {
//         div.classList.add('message-ball');
//         div.append("Hello, world!");
//     });
// }
//
// function showCircle(cx, cy, radius) {
//     let div = document.createElement('div');
//     div.style.width = 0;
//     div.style.height = 0;
//     div.style.left = cx + 'px';
//     div.style.top = cy + 'px';
//     div.className = 'circle';
//     document.body.append(div);
//
//     return new Promise(resolve => {
//         setTimeout(() => {
//             div.style.width = radius * 2 + 'px';
//             div.style.height = radius * 2 + 'px';
//
//             div.addEventListener('transitionend', function handler() {
//                 div.removeEventListener('transitionend', handler);
//                 resolve(div);
//             });
//         }, 0);
//     })
// }

