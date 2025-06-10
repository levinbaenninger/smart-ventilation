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
    key: "temperature",
    title: "🌡️ Temperatur",
    formatValue: (value) => `${value}°C`,
  },
  {
    key: "humidity",
    title: "💧 Luftfeuchtigkeit",
    formatValue: (value) => `${value}%`,
  },
  {
    key: "co2",
    title: "💨 Luftqualität",
    formatValue: (value) => `${value} ppm`,
  },
];

export function SensorDashboard({
  sensorData,
  isLoading,
  sensors = DEFAULT_SENSORS,
}: SensorDashboardProps) {
  return (
    <section className={`w-full flex gap-4`}>
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
  return (
    sensorData.temperature === 0 &&
    sensorData.humidity === 0 &&
    sensorData.co2 === 0
  );
}
