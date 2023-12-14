function tsp_hk(distance_matrix) {
    tsp_mems = [];
    let nodesLeft = [];
    if(distance_matrix.length <= 1) {
        return 0;
    } else {
        for(let a = 0; a < distance_matrix.length; a++) //Initializes the nodesLeft array, it is in order from the beginning
            nodesLeft[a] = a;
        let min = Infinity;
        let temp = 0;
        for(let i = 0; i < distance_matrix.length; i++){
            temp = tsp_HeldKarp(distance_matrix, i, nodesLeft)
            if(temp < min)
                min = temp
    }
    return min
    }
}

function tsp_HeldKarp(distance_matrix, start, nodesLeft) {
    if(tsp_mems[JSON.stringify(nodesLeft) + start] === undefined) {
        if(nodesLeft.length < 1) {
            return 0;
        } else if(nodesLeft.length == 1) {
            tsp_mems[JSON.stringify(nodesLeft) + start] = distance_matrix[start][nodesLeft[0]];
            return tsp_mems[JSON.stringify(nodesLeft) + start];
        } else {
            let min = Infinity;
            let minI = -1;

            for(let i = 0; i < nodesLeft.length; i++) {
                let tempStart = nodesLeft.splice(i,1)                                        //The splice function here removes one item
                temp = distance_matrix[start][tempStart] + tsp_HeldKarp(distance_matrix, tempStart, nodesLeft.flat(Infinity))    //from the array at the index and returns
                if(temp < min) {                                                             //that item to the tempStart variable
                    min = temp;                                                                                                                                                                                           
                    minI = tempStart;
                }
                nodesLeft.splice(i,0,tempStart);                                            //Here, splice is used to reinsert the 
            }                                                                               //tempStart variable back into the array at
            tsp_mems[JSON.stringify(nodesLeft) + start] = min;//the same point it was removed. For all
            return tsp_mems[JSON.stringify(nodesLeft) + start];                             //recursive calls, the function will receive
        }                                                                                   //a correctly sorted array and anything taken
                                                                                            //out will be added back in at the same 
    } else {                                                                                //point. At no point should the array become
            return tsp_mems[JSON.stringify(nodesLeft) + start];                             //unsorted. So we do not need to worry about
        }                                                                                   //the memoization not being used for different
}                                                                                           //orders of nodesLeft cause there won't be any.

/*function matrixShrink(matrix, rowCol) { // Removes a full list from an adjacency matrix
    let upMatrix = JSON.parse(JSON.stringify(matrix))
    for(let a = rowCol + 1; a < matrix.length; a++) {
        upMatrix[a - 1] = JSON.parse(JSON.stringify(upMatrix[a]))
    }

    upMatrix.length = upMatrix.length - 1;

    for(let i = 0; i < upMatrix.length; i++) {
        for(let b = rowCol + 1; b < upMatrix[i].length; b++) {
            upMatrix[i][b - 1] = upMatrix[i][b];
        }
        upMatrix[i].length = upMatrix[i].length - 1;
    }
    return upMatrix;
}
*/
