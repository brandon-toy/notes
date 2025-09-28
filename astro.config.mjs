// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://brandon-toy.github.io",
  base: process.env.NODE_ENV === "production" ? "/notes" : undefined,
  integrations: [
    starlight({
      title: "Home",
      lastUpdated: true,
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/brandon-toy/notes",
        },
      ],
      customCss: ["./src/styles/global.css"],
      sidebar: [
        {
          label: "Table of Contents",
          slug: "contents",
        },
        {
          label: "Books",
          items: [
            {
              label: "Man's Search for Meaning",
              slug: "books/mans-search-for-meaning",
            },
          ],
        },
        {
          label: "Games",
          items: [
            {
              label: "Silksong",
              slug: "games/silksong",
            },
          ],
        },
      ],
    }),
    react(),
  ],
});
