import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import useBudget from "../hooks/useBudget";

export default function ExpenseForm() {
	const [expense, setExpense] = useState<DraftExpense>({
		amount: 0,
		expenseName: "",
		category: "",
		date: new Date(),
	});
	const [error, setError] = useState("");
	const [previousAmount, setPreviousAmount] = useState(0);
	const { state, dispatch, remainingAmount } = useBudget();

	useEffect(() => {
		if (state.editingId) {
			const editingExpense = state.expenses.filter(
				(expense) => expense.id === state.editingId
			)[0];
			setExpense(editingExpense);
      setPreviousAmount(editingExpense.amount)
		}
	}, [state.editingId]);

	function handleChangeDate(value: Value) {
		setExpense({ ...expense, date: value });
	}

	function handleChange(
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) {
		const { name, value, type } = e.target;
		const isNumber = type === "number";

		if (isNumber && +value < 0) {
			e.preventDefault();
			return;
		}

		setExpense({
			...expense,
			[name]: isNumber ? +value : value,
		});
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Validar
		if (Object.values(expense).includes("")) {
			setError("Todos los campos son obligatorios");
			return;
		}

		if ((expense.amount - previousAmount) > remainingAmount) {
			setError("La cantidad rebasa el presupuesto");
      console.log(expense.amount - previousAmount, remainingAmount);
      
			return;
		}

		setError("");

		dispatch({ type: "save-expense", payload: { expense } });

		setExpense({
			amount: 0,
			expenseName: "",
			category: "",
			date: new Date(),
		});
    setPreviousAmount(0)
	}

	return (
		<form className="space-y-5" onSubmit={handleSubmit}>
			<legend className="text-center text-2xl py-2 font-black">
				{state.editingId ? "Editar Gasto" : "Nuevo Gasto"}
			</legend>

			{error && <ErrorMessage>{error}</ErrorMessage>}

			<div className="flex flex-col gap-2">
				<label className="text-xl" htmlFor="expenseName">
					Nombre del gasto:{" "}
				</label>
				<input
					className="bg-slate-100 p-2"
					id="expenseName"
					name="expenseName"
					type="text"
					placeholder="Añade el nombre del gasto: ej. Spotify, Cine..."
					value={expense.expenseName}
					onChange={handleChange}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-xl" htmlFor="amount">
					Cantidad:{" "}
				</label>
				<input
					className="bg-slate-100 p-2"
					id="amount"
					name="amount"
					type="number"
					min={0}
					placeholder="Añade la cantidad del gasto: ej. 300, 500..."
					value={expense.amount}
					onChange={handleChange}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-xl" htmlFor="category">
					Categorias:{" "}
				</label>
				<select
					className="bg-slate-100 p-2"
					id="category"
					name="category"
					value={expense.category}
					onChange={handleChange}
				>
					<option value="" disabled>
						-- Selecciona --
					</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-xl" htmlFor="date">
					Fecha gasto:{" "}
				</label>
				{
					<DatePicker
						className="bg-slate-100 p-2 border-0 outline-none"
						value={expense.date}
						onChange={handleChangeDate}
					/>
				}
				{/* <input className="bg-slate-100 p-2 border-0" id="date" name="date" type="date"  /> */}
			</div>

			<input
				className="bg-blue-600 cursor-pointer w-full text-white p-2 font-bold rounded-lg"
				type="submit"
				value={state.editingId ? "Actualizar Gasto" : "Agregar Gasto"} // Se añadio esto
			/>
		</form>
	);
}
