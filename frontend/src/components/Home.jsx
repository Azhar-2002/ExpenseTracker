import React from 'react'
import Navbar from './Navbar'
import CreateExpense from './CreateExpense'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { setCategory, setMarkAsDone } from '@/redux/expenseSlice'
import { useDispatch } from 'react-redux'
import ExpenseTable from './ExpenseTable'
import useGetExpenses from '@/hooks/useGetExpenses'

const Home = () =>{
    useGetExpenses();
    const dispatch = useDispatch();
    const changeCategoryHandler = (value) => {
        dispatch(setCategory(value));
    }
    const changeDoneHandler = (value) => {
        dispatch(setMarkAsDone(value));
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto mt-12'>
            <div className='flex items-center justify-between mb-5'>
                <h2 className='font-medium'>Expense</h2>
                <CreateExpense />
            </div>
            <div className='flex items-center gap-2'>
            <h4 className='font-medium text-lg'>Filter By: </h4>
            <Select onValueChange={changeCategoryHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Catagory" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={changeDoneHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mark As" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="undone">Undone</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            </div>
            <ExpenseTable/>
            </div>
        </div>
    )
}
export default Home;