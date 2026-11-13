import { Box } from "@mui/material"
import seedPacketUrl from "../../assets/seed-packet.svg"

interface SeedPacketIconProps {
	size?: number | string
}

export function SeedPacketIcon({ size = 72 }: SeedPacketIconProps) {
	return (
		<Box
			component='img'
			src={seedPacketUrl}
			alt='Seed packet'
			sx={{
				width: size,
				height: size,
				p: 1,
				borderRadius: "50%",
				filter: `
					drop-shadow(1.75px 0 0 #fff)
					drop-shadow(-1.75px 0 0 #fff)
					drop-shadow(0 1.75px 0 #fff)
					drop-shadow(0 -1.75px 0 #fff)
					drop-shadow(0 3px 2px rgba(27, 67, 50, 0.45))
					drop-shadow(0 6px 8px rgba(27, 67, 50, 0.30))
				`,
			}}
		/>
	)
}
