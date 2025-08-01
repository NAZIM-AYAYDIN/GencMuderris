// Terms Modal Yönetimi
document.addEventListener('DOMContentLoaded', function() {
  const termsModal = document.getElementById('termsModal');
  const termsModalTitle = document.getElementById('termsModalTitle');
  const termsModalBody = document.getElementById('termsModalBody');
  const termsModalClose = document.getElementById('termsModalClose');
  const termsPdfDownloadBtn = document.getElementById('termsPdfDownloadBtn');
  
  // Hem terms-link hem de policy-link[data-policy="terms"] seçicilerini kullan
  const termsLinks = document.querySelectorAll('.terms-link, .policy-link[data-policy="terms"]');

  // Üyelik ve Kullanım Koşulları içeriği
  const termsContent = `
    <div class="terms-content">
      <div class="terms-header">
        <h1>GENÇ MÜDERRİS KULLANIM KOŞULLARI</h1>
        <div class="terms-meta">
          <p><strong>Versiyon:</strong> 1.0</p>
          <p><strong>Yürürlük Tarihi:</strong> 10 Temmuz 2025</p>
          <p><strong>Geçerlilik Alanı:</strong> Genç Müderris İslami Eğitim Platformu (Web, Mobil)</p>
        </div>
      </div>

      <div class="terms-body">
        <section class="terms-section">
          <h2>1. GENEL HÜKÜMLER</h2>
          
          <h3>1.1 Taraflar</h3>
          <ul>
            <li><strong>Hizmet Sağlayıcı:</strong> Genç Müderris Platformu</li>
            <li><strong>Kullanıcı:</strong> Platformu kullanan ebeveyn ve çocuk (müderris)</li>
            <li><strong>Ebeveyn:</strong> 18 yaş üstü, çocuk hesabı oluşturan ve yöneten kullanıcı</li>
            <li><strong>Müderris (Çocuk):</strong> Ebeveyn onayıyla hesap oluşturan 6–13 yaş arası kullanıcı</li>
          </ul>

          <h3>1.2 Hizmet Tanımı</h3>
          <p>Genç Müderris, çocuklara yönelik güvenli ve eğitici İslami içerikler sunan dijital platformdur. Sunulan hizmetler:</p>
          <ul>
            <li>İnteraktif İslami eğitim</li>
            <li>Yapay zekâ destekli sohbet sistemi</li>
            <li>Gamification ve ödül mekanizması</li>
            <li>Ebeveyn kontrol paneli</li>
          </ul>

          <h3>1.3 Yaş Sınırları</h3>
          <ul>
            <li><strong>Müderris hesabı:</strong> 6–13 yaş</li>
            <li><strong>Ebeveyn hesabı:</strong> 18 yaş ve üzeri</li>
            <li><strong>Yaş doğrulama:</strong> Tüm kullanıcılar için zorunludur</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>2. HESAP OLUŞTURMA VE YÖNETİMİ</h2>
          
          <h3>2.1 Ebeveyn Hesabı</h3>
          <ul>
            <li>Kayıt sırasında ad, soyad, e-posta, doğum tarihi, telefon gibi bilgilerin girilmesi zorunludur</li>
            <li>E-posta doğrulama ve tercihen 2FA (iki adımlı doğrulama) uygulanır</li>
            <li>Hesap güvenliği kullanıcı sorumluluğundadır</li>
          </ul>

          <h3>2.2 Müderris (Çocuk) Hesabı</h3>
          <ul>
            <li>Ebeveyn hesabı üzerinden oluşturulur</li>
            <li>Ad, soyad, doğum tarihi, cinsiyet bilgileri girilir</li>
            <li>Ebeveyn onayı olmadan aktif hale getirilemez</li>
            <li>Ebeveyn, tüm ayarları yönetme hakkına sahiptir</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>3. KULLANIM KURALLARI</h2>
          
          <h3>3.1 Genel Yasaklar</h3>
          <ul>
            <li>Yanıltıcı veya sahte bilgi paylaşmak</li>
            <li>Platformu amacı dışında kullanmak</li>
            <li>Kopyalama, çoğaltma, paylaşma</li>
            <li>Küfür, hakaret, şiddet içeren söylemler</li>
            <li>Kişisel bilgileri paylaşmak</li>
          </ul>

          <h3>3.2 Müderris Kuralları</h3>
          <ul>
            <li>Kendi kimliğini paylaşamaz</li>
            <li>Sadece eğitim amaçlı konuşma yapabilir</li>
            <li>Başkalarına saygılı olmak zorundadır</li>
            <li>Kullanım süresi ebeveyn tarafından sınırlanabilir</li>
          </ul>

          <h3>3.3 Ebeveyn Sorumlulukları</h3>
          <ul>
            <li>Müderris hesabını düzenli takip etmek</li>
            <li>Güvenlik ayarlarını yapmak</li>
            <li>Erişim süresini ve içerik filtrelerini belirlemek</li>
            <li>Gerekli durumlarda destek birimiyle iletişime geçmek</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>4. İÇERİK VE HİZMETLER</h2>
          
          <h3>4.1 Eğitim İçerikleri</h3>
          <ul>
            <li>Kur'an, Hadis, Namaz, Ahlak, İbadetler ve İslam Tarihi</li>
            <li>İçerikler yaşa uygun olarak uyarlanır</li>
            <li>Uzman danışmanlık desteği ile hazırlanır</li>
            <li>Görseller, sesli anlatımlar ve interaktif içerikler içerir</li>
          </ul>

          <h3>4.2 Sohbet ve Yapay Zekâ</h3>
          <ul>
            <li>Müderris ile sohbet eden sistem, "öğrenen bir öğrenci" gibi davranır</li>
            <li>Tüm konuşmalar kayıt altına alınır ve ebeveyn tarafından izlenebilir</li>
            <li>Kötüye kullanım tespitinde sistem uyarı verir ve raporlama yapılır</li>
          </ul>

          <h3>4.3 Gamification (Oyunlaştırma)</h3>
          <ul>
            <li>Ders tamamlamaya dayalı puan sistemi</li>
            <li>Başarıya göre rozetler ve sertifikalar</li>
            <li>Seviye yükseldikçe yeni içeriklerin açılması</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>5. GÜVENLİK VE GİZLİLİK</h2>
          
          <h3>5.1 Teknik Güvenlik</h3>
          <ul>
            <li>SSL/TLS şifreleme</li>
            <li>Güvenli oturum yönetimi</li>
            <li>IP kontrol ve cihaz tanıma sistemi</li>
            <li>Düzenli sistem yedeklemesi</li>
          </ul>

          <h3>5.2 Kişisel Veri İşleme</h3>
          <ul>
            <li>Tüm veriler KVKK, COPPA, GDPR uyumlu şekilde işlenir</li>
            <li>Çocuk verileri yalnızca ebeveyn onayı ile alınır</li>
            <li>Veri işleme amaçları: Eğitim, gelişim, analiz ve sistem güvenliğidir</li>
            <li>Veri saklama süresi: En fazla 2 yıl pasif durumda kalınırsa silinir</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>6. ÜCRETLENDİRME</h2>
          
          <h3>6.1 Ücretsiz Hizmetler</h3>
          <ul>
            <li>Ücretsiz kayıt</li>
            <li>Temel eğitim içeriklerine erişim</li>
            <li>Mesaj ve sohbet özellikleri</li>
          </ul>

          <h3>6.2 Premium (İsteğe Bağlı)</h3>
          <ul>
            <li>Gelişmiş raporlar ve seviye içerikleri</li>
            <li>Daha fazla soru havuzu ve özel rehberlik</li>
            <li>Ücret politikası, açık ve şeffaf şekilde duyurulur</li>
            <li>30 gün içinde iptal ve para iadesi mümkündür</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>7. HESAP SONLANDIRMA</h2>
          
          <h3>7.1 Askıya Alma</h3>
          <ul>
            <li>Kurallara aykırı kullanım</li>
            <li>Şüpheli aktivite</li>
            <li>Güvenlik ihlali durumlarında uyarı ve askıya alma uygulanabilir</li>
          </ul>

          <h3>7.2 Hesap Silme</h3>
          <ul>
            <li>Kullanıcı isteğiyle veya 2 yıl inaktif kalınırsa silme hakkı doğar</li>
            <li>Ebeveyn hesabı silinirse bağlı müderris hesapları da silinir</li>
            <li>Silme işleminden önce 30 gün yedekleme süresi uygulanır</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>8. FİKRİ MÜLKİYET</h2>
          <ul>
            <li>Tüm içerikler, kodlar, görseller ve yapı Genç Müderris'e aittir</li>
            <li>İzinsiz kopyalama, dağıtım, ticari kullanım yasaktır</li>
            <li>Kullanıcı yalnızca kişisel eğitim amaçlı kullanım hakkına sahiptir</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>9. YASAL UYUMLULUK</h2>
          <ul>
            <li>Bu sözleşme Türkiye Cumhuriyeti yasalarına tabidir</li>
            <li>KVKK, E-Ticaret Kanunu, Çocuk Hakları Sözleşmesi, GDPR ve COPPA uyumludur</li>
            <li>Uyuşmazlık durumunda İstanbul Mahkemeleri yetkilidir</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>10. DEĞİŞİKLİKLER VE BİLDİRİM</h2>
          <ul>
            <li>Sözleşme değişiklikleri 30 gün önceden e-posta veya uygulama içi bildirim ile duyurulur</li>
            <li>Değişiklik sonrası platformun kullanılmaya devam edilmesi, kabul anlamına gelir</li>
          </ul>
        </section>

        <section class="terms-section">
          <h2>11. İLETİŞİM</h2>
          <div class="terms-contact-table">
            <div class="terms-contact-row">
              <div class="terms-contact-cell"><strong>Alan</strong></div>
              <div class="terms-contact-cell"><strong>Bilgi</strong></div>
            </div>
            <div class="terms-contact-row">
              <div class="terms-contact-cell">Yetkili Kişi</div>
              <div class="terms-contact-cell">Nazım Ayaydın</div>
            </div>
            <div class="terms-contact-row">
              <div class="terms-contact-cell">E-posta</div>
              <div class="terms-contact-cell">gencmuderris@gmail.com</div>
            </div>
            <div class="terms-contact-row">
              <div class="terms-contact-cell">Web Sitesi</div>
              <div class="terms-contact-cell">www.gencmuderris.com</div>
            </div>
            <div class="terms-contact-row">
              <div class="terms-contact-cell">Adres</div>
              <div class="terms-contact-cell">İzmir, Türkiye</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

  // Terms modal açma fonksiyonu
  function openTermsModal() {
    termsModalTitle.textContent = 'Üyelik ve Kullanım Koşulları';
    termsModalBody.innerHTML = termsContent;
    termsModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Terms modal kapatma fonksiyonu
  function closeTermsModal() {
    termsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Event listeners
  termsLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      openTermsModal();
    });
  });

  termsModalClose.addEventListener('click', closeTermsModal);

  // Modal dışına tıklayınca kapatma
  termsModal.addEventListener('click', function(e) {
    if (e.target === termsModal) {
      closeTermsModal();
    }
  });

  // ESC tuşu ile kapatma
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && termsModal.style.display === 'block') {
      closeTermsModal();
    }
  });

  // PDF indirme fonksiyonu (gelecekte implement edilecek)
  if (termsPdfDownloadBtn) {
    termsPdfDownloadBtn.addEventListener('click', function() {
      alert('PDF indirme özelliği yakında eklenecektir.');
    });
  }
}); 