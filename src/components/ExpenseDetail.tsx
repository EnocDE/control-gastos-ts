import { useMemo } from "react";
import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";
import { Expense } from "../types";
import { formatDate } from "../utils";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import "react-swipeable-list/dist/styles.css";
import useBudget from "../hooks/useBudget";

type ExpenseDetailProps = {
	expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
	const { dispatch } = useBudget();

	const categoryInfo = useMemo(
		() => categories.find((category) => category.id === expense.category),
		[expense]
	);

	function leadingActions() {
		return (
			<LeadingActions>
				<SwipeAction
					onClick={() => dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })}
				>
					Editar
				</SwipeAction>
			</LeadingActions>
		);
	}

	function trailingActions() {
		return (
			<TrailingActions>
				<SwipeAction
					onClick={() =>
						dispatch({ type: "remove-expense", payload: { id: expense.id } })
					}
					destructive={true}
				>
					Elimnar
				</SwipeAction>
			</TrailingActions>
		);
	}

	return (
		<SwipeableList>
			<SwipeableListItem
				maxSwipe={1}
				leadingActions={leadingActions()}
				trailingActions={trailingActions()}
			>
				<div className="bg-white shadow-lg w-full p-5 border-b border-gray-200 flex gap-5 items-center select-none last-of-type:border-b-0">
					<div>
						<img
							src={`/icono_${categoryInfo?.icon}.svg`}
							alt="icono"
							className="w-20 h-w-20 pointer-events-none"
						/>
					</div>

					<div className="flex-1 space-y-2">
						<p className="text-sm font-bold text-slate-500">
							{categoryInfo?.name}
						</p>
						<p className="font-semibold">{expense.expenseName}</p>
						<p className="text-sm text-slate-600 ">
							{formatDate(expense.date!.toString())}
						</p>
					</div>

					<AmountDisplay amount={expense.amount} />
				</div>
			</SwipeableListItem>
		</SwipeableList>
	);
}
