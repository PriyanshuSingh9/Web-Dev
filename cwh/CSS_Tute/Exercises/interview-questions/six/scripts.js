const testStrings = [
  "hello",
  "WORLD",
  "JavaScript",
  "AEIOU",
  "bcdfg",
  "ChatGPT",
  "vowel counter",
  "PYTHON",
  "openAI",
  "why",
  "",
  "A quick brown fox",
  "PROGRAMMING",
  "beautiful",
  "xyz"
];

function vowelCounter(string){
    const vowels="aeiouAEIOU"; 
    let vowelCount=0;

    for (const i in string) {
        if(vowels.includes(string[i])){
            vowelCount+=1;
        }  
    }
    return vowelCount;
}


testStrings.forEach(str => {
  console.log(`${str} → ${vowelCounter(str)}`);
});