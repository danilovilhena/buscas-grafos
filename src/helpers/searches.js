const { Stack, Queue } = require('./structures');

const delay = () => new Promise(res => setTimeout(res, 10));
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
    const obj = {}
    for (let prop in adjList){ obj[prop] = {pai: null, peso: 1, vizinhos: adjList[prop]} }

    obj[start].pai = -1
    let queue = []
    queue.push(start)

    while(queue.length !== 0){
        // debugger;
        let node = queue.shift();
        for (let j = 0; j < obj[node].vizinhos.length; j++) {
            let vizinho = obj[node].vizinhos[j]
            if(vizinho === end) return [obj, getUCSPath(obj, end)];

            if(!queue.includes(vizinho)){
                obj[vizinho].pai = node
                obj[vizinho].peso += 1
                document.getElementById(vizinho).classList.add('caminho')
                await delay();
    
                queue.push(vizinho)
                queue.sort((a,b) => obj[a].peso - obj[b].peso)
            }
        }
    }
}

module.exports = {
    dfs,
    bfs,
    ucs
};

/*
def bcu(self,s,t):
    q = []
    
    node = Node(s)
    node.pai = Node(-1)
    
    q.append(node)
    q.sort(key=lambda x: (x.peso, x.id), reverse=True)
    
    while(not len(q) == 0):
        aux = q.pop(0)
        
        # Teste de Objetivo           
        if(aux.id == t):
            return aux
        # Teste de Objetivo
        
        # Expansão de vizinhos            
        for i in range(self.n):
            if(self.matriz[aux.id][i] > 0 and i != aux.pai.id):
                node = Node(i)
                node.pai = aux
                node.peso += self.matriz[node.pai.id][i]
                q.append(node)
                q.sort(key=lambda x: (x.peso, x.id), reverse=True)
        # Expansão de vizinhos
    
    return aux

def bp(self,s,t):
q = []

node = Node(s)
node.pai = Node(-1)       

q.append(node)

while(not len(q) == 0):
    aux = q.pop()
    
    # Teste de Objetivo           
    if(aux.id == t):
        return aux
    # Teste de Objetivo
    
    # Expansão de vizinhos            
    for i in range(self.n):                
        if(self.matriz[aux.id][i] == 1 and i != aux.pai.id):
            node = Node(i)
            node.pai = aux
            q.append(node)
    # Expansão de vizinhos

return aux

while(objetivo.id != -1):
    print(objetivo.id)
    objetivo = objetivo.pai 
*/