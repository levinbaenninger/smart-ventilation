"use client";

import { SmartVentilationDashboard } from "@/components/smart-ventilation-dashboard";
import useSensorData from "@/hooks/useSensorData";
import { MQTT_CONFIG } from "@/lib/config";

export default function Page() {
  const { sensorData, actorData, connectionState, publish } = useSensorData({
    mqttUri: MQTT_CONFIG.URI,
    sensorTopic: MQTT_CONFIG.TOPICS.SENSOR_DATA,
  });

  const handleToggleWindow = async () => {
    await publishControlMessage();
  };

  const handleToggleLight = async () => {
    await publishControlMessage();
  };

  const publishControlMessage = async () => {
    try {
      const downlinkMessage = {
        downlinks: [
          {
            f_port: 1,
            frm_payload: "AQ==",
            confirmed: true,
          },
        ],
      };

      await publish(MQTT_CONFIG.TOPICS.DEVICE_CONTROL, downlinkMessage);
    } catch (error) {
      console.error("Failed to publish control message:", error);
    }
  };

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
