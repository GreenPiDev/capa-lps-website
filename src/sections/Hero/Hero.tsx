import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { gsap, SplitText, useGSAP } from '../../animations/gsap';
import { SITE } from '../../content/site';
import { Bolt } from './Bolt';
import styles from './Hero.module.css';

const COPIED_RESET_MS = 2000;
const CURRENT_YEAR = new Date().getFullYear();

export function Hero() {
  const { t, i18n } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
    } catch {
      // Pano izni yoksa sessizce geçilir, e-posta bağlantısı yine kullanılabilir.
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          finePointer: '(hover: hover) and (pointer: fine)',
        },
        (context) => {
          const { motion, finePointer } = context.conditions as Record<'motion' | 'finePointer', boolean>;
          if (!motion) return;

          const q = gsap.utils.selector(rootRef);

          // Giriş: arka plan, yıldırım çizimi, başlık satırları ve içerik sırayla gelir.
          const intro = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.4 } });
          intro
            .from(q('[data-anim="backdrop"]'), { autoAlpha: 0, duration: 2, ease: 'power2.out' }, 0)
            .fromTo(
              q('[data-bolt-line]'),
              { strokeDasharray: 1, strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1.6, ease: 'power3.inOut', stagger: 0.12 },
              0.2,
            )
            .from(q('[data-bolt-fill]'), { autoAlpha: 0, duration: 1.2, ease: 'power2.out' }, 1.2)
            .from(q('[data-anim="header"]'), { autoAlpha: 0, y: -16, stagger: 0.08 }, 0.3)
            .from(q('[data-anim="fade"]'), { autoAlpha: 0, y: 28, stagger: 0.1 }, 0.75);

          if (titleRef.current) {
            SplitText.create(titleRef.current, {
              type: 'lines',
              mask: 'lines',
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 110,
                  duration: 1.4,
                  ease: 'expo.out',
                  stagger: 0.1,
                  delay: 0.45,
                }),
            });
          }

          // Aralıklı yıldırım çakması: yalnızca opacity ile.
          gsap
            .timeline({ repeat: -1, repeatDelay: 5.5, delay: 2.8 })
            .to(q('[data-flash]'), { opacity: 0.9, duration: 0.05, ease: 'none' })
            .to(q('[data-flash]'), { opacity: 0.15, duration: 0.07, ease: 'none' })
            .to(q('[data-flash]'), { opacity: 0.7, duration: 0.05, ease: 'none' })
            .to(q('[data-flash]'), { opacity: 0, duration: 1.4, ease: 'power3.out' });

          if (!finePointer) return;

          // Fare ile hafif derinlik hissi.
          const layers = q('[data-depth]').map((el) => {
            const depth = Number((el as HTMLElement).dataset.depth);
            return {
              depth,
              x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
              y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
            };
          });

          const onPointerMove = (event: PointerEvent) => {
            const nx = event.clientX / window.innerWidth - 0.5;
            const ny = event.clientY / window.innerHeight - 0.5;
            for (const layer of layers) {
              layer.x(nx * layer.depth);
              layer.y(ny * layer.depth);
            }
          };

          window.addEventListener('pointermove', onPointerMove);
          return () => window.removeEventListener('pointermove', onPointerMove);
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backdrop} data-anim="backdrop" aria-hidden="true">
        <div className={styles.grid} />
        <div className={styles.glow} data-depth="-40" />
        <div className={styles.glowLow} data-depth="30" />
        <div className={styles.flash} data-flash />
        <div className={styles.boltWrap} data-depth="-18">
          <Bolt />
        </div>
      </div>

      <header className={styles.header}>
        <img
          className={styles.logo}
          src={SITE.logo.src}
          width={SITE.logo.width}
          height={SITE.logo.height}
          alt={t('logoAlt', { brand: SITE.brand })}
          fetchPriority="high"
          data-anim="header"
        />
        <p className={styles.status} data-anim="header">
          <span className={styles.statusDot} aria-hidden="true" />
          {t('hero.status')}
        </p>
      </header>

      <div className={styles.content}>
        <p className={styles.eyebrow} data-anim="fade">
          {t('hero.eyebrow')}
        </p>
        {/* SplitText DOM'u değiştirdiği için dil değişiminde başlık yeniden oluşturulur. */}
        <h1 key={i18n.language} ref={titleRef} id="hero-title" className={styles.title}>
          <Trans i18nKey="hero.title" components={{ accent: <span className={styles.accent} /> }} />
        </h1>
        <p className={styles.lead} data-anim="fade">
          {t('hero.lead')}
        </p>

        <div className={styles.contact} data-anim="fade">
          <span className={styles.contactLabel}>{t('hero.contactLabel')}</span>
          <div className={styles.contactRow}>
            <a
              className={styles.mail}
              href={`mailto:${SITE.email}`}
              aria-label={t('hero.mailAria', { email: SITE.email })}
            >
              <span>{SITE.email}</span>
              <svg className={styles.mailArrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              className={styles.copy}
              onClick={copyEmail}
              aria-label={t('hero.copyAria')}
              data-copied={copied || undefined}
            >
              <span aria-live="polite">{copied ? t('hero.copied') : t('hero.copy')}</span>
            </button>
          </div>
        </div>
      </div>

      <footer className={styles.footer} data-anim="fade">
        <p>{t('footer.copyright', { year: CURRENT_YEAR, brand: SITE.brand })}</p>
      </footer>
    </section>
  );
}
