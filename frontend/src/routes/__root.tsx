import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { PageLoader } from "../components/site/PageLoader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-forest">404 — Sayfa Bulunamadı</p>
        <h1 className="display-lg text-forest-deep mt-6">Aradığınız sayfa mevcut değil.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Bağlantı taşınmış ya da hiç var olmamış olabilir.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-forest-deep px-6 py-3 text-sm text-forest-deep hover:bg-forest-deep hover:text-bone transition-colors"
          >
            Anasayfaya dön <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-forest">Bir sorun oluştu</p>
        <h1 className="display-lg text-forest-deep mt-6">Sayfa yüklenemedi.</h1>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center gap-2 bg-forest-deep text-bone px-6 py-3 text-sm hover:bg-forest transition-colors"
          >
            Tekrar dene
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 border border-forest-deep px-6 py-3 text-sm text-forest-deep hover:bg-forest-deep hover:text-bone transition-colors"
          >
            Anasayfa
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#1a3a2a" },
      { title: "ARKS Yapı Teknolojileri — Endüstriyel Yalıtım ve Kaplama Sistemleri" },
      {
        name: "description",
        content: "Polyurea, poliüretan, sürme izolasyon, zemin kaplama ve yeşil çatı sistemlerinde uzman. ARKS ile yapılarınıza kalıcı ve elit koruma.",
      },
      { name: "author", content: "ARKS Yapı Teknolojileri" },
      { property: "og:title", content: "ARKS Yapı Teknolojileri — Endüstriyel Yalıtım ve Kaplama Sistemleri" },
      {
        property: "og:description",
        content: "Polyurea, poliüretan, sürme izolasyon, zemin kaplama ve yeşil çatı sistemlerinde uzman.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ARKS Yapı Teknolojileri" },
      {
        name: "twitter:description",
        content: "Polyurea, poliüretan, sürme izolasyon, zemin kaplama ve yeşil çatı sistemlerinde uzman.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { location } = useRouterState();

  return (
    <QueryClientProvider client={queryClient}>
      <PageLoader />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </QueryClientProvider>
  );
}
