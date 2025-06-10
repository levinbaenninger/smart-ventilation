"use client";

import { SmartVentilationDashboard } from "@/components/smart-ventilation-dashboard";
import useSensorData from "@/hooks/useSensorData";
import { MQTT_CONFIG } from "@/lib/config";
import { useState } from "react";

export default function Page() {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);

  const { sensorData, connectionState, publish } = useSensorData({
    mqttUri: MQTT_CONFIG.URI,
    sensorTopic: MQTT_CONFIG.TOPICS.SENSOR_DATA,
  });

  const handleToggleWindow = () => {
    setIsWindowOpen(!isWindowOpen);
    // TODO: Publish window control message
    // publishMessage(MQTT_CONFIG.TOPICS.DEVICE_CONTROL, { window: !isOpen });
  };

  const handleToggleLight = () => {
    setIsLightOn(!isLightOn);
    // TODO: Publish light control message
    // publishMessage(MQTT_CONFIG.TOPICS.DEVICE_CONTROL, { light: !isLightOn });
  };

  const publishMessage = async (topic: string, message: object) => {
    try {
      await publish(topic, message);
    } catch (error) {
      console.error("Failed to publish message:", error);
    }
  };

  return (
    <SmartVentilationDashboard
      sensorData={sensorData}
      isWindowOpen={isWindowOpen}
      isLightOn={isLightOn}
      connectionState={connectionState}
      onToggleWindow={handleToggleWindow}
      onToggleLight={handleToggleLight}
    />
  );
}
