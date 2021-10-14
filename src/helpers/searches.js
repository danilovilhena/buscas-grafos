const {Stack, Queue} = require('./structures');

const dfs = (adjList, start, end) => {
    let visited = {}
    let stack = new Stack()
 
    for(let node in adjList) { visited[node] = false }
    stack.push(start);

    while (!stack.isEmpty()) {
        let node = stack.pop()
        if (visited[node] === false) {
            visited[node] = true;
            console.log(`we visited ${node}`)
            for (let j = 0; j < adjList[node].length; j++) {
                stack.push(adjList[node][j])

                document.getElementById(adjList[node][j]).style.backgroundColor = 'red';
                if(adjList[node][j] == end) {
                    document.getElementById(adjList[node][j]).style.backgroundColor = 'green';
                    return
                }
            }
        }
    }
}

module.exports = {
    dfs
};
