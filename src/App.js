
import './App.css';
import NavBar from './components/NavBar';
import Contenedor from './components/ItemListConteiner';

function App() {
  return (
    <>
      <NavBar />
      <Contenedor saludo="¡Hola! Aquí estará el catálogo" />
    </>
  );
}

export default App;

