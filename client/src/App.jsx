import Home from './components/Home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import styled from 'styled-components';
const App = () => {
  const user = true;
  return (
    <AppStyled>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AppStyled>
  );
};
const AppStyled = styled.div`
  height: 100vh;
  background: linear-gradient(to right, #3dabf2, #314755);
  position: relative;
`;
export default App;
