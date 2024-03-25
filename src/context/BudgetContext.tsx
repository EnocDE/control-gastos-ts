import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  usedAmount: number
  remainingAmount: number
}

type BudgetProviderProps = {
  children: ReactNode
}

// Solo genera el contexto
export const BudgetContext = createContext<BudgetContextProps>(null!)

// Este contiene los datos
export const BudgetProvider = ({children} : BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const remainingAmount = useMemo(() => state.budget - calculateTotalExpenses() ,[state.expenses, state.budget])
  const usedAmount = useMemo(() => calculateTotalExpenses(), [state.expenses, state.budget])

  function calculateTotalExpenses() {
    return state.expenses.reduce((total, expense) => total += expense.amount, 0);
  };
  return (
    <BudgetContext.Provider value={{state, dispatch, usedAmount, remainingAmount}}>
      {children}
    </BudgetContext.Provider>
  )
}