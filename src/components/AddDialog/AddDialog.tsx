import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material"
import { nanoid } from "nanoid"
import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import type AddBoxProps from "../../types/AddBoxProps.tsx"
import { SeedPacketButton } from "../SeedPacketButton/index.tsx"

const AddDialog = ({ addHabit }: AddBoxProps) => {
	const [open, setOpen] = useState(false)
	const [newHabitData, setNewHabitData] = useState("")

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewHabitData(e.target.value)
	}

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (newHabitData.trim()) {
			const habitId = nanoid(7)
			addHabit(habitId, newHabitData)
			setNewHabitData("")
			handleClose()
		}
	}

  return (
		<>
			<SeedPacketButton
				onClick={handleClickOpen}
				aria-label='Open add habit dialog'
				sx={{
					display: { xs: "inline-flex", sm: "none" },
					position: "fixed",
					right: "8%",
					bottom: "8%",
					zIndex: 1200,
				}}
			/>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='add-habit-dialog-title'
				sx={{
					"& .MuiDialog-container": {
						p: 2,
					},
					"& .MuiDialog-paper": {
						m: 0,
						width: "100%",
						maxWidth: "none",
						maxHeight: "none",
						borderRadius: 2,
					},
				}}
				PaperProps={{
					component: "form",
					onSubmit: submitForm,
				}}
			>
				<DialogTitle id='add-habit-dialog-title'>Plant a 🥕!</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						margin='dense'
						value={newHabitData}
						onChange={handleInputChange}
						fullWidth
						variant='standard'
						inputProps={{ "aria-label": "Habit name" }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type='submit'>Add</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default AddDialog
