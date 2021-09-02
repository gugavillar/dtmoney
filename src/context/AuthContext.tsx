import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
}

interface AuthContextData {
  user: User | undefined;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, uid } = user;
        if (!displayName) {
          throw new Error('Missing information from google account');
        }
        setUser({
          id: uid,
          name: displayName
        });
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);

  async function signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, uid } = result.user;
      if (!displayName) {
        throw new Error('Missing information from google account');
      }
      setUser({
        id: uid,
        name: displayName
      });
    }
  }

  async function signOut() {
    if (user) {
      await auth.signOut();
      setUser(undefined);
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}