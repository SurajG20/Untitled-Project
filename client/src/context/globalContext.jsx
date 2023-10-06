import React, { useContext, useState } from 'react';
import { axiosInstance } from './fetchClient';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});

  const addIncome = async (income) => {
    try {
      await axiosInstance.post('add-income', income);
      getIncomes();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axiosInstance.get('get-incomes');
      setIncomes(response.data.incomes);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const deleteIncome = async (id) => {
    const response = await axiosInstance.delete(`delete-income/${id}`);
    getIncomes();
  };
  const totalIncome = () => {
    let totalIncome = 0;
    incomes &&
      incomes.forEach((income) => {
        totalIncome = totalIncome + income.amount;
      });

    return totalIncome;
  };
  const addExpense = async (expense) => {
    try {
      await axiosInstance.post('add-expense', expense);
      getExpenses();
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axiosInstance.get('get-expenses');
      setExpenses(response.data.expenses);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const deleteExpense = async (id) => {
    const response = await axiosInstance.delete(`delete-expense/${id}`);
    getExpenses();
  };
  const totalExpenses = () => {
    let totalIncome = 0;
    expenses &&
      expenses.forEach((income) => {
        totalIncome = totalIncome + income.amount;
      });

    return totalIncome;
  };
  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  const register = async (data) => {
    try {
      const response = await axiosInstance.post('register', data);
      console.log('response register :', response);
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const login = async (data) => {
    try {
      const response = await axiosInstance.post('login', data);
      setUser(true);
      setUserData(response.data);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('logout');
      setUser(false);
      localStorage.removeItem('token');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        register,
        login,
        user,
        setUser,
        logout,
        userData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
