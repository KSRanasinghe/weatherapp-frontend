import { useEffect, useState } from "react"
import axios from "axios";
import { LogOut, Sun } from "lucide-react";
import type { CityComfortResult } from "@/types/CityComfortResult";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

function Dashboard() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const [cities, setCities] = useState<CityComfortResult[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({
        authorizationParams: {
          audience: "https://weatherapp-api",
        },
      }).then((token) => {
        axios
          .get("http://localhost:8080/api/weather-all", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setCities(res.data))
          .catch((err) => console.error("Failed to fetch weather data:", err));
      })
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <div>Loading...</div>

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-cover bg-center bg-[url('bg-img.webp')] bg-black/40 bg-blend-multiply">
        <h3 className="text-lg md:text-3xl font-semibold pb-1 text-white">Welcome To</h3>
        <h1 className="text-2xl md:text-4xl 2xl:text-6xl font-bold pb-2 text-white">Weather Comfort Ranking</h1>
        <p className="w-full md:text-lg text-center md:w-4/5 2xl:w-2/5 text-white mb-3">Discover the most comfortable cities to live and travel in. We evaluate real-time weather metrics—including temperature, humidity, and wind speed—to calculate an overall comfort score and rank cities based on accurate, live data.</p>
        <Button className="rounded-full px-6 py-5 text-xl bg-cyan-500 hover:bg-cyan-600 transition-all"
          onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center h-16 border-b p-4 justify-end gap-4">
        <ModeToggle />
        <Button variant="destructive" onClick={() => logout()}>
          <LogOut size={18} data-icon="inline-start" />
          Log Out
        </Button>
      </header>
      <main className="max-w-full p-4 md:max-w-7xl mx-auto">
        <div className="flex flex-col items-center pt-6 mb-6">
          <h3 className="text-lg md:text-2xl font-semibold pb-1">Welcome To</h3>
          <h1 className="text-2xl md:text-4xl font-bold pb-2 text-cyan-500">Weather Comfort Ranking</h1>
          <p className="w-full md:text-lg text-center md:w-4/5">Discover the most comfortable cities to live and travel in. We evaluate real-time weather metrics—including temperature, humidity, and wind speed—to calculate an overall comfort score and rank cities based on accurate, live data.</p>
        </div>
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-accent">
              <TableHead className="text-center font-semibold border-e">Rank</TableHead>
              <TableHead className="text-center font-semibold border-e">City</TableHead>
              <TableHead className="text-center font-semibold border-e">Weather</TableHead>
              <TableHead className="text-center font-semibold border-e">Temp (°C)</TableHead>
              <TableHead className="text-center font-semibold border-e">Comfort Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.length === 0 ? (
              <TableRow>
                <TableCell className="border-r border-border text-center text-gray-500" colSpan={5}>Fetching latest weather data...</TableCell>
              </TableRow>
            ) : (
              cities.map((city) => (
                <TableRow key={city.rank}>
                  <TableCell className="text-center border-e">{city.rank}</TableCell>
                  <TableCell className="text-center border-e">{city.cityName}</TableCell>
                  <TableCell className="text-center border-e">{city.description}</TableCell>
                  <TableCell className="text-center border-e">{city.temp}</TableCell>
                  <TableCell className="text-center border-e">{city.comfortScore}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </main>
    </>
  )
}

export default Dashboard