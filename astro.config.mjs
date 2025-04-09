// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const base = isGithubPages ? "/godot-rust-faq/" : "/";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/": `${base}how/custom_classes/`,
  },
  integrations: [
    starlight({
      title: "Godot Rust FAQ",
      lastUpdated: true,

      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ColinWttt/godot-rust-faq",
        },
      ],
      sidebar: [
        {
          label: "How to",
          items: [
            "how/custom_classes",
            "how/interact_classes",
            "how/communicate_godot",
          ],
        },
        {
          label: "Common Errors",
          autogenerate: { directory: 'errors' },
        },
      ],
    }),
  ],
});
