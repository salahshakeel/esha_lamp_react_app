import './App.css';
import { Banner } from './components/Banner';
import { Navbar } from './components/Navbar';
import ClassCreate from './pages/classes/ClassCreate';
import ClassesIndex from './pages/classes/ClassesIndex';
import Home from './pages/Home';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import StudentsIndex from './pages/students/StudentsIndex';
import StudentCreate from './pages/students/StudentCreate';
import UsersIndex from './pages/users/UsersIndex';
import UserCreate from './pages/users/UserCreate';
import { ToastContainer } from 'react-toastify';
import ClassEdit from './pages/classes/ClassEdit';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  
  return (
    <div className="App py-16 bg-gray-50 h-screen">
      <BrowserRouter>
        <Navbar/>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/classes" element={ <ProtectedRoute><ClassesIndex/></ProtectedRoute> } />
              <Route path="/classes/create" element={ <ProtectedRoute><ClassCreate/></ProtectedRoute> } />
              <Route path="/classes/:id/edit" element={ <ProtectedRoute><ClassEdit/></ProtectedRoute> } />
              <Route path="/students" element={ <ProtectedRoute><StudentsIndex/></ProtectedRoute> } />
              <Route path="/students/create" element={ <ProtectedRoute><StudentCreate/></ProtectedRoute> } />
              <Route path="/users" element={ <ProtectedRoute><UsersIndex/></ProtectedRoute> } />
              <Route path="/users/create" element={ <ProtectedRoute><UserCreate/></ProtectedRoute> } />
              <Route path="/auth" element={<Login/>} />
             <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
