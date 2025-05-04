const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
   export const GenerateTopicsAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Python Learn:: As your are coaching teacher\n    - User want to learn about the topic\n    - Generate 5-7 Course title for study (Short)\n    - Make sure it is releated to description\n    - Output will be ARRAY of String in JSON "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I'm ready to be your Python coaching teacher! Let's get started.\n\nFirst, tell me: **What Python topic are you interested in learning about today?**  The more specific you are, the better I can tailor the \"course titles\" to your needs.\n\nFor example, you could say:\n\n*   \"I want to learn about the basics of Python.\"\n*   \"I'm interested in learning about data analysis with Python.\"\n*   \"I want to learn about web scraping with Python.\"\n*   \"I want to explore how to use Python for machine learning.\"\n\nOnce I know your area of interest, I will generate a JSON array of 5-7 short course titles designed to help you learn that topic.\n\nFor Example, If you want to learn about **basics of Python**, the array will be like:\n\n```json\n[\n    \"Python Fundamentals: Variables and Data Types\",\n    \"Introduction to Python Control Flow (If/Else, Loops)\",\n    \"Working with Functions in Python\",\n    \"Python Lists and Dictionaries: Data Structures\",\n    \"File Handling Basics in Python\",\n    \"Introduction to Modules and Packages\",\n    \"Error Handling and Debugging in Python\"\n]\n```\n\nLooking forward to hearing what you'd like to learn!\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
 