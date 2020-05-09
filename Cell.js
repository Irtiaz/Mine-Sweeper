var Cell = function(x,y){
  this.x  = x;
  this.y = y;
  this.hidden = true;

  // var possibility = 0.10;
  // if(random(1)<possibility) this.mine = true;
  // else this.mine = false;
  this.mine = false;

  this.neighbors = [];
  this.minesNear = 0;
  this.flagged = false;
  this.question = false;
}

Cell.prototype.display = function(r){
  if(this.hidden) noFill();
  else fill(255,128,64,70);
  rect(this.x,this.y,r,r);
  if(!this.hidden){
    if(this.mine && !this.flagged){
      fill(255,0,0);
      ellipse(this.x + r/2,this.y + r/2,r/2,r/2);
    }
    else if(this.minesNear != 0){
      fill(0);
      text(this.minesNear,this.x + r/2,this.y + r/2);
    }
  }
  else{
    if(this.flagged){
      strokeWeight(2);
      line(this.x + r/4,this.y+r/4,this.x+r/4,this.y+3*r/4);
      strokeWeight(1);
      fill(0,255,0);
      triangle(this.x+r/4,this.y+r/4,this.x+3*r/4,this.y+3*r/8,this.x+r/4,this.y+r/2);
    }
    else if(this.question){
      fill(0);
      text("?",this.x + r/2,this.y + r/2);
    }
  }
}

Cell.prototype.meetNeighbors = function(grid,i,j){
  var colums = grid.length;
  var rows = grid[0].length;

  if (i>0) this.neighbors.push(grid[i-1][j]);
  if (i<rows - 1) this.neighbors.push(grid[i+1][j]);
  if (j>0) this.neighbors.push(grid[i][j-1]);
  if (j< colums - 1) this.neighbors.push(grid[i][j+1]);
  if(i>0 && j>0) this.neighbors.push(grid[i-1][j-1]);
  if(i>0 && j<colums - 1) this.neighbors.push(grid[i-1][j+1]);
  if(i<rows - 1 && j< cols - 1) this.neighbors.push(grid[i+1][j+1]);
  if(i<rows - 1 && j>0) this.neighbors.push(grid[i+1][j-1]);
}

Cell.prototype.minesAround = function(){
  for(var i = 0;i<this.neighbors.length;i++){
    if(this.neighbors[i].mine) this.minesNear ++;
  }
}

Cell.prototype.splash = function(grid){
  this.hidden = false;
  for(var i = 0;i<this.neighbors.length;i++){
    var cell = this.neighbors[i];
    if(cell.mine == false && cell.minesNear == 0 && cell.hidden) cell.splash(grid);
    else if(cell.mine == false) cell.hidden = false;
  }
}
