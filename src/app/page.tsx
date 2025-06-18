export default function Home() {
  return (
    <section className="min-h-screen flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">📊 Budget Planner</h1>
          <p className="text-muted-foreground text-sm">
            Catat dan kelola keuangan pribadi kamu dengan cepat & mudah.
          </p>
        </div>

        <div className="rounded-xl border border-dashed p-6 text-center text-sm text-gray-500">
          Belum ada data transaksi. Silakan tambahkan dari form di bawah nanti.
        </div>
      </div>
    </section>
  );
}
