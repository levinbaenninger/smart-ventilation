"use client";

import { Widget } from "@/components/widget";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <section className="flex gap-2">
          <Badge variant={isOpen ? "success" : "destructive"}>
            {isOpen ? "Fenster offen" : "Fenster geschlossen"}
          </Badge>
          <Badge variant={isLightOn ? "success" : "destructive"}>
            {isLightOn ? "Licht an" : "Licht aus"}
          </Badge>
        </section>
        <section className="flex gap-4">
          <Widget title="🌡️ Temperatur" value="20°C" />
          <Widget title="💧 Luftfeuchtigkeit" value="50%" />
          <Widget title="💨 Luftqualität" value="340 ppm" />
        </section>
        <section className="w-full flex gap-4">
          <Button className="flex-1" onClick={() => setIsOpen(!isOpen)}>
            Fenster {isOpen ? "öffnen" : "schliessen"}
          </Button>
          <Button className="flex-1" onClick={() => setIsLightOn(!isLightOn)}>
            Licht {isLightOn ? "an" : "aus"}
          </Button>
        </section>
      </div>
    </div>
  );
}
