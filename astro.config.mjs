// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://brandon-toy.github.io",
  base: process.env.NODE_ENV === "production" ? "/guides" : undefined,
  integrations: [
    starlight({
      title: "My Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
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
          label: "Guides",
          items: [
            {
              label: "Notes",
              slug: "guides/notes",
            },
          ],
        },
      ],
    }),
    react(),
  ],
});
