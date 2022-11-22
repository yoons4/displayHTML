/*
import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4'
function App() {
    const [todos, setTodos] = useState([{id: 1, name: 'Todo 1', complete: true}])
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY))
            if (storedTodos) setTodos(storedTodos)
        }, [])


    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    },[todos])

    function toggleTodo(id){
        const newTodos = [...todos]

        const todo = newTodos.find(todo => todo.id === id)

        todo.complete = !todo.complete
        setTodos(newTodos)
    }


    function handleAddTodo(e){
        const name = todoNameRef.current.value
        if(name == '') return
        setTodos(prevTodos => {
            return [...prevTodos,
            {
                id: uuidv4(), name: name, complete: false
            }]
        })
        todoNameRef.current.value = null
    }
    return(
        <>
        <TodoList todos = {todos} toggleTodo = {toggleTodo} />
        <input type = "text" />
        <button>Add Todo</button>
        <button>Clear Completed</button>
        <div>0 left to do.</div>
        </>
    );
}

export default App;
*/

import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App(){
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    const [exchangeRate, setExchangeRate] = useState()
    console.log(exchangeRate)
    console.log(currencyOptions)

    let toAmount, fromAmount
    if(amountInFromCurrency){
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }
    useEffect(() => {
        fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
            const firstCurrency = Object.keys(data.rates)[0]
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])
            setFromCurrency(data.base)
            setToCurrency(firstCurrency)
            setExchangeRate(data.rates[firstCurrency])
        })
        }, [])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null){
            fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
            .then(res => res.json())
            .then(data => setExchangeRate(data.rates[toCurrency]))
        }
        
    }, [fromCurrency, toCurrency])

    function handleFromAmountChange(e){
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e){
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }
    return(
        <>
        <h1>Convert</h1>
        <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} 
        onChangeCurrency = {e => setFromCurrency(e.target.value)} onChangeAmount = {handleFromAmountChange}
        amount = {fromAmount}/>
        <div className = "equals">=</div>
        <CurrencyRow currencyOptions={currencyOptions} selectedCurrency = {toCurrency} 
        onChangeCurrency = {e => setToCurrency(e.target.value)} onChangeAmount = {handleToAmountChange}
        amount = {toAmount}/>
        </>
    );
}

export default App;