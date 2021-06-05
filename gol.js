const rows = 40;
const cols = 40;
let round=0;
let score=document.getElementById("score");
let gen=document.getElementById("gen");

var sll=[ "14_13", "14_14", "15_12", "15_15", "16_13", "16_14" ];
var bker=[ "13_15", "13_16", "13_17", "25_15", "25_16", "25_17" ];
var td= [ "14_14", "14_15", "14_16", "15_13", "15_14", "15_15" ];
var gder = [ "13_17", "14_18", "15_15", "15_16", "15_17", "15_18" ];

let started=false;// Set to true when use clicks start
let timer;//To control evolutions
let evolutionSpeed=100;// One second between generations
let rotation=0;

// Need 2D arrays. These are 1D
let currGen =[rows];
let nextGen =[rows];

// Creates two-dimensional arrays
function createGenArrays() {
    for (let i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
      
    }
}
function initGenArrays() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

function createWorld() {
    let world = document.querySelector('#world');
    
    let tbl = document.createElement('table');
    tbl.setAttribute('id','worldgrid');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '_' + j);
            cell.setAttribute('class', 'dead');
            cell.addEventListener('click',cellClick);            
            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}

function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);

    // Toggle cell alive or dead
    if (this.className==='alive'){
        this.setAttribute("class", "dead");
        currGen[row][col] = 0;
    }else{
        this.setAttribute("class", "alive");
        currGen[row][col] = 1;
    }

}

function createNextGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
           
            let neighbors = getNeighborCount(row, col);
         
            // Check the rules
            // If Alive
            if (currGen[row][col] == 1) {
              
                if (neighbors < 2) {
                    nextGen[row][col] = 0;
                } else if (neighbors == 2 || neighbors == 3) {
                    nextGen[row][col] = 1;
                } else if (neighbors > 3) {
                    nextGen[row][col] = 0;
                }
            } else if (currGen[row][col] == 0) {
                // If Dead or Empty
            
                if (neighbors == 3) {
                    // Propogate the species
                    nextGen[row][col] = 1;
                }
            }
        }
    }
    
}

function getNeighborCount(row, col) {
    let count = 0;
    let nrow=Number(row);
    let ncol=Number(col);
    
        // Make sure we are not at the first row
        if (nrow - 1 >= 0) {
        // Check top neighbor
        if (currGen[nrow - 1][ncol] == 1) 
            count++;
    }
        // Make sure we are not in the first cell
        // Upper left corner
        if (nrow - 1 >= 0 && ncol - 1 >= 0) {
        //Check upper left neighbor
        if (currGen[nrow - 1][ncol - 1] == 1) 
            count++;
    }

        // Make sure we are not on the first row last column
        // Upper right corner
        if (nrow - 1 >= 0 && ncol + 1 < cols) {
        //Check upper right neighbor
            if (currGen[nrow - 1][ncol + 1] == 1) 
                count++;
        }

        // Make sure we are not on the first column
    if (ncol - 1 >= 0) {
        //Check left neighbor
        if (currGen[nrow][ncol - 1] == 1) 
            count++;
    }
    // Make sure we are not on the last column
    if (ncol + 1 < cols) {
        //Check right neighbor
        if (currGen[nrow][ncol + 1] == 1) 
            count++;
    }

        // Make sure we are not on the bottom left corner
    if (nrow + 1 < rows && ncol - 1 >= 0) {
        //Check bottom left neighbor
        if (currGen[nrow + 1][ncol - 1] == 1) 
            count++;
    }

    // Make sure we are not on the bottom right
    if (nrow + 1 < rows && ncol + 1 < cols) {
        //Check bottom right neighbor
        if (currGen[nrow + 1][ncol + 1] == 1) 
            count++;
    }
    
    
        // Make sure we are not on the last row
    if (nrow + 1 < rows) {
        //Check bottom neighbor
        if (currGen[nrow + 1][ncol] == 1) 
            count++;
    }
    
    
    return count;
}
    
    function updateCurrGen() {
       
        for (row in currGen) {
            for (col in currGen[row]) {
                // Update the current generation with
                // the results of createNextGen function
                currGen[row][col] = nextGen[row][col];
                // Set nextGen back to empty
                nextGen[row][col] = 0;
            }
        }
     
    }

    function updateWorld() {
        let cell='';
        for (row in currGen) {
            for (col in currGen[row]) {
                cell = document.getElementById(row + '_' + col);
                if (currGen[row][col] == 0) {
                    cell.setAttribute("class", "dead");
                } else {
                    cell.setAttribute("class", "alive");
                }
            }
        }
    }

    function evolve(){
      
        createNextGen();
        updateCurrGen();
        updateWorld();

        if (started) {
            timer = setTimeout(evolve, evolutionSpeed);
			round++;
			score.innerHTML=population();
			gen.innerHTML=round;
		    if(round===23){
             stop();
		}
		
        }
        
    }
	
	

  function startStopGol(){
        let startstop=document.querySelector('#btnstartstop');
       
        if (!started) {
           started = true;
           
           
		   evolve();
         
         }
					 
 
    }
	
 function stop(){
	 if (started){
            started = false;
           clearTimeout(timer); 
        }
 }
	 
 
  
    function resetWorld() {
        location.reload();
  
    }
	

	
	function population(){
	let counter=0;
	let tablelements=document.getElementsByTagName("td");
	for(let cter=0; cter<tablelements.length; cter++){
      if(tablelements[cter].className=="alive"){
       counter++;}}
	   return counter;
	}


window.onload=()=>{
    createWorld();// The visual table
    createGenArrays();// current and next generations
    initGenArrays();//Set all array locations to 0=dead

}

function getPattern(){
let yan=document.getElementsByTagName("td");
let finl=[];
let ret=0;
for(ret=0; ret<yan.length; ret++){
if(yan[ret].className=="alive"){
finl.push(yan[ret].id);
}
}
return finl;
}




function togg(value){
	let celly=document.getElementById(value);
	let loc = value.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);
	
	celly.setAttribute("class", "alive");
	celly.style.color="blue";
	currGen[row][col] = 1;
	
	
}


function toad(){
	td.forEach(togg);
	
}

function blinker(){
	bker.forEach(togg);
}

function still(){
	sll.forEach(togg);
}

function glider(){
	gder.forEach(togg);
	
}
	