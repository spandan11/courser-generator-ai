import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Hi, I am a chatbot. I am here to help you with your course creation.",
      },
      {
        role: "user",
        content: "Introduce yourself",
      },
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "text" },
    stream: false,
  });
  console.log(completion.choices[0]?.message.content);
  return NextResponse.json({
    greeting: `Hello`,
  });
}
