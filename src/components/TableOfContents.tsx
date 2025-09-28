import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { buildApiUrl, buildContentUrl } from "../utils/paths";

interface ContentItem {
  title: string;
  slug: string;
  description?: string;
}

const BookIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const NoteIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);

export default function TableOfContents() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const apiUrl = buildApiUrl("api/content-list.json");

        console.log("Fetching from:", apiUrl);

        const response = await fetch(apiUrl);
        console.log("Response status:", response.status);

        if (response.ok) {
          const contentItems: ContentItem[] = await response.json();
          setContents(contentItems);
          setError(null);
        } else {
          const errorText = await response.text();
          console.error("Response error:", errorText);
          setError(`Failed to fetch content list (${response.status})`);
        }
      } catch (error) {
        setError("Error fetching content");
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const getIcon = (slug: string) => {
    if (slug.startsWith("books/")) {
      return <BookIcon />;
    }
    return <NoteIcon />;
  };

  if (error) {
    return (
      <div className="table-of-contents">
        <div className="toc-header">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-of-contents">
      <section className="content-section">
        <h2 className="section-title">All Content</h2>
        <div className="content-grid">
          {contents.map((item) => (
            <a
              key={item.slug}
              href={buildContentUrl(item.slug)}
              className="content-card"
            >
              <div className="card-header">
                <div className="card-icon">{getIcon(item.slug)}</div>
                <h3>{item.title}</h3>
              </div>
              {item.description && (
                <p className="card-description">{item.description}</p>
              )}
            </a>
          ))}
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .table-of-contents {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .toc-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .toc-header h1 {
          margin: 0 0 0.5rem 0;
          color: var(--sl-color-white);
        }

        .toc-header p {
          margin: 0;
          color: var(--sl-color-gray-2);
          font-size: 1.1rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .loading-container p {
          margin: 0;
          color: var(--sl-color-gray-2);
          font-size: 1.1rem;
        }

        .content-section {
          margin-bottom: 3rem;
        }

        .section-title {
          color: var(--sl-color-accent);
          margin: 0 0 1.5rem 0;
          font-size: 1.5rem;
          border-bottom: 2px solid var(--sl-color-accent);
          padding-bottom: 0.5rem;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .content-card {
          display: block;
          padding: 1.5rem;
          background: var(--sl-color-bg-nav);
          border-radius: 0.5rem;
          border: 1px solid var(--sl-color-gray-6);
          transition: all 0.2s ease;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        .content-card:hover {
          border-color: var(--sl-color-accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .card-icon {
          color: var(--sl-color-accent);
          display: flex;
          align-items: center;
        }

        .content-card h3 {
          margin: 0;
          font-size: 1.2rem;
          flex: 1;
          color: var(--sl-color-white);
          transition: color 0.2s ease;
        }

        .content-card:hover h3 {
          color: var(--sl-color-accent);
        }

        .card-description {
          margin: 0;
          color: var(--sl-color-gray-2);
          line-height: 1.5;
        }
      `,
        }}
      />
    </div>
  );
}
