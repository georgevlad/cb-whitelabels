# Cashback Whitelabel Platform

This project uses [Next.js](https://nextjs.org) to build a website whose content and branding are driven by JSON configuration files. Each domain has its own JSON file under `src/config` that describes navigation, about us information, category data and embed codes from whitelabel partners such as FinanceAds and TravelPayouts. The configuration is loaded at runtime depending on the request host name.

## Project Structure

- `src/config/` – domain configuration files (`domain1.json`, `domain2.json`, ...)
- `src/utils/getSiteConfig.ts` – selects the appropriate config based on the domain
- `src/` – Next.js pages and React components
- `public/` – static assets like images

To add a new domain simply create a new configuration file in `src/config` and map the domain name in `getSiteConfig.ts`.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying files under `src/app`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
