import { MQTT_CONFIG } from "@/lib/config";
import type { MqttPublishFunction } from "@/lib/types";

const DEVICE_CONTROLS = {
  WINDOW: "MQ==",
  LIGHT: "MA==",
} as const;

interface UseDeviceControlProps {
  publish: MqttPublishFunction;
}

export function useDeviceControl({ publish }: UseDeviceControlProps) {
  const publishControlMessage = async (payload: string) => {
    try {
      const downlinkMessage = {
        downlinks: [
          {
            f_port: 1,
            frm_payload: payload,
            confirmed: true,
          },
        ],
      };
      await publish(MQTT_CONFIG.TOPICS.DEVICE_CONTROL, downlinkMessage);
    } catch (error) {
      console.error("Failed to publish control message:", error);
      throw error;
    }
  };

  const handleToggleWindow = async () => {
    await publishControlMessage(DEVICE_CONTROLS.WINDOW);
  };

  const handleToggleLight = async () => {
    await publishControlMessage(DEVICE_CONTROLS.LIGHT);
  };

  return {
    handleToggleWindow,
    handleToggleLight,
  };
}
