import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Snowflake,
  FlaskConical,
  QrCode,
  Syringe,
  ClipboardCheck,
  Inbox,
  Package,
  ShoppingBag,
  Building2,
  ChartColumn,
  CalendarX,
  ShieldCheck,
  Truck,
  CircleCheck,
  Hourglass,
  PlaneTakeoff,
  ArrowRightToLine,
  Eye,
  FileText,
  MoreVertical,
  Radar,
  CheckCheck,
  TriangleAlert,
  Thermometer,
} from "lucide-react";

/* ── Sidebar Navigation ─────────────────────────────────────────────────── */

export type NavItem = { id: string; label: string; icon: LucideIcon };
export type NavSection = { title: string; items: NavItem[] };

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Monitoring & Utama",
    items: [
      { id: "dashboard-alert-center", label: "Dashboard & Alert Center", icon: LayoutDashboard },
      { id: "monitoring-suhu-chiller", label: "Monitoring Suhu & Chiller", icon: Snowflake },
    ],
  },
  {
    title: "Manajemen Inventaris",
    items: [
      { id: "katalog-stok-reagensia", label: "Katalog Stok & Reagensia", icon: FlaskConical },
      { id: "pelacakan-batch-lot", label: "Pelacakan Batch & Lot", icon: QrCode },
      { id: "manajemen-bmhp-alkes", label: "Manajemen BMHP & Alkes", icon: Syringe },
    ],
  },
  {
    title: "Transaksi & Operasional",
    items: [
      { id: "pencatatan-pemakaian-harian", label: "Pencatatan Pemakaian Harian", icon: ClipboardCheck },
      { id: "permintaan-stok-internal", label: "Permintaan Stok Internal", icon: Inbox },
      { id: "penerimaan-barang", label: "Penerimaan Barang", icon: Package },
    ],
  },
  {
    title: "Pengadaan & Vendor",
    items: [
      { id: "purchase-order-e-katalog", label: "PO & E-Katalog", icon: ShoppingBag },
      { id: "daftar-vendor-supplier", label: "Daftar Vendor & Supplier", icon: Building2 },
    ],
  },
  {
    title: "Laporan & Kepatuhan",
    items: [
      { id: "laporan-mutasi-valuasi", label: "Laporan Mutasi & Valuasi", icon: ChartColumn },
      { id: "peringatan-fefo-expired", label: "Peringatan FEFO & Expired", icon: CalendarX },
      { id: "log-audit-kars-iso", label: "Log Audit (KARS & ISO)", icon: ShieldCheck },
    ],
  },
];

export const ACTIVE_NAV_ID = "penerimaan-barang";

export const LAB_UNITS = [
  { value: "pk", label: "Patologi Klinik" },
  { value: "mb", label: "Mikrobiologi" },
  { value: "bd", label: "Bank Darah" },
];

/* ── Procurement Pipeline Stepper ───────────────────────────────────────── */

export type PipelineStep = {
  stage: string;
  count: string;
  label: string;
  footerLeft: string;
  footerRight: string;
  badgeCls: string;
  valueCls: string;
  cardCls: string;
  footerRightCls: string;
  done?: boolean;
};

export const PIPELINE_STEPS: PipelineStep[] = [
  {
    stage: "Tahap 01",
    count: "3 PO",
    label: "Draft Usulan Unit",
    footerLeft: "Kebutuhan Rutin",
    footerRight: "Rp 48,2 Jt",
    badgeCls: "bg-surface-container-high text-on-surface-variant",
    valueCls: "text-on-surface",
    cardCls: "bg-surface-container-lowest hover:bg-surface-container-low",
    footerRightCls: "text-tertiary",
  },
  {
    stage: "Tahap 02",
    count: "2 PO",
    label: "Diajukan ke PPK/Pejabat",
    footerLeft: "Review Anggaran",
    footerRight: "Rp 112,8 Jt",
    badgeCls: "bg-secondary-container text-on-secondary-fixed-variant",
    valueCls: "text-on-surface",
    cardCls: "bg-surface-container-lowest hover:bg-surface-container-low",
    footerRightCls: "text-tertiary",
  },
  {
    stage: "Tahap 03",
    count: "5 PO",
    label: "Disetujui & SPK Terbit",
    footerLeft: "Kontrak Aktif",
    footerRight: "Rp 264,0 Jt",
    badgeCls: "bg-primary-fixed text-on-primary-fixed",
    valueCls: "text-primary",
    cardCls: "bg-surface-container-lowest hover:bg-surface-container-low",
    footerRightCls: "text-primary",
  },
  {
    stage: "Tahap 04",
    count: "4 PO",
    label: "Menunggu Pengiriman",
    footerLeft: "Dalam Ekspedisi Cold",
    footerRight: "1 Alert Lead",
    badgeCls: "bg-surface-container-highest text-on-surface",
    valueCls: "text-on-surface",
    cardCls: "bg-surface-container-lowest hover:bg-surface-container-low",
    footerRightCls: "text-on-surface",
  },
  {
    stage: "Tahap 05 (Selesai)",
    count: "12 PO",
    label: "Verifikasi Diterima Gudang",
    footerLeft: "Bulan Berjalan",
    footerRight: "100% Lolos QA",
    badgeCls: "bg-primary text-on-primary",
    valueCls: "text-primary",
    cardCls: "bg-surface-container-low hover:bg-surface-container",
    footerRightCls: "text-primary",
    done: true,
  },
];

