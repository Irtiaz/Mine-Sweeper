var grid;
var rows = 20, cols = 20;
var w;
var gameOver = false;
var totalM = 100;
var button,input;



function setup() {
  createCanvas(551,551);
  make2DArray(rows,cols);
  w = floor(width/cols);

  var currentIn = str(rows) + "," + str(totalM);
  createP("Enter dimension,total mines");
  input = createInput();
  input.size(200);
  button = createButton('Challenge');
  button.mousePressed(restart);

  for(var i =0;i<grid.length;i++){
    for(var j = 0;j<grid[i].length;j++){
      grid[i][j] = new Cell(w*i,w*j);
    }
  }

  generateMines(grid,totalM);

  for(var i =0;i<grid.length;i++){
    for(var j = 0;j<grid[i].length;j++){
      grid[i][j].meetNeighbors(grid,i,j);
      grid[i][j].minesAround();
    }
  }

  textAlign(CENTER,CENTER);
  textSize(w/2);
}

function draw() {
  background(255);

  for(var i =0;i<grid.length;i++){
    for(var j = 0;j<grid[i].length;j++){
      if(gameOver && grid[i][j].mine) {
        grid[i][j].hidden = false;
        grid[i][j].flagged = false;
        grid[i][j].question = false;
      }
      grid[i][j].display(w);
    }
  }

  if(nailedIt(grid)) {
    console.log("You Won");
    fill(0,0,255);
    textSize(32);
    text("You Won",width/2,height/2);
    textSize(w/2);
  }
}


function make2DArray(rows,cols){
  grid = new Array(rows);
  for(var i = 0;i<grid.length;i++){
    grid[i] = new Array(cols);
  }
}


function mousePressed(){
  if(!gameOver){
    var i = floor(mouseX/w);
    var j = floor(mouseY/w);
    if(mouseButton == LEFT){
      grid[i][j].flagged = false;
      grid[i][j].question = false;
      if(grid[i][j].hidden && grid[i][j].mine == false) grid[i][j].splash(grid);
      else if(grid[i][j].hidden && grid[i][j].mine) {
        gameOver = true;
      }
    }
    else{
      if(grid[i][j].hidden == true){
        if(!grid[i][j].flagged && !grid[i][j].question){
          grid[i][j].flagged = true;
        }
        else if(grid[i][j].flagged && !grid[i][j].question){
          grid[i][j].flagged = false;
          grid[i][j].question = true;
        }
        else if(!grid[i][j].flagged && grid[i][j].question){
          grid[i][j].question = false;
        }
      }
    }
  }
}


function keyPressed(){
  if(!gameOver){
    var i = floor(mouseX/w);
    var j = floor(mouseY/w);
    if(key === ' '){
      if(grid[i][j].hidden == true){
        if(!grid[i][j].flagged && !grid[i][j].question){
          grid[i][j].flagged = true;
        }
        else if(grid[i][j].flagged && !grid[i][j].question){
          grid[i][j].flagged = false;
          grid[i][j].question = true;
        }
        else if(!grid[i][j].flagged && grid[i][j].question){
          grid[i][j].question = false;
        }
      }
    }
  }
}


function generateMines(grid,mines){
  var rows = grid.length;
  var colums = grid[0].length;

  var total = 0;
  while(total<mines){
    var i = floor(random(rows));
    var j = floor(random(rows));
    if(grid[i][j].mine == false){
      grid[i][j].mine = true;
      total++;
    }
  }
}


function nailedIt(grid){
  if(!gameOver){
    for(var i = 0;i<grid.length;i++){
      for(var j = 0;j<grid[i].length;j++){
        var cell = grid[i][j];
        if(cell.hidden){
          if(!cell.flagged) return false;
          if(cell.flagged && !cell.mine) return false;
        }
      }
    }
    return true;
  }
  return false;
}


function restart(){
  var str = input.value();

  for(var i = 0;i<str.length;i++){
    if(str[i] === ','){
      var pst = '',nst = '';
      for(var j = 0;j<i;j++){
        pst += str[j];
      }
      for(var j = i+1;j<str.length;j++){
        nst += str[j];
      }
      break;
    }
  }

  rows = int(pst);
  cols = rows;
  totalM = int(nst);

  if(totalM > rows * cols) totalM = rows*cols;

  grid = [];
  gameOver = false;
  make2DArray(rows,cols);
  w = floor(width/cols);
for(var i =0;i<grid.length;i++){
    for(var j = 0;j<grid[i].length;j++){
      grid[i][j] = new Cell(w*i,w*j);
    }
  }

  generateMines(grid,totalM);

  for(var i =0;i<grid.length;i++){
    for(var j = 0;j<grid[i].length;j++){
      grid[i][j].meetNeighbors(grid,i,j);
      grid[i][j].minesAround();
    }
  }
  textSize(w/2);
}
