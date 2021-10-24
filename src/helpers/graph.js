const generateMatrix = (obstacle = 1.5) => {
   let matrix = [];
   for (let i = 0; i < 50; i++) {
      matrix[i] = [];
      for (let j = 0; j < 50; j++) {
         matrix[i][j] = Math.floor(Math.random() * obstacle);
      }
   }
   return matrix
};

const generateGraph = (matrix) => {
   let edges = generateEdgeList(matrix)
   let adjList = generateAdjList(edges)
   return adjList
}

const generateEdgeList = (matrix) => {
   let edgeList = [];
   for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
         if (matrix[i][j] === 0) {
            // Esquerda
            if (j > 0 && matrix[i][j - 1] === 0 && edgeList.indexOf(`(${i}-${j - 1}),(${i}-${j})`) === -1)
               edgeList.push(`(${i}-${j}),(${i}-${j - 1})`);

            // Direita
            if (j < matrix[i].length &&matrix[i][j + 1] === 0 &&edgeList.indexOf(`(${i}-${j + 1}),(${i}-${j})`) === -1) 
               edgeList.push(`(${i}-${j}),(${i}-${j + 1})`);

            // Cima
            if (i > 0 && matrix[i - 1][j] === 0 && edgeList.indexOf(`(${i - 1}-${j}),(${i}-${j})`) === -1)
               edgeList.push(`(${i}-${j}),(${i - 1}-${j})`);

            // Baixo
            if (i < matrix[i].length - 1 && matrix[i + 1][j] === 0 && edgeList.indexOf(`(${i + 1}-${j}),(${i}-${j})`) === -1)
               edgeList.push(`(${i}-${j}),(${i + 1}-${j})`);
         }
      }
   }
   return edgeList.sort((a, b) => a - b);
};

const generateAdjList = (edgeList) => {
   let adjList = {}

   for (let i = 0; i < edgeList.length; i++) {
      let edges = edgeList[i].split(",")
      if (!adjList[edges[0]]) adjList[edges[0]] = []
      if (!adjList[edges[1]]) adjList[edges[1]] = []

      adjList[edges[0]].push(edges[1])
      adjList[edges[1]].push(edges[0])
   }
   return adjList
}

module.exports = {
   generateMatrix,
   generateGraph
};
