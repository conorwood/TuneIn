//import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import AlbumPage from './components/AlbumPage/AlbumPage'; 
import SearchPage from './components/SearchPage/SearchPage';
//import AlbumPlaceHolder from './components/AlbumPage/AlbumPlaceHolder';
import {Route, Routes} from 'react-router-dom';
import ReviewsPage from './components/ReviewsPage/ReviewsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" Component={LoginPage}/>
        <Route exact path="/search" Component={SearchPage} />
        <Route exact path='/album' Component={AlbumPage} />
        <Route path='album/:id' element={<AlbumPage/>} />
        <Route exact path='/reviews' Component={ReviewsPage} />
      </Routes>
    </div>
  );
}

export default App;
