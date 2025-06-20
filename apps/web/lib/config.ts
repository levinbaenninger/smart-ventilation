export const MQTT_CONFIG = {
  URI: process.env.NEXT_PUBLIC_MQTT_URI!,

  TOPICS: {
    SENSOR_DATA:
      "v3/app-iot-wuerfel-klassensatz-b@ttn/devices/eui-2024-c-39/up",
    LIGHT_SENSOR:
      "v3/app-iot-wuerfel-klassensatz-b@ttn/devices/eui-2024-c-39/up",
    WINDOW_SENSOR:
      "v3/app-iot-wuerfel-klassensatz-b@ttn/devices/eui-2024-c-08/up",
    LIGHT_CONTROL:
      "v3/app-iot-wuerfel-klassensatz-b@ttn/devices/eui-2024-c-39/down/push",
    WINDOW_CONTROL:
      "v3/app-iot-wuerfel-klassensatz-b@ttn/devices/eui-2024-c-08/down/push",
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
  CO2_MULTIPLIER: 330,

  DEFAULT_VALUES: {
    temperature: 0,
    co2: 0,
    humidity: 0,
    window: 0,
    light: 0,
    outdoorTemperature: 0,
  },
} as const;
