import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import { useEffect, useState } from 'react';
import moviesApi from '../../utils/MoviesApi';
import { register } from '../../utils/MainApi';




function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterError, setIsRegisterError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    
    moviesApi.getAllMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        console.log(`Ошибка при получении фильмов: ${err}`)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // async function handleGetAllMovies() {
  //   setIsLoading(true);
  //   try {
  //     const moviesData = await moviesApi.getAllMovies();
  //     if (moviesData) {
  //       setMovies(moviesData)
  //     }
  //   } catch (err) {
  //       console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  const handleRegister = (name, email, password) => {
    register(name, email, password)
      .then((res) => {
        console.log(res);
        if (res) {
          navigate("/signin");
        }
        else {
          setIsRegisterError(true)
        }
      })
      .catch((err) => {
        console.log(`Ошибка регистрации ${err}`);
      });
  };

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/movies" element={<Movies movies={movies} isLoading={isLoading}/>} />
      <Route path="/saved-movies" element={<SavedMovies movies={movies}/>}  />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signin" element={<Login />} />  
      <Route path="/signup" element={<Register onRegister={handleRegister} isRegisterError={isRegisterError} setIsRegisterError={setIsRegisterError}/>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