/* ── Goods Receipt: Quality Checklist ───────────────────────────────────── */

export type QualityCheck = { id: string; title: string; desc: string };

export const QUALITY_CHECKS: QualityCheck[] = [
  {
    id: "seal",
    title: "Integritas Fisik & Segel",
    desc: "Kemasan primer/sekunder utuh, tidak bocor, segel pabrik valid.",
  },
  {
    id: "temp",
    title: "Suhu Kedatangan: 4.5°C",
    desc: "Ice gel dingin, datalogger USB terverifikasi rentang 2°C - 8°C.",
  },
  {
    id: "fefo",
    title: "Kepatuhan FEFO > 18 Bulan",
    desc: "Masa simpan memenuhi standar KARS akreditasi farmasi/lab.",
  },
  {
    id: "coa",
    title: "CoA & MSDS Terlampir",
    desc: "Sertifikat analisis batch pabrikan terverifikasi otentik.",
  },
];

/* ── Goods Receipt: Items ───────────────────────────────────────────────── */

export type ReceiptItem = {
  name: string;
  instrument: string;
  ordered: string;
  receivedQty: string;
  lot: string;
  expired: string;
  shelfLife: string;
};

export const RECEIPT_ITEMS: ReceiptItem[] = [
  {
    name: "Reagen HbA1c Direct",
    instrument: "Roche Cobas c501 / c311",
    ordered: "10 Kit",
    receivedQty: "Diterima: 10",
    lot: "#HBA-2025-01",
    expired: "28 Des 2026",
    shelfLife: "22 Bulan (Aman)",
  },
  {
    name: "Cellclean Sysmex 50ml",
    instrument: "Hematology Analyzer XN-550",
    ordered: "5 Botol",
    receivedQty: "Diterima: 5",
    lot: "#CLN-881",
    expired: "15 Jan 2027",
    shelfLife: "23 Bulan (Aman)",
  },
];

/** Simulated datalogger trace, 3 jam 14 menit transit (°C) */
export const TEMP_TRACE = [
  4.4, 4.5, 4.6, 4.5, 4.4, 4.5, 4.6, 4.7, 4.5, 4.4, 4.5, 4.5, 4.6, 4.5, 4.4, 4.5, 4.6, 4.5,
];

/* ── PO Registry ────────────────────────────────────────────────────────── */

export type POStatusKey = "inspecting" | "delivery" | "approved" | "pending" | "cito";

export type PURow = {
  po: string;
  date: string;
  items: string;
  vendor: string;
  method: "E-Katalog" | "Tender RS" | "Pengadaan Langsung";
  value: string;
  etaTitle: string;
  etaSub: string;
  etaCls: string;
  status: { key: POStatusKey; label: string };
  action: { icon: LucideIcon; title: string; toast: string };
};

