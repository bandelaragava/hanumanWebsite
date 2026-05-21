/**
 * usePanchangam.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom React hook that calculates accurate daily Panchangam data using the
 * @ishubhamx/panchangam-js library (98.64% accuracy vs Drik Panchang).
 *
 * Calculations are done entirely offline — no external API key required.
 * Data auto-refreshes at midnight every day.
 *
 * Default location: Hyderabad, India (lat 17.3850, lon 78.4867, elevation 536m)
 * Change `TEMPLE_LOCATION` below to match your temple's exact coordinates.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getPanchangam,
  Observer,
  tithiNames,
  nakshatraNames,
  yogaNames,
  dayNames,
  rashiNames,
  masaNames,
} from '@ishubhamx/panchangam-js';

// ── ① Change this to your temple's GPS coordinates ──────────────────────────
const TEMPLE_LOCATION = {
  latitude:  17.3850,   // Hyderabad, Telangana
  longitude: 78.4867,
  elevation: 536,       // metres above sea level
  timezone:  'Asia/Kolkata',
  tzOffsetMinutes: 330, // IST = UTC + 5:30 = 330 minutes
};

// ── Karana names (not exported by the library) ────────────────────────────────
const KARANA_NAMES = [
  'Bava','Balava','Kaulava','Taitila','Garaja','Vanija','Vishti',
  'Shakuni','Chatushpada','Naga','Kimstughna'
];

// ── Formatting helpers ────────────────────────────────────────────────────────

/**
 * Safely extract a string from a names-array entry that might be
 * a plain string OR an object like { name: 'Foo', ... }.
 */
function nameStr(entry, fallback) {
  if (!entry) return fallback;
  if (typeof entry === 'string') return entry;
  if (typeof entry === 'object') {
    return entry.name ?? entry.sanskritName ?? entry.englishName ?? String(entry) ?? fallback;
  }
  return String(entry) ?? fallback;
}

/**
 * Format a Date to "H:MM AM/PM" in IST.
 */
function formatTime(date) {
  if (!date) return '—';
  return date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: TEMPLE_LOCATION.timezone,
  });
}

/**
 * Format a time-range object { start: Date, end: Date } as "H:MM AM – H:MM AM".
 */
function formatRange(rangeObj) {
  if (!rangeObj) return '—';
  const s = rangeObj.start ?? rangeObj.startTime;
  const e = rangeObj.end   ?? rangeObj.endTime;
  return `${formatTime(s)} – ${formatTime(e)}`;
}

// ── Main hook ─────────────────────────────────────────────────────────────────

/**
 * Returns:
 *  {
 *    data: { tithi, nakshatra, yoga, karana, vara, sunrise, sunset,
 *            moonSign, paksha, masa, samvat, ritu,
 *            rahuKala, yamaghanda, gulika, abhijitMuhurta,
 *            festivals, specialNote, date },
 *    loading: boolean,
 *    error: string | null,
 *    refresh: () => void
 *  }
 */
