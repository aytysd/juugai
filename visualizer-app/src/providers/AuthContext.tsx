"use client";

import React, { createContext, useState, useEffect, useContext } from "react";


interface AuthContextType {
    logout: () => void;
    isLoggedIn: boolean;
    login: (email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>([]);

    const login = async (email: string, password: string) => {
        
        try {
            // const response = await axios.get<string[]>('/api/files');
            const response = await fetch('api/login', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP error! status: ${response.status}, message: ${response.statusText}`
                );
            }
            const list = await response.json();
            console.log(list);

            setList(list);
        } catch (err) {
            setError('ファイルリストの取得に失敗しました');
            console.error('Error fetching file list:', err);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchDateTimeList();
    }, []);

    const refreshList = () => {
        fetchDateTimeList();
    };

    return (
        <DateTimeListContext.Provider value={{ list, isLoading, error, refreshList }}>
            {children}
        </DateTimeListContext.Provider>
    );
}

export const useDateTimeContext = () => {
  const context = useContext(DateTimeListContext);
  if (context === undefined) {
    throw new Error('useDateTimeContext must be used within a MyContextProvider');
  }
  return context;

}