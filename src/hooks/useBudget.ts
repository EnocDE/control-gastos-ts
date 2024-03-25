import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export default function useBudget() {
  if (!useContext(BudgetContext)) {
    throw new Error('useBudget must be used within a BudgetProvider')
  }
  return (
    useContext(BudgetContext)  
  )
}
