# Çapa LPS Web Sitesi

Çapa LPS (Lightning Protection Systems, yıldırımdan korunma sistemleri) firmasının web sitesi. Şu an kök URL'de yalnızca "yapım aşamasında" hero bölümü var (`src/sections/Hero/`).

## Çalışma Şekli

- Görsel veya içeriksel geliştirme yalnızca kullanıcı istediğinde yapılır. Kapsam dışına çıkılmaz.
- Kullanıcıya sormadan tarayıcı testi yapılmaz, sunucu (`npm run dev`, `npm run preview`) ayağa kaldırılmaz.
- Kullanıcı istemedikçe commit veya push yapılmaz.
- İş bitmeden `npm run typecheck`, `npm run lint` ve `npm run build` çalıştırılır. `build`, çeviri anahtarı kontrolünü de içerir.
- API kullanmadan önce context7 ile güncel dokümana bakılır.
- Yeni bağımlılık eklemeden önce gerekçesi söylenir.

## Teknoloji

React 19, Vite, TypeScript (`strict`), i18next + react-i18next, GSAP + `@gsap/react` (`src/animations/gsap.ts` üzerinden), Lenis, Geist Variable font, CSS Modules + CSS değişkenleri (`src/styles/tokens.css`).

## Kod Kuralları

- Dosya ve tanımlayıcılar İngilizce, kod yorumları Türkçe. `any` kullanılmaz.
- Koda gömülü statik metin yoktur. `alt`, `aria-label` dahil her metin `src/locales/<dil>/` dosyalarından gelir.
- Şimdilik yalnızca Türkçe var. Yeni dil eklenince `src/i18n/locale.ts` ve `src/i18n/index.ts` güncellenir, anahtarlar `tr` ile birebir aynı olur (`npm run i18n:check`).
- Dile bağlı olmayan veriler (marka adı, e-posta, logo) `src/content/site.ts` içinde tutulur.
- GSAP, React içinde `useGSAP` ve `scope` ile yazılır. Eklentiler `src/animations/gsap.ts` içinden import edilir.

## Renk Paleti

Projede **yalnızca** aşağıdaki altı renk kullanılır. Yeni renk, ara ton veya paletten türetilmemiş gradient eklenmez. Gerekirse önce kullanıcıya sorulur.

| Renk | HEX | Ton |
| --- | --- | --- |
| Gece mavisi | `#01132F` | En koyu lacivert |
| Lacivert | `#001A3D` | Koyu lacivert |
| Mavi | `#007BFF` | Doygun ana mavi |
| Camgöbeği | `#00D9FF` | Parlak açık mavi |
| Gri mavi | `#B8C5D6` | Soluk, nötr mavi-gri |
| Kırık beyaz | `#F8FAFF` | Mavimsi beyaz |

- Renkler koda HEX olarak yazılmaz, `src/styles/tokens.css` içindeki token'lardan kullanılır: `--color-night`, `--color-navy`, `--color-blue`, `--color-cyan`, `--color-mist`, `--color-white`.
- Saydamlık gerekirse aynı rengin alfa değerli hâli kullanılır (ör. `color-mix(in srgb, var(--color-blue) 40%, transparent)`), yeni bir renk sayılmaz.

### Kontrast (WCAG 2.2 AA)

Normal metin için en az 4.5:1, büyük metin (24 px+ veya 18.66 px+ kalın) ve arayüz öğeleri için en az 3:1 gerekir.

- `#F8FAFF`, `#B8C5D6` ve `#00D9FF`, koyu zeminlerde (`#01132F`, `#001A3D`) her boyutta metin için uygundur.
- `#007BFF`, `#01132F` üzerinde normal metne uygundur (4.65). `#001A3D` (4.34) ve `#F8FAFF` (3.81) üzerinde yalnızca büyük metin ve arayüz öğelerinde kullanılır.
- `#B8C5D6` ve `#00D9FF`, `#F8FAFF` üzerinde metin veya anlam taşıyan öğe olarak kullanılmaz (yaklaşık 1.6).
- `#01132F` ile `#001A3D` arasında kontrast yoktur (1.07). Yalnızca zemin katmanlarını ayırmak için yan yana kullanılırlar.
