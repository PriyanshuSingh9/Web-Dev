const add=document.body.querySelector("#add");
const input=document.body.querySelector("input");
const list=document.createElement("div");

add.addEventListener("click",()=>{
    if(input.value==""){
        alert("No value entered!!!");
    }
    else{
        saveNoteToLocalStorage(input.value);
        input.value="";
    }
    
})

function saveNoteToLocalStorage(note){
    localStorage.setItem("note",note);
}
if(localStorage.getItem("note")){
    list.textContent=localStorage.getItem("note");
    document.body.append(list)
}
