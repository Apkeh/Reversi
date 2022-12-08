// voor de timer heb ik inspiratie gehaald uit deze link:
//https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
let time = 0;
let timer = setInterval(timer_function, 1000)
function timer_function() {
    ++time;
    let h = Math.floor(time /3600);
    let min = Math.floor((time - h*3600)/60);
    let sec = time - (h*3600 + min*60);
    if(h < 10){
        h = "0"+h;
    }
    if(min < 10){
        min = "0"+min;
    }
    if(sec < 10){
        sec = "0"+sec;
    }
    document.getElementById("timer").innerHTML = h + ":" + min + ":" + sec;
}

let my_board =   [[0,0,0,0,0,0,0,0]
                 ,[0,0,0,0,0,0,0,0]
                 ,[0,0,0,3,0,0,0,0]
                 ,[0,0,3,2,1,0,0,0]
                 ,[0,0,0,1,2,3,0,0]
                 ,[0,0,0,0,3,0,0,0]
                 ,[0,0,0,0,0,0,0,0]
                 ,[0,0,0,0,0,0,0,0]]

let current_turn = 1;

//inspiratie oefenzitting
window.onload = function(){
    draw_board(my_board);
    document.getElementById("beurt").innerHTML ="zwart aan beurt"
    document.getElementById("score_zwart").innerHTML = "score zwart: " + 2 
    document.getElementById("score_wit").innerHTML = "score wit: " + 2 
    document.getElementById("timer").innerHTML = "00:00:00"
}
//inspiratie oefenzitting
function draw_board(board){
    document.getElementById("board_container").innerHTML = generate_board(board);
}
//inspiratie oefenzitting 
function generate_board(board){
    let board_html = "";
    for(let i = 0; i < board.length; i++){
        let row_html = "<tr>"
        for(let j = 0; j < board[i].length; j++){
            row_html += generate_tile(board[i][j]);
            }
        row_html+= "</tr>";
        board_html += row_html;
    }
    return `<table>${board_html}</table>`;
}
//inspiratie oefenzitting
function generate_tile(color){
    let tile_class = "empty"
    let tile_content ="";
    if (color==1){
        tile_class = "black"
        tile_content = ""
    }
    if(color ==2){
        tile_class = "white"
        tile_content = ""
    }
    if (color==3){
        tile_class = "grey"
        tile_content = ""
    }
    return `<td class="${tile_class} board_element" 
    onclick="click_tile(this)">${tile_content}</td>`;
}
//inspritatie oefenzitting
function click_tile(click){
    let row = click.parentNode.rowIndex;
    let col = click.cellIndex;
    if (my_board[row][col] == 3){
        update_board(my_board, row, col, current_turn);
    }
}
//inspiratie oefenzitting
function  update_board(board, row, col, color){
    board[row][col] = color
    change_color(board, row, col, color);
    grey_tile(board, color);
    no_grey_tiles(board, color)
    change_player()
    draw_board(board);
    if (current_turn == 1){
        document.getElementById("beurt").innerHTML = "zwart aan beurt"
    }
    else{
    document.getElementById("beurt").innerHTML = "wit aan beurt"
    }
    count_tiles(board)
}

function change_player(){
    if(current_turn== 1){
        current_turn= 2
    }  
    else{
        current_turn= 1;
    }
}

function no_grey_tiles(board,current_turn){
    let found = false;
    for(let i = 0; i < board.length ; i++){
        for(let j = 0; j < board[i].length ; j++){
            if (board[i][j] == 3){
                found = true;
            }
        }
    }
    if (found == false){
        if(current_turn== 1){
            current_turn= 2
        } 
        else{
            current_turn= 1;
        }
        grey_tile(board, current_turn)
        change_player()
    }
}
//inspiratie oefenzitting
function reset_board(){
    clearInterval(timer)
    my_board = [[0,0,0,0,0,0,0,0]
               ,[0,0,0,0,0,0,0,0]
               ,[0,0,0,3,0,0,0,0]
               ,[0,0,3,2,1,0,0,0]
               ,[0,0,0,1,2,3,0,0]
               ,[0,0,0,0,3,0,0,0]
               ,[0,0,0,0,0,0,0,0]
               ,[0,0,0,0,0,0,0,0]];
    draw_board(my_board)
    count_tiles(my_board)
    document.getElementById("timer").innerHTML = "00:00:00"
    timer = setInterval(timer_function, 1000)
    time = 0
    document.getElementById("beurt").innerHTML ="zwart aan beurt"
    current_turn = 1
}

