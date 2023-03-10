import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsession",
  password: "2zio90asj12-4f7818903g7d0qasudc08v7a21-0asduhc890",
};
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, {
    cookieName: "carrotsession",
    password: "2zio90asj12-4f7818903g7d0qasudc08v7a21-0asduhc890",
    ttl: 99999999,
  });
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOptions);
}
