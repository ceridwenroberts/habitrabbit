import { IconButton, useMediaQuery } from "@mui/material"
import type { IconButtonProps } from "@mui/material"
import { horizontalShake } from "../../utils/shakeEffect"
import seedPacketUrl from "../../assets/seed-packet.svg"
import { useEffect, useState } from "react"

export function SeedPacketButton(props: IconButtonProps) {
	const [shaking, setShaking] = useState(false)
	const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
	const customSx =
		Array.isArray(props.sx) ? props.sx
		: props.sx ? [props.sx]
		: []

	useEffect(() => {
		if (shaking || prefersReducedMotion) return

		let idleTimeout: number
		const resetIdleTimer = () => {
			window.clearTimeout(idleTimeout)
			idleTimeout = window.setTimeout(() => setShaking(true), 30_000)
		}

		const activityEvents = ["pointerdown", "keydown", "touchstart"] as const
		resetIdleTimer()
		activityEvents.forEach((event) =>
			window.addEventListener(event, resetIdleTimer),
		)

		return () => {
			window.clearTimeout(idleTimeout)
			activityEvents.forEach((event) =>
				window.removeEventListener(event, resetIdleTimer),
			)
		}
	}, [prefersReducedMotion, shaking])

	return (
		<IconButton
			{...props}
			aria-label={props["aria-label"] ?? "Add a habit"}
			onAnimationEnd={(event) => {
				props.onAnimationEnd?.(event)
				setShaking(false)
			}}
			sx={[
				{
					borderRadius: "50%",
					filter: `
								drop-shadow( 1.75px  0px  0 #ffffff)
								drop-shadow(-1.75px  0px  0 #ffffff)
								drop-shadow( 0px  1.75px  0 #ffffff)
								drop-shadow( 0px -1.75px  0 #ffffff)
								 drop-shadow(0px 3px 2px rgba(27, 67, 50, 0.45))
								drop-shadow(0px 6px 8px rgba(27, 67, 50, 0.30))`,
					animation:
						shaking && !prefersReducedMotion ?
							`${horizontalShake} 0.5s ease-in-out 3`
						:	"none",
					transition: prefersReducedMotion ? "none" : "transform 150ms ease",
					"&:hover": {
						transform: "scale(1.08)",
					},
				},
				...customSx,
			]}
		>
			<img src={seedPacketUrl} alt='' width={72} height={72} />
		</IconButton>
	)
}