function count_tiles(board){
    let count_black = 0
    let count_white = 0
    for(let i = 0; i < board.length ; i++){
        for(let j = 0; j < board[i].length ; j++){
            if (board[i][j] == 1){
                count_black += 1
            }
            else if(board[i][j]== 2){
                count_white += 1
            }
        }
    }
    check_win(board, count_black, count_white)
    document.getElementById("score_zwart").innerHTML = "score zwart: " + count_black 
    document.getElementById("score_wit").innerHTML = "score wit: " + count_white
}

//inspirtatie oefenzitting
function check_win(board, count_black, count_white){
    found = false;
    for(let i = 0; i < board.length ; i++){
        for(let j = 0; j < board[i].length ; j++){
            if(board[i][j] == 3){
                found = true
                
            }
        }
    }
    if (found == false){
        draw_board(board)
        if (count_black > count_white){
            alert("zwart wint!")
            document.getElementById("beurt").innerHTML = "zwart is gewonnen!"
        }
        if (count_black < count_white){
            alert("wit wint!")
            document.getElementById("beurt").innerHTML = "wit is gewonnen!"
        }
        if(count_black == count_white){ 
            alert("gelijkspel!")
            document.getElementById("beurt").innerHTML = "gelijkspel!"
        }
        clearInterval(timer) 
    }
}

function change_color(board, i,j, current_turn){
    let last_board = board;
    if (current_turn == 1){
        generate_color(board,i,j-1,"left",2,0,last_board)
        generate_color(board,i,j+1,"right",2, 0, last_board)
        generate_color(board,i-1,j,"up",2, 0, last_board)
        generate_color(board,i+1,j,"down",2, 0, last_board)
        generate_color(board,i-1,j-1,"left_up",2, 0, last_board)
        generate_color(board,i-1,j+1,"right_up",2, 0, last_board)
        generate_color(board,i+1,j-1,"left_down",2, 0, last_board)
        generate_color(board,i+1,j+1,"right_down",2, 0, last_board)
    }
    else{
        generate_color(board,i,j-1,"left",1, 0, last_board)
        generate_color(board,i,j+1,"right",1, 0, last_board)
        generate_color(board,i-1,j,"up",1, 0, last_board)
        generate_color(board,i+1,j,"down",1, 0, last_board)
        generate_color(board,i-1,j-1,"left_up",1, 0, last_board)
        generate_color(board,i-1,j+1,"right_up",1, 0, last_board)
        generate_color(board,i+1,j-1,"left_down",1, 0, last_board)
        generate_color(board,i+1,j+1,"right_down",1, 0, last_board)
    }
    
}

function generate_color(board,i,j, direction, color, teller, last_board ){
    if (direction == "left" && j > 0 && last_board[i][j] == color){
        return generate_color(board, i, j-1 , "left",color, teller+1, last_board)
    }
    if (direction == "right" &&  j < 7 && last_board[i][j] == color){
        return generate_color(board,i, j+1, "right", color, teller+1, last_board)
    }
    if ( direction == "up" && i > 0 && last_board[i][j] == color ){
        return generate_color(board,i-1, j,"up", color, teller+1,last_board)
    }
    if (direction == "down" &&  i < 7 && last_board[i][j] == color){
        return generate_color(board,i+1, j, "down", color, teller+1,last_board)
    }
    if (direction == "left_up" && j > 0 && i > 0 && last_board[i][j] == color){
        return generate_color(board, i-1, j-1, "left_up", color, teller+1,last_board)
    }
    if (direction == "right_up" && j < 7 && i > 0 && last_board[i][j] == color){
        return generate_color(board, i-1, j+1, "right_up", color, teller+1 ,last_board)
    }
    if (direction == "left_down" && j > 0 && i < 7 && last_board[i][j] == color){
        return generate_color(board, i+1, j-1, "left_down", color, teller+1,last_board)
    }
    if (direction == "right_down" && j <7 && i<7 && last_board[i][j] == color){
        return generate_color(board, i+1, j+1, "right_down", color, teller+1,last_board)
    }
    else if(teller >= 1 && color == 2 && last_board[i][j] == 1 ){
        generate_color_final(direction, teller, i, j, board, board[i][j])

    }
    else if(teller >= 1 && color == 1 && last_board[i][j] == 2){
        generate_color_final(direction, teller, i, j, board, board[i][j])
    }
}

