import { useEffect } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { CalendarBlank, FirstAid, Globe, House, Suitcase } from "@phosphor-icons/react";
import { LANGS, translations, type Lang } from "./data/translations";
import HomePage from "./components/HomePage";
import { CulturePage, DiasporaPage, SchedulePage, VisitorPage } from "./components/Pages";

type Section = "" | "schedule" | "visitor" | "diaspora" | "culture";

const SECTIONS: Section[] = ["", "schedule", "visitor", "diaspora", "culture"];

function isLang(value: string | undefined): value is Lang {
  return value === "om" || value === "am" || value === "en";
}

function sectionFrom(pathname: string): Section {
  const segments = pathname.split("/").filter(Boolean);
  const seg = segments[1] ?? "";
  return (SECTIONS as string[]).includes(seg) ? (seg as Section) : "";
}

function pathFor(lang: Lang, section: Section) {
  return section === "" ? `/${lang}` : `/${lang}/${section}`;
}

function navKey(section: Section): "home" | "schedule" | "visitor" | "diaspora" | "culture" {
  return section === "" ? "home" : section;
}

function NavIcon({ section, size = 20 }: { section: Section; size?: number }) {
  if (section === "schedule") return <CalendarBlank size={size} weight="fill" />;
  if (section === "visitor") return <FirstAid size={size} weight="fill" />;
  if (section === "diaspora") return <Globe size={size} weight="fill" />;
  if (section === "culture") return <Suitcase size={size} weight="fill" />;
  return <House size={size} weight="fill" />;
}

function Shell() {
  const params = useParams<{ lang?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const section = sectionFrom(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  if (!isLang(params.lang)) {
    return <Navigate to="/en" replace />;
  }

  const lang: Lang = params.lang;
  const t = translations[lang];
  const go = (next: Section) => navigate(pathFor(lang, next));

  const page =
    section === "schedule" ? (
      <SchedulePage lang={lang} t={t} />
    ) : section === "visitor" ? (
      <VisitorPage lang={lang} t={t} />
    ) : section === "diaspora" ? (
      <DiasporaPage lang={lang} t={t} />
    ) : section === "culture" ? (
      <CulturePage lang={lang} t={t} />
    ) : (
      <HomePage lang={lang} />
    );

  return (
    <div className="flex min-h-dvh flex-col bg-stone-950">
      <header className="sticky top-0 z-40 border-b border-stone-800/80 bg-stone-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <button
            type="button"
            onClick={() => go("")}
            className="flex items-center gap-2.5 text-left"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-[12px] font-bold text-stone-950">
              IC
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-semibold tracking-tight text-stone-50 sm:text-base">
                {t.appName}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
                Irreecha 2026
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map((s) => (
              <button
                key={s || "home"}
                type="button"
                onClick={() => go(s)}
                className={`rounded-full px-3.5 py-2 text-sm transition ${
                  section === s
                    ? "bg-stone-800 text-stone-50"
                    : "text-stone-400 hover:text-stone-100"
                }`}
              >
                {t.nav[navKey(s)]}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-stone-800 bg-stone-900/70 p-1">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => navigate(pathFor(l.code, section))}
                aria-label={l.label}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                  l.code === lang
                    ? "bg-emerald-400 text-stone-950"
                    : "text-stone-400 hover:text-stone-100"
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {page}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-stone-800 bg-stone-950">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-display text-lg font-semibold text-stone-50">{t.appName}</p>
              <p className="mt-2 max-w-sm text-xs leading-relaxed text-stone-400">
                {t.footer.note}
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-emerald-300/80">
                {t.tagline}
              </p>
            </div>
            <div className="sm:justify-self-end">
              <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
                {t.footer.explore}
              </p>
              <ul className="mt-3 space-y-2">
                {SECTIONS.slice(1).map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => go(s)}
                      className="text-sm text-stone-400 transition hover:text-emerald-300"
                    >
                      {t.nav[navKey(s)]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 border-t border-stone-900 pt-5 text-[11px] text-stone-500">
            {t.footer.rights}
          </p>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-800 bg-stone-950/95 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-stretch justify-between gap-1 px-2 py-1.5">
          {SECTIONS.map((s) => (
            <button
              key={s || "home"}
              type="button"
              onClick={() => go(s)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-medium transition ${
                section === s ? "text-emerald-300" : "text-stone-500"
              }`}
            >
              <NavIcon section={s} size={19} />
              <span className="w-full truncate text-center">{t.nav[navKey(s)]}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<Shell />} />
        <Route path="/:lang/:section" element={<Shell />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </HashRouter>
  );
}