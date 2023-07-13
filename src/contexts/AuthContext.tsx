import { ReactNode, createContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase';

type UserContextType = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: UserContextType | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserContextType>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        doSetUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());

    if (result.user) {
      doSetUser(result.user);
    }
  }

  function doSetUser(user: User) {
    const { displayName, photoURL, uid } = user;

    if (!displayName || !photoURL) {
      throw new Error('Missing display name or photo URL from Google Account');
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL
    });
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}