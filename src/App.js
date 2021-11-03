import { generateMatrix, generateGraph } from "./helpers/graph"
import { delay, dfs, bfs, ucs, greedy, aStar } from "./helpers/searches"
import Grid from './components/Grid';
import Radios from './components/Radios';
import './App.css';
import { useState } from "react";

const App = () => {
  const [obstacle, setObstacle] = useState(1.5)
  const [matrix, setMatrix] = useState(generateMatrix(1.5))
  const [result, setResult] = useState(false)
  const [cost, setCost] = useState(false)
  let adjList = generateGraph(matrix)

  const generateMap = () => {clear(); setMatrix(generateMatrix(obstacle))}

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
      setCost(false)
    })
    adjList = generateGraph(matrix)
  }

  const getPoints = () => {
    let origem = document.querySelector(".grid-item.origem")
    let destino = document.querySelector(".grid-item.destino")
    document.querySelectorAll(".grid-item").forEach(el => {
      el.classList.remove("caminho")
      el.classList.remove("visitado")
      el.classList.remove("expandido")
    })
    adjList = generateGraph(matrix)
    setResult(false)
    setCost(false)

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
        getPath(val[2], origem.id, destino.id) 
      })
    }
  }

  const executeGreedy = () => {
    let [origem, destino] = getPoints()
    
    if(origem && destino) {
      greedy(adjList, origem.id, destino.id).then(val => {
        setResult(val)
        getPath(val[2], origem.id, destino.id) 
      })
    }
  }

  const executeAStar = () => {
    let [origem, destino] = getPoints()
    
    if(origem && destino) {
      aStar(adjList, origem.id, destino.id).then(val => {
        setResult(val)
        getPath(val[2], origem.id, destino.id) 
      })
    }
  }

  const getPath = async (adjList, start, end) => {
    let current = end
    let path = []

    while(current !== start){
      path.push(current)
      current = adjList[current].pai
    }

    for (let i = path.length - 1; i >= 0; i--) {
      document.getElementById(path[i]).classList.add('caminho')
      await delay(50)
    }
    await setCost(document.querySelectorAll('.caminho').length)
  } 

  return (<>
    <div className="row">
      <Grid matrix={matrix}/>
      <div className="col">
        <Radios />

        <b>% de obstáculos</b>
        <input type="range" min="1" max="2" step="0.1" defaultValue={obstacle} onChange={e => setObstacle(e.target.value)}/>

        <b>Funções de utilidade</b>
        <div className="row">
          <button className="btn" onClick={() => {clear()}}>Limpar</button>
          <button className="btn" onClick={() => {generateMap()}}>Gerar mapa</button>
        </div>

        <b>Buscas</b>
        <div className="row">
          <button className="btn" onClick={() => {executeDfs()}}>Profundidade</button>
          <button className="btn" onClick={() => {executeBfs()}}>Largura</button>
          <button className="btn" onClick={() => {executeUcs()}}>Custo Uniforme</button>
        </div>
        <div className="row" style={{marginTop: '0.5rem'}}>
          <button className="btn" onClick={() => {executeGreedy()}}>BGME</button>
          <button className="btn" onClick={() => {executeAStar()}}>A*</button>
        </div>

        {result && <>
        <b>Resultado:</b>
        <span>Tempo de execução: <b>{(result[0]/1000).toFixed(2)} seg</b></span>
        <span>Nós testados: <b>{result[1]}</b></span>
        {cost && <span>Custo: <b>{cost}</b></span>}
        </>}
      </div>
    </div>
  </>);
}

export default App;
