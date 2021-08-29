function getEmptyPlaces(matrix) {
    let empties = []
    for (let i = 0; i < matrix.length; i++)
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0)
                empties.push([i, j])
        }
    return empties
}

function findPossibleValues(matrix, i, j) {
    let possibles = [false, true, true, true, true, true, true, true, true, true]

    for (let n = 0; n < matrix.length; n++) {
        possibles[matrix[i][n]] = false;
        possibles[matrix[n][j]] = false;
    }

    for (let row = Math.floor(i / 3) * 3; row < Math.floor(i / 3) * 3 + 3; row++) {
        for (let col = Math.floor(j / 3) * 3; col < Math.floor(j / 3) * 3 + 3; col++) {
            possibles[matrix[row][col]] = false;
        }
    }
    let values = [];
    for (let i in possibles) {
        if (possibles[i])
            values.push(Number(i))
    }

    return [[i, j], values];
}

module.exports = function solveSudoku(matrix) {
    let empties = getEmptyPlaces(matrix);
    if (empties.length === 0)
        return matrix
    else {
        let [[i, j], variants] = findShortVariant(matrix, empties)
        for (let v of variants) {
            matrix[i][j] = v
            let check = solveSudoku(matrix)
            if (check)
                return solveSudoku(matrix)
        }
        matrix[i][j] = 0
        return false
    }
}

function findShortVariant(matrix, empties){
    let allVariants = []
    for (let place of empties) {
        allVariants.push(findPossibleValues(matrix, place[0], place[1]))
    }
    allVariants.sort((a, b)=>a[1].length-b[1].length)
    return allVariants[0];
}
