import "./Grid.css"
import {generateMatrix, generateGraph} from "../helpers/graph"

const Grid = (props) => {
    let matrix = generateMatrix()
    let [nodes, edges] = generateGraph(matrix)
    console.log(matrix, nodes, edges);
    
    return (
    <div className="grid-container">
        {matrix.map((row, i) => {
            return row.map((e, j) => {
                return <button id={`(${i}-${j})`} key={j} className={e !== 0 ? "grid-item active" : "grid-item"}></button>
            })
        })}
    </div>
    )
}

export default Grid