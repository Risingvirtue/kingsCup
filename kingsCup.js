//-1, shots, beer, wine, mixed, liquor
// 0, 1,     2,    3,    4,     5

var grid = [
	[3, 1, 3, 3],
	[3, 5, 0, 3],
	[1, 1, 5, 3],
	[4, 0, 5, 1]
	]
start(grid, 3);

function start(grid, target) {
	var queue = [];
	queue.unshift({grid: grid, sequence: ''});
	var seen = {};
	seen[getKey(grid)] = {grid: grid, sequence: ''};
	var count = 0;
	var date = new Date();
	var maxSum = 0;
	var maxGrid = [];
	var maxSequence = '';
	while (queue.length != 0 && count < 4) {
		var info = queue.shift();
		var sum = getSum(info.grid, target);
		if (sum > maxSum) {
			maxSum = sum;
			maxGrid = info.grid;
			maxSequence = info.sequence;
		}
		var neighbors = getNeighbors(info.grid);
		for (var i = 0; i < neighbors.length; i++) {
			var key = getKey(neighbors[i].grid);
			if (!(key in seen)) {
				var nextInfo = {grid: neighbors[i].grid, 
					sequence: info.sequence + '-' + neighbors[i].flip};
				seen[key] = nextInfo;
				queue.push(nextInfo);
			}
		}
	}
	console.log('time', new Date() - date);
	console.log(maxSum);
	console.log(maxGrid);
	console.log(maxSequence);
}

function getSum(grid, target) {
	var sum = 0;
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			if (grid[i][j] == 0) {
				sum -= 1;
			} else if (grid[i][j] == target) {
				sum++;
			}
		}
	}
	return sum;
}

function getNeighbors(grid) {
	var count = 0;
	var neighbors = [];
	for (var i = 0; i < 8; i++) {
		var newGrid = makeCopy(grid);
		flip(newGrid, i);
		neighbors.push({grid: newGrid, flip: i});
	}
	return neighbors;
}

function getKey(grid) {
	var key = [];
	var num = 0;
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			key.push(grid[i][j]);
			num = num * 7 + grid[i][j];
		}
	}
	//console.log(num);
	return key.join(',');
	
}

function flip(grid, index) {
	if (index < 4) {
		for (var i = 0; i < 4; i++) {
			grid[i][index] = getNext(grid[i][index]);
		}
	} else {
		for (var i = 0; i < 4; i++) {
			grid[index - 4][i] = getNext(grid[index - 4][i]);
		}
	}
}

function makeCopy(grid) {
	var newGrid = [];
	for (var i = 0; i < grid.length; i++) {
		var currRow = [];
		for (var j = 0; j < grid[i].length; j++) {
			currRow.push(grid[i][j]);
		}
		newGrid.push(currRow);
	}
	return newGrid;
}

function getNext(curr) {
	//-1, shots, beer, wine, mixed, liquor
	// 0, 1,     2,    3,    4,     5
	return (curr + 1) % 6;
}
