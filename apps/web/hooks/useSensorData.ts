import { SENSOR_CONFIG } from "@/lib/config";
import { isValidSensorData, parseSensorData } from "@/lib/sensorDataParser";
import type { MqttMessage, SensorData } from "@/lib/types";
import { useCallback, useMemo, useState } from "react";
import useMqtt from "./useMqtt";

interface UseSensorDataProps {
  mqttUri: string;
  sensorTopic: string;
}

export default function useSensorData({
  mqttUri,
  sensorTopic,
}: UseSensorDataProps) {
  const [sensorData, setSensorData] = useState<SensorData>(
    SENSOR_CONFIG.DEFAULT_VALUES
  );

  const handleSensorMessage = useCallback((message: MqttMessage) => {
    const parsedData = parseSensorData(message);

    if (parsedData && isValidSensorData(parsedData)) {
      setSensorData((prev) => ({
        ...prev,
        ...parsedData,
      }));
    }
  }, []);

  // Memoize the topic handlers array to prevent recreation on every render
  const topicHandlers = useMemo(
    () => [
      {
        topic: sensorTopic,
        handler: handleSensorMessage,
      },
    ],
    [sensorTopic, handleSensorMessage]
  );

  const { connectionState, publish } = useMqtt({
    uri: mqttUri,
    topicHandlers,
  });

  const isLoading =
    sensorData.temperature === 0 &&
    sensorData.humidity === 0 &&
    sensorData.co2 === 0;

  return {
    sensorData,
    isLoading,
    connectionState,
    publish,
  };
}
