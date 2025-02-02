"use client";

import React, { createContext, useState, useEffect, useContext } from "react";


interface DateTimeListContextType {
    list: string[];
    isLoading: boolean;
    error: string | null;
    refreshList: () => void;
};

const DateTimeListContext = createContext<DateTimeListContextType | undefined>(undefined);


export const DateTimeListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [list, setList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDateTimeList = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // const response = await axios.get<string[]>('/api/files');
            const response = await fetch('/api/file_list', {
                method: 'GET',
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