interface ReadingProgressProps {
  started: string;
  finished?: string;
}

export default function ReadingProgress({
  started,
  finished,
}: ReadingProgressProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDuration = () => {
    if (!finished) return null;
    const startDate = new Date(started);
    const endDate = new Date(finished);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const duration = calculateDuration();

  return (
    <div className="reading-dates">
      <span className="date-item">
        <strong>Started:</strong> {formatDate(started)}
      </span>
      {finished && (
        <span className="date-item">
          <strong>Finished:</strong> {formatDate(finished)}
        </span>
      )}
      {duration && (
        <span className="date-item">
          <strong>Duration:</strong> {duration} day{duration !== 1 ? "s" : ""}
        </span>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .reading-dates {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin: 1rem 0;
          font-size: 0.9rem;
          color: var(--sl-color-gray-2);
        }

        .date-item strong {
          color: var(--sl-color-white);
        }
      `,
        }}
      />
    </div>
  );
}
