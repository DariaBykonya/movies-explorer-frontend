import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SignContext } from '../../contexts/SignContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteAfterSign from '../ProtectedRouteAfterSign/ProtectedRouteAfterSign';
import mainApi from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import { ERROR_LOAD_MESSAGE, EMPTY_SEARCH_MESSAGE, URL_MOVIE_IMAGE } from '../../utils/constants';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [editIsSuccess, setEditIsSuccess] = useState(false);
  const [editIsFailed, setEditIsFailed] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [loadingError, setLoadingError] = useState('');
  const [filterMovies, setFilterMovies] = useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isFirstLoadSavedMovies, setIsFirstLoadSavedMovies] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      mainApi
        .getMe()
        .then(res => {
          setLoggedIn(true);
          setCurrentUser({ email: res.email, name: res.name });
          getSavedMovies();
        })
        .catch(err => {
          setLoggedIn(false);
          localStorage.setItem('token', '');
        });
    }
    getFiltredMoviesFromStorage();
    const allMoviesLocal = JSON.parse(localStorage.getItem('allMovies'));
    if (allMoviesLocal) setAllMovies(allMoviesLocal);
  }, []);

  function login(email, password) {
    return mainApi.login(email, password).then(res => {
      localStorage.setItem('token', res.token);
      mainApi.getMe().then(res => {
        setLoggedIn(true);
        setCurrentUser({ email: res.email, name: res.name });
        navigate('/movies');
      });
    });
  }

  function register(name, email, password) {
    return mainApi.register(name, email, password).then(() => {
      return login(email, password);
    });
  }

  const updateUser = updateUserData => {
    const { name, email } = updateUserData;
    mainApi
      .updateUser(name, email)
      .then(res => {
        setCurrentUser({ email: res.email, name: res.name });
        setEditIsSuccess(true);
        setEditIsFailed(false);
        setTimeout(() => {
          setEditIsSuccess(false);
        }, 2000);
      })
      .catch(err => {
        mainApi.getMe().then(res => {
          setCurrentUser({ email: res.email, name: res.name });
        });
        setEditIsFailed(true);
        setTimeout(() => {
          setEditIsFailed(false);
        }, 3001);
      });
  };

  function handleSignOut() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('shortFilmFilter');
    localStorage.removeItem('searchText');
    setFilterMovies([]);
    setLoadingError('');
    navigate('/');
  }

  async function getAllMoviesData() {
    await getMovies()
    .then(data => {
      const allMoviesData = data.map(item => {
        const imageURL = item.image ? item.image.url : '';
        return {
          ...item,
          image: `${URL_MOVIE_IMAGE}${imageURL}`,
          trailer: item.trailerLink
        };
      });
      
      localStorage.setItem('allMovies', JSON.stringify(allMoviesData));
      setAllMovies(allMoviesData);
    })
    .catch(() => {
      localStorage.removeItem('allMovies');
      setLoadingError(ERROR_LOAD_MESSAGE);
    });    
  };

  async function getAllMovies() {
    const allMoviesLocal = JSON.parse(localStorage.getItem('allMovies'));
    if (allMoviesLocal) {
      setAllMovies(allMoviesLocal);
    } else {
       await getAllMoviesData();
    }
  }

  const getSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then(data => {
        const savedArray = data.movies.map(item => ({ ...item, id: item.movieId }));
        localStorage.setItem('savedMovies', JSON.stringify(savedArray));
        setSavedMovies(savedArray);
        setFilterSavedMovies(savedArray);
      })
      .catch(() => {
        localStorage.removeItem('savedMovies');
        setLoadingError(ERROR_LOAD_MESSAGE);
      });
  };

  const setSavedMoviesProxy = (prop)=>{
    localStorage.setItem('savedMovies', JSON.stringify(prop));
    setSavedMovies(prop)
  }
  const searchFilter = (data, searchText) => {
    setIsLoader(true)
    if (searchText) {
      const searchMoviesArr = data.filter(item => {
        return item.nameRU.toLowerCase().includes(searchText.toLowerCase());
      });
      if (searchMoviesArr.length === 0) {
        setLoadingError(EMPTY_SEARCH_MESSAGE);
      } else {
        setLoadingError('');
      }
      setIsLoader(false)
      return searchMoviesArr;
    }
    setIsLoader(false)
    return [];
  };


  async function searchMovies(searchText) {
    setIsLoader(true);
      await getAllMovies()
      const filteredMovies = searchFilter(allMovies, searchText);
      setFilterMovies(searchFilter(allMovies, searchText));
      saveFilteredMoviesToStorage(filteredMovies);
      setIsLoader(false);
  };

  function getFiltredMoviesFromStorage() {
    const filteredMoviesJSON = localStorage.getItem('filteredMovies');
    if (!filteredMoviesJSON) return;
    const filteredMovies = JSON.parse(filteredMoviesJSON);
    setFilterMovies(filteredMovies);
  }

  function saveFilteredMoviesToStorage(movies) {
    localStorage.setItem('filteredMovies', JSON.stringify(movies));
  }

  return (
    <SignContext.Provider value={{ loggedIn, setLoggedIn }}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/signup"
                element={
                  <ProtectedRouteAfterSign loggedIn={loggedIn}>
                    <Register onRegister={register} />
                  </ProtectedRouteAfterSign>
                }
              />
              <Route
                path="/signin"
                element={
                  <ProtectedRouteAfterSign loggedIn={loggedIn}>
                    <Login onLogin={login} />
                  </ProtectedRouteAfterSign>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile
                      currentUser={currentUser}
                      editIsSuccess={editIsSuccess}
                      editIsFailed={editIsFailed}
                      onUpdateUser={updateUser}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Movies
                      isLoader={isLoader}
                      loadingError={loadingError}
                      savedMovies={savedMovies}
                      movies={filterMovies.length === 0 ? allMovies : filterMovies}
                      searchMovies={searchMovies}
                      setLoadingError={setLoadingError}
                      isFirstLoad={isFirstLoad}
                      setIsFirstLoad={setIsFirstLoad}
                      setSavedMovies={setSavedMoviesProxy}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <SavedMovies
                      isLoader={isLoader}
                      loadingError={loadingError}
                      savedMovies={savedMovies}
                      setLoadingError={setLoadingError}
                      isFirstLoad={isFirstLoadSavedMovies}
                      setIsFirstLoad={setIsFirstLoadSavedMovies}
                      setSavedMovies={setSavedMoviesProxy}
                      setIsLoader={setIsLoader}
                      searchFilter={searchFilter}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </CurrentUserContext.Provider>
    </SignContext.Provider>
  );
}

export default App;
