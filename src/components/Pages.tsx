import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bus,
  CallBell,
  Campfire,
  Car,
  ChatCircleDots,
  CheckCircle,
  FirstAid,
  Globe,
  MagnifyingGlass,
  Quotes,
  ShieldCheck,
  Train,
  Users,
  Van,
  X,
} from "@phosphor-icons/react";
import type { Lang, TranslationDict } from "../data/translations";
import {
  BLESSING,
  CHANNELS,
  EMERGENCY,
  EVENTS,
  IMAGES,
  STORIES,
  TRANSPORT,
  type EventCategory,
  type TransportMode,
} from "../data/festivalData";
import EventCard from "./EventCardAndModal";
import InteractiveMap from "./InteractiveMap";

export interface PageProps {
  lang: Lang;
  t: TranslationDict;
}

function PageHead({ title, sub }: { title: string; sub: string }) {
  return (
    <header className="border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <h1 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-400 sm:text-base">{sub}</p>
      </div>
    </header>
  );
}

function modeGlyph(mode: TransportMode, size = 18) {
  switch (mode) {
    case "bus":
      return <Bus size={size} weight="fill" />;
    case "van":
      return <Van size={size} weight="fill" />;
    case "train":
      return <Train size={size} weight="fill" />;
    case "car":
      return <Car size={size} weight="fill" />;
  }
}

function emergencyGlyph(icon: string, size = 18) {
  switch (icon) {
    case "FirstAid":
      return <FirstAid size={size} weight="fill" />;
    case "ShieldCheck":
      return <ShieldCheck size={size} weight="fill" />;
    case "Campfire":
      return <Campfire size={size} weight="fill" />;
    case "MagnifyingGlass":
      return <MagnifyingGlass size={size} weight="fill" />;
    case "Globe":
      return <Globe size={size} weight="fill" />;
    default:
      return <Users size={size} weight="fill" />;
  }
}

/* ------------------------------------------------------------------ Schedule */

