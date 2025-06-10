import { Button } from "@workspace/ui/components/button";

interface ControlAction {
  id: string;
  label: string;
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  onClick: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
}

interface ControlPanelProps {
  actions: ControlAction[];
  orientation?: "horizontal" | "vertical";
}

export function ControlPanel({
  actions,
  orientation = "horizontal",
}: ControlPanelProps) {
  const orientationClass = orientation === "vertical" ? "flex-col" : "";

  return (
    <section className={`w-full flex gap-4 ${orientationClass}`}>
      {actions.map((action) => (
        <Button
          key={action.id}
          className="flex-1"
          variant={action.variant || "default"}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {action.isActive
            ? action.activeLabel || action.label
            : action.inactiveLabel || action.label}
        </Button>
      ))}
    </section>
  );
}

interface DeviceControlPanelProps {
  isWindowOpen: boolean;
  isLightOn: boolean;
  onToggleWindow: () => void;
  onToggleLight: () => void;
  disabled?: boolean;
}

export function DeviceControlPanel({
  isWindowOpen,
  isLightOn,
  onToggleWindow,
  onToggleLight,
  disabled = false,
}: DeviceControlPanelProps) {
  const actions: ControlAction[] = [
    {
      id: "window",
      label: "Fenster",
      isActive: isWindowOpen,
      activeLabel: "Fenster schliessen",
      inactiveLabel: "Fenster öffnen",
      onClick: onToggleWindow,
      disabled,
    },
    {
      id: "light",
      label: "Licht",
      isActive: isLightOn,
      activeLabel: "Licht aus",
      inactiveLabel: "Licht an",
      onClick: onToggleLight,
      disabled,
    },
  ];

  return <ControlPanel actions={actions} />;
}
