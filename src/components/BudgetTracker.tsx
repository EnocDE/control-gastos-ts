import { useMemo } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useBudget from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTracker() {
	const { state, dispatch, usedAmount, remainingAmount } = useBudget();
	const percentage = useMemo(
		() => usedAmount * (100 / state.budget),
		[state.expenses]
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
			<div className="flex justify-center">
				<CircularProgressbar
        className="transition-all"
					value={percentage}
					text={`${percentage.toFixed(1)}%`}
					styles={buildStyles({
						pathColor: `${
							percentage === 100
								? "#F05365"
								: percentage >= 50
								? "#FABC2A"
								: "#2563EB"
						}`,
						trailColor: "#f5f5f5",
						textColor: "#cfcfcf",
            textSize: 15
					})}
				/>
			</div>

			<div className="flex flex-col justify-evenly items-center md:items-stretch gap-5">
				<button
					type="button"
					className="bg-[#F05365] hover:bg-[#E04D5E] transition-colors w-full p-2 font-black text-white rounded-lg disabled:opacity-20 mt-5 md:mt-0"
          onClick={() => dispatch({type: "reset-app"})}
				>
					Resetear App
				</button>
				<AmountDisplay label="Presupuesto" amount={state.budget} />
				<AmountDisplay label="Disponible" amount={remainingAmount} />
				<AmountDisplay label="Gastado" amount={usedAmount} />
			</div>
		</div>
	);
}
