import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const ROUTES_MANIFEST = {
  __root__: { filePath: "src/routes/__root.tsx", children: ["/", "/galeri", "/iletisim", "/poliuretan", "/polyurea", "/referanslar", "/surme-izolasyon", "/yesil-cati-zeminleri", "/zemin-kaplama", "/projeler", "/haberler", "/sayfa/$slug"] },
  "/": { filePath: "src/routes/index.tsx" },
  "/galeri": { filePath: "src/routes/galeri.tsx" },
  "/iletisim": { filePath: "src/routes/iletisim.tsx" },
  "/poliuretan": { filePath: "src/routes/poliuretan.tsx" },
  "/polyurea": { filePath: "src/routes/polyurea.tsx" },
  "/referanslar": { filePath: "src/routes/referanslar.tsx" },
  "/surme-izolasyon": { filePath: "src/routes/surme-izolasyon.tsx" },
  "/yesil-cati-zeminleri": { filePath: "src/routes/yesil-cati-zeminleri.tsx" },
  "/zemin-kaplama": { filePath: "src/routes/zemin-kaplama.tsx" },
  "/projeler": { filePath: "src/routes/projeler.tsx", children: ["/projeler/", "/projeler/$slug"] },
  "/projeler/": { filePath: "src/routes/projeler.index.tsx" },
  "/projeler/$slug": { filePath: "src/routes/projeler.$slug.tsx" },
  "/haberler": { filePath: "src/routes/haberler.tsx", children: ["/haberler/", "/haberler/$slug"] },
  "/haberler/": { filePath: "src/routes/haberler.index.tsx" },
  "/haberler/$slug": { filePath: "src/routes/haberler.$slug.tsx" },
  "/sayfa/$slug": { filePath: "src/routes/sayfa.$slug.tsx" },
};

function routesManifestWorkaround() {
  return {
    name: "tanstack-start:routes-manifest-workaround",
    enforce: "pre" as const,
    buildStart() {
      if (!(globalThis as Record<string, unknown>).TSS_ROUTES_MANIFEST) {
        (globalThis as Record<string, unknown>).TSS_ROUTES_MANIFEST = ROUTES_MANIFEST;
      }
    },
  };
}

export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    routesManifestWorkaround(),
    tanstackStart(),
    viteReact(),
  ],
});
