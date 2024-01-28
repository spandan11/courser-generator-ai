import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "./gpt";

export async function searchYoutube(searchQuery: string) {
  // encodeURIComponent e.g. hello world => hello+world
  searchQuery = encodeURIComponent(searchQuery);
  const options = {
    method: "GET",
    url: `https://youtube-v31.p.rapidapi.com/search?q=${searchQuery}&maxResults=5&videoDuration=medium&videoEmbeddable=true&type=video`,
    // params: {
    //   q: searchQuery,
    //   maxResults: "5",
    //   videoDuration: "medium",
    //   videoEmbeddable: "true",
    //   type: "video",
    // },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY! as string,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST! as string,
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log(data.items);
    if (data.items[0] == undefined) {
      console.log("No video found");
      return null;
    }
    return data.items[0].id.videoId;
  } catch (error) {
    console.error(error);
  }
}

export async function getTranscript(videoId: string) {
  try {
    const transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "EN",
    });

    let transcript = "";
    for (const t of transcript_arr) {
      transcript += t.text + " ";
    }

    return transcript.replaceAll("\n", "");
  } catch (error) {
    return "";
  }
}

export async function getQuestionsFromTranscript(
  transcript: string,
  chapter_title: string,
) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };
  const questions: Question[] = await strict_output(
    "You are an helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words",
    new Array(5).fill(
      ` you are to generate a random hard mcq question about ${chapter_title} with context of the following transcript: ${transcript}`,
    ),
    {
      question: "question",
      answer: "answer with max length of 15 words",
      option1: "option1 with max length of 15 words",
      option2: "option2 with max length of 15 words",
      option3: "option3 with max length of 15 words",
    },
  );
  return questions;
}
