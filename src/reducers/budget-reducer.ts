import {v4 as uuidv4} from "uuid"
import type { Category, DraftExpense, Expense } from "../types";

export type BudgetActions =
	| { type: "add-budget", payload: { budget: number } }
	| { type: "show-modal" }
	| { type: "close-modal" }
  | { type: "save-expense", payload: {expense: DraftExpense}}
  | { type: "remove-expense", payload: {id: Expense['id']}}
  | { type: "get-expense-by-id", payload: {id: Expense['id']} } 
  | { type: "reset-app" } 
  | { type: "add-filter-category", payload: {id: Category['id']} } 

export type BudgetState = {
	budget: number;
	modal: boolean;
  expenses: Expense[],
  editingId: Expense['id']
  currentCategory: Category['id']
};

const initialBudget = () : number => {
  const budget = localStorage.getItem('budget');
  return budget ? +budget : 0;
}

const localStorageExpenses = () : Expense[] => {
  const expenses = localStorage.getItem('expenses');
  return expenses ? JSON.parse(expenses) : [];
}

export const initialState: BudgetState = {
	budget: initialBudget(),
	modal: false,
  expenses: localStorageExpenses(),
  editingId: '',
  currentCategory: ''
};

// Funciones
function createExpense(DraftExpense: DraftExpense) : Expense {
  return {...DraftExpense, id: uuidv4()}
}

export const budgetReducer = (
	state: BudgetState = initialState,
	action: BudgetActions
) => {
	if (action.type === "add-budget") {
		return {
			...state,
			budget: action.payload.budget,
		};
	}

	if (action.type === "show-modal") {
		return {
			...state,
			modal: true,
      editingId: ''
		};
	}

	if (action.type === "close-modal") {
		return {
			...state,
			modal: false,
		};
	}

  if (action.type === "save-expense") {
    let updatedExpenses;
    
    if (state.editingId) {
      const updateExpense = {...action.payload.expense , id: state.editingId}
      updatedExpenses = state.expenses.map(expense => expense.id === state.editingId ? updateExpense : expense)
    } else {
      const expense = createExpense(action.payload.expense)
      updatedExpenses = [...state.expenses, expense]
    }
		return {
			...state,
      expenses: updatedExpenses,
      modal: false,
		};
	}

  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
    }
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      modal: true,
      editingId: action.payload.id
    }
  }

  if (action.type === "reset-app") {
    return {
      ...state,
      budget: 0,
      expenses: [],
    }
  }

  if (action.type === "add-filter-category") {
    return {
      ...state,
      currentCategory: action.payload.id
    }
  }
  

	return state;
};
