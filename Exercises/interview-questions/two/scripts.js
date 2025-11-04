const testArray = [5, 5, 2, 9, 1, 1, 8, 7, 7, 3, 10, 4, 4, 6, 12, 11, 10];

function double(num){
    return num*2;
}

function doubleTrouble(arr){
    console.log(`Original array: ${arr}`)
    for(let i=arr.length-1;i>=0;i--){
        if(arr[i]==arr[i-1]){
            arr[i]/=2;
        }
    }
    arr=arr.map(double);
    console.log(`Double Trouble array: ${arr}`);
}

doubleTrouble(testArray);