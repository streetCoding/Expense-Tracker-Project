// src/components/Expenses.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { setSelectedOption } from "../../redux/slices/expenses/selectedOptionSlice";
import { setExpenses, addExpense, deleteExpense, updateExpense } from "../../redux/slices/expenses/expensesSlice";
import { setMoneySpent } from "../../redux/slices/expenses/moneyspentSlice";
import { setExpenseDescription } from "../../redux/slices/expenses/expenseDescriptionSlice";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, onValue, update, remove } from 'firebase/database';
import "./expenses.css";

const Expenses = () => {
    const selectedOption = useSelector(state => state.selectedOption);
    const expenses = useSelector(state => state.expenses);
    const moneySpent = useSelector(state => state.moneySpent);
    const expenseDescription = useSelector(state => state.expenseDescription);
    const dispatch = useDispatch();
    useEffect(() => {
        const auth = getAuth();
        const db = getDatabase();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const expensesRef = ref(db, `users/${userId}/expenses`);

                onValue(expensesRef, (snapshot) => {
                    const expensesData = snapshot.val();
                    if (expensesData) {
                        const expensesList = Object.entries(expensesData).map(([key, value]) => ({ id: key, ...value }));
                        dispatch(setExpenses(expensesList));
                    } else {
                        dispatch(setExpenses([]));
                    }
                });
            } else {
                dispatch(setExpenses([]));
            }
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);
    const handleSelect = (option) => {
        dispatch(setSelectedOption(option));
    };

    const handleAddExpense = () => {
        if (moneySpent && expenseDescription) {
            const auth = getAuth();
            const db = getDatabase();
            const userId = auth.currentUser.uid;
            const expensesRef = ref(db, `users/${userId}/expenses`);

            push(expensesRef, {
                moneySpent,
                expenseDescription,
                expenseCategory: selectedOption,
                isEdit: false
            })
            .then(() => {
                dispatch(setMoneySpent(''));
                dispatch(setExpenseDescription(''));
            })
            .catch((error) => {
                console.error('Error adding expense: ', error);
            });
        } else {
            alert('Please enter Money Spent and Expense Description');
        }
    };

    const editHandler = (expense) => {
        expense.isEdit = true;
        dispatch(updateExpense(expense));
    };

    const saveEditHandler = (expense) => {
        const auth = getAuth();
        const db = getDatabase();
        const userId = auth.currentUser.uid;
        const expenseRef = ref(db, `users/${userId}/expenses/${expense.id}`);

        const newData = {
            moneySpent: expense.moneySpent,
            expenseDescription: expense.expenseDescription,
            expenseCategory: expense.expenseCategory,
            isEdit: false
        };

        update(expenseRef, newData)
            .then(() => {
                console.log("Expense updated successfully");
            })
            .catch((error) => {
                console.error('Error updating expense: ', error);
            });
    };

    const cancelEditHandler = (expense) => {
        expense.isEdit = false;
        dispatch(updateExpense(expense));
    };

    const deleteHandler = (expense) => {
        const auth = getAuth();
        const db = getDatabase();
        const userId = auth.currentUser.uid;
        const expenseRef = ref(db, `users/${userId}/expenses/${expense.id}`);

        remove(expenseRef)
            .then(() => {
                console.log("Expense deleted successfully");
            })
            .catch((error) => {
                console.error('Error deleting expense: ', error);
            });
    };

    return (
        <>
            <div className="expenses_form">
                <div className="money_spent"> Money Spent <input value={moneySpent} onChange={(e) => dispatch(setMoneySpent(e.target.value))} /> &nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className="expense_description"> Expense Description <input value={expenseDescription} onChange={(e) => dispatch(setExpenseDescription(e.target.value))} />&nbsp;&nbsp;&nbsp;&nbsp; Category:</div>
                <div className="expense_dropdown">
                    <Dropdown className="custom_dropdown_button" onSelect={handleSelect}>
                        <Dropdown.Toggle variant="primary" className="custom-toggle">
                            {selectedOption}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-menu">
                            <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
                            <Dropdown.Item eventKey="Petrol">Petrol</Dropdown.Item>
                            <Dropdown.Item eventKey="Trip">Trip</Dropdown.Item>
                            <Dropdown.Item eventKey="Others">Others</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="add_expense_button" onClick={handleAddExpense}><div>Add Expense</div></div>
            </div>
            <div className="expense_data_intro">
                <div className="expense_data_intro_serialNo"><div>S.No.</div></div>
                <div className="expense_data_intro_expenseMoney"><div>Money Spent</div></div>
                <div className="expense_data_intro_expenseDes"><div>Expense Description</div></div>
                <div className="expense_data_intro_expenseCategory"><div>Expense Category</div></div>
                <div className="expense_data_intro_expenseAction"><div>Action</div></div>
            </div>
            <div className="expense_data_list_container">
                {expenses.length === 0 ? (
                    <div className="expense_data_list_container_noExpense">No Expense Found</div>
                ) : (
                    <>
                        {expenses.map((expense, index) => (
                            <div key={index} className="expense_item_list">
                                <div className="expense_item_list_serialNo"><div>{index + 1}</div></div>
                                <div className="expense_item_list_MoneySpent">
                                    {expense.isEdit ? (
                                        <div className="edit_input_custom">
                                            <input
                                                value={expense.moneySpent}
                                                onChange={(e) => dispatch(updateExpense({ ...expense, moneySpent: e.target.value }))}
                                            />
                                        </div>
                                    ) : (
                                        <div>Rs.{expense.moneySpent}</div>
                                    )}
                                </div>
                                <div className="expense_item_list_expenseDescription">
                                    {expense.isEdit ? (
                                        <div className="edit_input_custom">
                                            <input
                                                value={expense.expenseDescription}
                                                onChange={(e) => dispatch(updateExpense({ ...expense, expenseDescription: e.target.value }))}
                                            />
                                        </div>
                                    ) : (
                                        <div>{expense.expenseDescription}</div>
                                    )}
                                </div>
                                <div className="expense_item_list_expenseCategory">
                                    {expense.isEdit ? (
                                        <div className="edit_input_custom">
                                            <input
                                                value={expense.expenseCategory}
                                                onChange={(e) => dispatch(updateExpense({ ...expense, expenseCategory: e.target.value }))}
                                            />
                                        </div>
                                    ) : (
                                        <div>{expense.expenseCategory}</div>
                                    )}
                                </div>
                                <div className="expense_item_list_ExpenseAction">
                                    {expense.isEdit ? (
                                        <>
                                            <button onClick={() => saveEditHandler(expense)}>Save</button>
                                            <button onClick={() => cancelEditHandler(expense)}>Cancel</button>
                                        </>
                                    ) : (
                                        <button onClick={() => editHandler(expense)}>Edit</button>
                                    )}
                                    <button onClick={() => deleteHandler(expense)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default Expenses;
