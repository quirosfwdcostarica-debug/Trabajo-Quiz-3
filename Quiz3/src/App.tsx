import { AppRouter } from './Routes/AppRouter';
import { Sakura } from './Components/Sakura';
import './Styles/App.css'; // Asegúrate de tener estilos básicos oscuros/japoneses aquí

function App() {
  return (
    <>
      <Sakura />
      <AppRouter />
    </>
  );
}

export default App;