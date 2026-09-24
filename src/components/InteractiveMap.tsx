import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, Car, Drop, FirstAid, ForkKnife, Play, X } from "@phosphor-icons/react";
import type { Lang, TranslationDict } from "../data/translations";
import { MAP_NODES, SITES, type NodeType, type SiteId } from "../data/festivalData";

function nodeGlyph(type: NodeType, size = 15) {
  switch (type) {
    case "sacred":
      return <Drop size={size} weight="fill" />;
    case "stage":
      return <Play size={size} weight="fill" />;
    case "medical":
      return <FirstAid size={size} weight="fill" />;
    case "shuttle":
      return <Bus size={size} weight="fill" />;
    case "parking":
      return <Car size={size} weight="fill" />;
    case "food":
      return <ForkKnife size={size} weight="fill" />;
  }
}

const NODE_STYLE: Record<NodeType, string> = {
  sacred: "border-emerald-400/60 bg-emerald-400/15 text-emerald-200",
  stage: "border-amber-300/60 bg-amber-300/15 text-amber-100",
  medical: "border-rose-400/60 bg-rose-400/15 text-rose-100",
  shuttle: "border-teal-300/60 bg-teal-300/15 text-teal-100",
  parking: "border-stone-300/50 bg-stone-300/10 text-stone-200",
  food: "border-orange-400/60 bg-orange-400/15 text-orange-100",
};

const TYPES: NodeType[] = ["sacred", "stage", "medical", "shuttle", "parking", "food"];

export default function InteractiveMap({
  t,
  lang,
  compact = false,
}: {
  t: TranslationDict;
  lang: Lang;
  compact?: boolean;
}) {
  const [site, setSite] = useState<SiteId>("finfinnee");
  const [active, setActive] = useState<NodeType[]>(TYPES);
  const [selected, setSelected] = useState<string | null>(null);

  const nodes = MAP_NODES.filter((n) => n.site === site && active.includes(n.type));
  const activeSite = SITES.find((s) => s.id === site) ?? SITES[0];
  const current = MAP_NODES.find((n) => n.id === selected) ?? null;

  const toggle = (type: NodeType) =>
    setActive((prev) => (prev.includes(type) ? prev.filter((x) => x !== type) : [...prev, type]));

  return (
    <div className="rounded-[2rem] border border-stone-800 bg-stone-900/70 p-4 sm:p-6 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-stone-50">{t.map.title}</h3>
        <div className="flex gap-1 rounded-full border border-stone-800 bg-stone-950/70 p-1">
          {SITES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSite(s.id);
                setSelected(null);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                s.id === site
                  ? "bg-emerald-400 text-stone-950"
                  : "text-stone-400 hover:text-stone-100"
              }`}
            >
              {s.name[lang]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-1 text-xs text-stone-400">
        {activeSite.city[lang]} · {t.map.legend}
      </p>

      <div
        className={`relative mt-4 w-full overflow-hidden rounded-[1.5rem] border border-stone-800 ${
          compact ? "aspect-[16/11]" : "aspect-[4/3]"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-emerald-950/40" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <ellipse cx="52" cy="62" rx="46" ry="24" fill="url(#lake)" />
          <ellipse cx="16" cy="16" rx="18" ry="11" fill="url(#field)" />
          <path
            d="M4 50 Q30 44 52 50 T98 46"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.6"
            fill="none"
          />
          <path
            d="M4 30 Q34 26 54 32 T98 28"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.6"
            fill="none"
          />
          <path
            d="M2 66 Q28 72 54 66 T98 68"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
            fill="none"
          />
          <defs>
            <linearGradient id="lake" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#065f46" stopOpacity="0.12" />
            </linearGradient>
            <radialGradient id="field">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {nodes.map((node) => {
          const isOn = selected === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelected(isOn ? null : node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border p-2 shadow-lg backdrop-blur transition ${
                NODE_STYLE[node.type]
              } ${isOn ? "scale-125 ring-2 ring-white/40" : "hover:scale-110"}`}
              aria-label={t.map.legendItems[node.type]}
            >
              {nodeGlyph(node.type)}
            </button>
          );
        })}

        <AnimatePresence>
          {current && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-x-3 bottom-3 rounded-2xl border border-stone-700/70 bg-stone-950/90 p-3 backdrop-blur-xl"
            >
              <div className="flex items-start gap-3">
                <span className={`rounded-full border p-2 ${NODE_STYLE[current.type]}`}>
                  {nodeGlyph(current.type, 16)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-stone-50">
                    {t.map.legendItems[current.type]}
                  </p>
                  <p className="mt-0.5 text-xs text-stone-400">{current.note[lang]}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full p-1 text-stone-500 transition hover:text-stone-100"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {TYPES.map((type) => {
          const on = active.includes(type);
          return (
            <button
              key={type}
              type="button"
              onClick={() => toggle(type)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                on
                  ? `${NODE_STYLE[type]} font-medium`
                  : "border-stone-800 bg-stone-950/60 text-stone-500 hover:text-stone-300"
              }`}
            >
              {nodeGlyph(type, 13)}
              {t.map.legendItems[type]}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-stone-500">{t.schedule.mapHint}</p>
    </div>
  );
}