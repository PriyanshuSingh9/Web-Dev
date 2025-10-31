let choice={
    0:"rock",
    1:"paper",
    2:"scissor"
}

function computerChoice(){
    let input=Math.floor(Math.random()*3)
    return input
}

function userChoice(){
    let input =prompt("Choose your move")
    for (const key in choice) {
        if(input==choice[key]){
            console.log("\n")
            return key
        }
    }
}

function display(user,comp){
    console.log(`You chose: ${choice[user]}.`)
    console.log(`The Computer chose: ${choice[comp]}`)
    console.log("\n")
}

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

versus()