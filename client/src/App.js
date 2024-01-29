import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home';
import Signup from './routes/Signup';
import Login from './routes/Login';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;