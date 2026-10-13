import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-01",
  devtools: { enabled: false },
  experimental: {
    appManifest: false,
  },
  modules: ["nuxt-auth-utils"],
  components: [{ path: "~/components", pathPrefix: false }],
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      titleTemplate: "%s | BRAND",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,900&family=Inter:wght@400;500;600&family=Fragment+Mono&family=Caveat:wght@600&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/brand",
    adminEmail: process.env.ADMIN_EMAIL || "admin@gmail.com",
    adminPassword: process.env.ADMIN_PASSWORD || "admin123",
    session: {
      password: process.env.NUXT_SESSION_PASSWORD || "change-me-to-a-32+-character-secret-string!!",
      maxAge: 60 * 60 * 24 * 7,
    },
  },
});
