export interface SensorData {
  temperature: number;
  co2: number;
  humidity: number;
  outdoorTemperature: number;
}

export interface ActorData {
  window: number; // 0 or 1 (digital)
  light: number; // 0 or 1 (digital)
}

export interface DeviceData extends SensorData, ActorData {}

export interface DecodedPayload {
  analog_in_1?: number; // Temperature sensor
  analog_in_2?: number; // CO2 sensor
  analog_in_3?: number; // Humidity sensor
  digital_in_4?: number; // Light actor (0 or 1)
  digital_in_5?: number; // Window actor (0 or 1)
}

export interface UplinkMessage {
  decoded_payload?: DecodedPayload;
}

export interface MqttMessage {
  topic: string;
  payload: {
    uplink_message?: UplinkMessage;
    raw?: string;
    buffer?: number[];
    length?: number;
  };
  timestamp: string;
}

export interface MqttTopicHandler {
  topic: string;
  handler: (message: MqttMessage) => void;
}

export interface MqttConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export type MqttPublishFunction = (
  topic: string,
  message: any
) => Promise<void>;
