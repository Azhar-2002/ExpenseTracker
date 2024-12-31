import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setExpenses } from '@/redux/expenseSlice';

const useGetExpenses = () => {
    const dispatch = useDispatch();
    const {category, markAsDone} = useSelector(state => state.expense);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res =await axios.get(`http://localhost:8000/api/v1/expense/getall?category=${category}&done=${markAsDone}`);
                if(res.data.success){
                    dispatch(setExpenses(res.data.expenses));
                }
            } catch (error){
                console.log(error);
            }
        }
        fetchExpenses();
    }, [dispatch,category, markAsDone]);
}
export default useGetExpenses;