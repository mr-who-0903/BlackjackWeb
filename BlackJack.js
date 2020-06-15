function pickRandomCard(){          // this is the deck of cards.
    var assets;
    var randomCard = (Math.floor(Math.random() * (14 - 1) + 1));
    
    if(randomCard == 1)
    {assets = ['2.jpg',2];
    return (assets);}
    else if(randomCard == 2)
    {assets = ['3.jpg',3];
        return (assets);}
    else if(randomCard == 3)
    {assets = ['4.jpg',4];
    return assets;}
    else if(randomCard == 4)
    {assets = ['5.jpg',5];
    return assets;}
    else if(randomCard == 5)
    {assets = ['6.jpg',6];
    return assets;}
    else if(randomCard == 6)
    {assets = ['7.jpg',7];
    return assets;} 
    else if(randomCard == 7)
    {assets = ['8.png',8];
    return assets;}
    else if(randomCard == 8)
    {assets = ['9.jpg',9];
    return assets;}
    else if(randomCard == 9)
    {assets = ['10.png',10];
    return assets;}
    else if(randomCard == 10)         
    {  assets = ['A.png',1];
    return assets;}                          // A = 1
    else if(randomCard == 11)
    {assets = ['J.png',11];
    return assets;}                   // J = 11
    else if(randomCard == 12)
    {assets = ['Q.png',12];
    return assets; }                // Q = 12
    else if(randomCard == 13)
    {assets = ['K.png',13];
    return assets;}                         // K = 13
}

document.querySelector('#hit-btn').addEventListener('click', blackjackhit);
document.querySelector('#stand-btn').addEventListener('click', blackjackstand);
document.querySelector('#deal-btn').addEventListener('click', blackjackdeal);

/*var yourScore = 0;
var bustStatus = 0;*/
var usedCards = [];
let yourAllDetails = { yourScore:0, bustStatus:0, yourLock:0 };           // your all details
let dealerAllDetails = { dealerScore:0, bustStatus:0, dealerLock:0 };

