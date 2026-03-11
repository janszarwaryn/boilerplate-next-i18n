export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>404</h1>
            <p style={{ color: '#666' }}>Page not found</p>
          </div>
        </div>
      </body>
    </html>
  );
}
