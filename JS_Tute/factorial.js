function fact(num){
    const arr=[]
    for (let i = 1;i<=num;i++){
        arr.push(i)
    }
    console.log(arr.reduce(mult))
}
function mult(a,b){
    return a * b
}
fact(5)