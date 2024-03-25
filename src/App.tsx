import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseList from "./components/ExpenseList";
import ExpenseModal from "./components/ExpenseModal";
import useBudget from "./hooks/useBudget";
import FilterByCategorie from "./components/FilterByCategorie";

function App() {
	const { state } = useBudget();

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
  }, [state.budget])

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

	return (
		<>
			<header className="bg-blue-600 py-8 max-h-72">
				<h1 className="text-center font-black text-4xl text-white ">
					Planificador de gastos
				</h1>
			</header>

			<div className="max-w-[90%] md:w-1/2 mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
				{isValidBudget ? <BudgetTracker /> : <BudgetForm />}
			</div>

			{/* Si es TRUE muestra el componente */}
			{isValidBudget && (
				<>
					<main className="max-w-[90%] md:w-1/2 mx-auto my-10">
            <FilterByCategorie />
            <ExpenseList />
						<ExpenseModal />
					</main>
				</>
			)}
		</>
	);
}

export default App;
