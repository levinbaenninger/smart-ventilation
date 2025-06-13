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
        const response = await fetch("/api/weather");

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData({
          temperature: data.temperature,
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
