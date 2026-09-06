import { ThemeProvider } from "./components/theme-provider"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Dashboard />
    </ThemeProvider>
  )
}

export default App
