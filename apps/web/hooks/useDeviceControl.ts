import { MQTT_CONFIG } from "@/lib/config";
import type { MqttPublishFunction } from "@/lib/types";

interface UseDeviceControlProps {
  publish: MqttPublishFunction;
}

export function useDeviceControl({ publish }: UseDeviceControlProps) {
  const publishControlMessage = async (topic: string) => {
    try {
      const downlinkMessage = {
        downlinks: [
          {
            f_port: 1,
            frm_payload: "MQ==",
            confirmed: true,
          },
        ],
      };
      await publish(topic, downlinkMessage);
    } catch (error) {
      console.error("Failed to publish control message:", error);
      throw error;
    }
  };

  const handleToggleWindow = async () => {
    await publishControlMessage(MQTT_CONFIG.TOPICS.WINDOW_CONTROL);
  };

  const handleToggleLight = async () => {
    await publishControlMessage(MQTT_CONFIG.TOPICS.LIGHT_CONTROL);
  };

  return {
    handleToggleWindow,
    handleToggleLight,
  };
}
