import type { MqttConnectionState, SensorData } from "@/lib/types";
import { ConnectionAlert } from "./connection-alert";
import { DeviceControlPanel } from "./control-panel";
import { OutdoorDataDashboard } from "./outdoor-data-dashboard";
import { SensorDashboard, useSensorLoading } from "./sensor-dashboard";
import { DeviceStatusBadges } from "./status-badges";

interface SmartVentilationDashboardProps {
  sensorData: SensorData;
  isWindowOpen: boolean;
  isLightOn: boolean;
  connectionState: MqttConnectionState;
  onToggleWindow: () => void;
  onToggleLight: () => void;
}

export function SmartVentilationDashboard({
  sensorData,
  isWindowOpen,
  isLightOn,
  connectionState,
  onToggleWindow,
  onToggleLight,
}: SmartVentilationDashboardProps) {
  const isLoading = useSensorLoading(sensorData);
  const isDisconnected = !connectionState.isConnected;

  return (
    <div className={`flex items-center justify-center min-h-svh`}>
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-4xl px-4">
        <DeviceStatusBadges isWindowOpen={isWindowOpen} isLightOn={isLightOn} />

        <SensorDashboard sensorData={sensorData} isLoading={isLoading} />
        <OutdoorDataDashboard sensorData={sensorData} isLoading={isLoading} />

        <DeviceControlPanel
          isWindowOpen={isWindowOpen}
          isLightOn={isLightOn}
          onToggleWindow={onToggleWindow}
          onToggleLight={onToggleLight}
          disabled={isDisconnected}
        />

        {isDisconnected && <ConnectionAlert />}
      </div>
    </div>
  );
}
