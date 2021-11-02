import "./Grid.css"

const Grid = (props) => { 
    const clickHandler = (event) => {
        if(!event.target.classList.contains('active')){
            let status = document.querySelector("#origem").checked ? 'origem' : 'destino'
            document.querySelectorAll('.grid-item').forEach(el => el.classList.remove(status))
            event.target.classList.toggle(status)
            document.querySelector(`#${status}-text`).innerText = event.target.id
        }
    }

    return (
    <>
    <div className="grid-container">
        {props.matrix.map((row, i) => {
            return row.map((e, j) => {
                let id = `(${i}-${j})`
                return <button title={id} id={id} key={j} className={e !== 0 ? "grid-item active" : "grid-item"} onClick={clickHandler}></button>
            })
        })}
    </div>
    </>)
}

export default Grid