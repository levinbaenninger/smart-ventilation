import type { SensorData, WeatherData } from "@/lib/types";
import { useEffect, useRef } from "react";

interface UseTemperatureControlProps {
  sensorData: SensorData;
  weatherData: WeatherData;
  isWindowOpen: boolean;
  isLightOn: boolean;
  onToggleWindow: () => void;
  onToggleLight: () => void;
}

export function useTemperatureControl({
  sensorData,
  weatherData,
  isWindowOpen,
  isLightOn,
  onToggleWindow,
  onToggleLight,
}: UseTemperatureControlProps) {
  const lastActionRef = useRef<number>(0);
  const TEMPERATURE_HYSTERESIS = 1; // 1°C buffer to prevent rapid switching

  useEffect(() => {
    const temperature = sensorData.temperature;
    const outdoorTemp = weatherData.outdoorTemperature;
    const outdoorHumidity = weatherData.outdoorHumidity;
    const now = Date.now();
    const MIN_ACTION_INTERVAL = 30000; // 30 seconds minimum between actions

    // Prevent rapid toggling
    if (now - lastActionRef.current < MIN_ACTION_INTERVAL) {
      return;
    }

    // Open window: when closed, outdoor is significantly cooler, and humidity is acceptable
    if (
      !isWindowOpen &&
      outdoorHumidity < 70 &&
      outdoorTemp < temperature - TEMPERATURE_HYSTERESIS
    ) {
      onToggleWindow();
      if (isLightOn) onToggleLight();
      lastActionRef.current = now;
    }
    // Close window: when open and outdoor is significantly warmer
    else if (
      isWindowOpen &&
      outdoorTemp > temperature + TEMPERATURE_HYSTERESIS
    ) {
      onToggleWindow();
      lastActionRef.current = now;
    }
  }, [
    sensorData.temperature,
    weatherData.outdoorHumidity,
    weatherData.outdoorTemperature,
    isWindowOpen,
    isLightOn,
  ]);
}
