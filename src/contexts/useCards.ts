import { useContext } from "react"
import { CardsContext } from "./CardsContextValue"

export const useCards = () => {
	const context = useContext(CardsContext)
	if (!context) {
		throw new Error("useCards must be used within a CardsProvider")
	}
	return context
}
