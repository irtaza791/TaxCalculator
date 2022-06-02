import Calculator from '../src/pages/calculation'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Country from './pages/countriesPage';

function App() {
  return (
    <Router>
      <div>
        <h1 >Tax Calculator</h1>
      </div>
      <Routes>
          <Route path='/portugal' element={<Calculator />} />
          <Route path='/' element={<Country />} />
          <Route />
      </Routes>
    </Router>
    
  );
}

export default App;
