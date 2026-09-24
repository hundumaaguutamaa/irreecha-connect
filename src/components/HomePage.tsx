import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CaretRight,
  Leaf,
  MoonStars,
  ShoppingCart,
  Sparkle,
  Tree,
  WarningCircle,
} from "@phosphor-icons/react";
import { translations, type Lang } from "../data/translations";
import { EVENTS, FESTIVAL_START, IMAGES, VENDORS } from "../data/festivalData";
import EventCard from "./EventCardAndModal";
import InteractiveMap from "./InteractiveMap";

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const total = Math.max(0, Math.floor((new Date(target).getTime() - now) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const PILLAR_IMAGES = [IMAGES.coqorsa, IMAGES.oda, IMAGES.prayer];
const PILLAR_GLYPHS = [
  <Leaf size={18} weight="fill" key="leaf" />,
  <Tree size={18} weight="fill" key="tree" />,
  <MoonStars size={18} weight="fill" key="moon" />,
];

function StoreIcon({ size = 16 }: { size?: number }) {
  return <ShoppingCart size={size} weight="fill" />;
}

export default function HomePage({ lang }: { lang: Lang }) {
  const dict = translations[lang];
  const cd = useCountdown(FESTIVAL_START);
  const featured = EVENTS.filter((e) => e.featured);
  const units = [cd.days, cd.hours, cd.minutes, cd.seconds];

  const quickLinks = [
    `/${lang}/schedule`,
    "#map",
    `/${lang}/visitor`,
    `/${lang}/diaspora`,
  ];

  return (
    <div className="bg-stone-950">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={IMAGES.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-950/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.12),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-24 sm:px-8">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-200 backdrop-blur"
          >
            <Sparkle size={13} weight="fill" />
            {dict.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-semibold tracking-tight text-stone-50 sm:text-6xl"
          >
            {dict.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to={`/${lang}/schedule`}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-300"
            >
              {dict.hero.ctaPrimary}
              <ArrowRight size={16} weight="bold" />
            </Link>
            <a
              href="#map"
              className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/60 px-6 py-3 text-sm font-medium text-stone-100 backdrop-blur transition hover:border-emerald-400/50"
            >
              {dict.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Countdown */}
      <section className="border-y border-stone-800 bg-stone-900/40">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-300">
            {dict.hero.countdown}
          </p>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {units.map((value, i) => (
              <div
                key={dict.hero.units[i]}
                className="rounded-2xl border border-stone-800 bg-stone-950/70 px-3 py-4 text-center"
              >
                <span className="block font-display text-2xl font-semibold tabular-nums text-stone-50 sm:text-3xl">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-wide text-stone-500">
                  {dict.hero.units[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <h2 className="font-display text-2xl font-semibold text-stone-50">{dict.quick.title}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.quick.items.map((item, i) => (
            <Link
              key={item.title}
              to={quickLinks[i]}
              className="group rounded-3xl border border-stone-800 bg-stone-900/50 p-5 transition hover:border-emerald-400/40 hover:bg-stone-900"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                <Sparkle size={18} weight="fill" />
              </span>
              <h3 className="mt-4 font-medium text-stone-50">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-400">{item.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-emerald-300 opacity-0 transition group-hover:opacity-100">
                {dict.footer.explore}
                <CaretRight size={12} weight="bold" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Meaning of Irreecha */}
      <section className="border-y border-stone-800 bg-gradient-to-b from-stone-900/50 to-stone-950">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
            {dict.sacred.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-stone-50 sm:text-4xl">
            {dict.sacred.title}
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
            {dict.sacred.body}
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {dict.sacred.pillars.map((pillar, i) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="overflow-hidden rounded-[1.75rem] border border-stone-800 bg-stone-900/60"
              >
                <img
                  src={PILLAR_IMAGES[i]}
                  alt=""
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200">
                    {PILLAR_GLYPHS[i]}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-stone-50">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{pillar.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured ceremonies */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-stone-50 sm:text-3xl">
              {dict.featured.title}
            </h2>
            <p className="mt-2 text-sm text-stone-400">{dict.featured.subtitle}</p>
          </div>
          <Link
            to={`/${lang}/schedule`}
            className="inline-flex items-center gap-2 rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-stone-200 transition hover:border-emerald-400/50 hover:text-white"
          >
            {dict.featured.all}
            <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((ev, i) => (
            <EventCard key={ev.id} ev={ev} t={dict} lang={lang} index={i} />
          ))}
        </div>
      </section>

      {/* Local stands */}
      <section className="border-y border-stone-800 bg-stone-900/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-2xl font-semibold text-stone-50 sm:text-3xl">
            {dict.vendors.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-400">{dict.vendors.subtitle}</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VENDORS.map((vendor) => (
              <article
                key={vendor.id}
                className="rounded-3xl border border-stone-800 bg-stone-950/60 p-5"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-200">
                  <StoreIcon />
                </span>
                <h3 className="mt-4 font-medium text-stone-50">{vendor.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{vendor.blurb[lang]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive map */}
      <section id="map" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-8">
        <h2 className="font-display text-2xl font-semibold text-stone-50 sm:text-3xl">
          {dict.schedule.mapTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-400">{dict.map.legend}</p>
        <div className="mt-7">
          <InteractiveMap t={dict} lang={lang} />
        </div>
      </section>

      {/* Diaspora band */}
      <section className="relative isolate overflow-hidden border-y border-stone-800">
        <img src={IMAGES.diaspora} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/65 to-stone-950/15" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-5 px-5 py-16 sm:px-8">
          <h2 className="max-w-xl font-display text-2xl font-semibold text-stone-50 sm:text-3xl">
            {dict.diaspora.title}
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-stone-300">{dict.diaspora.subtitle}</p>
          <Link
            to={`/${lang}/diaspora`}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-300"
          >
            {dict.diaspora.watchLive}
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>

      {/* Safety advisories */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-2xl font-semibold text-stone-50 sm:text-3xl">
          {dict.alerts.title}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {dict.alerts.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm leading-relaxed text-stone-300"
            >
              <WarningCircle size={18} className="mt-0.5 shrink-0 text-amber-300" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}