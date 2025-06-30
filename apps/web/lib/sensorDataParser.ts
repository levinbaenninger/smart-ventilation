import type { DeviceData, MqttMessage } from "./types";

export const parseSensorData = (
  message: MqttMessage
): Partial<DeviceData> | null => {
  try {
    const decoded = message.payload?.uplink_message?.decoded_payload;
    if (!decoded) return null;

    const deviceData: Partial<DeviceData> = {};

    if (typeof decoded.analog_in_1 === "number") {
      deviceData.temperature = decoded.analog_in_1;
    }

    if (typeof decoded.analog_in_2 === "number") {
      deviceData.co2 = decoded.analog_in_2;
    }

    if (typeof decoded.digital_in_4 === "number") {
      deviceData.light = decoded.digital_in_4;
    }

    if (typeof decoded.digital_in_5 === "number") {
      deviceData.window = decoded.digital_in_5;
    }

    return deviceData;
  } catch (error) {
    console.error("Error parsing sensor data:", error);
    return null;
  }
};

export const isValidSensorData = (data: Partial<DeviceData>): boolean => {
  return !!(
    data.temperature !== undefined ||
    data.co2 !== undefined ||
    data.outdoorTemperature !== undefined ||
    data.outdoorWindSpeed !== undefined ||
    data.window !== undefined ||
    data.light !== undefined
  );
};
