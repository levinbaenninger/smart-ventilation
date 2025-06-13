import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
}

export default function useWeatherData() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        console.log(
          "OPENWEATHER_API_KEY",
          process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
        );

        const response = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=47.4370506&lon=9.1333201&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData({
          temperature: data.current.temp,
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
