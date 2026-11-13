import { useState } from "react"
import type { ReactNode } from "react"
import type Habit from "../types/HabitInterface"
import { CardsContext } from "./CardsContextValue"

interface CardsProviderProps {
	children: ReactNode
}

export const CardsProvider = ({ children }: CardsProviderProps) => {
	const [habits, setHabits] = useState<Habit[]>([])

	return (
		<CardsContext.Provider
			value={{
				habits,
				setHabits,
			}}
		>
			{children}
		</CardsContext.Provider>
	)
}