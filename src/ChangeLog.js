import React from "react";
import { useLocation } from "react-router-dom";
import "./ChangeLog.css";

const DEFAULT_LANG = "tr";

const updatesByLang = {
  tr: [
    {
      title: "Performans iyileştirmeleri",
      description:
        "Arka planda yaptığımız altyapı düzenlemeleri ile sayfa geçişleri ve görsel yüklemeleri artık saniyeler içinde tamamlanıyor.",
      tag: "Geliştirme",
    },
    {
      title: "Mekanları tam ekran görme",
      description:
        "Çekim yapacağınız mekanı seçerken artık sahne ön izlemeleri tek dokunuşla tam ekran açılıyor; detayları rahatça inceleyebilirsiniz.",
      tag: "Yeni",
    },
    {
      title: "Yeni poz ve saç görselleri",
      description:
        "Tazelediğimiz kütüphanede daha net, daha gerçekçi poz ve saç stilleri ile seçim yapmak artık çok daha kolay.",
      tag: "İçerik",
    },
    {
      title: "Pozları favorilere ekleme",
      description:
        "Sık kullandığınız pozları favorilere alarak birkaç dokunuşla erişin, üretim sürecinizi hızlandırın.",
      tag: "Favoriler",
    },
    {
      title: "Saç stillerini favorilere ekleme",
      description:
        "En çok beğendiğiniz saç stillerini kaydedin, yeni çalışmalarınızda hemen uygulayın.",
      tag: "Favoriler",
    },
    {
      title: "Kredi kullanım geçmişi",
      description:
        "Hangi çekim için ne kadar kredi harcadığınızı artık anlık olarak inceleyebilir, bütçenizi net biçimde takip edebilirsiniz.",
      tag: "Şeffaflık",
    },
    {
      title: "Satın alma geçmişi",
      description:
        "Geçmiş paket satın almalarınızı tek ekranda listeliyor, faturalarınıza hızlıca ulaşabilirsiniz.",
      tag: "Şeffaflık",
    },
    {
      title: "Dinamik renk seçimleri",
      description:
        "Saç rengi ve ürün rengi sayfalarında statik seçenekler yerine hassas renk aralığı seçicisi ile tonları dilediğiniz gibi uyarlayın.",
      tag: "Kontrol",
    },
    {
      title: "Farklı pozlama seçimi",
      description:
        "Farklı pozlama özelliği sayfasında dilediğiniz pozu anında belirleyerek ışık ayarlarınızı kişiselleştirebilirsiniz.",
      tag: "Yeni",
    },
  ],
  en: [
    {
      title: "Performance upgrades",
      description:
        "Infrastructure tweaks speed up page transitions and asset loading so every workflow feels instantly responsive.",
      tag: "Improvement",
    },
    {
      title: "Full-screen sets",
      description:
        "When picking the scene for your photo, each environment preview now expands to full screen so you can study every detail before you confirm.",
      tag: "New",
    },
    {
      title: "Fresh pose & hair visuals",
      description:
        "Our refreshed library serves sharper, more realistic samples so picking the right pose or hair is effortless.",
      tag: "Content",
    },
    {
      title: "Favorite poses",
      description:
        "Bookmark frequently used poses to reopen them in seconds and keep momentum in your production flow.",
      tag: "Favorites",
    },
    {
      title: "Favorite hairstyles",
      description:
        "Save your go-to hairstyles and apply them instantly in upcoming shoots with zero hunting.",
      tag: "Favorites",
    },
    {
      title: "Credit usage history",
      description:
        "Monitor how many credits you spend per session in real time and keep budgets crystal clear.",
      tag: "Transparency",
    },
    {
      title: "Purchase history",
      description:
        "Review past package purchases on a single screen and access invoices whenever you need them.",
      tag: "Transparency",
    },
    {
      title: "Dynamic color pickers",
      description:
        "Hair and product color screens now ship with precise range pickers so you can fine-tune every tone.",
      tag: "Control",
    },
    {
      title: "Alternate exposure selector",
      description:
        "Lock in the shot you want directly on the alternate exposure page and tailor the lighting to match.",
      tag: "New",
    },
  ],
};

function ChangeLog() {
  const { search } = useLocation();
  const queryLang = new URLSearchParams(search).get("lang")?.toLowerCase();
  const activeLang = queryLang && updatesByLang[queryLang] ? queryLang : DEFAULT_LANG;
  const updates = updatesByLang[activeLang];

  return (
    <div className="changelog-page" data-lang={activeLang}>
      <section className="updates-section">
        <div className="updates-grid">
          {updates.map(({ title, description, tag }) => (
            <article key={title} className="update-card">
              <span className="feature-tag">{tag}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ChangeLog;
