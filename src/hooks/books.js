import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { db } from '../lib/firebase';

const BooksContext = createContext({});

const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    db.collection('books').orderBy('createdAt').onSnapshot(res => {
      const data = res.docs.map(doc => {
        return {id: doc.id, ...doc.data()}
      });

      setBooks(data);
    });
  }, [])

  return <BooksContext.Provider value={{ books }}>{children}</BooksContext.Provider>;
};

function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error(`useBooks must be used within a BooksProvider`);
  }

  return context;
}

export { BooksProvider, useBooks };