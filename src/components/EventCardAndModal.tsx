import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarBlank,
  Clock,
  Globe,
  MapPin,
  ShirtFolded,
  Sparkle,
  TShirt,
  Ticket,
  Users,
  Waveform,
  X,
} from "@phosphor-icons/react";
import type { Lang, TranslationDict } from "../data/translations";
import {
  SITES,
  type EventCategory,
  type EventStatus,
  type FestivalEvent,
} from "../data/festivalData";

const CRLF = String.fromCharCode(13, 10);

function categoryGlyph(category: EventCategory, size = 15) {
  switch (category) {
    case "prayer":
      return <Sparkle size={size} weight="fill" />;
    case "ceremony":
      return <Ticket size={size} weight="fill" />;
    case "gadaa":
      return <Users size={size} weight="fill" />;
    case "music":
      return <Waveform size={size} weight="fill" />;
    case "youth":
      return <TShirt size={size} weight="fill" />;
    case "symposium":
      return <CalendarBlank size={size} weight="fill" />;
    case "diaspora":
      return <Globe size={size} weight="fill" />;
  }
}

const STATUS_STYLE: Record<EventStatus, string> = {
  live: "border-rose-400/50 bg-rose-500/15 text-rose-100",
  published: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  tentative: "border-stone-600 bg-stone-800/60 text-stone-300",
  special: "border-amber-300/50 bg-amber-300/10 text-amber-100",
};

export function siteName(site: string, lang: Lang) {
  return SITES.find((s) => s.id === site)?.name[lang] ?? site;
}

function buildIcs(ev: FestivalEvent, lang: Lang, location: string) {
  const dd = String(2 + (ev.day - 1)).padStart(2, "0");
  const stamp = `202610${dd}T${ev.time.replace(":", "")}00`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Irreecha Connect//EN",
    "BEGIN:VEVENT",
    `UID:${ev.id}@irreechaconnect`,
    `SUMMARY:${ev.title[lang]}`,
    `DTSTART:${stamp}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${ev.description[lang]}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join(CRLF);
}

export default function EventCard({
  ev,
  t,
  lang,
  index = 0,
}: {
  ev: FestivalEvent;
  t: TranslationDict;
  lang: Lang;
  index?: number;
}) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const location = siteName(ev.site, lang);

  const download = () => {
    const blob = new Blob([buildIcs(ev, lang, location)], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${ev.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
        className="group flex w-full flex-col rounded-3xl border border-stone-800 bg-stone-900/60 p-5 text-left backdrop-blur transition hover:border-emerald-400/40 hover:bg-stone-900"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300">
            {categoryGlyph(ev.category, 14)}
            {t.categories[ev.category]}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
              STATUS_STYLE[ev.status]
            }`}
          >
            {ev.status === "live" && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
            )}
            {t.status[ev.status]}
          </span>
        </div>

        <h4 className="mt-3 font-display text-base font-semibold text-stone-50 group-hover:text-white">
          {ev.title[lang]}
        </h4>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-400">
          {ev.description[lang]}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-400">
          <span className="inline-flex items-center gap-1.5">
            <CalendarBlank size={13} /> {t.days[ev.day - 1]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} /> {ev.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} /> {location}
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/80 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full overflow-y-auto rounded-t-[2rem] border border-stone-800 bg-stone-900 p-6 sm:max-w-lg sm:rounded-[2rem]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300">
                    {categoryGlyph(ev.category, 14)}
                    {t.categories[ev.category]}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-stone-50">
                    {ev.title[lang]}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-stone-800 p-2 text-stone-400 transition hover:text-stone-100"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-stone-300">
                {ev.description[lang]}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: <CalendarBlank size={15} />, k: t.schedule.filterDay, v: t.days[ev.day - 1] },
                  { icon: <Clock size={15} />, k: t.schedule.time, v: ev.time },
                  { icon: <MapPin size={15} />, k: t.schedule.location, v: location },
                  { icon: <ShirtFolded size={15} />, k: t.schedule.dressCode, v: ev.dress[lang] },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="rounded-2xl border border-stone-800 bg-stone-950/60 p-3"
                  >
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide text-stone-500">
                      {row.icon}
                      {row.k}
                    </span>
                    <p className="mt-1 text-sm text-stone-200">{row.v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-300"
                >
                  <CalendarBlank size={16} weight="bold" />
                  {saved ? t.schedule.added : t.schedule.addCalendar}
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-700 px-5 py-3 text-sm font-medium text-stone-200 transition hover:border-emerald-400/50 hover:text-white"
                >
                  <MapPin size={16} />
                  {t.schedule.directions}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}