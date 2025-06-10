import { SENSOR_CONFIG } from "./config";
import type { MqttMessage, SensorData } from "./types";

export const parseSensorData = (
  message: MqttMessage
): Partial<SensorData> | null => {
  try {
    const decoded = message.payload?.uplink_message?.decoded_payload;
    if (!decoded) return null;

    const sensorData: Partial<SensorData> = {};

    if (typeof decoded.analog_in_2 === "number") {
      sensorData.temperature = decoded.analog_in_2;
    }

    if (typeof decoded.analog_in_3 === "number") {
      sensorData.humidity = decoded.analog_in_3;
    }

    if (typeof decoded.analog_in_1 === "number") {
      sensorData.co2 = Math.round(
        decoded.analog_in_1 * SENSOR_CONFIG.CO2_MULTIPLIER
      );
    }

    return sensorData;
  } catch (error) {
    console.error("Error parsing sensor data:", error);
    return null;
  }
};

export const isValidSensorData = (data: Partial<SensorData>): boolean => {
  return !!(data.temperature || data.humidity || data.co2);
};
