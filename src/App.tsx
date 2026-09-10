import { useCallback, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import PageHeader from "./components/PageHeader";
import PipelineStepper from "./components/PipelineStepper";
import GoodsReceiptPanel from "./components/GoodsReceiptPanel";
import PORegistryPanel from "./components/PORegistryPanel";
import { ToastStack, useToasts } from "./components/Toast";
import { ShieldCheck } from "lucide-react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [received, setReceived] = useState(false);
  const { toasts, push } = useToasts();

  const handleConfirm = useCallback(() => {
    setReceived(true);
    push({
      title: "Penerimaan barang dikonfirmasi",
      desc: "2 batch (15 item) masuk stok aktif Patologi Klinik • Log audit KARS & ISO 15189 tercatat otomatis.",
      tone: "success",
    });
  }, [push]);

  const handleReturn = useCallback(() => {
    push({
      title: "Formulir retur dibuka",
      desc: "Dokumen pengembalian SJ-2025/KFL/0981 disiapkan untuk PT Kimia Farma Trading.",
      tone: "danger",
    });
  }, [push]);

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <TopBar onMenu={() => setSidebarOpen(true)} pushToast={push} />

        <main className="min-h-screen w-full bg-background pt-16">
          <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-space-xl px-space-base py-space-xl md:px-space-xl">
            <PageHeader pushToast={push} />
            <PipelineStepper received={received} />

            <div className="grid grid-cols-1 gap-space-xl xl:grid-cols-12">
              <GoodsReceiptPanel
                received={received}
                onConfirm={handleConfirm}
                onReturn={handleReturn}
                pushToast={push}
              />
              <PORegistryPanel received={received} pushToast={push} />
            </div>

            <footer className="flex flex-col items-center justify-between gap-space-sm pb-space-xs pt-space-xs sm:flex-row">
              <div className="flex items-center gap-space-xs font-sans text-caption font-normal text-on-surface-variant">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>
                  Labstock RSUD SMJ 1 — Modul Katalog &amp; Logistik Laboratorium • Terakreditasi KARS &amp; ISO
                  15189
                </span>
              </div>
              <span className="font-mono text-data-mono-sm text-secondary">
                Sesi 07-Mar-2025 • Gudang Farmasi Lt. 1 • WIB
              </span>
            </footer>
          </div>
        </main>
      </div>

      <ToastStack toasts={toasts} />
    </div>
  );
}
