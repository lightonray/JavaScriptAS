let moves = 0;
let matching_Cards = document.getElementsByClassName("match");
let closedi = document.querySelector(".closed");
let close_menu = document.getElementById("cmenu");




let modal = document.getElementById("popup")
const deck = document.getElementById("cdeck");
let cards = document.querySelectorAll(' .deck .card');
let isFlipedCard = false; 


let first_Card, second_Card;



let images = document.getElementsByClassName("face");
let startmenu = document.getElementById("popup2");
let Score = document.getElementsByClassName("score");  
let playerScore1 = document.getElementById("score1");   

var turn = 1; 

let names = document.getElementsByClassName("name"); 


let Players = [ 
    document.getElementById("firstplayer"),
    document.getElementById("secondplayer"),
    document.getElementById("thirdplayer"),
    document.getElementById("fourthplayer")];

let nameScores = document.getElementsByClassName("name-score");


function GetName() {
    let player1 = document.getElementById("player1").value;
    names[0].innerHTML = player1;
    let player2 = document.getElementById("player2").value;
    names[1].innerHTML = player2;
    let player3 = document.getElementById("player3").value;
    names[2].innerHTML = player3;
    let player4 = document.getElementById("player4").value;
    names[3].innerHTML = player4;
}


var PlayersPoints = [
    { Player: names[0], Points: Score[0].value },
    { Player: names[1], Points: Score[1].value },
    { Player: names[2], Points: Score[2].value },
    { Player: names[3], Points: Score[3].value }
];
let currentPlayer = PlayersPoints[0].Player;



document.getElementById("content2").style.display = "inline";
let radiobtns = document.getElementsByClassName("radiobutton"); 
let chosen = 1; 
radiobtns[0].checked = true;
function Multiplayer() {
    for (var i = 0; i < radiobtns.length; i++) {
        radiobtns[i].checked = false;
    }
    this.checked = true;
    chosen = Number(this.value);
    DisplayPlayer(); 
}

function DisplayPlayer() {
    for (var i = 1; i < 4; i++) {
        Players[i].classList.remove("vis");
        nameScores[i].style.display = "none";
    }
    nameScores[0].style.display = "block";
    let l = chosen;
    for (var j = 0; j < l; j++) {
        Players[j].classList.add("vis");
        nameScores[j].style.display = "block";
    }
}

for (var i = 0; i < radiobtns.length; i++) {
    if (radiobtns[i].disabled === false) {
        radiobtns[i].addEventListener("click", Multiplayer);
    }
}


function CloseMenu() {
    document.getElementById("cmenu").style.display = "block";
    close_menu.addEventListener("click", function (e) {
        GetName();
        startmenu.classList.remove("show");

        $(deck).css({ "visibility": "visible" });
        $(".players").css({ "visibility": "visible" });
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.display = "block";
        }
    });
}


document.body.onload = StartMenu(0); 
function StartMenu(index) {
        $(deck).css({ "visibility": "hidden" }); 
        $(".players").css({ "visibility": "hidden" }); 
    startmenu.classList.add("show"); 

    
        if (index == 0) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].classList.remove("show", "open", "match", "disabled"); 
            }
        }
   
        else { 
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.display = "none";
            }
            for (var i = 0; i < radiobtns.length; i++) {
                radiobtns[i].disabled = true;
            }
            CloseMenu();
        }
   
}


var selected = "cats"; 
let options = document.getElementsByClassName("option");
function ChosenOption() {
    this.classList.add("selected");
    selected = this.id;
    console.log(selected);
    for (var i = 0; i < options.length; i++) {
        option = options[i];
        if (option.id !== selected) {
            option.classList.remove("selected");
        }
    }
}
for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", ChosenOption);
}

 
function Theme() {
    
    var Theme = [];

    var ThemeAlts = [];
    for (var i = 0; i < 10; i++) {
        Theme[i] = new Image();
        Theme[i].src = "imgs/" + selected +"/img" + (i + 1) + ".jpg";
        Theme[i].alt = "img" + (i + 1);
        ThemeAlts[i] = Theme[i].alt;
    }
    var imgAlts = [];
    for (var j = 0; j < 20; j++) {
        imgAlts[j] = images[j].alt;
        if (ThemeAlts.includes(imgAlts[j])) {
            let index = ThemeAlts.indexOf(imgAlts[j]);
            images[j].src = Theme[index].src;
        }
    }
}

function shuffle(cards) {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20);
        card.style.order = randomPos;
    });
};


function start_Game() {
    isFlipedCard = false;
    document.getElementById("namescore1").style.display = "block";
    GetName();
    startmenu.classList.remove("show");


    playerScore1.value = 0;  
    for (var i = 0; i < PlayersPoints.length; i++) {
        PlayersPoints[i].Points = 0;
        Score[i].value = 0;
        PlayersPoints[i].Player.classList.remove("turn");
    }

    PlayersPoints[0].Player.classList.add("turn");
    currentPlayer = PlayersPoints[0].Player;
    turn = 1;

    

    $(deck).css({ "visibility": "visible" }); 
    $(".players").css({ "visibility": "visible" }); 

    first_Card = 0;
    second_Card = 0;
    Theme();
    shuffle(cards);

    
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].style.display = "block";
        cards[i].classList.remove("show", "open", "match", "disabled");

    }

    moves = 0;

    
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}




function flipCard() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");

    if (!isFlipedCard) {
        isFlipedCard = true;
        first_Card = this;
    }
    else {
        disablePlayGround();
        isFlipedCard = false;
        second_Card = this;
        checkForMatch();
        moveCounter();
        
    }
}

function checkForMatch() {
    if (first_Card.dataset.framework === second_Card.dataset.framework) {
        matched();

    }
    else {
        unmatched();
    }
    
}

