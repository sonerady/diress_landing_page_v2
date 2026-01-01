import React from "react";
import "./Costs.css";
import logo from "./logo.png";

const Costs = () => {
  return (
    <div
      className="costs-container"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "600px",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "600px",
          opacity: 0.05,
          pointerEvents: "none",
          zIndex: 0,
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1>Proje Bütçe Özeti</h1>
        <p>
          Bu sayfa, iki aylık geliştirme süresi boyunca <strong>iş gücü</strong>{" "}
          ve
          <strong>operasyonel</strong> maliyetleri basit ve anlaşılır şekilde
          özetler.
        </p>

        <h2>1. İş Gücü Maliyetleri</h2>
        <table>
          <tr>
            <th>Başlık</th>
            <th>Açıklama</th>
          </tr>
          <tr>
            <td>UI / UX Tasarımı</td>
            <td>Uygulamanın görünümü ve kullanıcı deneyimi</td>
          </tr>
          <tr>
            <td>Mobil Geliştirme</td>
            <td>iOS ve Android için tüm ekranlar ve işlevler</td>
          </tr>
          <tr>
            <td>Backend</td>
            <td>Veritabanı, kullanıcı hesapları, sunucu işlemleri</td>
          </tr>
          <tr>
            <td>Ödeme Entegrasyonu</td>
            <td>Kart, Apple Pay ve Google Pay</td>
          </tr>
          <tr>
            <td>Kalite Kontrol</td>
            <td>Hata testleri ve düzeltmeleri</td>
          </tr>
          <tr>
            <td>Proje Yönetimi</td>
            <td>Planlama, raporlama, koordinasyon</td>
          </tr>
          <tr>
            <td>Yayın & DevOps</td>
            <td>Mağaza yükleme, otomatik derleme</td>
          </tr>
        </table>

        <h2>2. Operasyonel Maliyetler (İlk 2 Ay)</h2>
        <table>
          <tr>
            <th>Hizmet</th>
            <th>Neden Gerekli?</th>
            <th>2 Aylık Tutar</th>
          </tr>
          <tr>
            <td>Supabase Pro</td>
            <td>Güvenilir veritabanı ve kimlik yönetimi</td>
            <td>$50</td>
          </tr>
          <tr>
            <td>Apple Developer Program</td>
            <td>iOS uygulamasını yayınlayabilmek için</td>
            <td>$99</td>
          </tr>
          <tr>
            <td>Google Play Console</td>
            <td>Android uygulamasını yayınlamak için</td>
            <td>$25</td>
          </tr>
          <tr>
            <td>Harita Servisi</td>
            <td>Sürücü rotalarını hesaplamak, mesafe ölçmek</td>
            <td>$100</td>
          </tr>
          <tr>
            <td>CI/CD Hizmeti</td>
            <td>Her sürümü otomatik derlemek ve test etmek</td>
            <td>$120</td>
          </tr>
          <tr>
            <td>SMS Bildirimleri</td>
            <td>Sipariş durumunu kullanıcıya mesajla iletmek</td>
            <td>$30</td>
          </tr>
          <tr>
            <td>Push Bildirimleri</td>
            <td>Anlık uygulama içi bildirim (ücretsiz kota)</td>
            <td>$0</td>
          </tr>
          <tr className="cost-total">
            <td colSpan="2">Toplam Operasyonel</td>
            <td>$424</td>
          </tr>
        </table>

        <h2>3. Genel Toplam</h2>
        <p>
          <strong>$18 964</strong> &nbsp; (İş gücü + 2 aylık operasyon)
        </p>

        <h2>4. Proje Akışı</h2>
        <ol>
          <li>
            <strong>Hafta 1–2:</strong> Tasarım onayı
          </li>
          <li>
            <strong>Hafta 3–4:</strong> Temel özelliklerin kodlanması
          </li>
          <li>
            <strong>Hafta 5–6:</strong> Ödeme, harita ve bildirimler
          </li>
          <li>
            <strong>Hafta 7:</strong> Son testler ve düzenlemeler
          </li>
          <li>
            <strong>Hafta 8:</strong> Uygulamanın mağazalara yüklenmesi
          </li>
        </ol>

        <p>
          <em>
            Bu bütçe, temel sürüm (MVP) içindir. Ek özellikler veya ileri seviye
            ölçeklendirme talepleri ek maliyet oluşturabilir.
          </em>
        </p>
      </div>
    </div>
  );
};

export default Costs;
