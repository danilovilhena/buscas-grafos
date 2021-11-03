import { Stack, Queue } from './structures.js';

const delay = (ms = 10) => new Promise(res => setTimeout(res, ms));
const noOfVisited = (visited) => Object.values(visited).filter(el => el === true).length
// |x1 - x2| + |y1 - y2|
const manhattan = (point, end) => {
    let splitPoint = point.split('-')
    let splitEnd = end.split('-')

    return Math.abs(splitEnd[0].split('(')[1] - splitPoint[0].split('(')[1]) + Math.abs(splitEnd[1].split(')')[0] - splitPoint[1].split(')')[0])
}

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

const greedy = async (adjList, start, end) => {
    let startTime = performance.now()
    for(let prop in adjList) {
        let vizinhos = [...adjList[prop]]
        adjList[prop] = {pai: null, peso: Infinity, pesoTotal: Infinity, vizinhos}
    }
    
    adjList[start].peso = 0
    let queue = []
    queue.push(start)

    while (queue.length !== 0) {
        queue.sort((a,b) => adjList[a].pesoTotal - adjList[b].pesoTotal)

        let node = queue.shift()
        if(node === end) return [performance.now() - startTime, document.querySelectorAll('.visitado').length, adjList]

        document.getElementById(node).classList.add('visitado')
        await delay();

        for (let j = 0; j < adjList[node].vizinhos.length; j++) {
            let vizinho = adjList[node].vizinhos[j]
            let peso = adjList[node].peso + 1

            if(!queue.includes(vizinho) && vizinho !== adjList[node].pai && peso < adjList[vizinho].peso){
                adjList[vizinho].peso = peso
                adjList[vizinho].pesoTotal = manhattan(vizinho, end)
                adjList[vizinho].pai = node

                queue.unshift(vizinho)
                document.getElementById(vizinho).classList.add('expandido')
            }
        }
    }
}

const aStar = async (adjList, start, end) => {
    let startTime = performance.now()
    for(let prop in adjList) {
        let vizinhos = [...adjList[prop]]
        adjList[prop] = {pai: null, peso: Infinity, pesoTotal: Infinity, vizinhos}
    }
    
    adjList[start].peso = 0
    let queue = []
    queue.push(start)

    while (queue.length !== 0) {
        queue.sort((a,b) => adjList[a].pesoTotal - adjList[b].pesoTotal)

        let node = queue.shift()
        if(node === end) return [performance.now() - startTime, document.querySelectorAll('.visitado').length, adjList]

        document.getElementById(node).classList.add('visitado')
        await delay();

        for (let j = 0; j < adjList[node].vizinhos.length; j++) {
            let vizinho = adjList[node].vizinhos[j]
            let peso = adjList[node].peso + 1

            if(!queue.includes(vizinho) && vizinho !== adjList[node].pai && peso < adjList[vizinho].peso){
                adjList[vizinho].peso = peso
                adjList[vizinho].pesoTotal = peso + manhattan(vizinho, end)
                adjList[vizinho].pai = node

                queue.unshift(vizinho)
                document.getElementById(vizinho).classList.add('expandido')
            }
        }
    }
}

export {
    delay,
    dfs,
    bfs,
    ucs,
    greedy,
    aStar
};
