import { Badge } from "@workspace/ui/components/badge";

interface StatusItem {
  id: string;
  label: string;
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

interface StatusBadgesProps {
  items: StatusItem[];
}

export function StatusBadges({ items }: StatusBadgesProps) {
  return (
    <section className={`flex gap-2`}>
      {items.map((item) => (
        <Badge
          key={item.id}
          variant={item.isActive ? "success" : "destructive"}
        >
          {item.isActive
            ? item.activeLabel || item.label
            : item.inactiveLabel || item.label}
        </Badge>
      ))}
    </section>
  );
}

interface DeviceStatusBadgesProps {
  isWindowOpen: boolean;
  isLightOn: boolean;
}

export function DeviceStatusBadges({
  isWindowOpen,
  isLightOn,
}: DeviceStatusBadgesProps) {
  const statusItems: StatusItem[] = [
    {
      id: "window",
      label: "Fenster",
      isActive: isWindowOpen,
      activeLabel: "Fenster offen",
      inactiveLabel: "Fenster geschlossen",
    },
    {
      id: "light",
      label: "Licht",
      isActive: isLightOn,
      activeLabel: "Licht an",
      inactiveLabel: "Licht aus",
    },
  ];

  return <StatusBadges items={statusItems} />;
}
