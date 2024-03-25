import { ChangeEvent, FormEvent, useMemo, useState, } from "react";
import useBudget from "../hooks/useBudget";

export default function BudgetForm() {

	const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

	const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
		setBudget(+e.target.value);
	};

	const isValid = useMemo(() => 
		isNaN(budget) || budget <= 0
	, [budget]);

  function handleSubmit(e : FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch({type: "add-budget", payload: {budget}})
  }

	return (
		<form className="space-y-5" onSubmit={handleSubmit}>
			<div className="flex flex-col space-y-5">
				<label
					className="text-4xl text-blue-600 font-bold text-center"
					htmlFor="budget"
				>
					Definir Presupuesto
				</label>
				<input
					className="2-full bg-white border border-gray-200 p-2"
					type="number"
					placeholder="Define tu presupuesto"
					id="budget"
          min={1}
					value={budget}
					onChange={handleChange}
				/>
			</div>

			<input
				className="bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer w-full p-2 font-black text-white disabled:opacity-10"
				type="submit"
				value="Definir presupuesto"
				disabled={isValid}
			/>
		</form>
	);
}
