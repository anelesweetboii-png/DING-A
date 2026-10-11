# Nova AI — AI chatbot website

A responsive Next.js chatbot starter with a server-side OpenAI Responses API endpoint. The API key is never included in browser code.

## Before you deploy

You need:
- A GitHub account
- A Vercel account
- An OpenAI API key and API billing/credits

## Easiest launch path (no coding required)

1. Download and extract this ZIP on your computer.
2. Sign in to GitHub and create a repository named `nova-ai-chatbot`.
3. Upload the **contents** of the extracted folder to the repository (not the ZIP file itself). Do not upload `.env` files or API keys.
4. Sign in to Vercel and choose **Add New → Project**. Import `nova-ai-chatbot` from GitHub and select **Deploy**.
5. In Vercel, open the project → **Settings → Environment Variables**. Add:
   - `OPENAI_API_KEY` = your secret OpenAI API key
   - `OPENAI_MODEL` = `gpt-5.4`
6. Save the variables, then open **Deployments** and redeploy the latest deployment so the new settings take effect.
7. Open the Vercel domain shown in your project and send a test message.

Never share your OpenAI API key in chat, screenshots, GitHub, or frontend code. Store it only in Vercel's environment variables. API usage may incur charges. If the chosen model is unavailable to your account, set `OPENAI_MODEL` to a model available in your OpenAI account.

## Run locally (optional)

Install Node.js, copy `.env.example` to `.env.local`, add your API key, then run `npm install` and `npm run dev`.
