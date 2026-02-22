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
function App() {
  return (
    <div className="App py-16 bg-gray-50 h-screen">
      <BrowserRouter>
        <Navbar/>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/classes" element={<ClassesIndex/>} />
              <Route path="/classes/create" element={<ClassCreate/>} />
              <Route path="/students" element={<StudentsIndex/>} />
              <Route path="/students/create" element={<StudentCreate/>} />
              <Route path="/users" element={<UsersIndex/>} />
              <Route path="/users/create" element={<UserCreate/>} />
             <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
