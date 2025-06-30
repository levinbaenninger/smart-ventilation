import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=47.4370506&lon=9.1333201&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return NextResponse.json({
      // temperature: Math.round(data.current.temp),
      temperature: 29,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
