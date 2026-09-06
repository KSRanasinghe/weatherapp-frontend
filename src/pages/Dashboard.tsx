import { useEffect, useState } from "react"
import axios from "axios";
import { LogOut, Sun } from "lucide-react";
import type { CityComfortResult } from "@/types/CityComfortResult";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();
  const [cities, setCities] = useState<CityComfortResult[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get<CityComfortResult[]>("http://localhost:8080/api/weather-all")
        .then((res) => setCities(res.data))
        .catch((err) => console.error("Failed to fetch weather data:", err));
    }
  }, [isAuthenticated]);

  if (isLoading) return <div>Loading...</div>

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold">Weather Comfort Ranking</h1>
        <button
          onClick={() => loginWithRedirect()}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <>
      <header className="flex items-center h-16 border-b p-4 justify-end gap-4">
        <Sun size={18} />
        <Button variant="outline" onClick={() => logout()}>
          <LogOut size={18} data-icon="inline-start" />
          Log Out
        </Button>
      </header>
      <main className="max-w-full p-4 md:max-w-7xl mx-auto">
        <div className="flex flex-col items-center pt-6 mb-6">
          <h3 className="text-lg md:text-2xl font-semibold pb-1">Welcome To</h3>
          <h1 className="text-2xl md:text-4xl font-bold pb-2 text-blue-400">Weather Comfort Ranking</h1>
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
            {cities.map((city) => (
              <TableRow key={city.cityId}>
                <TableCell className="text-center border-e">{city.rank}</TableCell>
                <TableCell className="text-center border-e">{city.cityName}</TableCell>
                <TableCell className="text-center border-e">{city.description}</TableCell>
                <TableCell className="text-center border-e">{city.temp}</TableCell>
                <TableCell className="text-center border-e">{city.comfortScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </>
  )
}

export default Dashboard