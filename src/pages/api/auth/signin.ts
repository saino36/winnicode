import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
    // 1. Validate Content-Type
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/x-www-form-urlencoded") && !contentType.includes("multipart/form-data")) {
        return new Response("Unsupported content type. Please use form data.", {
            status: 415,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    // 2. Parse Form Data
    let formData: FormData;
    try {
        formData = await request.formData();
    } catch (error) {
        return new Response(JSON.stringify({
            error: "Invalid form data format"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    // 3. Validate Inputs
    const email = formData.get("email")?.toString()?.trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return new Response(JSON.stringify({
            error: "Email dan password harus diisi"
        }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    // 4. Attempt Authentication
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw error;
        }

        // 5. Set Secure Cookies
        if (data.session) {
            cookies.set("sb-access-token", data.session.access_token, {
                path: "/",
                secure: import.meta.env.PROD, // HTTPS only in production
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
            });

            cookies.set("sb-refresh-token", data.session.refresh_token, {
                path: "/",
                secure: import.meta.env.PROD,
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });
        }

        // 6. Successful Login
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/dashboard", // Redirect to dashboard instead of home
                "Set-Cookie": `flash=${encodeURIComponent("Login berhasil!")}; Path=/; Max-Age=5; HttpOnly`,
            },
        });

    } catch (error) {
        // 7. Handle Authentication Errors
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/signin",
                "Set-Cookie": `flash=${encodeURIComponent("Login gagal: " + (error as Error).message)}; Path=/; Max-Age=5; HttpOnly`,
            },
        });
    }
};