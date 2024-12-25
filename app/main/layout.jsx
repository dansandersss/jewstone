export default function MainPageLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-50 overflow-x-hidden text-customGray">
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
