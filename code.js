function tsp_hk(distance_matrix) {
    tsp_mems = [];
    let nodesLeft = [];
    if(distance_matrix.length <= 1) {
        return 0;
    } else {
        for(let a = 0; a < distance_matrix.length; a++)
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
                let tempStart = nodesLeft.splice(i,1)
                temp = tsp_HeldKarp(distance_matrix, tempStart, nodesLeft.flat(Infinity))
                if(temp < min) {
                    min = temp;                                                                                                                                                                                           
                    minI = tempStart;
                }
                nodesLeft.splice(i,0,tempStart);
            }
            tsp_mems[JSON.stringify(nodesLeft) + start] = min + distance_matrix[start][minI];
            return tsp_mems[JSON.stringify(nodesLeft) + start];
        }
        
    } else {
            return tsp_mems[JSON.stringify(nodesLeft) + start];
        }
}

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
