import { createContext, useContext, useState } from 'react';

const SupabaseContext = createContext();

export const SupabaseProvider = ({ children }) => {
  const [supabaseSessionToken, setSupabaseSessionToken] = useState(null);

  const setToken = (token) => {
    setSupabaseSessionToken(token);
  };

  return (
    <SupabaseContext.Provider value={{ supabaseSessionToken, setToken }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};
