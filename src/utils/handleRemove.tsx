import type Habit from "../types/HabitInterface"

export const handleRemove = (arr: Habit[], id: string) => {
	return arr.filter((item) => id !== item.id)
}