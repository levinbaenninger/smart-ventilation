import type { SensorData } from "@/lib/types";

interface UseTransformedDataProps {
  sensorData: Pick<SensorData, "temperature" | "co2" | "humidity">;
  weatherData: { temperature: number };
}

export function useTransformedData({
  sensorData,
  weatherData,
}: UseTransformedDataProps): SensorData {
  const transformedData: SensorData = {
    temperature: sensorData.temperature,
    outdoorTemperature: weatherData.temperature,
    co2: sensorData.co2,
    humidity: sensorData.humidity,
  };

  return transformedData;
}
