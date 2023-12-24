//import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import AlbumPage from './components/AlbumPage/AlbumPage'; 
import SearchPage from './components/SearchPage/SearchPage';
//import AlbumPlaceHolder from './components/AlbumPage/AlbumPlaceHolder';
import {Route, Routes} from 'react-router-dom';
import ReviewsPage from './components/ReviewsPage/ReviewsPage';
import {useState, useEffect} from 'react';
import { AuthContextProvider } from './context/AuthContext';
import { UserAuth } from './context/AuthContext';
import ProfilePage from './components/ProfilePage/ProfilePage';



function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [session, setSession] = useState(null);
  const [data, setData] = useState(null);
  //const [user, setUser] = useState(null);
  const { googleSignIn, user, logOut } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const checkUserLoggedIn = async () => {
  //     const { user } = await supabase.auth.session();
  //     setUserLoggedIn(!!user);
  //   };

  //   checkUserLoggedIn();
  // }, []);

  //   useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session)
  //     setToken(session?.access_token || null);
  //   })

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setToken(session?.access_token || null);
  //   })

  //   return () => subscription.unsubscribe()
  // }, [setToken])

  // const logInWithGoogle = async () => {
  //   // const { data, error } = await supabase.auth.signInWithOAuth({
  //   //   provider: 'google'
  //   // })
  //   // if (data) {
  //   //   console.log(data);
  //   //   setUserLoggedIn(true);
  //   //   setData(data);
  //   // }
  //   const res = await signInWithGoogle();
  //   console.log(res);
  //   //setUser(res.user);
  //   if (res) {
  //     console.log(`result: ${res}`);
  //   }
  // }


  const signOut = async () => {
    // const { error } = await supabase.auth.signOut()
    // setUserLoggedIn(false);
    try {
      await logOut();
    } catch(error) {
      console.error(error);
      user = null;
    }

  }

    // useEffect(() => {
    //   supabase.auth.getSession().then(({ data: { session } }) => {
    //     setSession(session)
    //   })

    //   const {
    //     data: { subscription },
    //   } = supabase.auth.onAuthStateChange((_event, session) => {
    //     setSession(session)
    //   })

    //   return () => subscription.unsubscribe()
    // }, [])


    // if (!session) {
    //   return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    // }
    // else {
    //   return (<div>Logged in!</div>)
    // }
  return (
    <div className="App">
      <Routes>
        {user ? (
          // User is logged in, show home screen
          <>
            <Route path="/" element={<SearchPage data={user} logOut={signOut}/>} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/album" element={<AlbumPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </>
        ) : (
          // User is not logged in, show login screen
          <Route path="/" element={<LoginPage handleSignIn={handleGoogleSignIn}/>} />
        )}
      </Routes>
    </div>
  );
}

const AppWithContext = () => {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
};

export default AppWithContext;






// //import logo from './logo.svg';
// import './App.css';
// import LoginPage from './components/LoginPage/LoginPage';
// import AlbumPage from './components/AlbumPage/AlbumPage'; 
// import SearchPage from './components/SearchPage/SearchPage';
// //import AlbumPlaceHolder from './components/AlbumPage/AlbumPlaceHolder';
// import {Route, Routes} from 'react-router-dom';
// import ReviewsPage from './components/ReviewsPage/ReviewsPage';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route exact path="/" Component={LoginPage}/>
//         <Route exact path="/search" Component={SearchPage} />
//         <Route exact path='/album' Component={AlbumPage} />
//         <Route path='album/:id' element={<AlbumPage/>} />
//         <Route exact path='/reviews' Component={ReviewsPage} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
