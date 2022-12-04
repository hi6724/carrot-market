import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest, ev: NextFetchEvent) {
  // const url = request.nextUrl.clone();
  // url.pathname = "/";
  // return NextResponse.rewrite(url);
}
