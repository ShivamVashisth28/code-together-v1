import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Protected from './components/auth/Protected';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import {  useRecoilValue } from 'recoil';
import { userState } from './store/atoms/user';
import Chat from './pages/Chat';

function App() {

  const isUserLoggedIn = useRecoilValue(userState);
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Protected children={<Landing />} isLoggedIn={!isUserLoggedIn}  redirect='/home'/> } />
                <Route path='/login' element={ <Protected children={<Login />} isLoggedIn={!isUserLoggedIn}  redirect='/home'/> } />
                <Route path='/signup' element={ <Protected children={<Signup />} isLoggedIn={!isUserLoggedIn}  redirect='/home'/> } />
                <Route path='/home' element={ <Protected children={<Home />} isLoggedIn={isUserLoggedIn}  redirect='/login'/> } />
                <Route path='/chat/:id' element={ <Protected children={<Chat />} isLoggedIn={isUserLoggedIn}  redirect='/login'/> } />
                <Route path='/*' element={ <NotFound/> } />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
