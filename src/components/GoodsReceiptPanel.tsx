import { useMemo, useState } from "react";
import {
  BadgeCheck,
  ReceiptText,
  Truck,
  IdCard,
  Thermometer,
  Paperclip,
  ClipboardCheck,
  CircleCheck,
  Snowflake,
  Lock,
  Award,
  Boxes,
  Ban,
  CheckCheck,
} from "lucide-react";
import { QUALITY_CHECKS, RECEIPT_ITEMS, TEMP_TRACE } from "../data/labstock";
import { cn } from "../utils/cn";
import type { ToastTone } from "./Toast";

type Props = {
  received: boolean;
  onConfirm: () => void;
  onReturn: () => void;
  pushToast: (t: { title: string; desc?: string; tone: ToastTone }) => void;
};

/* Mini datalogger trace with 2–8°C threshold band */
function TempSpark() {
  const W = 176;
  const H = 52;
  const MIN = 1;
  const MAX = 9;

  const { path, area, lastX, lastY, yLow, yHigh } = useMemo(() => {
    const yFor = (t: number) => H - ((t - MIN) / (MAX - MIN)) * H;
    const pts = TEMP_TRACE.map((t, i) => [
      (i / (TEMP_TRACE.length - 1)) * W,
      yFor(t),
    ] as const);
    const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const areaPath = `${line} L${W},${H} L0,${H} Z`;
    const [lastX, lastY] = pts[pts.length - 1];
    return { path: line, area: areaPath, lastX, lastY, yLow: yFor(2), yHigh: yFor(8) };
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-[52px] w-44 overflow-visible"
        role="img"
        aria-label="Grafik suhu transit stabil 4.5 derajat Celsius"
      >
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* threshold lines 8°C / 2°C */}
        <line x1="0" x2={W} y1={yHigh} y2={yHigh} stroke="#ba1a1a" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="0" x2={W} y1={yLow} y2={yLow} stroke="#005a6a" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
        <path d={area} fill="url(#spark-fill)" />
        <path d={path} fill="none" stroke="#0f766e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={lastX} cy={lastY} r="6" fill="#0f766e" opacity="0.25" className="animate-ping" />
        <circle cx={lastX} cy={lastY} r="2.75" fill="#0f766e" stroke="#ffffff" strokeWidth="1.25" />
      </svg>
      <div className="flex w-44 items-center justify-between font-mono text-[9px] text-on-surface-variant">
        <span>-3j 14m</span>
        <span className="text-error/70">max 8°C</span>
        <span>Kini</span>
      </div>
    </div>
  );
}

