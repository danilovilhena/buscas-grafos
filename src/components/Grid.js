import "./Grid.css"
import {generateMatrix, generateGraph} from "../helpers/graph"
import {dfs} from "../helpers/searches"

const Grid = (props) => {
    let matrix = generateMatrix()
    let [nodes, adjList] = generateGraph(matrix)
    console.log(nodes, adjList);
    
    return (
    <>
    <div className="grid-container">
        {matrix.map((row, i) => {
            return row.map((e, j) => {
                return <button id={`(${i}-${j})`} key={j} className={e !== 0 ? "grid-item active" : "grid-item"}></button>
            })
        })}
    </div>
    <button onClick={() => {dfs(adjList, '(0-2)', '(10-10)')}}>DFS</button>
    </>)
}

export default Grid