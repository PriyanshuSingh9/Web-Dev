function name_gen(){
    let a = Math.round(Math.random()*2);
    let b = Math.round(Math.random()*2);
    let c = Math.round(Math.random()*2);
    let start = {
        0:"Crazy",
        1:"Amazing",
        2:"Fire",
    };
    let mid = {
        0:"Engine",
        1:"Foods",
        2:"Garments"
    }
    let end ={
        0:"Bros",
        1:"Limited",
        2:"Hub"
    }
    console.log(`${start[a]} ${mid[b]} ${end[c]}`);
}

name_gen();







