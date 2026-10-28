import './globals.css';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          <header className="top">
            <div className="brand">CRONOGRAMA · SOCIOEDUCATIVO</div>
            <nav className="nav">
              <Link href="/dashboard">Visão geral</Link>
              <Link href="/gestao-diaria">Gestão diária</Link>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
