import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.scss';
import Hotels from './pages/Hotels';
import Restaurants from './pages/Restaurants';
import IrishWeather from './pages/IrishWeather';
import IrishInfo from './pages/IrishInfo';
import IrelandTravelTips from './pages/IrelandTravelTips';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/destinations" 
                element={
                  <ProtectedRoute>
                    <Destinations />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/hotels" 
                element={
                  <ProtectedRoute>
                    <Hotels />
                  </ProtectedRoute>
                } 
              />
               <Route 
                path="/restaurants" 
                element={
                  <ProtectedRoute>
                    <Restaurants />
                  </ProtectedRoute>
                } 
              />
                <Route 
                path="/irishweather" 
                element={
                  <ProtectedRoute>
                    <IrishWeather />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/irishinfo" 
                element={
                  <ProtectedRoute>
                    <IrishInfo />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/irelandtraveltips" 
                element={
                  <ProtectedRoute>
                    <IrelandTravelTips />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
