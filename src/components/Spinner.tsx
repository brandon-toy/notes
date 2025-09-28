interface SpinnerProps {
  size?: number;
  color?: string;
}

export default function Spinner({
  size = 24,
  color = "var(--sl-color-accent)",
}: SpinnerProps) {
  return (
    <div className="spinner-container">
      <svg
        className="spinner"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeOpacity="0.2"
          fill="none"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeLinecap="round"
          fill="none"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          className="spinner-circle"
        />
      </svg>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .spinner-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        .spinner-circle {
          animation: spinner-dash 1.5s ease-in-out infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinner-dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
      `,
        }}
      />
    </div>
  );
}
