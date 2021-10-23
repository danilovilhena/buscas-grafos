import { generateMatrix, generateGraph } from "./helpers/graph"
import { delay, dfs, bfs, ucs } from "./helpers/searches"
import Grid from './components/Grid';
import Radios from './components/Radios';
import './App.css';
import { useState } from "react";

const App = () => {
  const [matrix, setMatrix] = useState(generateMatrix())
  const [result, setResult] = useState(false)
  let adjList = generateGraph(matrix)

  const generateMap = () => {setMatrix(generateMatrix())}

  const clear = () => {
    document.querySelectorAll(".grid-item").forEach(el => {
      el.classList.remove("origem")
      el.classList.remove("destino")
      el.classList.remove("caminho")
      el.classList.remove("visitado")
      el.classList.remove("expandido")
      document.querySelector(`#origem-text`).innerText = ''
      document.querySelector(`#destino-text`).innerText = ''
      setResult(false)
    })
    adjList = generateGraph(matrix)
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

  const executeUcs = () => {
    let [origem, destino] = getPoints()
    
    if(origem && destino) {
      ucs(adjList, origem.id, destino.id).then(val => { 
        setResult(val)
        getUcsPath(val[2], origem.id, destino.id) 
      })
    }
  }

  const getUcsPath = async (adjList, start, end) => {
    let current = end
    let path = []

    while(current != start){
      path.push(current)
      current = adjList[current].pai
    }

    for (let i = path.length - 1; i >= 0; i--) {
      document.getElementById(path[i]).classList.add('caminho')
      await delay(50)
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
          <button className="btn" onClick={() => {executeUcs()}}>UCS</button>
        </div>

        {result && <>
        <b>Resultado:</b>
        <span>Número de nós testados: <b>{result[1]}</b></span>
        <span>Tempo de execução: <b>{(result[0]/1000).toFixed(2)} seg</b></span>
        </>}
      </div>
    </div>
  </>);
}

export default App;
