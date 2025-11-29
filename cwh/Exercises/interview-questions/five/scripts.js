const testArrays = [
  [1, 2, 3, 4, 5],
  [10, 20, -5, 30],
  [0, 1, 2, 3, -1, 4],
  [-1, 5, 10],
  [100, 200, 300],
  [5, -2, 10, 15],
  [7, 8, 9, 0, -10, 5],
  [1, 1, 1, 1, 1],
  [50, -50, 100],
  [2, 4, 6, 8, -3, 10]
];

function negativeIndex(arr){
    let index=arr.length;
    for (const i in arr) {
        const num = arr[i];
        if(num<0){
            index=i;
            break
        }
    }
    return index;
}

function sumSelector(arr){
    let sumArr=[]
    sumArr=arr.slice(0,negativeIndex(arr));
    let sum = sumArr.reduce((total,current)=>{
        return total+current;
    },0);
    return sum;
}

testArrays.forEach(arr => {
  console.log(`${arr} → ${sumSelector(arr)}`);
});
