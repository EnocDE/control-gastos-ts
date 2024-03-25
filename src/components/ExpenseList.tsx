import { useEffect, useMemo } from "react"
import useBudget from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
  const { state } = useBudget()

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state.expenses])

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

  const filterExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;


  return (
    <div className="bg-white shadow-lg rounded-lg p-10 mt-10">
        {isEmpty 
          ? <p className="text-gray-600 text-2xl font-bold text-center">No hay gastos aún</p>
          : (
            <>
              <p className="text-gray-600 text-2xl font-bold my-5 text-center">Listado de gastos</p>
              {filterExpenses.length === 0 
              ? <p className="text-center">No se encontró ningun gasto en esta categoria</p>
              : filterExpenses.map(expense => (
                <ExpenseDetail key={expense.id} expense={expense} />
              ))}
            </>
          )
        }
    </div>
  )
}
