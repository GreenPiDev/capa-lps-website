import styles from './Hero.module.css';

// Ana yıldırım gövdesi. Çizim animasyonu için tüm yollar `pathLength="1"` taşır.
const BOLT_PATH = 'M330 0 L190 450 L330 450 L110 1000 L450 380 L310 380 L470 0 Z';
const BRANCH_PATHS = [
  'M262 610 L196 690 L214 748 L132 862',
  'M392 500 L468 584 L450 646 L540 752',
  'M236 300 L150 360 L166 410 L88 470',
];

export function Bolt() {
  return (
    <svg className={styles.bolt} viewBox="0 0 600 1000" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="bolt-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-cyan)" />
          <stop offset="100%" stopColor="var(--color-blue)" />
        </linearGradient>
        <linearGradient id="bolt-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-navy)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={BOLT_PATH} fill="url(#bolt-fill)" data-bolt-fill />
      <path d={BOLT_PATH} fill="var(--color-cyan)" opacity="0" data-flash />
      {BRANCH_PATHS.map((d) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          stroke="var(--color-cyan)"
          strokeOpacity="0.45"
          strokeWidth="1.25"
          data-bolt-line
        />
      ))}
      <path
        d={BOLT_PATH}
        pathLength={1}
        stroke="url(#bolt-stroke)"
        strokeWidth="2"
        strokeLinejoin="round"
        data-bolt-line
      />
    </svg>
  );
}
