import React from "react";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "@/redux/expenseSlice";

const CreateExpense = () => {
  const [fromData, setFromData] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {expenses} = useSelector(state=>state.expense);

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
      const res = await axios.post(
        "https://expensetracker-1-8r32.onrender.com/api/v1/expense/add",
        fromData ,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setExpenses([...expenses, res.data.expense]));
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
        <Button onClick={()=> setIsOpen(true)} variant="outline">Add New Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Create expense to here. Click add when you're done.
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
            <Select onValueChange={changeCategoryHandler}>
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
              <Button type="submit">Add</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateExpense;
