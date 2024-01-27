export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="z-10">{children}</div>;
}
