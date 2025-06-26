let result=''
    const score=JSON.parse(localStorage.getItem('score')) || {win:0,lose:0,tie:0};
    updatemove()
    
    
       function play(choice){
        compMove=pickcompmove()
        if(choice === 'rock'){
            if(compMove==='rock'){
                result='Tie'
            }
            else if(compMove==='scissors'){
                result="Win"
            }
            else if(compMove==='paper'){
                result='Lose'
            }
             
            
        }
        if(choice === 'scissors'){
            if(compMove==='rock'){
                result='Lose'
            }
            else if(compMove==='scissors'){
                result="Tie"
            }
            else if(compMove==='paper'){
                result='Win'
            }
            
        }
        if(choice === 'paper'){
            if(compMove==='rock'){
                result='Win'
            }
            else if(compMove==='scissors'){
                result="Lose"
            }
            else if(compMove==='paper'){
                result='Tie'
            }
            
        }

        if(result==="Win"){
        score.win +=1
    }
    else if(result === "Lose"){
        score.lose +=1
    }
    else if(result === "Tie"){
        score.tie +=1
    }
    localStorage.setItem('score',JSON.stringify(score))
     updatemove()
        document.querySelector('.move').innerHTML=`You <img src="images/${choice}-emoji.png "> Comp<img src="images/${compMove}-emoji.png"> `
        document.querySelector(`.result`).innerHTML=`Result:${result}`

       }
       function updatemove(){
    document.querySelector('.score').innerHTML=`Win: ${score.win} Lose: ${score.lose} Tie: ${score.tie}`                                       }
    
     function pickcompmove(){
        rn=Math.random()
     compMove='';
    if(rn >= 0 && rn < 1/3){
        compMove='rock'
    }
    else if(rn >=1/3 && rn<2/3){
        compMove='scissors'
    }
    else{
        compMove='paper'
    }
    return compMove
        }
        