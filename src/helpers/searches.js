const { Stack, Queue } = require('./structures');

const delay = () => new Promise(res => setTimeout(res, 10));
const noOfVisited = (visited) => Object.values(visited).filter(el => el == true).length

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
            document.getElementById(node).classList.add('caminho')
            await delay();
            
            for (let j = 0; j < adjList[node].length; j++) {
                if(adjList[node][j] === end) return [performance.now() - startTime, noOfVisited(visited)];
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
    visited[start] = true

    while(!queue.isEmpty()){
        let node = queue.dequeue();
        for (let j = 0; j < adjList[node].length; j++) {
            if(adjList[node][j] === end) return [performance.now() - startTime, noOfVisited(visited)];

            if (visited[adjList[node][j]] === false) {
                visited[adjList[node][j]] = true;
                document.getElementById(adjList[node][j]).classList.add('caminho')
                await delay();

                queue.enqueue(adjList[node][j]);
            }
        }
    }
}

module.exports = {
    dfs,
    bfs
};
