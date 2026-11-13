import { Box } from "@mui/material";

export const ShovelIcon = () => {

  return (
  <Box
	sx={{
		fontSize: 36,
		color: "#846019",
		filter: `
								drop-shadow( 1px  0px  0 #0f0e0e)
								drop-shadow(-1px  0px  0 #121111)
								drop-shadow( 0px  1px  0 #191716)
								drop-shadow( 0px -1px  0 #181515)
								 drop-shadow(0px 3px 2px rgba(27, 67, 50, 0.45))
								drop-shadow(0px 6px 8px rgba(27, 67, 50, 0.30))`,
		"&:hover": {
			color: "#a5c6a6",
			backgroundColor: "transparent",
		},
	}}
>
	🪏
</Box>)
}