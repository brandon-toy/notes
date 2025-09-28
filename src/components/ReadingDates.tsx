interface ReadingDatesProps {
  started?: string;
  finished?: string;
}

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function ReadingDates({ started, finished }: ReadingDatesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!started && !finished) return null;

  return (
    <div className="reading-dates">
      <CalendarIcon />
      <div className="dates-info">
        {started && (
          <span className="date-item">
            <strong>Started:</strong> {formatDate(started)}
          </span>
        )}
        {finished && (
          <span className="date-item">
            <strong>Finished:</strong> {formatDate(finished)}
          </span>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .reading-dates {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1rem 0 2rem 0;
          padding: 0.75rem 1rem;
          background: rgba(var(--sl-color-accent-rgb), 0.1);
          border: 1px solid rgba(var(--sl-color-accent-rgb), 0.2);
          border-radius: 0.5rem;
          color: var(--sl-color-gray-1);
          font-size: 0.9rem;
        }

        .reading-dates svg {
          color: var(--sl-color-accent);
          flex-shrink: 0;
        }

        .dates-info {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .date-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .date-item strong {
          color: var(--sl-color-accent);
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .dates-info {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `,
        }}
      />
    </div>
  );
}
