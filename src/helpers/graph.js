const generateMatrix = () => {
   let matrix = [];
   for (let i = 0; i < 50; i++) {
      matrix[i] = [];
      for (let j = 0; j < 50; j++) {
         matrix[i][j] = Math.floor(Math.random() * 1.5);
      }
   }
   return matrix
};

const generateGraph = (matrix) => {
   let nodes = generateNodeList(matrix)
   let edges = generateEdgeList(matrix)
   return [nodes, edges]
}

const generateNodeList = (matrix) => {
   let nodeList = [];
   for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
         if (matrix[i][j] === 0) nodeList.push(`(${i}-${j})`);
      }
   }
   return nodeList;
};

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

module.exports = {
   generateMatrix,
   generateGraph
};