function matched() {
    first_Card.classList.add("match", "disabled");
    second_Card.classList.add("match", "disabled");
    
    if (chosen === 1) {
        playerScore1.value++;
    }
    else {
     
        for (var i = 0; i < PlayersPoints.length; i++) {
           
            if (currentPlayer.innerHTML == PlayersPoints[i].Player.innerHTML) {
                PlayersPoints[i].Points++;
                Score[i].value++;
            }
        }
    }
    AblePlayGround();
}
function unmatched() {
    
    first_Card.classList.add("unmatched");
    second_Card.classList.add("unmatched");
    setTimeout(function () {
        first_Card.classList.remove("open", "unmatched");
        second_Card.classList.remove("open","unmatched");
        enable();
    }, 850);
    setTimeout(function () {
        first_Card.classList.remove("show");
        second_Card.classList.remove("show");
        AblePlayGround();
    }, 900);

}


function disablePlayGround() {
    for (var c = 0; c < cards.length; c++) {
        card = cards[c];
        card.classList.add("disableplayground");
    }
} 

function AblePlayGround() {
    for (var c = 0; c < cards.length; c++) {
        card = cards[c];

        card.classList.remove("disableplayground");
    }
}



function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matching_Cards.length; i++) {
            matching_Cards[i].classList.add("disabled");
        }
    });
}




function moveCounter() {
    moves++;
    
    if (matching_Cards.length !== 20) {
        if (chosen == 4 && turn == 4) {
            PlayersPoints[3].Player.classList.remove("turn");
            turn = 5;
        }

        if (turn <= chosen) {
            PlayersPoints[turn - 1].Player.classList.remove("turn");
            PlayersPoints[turn].Player.classList.add("turn");
            currentPlayer = PlayersPoints[turn].Player;
            turn++;
        }
        if (turn> chosen) {
            PlayersPoints[chosen - 1].Player.classList.remove("turn");
            PlayersPoints[0].Player.classList.add("turn")
            currentPlayer = PlayersPoints[0].Player;
            turn = 1;
        }
    }



    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}






var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}




function congratulations() {
    if (matching_Cards.length == 20) {
        var b = 0;
        while (b < 4) {
            PlayersPoints[b].Player.classList.remove("turn");
            b++
        }

        clearInterval(interval);
        finalTime = timer.innerHTML;

        
        modal.classList.add("show");
       
      
        
        document.getElementById("youwinner").classList.add("show");
        document.getElementById("totalTime").innerHTML = finalTime;
        
        if (chosen == 1) {
            document.getElementById("finalMove").innerHTML = moves;
            document.getElementById("playername").innerHTML = names[0].innerHTML + "!";

            document.getElementById("winner").style.display = "none";

            document.getElementById("congrats2").style.display = "none";
        }      
        
        else {
            document.getElementById("youwinner").classList.add("show");
            document.getElementById("loserscore").style.display = "inline-flex";

            document.getElementById("finalMove").style.display = "none";
            document.getElementById("movescount").style.display = "none";


            let SortedPlayersPoints = [];
            for (let i = 0; i < 4; i++) {
                SortedPlayersPoints[i] = { Points: Score[i].value, Name: PlayersPoints[i].Player.innerHTML };
            }
            SortedPlayersPoints = SortedPlayersPoints.sort(function (a, b) { return b.Points - a.Points });           

            if (SortedPlayersPoints[0].Points == SortedPlayersPoints[chosen - 1].Points) {  
                document.getElementById("congrats2").style.display = "inline-flex"; 
                document.getElementById("congrats1").style.display = "none";
            }
            else {
                document.getElementById("congrats2").style.display = "none";
                document.getElementById("congrats1").style.display = "inline-flex";
                let Winners = SortedPlayersPoints[0].Name; 

                for (let i = 1; i < chosen; i++) {
                    if (SortedPlayersPoints[i].Points == SortedPlayersPoints[0].Points) {
                        Winners += ", " + SortedPlayersPoints[i].Name;
                        document.getElementById("youwinner").innerHTML = "You're winners! 🎉🎉";
                    } else break;
                }
                Winners += "!";
                document.getElementById("playername").innerHTML = Winners;
            }
            

            document.getElementById("winnername").innerHTML = SortedPlayersPoints[0].Name + ":";
            document.getElementById("firstscore").innerHTML = SortedPlayersPoints[0].Points;

            document.getElementById("loser1name").innerHTML = SortedPlayersPoints[1].Name + ":";
            document.getElementById("loser1score").innerHTML = SortedPlayersPoints[1].Points;

            
            if (chosen == 2) {
                
                document.getElementById("loser2").style.display = "none";
                document.getElementById("loser3").style.display = "none";
            }
            if (chosen == 3) {
                document.getElementById("loser3").style.display = "none";

                document.getElementById("loser2name").innerHTML = SortedPlayersPoints[2].Name + ":";
                document.getElementById("loser2score").innerHTML = SortedPlayersPoints[2].Points;
            }

            if (chosen == 4) {
                document.getElementById("loser2name").innerHTML = SortedPlayersPoints[2].Name + ":";
                document.getElementById("loser2score").innerHTML = SortedPlayersPoints[2].Points;

                document.getElementById("loser3name").innerHTML = SortedPlayersPoints[3].Name + ":";
                document.getElementById("loser3score").innerHTML = SortedPlayersPoints[3].Points;         
            }
        }
        
        closeModal();
    };
}



function closeModal() {
    closedi.addEventListener("click", function (e) {
        modal.classList.remove("show");
        start_Game();
    });
}

function play_Again() {
    modal.classList.remove("show");
    start_Game();
}

for (var i = 0; i < cards.length; i++) {
    card = cards[i];
        card.addEventListener("click", flipCard);
        card.addEventListener("click", congratulations);
    }