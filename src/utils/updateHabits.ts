import type { Dispatch, SetStateAction } from "react"
import type Habit from "../types/HabitInterface"

export const updateHabits = (
	habits: Habit[],
	setHabits: Dispatch<SetStateAction<Habit[]>>,
): void => {
	localStorage.setItem("habits", JSON.stringify(habits))
	setHabits(habits)
}
