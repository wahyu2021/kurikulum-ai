import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});

const requestSchema = z.object({
    topic: z
        .string()
        .min(3, "Topik minimal 3 karakter")
        .max(100, "Topik maksimal 100 karakter"),
    level: z.enum(["Pemula", "Menengah", "Mahir"]),
});

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

    const { success, limit, remaining } = await ratelimit.limit(ip);

    if (!success) {
        const response = new NextResponse("Terlalu banyak permintaan.", {
            status: 429,
        });
        response.headers.set("X-RateLimit-Limit", limit.toString());
        response.headers.set("X-RateLimit-Remaining", remaining.toString());

        return response;
    }

    try {
        const body = await req.json();

        // Validasi body request
        const validationResult = requestSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Input tidak valid.",
                    details: validationResult.error.flatten(),
                },
                { status: 400 }
            );
        }

        const { topic, level } = validationResult.data;

        if (!process.env.GEMINI_API_KEY) {
            console.error("FATAL ERROR: GEMINI_API_KEY tidak ditemukan.");
            return NextResponse.json(
                { error: "Konfigurasi server tidak lengkap." },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: process.env.MODEL_NAME || "gemini-1.5-flash",
        });

        const prompt = `
          Anda adalah mentor ahli. Buatkan roadmap belajar untuk topik: "${topic}" level: "${level}".
          Berikan output HANYA dalam format JSON yang valid, tanpa teks tambahan.
          Strukturnya: {"roadmapTitle":"...","description":"...","modules":[{"moduleTitle":"...","objective":"...","topics":["..."]}]}
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const textFromAI = response.text();

        const startIndex = textFromAI.indexOf("{");
        const endIndex = textFromAI.lastIndexOf("}");
        const jsonString = textFromAI.substring(startIndex, endIndex + 1);

        const roadmapData = JSON.parse(jsonString);
        return NextResponse.json(roadmapData);
    } catch (error) {
        console.error("[API Route Error]", error);
        return NextResponse.json(
            { error: "Terjadi kesalahan internal pada server." },
            { status: 500 }
        );
    }
}
