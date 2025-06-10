import { Widget } from "@/components/widget";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Willkommen zurück!
        </h1>
        <section className="flex flex-1 gap-4">
          <Widget title="🌡️ Temperatur" value="20°C" />
          <Widget title="💧 Luftfeuchtigkeit" value="50%" />
          <Widget title="💨 Luftqualität" value="340 ppm" />
        </section>
      </div>
    </div>
  );
}
