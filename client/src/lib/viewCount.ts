/** Mock брой прегледи на сайта (localStorage). Премахва се при backend. */
const STORAGE_KEY = "giftnow_view_log";

export type ViewPeriod = "daily" | "weekly" | "monthly" | "yearly" | "all";

export function recordView(): void {
  if (typeof window === "undefined") return;
  const log = getLog();
  log.push(Date.now());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

function getLog(): number[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export function getViewCount(period: ViewPeriod): number {
  const log = getLog();
  if (period === "all") return log.length;

  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  const cutoff =
    period === "daily" ? now - day
    : period === "weekly" ? now - week
    : period === "monthly" ? now - month
    : now - year;

  return log.filter((t) => t >= cutoff).length;
}