export const PO_ROWS: PURow[] = [
  {
    po: "PO/2025/03/PK-0142",
    date: "04 Mar 2025",
    items: "2 Item",
    vendor: "PT Kimia Farma Trading",
    method: "E-Katalog",
    value: "Rp 44.250.000",
    etaTitle: "Hari Ini (Tiba)",
    etaSub: "09:15 WIB",
    etaCls: "text-primary",
    status: { key: "inspecting", label: "Pemeriksaan Gudang" },
    action: {
      icon: ArrowRightToLine,
      title: "Buka Form Verifikasi",
      toast: "Form verifikasi PO/2025/03/PK-0142 dibuka pada panel FEFO Gatekeeper.",
    },
  },
  {
    po: "PO/2025/03/MB-0089",
    date: "02 Mar 2025",
    items: "8 Item",
    vendor: "PT Enseval Putera Mega.",
    method: "E-Katalog",
    value: "Rp 88.600.000",
    etaTitle: "08 Mar 2025",
    etaSub: "H-1 Pengiriman",
    etaCls: "text-on-surface",
    status: { key: "delivery", label: "On Delivery" },
    action: {
      icon: Eye,
      title: "Lacak Ekspedisi",
      toast: "Lacak ekspedisi cold-chain PO/2025/03/MB-0089: posisi tol Cikampek KM 41.",
    },
  },
  {
    po: "PO/2025/03/BD-0045",
    date: "05 Mar 2025",
    items: "4 Item",
    vendor: "PT Anugerah Pharmindo",
    method: "Tender RS",
    value: "Rp 62.150.000",
    etaTitle: "12 Mar 2025",
    etaSub: "SPK Ditandatangani",
    etaCls: "text-on-surface",
    status: { key: "approved", label: "Disetujui Ka. Lab" },
    action: {
      icon: FileText,
      title: "Detail Kontrak",
      toast: "Dokumen kontrak SPK/2025/BD-0045 terbuka (PDF terenkripsi).",
    },
  },
  {
    po: "PO/2025/03/PK-0149",
    date: "06 Mar 2025",
    items: "6 Item",
    vendor: "PT Sysmex Indonesia",
    method: "E-Katalog",
    value: "Rp 115.400.000",
    etaTitle: "Menunggu SPK",
    etaSub: "Est. 14 Mar",
    etaCls: "text-secondary",
    status: { key: "pending", label: "Menunggu PPK" },
    action: {
      icon: MoreVertical,
      title: "Review Usulan",
      toast: "Usulan PO/2025/03/PK-0149 diteruskan ke antrean review PPK.",
    },
  },
  {
    po: "PO/2025/03/CITO-003",
    date: "Kemarin",
    items: "1 Item",
    vendor: "PT Bio Farma (Persero)",
    method: "Pengadaan Langsung",
    value: "Rp 18.500.000",
    etaTitle: "07 Mar (Hari Ini)",
    etaSub: "Kargo Udara CITO",
    etaCls: "text-primary",
    status: { key: "cito", label: "Pengiriman CITO" },
    action: {
      icon: Radar,
      title: "Tracking CITO",
      toast: "Kargo CITO PO/2025/03/CITO-003 telah mendarat — menuju gudang farmasi.",
    },
  },
];

export const PO_STATUS_META: Record<
  POStatusKey,
  { badgeCls: string; icon: LucideIcon | null; ping?: boolean }
> = {
  inspecting: { badgeCls: "bg-surface-container-highest text-tertiary", icon: null, ping: true },
  delivery: { badgeCls: "bg-surface-container-high text-on-surface-variant", icon: Truck },
  approved: { badgeCls: "bg-primary-fixed text-on-primary-fixed", icon: CheckCheck },
  pending: { badgeCls: "bg-surface-container-highest text-secondary", icon: Hourglass },
  cito: { badgeCls: "bg-surface-container-high text-primary", icon: PlaneTakeoff },
};

/* ── Notifications ──────────────────────────────────────────────────────── */

export type AppNotification = {
  id: string;
  icon: LucideIcon;
  toneCls: string;
  title: string;
  desc: string;
  time: string;
};

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    icon: TriangleAlert,
    toneCls: "bg-error text-on-error",
    title: "Stok Kritis: Reagen Glukosa GOD-PAP",
    desc: "Sisa 8 kit di bawah safety stock Patologi Klinik.",
    time: "12 mnt lalu",
  },
  {
    id: "n2",
    icon: CalendarX,
    toneCls: "bg-secondary-container text-on-secondary-fixed-variant",
    title: "FEFO: Lot #CLN-776 segera kedaluwarsa",
    desc: "Masa simpan tersisa 21 hari — prioritaskan pemakaian.",
    time: "1 jam lalu",
  },
  {
    id: "n3",
    icon: Thermometer,
    toneCls: "bg-primary text-on-primary",
    title: "CITO-003 kargo udara telah mendarat",
    desc: "Serah terima cold box ke gudang dalam ± 40 menit.",
    time: "2 jam lalu",
  },
];

export const RECEIVED_STATUS = { badgeCls: "bg-primary text-on-primary", icon: CircleCheck, label: "Diterima Gudang" };
