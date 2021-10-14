const {Stack} = require('./structures');

const delay = ms => new Promise(res => setTimeout(res, ms));

const dfs = async (adjList, start, end) => {
    let visited = {}
    let stack = new Stack()
 
    for(let node in adjList) { visited[node] = false }
    stack.push(start);

    while (!stack.isEmpty()) {
        let node = stack.pop()
        if (visited[node] === false) {
            visited[node] = true;
            document.getElementById(node).style.backgroundColor = 'lightblue'
            await delay(10);
            
            for (let j = 0; j < adjList[node].length; j++) {
                stack.push(adjList[node][j])
                if(adjList[node][j] === end) return;
            }
        }
    }
}

module.exports = {
    dfs
};
