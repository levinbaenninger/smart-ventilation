"use client";

import { SmartVentilationDashboard } from "@/components/smart-ventilation-dashboard";
import { useDeviceControl } from "@/hooks/useDeviceControl";
import useSensorData from "@/hooks/useSensorData";
import { useTransformedData } from "@/hooks/useTransformedData";
import useWeatherData from "@/hooks/useWeatherData";
import { MQTT_CONFIG } from "@/lib/config";

export default function Page() {
  const {
    sensorData: sensorDataRaw,
    actorData,
    connectionState,
    publish,
  } = useSensorData({
    mqttUri: MQTT_CONFIG.URI,
    sensorTopic: MQTT_CONFIG.TOPICS.SENSOR_DATA,
    lightSensorTopic: MQTT_CONFIG.TOPICS.LIGHT_SENSOR,
    windowSensorTopic: MQTT_CONFIG.TOPICS.WINDOW_SENSOR,
  });

  const { weatherData } = useWeatherData();
  const { handleToggleWindow, handleToggleLight } = useDeviceControl({
    publish,
  });
  const sensorData = useTransformedData({
    sensorData: sensorDataRaw,
    weatherData,
  });

  return (
    <SmartVentilationDashboard
      sensorData={sensorData}
      isWindowOpen={actorData.window === 1}
      isLightOn={actorData.light === 1}
      connectionState={connectionState}
      onToggleWindow={handleToggleWindow}
      onToggleLight={handleToggleLight}
    />
  );
}
