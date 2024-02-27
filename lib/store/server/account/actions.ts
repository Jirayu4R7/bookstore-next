"use server";

import { createClient } from "@/lib/supabase/server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { registrationSchema } from "@/app/account/ui/register-form";

const secretKey = process.env.NEXT_SECRET;
const key = new TextEncoder().encode(secretKey);
const expires_session = 60 * 60 * 1000 * 24; // 24 hours
// const expires_session = 1000 * 10; // 24 hours

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(8); // Generate a salt
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
  return hashedPassword;
}

export const createServerSupabaseClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
};

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24 hours from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

// type ResgisterPlayload = {
//   email: string;
//   fullname: string;
//   password: string;
// };
type ResgisterPlayload = z.infer<typeof registrationSchema>;
export async function resgister(playload: ResgisterPlayload) {
  // const email = formData.get("email");
  // const password: string = formData.get("password")?.toString() || "";
  // const fullName = formData.get("fullname");
  const { email, password, fullname } = playload;
  const hashedPassword = await hashPassword(password);

  // return { success: true, message: "error: " };

  const supabase = createServerSupabaseClient();
  try {
    const { error } = await supabase
      .from("user")
      .insert([{ fullname: fullname, password: hashedPassword, email: email }]);
    if (error) {
      console.error(error);
      return { success: false, error: "error: " + error?.message };
    }
    return { success: true, error: "resgister successful" };
  } catch (error) {
    return { success: false, error: "error: " };
  }
}

export async function login(formData: { email: string; password: string }) {
  // Verify credentials && get the user
  const _user = {
    // email: formData.get("email"),
    // password: formData.get("password"),
    email: formData.email,
    password: formData.password,
  };

  // console.log("_user : ", _user);
  // return { success: false, error: "Something went wrong." };
  try {
    const supabase = createServerSupabaseClient();
    let { data: user, error } = await supabase
      .from("user")
      .select("fullname,email,password,id")
      .eq("email", _user.email)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Not found user");
    }
    if (user) {
      const isValid = await bcrypt.compare(_user.password, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }
      // Create the session
      const userToJWT = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      };
      const expires = new Date(Date.now() + expires_session);
      const session = await encrypt({ user: userToJWT, expires });

      // Save the session in a cookie
      cookies().set("session", session, { expires, httpOnly: true });
      return { success: true };
    }
    return { success: false, error: "Something went wrong." };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong." };
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function fetchInfoMe(token: string) {
  try {
    const { user: userToken } = await decrypt(token);
    const { email } = userToken;
    const supabase = createServerSupabaseClient();
    if (email) {
      const { data: user, error } = await supabase
        .from("user")
        .select("fullname,email,id")
        .eq("email", email)
        .single();
      if (error) {
        console.error(error);
        throw new Error(error.message);
      }
      return user;
    } else {
      throw new Error("Not found email");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function getToken() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return session;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + expires_session);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
