interface BookLinkProps {
  title: string;
  author: string;
  goodreadsUrl: string;
  coverImageUrl: string;
  isbn?: string;
  description?: string;
}

const GoodreadsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

export default function BookLink({
  title,
  author,
  goodreadsUrl,
  coverImageUrl,
  isbn,
  description,
}: BookLinkProps) {
  return (
    <div className="book-link-container">
      <div className="book-cover">
        <img
          src={coverImageUrl}
          alt={`Cover of ${title} by ${author}`}
          loading="lazy"
        />
      </div>

      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">by {author}</p>

        {description && <p className="book-description">{description}</p>}

        <div className="book-actions">
          <a
            href={goodreadsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="goodreads-link"
          >
            <GoodreadsIcon />
            View on Goodreads
          </a>

          {isbn && <span className="book-isbn">ISBN: {isbn}</span>}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .book-link-container {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          background: var(--sl-color-bg-nav);
          border: 1px solid var(--sl-color-gray-6);
          border-radius: 0.75rem;
          margin: 2rem 0;
          transition: all 0.2s ease;
        }

        .book-link-container:hover {
          border-color: var(--sl-color-accent);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .book-cover {
          flex-shrink: 0;
          width: 120px;
        }

        .book-cover img {
          width: 100%;
          height: auto;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }

        .book-link-container:hover .book-cover img {
          transform: scale(1.02);
        }

        .book-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .book-title {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--sl-color-white);
          line-height: 1.3;
        }

        .book-author {
          margin: 0;
          font-size: 1rem;
          color: var(--sl-color-gray-2);
          font-style: italic;
        }

        .book-description {
          margin: 0.5rem 0 0 0;
          color: var(--sl-color-gray-2);
          font-size: 0.9rem;
          line-height: 1.4;
          flex: 1;
        }

        .book-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
          padding-top: 1rem;
        }

        .goodreads-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--sl-color-accent);
          color: var(--sl-color-white);
          text-decoration: none;
          border-radius: 0.375rem;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .goodreads-link:hover {
          background: var(--sl-color-accent-high);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .book-isbn {
          font-size: 0.8rem;
          color: var(--sl-color-gray-3);
          font-family: monospace;
        }

        /* Responsive design */
        @media (max-width: 640px) {
          .book-link-container {
            flex-direction: column;
            text-align: center;
          }

          .book-cover {
            width: 150px;
            margin: 0 auto;
          }

          .book-actions {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `,
        }}
      />
    </div>
  );
}
