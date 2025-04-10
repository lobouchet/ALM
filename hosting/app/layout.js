import FirebasePerformance from '../components/FirebasePerformance';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FirebasePerformance />
        {children}
      </body>
    </html>
  );
} 