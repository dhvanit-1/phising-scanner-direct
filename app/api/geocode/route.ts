import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")

  if (!q) return NextResponse.json({ error: "No query provided" }, { status: 400 })

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=1`,
      { 
        headers: { 
          "User-Agent": "Phishing-Scanner-App",
          "Accept-Language": "en" 
        } 
      }
    )
    const data = await response.json()
    
    if (data && data.length > 0) {
      return NextResponse.json({
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      })
    }
    return NextResponse.json({ error: "Location not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}