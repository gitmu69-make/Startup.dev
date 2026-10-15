import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS, PROJECTS, RESEARCH_PAPERS, BLOG_POSTS, FOUNDER_DATA } from "@/lib/data";

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in the server environment configuration.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Format ADVMLabs context for injection into System Instructions
const ADVMLABS_CONTEXT = `
ABOUT ADVMLABS:
ADVMLabs is a specialized research laboratory and engineering house focused on constructing real, useful, high-impact machine learning and intelligent systems that operate seamlessly under real-world infrastructure constraints, particularly in sub-Saharan Africa. The headquarters are located in Accra, Ghana.

FOUNDER PROFILE:
Name: ${FOUNDER_DATA.name}
Title: ${FOUNDER_DATA.title}
Bio: ${FOUNDER_DATA.bio}
Prior to ADVMLabs, Mujahid spent years analyzing geospatial datasets, configuring machine learning engines, and engineering cloud-scale software. He represents the core commitment of ADVMLabs: constructing tangible tools that bypass tech larping and solve tangible problems.
Founder's Email: adambansi051@gmail.com
Founder's LinkedIn: https://linkedin.com/in/mujahid-adam
Founder's GitHub: https://github.com/mujahid-adam

ADVMLABS PRODUCTS:
${PRODUCTS.map(
  (p, idx) => `
PRODUCT #${idx + 1}: ${p.title} (${p.status})
Tagline: ${p.tagline}
Description: ${p.description}
Key Features:
${p.features.map((f) => `  - ${f}`).join("\n")}
Metrics:
${p.metrics?.map((m) => `  - ${m.label}: ${m.value}`).join("\n") || "  - N/A"}
`
).join("\n")}

ADVMLABS DEPLOYED PROJECTS:
${PROJECTS.map(
  (p, idx) => `
PROJECT #${idx + 1}: ${p.title} (${p.status})
Category: ${p.category}
Description: ${p.description}
Technologies Used: ${p.technologies.join(", ")}
Case Study: ${p.caseStudyTitle}
Case Study Summary: ${p.caseStudySummary}
`
).join("\n")}

ADVMLABS RESEARCH PAPERS:
${RESEARCH_PAPERS.map(
  (paper, idx) => `
RESEARCH PAPER #${idx + 1}: "${paper.title}"
Domain: ${paper.domain}
Authors: ${paper.authors.join(", ")}
Published In: ${paper.publishedIn || "ADVMLabs Publishing Hub"} (${paper.date})
Abstract: ${paper.abstract}
Tags: ${paper.tags.join(", ")}
`
).join("\n")}

ADVMLABS BLOG POSTS & INSIGHTS:
${BLOG_POSTS.map(
  (post, idx) => `
BLOG POST #${idx + 1}: "${post.title}"
Category: ${post.category} | Published: ${post.publishedAt} | Read Time: ${post.readTime}
Summary: ${post.summary}
`
).join("\n")}
`;

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode = "general" } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "A valid prompt string is required." }, { status: 400 });
    }

    const ai = getAiClient();

    // Map requested modes to correct models and configurations as specified by instructions
    let modelName = "gemini-3.5-flash"; // Default general model
    const config: any = {
      systemInstruction: `You are the ADVMLabs Intelligence Hub Analyst, an elite AI assistant trained on the technical systems, research papers, and products of ADVMLabs (founded by Mujahid Adam).
ADVMLabs is focused on constructing real, useful, high-impact machine learning systems that operate seamlessly under real-world infrastructure constraints in West Africa (HQ in Accra, Ghana).

Here is the authoritative context about ADVMLabs:
${ADVMLABS_CONTEXT}

When users ask about ADVMLabs, use the provided context to answer precisely, with architectural depth and technical precision.
If they ask you to perform other general tasks, you can do so, but always maintain a professional, analytical, and helpful tone (the ADVMLabs brand voice: crisp, mono-spaced highlights, technical clarity).
If search grounding is active, use the search results to enrich the answer, especially for current trends, real-time context, or comparison with global standards.`,
    };

    if (mode === "lite") {
      modelName = "gemini-3.1-flash-lite";
    } else if (mode === "search") {
      modelName = "gemini-3.5-flash";
      config.tools = [{ googleSearch: {} }];
    } else if (mode === "thinking") {
      modelName = "gemini-3.1-pro-preview";
      config.thinkingConfig = {
        thinkingLevel: ThinkingLevel.HIGH,
      };
      // Do not set maxOutputTokens for HIGH thinking as per guidelines
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config,
    });

    const text = response.text || "No response text generated.";

    // Extract search grounding metadata if available
    let sources: Array<{ title: string; uri: string }> = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      sources = groundingChunks
        .filter((chunk: any) => chunk.web?.uri)
        .map((chunk: any) => ({
          title: chunk.web.title || chunk.web.uri,
          uri: chunk.web.uri,
        }));
    }

    return NextResponse.json({
      text,
      sources,
      modelUsed: modelName,
    });
  } catch (error: any) {
    console.error("Gemini API server-side route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}
