window.onload = function() {
    var con = document.getElementsByClassName("box");

     
    let chance1=1;

    var board=[
        ["","",""],
        ["","",""],
        ["","",""]
    ]

    for (let i = 0; i < con.length; i++) {
        con[i].addEventListener("click", function(e) {
            mark(e, i);
        });
    }


        var player1="X";
        var player2="O";



    function mark(e,index)
    {
        e.target.innerText=player1;

        var x= Math.floor(index/3);
        var y=index%3;

        if(e.target.innerText=="")
        {
            alert("not null");
        }
        if(chance1==1)
        {
            e.target.innerText=player1;
            board[x][y]=player1;
            console.log(board[x][y]);
            chance1=2;
        }
        else if(chance1==2) 
        {
            e.target.innerText=player2;
            board[x][y]=player2;
            console.log(board[x][y]);
            chance1=1   
        }

         if(iswinner())
         {
            var result=chance1==1?"player 2 win": "player 1 win"
             alert(result);
            resetBoard();
         }
    }



    function resetBoard()
    {
        for(let i=0;i<board.length;i++)
        {
            for(let j=0;j<board[i].length;j++)
            {
                board[i][j]='';
                
            }
        }

        let cells = document.querySelectorAll(".cell");  // Assuming the cells have a class 'cell'
        cells.forEach(cell => cell.innerText = ""); 
    }



    function iswinner() {
        // Check for column winner
           for(let i = 0; i < board.length; i++) {
            if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != "") {
                return true;
            }
        }
    
        // Check for row winner
        for(let i = 0; i < board.length; i++) {
            if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != "") {
                return true; 
            }
        }

             if(board[0][0]==board[1][1]&&board[1][1]==board[2][2]&&board[1][1]!='')
             {
                return true;
             }
            if(board[0][2]==board[1][1]&&board[1][1]==board[2][0]&&board[1][1]!='')
                {
                    return true;
                }


                return false;
    }
    console.log(board);
};
