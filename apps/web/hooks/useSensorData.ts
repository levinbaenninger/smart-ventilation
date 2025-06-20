import { SENSOR_CONFIG } from "@/lib/config";
import { isValidSensorData, parseSensorData } from "@/lib/sensorDataParser";
import type { DeviceData, MqttMessage } from "@/lib/types";
import { useCallback, useMemo, useState } from "react";
import useMqtt from "./useMqtt";

interface UseSensorDataProps {
  mqttUri: string;
  sensorTopic: string;
  lightSensorTopic: string;
  windowSensorTopic: string;
}

export default function useSensorData({
  mqttUri,
  sensorTopic,
  lightSensorTopic,
  windowSensorTopic,
}: UseSensorDataProps) {
  const [deviceData, setDeviceData] = useState<DeviceData>(
    SENSOR_CONFIG.DEFAULT_VALUES
  );

  const handleSensorMessage = useCallback((message: MqttMessage) => {
    const parsedData = parseSensorData(message);

    if (parsedData && isValidSensorData(parsedData)) {
      setDeviceData((prev) => ({
        ...prev,
        ...parsedData,
      }));
    }
  }, []);

  const handleWindowMessage = useCallback((message: MqttMessage) => {
    const parsedData = parseSensorData(message);

    if (parsedData && isValidSensorData(parsedData)) {
      setDeviceData((prev) => ({
        ...prev,
        window: parsedData.window ?? 0,
      }));
    }
  }, []);

  const topicHandlers = useMemo(
    () => [
      {
        topic: sensorTopic,
        handler: handleSensorMessage,
      },
      {
        topic: lightSensorTopic,
        handler: handleSensorMessage,
      },
      {
        topic: windowSensorTopic,
        handler: handleWindowMessage,
      },
    ],
    [sensorTopic, lightSensorTopic, windowSensorTopic, handleSensorMessage]
  );

  const { connectionState, publish } = useMqtt({
    uri: mqttUri,
    topicHandlers,
  });

  const isLoading =
    deviceData.temperature === 0 &&
    deviceData.co2 === 0 &&
    deviceData.humidity === 0 &&
    deviceData.window === 0 &&
    deviceData.light === 0;

  return {
    sensorData: {
      temperature: deviceData.temperature,
      co2: deviceData.co2,
      humidity: deviceData.humidity,
    },
    actorData: {
      window: deviceData.window,
      light: deviceData.light,
    },
    deviceData,
    isLoading,
    connectionState,
    publish,
  };
}
