import type { WeatherData } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useWeatherData() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    outdoorTemperature: 0,
    outdoorHumidity: 0,
    outdoorWindSpeed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("/api/weather");

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData({
          outdoorTemperature: data.temperature,
          outdoorHumidity: data.humidity,
          outdoorWindSpeed: data.windSpeed,
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000);

    return () => clearInterval(interval);
  }, []);

  return { weatherData, isLoading, error };
}
