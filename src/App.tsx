import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { LostItems } from './pages/LostItems';
import { FoundItems } from './pages/FoundItems';
import { Map } from './pages/Map';
import { PostItem } from './pages/PostItem';
import { Profile } from './pages/Profile';
import { ItemDetail } from './pages/ItemDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/lost" element={<LostItems />} />
          <Route path="/found" element={<FoundItems />} />
          <Route path="/map" element={<Map />} />
                           <Route path="/post" element={<PostItem />} />
                 <Route path="/profile" element={<Profile />} />
                 <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;