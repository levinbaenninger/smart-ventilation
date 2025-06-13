import type { SensorData } from "@/lib/types";

interface UseTransformedDataProps {
  sensorData: Pick<SensorData, "temperature">;
  weatherData: { temperature: number };
}

export function useTransformedData({
  sensorData,
  weatherData,
}: UseTransformedDataProps): SensorData {
  const transformedData: SensorData = {
    temperature: sensorData.temperature,
    outdoorTemperature: weatherData.temperature,
  };

  return transformedData;
}
