import Link from "next/link";

export default function Home({ posts }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Witaj na Kuba.me</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/${post.slug}`}>
            <a className="block p-4 border rounded hover:bg-gray-50 transition">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.excerpt}</p>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}
