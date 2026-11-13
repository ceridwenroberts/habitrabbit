import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { Box, IconButton, TextField, Typography } from "@mui/material"
import { nanoid } from "nanoid"
import type { ChangeEvent, FC, FormEvent } from "react"
import { useRef, useState } from "react"
import type AddBoxProps from "../../types/AddBoxProps.tsx"
import { SeedPacketButton } from "../SeedPacketButton/index.tsx"

const AddBox: FC<AddBoxProps> = ({ addHabit }) => {
	const [newHabitData, setNewHabitData] = useState<string>("")
	const inputRef = useRef<HTMLInputElement>(null)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewHabitData(e.target.value)
	}

	const submitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (newHabitData.trim()) {
			const habitId = nanoid(7)
			addHabit(habitId, newHabitData)
			setNewHabitData("")
		}
	}

	return (
		<Box
			sx={{
				position: "sticky",
				top: 0,
				zIndex: 1100,
				width: { xs: "100%", sm: "calc(100% + 48px)" },
				mx: { xs: 0, sm: -3 },
				px: { xs: 0, sm: 3 },
				display: { xs: "none", sm: "flex" },
				alignItems: "center",
				flexDirection: "row",
				gap: 1,
				pt: 3,
				pb: 1,
				backgroundColor: "#74c365",
				boxSizing: "border-box",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flex: 1,
					minWidth: 0,
					gap: 1,
				}}
			>
				<SeedPacketButton onClick={() => inputRef.current?.focus()} />
				<form
					aria-label='Add a habit'
					onSubmit={submitForm}
					style={{ flex: 1, minWidth: 0 }}
				>
					<Box
						sx={{
							backgroundColor: "white",
							border: "1px solid #000",
							borderRadius: 8,
							display: "flex",
							flexDirection: "row",
							paddingLeft: 4,
							paddingBottom: 1,
							alignItems: "center",
						}}
					>
						<TextField
							id='outlined'
							label={
								<>
									Plant a{" "}
									<Typography
										component='span'
										variant='stickers'
										sx={{ fontSize: "inherit", paddingLeft: ".3em" }}
									>
										🥕
									</Typography>{" "}
									!
								</>
							}
							variant='standard'
							fullWidth
							inputRef={inputRef}
							onChange={handleInputChange}
							value={newHabitData}
							sx={{
								"& .MuiInputBase-root": {
									borderRadius: "4px",
									paddingLeft: "2px",
									paddingRight: "8px",
									paddingBottom: "8px",
								},
								"& .MuiInput-root:before": {
									borderBottom: "none",
								},
								"& .MuiInput-root:after": {
									borderBottom: "none",
								},
								"& .MuiInput-root:hover:not(.Mui-disabled):before": {
									borderBottom: "none",
								},
								"& .MuiInputLabel-root": {
									color: "#666666",
									width: "100%",
									height: "100%",
									fontSize: "1.4rem",
								},
								"& .MuiInputLabel-root.Mui-focused": {
									color: "#1b4332",
								},
								"& .MuiInputLabel-shrink": {
									paddingLeft: "0px",
									transform: "translate(0, -26px) scale(1)",
								},
							}}
						/>
						<IconButton
							aria-label='Add habit'
							type='submit'
							disabled={!newHabitData.trim()}
							sx={{
								flex: "0 0 auto",
								width: 44,
								height: 44,
								mx: 1.5,
								mt: 1,
								border: "2px solid #2e7d32",
								borderRadius: "50%",
								backgroundColor: "#fff",
								color: "#2e7d32",
								"&:hover": {
									backgroundColor: "#f1f8f1",
								},
							}}
						>
							<ArrowUpwardIcon />
						</IconButton>
					</Box>
				</form>
			</Box>
		</Box>
	)
}

export default AddBox
