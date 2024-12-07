export default function MainPageLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-50 text-gray-900">
        <main>{children}</main>
      </body>
    </html>
  );
}
