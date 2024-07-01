
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouteList from './RouteList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouteList></RouteList>
      </BrowserRouter>
    </div>
  );
}

export default App;