function blackjackhit(){           
if (yourAllDetails.yourLock == 1)
    return;
else{    
  if (yourAllDetails.bustStatus == 1)
      return;
 else{    
     
  if(usedCards.length == 5){
      alert('Cannot pick more than 5 cards');
      return; }
  else{                                                                                   // FUNCTION FOR HIT
    var hitAudio = document.getElementById('hit-audio');
    hitAudio.play();
    
    do{
        var randomCard = pickRandomCard();                         // checks whether card is used or not.
    }while(usedCards.includes(randomCard[1]));                     // if it is used, it cannot be used again.
    
    usedCards.push(randomCard[1]);  
    console.log(usedCards);
    
    var image_tag = document.createElement('img');
    image_tag.setAttribute('src', './images/'+randomCard[0]);
    image_tag.setAttribute('height', 129);
    document.getElementById('your-box').appendChild(image_tag);
    
    yourAllDetails.yourScore = yourAllDetails.yourScore + randomCard[1];                         // your score
    
    if(yourAllDetails.yourScore > 21){
        var youBust = document.getElementById('your-score');
        youBust.setAttribute('style','color:red; font-size:30px;');
        youBust.textContent = ("BUST !");
        yourAllDetails.bustStatus = 1;
    }  
    else{  
        var yourScoreSpan = document.getElementById('your-score');
        yourScoreSpan.textContent = yourAllDetails.yourScore.toString(); 
      }
    }
  }
}
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackstand(){       // this function lets the dealer play.
    usedCards = [];
    yourAllDetails.yourLock = 1;
if(dealerAllDetails.dealerLock == 1)
    return;
else{    
  do{
   await sleep(900); 
    if(dealerAllDetails.bustStatus == 1)
        {  /* finalResult();*/
            return;
        }
    else{
        if(usedCards.length == 5)
            {  
               return;
            }
        else{
            
            if(yourAllDetails.yourScore < dealerAllDetails.dealerScore)   // if dealer scores more than you,then abort playing.
               {
                   return;
               }
        else{
            var hitAudio = document.getElementById('hit-audio');
            hitAudio.play();
            
            do{
            var randomCard = pickRandomCard();                         // checks whether card is used or not.
            }while(usedCards.includes(randomCard[1])); 
            
            usedCards.push(randomCard[1]);
            console.log(usedCards);
            
            var image_tag = document.createElement('img');
            image_tag.setAttribute('src', './images/'+randomCard[0]);
            image_tag.setAttribute('height', 129);
            document.getElementById('dealer-box').appendChild(image_tag);
            
            dealerAllDetails.dealerScore = dealerAllDetails.dealerScore + randomCard[1];
            
        if(dealerAllDetails.dealerScore > 21){
            var dealerBust = document.getElementById('dealer-score');
            dealerBust.setAttribute('style','color:red; font-size:30px;');
            dealerBust.textContent = ("BUST !");
            dealerAllDetails.bustStatus = 1;
            finalResult();
            return;
            }
        else{  
            var dealerScoreSpan = document.getElementById('dealer-score');
            dealerScoreSpan.textContent = dealerAllDetails.dealerScore.toString(); 
            }
        if (usedCards.length == 5)
                {
                    finalResult();
                    return;
                }
        if(yourAllDetails.yourScore < dealerAllDetails.dealerScore)   // if dealer scores more than you,then abort playing.
               {
                   finalResult();
                   return;
               }    
            var continueGame = abortDecision(dealerAllDetails.dealerScore, randomCard[1]);
            
            }
         }
      }
    }while(continueGame);
   
 finalResult();
}
}
var allCards = [2,3,4,5,6,7,8,9,10,1,11,12,13];

function abortDecision(dealerScore, pickedCard){   // this function decides whether dealer should continue or not.
    var scoreLeft = 21 - dealerScore;
    var i = allCards.indexOf(pickedCard);
    delete allCards[i];
    
    var lowRisk = allCards.filter(item => item <= scoreLeft).length;
    var highRisk = allCards.filter(item => item > scoreLeft).length;
    
    if(lowRisk > highRisk)
        return true;
    else{
        if(highRisk - lowRisk <= 2)
            return true;
        
        else if(highRisk - lowRisk == 3){
            var abortOrNot = (Math.floor(Math.random() * (2 - 0) + 0));
            if(abortOrNot == 0)
                return true;
            else 
                return false;
            console.log(abortOrNot);
        }
        
        else if(highRisk - lowRisk > 3)
            return false;
    }
        
    /*
for(j=0; j< allCards.length; j++){    
    for(var i = 0; i < usedCards.length; i++){
        if(allCards[j] == usedCards[i]){
                continue;
        }
    }
  }*/
}
var wins = 0;
var looses = 0;
var draws = 0;

function finalResult(){                // this function updates the result heading and increments table scores. 
    dealerAllDetails.dealerLock = 1;
    if(yourAllDetails.bustStatus == 0 && dealerAllDetails.bustStatus == 0){
        if(yourAllDetails.yourScore > dealerAllDetails.dealerScore){
             resultHeadingFunction(1);
             incrementWin();
        }
        else if(yourAllDetails.yourScore < dealerAllDetails.dealerScore){
            resultHeadingFunction(0);
            incrementLoose();
        }
        else if(yourAllDetails.yourScore == dealerAllDetails.dealerScore){
            resultHeadingFunction(2);
            incrementDraws();
        }
    }
    else if(yourAllDetails.bustStatus == 0 && dealerAllDetails.bustStatus == 1){
        resultHeadingFunction(1);
        incrementWin();
    }
    else if(yourAllDetails.bustStatus == 1 && dealerAllDetails.bustStatus == 0){
        resultHeadingFunction(0);
        incrementLoose();
    }
    else if(yourAllDetails.bustStatus == 1 && dealerAllDetails.bustStatus == 1){
        resultHeadingFunction(2);
        incrementDraws();
    }
}


function resultHeadingFunction(n){
    if(n == 1){
        var winAudio = document.getElementById('win-audio');
        winAudio.play();
        
        var winnerHeading = document.getElementById('result');
        winnerHeading.setAttribute('style','color:green; font-size:30px;');
        winnerHeading.textContent = ("YOU WIN !");
    }
    else if(n == 0){
        var looseAudio = document.getElementById('loose-audio');
        looseAudio.play();
        
        var looserHeading = document.getElementById('result');
        looserHeading.setAttribute('style','color:red; font-size:30px;');
        looserHeading.textContent = ("YOU LOOSE !");
    }
    else if(n == 2){
        var drawAudio = document.getElementById('win-audio');
        drawAudio.play();
        
        var drawHeading = document.getElementById('result');
        drawHeading.setAttribute('style','color:blue; font-size:30px;');
        drawHeading.textContent = ("DRAW !");
    }
} 

/*
var dealbtn = document.getElementById('deal-btn');
dealbtn.setAttribute('onclick', 'window.location.reload();');*/

function blackjackdeal(){          // this function resets eveything(except table scores) so that you can play again.
    console.log("deal");
    usedCards = [];   // reset usedCards to 0
    
    yourAllDetails.yourLock = 0;        // releasing your lock.
    dealerAllDetails.dealerLock = 0;     // releasing dealer lock.
    
    var images = [].slice.call(document.getElementsByTagName('img'),0);      // reset images to none
    images.forEach(function(img){
        img.parentNode.removeChild(img);
    });
    
    yourAllDetails.yourScore = 0;               // reset scores on backend
    dealerAllDetails.dealerScore = 0;
    
    yourAllDetails.bustStatus = 0;             // reset bust status
    dealerAllDetails.bustStatus = 0;
    
    allCards = [2,3,4,5,6,7,8,9,10,1,11,12,13];  // reset all cards
    
    var resetYourScore = document.getElementById('your-score');        // reset scores on frontend
    resetYourScore.textContent = ('0');
    resetYourScore.setAttribute('style', 'color:white; font-size:25px; font-weight:bolder');
    
    var resetDealerScore = document.getElementById('dealer-score');
    resetDealerScore.textContent = ('0');
    resetDealerScore.setAttribute('style', 'color:white; font-size:25px; font-weight:bolder');
    
    var resetResultHeading = document.getElementById('result');                //reset heading
    resetResultHeading.textContent = ("Let's play");
    resetResultHeading.setAttribute('style', 'font-size:30px; color:black');
       
}

function incrementWin(){
    wins +=1;      
    var incrementWinScore = document.getElementById('winning-score');
    incrementWinScore.textContent = wins.toString();
}

function incrementLoose(){
    looses +=1;      
    var incrementLooseScore = document.getElementById('loosing-score');
    incrementLooseScore.textContent = looses.toString();
}

function incrementDraws(){
    draws +=1;      
    var incrementDrawScore = document.getElementById('draw-score');
    incrementDrawScore.textContent = draws.toString();
}












