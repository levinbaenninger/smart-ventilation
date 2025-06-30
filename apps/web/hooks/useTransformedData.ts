import type { SensorData, WeatherData } from "@/lib/types";

interface UseTransformedDataProps {
  sensorData: Pick<SensorData, "temperature" | "co2">;
  weatherData: WeatherData;
}

export function useTransformedData({
  sensorData,
  weatherData,
}: UseTransformedDataProps): SensorData {
  const transformedData: SensorData = {
    temperature: sensorData.temperature,
    co2: sensorData.co2,
    outdoorTemperature: weatherData.outdoorTemperature,
    outdoorHumidity: weatherData.outdoorHumidity,
    outdoorWindSpeed: weatherData.outdoorWindSpeed,
  };

  return transformedData;
}
