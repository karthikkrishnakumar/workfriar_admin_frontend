import Iron from "@hapi/iron";
import { parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const IntersectionSecret: string = process.env.INTERSECTION_SECRET
  ? process.env.INTERSECTION_SECRET
  : "<<<<<++++random++++secret++++string++++>>>>>>";
const IntersectionAge: number = process.env.INTERSECTION_AGE
  ? +process.env.INTERSECTION_AGE
  : 60 * 60 * 24 * 1000; // seconds * minute * hour * 1000;
const IntersectionCookie: string = process.env.INTERSECTION_COOKIE
  ? process.env.INTERSECTION_COOKIE
  : "soezy_intersection";

/**
 * Interface for cookie data encryption
 */
interface encryptData {
  data: Record<string, string>;
  createdAt: number;
  maxAge: number;
}

/**
 * Encrypt the given data using hapi/iron
 * @param jsonData : data to be encrypted
 * @returns encodeObject
 */
async function encode(jsonData: Record<string, string>): Promise<string> {
  const createdAt = Date.now();
  // Create an encoded object with a max age that we can validate later for expiry
  const finalObject: encryptData = {
    data: jsonData,
    createdAt: createdAt,
    maxAge: IntersectionAge,
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const encodeObject: string = await Iron.seal(
    finalObject,
    IntersectionSecret,
    Iron.defaults
  );
  return encodeObject;
}

/**
 * Decrypt the given data using hapi/iron
 * @param encodeObject : Encrypted data by hapi/iron
 * @returns decodeObject
 */
async function decode(encodeObject: string): Promise<encryptData> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const decodeObject: encryptData = await Iron.unseal(
    encodeObject,
    IntersectionSecret,
    Iron.defaults
  );
  const expiresAt = decodeObject.createdAt + decodeObject.maxAge;
  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error("Encoded Object is expired");
  }
  return decodeObject;
}

/**
 * Create a cookie object to be save
 * @param cookieData : data to be embedded in cookie
 * @returns cookie
 */
function createCookie(cookieData: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const cookie = serialize(IntersectionCookie, cookieData, {
    maxAge: IntersectionAge / 1000,
    expires: new Date(Date.now() + IntersectionAge),
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "none",
  });
  // TODO: implement below mentioned logic on later.
  // secure: process.env.NODE_ENV === 'production',
  // sameSite: 'lax',
  return cookie;
}

/**
 * Create a cookie object to be clear
 * @returns cookie
 */
function createClearCookie(cookieName: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const cookie = serialize(cookieName, "", {
    maxAge: -1,
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "none",
  });
  return cookie;
}

/**
 * retrive intersection cookie (IntersectionCookie) from given request
 * @param request
 * @returns
 */
export async function getCookie(request: NextApiRequest): Promise<encryptData> {
  let cookies: Partial<{ [key: string]: string }>;
  if (request.cookies) {
    cookies = request.cookies;
  } else {
    const cookie: string = request.headers?.cookie as string;
    cookies = parse(cookie || "");
  }
  const encodedCookie: string = cookies[IntersectionCookie] as string;
  const decodedCookie: encryptData = await decode(encodedCookie);
  return decodedCookie;
}

/**
 * Set cookie on the given request
 * @param response:NextApiResponse
 * @param cookieData:Record<string,string>
 * @returns
 */
export async function setCookie(
  response: NextApiResponse,
  cookieData: Record<string, string>
): Promise<NextApiResponse> {
  const encryptedCookieData = await encode(cookieData);
  const cookie: string = createCookie(encryptedCookieData);
  response.setHeader("Set-Cookie", cookie);
  return response;
}

/**
 * Reset cookie on the given request
 * @param response :NextApiResponse
 */
export function resetCookie(response: NextApiResponse): NextApiResponse {
  const cookie: string = createClearCookie(IntersectionCookie);
  response.setHeader("Set-Cookie", cookie);
  return response;
}
