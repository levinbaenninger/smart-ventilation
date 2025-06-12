import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { AlertCircleIcon } from "lucide-react";

export function ConnectionAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Vom IoT-Cube getrennt</AlertTitle>
      <AlertDescription>
        Bitte überprüfe deine Verbindung zum IoT-Cube und versuche es erneut.
      </AlertDescription>
    </Alert>
  );
}
