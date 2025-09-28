import { useState, useEffect } from "react";
import Spinner from "./Spinner";

interface Note {
  title: string;
  slug: string;
  lastModified: string;
  description?: string;
  type: "book" | "note";
}

const BookIcon = () => (
  <svg
    width="20"
    height="20"
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
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14,2 14,8 20,8" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

export default function RecentNotes() {
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentNotes = async () => {
      try {
        setLoading(true);
        const response = await fetch("./api/recent-notes.json");
        if (response.ok) {
          const notes = await response.json();
          // Format the dates for display
          const formattedNotes = notes.map((note: any) => ({
            ...note,
            lastModified: new Date(note.lastModified).toLocaleDateString(),
          }));
          setRecentNotes(formattedNotes);
        } else {
          console.error("Failed to fetch recent notes");
        }
      } catch (error) {
        console.error("Error fetching recent notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentNotes();
  }, []);

  return (
    <div className="recent-notes">
      <h2>Recently Updated</h2>
      {loading ? (
        <div className="loading-container">
          <Spinner size={24} />
          <span>Loading recent notes...</span>
        </div>
      ) : (
        <div className="notes-grid">
          {recentNotes.map((note) => (
            <a key={note.slug} href={note.slug} className="note-card-link">
              <div className="note-card">
                <div className="note-header">
                  <div className="note-icon">
                    {note.type === "book" ? <BookIcon /> : <NoteIcon />}
                  </div>
                  <h3>{note.title}</h3>
                </div>

                <div className="last-modified">
                  <ClockIcon />
                  <span>Updated: {note.lastModified}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .recent-notes {
          margin: 2rem 0;
          padding: 1.5rem;
          background: var(--sl-color-bg-nav);
          border-radius: 0.5rem;
          border: 1px solid var(--sl-color-gray-5);
        }

        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .note-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .note-card {
          padding: 1.25rem;
          background: var(--sl-color-bg);
          border-radius: 0.5rem;
          border: 1px solid var(--sl-color-gray-6);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .note-card-link:hover .note-card {
          border-color: var(--sl-color-accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .note-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .note-icon {
          color: var(--sl-color-accent);
          display: block;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .note-card h3 {
          margin: 0;
          font-size: 1.1rem;
          flex: 1;
          line-height: 1.3;
        }

        .note-card h3 {
          color: var(--sl-color-white);
        }

        .note-card-link:hover .note-card h3 {
          color: var(--sl-color-accent);
        }

        .description {
          margin: 0 0 1rem 0;
          color: var(--sl-color-gray-2);
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .last-modified {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          color: var(--sl-color-gray-3);
          font-size: 0.8rem;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 2rem;
          color: var(--sl-color-gray-2);
          font-size: 0.9rem;
        }
      `,
        }}
      />
    </div>
  );
}
