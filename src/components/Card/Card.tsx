import UndoRoundedIcon from "@mui/icons-material/UndoRounded"
import { Box, IconButton, Paper, Typography } from "@mui/material"
import { useState } from "react"
import type { SyntheticEvent } from "react"
import type { SnackbarCloseReason } from "@mui/material/Snackbar"
import TallySnackbar from "../TallySnackbar/TallySnackbar"

interface CardProps {
	text: string
	id: string
	isDone: boolean
	toggleDone: (id: string) => void
	deleteHabit: (id: string) => void
}

const Card = ({ text, id, isDone, toggleDone, deleteHabit }: CardProps) => {
	const [snackOpen, setSnackOpen] = useState(false)

	const handleDone = () => {
		if (isDone) {
			toggleDone(id)
			setSnackOpen(false)
			return
		}
		toggleDone(id)
		setSnackOpen(true)
	}

	const handleUndo = () => {
		toggleDone(id)
		setSnackOpen(false)
	}

	const handleDelete = () => {
		deleteHabit(id)
		setSnackOpen(false)
	}

	const handleSnackbarClose = (
		_: SyntheticEvent | Event,
		reason?: SnackbarCloseReason,
	) => {
		if (reason !== "clickaway") {
			setSnackOpen(false)
		}
	}

	const emojiOutline = {
		WebkitTextStroke: "1px #fff",
		paintOrder: "stroke fill",
	}

	return (
		<>
			<Paper
				elevation={isDone ? 0 : 6}
				sx={{
					width: "100%",
					borderRadius: 3,
					overflow: "hidden",
					border: "3px solid #fff",
					background:
						isDone ? "transparent" : (
							"linear-gradient(180deg, #794a2c 0%, #562e17 100%)"
						),
					color: isDone ? "#244b20" : "#f7f3eef7",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: 0.5,
						width: "100%",
						py: 1,
					}}
				>
					<Typography
						variant='body1'
						sx={{
							width: "100%",
							px: 2,
							textAlign: "start",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							textOverflow: "ellipsis",
							wordBreak: "break-word",
						}}
					>
						{text}
					</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							px: 2,
						}}
					>
						<IconButton
							size='small'
							onClick={handleDone}
							aria-label={isDone ? "Undo completion" : "Mark complete"}
						>
							{isDone ?
								<UndoRoundedIcon
									sx={{
										fontSize: "clamp(1rem, 5vw, 2rem)",
										color: "#74c365",
										filter:
											"drop-shadow(1px 0 #fff) drop-shadow(-1px 0 #fff) drop-shadow(0 1px #fff) drop-shadow(0 -1px #fff)",
									}}
								/>
							:	<Box
									component='span'
									sx={{
										...emojiOutline,
										fontSize: "clamp(1rem, 5vw, 2rem)",
										lineHeight: 1,
										filter:
											"drop-shadow(1px 0 #fff) drop-shadow(-1px 0 #fff) drop-shadow(0 1px #fff) drop-shadow(0 -1px #fff)",
									}}
								>
									🪏
								</Box>
							}
						</IconButton>
						<IconButton
							size='small'
							onClick={handleDelete}
							aria-label='Delete habit'
						>
							<Box
								component='span'
								sx={{
									...emojiOutline,
									fontSize: "clamp(0.875rem, 4vw, 1.5rem)",
									lineHeight: 1,
									filter:
										"drop-shadow(1px 0 #fff) drop-shadow(-1px 0 #fff) drop-shadow(0 1px #fff) drop-shadow(0 -1px #fff)",
								}}
							>
								❌
							</Box>
						</IconButton>
					</Box>
				</Box>
			</Paper>
			<TallySnackbar
				snackOpen={snackOpen}
				autoHideDuration={4000}
				message='You picked a carrot!'
				undoAction={handleUndo}
				onClose={handleSnackbarClose}
			/>
		</>
	)
}
export default Card
