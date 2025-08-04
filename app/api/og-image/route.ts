import { NextRequest, NextResponse } from "next/server";
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr('content') ||
                    $('meta[name="og:image"]').attr('content') ||
                    null;

    return NextResponse.json({ ogImage });
  } catch (error) {
    console.error("fetch-og 에러:", error);
    return NextResponse.json({ ogImage: null }, { status: 500 });
  }
}