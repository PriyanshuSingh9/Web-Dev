const change=(n)=>{
        let l=document.getElementsByClassName('light')
    if (n <=3){
        l[0].innerHTML =`<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
            <circle r="45" cx="50" cy="50" fill="green" />
        </svg>`
    }
    else if (n >3 && n <= 4){
        l[0].innerHTML =`<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
            <circle r="45" cx="50" cy="50" fill="yellow" />
        </svg>`
    }
    else {
        l[0].innerHTML =`<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
            <circle r="45" cx="50" cy="50" fill="red" />
            </svg>`
    }
}

async function cnt_dwn() {
    let cnt=document.getElementsByClassName("cnt_dwn")
    cnt[0].innerHTML=8
    setInterval(()=>{
        if (cnt[0].innerHTML>0){
            cnt[0].innerHTML-=1
        }
        else{
            cnt[0].innerHTML=8
        }
        change(cnt[0].innerHTML)
    },1000)
}
cnt_dwn()