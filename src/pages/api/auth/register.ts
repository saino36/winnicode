import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("form")) {
        return new Response("Unsupported content type", { status: 415 });
    }

    let formData: FormData;
    try {
        formData = await request.formData();
    } catch (e) {
        return new Response("Invalid form data", { status: 400 });
    }

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return new Response("Email and password are required", { status: 400 });
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/signin",
            "Set-Cookie": `flash=Berhasil daftar! Silakan login.; Path=/; Max-Age=5; HttpOnly`,
        },
    });
};
