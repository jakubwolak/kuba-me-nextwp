// app/[slug]/page.tsx

interface Page {
  title: { rendered: string };
  content: { rendered: string };
}

async function getPageBySlug(slug: string): Promise<Page | null> {
  const res = await fetch(`https://cms.kuba.me/wp-json/wp/v2/pages?slug=${slug}`, { next: { revalidate: 60 } });
  const pages = await res.json();
  return pages.length > 0 ? pages[0] : null;
}

export default async function Page({ params }: { params: { slug: string } }) {

  const page = await getPageBySlug(params.slug);

  if (!page) return <div>Strona nie znaleziona</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{page.title.rendered}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </div>
  );
}
