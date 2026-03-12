import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 300;

const GRAPH_API = "https://graph.facebook.com/v21.0";

export type InstagramMedia = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
};

export async function GET() {
  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!userId || !token) {
    return NextResponse.json(
      { error: "Instagram not configured", media: [] },
      { status: 200 }
    );
  }

  try {
    const url = `${GRAPH_API}/${userId}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${encodeURIComponent(token)}&limit=25`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      console.error("Instagram API error:", data.error);
      return NextResponse.json(
        { error: data.error.message || "Instagram API error", media: [] },
        { status: 200 }
      );
    }

    const media: InstagramMedia[] = (data.data || []).filter(
      (m: InstagramMedia) =>
        m.media_type === "IMAGE" ||
        m.media_type === "VIDEO" ||
        m.media_type === "CAROUSEL_ALBUM"
    );

    return NextResponse.json({ media });
  } catch (e) {
    console.error("Instagram fetch error:", e);
    return NextResponse.json(
      { error: "Failed to fetch Instagram", media: [] },
      { status: 200 }
    );
  }
}
