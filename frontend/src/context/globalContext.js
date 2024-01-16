import React, { useContext, useState } from "react"
import axios from 'axios'
import { useAuthContext } from "../hooks/useAuthContext"


// const BASE_URL = "http://localhost:5000/api/v1/";
const BASE_URL = "http://localhost:3001/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const {user} = useAuthContext()
    
    // if (!user) {
    //     setError('You must be logged in')
    //     return
    // }

    // const config = {
    //     headers: {
    //         Authorization: `Bearer ${user.token}`
    //     }
    // };

    //calculate incomes
    const addIncome = async (income) => {
        if (user) {
        const response = await axios.post(`${BASE_URL}add-income`, income,{
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        } )
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
        }
    }

    const getIncomes = async () => {
        if (user) {
        const response = await axios.get(`${BASE_URL}get-incomes`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        setIncomes(response.data)
        console.log(response.data)
        }
    }

    const deleteIncome = async (id) => {
        if (user) {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`,{
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        } )
        getIncomes()
        }
    }

    const totalIncome = () => {
        if (user) {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
        }
    }


    //calculate incomes
    const addExpense = async (income) => {
        if (user) {
        const response = await axios.post(`${BASE_URL}add-expense`, income, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        } )
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
        }
    }

    const getExpenses = async () => {
        if (user) {
        const response = await axios.get(`${BASE_URL}get-expenses`,{
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        } )
        setExpenses(response.data)
        console.log(response.data)
        }
    }

    const deleteExpense = async (id) => {
        if (user) {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`,{
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        } )
        getExpenses()
        }
    }

    const totalExpenses = () => {
        if (user) {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
        }
    }


    const totalBalance = () => {
        if (user) {
        return totalIncome() - totalExpenses()
        }
    }

    const transactionHistory = () => {
        if (user) {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0, 3)
        } else {
            return []
        }

    }

    const transactionHis = () => {
        if (user) {
        const transaction = [...incomes, ...expenses]
        transaction.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return transaction.slice(0, 100)
        } else {
            return []
        }

    }

    return (
        <GlobalContext.Provider value={{
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
            transactionHis,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}