export function usePanchangam() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const compute = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      const today    = new Date();
      const observer = new Observer(
        TEMPLE_LOCATION.latitude,
        TEMPLE_LOCATION.longitude,
        TEMPLE_LOCATION.elevation,
      );

      const p = getPanchangam(today, observer, {
        timezoneOffset: TEMPLE_LOCATION.tzOffsetMinutes,
      });

      /* ── Core Panchangam elements ─────────────────────────────────────── */
      const tithiIndex     = p.tithi     ?? 0;
      const nakshatraIndex = p.nakshatra ?? 0;
      const yogaIndex      = p.yoga      ?? 0;
      const dayIndex       = today.getDay(); // 0 = Sunday … 6 = Saturday

      const tithi     = nameStr(tithiNames[tithiIndex],     `Tithi ${tithiIndex + 1}`);
      const nakshatra = nameStr(nakshatraNames[nakshatraIndex], `Nakshatra ${nakshatraIndex + 1}`);
      const yoga      = nameStr(yogaNames[yogaIndex],        `Yoga ${yogaIndex + 1}`);
      const vara      = nameStr(dayNames[dayIndex],          'Ravivaar');

      /* ── Karana: use karana name from the library or local lookup ──── */
      const karanaRaw = p.karana;
      let karana = '—';
      if (karanaRaw !== null && karanaRaw !== undefined) {
        if (typeof karanaRaw === 'string') {
          // Some library versions return a string already
          karana = karanaRaw.replace(/[0-9]+$/, '').trim(); // strip trailing digits
        } else if (typeof karanaRaw === 'object' && karanaRaw.name) {
          karana = karanaRaw.name;
        } else {
          // numeric index — use our lookup table
          const idx = Number(karanaRaw) % KARANA_NAMES.length;
          karana = KARANA_NAMES[idx] ?? `Karana ${idx + 1}`;
        }
      }

      /* ── Moon sign / Rashi ───────────────────────────────────────────── */
      const moonRashiRaw = p.moonRashi ?? p.rashi ?? null;
      let moonSign = '—';
      if (moonRashiRaw !== null && moonRashiRaw !== undefined) {
        if (typeof moonRashiRaw === 'string') {
          moonSign = moonRashiRaw;
        } else if (typeof moonRashiRaw === 'object' && moonRashiRaw.name) {
          moonSign = moonRashiRaw.name;
        } else {
          const idx = Number(moonRashiRaw);
          moonSign = nameStr(rashiNames[idx], `Rashi ${idx + 1}`);
        }
      }

      /* ── Paksha, Masa, Samvat, Ritu ──────────────────────────────────── */
      const paksha = p.paksha ?? '—';
      const masa   = p.masa?.name ?? (masaNames ? masaNames[p.masa ?? 0] : '—') ?? '—';
      const samvat = p.vikramSamvat ?? p.samvat ?? '—';
      const ritu   = p.ritu ?? '—';

      /* ── Solar timings ───────────────────────────────────────────────── */
      const sunrise = formatTime(p.sunrise);
      const sunset  = formatTime(p.sunset);

      /* ── Inauspicious / Auspicious periods ───────────────────────────── */
      const rahuKala      = formatRange(p.rahuKalam   ?? p.rahuKala);
      const yamaghanda    = formatRange(p.yamaganda   ?? p.yamaghanda);
      const gulika        = formatRange(p.gulika      ?? p.gulikaKalam);
      const abhijitMuhurta = formatRange(p.abhijitMuhurta ?? p.abhijit);

      /* ── Festivals ───────────────────────────────────────────────────── */
      const festivals = Array.isArray(p.festivals) && p.festivals.length > 0
        ? p.festivals.map(f => f.name ?? f).join(' • ')
        : null;

      /* ── Special note auto-generated from festivals / tithi ──────────── */
      let specialNote = '';
      if (festivals) {
        specialNote = `🎉 Today is ${festivals}. `;
      }
      if (tithi === 'Ekadashi') {
        specialNote += 'Ekadashi — a highly auspicious fasting day dedicated to Lord Vishnu.';
      } else if (tithi === 'Amavasya') {
        specialNote += 'Amavasya (New Moon) — ideal for ancestral prayers (Pitru Tarpan).';
      } else if (tithi === 'Purnima') {
        specialNote += 'Purnima (Full Moon) — an auspicious day for Hanuman prayers and Satyanarayan Puja.';
      }
      if (!specialNote) {
        specialNote = 'Begin new endeavours during the Abhijit Muhurta for best results. Avoid Rahu Kala for important tasks.';
      }

      /* ── Human-readable date ─────────────────────────────────────────── */
      const dateStr = today.toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        timeZone: TEMPLE_LOCATION.timezone,
      });

      setData({
        tithi,
        nakshatra,
        yoga,
        karana,
        vara,
        sunrise,
        sunset,
        moonSign,
        paksha,
        masa,
        samvat,
        ritu,
        rahuKala,
        yamaghanda,
        gulika,
        abhijitMuhurta,
        festivals,
        specialNote,
        date: dateStr,
        // Raw index values (useful for Admin dashboard edits)
        _raw: p,
      });
    } catch (err) {
      console.error('[usePanchangam] Calculation error:', err);
      setError('Could not compute today\'s Panchangam. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial calculation
    compute();

    // Refresh at midnight so data is always correct for the current day
    const scheduleNextMidnight = () => {
      const now       = new Date();
      const tomorrow  = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 1, 0); // 1 second past midnight
      const msUntilMidnight = tomorrow - now;

      return setTimeout(() => {
        compute();
        // Re-schedule for the following night
        scheduleNextMidnight();
      }, msUntilMidnight);
    };

    const timerId = scheduleNextMidnight();
    return () => clearTimeout(timerId);
  }, [compute]);

  return { data, loading, error, refresh: compute };
}
