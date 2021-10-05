import "./Grid.css"

const Grid = (props) => {
    let numberOfItems = props.items || 100

    const isOdd = (num) => num % 2

    return (
    <div className="grid-container">
        {[...Array(numberOfItems)].map((e, i) => 
            <div key={i} className={isOdd(i) ? "grid-item active": "grid-item"}>{i}</div>
        )}
    </div>
    )
}

export default Grid