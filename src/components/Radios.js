import "./Radios.css"

const Radios = (props) => {
    return (
    <section>
        <p></p>
        <div className="radio">
            <input type="radio" id="origem" name="ponto" value="origem" defaultChecked/>
            <label htmlFor="origem">Origem</label>
            <p style={{color: "green"}} id="origem-text"></p>
        </div>
        <div className="radio">
            <input type="radio" id="destino" name="ponto" value="destino" />
            <label htmlFor="destino">Destino</label>
            <p style={{color: "red"}} id="destino-text"></p>
        </div>
    </section>)
}

export default Radios