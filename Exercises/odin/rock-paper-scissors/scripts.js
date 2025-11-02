//Object to map user choice to an integer to perform battle mechanisms later
let choice={
    0:"rock",
    1:"paper",
    2:"scissor"
}

//Function to take random move
function computerChoice(){
    let input=Math.floor(Math.random()*3)
    return input
}

//Function to take user input
function userChoice(){
    while (true) {
        let input = prompt("Choose your move: rock, paper, or scissor").toLowerCase();

        for (const key in choice) {
            if (input === choice[key]) {
                console.log("\n");
                return parseInt(key);
            }
        }

        console.log("❌ Invalid choice! Please enter 'rock', 'paper', or 'scissor'.\n");
    }
}

//Function to display round information
function display(user,comp){
    console.log(`You chose: ${choice[user]}.`)
    console.log(`The Computer chose: ${choice[comp]}`)
    console.log("\n")
}

//Complete battle mechanism
function versus(){
    let winCount=0
    let lossCount=0

    let userMove
    let computerMove
    let rounds=prompt("How many rounds would you like?")

    for(let i=0;i<Number(rounds);i++){
        userMove=userChoice()
        computerMove=computerChoice()
        display(userMove,computerMove)
        if(userMove==computerMove+1||userMove==0&&computerMove==2){
            winCount++
            console.log("You won this round!!!")
        }
        else if(userMove==computerMove){
            console.log("This round was a draw!!!")
        }
        else{
            lossCount++
            console.log("You lost this round!!!")
        }
    }


    console.log(`The final score was: \n You: ${winCount} \n Computer: ${lossCount}`)
    if(winCount>lossCount){
        console.log("You may have lost some battles but you won the war!!!")
    }
    else if(winCount<=lossCount){
        console.log("Better luck next time!!!")
    }
}



//Calling versus() to begin execution of the complete program
versus()

