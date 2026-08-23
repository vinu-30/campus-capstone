// Root application component; AppRoutes contains the complete organized route map.
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
function App() { return <BrowserRouter><AppRoutes /></BrowserRouter>; }
export default App;
