import { getPageBySlug, getAllPages } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";

export interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 3600;

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const pages = await getAllPages();

  return pages.map((page: any) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);

  if (!page) return {};

  const description = page.excerpt?.rendered
    ? page.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
    : page.content.rendered.replace(/<[^>]*>/g, "").trim().slice(0, 200) + "...";

  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", page.title.rendered);
  ogUrl.searchParams.append("description", description);

  return {
    title: page.title.rendered,
    description,
    openGraph: {
      title: page.title.rendered,
      description,
      url: `${siteConfig.site_domain}/${page.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title.rendered,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title.rendered,
      description,
      images: [ogUrl.toString()],
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const page = await getPageBySlug(params.slug);

  return (
    <Section>
      <Container>
        <Prose>
          <h1>{page.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </Prose>
      </Container>
    </Section>
  );
};

export default Page;
