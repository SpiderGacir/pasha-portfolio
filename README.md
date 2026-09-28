# Pasha Portfolio

Personal portfolio for Rafi Pasha. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion and Lucide.

## Run locally
1. Install Node.js 18.17+.
2. In this folder run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Edit portfolio data
Open `app/page.tsx` and edit the `socials` object and `projects` array near the top. No fake project URLs are included.

## Add a project
Add another object to `projects` with `name`, `cat`, `status`, `desc`, and `tech`. Supported filters are All, Web, AI, Creative and Business.

## Change social links
Edit the `socials` object. Replace the placeholder Instagram, GitHub, LinkedIn and email values with real links.

## Deploy to Vercel
Push the folder to GitHub, import the repository into Vercel, and deploy with the default Next.js settings.

## Notes
The contact form performs real frontend validation but intentionally does not claim to send email. Connect a backend/email service later if you want live submissions.
