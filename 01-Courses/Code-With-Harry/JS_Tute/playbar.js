let image = prompt("Enter the image address");
let runtime = prompt("Enter the video runtime");
let title = prompt("Enter the title");
let channel = prompt("Enter the channel");
let views = parseInt(prompt("Enter the number of views"));
let time = prompt("Enter when the video was uploaded");

function cnt(views) {
    let view_cnt = "";
    if (views < 1000) {
        view_cnt = `${views} views`;
    }
    else if (views >= 1000 && views <= 999999) {
        view_cnt = `${(views / 1000)}k views`;
    }
    else {
        view_cnt = `${(views / 1000000)}m views`;
    }
    return view_cnt;
}

function bar(image, runtime, title, channel, views, time) {
    let formattedViews = cnt(views);

    document.querySelector(".vid").innerHTML =
        `<img class="thumb" src="${image}" alt="thumbnail">
         <div class="runtime">${runtime}</div>`;

    document.querySelector(".title").innerText = title;
    document.querySelector(".channel").innerText = channel;
    document.querySelector(".stats").innerText = `${formattedViews} • ${time}`;
}

bar(image, runtime, title, channel, views, time);

