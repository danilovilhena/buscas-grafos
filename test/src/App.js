import './App.css';
import { Vertex } from "../../package/main"

function App() {
  let vertex = new Vertex('Danilo').label
  
  return (<>
    <h1>Buscas em grafos</h1>
    <p>Vértice {vertex}</p>
  </>);
}

export default App;
