import "@mui/material/Button"
import "@mui/material/styles"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"

// 1. Tell TypeScript that Button supports "grass"
declare module "@mui/material/Button" {
	interface ButtonPropsColorOverrides {
		grass: true
	}
}

declare module "@mui/material/styles" {
	interface Palette {
		grass: Palette["primary"]
	}
	interface PaletteOptions {
		grass?: PaletteOptions["primary"]
	}
}

// Tell MUI styles that 'stickers' is a valid typography variant
declare module "@mui/material/styles" {
	interface TypographyVariants {
		stickers: React.CSSProperties
	}
	interface TypographyVariantsOptions {
		stickers?: React.CSSProperties
	}
}

// Allow <Typography variant="stickers"> in JSX
declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		stickers: true
	}
}

declare module "@mui/material/Paper" {
	interface PaperPropsVariantOverrides {
		card: true
	}
}

declare module "@mui/material/Card" {
	interface CardPropsVariantOverrides {
		card: true
	}
}

export const titleShadow = `
	drop-shadow( 0.03em  0px  0 #ffffff)
    drop-shadow(-0.02em  0px  0 #fff)
    drop-shadow( 0px  0.03em  0 #fff)
    drop-shadow( 0px -0.02em  0 #fff)

  drop-shadow(0 0.031em 0.021em rgba(27, 67, 50, 0.45))
  drop-shadow(0 0.063em 0.083em rgba(27, 67, 50, 0.30))
`
export const theme = responsiveFontSizes(
	createTheme({
		palette: {
			grass: {
				main: "#74c365",
				light: "#98DE8B",
				dark: "#244b20",
				contrastText: "#ffffff",
			},
		},
		typography: {
			fontFamily: ["Caveat, cursive", "Nunito", "Roboto", "sans-serif"].join(
				",",
			),
			h1: {
				fontFamily: '"Caveat Brush", cursive',
				color: "#329012",
				filter: `
		drop-shadow( 2px  0px  0 #ffffff)
    drop-shadow(-2px  0px  0 #fff)
    drop-shadow( 0px  2px  0 #fff)
    drop-shadow( 0px -2px  0 #fff)
		 drop-shadow(0px 3px 2px rgba(27, 67, 50, 0.45))
    drop-shadow(0px 6px 8px rgba(27, 67, 50, 0.30))
    
       
      `,
			},
			h4: {
				fontWeight: 700,
				color: "#5b3a1a",
			},
			h2: { fontFamily: "Caveat, cursive" },
			subtitle1: { fontFamily: "Caveat, cursive" },
			stickers: {
				display: "inline-block",
				fontSize: "3rem",
				filter: `
		drop-shadow( 2px  0px  0 #ffffff)
    drop-shadow(-2px  0px  0 #fff)
    drop-shadow( 0px  2px  0 #fff)
    drop-shadow( 0px -2px  0 #fff)
		 drop-shadow(0px 3px 2px rgba(27, 67, 50, 0.45))
    drop-shadow(0px 6px 8px rgba(27, 67, 50, 0.30))
    
       
      `,
			},

		},
		components: {
			MuiPaper: {
				variants: [
					{
						props: { variant: "card" },
						style: {
							filter: "drop-shadow(0 14px 24px rgba(44, 28, 14, 0.18))",
						},
					},
				],
			},
			MuiButton: {
				defaultProps: {
					disableTouchRipple: true,
					disableRipple: true,
					disableFocusRipple: true,
				},
				styleOverrides: {
					root: {
						transition: "transform 150ms ease",
						"@media (hover: hover)": {
							"&:hover:not(.Mui-disabled)": {
								transform: "scale(1.08)",
								backgroundColor: "transparent",
							},
						},
					},
				},
			},
			MuiIconButton: {
				defaultProps: {
					disableTouchRipple: true,
					disableRipple: true,
					disableFocusRipple: true,
				},
				styleOverrides: {
					root: {
						transition: "transform 150ms ease",
						"@media (hover: hover)": {
							"&:hover:not(.Mui-disabled)": {
								transform: "scale(1.08)",
								backgroundColor: "transparent",
							},
						},
						"&:focus-visible": {
							outline: "2px solid currentColor",
						},
					},
				},
			},
			MuiFab: {
				styleOverrides: {
					root: {
						transition: "transform 150ms ease",
						"@media (hover: hover)": {
							"&:hover:not(.Mui-disabled)": {
								transform: "scale(1.08)",
							},
						},
					},
				},
			},
		},
	}),
)

export const stickerFilter = `
  drop-shadow( 2px  0px 0 #ffffff)
  drop-shadow(-2px  0px 0 #ffffff)
  drop-shadow( 0px  2px 0 #ffffff)
  drop-shadow( 0px -2px 0 #ffffff)
  drop-shadow(0px 3px 2px rgba(27, 67, 50, 0.45))
  drop-shadow(0px 6px 8px rgba(27, 67, 50, 0.30))
`
