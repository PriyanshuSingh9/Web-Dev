let button=document.querySelector("#btn")

window.addEventListener("scroll",()=>{
    if(document.body.scrollTop>20 || document.documentElement.scrollTop > 20){
        button.style.display="block"
    }
    else{
        button.style.display="none"
    }
})
button.addEventListener("click",scrollToTop)

function scrollToTop(){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}