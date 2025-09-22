import { useEffect } from 'react';
import './App.css';
import useTelegram from './hooks/useTelegram';
import Header from './Header/Header';
import { Route, Routes } from 'react-router-dom';
import ProductList from './ProductList/ProductList';
import Form from './Form/Form';

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <>
      <h1 style={{ marginBottom: '20px' }}>Bot-Frontend</h1>
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
