import { Box, Typography } from "@mui/material"
import { useCards } from "../../contexts/useCards"

const Counter = () => {
	const { habits } = useCards()

	const done = habits.filter((habit) => habit.isDone).length

	return (
		<>
		
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "1fr auto 1fr",
					alignItems: "center",
					width: "100%",
				}}
				role='img'
				aria-label={`${done} of ${habits.length} habits completed`}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: ".3em",
						fontSize: {
							xs: "1.5em",
							sm: "2em",
						},
						justifySelf: "end",
					}}
				>
					{habits
						.filter((habit) => !habit.isDone)
						.map((_, i) => (
							<Typography
								variant='stickers'
								component='span'
								key={`seedling-${i}`}
								sx={{
									fontSize: {
										xs: "1.2em",
										sm: "2em",
									},
								}}
							>
								🌱
							</Typography>
						))}
				</Box>

				<Typography
					variant='h5'
					sx={{
						px: 2,
						whiteSpace: "nowrap",
					}}
				>
					{done}/{habits.length}
				</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: ".3em",
						fontSize: {
							xs: "1.5em",
							sm: "2em",
						},
						justifySelf: "end",
					}}
				>
					{habits
						.filter((habit) => habit.isDone)
						.map((_, i) => (
							<Typography
								variant='stickers'
								component='span'
								key={`carrot-${i}`}
								sx={{
									fontSize: {
										xs: "0.7em",
										sm: "2em",
									},
								}}
							>
								🥕
							</Typography>
						))}
				</Box>
			</Box>
		</>
	)
}

export default Counter
