import type { SensorData } from "@/lib/types";
import { SkeletonWidget, Widget } from "./widget";

interface SensorConfig {
  key: keyof SensorData;
  title: string;
  formatValue: (value: number) => string;
  icon?: string;
}

interface SensorDashboardProps {
  sensorData: SensorData;
  isLoading: boolean;
  sensors?: SensorConfig[];
}

const DEFAULT_SENSORS: SensorConfig[] = [
  {
    key: "outdoorTemperature",
    title: "🌡️ Aussentemperatur",
    formatValue: (value) => `${value}°C`,
  },
  {
    key: "outdoorHumidity",
    title: "💧 Aussenluftfeuchtigkeit",
    formatValue: (value) => `${value}%`,
  },
  {
    key: "outdoorWindSpeed",
    title: "🌬️ Windgeschwindigkeit",
    formatValue: (value) => `${value}m/s`,
  },
];

export function OutdoorDataDashboard({
  sensorData,
  isLoading,
  sensors = DEFAULT_SENSORS,
}: SensorDashboardProps) {
  return (
    <section className={`w-full flex flex-col sm:flex-row gap-4`}>
      {isLoading
        ? sensors.map((sensor) => (
            <SkeletonWidget key={sensor.key} title={sensor.title} />
          ))
        : sensors.map((sensor) => (
            <Widget
              key={sensor.key}
              title={sensor.title}
              value={sensor.formatValue(sensorData[sensor.key])}
            />
          ))}
    </section>
  );
}

export function useSensorLoading(sensorData: SensorData): boolean {
  return sensorData.temperature === 0;
}
