import { Container } from "@mui/material"
import Footer from "./components/Footer/Footer.tsx"
import Header from "./components/Header/Header.tsx"
import HabitManager from "./components/HabitManager/HabitManager.tsx"
import { CardsProvider } from "./contexts/CardsContext.tsx"

function App() {
  return (
    <CardsProvider>
      <Container
        maxWidth="md"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
          background: "#74C365",
        }}
      >
        <Header />
        <HabitManager />
        <Footer footercontent="&copy; Ceridwen Roberts 2024" />
      </Container>
    </CardsProvider>
  )
}

export default App
