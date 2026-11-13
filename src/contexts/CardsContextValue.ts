import { createContext } from "react"
import type { Dispatch, SetStateAction } from "react"
import type Habit from "../types/HabitInterface"

export interface CardsContextType {
	habits: Habit[]
	setHabits: Dispatch<SetStateAction<Habit[]>>
}

export const CardsContext = createContext<CardsContextType | null>(null)
