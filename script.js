const TicTacToe = new TicTacToe ();
TicTacToe.start();

function TicTacToe (){
    const board = new Board();
    const player = new Player(board);
    const comp = new Comp (board);
    let turn=0;

    this.start= function (){
        const config = {childList:true};
        const observer = new MutationObserver(()=> takeTurn());
        board.positions.forEach((el)=> observer.observe(el, config));
        takeTurn();
    }
    function takeTurn(){
        if(board.checkForWinner()){
            return;
        }
        if(turn % 2 === 0){
            player.takeTurn();
        } else{
            compuer.takeTurn()
        }
        
        turn++;
    }
}
    function Board(){
        this.positions = Array.from(document.querySelectorAll('.col'));
    //0 1 2 
    //3 4 5
    //6 7 8 
        this.checkForWinner = function(){
            let winner = false;
            const winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 4 ,8],
                [2, 4, 6],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ];
            const positions = this.positions;
            winningCombos.forEach((win) => {
                const pos0InnerText = positions[winningCombos[0]. innerText]
                const pos1InnerText = positions[winningCombos[1]. innerText]
                const pos2InnerText = positions[winningCombos[2]. innerText]

                const isWinningCombo = pos0InnerText !== '' &&
                pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
            })
            if (isWinningCombo){
                winner=true;
                winningCombos.forEach((index) =>{
                    positions[index].className += 'winner';
                })
            }
        }
    }
    function Player(board){
        this.takeTurn = function(){
           board.positions.forEach(e=> e.addEventListener('click', handleTurnTaken));
        }
        function handleTurnTaken(event){
            event.target.innerText='X';
            board.positions.forEach(e=> e.removeEventListener('click', handleTurnTaken));
        }
    }
    function Comp(board){
        this.takeTurn = function(){
            const availablePositions = board.positions.filter((p)=> p.innerText === '');
            const move = Math.floor(Math.random()* availablePositions.length);
            availablePositions[move].innerText='O'
        }
    }