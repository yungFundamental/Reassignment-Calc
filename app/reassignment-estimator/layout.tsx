export default function EstimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-full items-center justify-center h-full flex flex-col gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center relative w-full h-full">{children}</div>
    </section>
  );
}
