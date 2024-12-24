export default function MainPageLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-50 overflow-hidden text-customGray">
        <main className="overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
