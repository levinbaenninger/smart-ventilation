import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

interface Props {
  title: string;
  value: string;
}

export function Widget({ title, value }: Props) {
  return (
    <Card className="w-50 gap-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {value}
        </h2>
      </CardContent>
    </Card>
  );
}
