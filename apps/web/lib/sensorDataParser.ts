import { SENSOR_CONFIG } from "./config";
import type { DeviceData, MqttMessage } from "./types";

export const parseSensorData = (
  message: MqttMessage
): Partial<DeviceData> | null => {
  try {
    const decoded = message.payload?.uplink_message?.decoded_payload;
    if (!decoded) return null;

    const deviceData: Partial<DeviceData> = {};

    if (typeof decoded.analog_in_1 === "number") {
      deviceData.co2 = Math.round(
        decoded.analog_in_1 * SENSOR_CONFIG.CO2_MULTIPLIER
      );
    }

    if (typeof decoded.analog_in_2 === "number") {
      deviceData.temperature = decoded.analog_in_2;
    }

    if (typeof decoded.analog_in_3 === "number") {
      deviceData.humidity = decoded.analog_in_3;
    }

    if (typeof decoded.digital_in_1 === "number") {
      deviceData.window = decoded.digital_in_1;
    }

    if (typeof decoded.digital_in_2 === "number") {
      deviceData.light = decoded.digital_in_2;
    }

    return deviceData;
  } catch (error) {
    console.error("Error parsing sensor data:", error);
    return null;
  }
};

export const isValidSensorData = (data: Partial<DeviceData>): boolean => {
  return !!(
    data.temperature ||
    data.humidity ||
    data.co2 ||
    data.window ||
    data.light
  );
};
