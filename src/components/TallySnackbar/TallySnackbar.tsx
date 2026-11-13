import { Box, Button } from "@mui/material"
import Snackbar from "@mui/material/Snackbar"
import type { SnackbarCloseReason } from "@mui/material/Snackbar"
import type { SyntheticEvent } from "react"
import { useCards } from "../../contexts/useCards"

interface TallySnackbarProps {
	snackOpen: boolean
	autoHideDuration: number
	message: string
	undoAction: () => void
	onClose: (
		event: SyntheticEvent | Event,
		reason?: SnackbarCloseReason,
	) => void
}

const TallySnackbar = ({
	snackOpen,
	autoHideDuration,
	message,
	undoAction,
	onClose,
}: TallySnackbarProps) => {
	const { habits } = useCards()
	const tasksLeft = habits.filter((habit) => !habit.isDone).length
	const allHabitsDone = habits.length > 0 && tasksLeft === 0

	return (
		<Snackbar
			open={snackOpen}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			autoHideDuration={autoHideDuration}
			onClose={onClose}
			action={
				<Button
					color='secondary'
					aria-label='Undo habit completion'
					sx={{
						color: "#1c5e22",
						bgcolor: "#e8f5e9",
						fontWeight: 800,
						borderRadius: "999px",
						px: 2,
						py: 0.5,
						textTransform: "uppercase",
						letterSpacing: "0.04em",
						"&:hover": {
							bgcolor: "#c8e6c9",
						},
					}}
					size='small'
					onClick={undoAction}
				>
					UNDO
				</Button>
			}
			message={
				<Box sx={{ textAlign: "center" }}>
					{allHabitsDone ?
						<>
							You've picked all your 🥕🥕🥕 !!!
							<br />
							Happy happy <span style={{ fontSize: "1.6em" }}>🐇!</span>
						</>
					:	<>
							{message}
							<br />
							Only {tasksLeft} left until you are a happy{"  "}
							<span style={{ fontSize: "1.6em" }}>🐇</span>.
						</>
					}
				</Box>
			}
			sx={{
				"& .MuiSnackbarContent-root": {
					bgcolor: "#fff",
					color: "#122c15",
					borderRadius: "24px",
					padding: "12px 24px",
					boxShadow:
						"0 6px 16px rgba(16, 68, 15, 0.18), 0 20px 42px rgba(12, 56, 12, 0.24)",
				},
			}}
		/>
	)
}

export default TallySnackbar
