import { useEffect, useState } from "react";
import { Bell, Clock3, Menu, ScanBarcode, Thermometer, User, X } from "lucide-react";
import { NOTIFICATIONS } from "../data/labstock";
import { cn } from "../utils/cn";
import type { ToastTone } from "./Toast";

type Props = {
  onMenu: () => void;
  pushToast: (t: { title: string; desc?: string; tone: ToastTone }) => void;
};

export default function TopBar({ onMenu, pushToast }: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [unread, setUnread] = useState(NOTIFICATIONS.length);
  const [now, setNow] = useState(() => new Date());
  const [temp, setTemp] = useState(4.2);

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setTemp(+(4.1 + Math.random() * 0.3).toFixed(1));
    }, 4000);
    return () => window.clearInterval(t);
  }, []);

  const timeStr = now
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    })
    .replace(/\./g, ":");

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between bg-surface-container-lowest/90 px-space-base shadow-card backdrop-blur-md lg:left-64 lg:px-space-xl">
      {/* Left cluster */}
      <div className="flex items-center gap-space-base">
        <button
          onClick={onMenu}
          className="rounded p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface lg:hidden"
          aria-label="Buka menu navigasi"
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-space-sm rounded bg-surface-container-low px-space-sm py-1 md:flex">
          <Thermometer className="h-4 w-4 text-primary" strokeWidth={2} />
          <span className="font-sans text-caption text-on-surface-variant">Chiller:</span>
          <span className="font-mono text-data-mono-sm font-semibold text-primary">
            {temp.toFixed(1)}°C (Aman)
          </span>
        </div>

        <div className="hidden items-center gap-space-sm rounded bg-surface-container-low px-space-sm py-1 md:flex">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-sans text-caption text-on-surface-variant">LIS:</span>
          <span className="font-mono text-data-mono-sm font-semibold text-on-surface">Online</span>
        </div>

        <div className="hidden items-center gap-space-xs rounded bg-surface-container-low px-space-sm py-1 font-sans text-caption text-on-surface-variant xl:flex">
          <Clock3 className="h-[15px] w-[15px]" />
          <span>
            Shift Pagi: 07.00 - 14.00
            <span className="mx-1.5 text-outline-variant">•</span>
            <span className="font-mono text-data-mono-sm font-semibold text-on-surface">{timeStr} WIB</span>
          </span>
        </div>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-space-md">
        <button
          type="button"
          onClick={() =>
            pushToast({
              title: "Pemindai barcode/QR aktif",
              desc: "Arahkan kamera ke label batch reagensia untuk membuka kartu lot.",
              tone: "info",
            })
          }
          className="flex items-center gap-space-xs rounded bg-primary-container px-space-base py-1.5 font-sans text-title-sm text-on-primary shadow-sm transition-colors hover:bg-primary"
        >
          <ScanBarcode className="h-[18px] w-[18px]" />
          <span className="hidden sm:inline">Pindai Barcode/QR</span>
          <span className="sm:hidden">Pindai</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            title={`${unread} Peringatan Kedaluwarsa & Stok Kritis`}
            className={cn(
              "relative rounded p-1.5 transition-colors",
              notifOpen
                ? "bg-surface-container-high text-on-surface"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            )}
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-error font-sans text-badge-label text-on-error">
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              <button
                aria-label="Tutup notifikasi"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setNotifOpen(false)}
                type="button"
              />
              <div className="absolute right-0 top-11 z-50 w-[min(92vw,340px)] animate-toast-in overflow-hidden rounded-lg bg-surface-container-lowest shadow-pop ring-1 ring-on-surface/5">
                <div className="flex items-center justify-between bg-surface-container-low px-space-base py-space-sm">
                  <span className="font-sans text-title-sm text-on-surface">Peringatan Aktif</span>
                  <span className="rounded-full bg-error px-1.5 py-0.5 font-sans text-badge-label text-on-error">
                    {unread} Baru
                  </span>
                </div>
                <div className="flex flex-col divide-y divide-surface-container">
                  {NOTIFICATIONS.map((n) => {
                    const Icon = n.icon;
                    return (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() =>
                          pushToast({ title: n.title, desc: "Peringatan dicatat ke log audit KARS.", tone: "info" })
                        }
                        className="flex items-start gap-space-md px-space-base py-space-md text-left transition-colors hover:bg-surface-container-low"
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                            n.toneCls
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                        </span>
                        <span className="flex min-w-0 flex-col gap-0.5">
                          <span className="font-sans text-body-sm font-medium text-on-surface">{n.title}</span>
                          <span className="font-sans text-caption font-normal text-on-surface-variant">
                            {n.desc}
                          </span>
                          <span className="pt-0.5 font-mono text-data-mono-sm text-secondary">{n.time}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUnread(0);
                    setNotifOpen(false);
                    pushToast({ title: "Semua peringatan ditandai dibaca", tone: "success" });
                  }}
                  className="flex w-full items-center justify-center gap-space-xs bg-surface-container-lowest py-space-sm font-sans text-caption font-semibold text-primary transition-colors hover:bg-surface-container-low"
                >
                  <X className="h-3.5 w-3.5" />
                  Tandai Semua Dibaca
                </button>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-space-sm pl-space-xs">
          <div className="hidden min-w-0 flex-col items-end md:flex">
            <span className="truncate font-sans text-title-sm leading-tight text-on-surface">
              dr. Ratna Dewi, Sp.PK
            </span>
            <span className="truncate font-sans text-caption text-on-surface-variant">
              Kepala Lab / Super Admin
            </span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-sm">
            <User className="h-[18px] w-[18px] text-on-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
