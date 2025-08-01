// Ticari Elektronik İleti ve Bildirim Onayı Modal Yönetimi
document.addEventListener('DOMContentLoaded', function() {
  const commercialModal = document.getElementById('commercialModal');
  const commercialModalTitle = document.getElementById('commercialModalTitle');
  const commercialModalBody = document.getElementById('commercialModalBody');
  const commercialModalClose = document.getElementById('commercialModalClose');
  const commercialPdfDownloadBtn = document.getElementById('commercialPdfDownloadBtn');
  const commercialPolicyLinks = document.querySelectorAll('.commercial-policy-link');

  // Ticari Elektronik İleti ve Bildirim Onayı içeriği
  const commercialContent = `
    <div class="kvkk-content">
      <div class="kvkk-header">
        <h1>TİCARİ ELEKTRONİK İLETİ VE BİLDİRİM ONAYI</h1>
        <div class="kvkk-meta">
          <p><strong>Yürürlük Tarihi:</strong> 10 Temmuz 2025</p>
          <p><strong>Versiyon:</strong> 1.0</p>
          <p><strong>Uygulama:</strong> Genç Müderris – İslami Eğitim Platformu</p>
        </div>
      </div>

      <div class="kvkk-body">
        <section class="kvkk-section">
          <h2>1. AMAÇ VE KAPSAM</h2>
          <p>Bu belge, 6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun'un 6. maddesi ve Elektronik Ticaretin Düzenlenmesi Hakkında Yönetmelik'in 4. maddesi kapsamında, Genç Müderris platformu tarafından gönderilecek ticari elektronik iletilere ilişkin açık rıza sürecini düzenlemektedir.</p>
        </section>

        <section class="kvkk-section">
          <h2>2. TANIMLAR</h2>
          <ul>
            <li><strong>Ticari Elektronik İleti:</strong> Ticari amaçla gönderilen e-posta, SMS, push notification gibi elektronik iletişim araçları</li>
            <li><strong>Açık Rıza:</strong> Kullanıcının bilgilendirilmiş ve özgür iradesiyle verdiği onay</li>
            <li><strong>Alıcı:</strong> Ticari elektronik ileti alan kişi</li>
            <li><strong>Gönderici:</strong> Genç Müderris platformu</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>3. TİCARİ ELEKTRONİK İLETİ TÜRLERİ</h2>
          <h3>3.1 Eğitim İçerikli İletiler</h3>
          <ul>
            <li>Yeni ders ve konu bildirimleri</li>
            <li>Eğitim materyali güncellemeleri</li>
            <li>Ödev ve sınav hatırlatmaları</li>
            <li>İlerleme raporları</li>
            <li>Başarı sertifikaları</li>
          </ul>

          <h3>3.2 Platform Hizmetleri</h3>
          <ul>
            <li>Yeni özellik ve güncelleme bildirimleri</li>
            <li>Sistem bakım ve kesinti bildirimleri</li>
            <li>Güvenlik uyarıları</li>
            <li>Kullanım istatistikleri</li>
          </ul>

          <h3>3.3 Sosyal ve Kültürel İçerikler</h3>
          <ul>
            <li>Dini gün ve kandil kutlamaları</li>
            <li>Eğitim etkinlikleri</li>
            <li>Topluluk aktiviteleri</li>
            <li>Motivasyonel mesajlar</li>
          </ul>

          <h3>3.4 Pazarlama İletileri (Gelecekte)</h3>
          <ul>
            <li>Premium hizmet tanıtımları</li>
            <li>Özel kampanya ve indirimler</li>
            <li>Partner hizmet önerileri</li>
            <li>Anket ve geri bildirim talepleri</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>4. İLETİ GÖNDERME KOŞULLARI</h2>
          <h3>4.1 Açık Rıza Zorunluluğu</h3>
          <ul>
            <li>Tüm ticari elektronik iletiler için açık rıza gereklidir</li>
            <li>Rıza, kullanıcının bilgilendirilmiş ve özgür iradesiyle verilmelidir</li>
            <li>Rıza, belirli bir ileti türü için verilmiş olmalıdır</li>
            <li>Rıza, her zaman geri çekilebilir olmalıdır</li>
          </ul>

          <h3>4.2 İleti İçeriği Kuralları</h3>
          <ul>
            <li>İletilerde gönderici kimliği açık olmalıdır</li>
            <li>İleti konusu ve içeriği yanıltıcı olmamalıdır</li>
            <li>Rıza geri çekme hakkı her ileti içinde belirtilmelidir</li>
            <li>İletiler yaşa uygun ve kültürel hassasiyetlere uygun olmalıdır</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>5. ÇOCUK KORUMA ÖZEL HÜKÜMLERİ</h2>
          <h3>5.1 Ebeveyn Onayı Zorunluluğu</h3>
          <ul>
            <li>18 yaş altı kullanıcılar için ebeveyn/veli açık rızası zorunludur</li>
            <li>Çocuklara doğrudan pazarlama iletisi gönderilmez</li>
            <li>Tüm iletiler ebeveyn kontrolü altında yönetilir</li>
          </ul>

          <h3>5.2 İçerik Filtreleme</h3>
          <ul>
            <li>Çocuklara yönelik iletiler yaşa uygun filtrelenir</li>
            <li>Uygunsuz içerik otomatik olarak engellenir</li>
            <li>Eğitim odaklı ve güvenli içerikler tercih edilir</li>
          </ul>

          <h3>5.3 Ebeveyn Bildirimleri</h3>
          <ul>
            <li>Çocuk hesabına gelen iletiler ebeveyne bildirilir</li>
            <li>Ebeveyn kontrol paneli üzerinden yönetim sağlanır</li>
            <li>Şüpheli aktivite durumunda ebeveyne anında bildirim</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>6. İLETİ GÖNDERME SIKLIĞI</h2>
          <ul>
            <li><strong>Eğitim İletileri:</strong> Haftada maksimum 3</li>
            <li><strong>Platform Bildirimleri:</strong> Gerektiğinde (acil durumlar hariç)</li>
            <li><strong>Sosyal İçerikler:</strong> Haftada maksimum 2</li>
            <li><strong>Pazarlama İletileri:</strong> Ayda maksimum 2 (gelecekte)</li>
            <li><strong>Toplam Haftalık:</strong> Maksimum 5 ileti</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>7. İLETİ GÖNDERME SAATLERİ</h2>
          <ul>
            <li><strong>Eğitim İletileri:</strong> 08:00-20:00 arası</li>
            <li><strong>Platform Bildirimleri:</strong> 07:00-22:00 arası</li>
            <li><strong>Sosyal İçerikler:</strong> 09:00-21:00 arası</li>
            <li><strong>Pazarlama İletileri:</strong> 10:00-18:00 arası</li>
            <li><strong>Hafta Sonu:</strong> 10:00-16:00 arası</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>8. RIZA VERME VE GERİ ÇEKME</h2>
          <h3>8.1 Rıza Verme</h3>
          <ul>
            <li>Kayıt sırasında açık rıza alınır</li>
            <li>Rıza, belirli ileti türleri için ayrı ayrı verilir</li>
            <li>Rıza, kullanıcının anlayabileceği şekilde açıklanır</li>
          </ul>

          <h3>8.2 Rıza Geri Çekme</h3>
          <ul>
            <li>Her ileti içinde geri çekme linki bulunur</li>
            <li>Ayarlar menüsünden toplu geri çekme yapılabilir</li>
            <li>E-posta ile geri çekme talebi gönderilebilir</li>
            <li>Geri çekme işlemi 24 saat içinde tamamlanır</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>9. VERİ GÜVENLİĞİ</h2>
          <ul>
            <li>Tüm ileti verileri şifrelenerek saklanır</li>
            <li>Üçüncü taraf erişimi yasaktır</li>
            <li>İleti geçmişi 1 yıl sonra otomatik silinir</li>
            <li>Güvenlik ihlali durumunda KVKK Kurumu'na bildirim yapılır</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>10. YASAL UYUMLULUK</h2>
          <p>Bu politika aşağıdaki mevzuata uygun olarak hazırlanmıştır:</p>
          <ul>
            <li><strong>6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun</strong></li>
            <li><strong>Elektronik Ticaretin Düzenlenmesi Hakkında Yönetmelik</strong></li>
            <li><strong>6698 Sayılı Kişisel Verilerin Korunması Kanunu</strong></li>
            <li><strong>Çocukların Korunmasına Dair Uluslararası Sözleşmeler</strong></li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>11. İLETİŞİM VE ŞİKAYET</h2>
          <p>Sorular ve şikayetler için:</p>
          <ul>
            <li><strong>E-posta:</strong> gencmuderris@gmail.com</li>
            <li><strong>Telefon:</strong> +90 533 376 70 63</li>
            <li><strong>Adres:</strong> Seyhan mahallesi 665 sokak no:35 Buca İZMİR</li>
            <li><strong>Şikayet Süresi:</strong> 48 saat içinde yanıt</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>12. GÜNCELLEME BİLDİRİMİ</h2>
          <p>Bu politika güncellendiğinde:</p>
          <ul>
            <li>Kullanıcılara e-posta ile bildirim yapılır</li>
            <li>30 gün içinde yeni şartları kabul etme süresi verilir</li>
            <li>Kabul edilmezse ticari elektronik iletiler durdurulur</li>
            <li>Önemli değişiklikler önceden duyurulur</li>
          </ul>
        </section>

        <div class="kvkk-footer">
          <p><strong>Not:</strong> Bu belge, Genç Müderris platformunun ticari elektronik ileti hizmetlerini kullanmak için gerekli olan açık rıza sürecini kapsar. Platforma kayıt olarak bu şartları kabul etmiş sayılırsınız.</p>
        </div>
      </div>
    </div>
  `;

  // PDF İndirme Fonksiyonu
  function downloadCommercialAsPDF() {
    const modalContent = commercialModalBody.innerHTML;
    const title = commercialModalTitle.textContent;
    
    // Yeni pencere aç
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            margin: 2rem;
            color: #333;
          }
          h1 { font-size: 1.5rem; color: #2c3e50; margin-bottom: 1rem; }
          h2 { font-size: 1.2rem; color: #34495e; margin: 1rem 0 0.5rem 0; }
          h3 { font-size: 1rem; color: #7f8c8d; margin: 0.8rem 0 0.3rem 0; }
          p { margin-bottom: 0.5rem; }
          ul, ol { margin: 0.3rem 0 0.8rem 1.5rem; }
          li { margin-bottom: 0.2rem; }
          strong { color: #2c3e50; }
          .kvkk-header { text-align: center; margin-bottom: 2rem; border-bottom: 2px solid #bdc3c7; padding-bottom: 1rem; }
          .kvkk-footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #bdc3c7; text-align: center; font-size: 0.8rem; color: #7f8c8d; }
          @media print {
            body { margin: 1rem; }
            .kvkk-section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        ${modalContent}
      </body>
      </html>
    `);
    printWindow.document.close();
    
    // Yazdırma dialogunu aç (PDF olarak kaydetme seçeneği ile)
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }

  // Modal açma fonksiyonu
  function openCommercialModal() {
    commercialModalTitle.textContent = 'Ticari Elektronik İleti ve Bildirim Onayı';
    commercialModalBody.innerHTML = commercialContent;
    commercialModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Modal kapatma fonksiyonu
  function closeCommercialModal() {
    commercialModal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  // Event listeners
  commercialPolicyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      openCommercialModal();
    });
  });

  // Modal kapatma butonları
  if (commercialModalClose) {
    commercialModalClose.addEventListener('click', closeCommercialModal);
  }
  
  // PDF indirme butonu
  if (commercialPdfDownloadBtn) {
    commercialPdfDownloadBtn.addEventListener('click', downloadCommercialAsPDF);
  }

  // Modal dışına tıklayınca kapat
  if (commercialModal) {
    commercialModal.addEventListener('click', function(e) {
      if (e.target === commercialModal) {
        closeCommercialModal();
      }
    });
  }

  // ESC tuşu ile kapat
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && commercialModal && commercialModal.style.display === 'flex') {
      closeCommercialModal();
    }
  });

  // Global fonksiyon olarak dışa aktar
  window.openCommercialPolicyModal = openCommercialModal;
  window.closeCommercialPolicyModal = closeCommercialModal;
}); 