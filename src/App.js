import { generateMatrix, generateGraph } from "./helpers/graph"
import { dfs } from "./helpers/searches"
import Grid from './components/Grid';
import Radios from './components/Radios';
import './App.css';

const App = () => {
  let matrix = generateMatrix()
  let [nodes, adjList] = generateGraph(matrix)

  const clear = () => {
    document.querySelectorAll(".grid-item").forEach(el => {
      el.classList.remove("origem")
      el.classList.remove("destino")
      el.classList.remove("caminho")
      document.querySelector(`#origem-text`).innerText = ''
      document.querySelector(`#destino-text`).innerText = ''
    })
  }

  const executeDfs = () => {
    let origem = document.querySelector(".grid-item.origem")
    let destino = document.querySelector(".grid-item.destino")
    if(origem && destino) dfs(adjList, origem.id, destino.id)
  }

  return (<>
    <Grid matrix={matrix}/>
    <Radios />
    <div>
      <button className="btn" onClick={() => {clear()}}>Limpar</button>
      <button className="btn" onClick={() => {executeDfs()}}>DFS</button>
    </div>
  </>);
}

export default App;
