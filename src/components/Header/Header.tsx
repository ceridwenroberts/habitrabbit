import { Box, Container, Typography } from "@mui/material"

const Header = () => {
	const title = "Habit  🐇  Rabbit"
	return (
		<Container component='header'>
			<Box p={4} pb={0}>
				<Typography
					variant='h1'
					align='center'
					sx={{
						fontSize: {
							xs: "2.5rem",
							sm: "4rem",
							md: "6rem",
						},
					}}
				>
					{title.toUpperCase()}
				</Typography>
			</Box>
		</Container>
	)
}

export default Header