function generate_color_final(direction, teller, i, j, board, color){
    if (direction == "left"){
        let k = 0;
        while( k < teller){
            j = j +1;
            board[i][j] = color
            k = k+1
        }
    }
    if (direction == "right"){
        let k = 0;
        while( k < teller){
            j = j -1;
            board[i][j] = color
            k = k+1;
        }  
    }
    if (direction == "up"){
        let k = 0;
        while( k < teller){
            i = i+1;
            board[i][j] = color
            k = k+1;
        }
    }
    if (direction == "down"){
        let k = 0;
        while( k < teller){
            i = i -1;
            board[i][j] = color
            k = k+1;
        }
    }
    if (direction == "left_up"){
        let k = 0;
        while( k < teller){
            i = i +1;
            j = j+1;
            board[i][j] = color
            k = k+1;
        }
    }
    if (direction == "right_up"){
        let k = 0;
        while( k < teller){
            i = i+1;
            j = j -1;
            board[i][j] = color
            k = k+1;
        }
    }
    if (direction == "left_down"){
        let k = 0;
        while( k < teller){
            i = i -1
            j = j +1;
            board[i][j] = color
            k = k+1;
        }
    }
    if (direction == "right_down"){
        let k = 0;
        while( k < teller){
            i = i -1
            j = j -1;
            board[i][j] = color
            k = k+1;
        }
    }
}

function grey_tile(board,current_turn){
    for(let i = 0; i < board.length ; i++){
        for(let j = 0; j < board[i].length ; j++){
            if (board[i][j]== 3){
                board[i][j] = 0;
            }
        }
    }
    for(let i = 0; i < board.length ; i++){
        for(let j = 0; j < board[i].length ; j++){
            if (current_turn == 2){
                if (board[i][j] == 1){
                    generate_grey_tile(board, i, j-1, 0, 2, "left");
                    generate_grey_tile(board, i, j+1, 0, 2, "right"); 
                    generate_grey_tile(board, i-1, j,0, 2, "up");  
                    generate_grey_tile(board, i+1,j,0, 2, "down");
                    generate_grey_tile(board, i-1,j-1, 0, 2, "left_up");
                    generate_grey_tile(board, i-1,j+1,0,2,"right_up");
                    generate_grey_tile(board, i+1,j-1,0,2, "left_down" );
                    generate_grey_tile(board, i+1,j+1,0,2, "right_down");
                }
            }
            else{ 
                if(board[i][j] == 2){
                    generate_grey_tile(board, i, j-1, 0, 1, "left"); 
                    generate_grey_tile(board, i, j+1, 0, 1, "right"); 
                    generate_grey_tile(board, i-1, j,0, 1, "up");  
                    generate_grey_tile(board, i+1,j,0, 1, "down");
                    generate_grey_tile(board, i-1,j-1, 0, 1, "left_up");
                    generate_grey_tile(board, i-1,j+1,0,1,"right_up" );
                    generate_grey_tile(board, i+1,j-1,0,1, "left_down" );
                    generate_grey_tile(board, i+1,j+1,0,1, "right_down");
                }   
            }
        }
    }
}

function generate_grey_tile(board,i,j, teller, current_turn, direction){
    if (direction == "left" && j > 0 && board[i][j] == current_turn){
        return generate_grey_tile(board, i, j-1 , teller+1, current_turn, "left")
    }
    if (direction == "right" &&  j < 7 && board[i][j] == current_turn){
        return generate_grey_tile(board,i, j+1, teller+1, current_turn, "right")
    }
    if ( direction == "up" && i > 0 && board[i][j] == current_turn ){
        return generate_grey_tile(board,i-1, j,teller+1, current_turn, "up")
    }
    if (direction == "down" &&  i < 7 && board[i][j] == current_turn){
        return generate_grey_tile(board,i+1, j, teller+1, current_turn, "down")
    }
    if (direction == "left_up" && j > 0 && i > 0 && board[i][j] == current_turn){
        return generate_grey_tile(board, i-1, j-1, teller+1, current_turn, "left_up")
    }
    if (direction == "right_up" && j < 7 && i > 0 && board[i][j] == current_turn){
        return generate_grey_tile(board, i-1, j+1, teller+1, current_turn, "right_up" )
    }
    if (direction == "left_down" && j > 0 && i < 7 && board[i][j] == current_turn){
        return generate_grey_tile(board, i+1, j-1, teller+1, current_turn, "left_down")
    }
    if (direction == "right_down" && j <7 && i<7 && board[i][j] == current_turn){
        return generate_grey_tile(board, i+1, j+1, teller+1, current_turn, "right_down")
    }
    else if ( teller >= 1 && (board[i][j] == 0 || board[i][j] == 3)){
        board[i][j] = 3;
    }
}
