import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { cn } from "@/lib/utils";
import { Squiggle, StarDoodle } from "@/components/doodles";
import { contactEmail } from "@/data/portfolio";

type NavPath = "/" | "/projects" | "/about" | "/skills" | "/experience" | "/contact";

const NAV_LINKS: { to: NavPath; label: string }[] = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
];

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <MarginNote className="mt-2">this page fell out of the sketchbook…</MarginNote>
        <div className="mt-6">
          <Link
            to="/"
            className="sketch-border inline-flex items-center justify-center bg-primary px-4 py-2 font-display text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to the cover
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="sketch-border inline-flex items-center justify-center bg-primary px-4 py-2 font-display text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="sketch-border-alt inline-flex items-center justify-center bg-card px-4 py-2 font-display text-sm uppercase tracking-widest transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function NotebookNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-primary/30 bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <StarDoodle className="h-6 w-6 text-primary" />
          <span className="font-display text-2xl tracking-wider">Ravat Prince</span>
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="sketch-border-alt -mr-1 flex h-11 w-11 items-center justify-center bg-card text-primary md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <nav
          id="main-nav"
          aria-label="Main"
          className={cn(
            "absolute inset-x-0 top-full flex-col gap-1 border-b border-primary/30 bg-background px-4 py-3 shadow-md md:static md:flex md:flex-row md:flex-wrap md:gap-x-5 md:gap-y-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none",
            menuOpen ? "flex" : "hidden",
          )}
        >
          {NAV_LINKS.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "relative block pb-1 pt-2 font-display text-lg uppercase tracking-[0.15em] transition-colors md:pt-0",
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground",
                )}
              >
                {l.label}
                {active && <Squiggle className="absolute -bottom-1 left-0 w-full text-primary" />}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function NotebookFooter() {
  return (
    <footer className="border-t border-primary/30">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-10 md:flex-row">
        <p className="font-hand text-2xl text-pencil">drawn, coded &amp; shipped by hand.</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          {NAV_LINKS.slice(1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-sm uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
        {contactEmail ? (
          <a
            href={`mailto:${contactEmail}`}
            className="font-display text-sm uppercase tracking-[0.2em] text-primary hover:underline"
          >
            {contactEmail}
          </a>
        ) : (
          <span className="font-display text-sm uppercase tracking-[0.2em] text-pencil">
            [add your email address]
          </span>
        )}
      </div>
    </footer>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ravat Prince — Game & Frontend Developer" },
      {
        name: "description",
        content:
          "The sketchbook of Ravat Prince — game developer & frontend engineer. Playable worlds, hand-built interfaces.",
      },
      { name: "author", content: "Ravat Prince" },
      { property: "og:title", content: "Ravat Prince — Game & Frontend Developer" },
      {
        property: "og:description",
        content:
          "Playable game worlds and hand-built web interfaces — drawn, coded and shipped by one pair of hands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&family=Caveat:wght@500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
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

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <NotebookNav />
        <div className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </div>
        <NotebookFooter />
      </div>
    </QueryClientProvider>
  );
}

// MarginNote is defined in @/components/paper; local alias to avoid a client-graph cycle.
import { MarginNote } from "@/components/paper";
