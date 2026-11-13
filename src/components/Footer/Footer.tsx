import { Box, Typography } from "@mui/material"

type FooterProps = {
	footercontent: string
}

const Footer = ({ footercontent }: FooterProps) => {
	return (
		<Box
			component='footer'
			padding={{ xs: 2, sm: 4 }}
			sx={{
				marginTop: "auto",
				display: "block",
			}}
		>
			<Typography
				variant='h1'
				component='div'
				aria-hidden='true'
				align='center'
				gutterBottom
				sx={{
					letterSpacing: "-8.94px",
					lineHeight: "40px",
				}}
			>
				<Box component='span' sx={{ display: "block" }}>
					(\_/)
				</Box>
			</Typography>
			{footercontent}
		</Box>
	)
}

export default Footer
