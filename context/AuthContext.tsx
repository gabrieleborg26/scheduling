import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);
  const [refreshToken, setRefreshToken] = useState(null);
  let router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
        setToken(user.accessToken);
      } else {
        setUser(null);
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (user) {
        const userAuth = auth.currentUser;
        if (userAuth)
          userAuth.getIdToken(true).then((token) => {
            setToken(token);
          });
      }
    }, 300000); // 5 mins
  }, [user]);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).catch((e) => {
      alert(e);
    });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