export function SchedulePage({ lang, t }: PageProps) {
  const [day, setDay] = useState<number | "all">("all");
  const [cat, setCat] = useState<EventCategory | "all">("all");
  const [q, setQ] = useState("");

  const dayKeys = Array.from(new Set(EVENTS.map((e) => e.day))).sort((a, b) => a - b);
  const catKeys = Array.from(new Set(EVENTS.map((e) => e.category)));

  const list = EVENTS.filter((e) => {
    const matchesDay = day === "all" || e.day === day;
    const matchesCat = cat === "all" || e.category === cat;
    const needle = q.trim().toLowerCase();
    const hay = `${e.title[lang]} ${e.description[lang]} ${e.dress[lang]}`.toLowerCase();
    return matchesDay && matchesCat && (needle === "" || hay.includes(needle));
  });

  const pill = (on: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
      on
        ? "border-emerald-400 bg-emerald-400 text-stone-950"
        : "border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-100"
    }`;

  return (
    <div className="bg-stone-950">
      <PageHead title={t.schedule.title} sub={t.schedule.subtitle} />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="rounded-[1.75rem] border border-stone-800 bg-stone-900/50 p-4 sm:p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
            {t.schedule.filterDay}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={pill(day === "all")} onClick={() => setDay("all")}>
              {t.schedule.allDays}
            </button>
            {dayKeys.map((d) => (
              <button
                key={d}
                type="button"
                className={pill(day === d)}
                onClick={() => setDay(d)}
              >
                {t.days[d - 1]}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" className={pill(cat === "all")} onClick={() => setCat("all")}>
              {t.schedule.allCategories}
            </button>
            {catKeys.map((c) => (
              <button key={c} type="button" className={pill(cat === c)} onClick={() => setCat(c)}>
                {t.categories[c]}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-full border border-stone-800 bg-stone-950/70 px-4 py-2.5">
            <MagnifyingGlass size={16} className="text-stone-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.schedule.search}
              className="w-full bg-transparent text-sm text-stone-100 outline-none placeholder:text-stone-500"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-stone-400">
          <span className="font-semibold text-stone-100">{list.length}</span> {t.schedule.results}
        </p>

        {list.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-stone-800 bg-stone-900/40 p-10 text-center">
            <MagnifyingGlass size={26} className="mx-auto text-stone-600" />
            <p className="mt-3 text-sm text-stone-400">{t.schedule.noResults}</p>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {list.map((ev, i) => (
              <EventCard key={ev.id} ev={ev} t={t} lang={lang} index={i} />
            ))}
          </div>
        )}

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold text-stone-50">
            {t.schedule.mapTitle}
          </h2>
          <div className="mt-5">
            <InteractiveMap t={t} lang={lang} />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Visitor */

export function VisitorPage({ lang, t }: PageProps) {
  return (
    <div className="bg-stone-950">
      <PageHead title={t.visitor.title} sub={t.visitor.subtitle} />

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <section>
          <h2 className="font-display text-2xl font-semibold text-stone-50">
            {t.visitor.transportTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-400">{t.visitor.transportBody}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TRANSPORT.map((route) => (
              <article
                key={route.id}
                className="rounded-3xl border border-stone-800 bg-stone-900/50 p-5"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-300/10 text-teal-200">
                  {modeGlyph(route.mode)}
                </span>
                <p className="mt-4 text-sm font-medium text-stone-100">{route.from}</p>
                <p className="text-xs text-stone-500">→ {route.to}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400">
                  <span>{route.time}</span>
                  <span className="text-emerald-300">{route.freq}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-stone-800 bg-stone-900/50 p-6">
            <h2 className="font-display text-xl font-semibold text-stone-50">
              {t.visitor.checklistTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {t.visitor.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-stone-300">
                  <CheckCircle size={17} className="mt-0.5 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-stone-800 bg-stone-900/50 p-6">
            <h2 className="font-display text-xl font-semibold text-stone-50">
              {t.visitor.etiquetteTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              {t.visitor.etiquetteBody}
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                  {t.visitor.dos.length ? "Do" : ""}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {t.visitor.dos.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-300">
                      <CheckCircle size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-rose-300">
                  {t.visitor.donts.length ? "Do not" : ""}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {t.visitor.donts.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-300">
                      <X size={15} className="mt-0.5 shrink-0 text-rose-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="mt-0">
            <InteractiveMap t={t} lang={lang} compact />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-stone-50">
            {t.visitor.emergencyTitle}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EMERGENCY.map((item) => (
              <a
                key={item.id}
                href={`tel:${item.number.replace(/\s/g, "")}`}
                className="group flex items-center justify-between gap-4 rounded-3xl border border-stone-800 bg-stone-900/50 p-5 transition hover:border-rose-400/40"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-400/10 text-rose-200">
                    {emergencyGlyph(item.icon)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-stone-100">{item.label[lang]}</p>
                    <p className="text-xs text-stone-400">{item.number}</p>
                  </div>
                </div>
                <CallBell size={18} className="text-stone-500 transition group-hover:text-rose-200" />
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export function DiasporaPage({ lang, t }: PageProps) {
  const [showBlessing, setShowBlessing] = useState(false);
  const [copyLabel, setCopyLabel] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [wall, setWall] = useState<{ id: number; name: string; text: string }[]>([]);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(BLESSING[lang]);
      setCopyLabel(t.diaspora.blessingCta);
    } catch {
      setCopyLabel(t.diaspora.blessingCta);
    }
  };

  const post = () => {
    const text = draft.trim();
    if (text === "") return;
    setWall((prev) => [{ id: Date.now(), name: t.diaspora.wallTitle, text }, ...prev]);
    setDraft("");
  };

  return (
    <div className="bg-stone-950">
      <section className="relative isolate overflow-hidden border-b border-stone-800">
        <img
          src={IMAGES.diaspora}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/65 to-stone-950/15" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h1 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
            {t.diaspora.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
            {t.diaspora.subtitle}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <section>
          <h2 className="font-display text-2xl font-semibold text-stone-50">
            {t.diaspora.broadcastTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-400">{t.diaspora.broadcastBody}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {CHANNELS.map((c) => (
              <article
                key={c.id}
                className="flex items-center justify-between gap-4 rounded-3xl border border-stone-800 bg-stone-900/50 p-5"
              >
                <div>
                  <p className="text-sm font-medium text-stone-100">{c.name}</p>
                  <p className="mt-1 text-xs text-stone-400">
                    {c.platform} · {c.time}
                  </p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium ${
                    c.live
                      ? "border-rose-400/50 bg-rose-500/15 text-rose-100"
                      : "border-stone-700 bg-stone-800/60 text-stone-300"
                  }`}
                >
                  {c.live && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />}
                  {c.live ? t.status.live : t.status.published}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[1.75rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-950/40 to-stone-900/60 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-stone-50">
            {t.diaspora.blessingTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-300">{t.diaspora.blessingBody}</p>
          {showBlessing && (
            <p className="mt-5 border-l-2 border-emerald-400/50 pl-4 font-display text-base leading-relaxed text-emerald-50 italic">
              {BLESSING[lang]}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowBlessing((v) => !v)}
              className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-emerald-300"
            >
              {t.diaspora.blessingCta}
            </button>
            <button
              type="button"
              onClick={share}
              className="rounded-full border border-stone-700 px-5 py-2.5 text-sm font-medium text-stone-200 transition hover:border-emerald-400/50"
            >
              {copyLabel ?? t.footer.explore}
            </button>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-stone-50">
            {t.diaspora.storiesTitle}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {STORIES.map((s, i) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
                className="rounded-3xl border border-stone-800 bg-stone-900/50 p-5"
              >
                <Quotes size={20} className="text-emerald-400" />
                <p className="mt-3 text-sm leading-relaxed text-stone-200">{s.quote[lang]}</p>
                <p className="mt-4 text-xs text-stone-500">
                  {s.author} · {s.city}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-stone-50">
            {t.diaspora.wallTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-400">{t.diaspora.wallBody}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") post();
              }}
              placeholder={t.diaspora.wallPlaceholder}
              className="w-full rounded-full border border-stone-800 bg-stone-900/60 px-5 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-emerald-400/50"
            />
            <button
              type="button"
              onClick={post}
              className="shrink-0 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-300"
            >
              {t.diaspora.wallSubmit}
            </button>
          </div>

          {wall.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-stone-800 bg-stone-900/30 p-10 text-center">
              <ChatCircleDots size={26} className="mx-auto text-stone-600" />
              <p className="mt-3 text-sm text-stone-400">{t.diaspora.wallEmpty}</p>
            </div>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {wall.map((msg) => (
                <li
                  key={msg.id}
                  className="rounded-3xl border border-stone-800 bg-stone-900/60 p-5 text-sm leading-relaxed text-stone-200"
                >
                  {msg.text}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Culture */

const CULTURE_IMAGES = [IMAGES.coqorsa, IMAGES.oda, IMAGES.prayer, IMAGES.hero];

export function CulturePage({ lang, t }: PageProps) {
  return (
    <div className="bg-stone-950">
      <PageHead title={t.culture.title} sub={t.culture.subtitle} />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {t.culture.cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              className="overflow-hidden rounded-[1.75rem] border border-stone-800 bg-stone-900/50"
            >
              <img
                src={CULTURE_IMAGES[i % CULTURE_IMAGES.length]}
                alt=""
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h2 className="font-display text-lg font-semibold text-stone-50">{card.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{card.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <section className="mt-14 rounded-[1.75rem] border border-emerald-400/20 bg-emerald-400/5 p-6">
          <p className="max-w-3xl text-sm leading-relaxed text-stone-300">{t.sacred.body}</p>
        </section>
      </div>
    </div>
  );
}