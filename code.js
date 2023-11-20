function tsp_hk(distance_matrix) {
    tsp_mems = [];
    if(distance_matrix.length < 1) {
        return 0;
    } else {
    for(let i = 0; i < distance_matrix.length; i++){
        temp = tsp_HeldKarp(distance_matrix, i)
    }
    return temp
    }
}

function tsp_HeldKarp(distance_matrix, start) {
    if(tsp_mems[JSON.stringify(distance_matrix) + start] === undefined) {
        if(distance_matrix.length <= 1) {
            return 0;
        } else if(distance_matrix.length == 2) {
            return distance_matrix[0][1];
        } else {
            let min = Infinity;
            let minI = -1;
            matrix = matrixShrink(distance_matrix, start)
            for(let i = 0; i < matrix.length; i++) {
                temp = tsp_HeldKarp(matrix, i)
                if(temp < min) {
                    min = temp;
                    minI = i + 1;
                }
            }
            tsp_mems[JSON.stringify(distance_matrix) + start] = min + distance_matrix[start][minI];
            return tsp_mems[JSON.stringify(distance_matrix) + start];
        }
    } else {
            return tsp_mems[JSON.stringify(distance_matrix) + start];
        }
}

function matrixShrink(matrix, rowCol) { // Removes a full list from an adjacency matrix
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
