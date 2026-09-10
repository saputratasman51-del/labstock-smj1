import { CloudDownload, ScanLine, CirclePlus } from "lucide-react";
import type { ToastTone } from "./Toast";

type Props = {
  pushToast: (t: { title: string; desc?: string; tone: ToastTone }) => void;
};

export default function PageHeader({ pushToast }: Props) {
  return (
    <div className="flex animate-rise flex-col justify-between gap-space-base pb-space-xs xl:flex-row xl:items-center">
      <div className="flex flex-col gap-space-2xs">
        <div className="flex items-center gap-space-xs font-sans text-caption uppercase tracking-wider text-secondary">
          <span>Pengadaan &amp; Logistik Terpadu</span>
          <span className="text-outline-variant">/</span>
          <span className="font-semibold text-primary">Alur PO &amp; Verifikasi Fisik</span>
        </div>
        <h1 className="font-sans text-headline-lg tracking-tight text-on-surface">
          Pengadaan Reagensia &amp; Verifikasi Penerimaan Barang (Goods Receipt)
        </h1>
        <p className="max-w-3xl font-sans text-body-sm text-on-surface-variant">
          Standar Akreditasi KARS &amp; ISO 15189: Pemeriksaan integritas cold-chain, nomor lot/batch, serta
          kepatuhan FEFO saat penerimaan reagensia diagnostik.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm">
        <button
          type="button"
          onClick={() =>
            pushToast({
              title: "Sinkronisasi E-Katalog LKPP dimulai",
              desc: "Mengambil 214 katalog produk reagensia dari penyedia terverifikasi.",
              tone: "info",
            })
          }
          className="flex items-center gap-space-xs rounded bg-surface-container-lowest px-space-base py-2 font-sans text-title-sm text-on-surface shadow-sm transition-all hover:-translate-y-px hover:bg-surface-container-high"
        >
          <CloudDownload className="h-[18px] w-[18px] text-tertiary" />
          <span>Import E-Katalog LKPP</span>
        </button>
        <button
          type="button"
          onClick={() =>
            pushToast({
              title: "Mode verifikasi QR aktif",
              desc: "Pindai QR pada surat jalan vendor untuk mencocokkan PO terbuka.",
              tone: "info",
            })
          }
          className="flex items-center gap-space-xs rounded bg-secondary-container px-space-base py-2 font-sans text-title-sm text-on-secondary-container shadow-sm transition-all hover:-translate-y-px hover:bg-surface-container-highest"
        >
          <ScanLine className="h-[18px] w-[18px] text-primary" />
          <span>Verifikasi Barang Datang (QR Check)</span>
        </button>
        <button
          type="button"
          onClick={() =>
            pushToast({
              title: "Draft PO baru dibuat",
              desc: "PO/2025/03/PK-0150 berstatus Draft Usulan Unit — Tahap 01.",
              tone: "success",
            })
          }
          className="flex items-center gap-space-xs rounded bg-primary px-space-base py-2 font-sans text-title-sm text-on-primary shadow transition-all hover:-translate-y-px hover:bg-primary-container"
        >
          <CirclePlus className="h-[18px] w-[18px]" />
          <span>Buat Purchase Order (PO)</span>
        </button>
      </div>
    </div>
  );
}
