import Grid from './components/Grid';
import { Vertex } from "../../package/main"
import './App.css';

const App = () => {
  let vertex = new Vertex('Danilo').label
  
  return (<>
    <h1>Buscas em grafos</h1>
    <p>Vértice {vertex}</p>
    <Grid />
  </>);
}

export default App;
