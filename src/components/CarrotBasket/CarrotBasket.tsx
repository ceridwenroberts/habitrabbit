import { Box, Typography } from "@mui/material"
import { useMemo } from "react"
import { stickerFilter } from "../../theme"

type Carrot = {
	left: number
	bottom: number
	rotate: number
	size: number
	z: number
}
type Seedling = {
	left: number
	bottom: number
	size: number
	rotate: number
}
function mulberry32(seed: number) {
	return () => {
		seed |= 0
		seed = (seed + 0x6d2b79f5) | 0
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

export interface CarrotBasketProps {
	carrotCount?: number
	totalCount?: number
	seed?: number
	maxWidth?: number
	/** Size multiplier for carrots relative to the basket (e.g. 1.0 = standard, 1.25 = larger) */
	carrotScale?: number
}

export default function CarrotBasket({
	carrotCount = 0,
	totalCount = 0,
	seed = 7,
	maxWidth = 420,
	carrotScale = 2.1,
}: CarrotBasketProps) {
	const plantCount = Math.max(totalCount - carrotCount, 0)

	const carrots = useMemo<Carrot[]>(() => {
		const rand = mulberry32(seed)
		return Array.from({ length: carrotCount }, (_, i) => {
			const left = 12 + rand() * 72 // % across the basket opening
			const centre = 1 - Math.abs(left - 48) / 48 // heap slightly higher toward the center
			return {
				left,
				// Bounded so carrots stay anchored in the basket opening without floating above
				bottom: rand() * 15 + (i / Math.max(carrotCount, 1)) * 22 * centre,
				rotate: -55 + rand() * 110,
				size: (2.0 + rand() * 1.2) * carrotScale,
				z: Math.floor(rand() * 3),
			}
		})
	}, [carrotCount, seed, carrotScale])

	const seedlings = useMemo<Seedling[]>(() => {
		const rand = mulberry32(seed + 999)
		return Array.from({ length: plantCount }, () => {
			// Front of basket plus max 10% basket width to either side (-5% to 105%)
			const left = -5 + rand() * 110

			// Bottom edge is at least >6px (3x white border) below the basket's 2% bottom edge
			// Range -6% to 0% creates a natural staggered ground depth in front
			const bottom = -6 + rand() * 5.5

			// Between 70% (1.82) and 100% (2.6) of carrot size
			const size = (1.82 + rand() * 0.78) * carrotScale

			return { left, bottom, size, rotate: -15 + rand() * 30 }
		})
	}, [plantCount, seed, carrotScale])

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth,
				mx: "auto",
				aspectRatio: "1 / 0.95",
				position: "relative",
				containerType: "inline-size",
			}}
		>
			{/* Unified Basket + Carrots sticker group */}
			<Box sx={{ position: "absolute", inset: 0, filter: stickerFilter }}>
				{/* Basket Handle */}
				<Box
					sx={{
						position: "absolute",
						left: "14%",
						right: "14%",
						top: "2%",
						height: "60%",
						border: "clamp(8px, 3.5cqw, 14px) solid #8b5a2b",
						borderBottom: "none",
						borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
						boxShadow: "inset 0 4px 0 rgba(255,255,255,0.15)",
					}}
				/>

				{/* Carrot Pile (anchored inside the basket mouth) */}
				<Box
					sx={{
						position: "absolute",
						left: "8%",
						right: "8%",
						bottom: "42%",
						height: "32%",
						zIndex: 4,
						containerType: "inline-size",
					}}
				>
					{carrots.map((c, i) => (
						<Box
							key={i}
							component='span'
							aria-hidden
							sx={{
								position: "absolute",
								left: `${c.left}%`,
								bottom: `${c.bottom}%`,
								fontSize: `clamp(18px, ${c.size * 6}cqw, ${c.size * 22}px)`,
								transform: `translateX(-50%) rotate(${c.rotate}deg)`,
								zIndex: c.z,
								lineHeight: 1,
								userSelect: "none",
							}}
						>
							🥕
						</Box>
					))}
				</Box>

				{/* Basket Body (woven) */}
				<Box
					role='img'
					aria-label={`Basket with ${carrotCount} carrots`}
					sx={{
						position: "absolute",
						left: "4%",
						right: "4%",
						bottom: "2%",
						height: "50%",
						zIndex: 5,
						clipPath: "polygon(0 0, 100% 0, 88% 100%, 12% 100%)",
						background: `
          repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 3px, transparent 3px 28px),
          repeating-linear-gradient(0deg, #c68642 0 12px, #a8692f 12px 14px, #d49a5a 14px 26px, #8b5a2b 26px 28px)`,
						boxShadow: "inset 0 -20px 30px rgba(0,0,0,0.25)",
					}}
				/>

				{/* Basket Rim */}
				<Box
					sx={{
						position: "absolute",
						left: "1%",
						right: "1%",
						bottom: "49%",
						height: "7%",
						zIndex: 6,
						borderRadius: 999,
						background:
							"repeating-linear-gradient(60deg, #8b5a2b 0 10px, #b07535 10px 20px)",
						boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
					}}
				/>
			</Box>
			<Typography
				variant='h4'
				align='center'
				sx={{
					fontWeight: 700,
					color: "#3f992e",
					"&.MuiTypography-h4": {
						fontSize: "clamp(1.75rem, 11.8cqw, 3.25rem)",
					},
					filter: stickerFilter,
					position: "absolute",
					left: "4%",
					right: "4%",
					bottom: "22%",
					zIndex: 7,
					whiteSpace: "nowrap",
					// px: "0.12em",
					// py: "0.04em",
					pointerEvents: "none",
					userSelect: "none",
				}}
			>
				Today's Harvest
			</Typography>

			{/* All Seedlings in Front */}
			{seedlings.map((s, i) => (
				<Box
					key={i}
					component='span'
					aria-hidden
					sx={{
						position: "absolute",
						left: `${s.left}%`,
						bottom: `${s.bottom}%`,
						fontSize: `clamp(12px, ${s.size * 3.5}cqw, ${s.size * 13}px)`,
						transform: `translateX(-50%) rotate(${s.rotate}deg)`,
						zIndex: 10,
						userSelect: "none",
						lineHeight: 1,
						filter: stickerFilter,
					}}
				>
					🌱
				</Box>
			))}

			{/* Ground Shadow */}
			<Box
				sx={{
					position: "absolute",
					left: "15%",
					right: "15%",
					bottom: 0,
					height: "4%",
					borderRadius: "50%",
					bgcolor: "rgba(0,0,0,0.15)",
					filter: "blur(4px)",
				}}
			/>
		</Box>
	)
}