export default function GoodsReceiptPanel({ received, onConfirm, onReturn, pushToast }: Props) {
  const [checks, setChecks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(QUALITY_CHECKS.map((c) => [c.id, true]))
  );

  const doneCount = QUALITY_CHECKS.filter((c) => checks[c.id]).length;
  const allChecked = doneCount === QUALITY_CHECKS.length;

  return (
    <section
      className="flex animate-rise flex-col gap-space-base rounded-xl bg-surface-container-lowest p-space-lg shadow-panel xl:col-span-6"
      style={{ animationDelay: "160ms" }}
      aria-label="Verifikasi Penerimaan Barang Datang"
    >
      {/* Section Header */}
      <div className="flex items-start justify-between pb-space-sm">
        <div className="flex items-start gap-space-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary-fixed text-primary">
            <BadgeCheck className="h-6 w-6" strokeWidth={1.9} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-sans text-title-sm text-on-surface">Verifikasi Penerimaan Barang Datang</span>
              <span className="rounded bg-primary px-space-xs py-0.5 font-sans text-caption font-semibold uppercase text-on-primary">
                FEFO Gatekeeper
              </span>
            </div>
            <p className="mt-0.5 font-sans text-body-sm text-on-surface-variant">
              Quality inspection titik masuk sebelum batch terdaftar di inventaris aktif Patologi Klinik.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded bg-surface-container-low px-space-sm py-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="font-sans text-caption text-on-surface-variant">Sesi Aktif</span>
        </div>
      </div>

      {/* Document Metadata */}
      <div className="grid grid-cols-1 gap-space-md rounded-lg bg-surface-container-low p-space-base md:grid-cols-2">
        <div className="flex flex-col gap-space-2xs">
          <label className="font-sans text-caption font-semibold uppercase text-on-surface-variant">
            Nomor Surat Jalan / Faktur Vendor
          </label>
          <div className="flex items-center rounded bg-surface-container-lowest px-space-sm py-1.5 shadow-sm">
            <ReceiptText className="mr-space-xs h-4 w-4 text-primary" />
            <input
              readOnly
              value="SJ-2025/KFL/0981"
              className="w-full bg-transparent font-mono text-data-mono-md text-on-surface focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-space-2xs">
          <label className="font-sans text-caption font-semibold uppercase text-on-surface-variant">
            Nama Vendor / Distributor Terverifikasi
          </label>
          <div className="flex items-center rounded bg-surface-container-lowest px-space-sm py-1.5 shadow-sm">
            <Truck className="mr-space-xs h-4 w-4 text-tertiary" />
            <input
              readOnly
              value="PT Kimia Farma Trading & Distribution"
              className="w-full truncate bg-transparent font-sans text-body-sm text-on-surface focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-space-2xs">
          <label className="font-sans text-caption font-semibold uppercase text-on-surface-variant">
            Ref PO / SPK Pengadaan
          </label>
          <div className="flex items-center rounded bg-surface-container-lowest px-space-sm py-1.5 shadow-sm">
            <span className="font-mono text-data-mono-sm font-semibold text-primary">PO/2025/03/PK-0142</span>
            <span className="ml-auto font-sans text-caption text-secondary">E-Katalog V.5</span>
          </div>
        </div>
        <div className="flex flex-col gap-space-2xs">
          <label className="font-sans text-caption font-semibold uppercase text-on-surface-variant">
            Petugas Penerima Gudang
          </label>
          <div className="flex items-center rounded bg-surface-container-lowest px-space-sm py-1.5 shadow-sm">
            <IdCard className="mr-space-xs h-4 w-4 text-secondary" />
            <span className="font-sans text-body-sm font-medium text-on-surface">Bambang S., A.Md.AK</span>
          </div>
        </div>
      </div>

      {/* Quality Checklist */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-sans text-title-sm text-on-surface">
            Pemeriksaan Kelayakan Fisik &amp; Rantai Dingin
          </span>
          <span
            className={cn(
              "font-sans text-caption font-semibold transition-colors",
              allChecked ? "text-primary" : "text-error"
            )}
          >
            {doneCount}/{QUALITY_CHECKS.length} Standar Terpenuhi
          </span>
        </div>
        <div className="grid grid-cols-1 gap-space-sm md:grid-cols-2">
          {QUALITY_CHECKS.map((c) => (
            <label
              key={c.id}
              className={cn(
                "flex cursor-pointer items-start gap-space-sm rounded p-space-sm transition-colors",
                checks[c.id]
                  ? "bg-surface-container-low hover:bg-surface-container"
                  : "bg-error-container/40 hover:bg-error-container/60"
              )}
            >
              <input
                type="checkbox"
                checked={!!checks[c.id]}
                onChange={() => setChecks((s) => ({ ...s, [c.id]: !s[c.id] }))}
                className="mt-0.5 h-4 w-4 rounded accent-primary"
              />
              <div className="flex min-w-0 flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-sans text-title-sm leading-tight text-on-surface">{c.title}</span>
                  {c.id === "temp" && <Snowflake className="h-3.5 w-3.5 text-primary" />}
                </div>
                <span className="mt-0.5 font-sans text-caption font-normal text-on-surface-variant">{c.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Items Table */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-sans text-title-sm text-on-surface">Rincian Fisik Item &amp; Pencatatan Lot</span>
          <span className="font-sans text-caption text-secondary">2 Produk Dalam Pengiriman</span>
        </div>
        <div className="overflow-x-auto rounded bg-surface-container-low">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="bg-surface-container-high font-sans text-caption uppercase tracking-wider text-on-surface-variant">
                <th className="px-space-sm py-space-xs font-semibold">Nama Reagen &amp; Instrumen</th>
                <th className="px-space-sm py-space-xs text-center font-semibold">Order vs Fisik</th>
                <th className="px-space-sm py-space-xs font-semibold">Nomor Lot/Batch</th>
                <th className="px-space-sm py-space-xs font-semibold">Tanggal Expired</th>
                <th className="px-space-sm py-space-xs text-center font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest font-sans text-body-sm">
              {RECEIPT_ITEMS.map((item) => (
                <tr key={item.lot} className="transition-colors hover:bg-surface-container-lowest">
                  <td className="px-space-sm py-space-sm">
                    <div className="font-medium text-on-surface">{item.name}</div>
                    <div className="font-sans text-caption text-secondary">{item.instrument}</div>
                  </td>
                  <td className="px-space-sm py-space-sm text-center">
                    <span className="font-mono text-data-mono-sm font-semibold text-on-surface">{item.ordered}</span>
                    <div className="font-sans text-caption text-primary">{item.receivedQty}</div>
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <span className="rounded bg-surface-container px-space-xs py-0.5 font-mono text-data-mono-sm font-semibold text-tertiary">
                      {item.lot}
                    </span>
                  </td>
                  <td className="px-space-sm py-space-sm">
                    <div className="font-mono text-data-mono-sm text-on-surface">{item.expired}</div>
                    <div className="font-sans text-caption text-primary">{item.shelfLife}</div>
                  </td>
                  <td className="px-space-sm py-space-sm text-center">
                    <span className="inline-flex items-center gap-1 rounded bg-surface-container-high px-space-xs py-0.5 font-sans text-badge-label font-bold text-primary">
                      <CircleCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                      Sesuai
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cold-Chain Telemetry */}
      <div className="flex flex-col items-center justify-between gap-space-base rounded-lg bg-surface-container-low p-space-base md:flex-row">
        <div className="flex items-center gap-space-md">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary">
            <Thermometer className="h-6 w-6" strokeWidth={1.9} />
          </div>
          <div>
            <div className="font-sans text-caption font-semibold uppercase text-secondary">
              Sensor Datalogger Portabel
            </div>
            <div className="flex items-center gap-space-xs font-sans text-headline-md font-bold text-on-surface">
              <span>4.5°C</span>
              <span className="rounded bg-surface-container-high px-space-xs py-0.5 font-sans text-caption font-semibold text-primary">
                Stabil (2-8°C)
              </span>
            </div>
            <p className="font-sans text-caption font-normal text-on-surface-variant">
              Cold box transit: 3 jam 14 menit | Deviasi: 0.0°C
            </p>
          </div>
        </div>

        <div className="hidden shrink-0 lg:block">
          <TempSpark />
        </div>

        <div className="flex w-full items-center gap-space-xs md:w-auto">
          <button
            type="button"
            onClick={() =>
              pushToast({
                title: "Log suhu diunduh",
                desc: "datalogger_SJ-2025-KFL-0981.csv (194 titik data, interval 60 dtk).",
                tone: "info",
              })
            }
            className="flex flex-1 items-center justify-center gap-space-2xs rounded bg-surface-container-lowest px-space-sm py-1.5 font-sans text-body-sm text-on-surface shadow-sm transition-colors hover:bg-surface-container md:flex-none"
          >
            <Paperclip className="h-4 w-4 text-tertiary" />
            <span>Unduh Log Suhu</span>
          </button>
          <button
            type="button"
            onClick={() =>
              pushToast({
                title: "BAP Lampiran dibuka",
                desc: "Berita Acara Pemeriksaan dilampirkan ke berkas PO/2025/03/PK-0142.",
                tone: "info",
              })
            }
            className="flex flex-1 items-center justify-center gap-space-2xs rounded bg-surface-container-lowest px-space-sm py-1.5 font-sans text-body-sm text-on-surface shadow-sm transition-colors hover:bg-surface-container md:flex-none"
          >
            <ClipboardCheck className="h-4 w-4 text-primary" />
            <span>BAP Lampiran</span>
          </button>
        </div>
      </div>

      {/* Dual Signature */}
      <div className="grid grid-cols-1 gap-space-base pt-space-xs md:grid-cols-2">
        <div className="flex flex-col justify-between rounded bg-surface-container-lowest p-space-base shadow-sm ring-1 ring-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-sans text-caption font-semibold uppercase text-secondary">
              Paraf Petugas Gudang Farmasi
            </span>
            <BadgeCheck className="h-[18px] w-[18px] text-primary" />
          </div>
          <div className="flex items-center gap-space-sm py-space-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high font-sans text-title-sm text-primary">
              BS
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-title-sm text-on-surface">Bambang Subagyo</span>
              <span className="font-mono text-data-mono-sm text-on-surface-variant">NIP. 19880412 201101 1 002</span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-sans text-caption text-primary">
            <Lock className="h-3.5 w-3.5" />
            <span>Digital Stamp Valid: 07-Mar-2025 09:42 WIB</span>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded bg-surface-container-lowest p-space-base shadow-sm ring-1 ring-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-sans text-caption font-semibold uppercase text-secondary">
              Approval Kepala Logistik / Ka. Ruang
            </span>
            <Award className="h-[18px] w-[18px] text-primary" />
          </div>
          <div className="flex items-center gap-space-sm py-space-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container font-sans text-title-sm text-on-primary">
              RD
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-title-sm text-on-surface">dr. Ratna Dewi, Sp.PK</span>
              <span className="font-mono text-data-mono-sm text-on-surface-variant">SIP. 446/184/SP.PK/DINKES</span>
            </div>
          </div>
          <div className="flex items-center gap-1 font-sans text-caption text-primary">
            <BadgeCheck className="h-3.5 w-3.5" />
            <span>Otorisasi Medis Siap Rilis ke Rak</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-space-2xs pt-space-xs">
        <div className="flex flex-col items-center gap-space-sm sm:flex-row">
          <button
            type="button"
            disabled={received || !allChecked}
            onClick={onConfirm}
            className={cn(
              "flex w-full items-center justify-center gap-space-xs rounded px-space-base py-3 font-sans text-title-sm shadow transition-all sm:flex-1",
              received
                ? "cursor-default bg-primary-container text-on-primary"
                : allChecked
                  ? "bg-primary text-on-primary hover:-translate-y-px hover:bg-primary-container"
                  : "cursor-not-allowed bg-surface-container-highest text-on-surface-variant shadow-none"
            )}
          >
            {received ? (
              <>
                <CheckCheck className="h-5 w-5" />
                <span>Batch Masuk Stok Aktif — Selesai</span>
              </>
            ) : (
              <>
                <Boxes className="h-5 w-5" />
                <span>Konfirmasi Penerimaan &amp; Tambahkan ke Stok Aktif</span>
              </>
            )}
          </button>
          <button
            type="button"
            disabled={received}
            onClick={onReturn}
            className={cn(
              "flex w-full items-center justify-center gap-space-2xs rounded px-space-base py-3 font-sans text-title-sm transition-all sm:w-auto",
              received
                ? "cursor-not-allowed bg-surface-container text-on-surface-variant"
                : "bg-surface-container text-error hover:-translate-y-px hover:bg-error-container hover:text-on-error-container"
            )}
          >
            <Ban className="h-[18px] w-[18px]" />
            <span>Retur / Tolak Barang</span>
          </button>
        </div>
        {!allChecked && !received && (
          <p className="text-center font-sans text-caption font-normal text-error">
            Lengkapi seluruh {QUALITY_CHECKS.length} standar kelayakan sebelum batch dirilis ke stok aktif.
          </p>
        )}
      </div>
    </section>
  );
}
