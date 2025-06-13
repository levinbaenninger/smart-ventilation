export const MQTT_CONFIG = {
  URI: process.env.NEXT_PUBLIC_MQTT_URI!,

  TOPICS: {
    SENSOR_DATA:
      "v3/app-iot-wuerfel-klassensatz-b@ttn/devices/eui-2024-c-39/up",
    DEVICE_CONTROL:
      "v3/app-iot-wuerfel-klassensatz-b@ttn/devices/eui-2024-c-39/down/push",
  },

  OPTIONS: {
    keepalive: 60,
    clientId: `mqtt_${Math.random().toString(16).substr(2, 8)}`,
    protocolVersion: 4,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    clean: true,
  },
} as const;

export const SENSOR_CONFIG = {
  DEFAULT_VALUES: {
    temperature: 0,
    window: 0,
    light: 0,
  },
} as const;
