import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface WidgetProps {
  title: string;
  value: string;
}

export function Widget({ title, value }: WidgetProps) {
  return (
    <Card className="flex-1 gap-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-3xl font-semibold tracking-tight">{value}</h2>
      </CardContent>
    </Card>
  );
}

export function SkeletonWidget({ title }: { title: string }) {
  return (
    <Card className="flex-1 gap-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-20" />
      </CardContent>
    </Card>
  );
}
