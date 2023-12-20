//import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import AlbumPage from './components/AlbumPage/AlbumPage'; 
import SearchPage from './components/SearchPage/SearchPage';
//import AlbumPlaceHolder from './components/AlbumPage/AlbumPlaceHolder';
import {Route, Routes} from 'react-router-dom';
import ReviewsPage from './components/ReviewsPage/ReviewsPage';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {useState, useEffect} from 'react';
import { SupabaseProvider, useSupabase } from './components/SupabaseContext'


const supabase = createClient('https://rglyclxrtxhkftufyhcd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnbHljbHhydHhoa2Z0dWZ5aGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5NjIyODcsImV4cCI6MjAxODUzODI4N30.rPmTuzcm6hNGkA34mRu_AIB4oop9h7spl_LNBpI9bUI')

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [session, setSession] = useState(null);
  const [data, setData] = useState(null);
  const { supabaseSessionToken, setToken } = useSupabase();

  // useEffect(() => {
  //   const checkUserLoggedIn = async () => {
  //     const { user } = await supabase.auth.session();
  //     setUserLoggedIn(!!user);
  //   };

  //   checkUserLoggedIn();
  // }, []);

    useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setToken(session?.access_token || null);
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setToken(session?.access_token || null);
    })

    return () => subscription.unsubscribe()
  }, [setToken])

  const logInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    if (data) {
      console.log(data);
      setUserLoggedIn(true);
      setData(data);
    }
    
  }


  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    setUserLoggedIn(false);
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
        {supabaseSessionToken ? (
          // User is logged in, show home screen
          <>
            <Route path="/" element={<SearchPage data={session.user} logOut={signOut}/>} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/album" element={<AlbumPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </>
        ) : (
          // User is not logged in, show login screen
          <Route path="/" element={<LoginPage handleSignIn={logInWithGoogle}/>} />
        )}
      </Routes>
    </div>
  );
}

const AppWithContext = () => {
  return (
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  );
};

export default AppWithContext;
