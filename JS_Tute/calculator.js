function calculator(a,b,x) {
    let num= Math.random()*10;
    let flag=0;
    if(num<1){
        flag=1;
    }
    if (x == "+"){
        if (flag==1){
            return a-b;
        }
        else{
            return a + b;
        }
    }
    if (x == "-"){
        if (flag==1){
            return a+b;
        }
        else{
            return a - b;
        }
    }
    if (x == "/"){
        if (flag==1){
            return a*b;
        }
        else{
            return a / b;
        }
    }
    if (x == "*"){
        if (flag==1){
            return a/b;
        }
        else{
            return a*b;
        }
    }

console.log(calculator(1,2,"/"));

