import { useMemo, useState } from "react";
import { Search, ListFilter, Gavel, PackageSearch, X, Check } from "lucide-react";
import { PO_ROWS, PO_STATUS_META, RECEIVED_STATUS } from "../data/labstock";
import { cn } from "../utils/cn";
import type { ToastTone } from "./Toast";

type Props = {
  received: boolean;
  pushToast: (t: { title: string; desc?: string; tone: ToastTone }) => void;
};

const METHOD_CLS: Record<string, string> = {
  "E-Katalog": "bg-secondary-container text-on-secondary-fixed-variant",
  "Tender RS": "bg-surface-container-high text-on-surface-variant",
  "Pengadaan Langsung": "bg-surface-container-high text-tertiary",
};

const FILTER_OPTIONS = ["Semua", ...PO_ROWS.map((r) => r.status.label)];

export default function PORegistryPanel({ received, pushToast }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [filterOpen, setFilterOpen] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PO_ROWS.filter((r) => {
      const matchQ =
        !q || r.po.toLowerCase().includes(q) || r.vendor.toLowerCase().includes(q);
      const matchF = filter === "Semua" || r.status.label === filter;
      return matchQ && matchF;
    });
  }, [query, filter]);

  return (
    <section
      className="flex animate-rise flex-col gap-space-base rounded-xl bg-surface-container-lowest p-space-lg shadow-panel xl:col-span-6"
      style={{ animationDelay: "220ms" }}
      aria-label="Daftar Purchase Order Aktif dan SPK"
    >
      {/* Header + tools */}
      <div className="flex flex-col justify-between gap-space-sm sm:flex-row sm:items-center">
        <div>
          <h2 className="font-sans text-title-sm text-on-surface">Daftar Purchase Order Aktif &amp; SPK</h2>
          <p className="mt-0.5 font-sans text-body-sm text-on-surface-variant">
            Pemantauan siklus pengadaan E-Katalog &amp; Vendor Rekanan RSUD
          </p>
        </div>
        <div className="flex items-center gap-space-xs">
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari No. PO atau Vendor..."
              className="h-8 w-52 rounded bg-surface-container-low pl-8 pr-7 font-sans text-body-sm text-on-surface shadow-inner transition-colors placeholder:text-on-surface-variant focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="pointer-events-none absolute left-2.5 top-2 h-4 w-4 text-on-surface-variant" />
            {query && (
              <button
                type="button"
                aria-label="Bersihkan pencarian"
                onClick={() => setQuery("")}
                className="absolute right-1.5 top-1.5 rounded-full p-0.5 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className={cn(
                "flex h-8 items-center gap-1 rounded px-space-sm font-sans text-caption transition-colors",
                filter !== "Semua"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
              )}
            >
              <ListFilter className="h-4 w-4" />
              <span>{filter === "Semua" ? "Filter" : filter}</span>
            </button>
            {filterOpen && (
              <>
                <button
                  type="button"
                  aria-label="Tutup filter"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setFilterOpen(false)}
                />
                <div className="absolute right-0 top-9 z-50 w-48 animate-toast-in overflow-hidden rounded-lg bg-surface-container-lowest py-space-xs shadow-pop ring-1 ring-on-surface/5">
                  {FILTER_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setFilter(opt);
                        setFilterOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between px-space-base py-1.5 text-left font-sans text-body-sm transition-colors hover:bg-surface-container-low",
                        opt === filter ? "font-semibold text-primary" : "text-on-surface-variant"
                      )}
                    >
                      {opt}
                      {opt === filter && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded bg-surface-container-low">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="bg-surface-container-high font-sans text-caption uppercase tracking-wider text-on-surface-variant">
              <th className="px-space-sm py-space-xs font-semibold">Nomor PO / SPK</th>
              <th className="px-space-sm py-space-xs font-semibold">Vendor &amp; Metode</th>
              <th className="px-space-sm py-space-xs text-right font-semibold">Nilai Kontrak</th>
              <th className="px-space-sm py-space-xs text-center font-semibold">Estimasi Tiba</th>
              <th className="px-space-sm py-space-xs text-center font-semibold">Status Approval</th>
              <th className="px-space-sm py-space-xs text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-highest font-sans text-body-sm">
            {rows.map((row) => {
              const isInspecting = row.status.key === "inspecting";
              const status =
                isInspecting && received
                  ? { badgeCls: RECEIVED_STATUS.badgeCls, icon: RECEIVED_STATUS.icon, label: RECEIVED_STATUS.label, ping: false }
                  : { ...PO_STATUS_META[row.status.key], label: row.status.label };
              const StatusIcon = status.icon;
              const ActionIcon = row.action.icon;

              return (
                <tr
                  key={row.po}
                  className={cn(
                    "transition-colors hover:bg-surface-container-lowest",
                    isInspecting && !received && "bg-surface-container-low"
                  )}
                >
                  <td className="px-space-sm py-space-sm">
                    <div
                      className={cn(
                        "font-mono text-data-mono-sm font-semibold",
                        isInspecting ? "text-primary" : "text-on-surface"
                      )}
                    >
                      {row.po}
                    </div>
                    <div className="font-sans text-caption text-secondary">
                      {row.date} • {row.items}
                    </div>
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <div className="max-w-[150px] truncate font-medium text-on-surface">{row.vendor}</div>
                    <span
                      className={cn(
                        "inline-block rounded px-1.5 py-px font-sans text-caption",
                        METHOD_CLS[row.method]
                      )}
                    >
                      {row.method}
                    </span>
                  </td>
                  <td className="px-space-sm py-space-sm text-right font-mono text-data-mono-sm font-medium text-on-surface">
                    {row.value}
                  </td>
                  <td className="px-space-sm py-space-sm text-center">
                    <span className={cn("font-sans text-caption font-semibold", row.etaCls)}>{row.etaTitle}</span>
                    <div className="font-sans text-caption text-secondary">{row.etaSub}</div>
                  </td>
                  <td className="px-space-sm py-space-sm text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded px-space-xs py-0.5 font-sans text-badge-label font-bold",
                        status.badgeCls
                      )}
                    >
                      {status.ping ? (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tertiary opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-tertiary" />
                        </span>
                      ) : (
                        StatusIcon && <StatusIcon className="h-3 w-3" strokeWidth={2.4} />
                      )}
                      {status.label}
                    </span>
                  </td>
                  <td className="px-space-sm py-space-sm text-center">
                    <button
                      type="button"
                      title={row.action.title}
                      onClick={() => pushToast({ title: row.action.title, desc: row.action.toast, tone: "info" })}
                      className={cn(
                        "rounded p-1 transition-colors hover:bg-surface-container-high",
                        isInspecting || row.status.key === "cito" ? "text-primary" : "text-secondary"
                      )}
                    >
                      <ActionIcon className="h-[18px] w-[18px]" />
                    </button>
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-space-sm py-space-2xl text-center">
                  <div className="flex flex-col items-center gap-space-xs text-on-surface-variant">
                    <PackageSearch className="h-8 w-8 text-outline-variant" strokeWidth={1.5} />
                    <span className="font-sans text-title-sm text-on-surface">Tidak ada PO yang cocok</span>
                    <span className="font-sans text-caption font-normal">
                      Coba kata kunci lain atau atur ulang filter status.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="-mt-space-xs flex items-center justify-between font-sans text-caption font-normal text-on-surface-variant">
        <span>
          Menampilkan <span className="font-semibold text-on-surface">{rows.length}</span> dari{" "}
          <span className="font-semibold text-on-surface">{PO_ROWS.length}</span> PO aktif
        </span>
        {filter !== "Semua" && (
          <button
            type="button"
            onClick={() => setFilter("Semua")}
            className="font-semibold text-primary hover:underline"
          >
            Atur ulang filter
          </button>
        )}
      </div>

      {/* Compliance banner */}
      <div className="mt-auto flex items-center justify-between gap-space-md rounded-lg bg-surface-container-low p-space-base">
        <div className="flex min-w-0 items-center gap-space-sm">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary-fixed text-primary">
            <Gavel className="h-[18px] w-[18px]" strokeWidth={1.9} />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="font-sans text-title-sm text-on-surface">Audit Jejak Digital Pengadaan Terkunci</span>
            <span className="truncate font-sans text-caption font-normal text-on-surface-variant">
              Sinkronisasi otomatis dengan SIRUP &amp; SIPD RSUD SMJ 1
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            pushToast({
              title: "Laporan BAP diekspor",
              desc: "BAP_Pengadaan_Mar2025.pdf (14 halaman, hash audit terverifikasi).",
              tone: "success",
            })
          }
          className="shrink-0 rounded bg-surface-container-lowest px-space-sm py-1 font-sans text-caption font-semibold text-on-surface shadow-sm transition-colors hover:bg-surface-container"
        >
          Ekspor PDF Laporan BAP
        </button>
      </div>
    </section>
  );
}
