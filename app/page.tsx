// app/page.tsx

import Link from 'next/link'

async function getPages() {
  const res = await fetch('https://cms.kuba.me/wp-json/wp/v2/pages', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch pages');
  return res.json();
}

export default async function Home() {
  const pages = await getPages();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">Witaj na stronie Kuby</h1>
      <ul className="space-y-4">
        {pages.map((page: any) => (
          <li key={page.id}>
            <Link href={`/${page.slug}`} className="text-xl text-blue-600 hover:underline">
              {page.title.rendered}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
