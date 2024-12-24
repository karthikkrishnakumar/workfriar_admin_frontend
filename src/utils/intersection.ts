  import Iron from "@hapi/iron";
  import {  serialize } from "cookie";
  import { NextRequest, NextResponse } from "next/server";

  const IntersectionSecret: string = process.env.INTERSECTION_SECRET
    ? process.env.INTERSECTION_SECRET
    : "<<<<<++++random++++secret++++string++++>>>>>>";
  const IntersectionAge: number = process.env.INTERSECTION_AGE
    ? +process.env.INTERSECTION_AGE
    : 60 * 60 * 24 * 1000; // seconds * minute * hour * 1000;
  const IntersectionCookie: string = process.env.INTERSECTION_COOKIE
    ? process.env.INTERSECTION_COOKIE
    : "workfriar_intersection";

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
  export async function encode(jsonData: Record<string, string>): Promise<string> {
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
   * Create a cookie object to be saved
   * @param cookieData : data to be embedded in cookie
   * @returns cookie
   */
  export function createCookie(cookieData: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const cookie = serialize(IntersectionCookie, cookieData, {
      maxAge: IntersectionAge / 1000,
      expires: new Date(Date.now() + IntersectionAge),
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
      domain: '.localhost'
    });
    return cookie;
  }

  /**
   * Create a cookie object to clear the cookie
   * @returns cookie
   */
  function createClearCookie(cookieName: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const cookie = serialize(cookieName, "", {
      maxAge: -1,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: "/",
      domain: '.localhost'
    });
    // TODO: implement below mentioned logic on later.
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: 'lax',

    return cookie;
  }

  /**
   * Retrieve intersection cookie (IntersectionCookie) from the given request
   * @param request
   * @returns
   */
  export async function getCookie(request: NextRequest): Promise<encryptData> {
    const cookies = request.cookies;
    const encodedCookie = cookies.get(IntersectionCookie)?.value; // Accessing the 'value' property

    if (!encodedCookie) {
      throw new Error("Cookie not found");
    }

    const decodedCookie: encryptData = await decode(encodedCookie);
    return decodedCookie;
  }


  /**
   * Set cookie on the given response
   * @param response: NextResponse
   * @param cookieData: Record<string, string>
   * @returns
   */
  export async function setCookie(
    response: NextResponse,
    cookieData: Record<string, string>
  ): Promise<NextResponse> {
    console.log("entered cookie................................")
    const encryptedCookieData = await encode(cookieData);
    const cookie: string = createCookie(encryptedCookieData);
    response.headers.set("Set-Cookie", cookie); // Use headers.set for NextResponse

    return response;
  }

  /**
   * Reset cookie on the given response
   * @param response: NextResponse
   */
  export function resetCookie(response: NextResponse): NextResponse {
    const cookie: string = createClearCookie(IntersectionCookie);
    response.headers.set("Set-Cookie", cookie); // Use headers.set for NextResponse
    return response;
  }
