import { keyframes } from "@mui/system"
export const tiltShake = keyframes `
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`

export const horizontalShake = keyframes `
 0% { transform: translateY(0) }
 25% { transform: translateY(5px) }
 50% { transform: translateY(-5px) }
 75% { transform: translateY(5px) }
 100% { transform: translateY(0) }
`

export const skewYShake = keyframes`
 0% { transform: skewY(-15deg); }
 5% { transform: skewY(15deg); }
 10% { transform: skewY(-15deg); }
 15% { transform: skewY(15deg); }
 20% { transform: skewY(0deg); }
 100% { transform: skewY(0deg); }
`