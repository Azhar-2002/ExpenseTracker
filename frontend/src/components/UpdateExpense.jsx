import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Edit2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses, setSingleExpense } from "@/redux/expenseSlice";

const updateExpense = ({expense}) => {
    const {expenses, singleExpense} = useSelector(state=>state.expense);
  const [fromData, setFromData] = useState({
    description: singleExpense?.description,
    amount: singleExpense?.amount,
    category: singleExpense?.category
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() =>{
    setFromData({
        description: singleExpense?.description,
        amount: singleExpense?.amount,
        category: singleExpense?.category
    })
  },[singleExpense]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const changeCategoryHandler = (value) => {
    setFromData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(fromData);
    try {
      setLoading(true);
      const res = await axios.put(
        `https://expensetracker-1-8r32.onrender.com/api/v1/expense/update/${expense._id}`,
        fromData ,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      if (res.data.success) {
        const updatedExpenses = expenses.map(exp => exp._id=== expense._id? res.data.expense: exp);
        dispatch(setExpenses(updatedExpenses));
        toast.success(res.data.message);
        setIsOpen(false);
      }
      // Network request
    } catch (error) {
      console.log(error);
      toast.error("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={()=> {
            dispatch(setSingleExpense(expense))
            setIsOpen(false);
        }} size="icon" className="rounded-full border border-green-600 text-green-600 hover:border-transparent" variant="outline"><Edit2/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Expense</DialogTitle>
          <DialogDescription>
            Update expense to here. Click Update when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="description"
                className="col-span-3"
                name="description"
                value={fromData.description}
                onChange={changeEventHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                placeholder="xxx ₹"
                className="col-span-3"
                name="amount"
                value={fromData.amount}
                onChange={changeEventHandler}
              />
            </div>
            <Select value={fromData.category} onValueChange={changeCategoryHandler}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Catagories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4 bg-blue-500 text-white">
                <Loader2 className="mr-2 h-4 animate-spin"/>
                Please wait...
              </Button>
            ) : (
              <Button type="submit">Update</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default updateExpense;
