import { generateMatrix, generateGraph } from "./helpers/graph"
import { dfs, bfs } from "./helpers/searches"
import Grid from './components/Grid';
import Radios from './components/Radios';
import './App.css';
import { useState } from "react";

const App = () => {
  const [matrix, setMatrix] = useState(generateMatrix())
  const [result, setResult] = useState(false)
  const [nodes, adjList] = generateGraph(matrix)

  const generateMap = () => {setMatrix(generateMatrix())}

  const clear = () => {
    document.querySelectorAll(".grid-item").forEach(el => {
      el.classList.remove("origem")
      el.classList.remove("destino")
      el.classList.remove("caminho")
      document.querySelector(`#origem-text`).innerText = ''
      document.querySelector(`#destino-text`).innerText = ''
      setResult(false)
    })
  }

  const getPoints = () => {
    let origem = document.querySelector(".grid-item.origem")
    let destino = document.querySelector(".grid-item.destino")
    document.querySelectorAll(".grid-item").forEach(el => {el.classList.remove("caminho")})

    return [origem, destino]
  }

  const executeDfs = () => {
    let [origem, destino] = getPoints()
    
    if(origem && destino) {
      dfs(adjList, origem.id, destino.id).then(val => {setResult(val)})
    } 
  }

  const executeBfs = () => {
    let [origem, destino] = getPoints()
    
    if(origem && destino) {
      bfs(adjList, origem.id, destino.id).then(val => {setResult(val)})
    }
  }

  return (<>
    <div className="row">
      <Grid matrix={matrix}/>
      <div className="col">
        <Radios />

        <b>Funções de utilidade</b>
        <div className="row">
          <button className="btn" onClick={() => {clear()}}>Limpar</button>
          <button className="btn" onClick={() => {generateMap()}}>Gerar mapa</button>
        </div>

        <b>Buscas</b>
        <div className="row">
          <button className="btn" onClick={() => {executeDfs()}}>DFS</button>
          <button className="btn" onClick={() => {executeBfs()}}>BFS</button>
        </div>

        {result && <>
        <b>Resultado:</b>
        <span>Número de nós visitados: <b>{result[1]}</b></span>
        <span>Tempo de execução: <b>{result[0].toFixed(2)} ms</b></span>
        </>}
      </div>
    </div>
    
    {/* Levou: 1.2s */}
    {/* Nós visitados: 90 */}
  </>);
}

export default App;
