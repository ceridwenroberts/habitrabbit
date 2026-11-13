import { ThemeProvider } from "@mui/material/styles"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { theme } from "./theme"
import "@fontsource/caveat"
import "@fontsource/caveat-brush"

const rootElement = document.getElementById("root")
if (!rootElement) {
	throw new Error("Root element #root was not found")
}

createRoot(rootElement).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</StrictMode>,
)
