import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/rooms/new' Component={NewRoom} />
          <Route path='/rooms/:id' Component={Room} />
          <Route path='/admin/rooms/:id' Component={AdminRoom} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;