import type { SensorData, WeatherData } from "@/lib/types";
import { useEffect } from "react";

interface UseTemperatureControlProps {
  sensorData: SensorData;
  weatherData: WeatherData;
  isWindowOpen: boolean;
  isLightOn: boolean;
  onToggleWindow: () => void;
  onToggleLight: () => void;
  highThreshold?: number;
  lowThreshold?: number;
}

export function useTemperatureControl({
  sensorData,
  weatherData,
  isWindowOpen,
  isLightOn,
  onToggleWindow,
  onToggleLight,
  highThreshold = 25,
  lowThreshold = 21,
}: UseTemperatureControlProps) {
  useEffect(() => {
    const temperature = sensorData.temperature;

    if (
      temperature >= highThreshold &&
      !isWindowOpen &&
      weatherData.outdoorHumidity < 70 &&
      weatherData.outdoorTemperature < temperature
    ) {
      onToggleWindow();
      if (isLightOn) onToggleLight();
    } else if (temperature <= lowThreshold && isWindowOpen) {
      onToggleWindow();
      if (!isLightOn) onToggleLight();
    }
  }, [
    sensorData.temperature,
    weatherData.outdoorHumidity,
    weatherData.outdoorTemperature,
    isWindowOpen,
    isLightOn,
    highThreshold,
    lowThreshold,
    onToggleWindow,
    onToggleLight,
  ]);
}
