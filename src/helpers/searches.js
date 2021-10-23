const { Stack, Queue } = require('./structures');

const delay = (ms = 10) => new Promise(res => setTimeout(res, ms));
const noOfVisited = (visited) => Object.values(visited).filter(el => el === true).length

const dfs = async (adjList, start, end) => {
    let startTime = performance.now()
    let visited = {}
    let stack = new Stack()
 
    for(let node in adjList) { visited[node] = false }
    stack.push(start);

    while (!stack.isEmpty()) {
        let node = stack.pop()
        if (visited[node] === false) {
            visited[node] = true;
            if(node === end) return [performance.now() - startTime, noOfVisited(visited)];
            document.getElementById(node).classList.add('visitado')
            await delay();
            
            for (let j = 0; j < adjList[node].length; j++) {
                document.getElementById(adjList[node][j]).classList.add('expandido')
                stack.push(adjList[node][j])
            }
        }
    }
}

const bfs = async (adjList, start, end) => {
    let startTime = performance.now()
    let visited = {}
    let queue = new Queue()

    for(let node in adjList) { visited[node] = false }
    queue.enqueue(start)

    while(!queue.isEmpty()){
        let node = queue.dequeue();
        if(visited[node] === false) {
            visited[node] = true;
            if(node === end) return [performance.now() - startTime, noOfVisited(visited)];
            document.getElementById(node).classList.add('visitado')
            await delay();

            for (let j = 0; j < adjList[node].length; j++) {
                document.getElementById(adjList[node][j]).classList.add('expandido')
                queue.enqueue(adjList[node][j])
            }
        }
    }
}

const ucs = async (adjList, start, end) => {
    let startTime = performance.now()
    for(let prop in adjList) {
        let vizinhos = [...adjList[prop]]
        adjList[prop] = {pai: null, peso: Infinity, vizinhos}
    }

    adjList[start].pai = -1
    adjList[start].peso = 0
    let queue = []
    queue.push(start)

    while(queue.length !== 0) {
        queue.sort((a,b) => adjList[a].peso - adjList[b].peso)

        let node = queue.shift()
        if(node === end) return [performance.now() - startTime, document.querySelectorAll('.visitado').length, adjList]
        document.getElementById(node).classList.add('visitado')
        await delay();

        for (let j = 0; j < adjList[node].vizinhos.length; j++) {
            let vizinho = adjList[node].vizinhos[j]

            if(!queue.includes(vizinho) && vizinho !== adjList[node].pai && adjList[vizinho].peso > adjList[node].peso){
                adjList[vizinho].pai = node
                adjList[vizinho].peso = adjList[node].peso + 1
                
                queue.push(vizinho)
                document.getElementById(vizinho).classList.add('expandido')
            }
        }
    }
}

module.exports = {
    delay,
    dfs,
    bfs,
    ucs
};
