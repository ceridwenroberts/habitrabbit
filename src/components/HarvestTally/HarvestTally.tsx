import { Box, LinearProgress, Stack, Typography } from "@mui/material"
import type { ReactNode } from "react"
import { useCards } from "../../contexts/useCards"
import { stickerFilter } from "../../theme"
import CarrotBasket from "../CarrotBasket/CarrotBasket"

export default function HarvestTally({ children }: { children?: ReactNode }) {
	const { habits } = useCards()

	const carrots = habits.filter((habit) => habit.isDone).length
	const total = habits.length
	const carrotPlants = total - carrots
	const seed = 7

	const progressPercent = total > 0 ? (carrots / total) * 100 : 0

	return (
		<Box
			sx={{
				py: 6,
				px: 2,
			}}
		>
			<CarrotBasket
				carrotCount={carrots}
				totalCount={total}
				seed={seed}
				carrotScale={2.1}
			/>
			<Box
				sx={{
					position: "sticky",
					top: { xs: 0, sm: 104 },
					zIndex: 1000,
					maxWidth: 380,
					mx: "auto",
					mt: 4,
					backgroundColor: "transparent",
					py: 1,
				}}
			>
				<Box
					sx={{
						mt: 1.5,
						mb: 0.5,
						borderRadius: 6,
						overflow: "visible",
						filter: stickerFilter,
						WebkitFilter: stickerFilter,
					}}
				>
					<LinearProgress
						variant='determinate'
						value={progressPercent}
						aria-label='Daily habit completion'
						aria-valuetext={`${carrots} of ${total} habits completed`}
						sx={{
							height: 12,
							borderRadius: 6,
							bgcolor: "#d7c9a8",
							"& .MuiLinearProgress-bar": {
								bgcolor: "#e67e22",
								borderRadius: 6,
							},
						}}
					/>
				</Box>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Typography
						variant='body2'
						sx={{
							color: "#5b3a1a",
							px: 0.5,
							filter: stickerFilter,
							fontSize: "1.2em",
						}}
					>
						🥕 <strong>{carrots}</strong>
					</Typography>
					<Typography
						variant='h5'
						sx={{
							fontFamily: "monospace",
							bgcolor: "#e8dec5",
							px: 1,
							py: 0.25,
							mt: 1,
							mb: 4,
							borderRadius: 1,
							color: "#5b3a1a",
							fontWeight: 700,
							filter: `drop-shadow(1px 0 #fff) drop-shadow(-1px 0 #fff) drop-shadow(0 1px #fff) drop-shadow(0 -1px #fff)
                                 drop-shadow(0px 3px 2px rgba(27, 67, 50, 0.45))
    drop-shadow(0px 6px 8px rgba(27, 67, 50, 0.30))`,
						}}
					>
						{progressPercent.toFixed(0)}%
					</Typography>
					<Typography
						variant='body2'
						sx={{
							color: "#5b3a1a",
							p: 0.5,
							filter: stickerFilter,
							fontSize: "1.2em",
						}}
					>
						<strong>{carrotPlants}</strong>
						{" "}🌱
					</Typography>
				</Stack>
			</Box>
			<Box sx={{ mx: -2 }}>{children}</Box>
		</Box>
	)
}
