import { generateMatrix, generateGraph } from "./helpers/graph"
import { dfs } from "./helpers/searches"
import Grid from './components/Grid';
import Radios from './components/Radios';
import './App.css';

const App = () => {
  let matrix = generateMatrix()
  let [nodes, adjList] = generateGraph(matrix)

  const executeDfs = () => {
    let origem = document.querySelector(".grid-item.origem")
    let destino = document.querySelector(".grid-item.destino")
    if(origem && destino) dfs(adjList, origem.id, destino.id)
  }

  return (<>
    <Grid matrix={matrix}/>
    <Radios />
    <button className="btn" onClick={() => {executeDfs()}}>DFS</button>
  </>);
}

export default App;
