import { Container } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid2"
import { differenceInCalendarDays } from "date-fns"
import { useCallback, useEffect } from "react"
import { useCards } from "../../contexts/useCards"
import type Habit from "../../types/HabitInterface.tsx"
import AddBox from "../AddBox/AddBox.tsx"
import AddDialog from "../AddDialog/AddDialog.tsx"
import Card from "../Card/Card.tsx"
import HarvestTally from "../HarvestTally/HarvestTally.tsx"

const isHabitArray = (value: unknown): value is Habit[] =>
	Array.isArray(value) &&
	value.every(
		(habit: unknown) =>
			habit !== null &&
			typeof habit === "object" &&
			"key" in habit &&
			"id" in habit &&
			"habit" in habit &&
			"isDone" in habit &&
			typeof habit.key === "string" &&
			typeof habit.id === "string" &&
			typeof habit.habit === "string" &&
			typeof habit.isDone === "boolean",
	)

const HabitManager = () => {
	const { habits, setHabits } = useCards()
	const displayedHabits = [...habits].sort(
		(a, b) => Number(a.isDone) - Number(b.isDone),
	)

	const store = useCallback((name: string, itemToStore: Habit[]): void => {
		localStorage.setItem(name, JSON.stringify(itemToStore))
	}, [])

	const updateHabits = useCallback(
		(nextHabits: Habit[]): void => {
			setHabits(nextHabits)
			store("habits", nextHabits)
		},
		[setHabits, store],
	)

	useEffect(() => {
		let storedHabits: Habit[]
		try {
			const storedHabitsData: unknown = JSON.parse(
				localStorage.getItem("habits") ?? "[]",
			)
			if (!isHabitArray(storedHabitsData)) {
				throw new Error("Saved habits have an invalid format")
			}
			storedHabits = storedHabitsData
		} catch (error) {
			console.error("Error parsing habits from localStorage:", error)
			setHabits([])
			return
		}

		setHabits(storedHabits)

		try {
			const storedLastVisitData = localStorage.getItem("lastVisit")

			if (storedLastVisitData) {
				const storedLastVisit: unknown = JSON.parse(storedLastVisitData)
				if (typeof storedLastVisit !== "string") {
					throw new Error("Saved last visit date is invalid")
				}
				const lastVisitDate = new Date(storedLastVisit)

				if (Number.isNaN(lastVisitDate.getTime())) {
					throw new Error("Saved last visit date is invalid")
				}

				if (differenceInCalendarDays(lastVisitDate, new Date()) !== 0) {
					updateHabits(
						storedHabits.map((habit) => ({ ...habit, isDone: false })),
					)
				}
			}

		} catch (error) {
			console.error("Error updating lastVisit data:", error)
			try {
				localStorage.removeItem("lastVisit")
			} catch (removeError) {
				console.error("Error removing invalid lastVisit data:", removeError)
			}
		}

		try {
			localStorage.setItem("lastVisit", JSON.stringify(new Date().toISOString()))
		} catch (error) {
			console.error("Error saving lastVisit data:", error)
		}
	}, [setHabits, updateHabits])

	const addHabit = (habitId: string, newHabitData: string): void => {
		const newHabit: Habit = {
			key: habitId,
			id: habitId,
			habit: newHabitData,
			isDone: false,
		}
		const updatedHabits = [...habits, newHabit]

		updateHabits(updatedHabits)
	}

	const deleteHabit = (id: string): void => {
		updateHabits(habits.filter((habit) => habit.id !== id))
	}

	const toggleDone = (id: string): void => {
		const updatedHabits = habits.map((habit) =>
			habit.id === id ? { ...habit, isDone: !habit.isDone } : habit,
		)
		updateHabits(updatedHabits)
	}

	return (
		<Container
			maxWidth='md'
			sx={{
				display: "flex",
				flexDirection: "column",
				flexGrow: 1,
			}}
		>
			<AddDialog addHabit={addHabit} />

			<AddBox addHabit={addHabit} />
			<HarvestTally>
				<Box
					sx={{
						borderRadius: 1,
						width: "100%",
						alignContent: "start",
					}}
				>
					<Grid container spacing={2}>
						{displayedHabits.map((habit) => (
							<Grid key={habit.id} size={{ xs: 12, sm: 12, md: 12 }}>
								<Card
									id={habit.id}
									text={habit.habit}
									isDone={habit.isDone}
									deleteHabit={deleteHabit}
									toggleDone={toggleDone}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
			</HarvestTally>
		</Container>
	)
}

export default HabitManager
