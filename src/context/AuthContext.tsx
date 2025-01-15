import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

import { IContextType, IUser } from '@/types';

import {
    useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";


const INITIAL_USER = {
    id: '',
    email: '',
    name: '',
    imageUrl: '',
    username: '',
    bio: ''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isAuthenticated: false,
    isLoading: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const { data: currentAccount, isPending: isLoading } = useGetCurrentUser();


    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const checkAuthUser = useCallback(async () => {
        try {

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    email: currentAccount.email,
                    name: currentAccount.name,
                    imageUrl: currentAccount.imageUrl,
                    username: currentAccount.username,
                    bio: currentAccount.bio
                });
                setIsAuthenticated(true);
                return true;
            }

            return false;

        } catch (error) {
            console.error(error);
            return false;
        }

    }, [currentAccount]);

    useEffect(() => {
        if (localStorage.getItem('cookieFallback') === null || localStorage.getItem('cookieFallback') === '[]') {
            navigate('/sign-in');
        }

        checkAuthUser();
    }, [navigate, currentAccount, checkAuthUser]);

    const value = {
        user,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated,
        checkAuthUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);
