// Policy Modal Yönetimi
document.addEventListener('DOMContentLoaded', function() {
  const policyModal = document.getElementById('policyModal');
  const policyModalTitle = document.getElementById('policyModalTitle');
  const policyModalBody = document.getElementById('policyModalBody');
  const policyModalClose = document.getElementById('policyModalClose');
  const pdfDownloadBtn = document.getElementById('pdfDownloadBtn');
  const policyLinks = document.querySelectorAll('.policy-link');

  // KVKK içeriği - GÜNCELLENMİŞ VERSİYON 2.1
  const kvkkContent = `
    <div class="kvkk-content">
      <div class="kvkk-header">
        <h1>GENÇ MÜDERRİS KİŞİSEL VERİLERİN KORUNMASI VE GİZLİLİK POLİTİKASI</h1>
        <div class="kvkk-meta">
          <p><strong>Versiyon:</strong> 2.1</p>
          <p><strong>Yürürlük Tarihi:</strong> 25 Temmuz 2025</p>
          <p><strong>Geçerlilik:</strong> Bu politika, Genç Müderris platformu üzerinde ücretsiz olarak sunulan tüm hizmetler için geçerlidir.</p>
        </div>
      </div>

      <div class="kvkk-body">
        <section class="kvkk-section">
          <h2>I. AMAÇ VE KAPSAM</h2>
          <p>Bu Kişisel Verilerin Korunması ve Gizlilik Politikası ("Politika"), Genç Müderris platformu ("Platform") tarafından yürütülen kişisel veri işleme faaliyetlerinin 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuatla uyumlu şekilde yürütülmesini sağlamak amacıyla hazırlanmıştır.</p>
          <p>Genç Müderris, çocuklara yönelik İslami eğitimi amaçlayan ücretsiz bir dijital platformdur. Bu nedenle, çocuk verilerinin korunması özel bir öncelik olarak ele alınmaktadır. Tüm işlemler, ebeveyn veya yasal temsilcinin açık onayı ile yürütülür.</p>
        </section>

        <section class="kvkk-section">
          <h2>II. TANIMLAR</h2>
          <ul>
            <li><strong>Kişisel Veri:</strong> Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi.</li>
            <li><strong>Özel Nitelikli Kişisel Veri:</strong> Sağlık bilgileri, inanç, ceza kaydı gibi daha hassas veriler.</li>
            <li><strong>Veri Sahibi:</strong> Kişisel verisi işlenen çocuk veya ebeveyn.</li>
            <li><strong>Veri Sorumlusu:</strong> Genç Müderris platformudur.</li>
            <li><strong>Veri İşleyen:</strong> Genç Müderris adına teknik destek veren hizmet sağlayıcılar.</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>III. VERİ İŞLEME İLKELERİ</h2>
          <p>KVKK m.4'e göre tüm kişisel veriler;</p>
          <ul>
            <li>Hukuka ve dürüstlük kurallarına uygun,</li>
            <li>Doğru ve güncel,</li>
            <li>Belirli, açık ve meşru amaçlarla,</li>
            <li>Sınırlı ve ölçülü,</li>
            <li>Yasal süresi kadar saklanarak işlenir.</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>IV. HUKUKİ DAYANAKLAR</h2>
          <p>Kişisel veriler aşağıdaki yasal gerekçelere dayalı olarak işlenebilir:</p>
          <ul>
            <li>KVKK m.5/1: Açık rıza alınması</li>
            <li>KVKK m.5/2-c: Sözleşmenin ifası</li>
            <li>KVKK m.5/2-ç: Hukuki yükümlülük</li>
            <li>KVKK m.5/2-f: Meşru menfaat</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>V. TOPLANAN VERİ TÜRLERİ</h2>
          
          <h3>1. Ebeveyn Verileri</h3>
          <ul>
            <li>Ad, soyad, e-posta, telefon</li>
            <li>Kullanıcı adı, giriş bilgileri, cihaz verisi</li>
            <li>Doğrulama bilgileri (e-posta onayı)</li>
          </ul>

          <h3>2. Çocuk (Müderris) Verileri</h3>
          <ul>
            <li>Ad, soyad, doğum tarihi, cinsiyet</li>
            <li>Seviye, ilgi alanları, sohbet geçmişi</li>
            <li>İlerleme puanları, aktivite logları</li>
            <li>IP adresi, tarayıcı, cihaz tipi</li>
          </ul>

          <h3>3. Otomatik Toplanan Veriler</h3>
          <ul>
            <li>IP adresi, tarayıcı türü, ekran çözünürlüğü</li>
            <li>Oturum çerezleri, tema ve dil tercihleri</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>VI. VERİ İŞLEME AMAÇLARI</h2>
          <ul>
            <li>Hesap oluşturma ve yönetimi</li>
            <li>Eğitim içeriklerine erişim sağlama</li>
            <li>Çocukların ilerleme takibi</li>
            <li>Kullanıcı deneyiminin artırılması</li>
            <li>Güvenlik ve içerik denetimi</li>
            <li>Bildirim ve bilgilendirme</li>
          </ul>
          <div class="kvkk-note">
            <p><strong> Not:</strong> Genç Müderris şu an tamamen ücretsiz sunulmaktadır. Ücretli hizmet sunulması durumunda bu politika güncellenecektir.</p>
          </div>
        </section>

        <section class="kvkk-section">
          <h2>VII. VERİ SAKLAMA SÜRELERİ</h2>
          <div class="kvkk-table">
            <div class="kvkk-table-row">
              <div class="kvkk-table-cell"><strong>Veri Türü</strong></div>
              <div class="kvkk-table-cell"><strong>Süre</strong></div>
            </div>
            <div class="kvkk-table-row">
              <div class="kvkk-table-cell">Aktif Hesap</div>
              <div class="kvkk-table-cell">Kullanıcı silene kadar</div>
            </div>
            <div class="kvkk-table-row">
              <div class="kvkk-table-cell">Pasif Hesap</div>
              <div class="kvkk-table-cell">2 yıl</div>
            </div>
            <div class="kvkk-table-row">
              <div class="kvkk-table-cell">Sohbet Geçmişi</div>
              <div class="kvkk-table-cell">1 yıl</div>
            </div>
            <div class="kvkk-table-row">
              <div class="kvkk-table-cell">Aktivite Logları</div>
              <div class="kvkk-table-cell">6 ay</div>
            </div>
            <div class="kvkk-table-row">
              <div class="kvkk-table-cell">Yedek Veriler</div>
              <div class="kvkk-table-cell">30 gün</div>
            </div>
            <div class="kvkk-table-row">
              <div class="kvkk-table-cell">Çerezler</div>
              <div class="kvkk-table-cell">1 yıl</div>
            </div>
          </div>
        </section>

        <section class="kvkk-section">
          <h2>VIII. ÇEREZ POLİTİKASI</h2>
          <ul>
            <li><strong>Zorunlu Çerezler:</strong> Oturum açma, güvenlik, tema tercihleri</li>
            <li><strong>Analitik Çerezler:</strong> Anonim kullanım verileri</li>
          </ul>
          <p><strong>Yönetim:</strong> Kullanıcılar çerezleri tarayıcıdan silebilir veya engelleyebilir.</p>
        </section>

        <section class="kvkk-section">
          <h2>IX. VERİ AKTARIMI</h2>
          <ul>
            <li>Tüm veriler Türkiye içinde saklanır.</li>
            <li>Yurtdışına veri aktarımı yapılmaz.</li>
            <li>Teknik hizmet sağlayıcılara yalnızca gerekli ve sınırlı veriler aktarılır (örneğin e-posta sunucusu).</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>X. VERİ GÜVENLİĞİ</h2>
          <h3>Teknik Önlemler:</h3>
          <ul>
            <li>AES-256 şifreleme</li>
            <li>HTTPS iletişimi</li>
            <li>Yetki bazlı erişim kontrolü</li>
            <li>Günlük yedekleme</li>
          </ul>
          <h3>Organizasyonel Önlemler:</h3>
          <ul>
            <li>KVKK eğitimleri</li>
            <li>Gizlilik sözleşmeleri</li>
            <li>Düzenli iç denetim</li>
            <li>Olay müdahale protokolleri</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>XI. VERİ SAHİBİNİN HAKLARI (KVKK m.11)</h2>
          <ul>
            <li>Hangi veriler işlendiğini öğrenme</li>
            <li>İşleme amacını öğrenme</li>
            <li>Verilere erişme ve kopya alma</li>
            <li>Hatalı verileri düzeltme</li>
            <li>Gerekli hallerde verilerin silinmesini isteme</li>
            <li>İşlemeyi kısıtlama veya itiraz etme</li>
            <li>Zarar varsa tazminat talep etme</li>
          </ul>
          <p>Tüm başvurular gencmuderris@gmail.com adresine yapılabilir.</p>
        </section>

        <section class="kvkk-section">
          <h2>XII. 13 YAŞ ALTI ÇOCUKLARA ÖZEL KORUMA</h2>
          <h3>1. Ebeveyn Onayı Zorunluluğu</h3>
          <ul>
            <li>13 yaş altı çocuklar için hesap açılışı yalnızca ebeveynler tarafından yapılabilir.</li>
            <li>Ebeveyn onayı olmadan hiçbir veri toplanmaz veya işlenmez.</li>
          </ul>
          <h3>2. Yaş Doğrulama</h3>
          <ul>
            <li>Doğum tarihi zorunlu alan olarak kayıt formunda yer alır.</li>
            <li>13 yaş altı kullanıcılar otomatik olarak kısıtlı erişim grubuna alınır.</li>
            <li>Yanlış bilgi tespit edilinde hesap askıya alınır.</li>
          </ul>
          <h3>3. İçerik Güvenliği</h3>
          <ul>
            <li>Tüm içerikler yaşa uygunluk filtreleri ile kontrol edilir.</li>
            <li>Sohbetlerde otomatik içerik denetimi yapılır.</li>
            <li>Uygunsuz içerik girişimi sistem tarafından engellenir.</li>
          </ul>
          <h3>4. Ebeveyn İzleme ve Bildirim</h3>
          <ul>
            <li>Ebeveynler kendi çocuklarına ait tüm kayıtları görebilir.</li>
            <li>Uzun kullanım süresi, gece geç saat kullanımı gibi durumlarda otomatik uyarı gönderilir.</li>
            <li>Güvenlik ihlali tespit edilirse ebeveyne anında bildirim yapılır.</li>
          </ul>
          <h3>5. Reklam ve Pazarlama Amaçlı Kullanım Yoktur</h3>
          <ul>
            <li>Çocuk verileri asla reklam/pazarlama amacıyla kullanılmaz.</li>
            <li>Üçüncü kişilerle hiçbir şekilde paylaşılmaz.</li>
          </ul>
          <div class="kvkk-warning">
            <p><strong>⚠️ UYARI:</strong> Genç Müderris platformu, 13 yaş altı çocukların yalnızca ebeveyn gözetiminde kullanabileceği bir sistemdir. Ebeveyn onayı olmadan kayıt işlemi yapılamaz.</p>
          </div>
        </section>

        <section class="kvkk-section">
          <h2>XIII. POLİTİKA GÜNCELLEMELERİ</h2>
          <ul>
            <li>Güncellemeler web sitesinde yayınlanır.</li>
            <li>Önemli değişiklikler 30 gün önceden e-posta ile bildirilir.</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>XIV. İLETİŞİM</h2>
          <p><strong>Veri Sorumlusu:</strong> NAZIM AYAYDIN</p>
          <p><strong>E-posta:</strong> gencmuderris@gmail.com</p>
          <p><strong>Adres:</strong> Seyhan mahallesi 665 sokak no:35 Buca İZMİR</p>
        </section>
      </div>
    </div>
  `;

  // Üyelik ve Kullanım Koşulları içeriği - EKLENMİŞ
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

  // Cihaz ve Oturum Bildirim İzni içeriği
  const deviceConsentContent = `
    <div class="kvkk-content">
      <div class="kvkk-header">
        <h1>CİHAZ VE OTURUM BİLDİRİM İZNİ</h1>
        <div class="kvkk-meta">
          <p><strong>Yürürlük Tarihi:</strong> 10 Temmuz 2025</p>
          <p><strong>Versiyon:</strong> 1.0</p>
          <p><strong>Uygulama:</strong> Genç Müderris – İslami Eğitim Platformu</p>
        </div>
      </div>

      <div class="kvkk-body">
        <section class="kvkk-section">
          <h2>1. TANIM VE KAPSAM</h2>
          <p>Bu belge, Genç Müderris uygulamasının, cihaz (telefon, tablet, bilgisayar) üzerinde gerçekleştirdiği teknik bildirim ve erişim işlemleri hakkında kullanıcıyı bilgilendirir. Bu işlemler, uygulamanın temel fonksiyonlarını sağlayabilmesi için zorunludur ve kullanıcının açık rızasıyla yürütülür.</p>
        </section>

        <section class="kvkk-section">
          <h2>2. ZORUNLU CİHAZ BİLDİRİMLERİ</h2>
          <p>Genç Müderris uygulaması, aşağıdaki işlemler için cihaz bildirimi gönderir veya erişim izni ister:</p>
          <ul>
            <li><strong>Push Bildirimler:</strong> Yeni ders, hatırlatma, güvenlik bildirimi (Android, iOS, Web tarayıcı)</li>
            <li><strong>TTS (Text-to-Speech):</strong> Asistanın sesli konuşmasını sağlamak için cihazın ses sistemine erişim</li>
            <li><strong>Mikrofon Erişimi:</strong> Sesli komutla asistanla konuşmak için mikrofon kullanımı</li>
            <li><strong>Yerel Bildirimler:</strong> Uygulama açık olmasa bile hatırlatmalar ve özel gün bildirimlerinin gösterimi</li>
            <li><strong>Oturum Yönetimi:</strong> Aynı cihazdan güvenli oturum açmak için cihaz tanımlama</li>
            <li><strong>Çocuk Koruma İzleme:</strong> Kullanım süresi, ders geçişi, uygulama içi aktivite takibi</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>3. ZORUNLU VE VAZGEÇİLEMEZ NİTELİK</h2>
          <p>Bu izin, uygulamanın sağlıklı çalışması için zorunludur. Kullanıcı bu izni iptal ederse:</p>
          <ul>
            <li>Uygulama bildirimleri alamaz</li>
            <li>Hatırlatmalar ve uyarılar devre dışı kalır</li>
            <li>Sesli içerikler çalışmaz</li>
            <li>Güvenli oturum ve kullanıcı kontrolü sağlanamaz</li>
          </ul>
          <p>Bu nedenle, cihaz bildirimi izni, platformu kullanmanın ön koşuludur ve kullanıcı bu izni onaylayarak kayıt olur.</p>
        </section>

        <section class="kvkk-section">
          <h2>4. GÜVENLİK VE MAHREMİYET</h2>
          <ul>
            <li>Cihazdan toplanan veriler yalnızca teknik kullanım ve kullanıcı deneyimi amacıyla işlenir</li>
            <li>Mikrofon ve ses kaydı yalnızca kullanıcının başlattığı işlemlerde geçici olarak kullanılır, kayıt altına alınmaz</li>
            <li>Cihaz kimliği ve tarayıcı bilgileri yalnızca güvenli giriş ve oturum eşleştirme için kullanılır</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>5. HUKUKİ DAYANAK</h2>
          <p>Bu izin, 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK), Çocukların Korunmasına Dair Uluslararası Sözleşmeler (COPPA) ve Avrupa Veri Koruma Tüzüğü (GDPR) ile uyumludur.</p>
        </section>

        <section class="kvkk-section">
          <h2>6. KULLANICI ONAYI</h2>
          <p>Platforma kayıt olan her kullanıcı (ebeveyn), bu belge kapsamında:</p>
          <ul>
            <li>Cihaz ve oturum bildirimlerine açık rıza gösterdiğini</li>
            <li>İlgili iznin zorunlu olduğunu bildiğini</li>
            <li>Platformdan yararlanmak için bu iznin gerektiğini</li>
          </ul>
          <p>kabul eder.</p>
        </section>

        <section class="kvkk-section">
          <h2>7. ÇOCUK KORUMA ÖZEL HÜKÜMLERİ</h2>
          <p>Bu izin, 18 yaş altı kullanıcılar için ebeveyn onayı gerektirir:</p>
          <ul>
            <li><strong>Ebeveyn/Veli Açık Rızası:</strong> 18 yaş altı kullanıcılar için ebeveyn/veli açık rızası zorunludur</li>
            <li><strong>Kullanım Takibi:</strong> Çocuk kullanım süresi ve aktivite takibi ebeveyn bilgisi dahilinde yapılır</li>
            <li><strong>Güvenlik Önlemleri:</strong> Çocuk güvenliği için ekran süresi ve içerik filtreleme uygulanır</li>
            <li><strong>Ebeveyn Kontrolü:</strong> Ebeveyn kontrol paneli üzerinden izinler yönetilebilir</li>
            <li><strong>Bildirim Yönetimi:</strong> Çocuk hesabına gelen bildirimler ebeveyn tarafından kontrol edilir</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>8. İZİN İPTALİ VE SONUÇLARI</h2>
          <p>Kullanıcı bu izni daha sonra iptal edebilir:</p>
          <ul>
            <li><strong>İptal Yöntemi:</strong> Ayarlar > Veri & Gizlilik bölümünden iptal edilebilir</li>
            <li><strong>Uygulama Kısıtlamaları:</strong> İptal sonrası uygulama temel fonksiyonları çalışmaz</li>
            <li><strong>Güvenlik Riski:</strong> Hesap güvenliği risk altına girebilir</li>
            <li><strong>Çocuk Koruma:</strong> Çocuk koruma özellikleri devre dışı kalır</li>
            <li><strong>Veri Silme:</strong> İptal sonrası 30 gün içinde ilgili veriler silinir</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>9. TEKNİK DETAYLAR</h2>
          <h3>Toplanan Veriler:</h3>
          <ul>
            <li>Cihaz kimliği (Device ID, Browser Fingerprint)</li>
            <li>İşletim sistemi ve tarayıcı bilgileri</li>
            <li>IP adresi (güvenlik için)</li>
            <li>Oturum token'ları</li>
            <li>Kullanım istatistikleri (anonim)</li>
          </ul>
          <p><strong>Veri Saklama Süresi:</strong> 2 yıl (KVKK uyumlu)</p>
          <h3>Veri Güvenliği:</h3>
          <ul>
            <li>SSL/TLS şifreleme ile korunur</li>
            <li>Güvenli sunucularda saklanır</li>
            <li>Üçüncü taraf erişimi yasaktır</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>10. İLETİŞİM</h2>
          <p>Bu izin hakkında sorularınız için:</p>
          <ul>
            <li><strong>E-posta:</strong> gencmuderris@gmail.com</li>
            <li><strong>Telefon:</strong> +90 533 376 70 63</li>
            <li><strong>Adres:</strong> İzmir/TÜRKİYE</li>
            <li><strong>Veri Sorumlusu:</strong> NAZIM AYAYDIN</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>11. GÜNCELLEME BİLDİRİMİ</h2>
          <p>Bu belge güncellendiğinde:</p>
          <ul>
            <li><strong>Uygulama Bildirimi:</strong> Uygulama içi bildirim gönderilir</li>
            <li><strong>E-posta Bilgilendirme:</strong> E-posta ile bilgilendirme yapılır</li>
            <li><strong>Kabul Süresi:</strong> 30 gün içinde yeni şartları kabul etme süresi verilir</li>
            <li><strong>Erişim Kısıtlaması:</strong> Kabul edilmezse hesap erişimi kısıtlanır</li>
            <li><strong>Değişiklik Bildirimi:</strong> Önemli değişiklikler önceden duyurulur</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <div class="kvkk-warning">
            <p><strong>Not:</strong> Bu belge, Genç Müderris platformunun kullanımı için zorunlu olan cihaz ve oturum bildirim izinlerini kapsar. Platforma kayıt olarak bu şartları kabul etmiş sayılırsınız.</p>
          </div>
        </section>
      </div>
    </div>
  `;

  // Bildirim İzinleri Politikası içeriği
  const notificationPolicyContent = `
    <div class="kvkk-content">
      <div class="kvkk-header">
        <h1>GENÇ MÜDERRİS BİLDİRİM İZİNLERİ POLİTİKASI</h1>
        <div class="kvkk-meta">
          <p><strong>Yürürlük Tarihi:</strong> 10 Temmuz 2025</p>
          <p><strong>Versiyon:</strong> 1.0</p>
          <p><strong>Uygulama:</strong> Genç Müderris – İslami Eğitim Platformu</p>
        </div>
      </div>

      <div class="kvkk-body">
        <section class="kvkk-section">
          <h2>1. AMAÇ</h2>
          <p>Bu politika, Genç Müderris kullanıcılarına gönderilen bildirim türlerini, bildirim sıklığını, izin süreçlerini ve kullanıcıların yasal haklarını açıklamaktadır.</p>
        </section>

        <section class="kvkk-section">
          <h2>2. BİLDİRİM TÜRLERİ</h2>
          <h3>2.1 Zorunlu Bildirimler (İzin Gerektirmez)</h3>
          <p>Şifre sıfırlama, güvenlik uyarıları, yasal bildirimler, bakım-duyuru gibi hizmetsel içerikler</p>
          
          <h3>2.2 İsteğe Bağlı Bildirimler (Açık Rıza Gerekli)</h3>
          <ul>
            <li>Eğitim içerikleri (ödev, sınav, başarı)</li>
            <li>Sosyal bildirimler (arkadaşlık, mesaj)</li>
            <li>Gamification (rozet, seviye, yarışma)</li>
            <li>Pazarlama (kampanya, yeni özellikler)</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>3. EBEVEYN BİLDİRİMLERİ</h2>
          <h3>3.1 Zorunlu</h3>
          <p>Çocuğa ait güvenlik uyarıları, şüpheli davranış, hesap değişiklikleri</p>
          
          <h3>3.2 Opsiyonel</h3>
          <p>İlerleme raporu, etkinlik özetleri, kullanım süresi raporları</p>
        </section>

        <section class="kvkk-section">
          <h2>4. BİLDİRİM TERCİHLERİ</h2>
          <p>Kullanıcılar ayarlar bölümünden:</p>
          <ul>
            <li>Hangi tür bildirimleri alacağını</li>
            <li>Ne zaman ve hangi yolla alacağını (e-posta, push, SMS)</li>
            <li>Sıklığını (anlık, günlük, haftalık)</li>
          </ul>
          <p>belirleyebilir.</p>
        </section>

        <section class="kvkk-section">
          <h2>5. BİLDİRİM İÇERİĞİ</h2>
          <ul>
            <li>Kısa, yaşa uygun, olumlu ve güvenli ifadeler kullanılır</li>
            <li>Çocuklara yönelik tüm içerikler görsel destekli ve filtrelenmiş olur</li>
            <li>Ebeveyn bildirimleri detaylı ve rapor formatındadır</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>6. İZİN VERME VE GERİ ÇEKME</h2>
          <ul>
            <li>Kullanıcılar istedikleri zaman opsiyonel bildirim izinlerini geri çekebilir</li>
            <li>Zorunlu bildirimler geri çekilemez</li>
            <li>Geri çekme işlemi ayarlar menüsünden veya destek e-postası ile yapılabilir</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>7. YASAL UYUMLULUK</h2>
          <p>Bu politika:</p>
          <ul>
            <li>KVKK (Türkiye)</li>
            <li>GDPR (Avrupa)</li>
            <li>COPPA (ABD / 13 yaş altı koruma)</li>
          </ul>
          <p>mevzuatlarıyla uyumludur.</p>
        </section>

        <section class="kvkk-section">
          <h2>8. ÇOCUK KORUMA ÖZEL HÜKÜMLERİ</h2>
          <p>13 yaş altı kullanıcılar için:</p>
          <ul>
            <li><strong>Ebeveyn Onayı Zorunluluğu:</strong> Ebeveyn/veli açık rızası zorunludur</li>
            <li><strong>İçerik Filtreleme:</strong> Bildirim içerikleri yaşa uygun filtrelenir</li>
            <li><strong>Gece Saatleri:</strong> Gece saatlerinde (22:00-08:00) bildirim gönderilmez</li>
            <li><strong>Ebeveyn Kontrolü:</strong> Ebeveyn kontrol paneli üzerinden yönetilir</li>
            <li><strong>Kullanım Süresi Uyarısı:</strong> Çocuk kullanım süresi aşımında ebeveyne uyarı gönderilir</li>
            <li><strong>Güvenlik Önceliği:</strong> Çocuk güvenliği için ekstra kontroller uygulanır</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>9. BİLDİRİM ZAMANLAMASI</h2>
          <ul>
            <li><strong>Eğitim Bildirimleri:</strong> 08:00-20:00 arası</li>
            <li><strong>Sosyal Bildirimler:</strong> 09:00-21:00 arası</li>
            <li><strong>Acil Güvenlik Bildirimleri:</strong> 7/24</li>
            <li><strong>Pazarlama Bildirimleri:</strong> 10:00-18:00 arası</li>
            <li><strong>Hafta Sonu Bildirimleri:</strong> 10:00-16:00 arası</li>
            <li><strong>Özel Gün Bildirimleri:</strong> Dini ve milli bayramlarda uygun saatlerde</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>10. BİLDİRİM SIKLIĞI SINIRLARI</h2>
          <ul>
            <li><strong>Günlük Maksimum Bildirim Sayısı:</strong> 5</li>
            <li><strong>Haftalık Maksimum Bildirim Sayısı:</strong> 25</li>
            <li><strong>Pazarlama Bildirimleri:</strong> Haftada maksimum 2</li>
            <li><strong>Sosyal Bildirimler:</strong> Günlük maksimum 3</li>
            <li><strong>Eğitim Bildirimleri:</strong> Günlük maksimum 4</li>
            <li><strong>Güvenlik Bildirimleri:</strong> Sınırsız (acil durumlar için)</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>11. BİLDİRİM İÇERİĞİ KURALLARI</h2>
          <ul>
            <li><strong>Maksimum Karakter Sayısı:</strong> 150</li>
            <li><strong>Emoji Kullanımı:</strong> Yaşa uygun ve kültürel hassasiyetlere uygun</li>
            <li><strong>Link İçeren Bildirimler:</strong> Güvenlik kontrolünden geçer</li>
            <li><strong>Kişisel Bilgi:</strong> Hiçbir kişisel bilgi içermez</li>
            <li><strong>Reklam İçeriği:</strong> Reklam içeriği barındırmaz</li>
            <li><strong>Dil Kullanımı:</strong> Türkçe ağırlıklı, gerektiğinde çok dilli</li>
            <li><strong>Görsel İçerik:</strong> Çocuklar için uygun ve eğitici görseller</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>12. VERİ SAKLAMA VE GÜVENLİK</h2>
          <ul>
            <li><strong>Bildirim Geçmişi:</strong> 1 yıl saklanır</li>
            <li><strong>Kullanıcı Tercihleri:</strong> Hesap aktif olduğu sürece</li>
            <li><strong>Şifreleme:</strong> Tüm bildirim verileri SSL/TLS ile şifrelenir</li>
            <li><strong>Üçüncü Taraf Erişimi:</strong> Yasaktır</li>
            <li><strong>Veri Yedekleme:</strong> Günlük yedekleme yapılır</li>
            <li><strong>Güvenlik Denetimi:</strong> Aylık güvenlik denetimi uygulanır</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>13. İPTAL VE ŞİKAYET SÜRECİ</h2>
          <ul>
            <li><strong>Anında İptal:</strong> Ayarlar > Bildirimler bölümünden</li>
            <li><strong>E-posta ile İptal:</strong> 24 saat içinde işleme alınır</li>
            <li><strong>Şikayet Süreci:</strong> 48 saat içinde yanıt verilir</li>
            <li><strong>Toplu İptal:</strong> Hesap silme ile otomatik</li>
            <li><strong>Geri Alma:</strong> İptal edilen bildirimler 30 gün içinde geri alınabilir</li>
            <li><strong>Şikayet Formu:</strong> Web sitesi üzerinden online şikayet formu</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>14. GÜNCELLEME BİLDİRİMİ</h2>
          <p>Bu politika güncellendiğinde:</p>
          <ul>
            <li><strong>Uygulama İçi Bildirim:</strong> Uygulama içi bildirim gönderilir</li>
            <li><strong>E-posta Bilgilendirme:</strong> E-posta ile bilgilendirme yapılır</li>
            <li><strong>Kabul Süresi:</strong> 30 gün içinde yeni şartları kabul etme süresi verilir</li>
            <li><strong>Erişim Kısıtlaması:</strong> Kabul edilmezse opsiyonel bildirimler durdurulur</li>
            <li><strong>Değişiklik Bildirimi:</strong> Önemli değişiklikler önceden duyurulur</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>15. ÖZEL DURUMLAR</h2>
          <ul>
            <li><strong>Acil Durum Bildirimleri:</strong> Güvenlik için zorunlu, tüm kullanıcılara gönderilir</li>
            <li><strong>Sistem Bakım Bildirimleri:</strong> Hizmet kesintisi öncesi 24 saat önceden bildirilir</li>
            <li><strong>Yasal Bildirimler:</strong> Mahkeme kararları, yasal değişiklikler zorunlu olarak gönderilir</li>
            <li><strong>Doğal Afet Bildirimleri:</strong> Güvenlik amaçlı, bölgesel olarak gönderilir</li>
            <li><strong>Teknik Sorun Bildirimleri:</strong> Hizmet kalitesi için gerekli bildirimler</li>
            <li><strong>Güvenlik İhlali Bildirimleri:</strong> Hesap güvenliği için acil bildirimler</li>
          </ul>
        </section>

        <section class="kvkk-section">
          <h2>16. İLETİŞİM</h2>
          <p>Sorular ve talepler için:</p>
          <ul>
            <li>📞 +90 533 376 70 63</li>
            <li>🌐 www.gencmuderris.com</li>
          </ul>
        </section>

        <div class="kvkk-footer">
          <p><strong>Not:</strong> Bu politika, Genç Müderris platformunun bildirim hizmetlerini kullanmak için gerekli olan izinleri kapsar. Platforma kayıt olarak bu şartları kabul etmiş sayılırsınız.</p>
        </div>
      </div>
    </div>
  `;

  // Ticari Elektronik İleti ve Bildirim Onayı içeriği - YENİ EKLENEN
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
  function downloadAsPDF() {
    const modalContent = policyModalBody.innerHTML;
    const title = policyModalTitle.textContent;
    
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
  function openPolicyModal(policyType) {
    let title = '';
    let content = '';

    switch (policyType) {
      case 'kvkk':
        title = 'KVKK ve Gizlilik Politikası';
        content = kvkkContent;
        break;
      case 'terms':
      case 'uyelik': // EKLENMİŞ - hem terms hem uyelik için çalışır
        title = 'Üyelik ve Kullanım Koşulları';
        content = termsContent;
        break;
      case 'device-consent':
        title = 'Cihaz ve Oturum Bildirim İzni';
        content = deviceConsentContent;
        break;
      case 'notification-policy':
        title = 'Bildirim İzinleri Politikası';
        content = notificationPolicyContent;
        break;
      case 'commercial':
        title = 'Ticari Elektronik İleti ve Bildirim Onayı';
        content = commercialContent;
        break;
      default:
        title = 'Politika';
        content = '<p>Politika içeriği bulunamadı.</p>';
    }

    policyModalTitle.textContent = title;
    policyModalBody.innerHTML = content;
    policyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Modal kapatma fonksiyonu
  function closePolicyModal() {
    policyModal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  // Event listeners
  policyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const policyType = this.getAttribute('data-policy');
      openPolicyModal(policyType);
    });
  });

  // Modal kapatma butonları
  policyModalClose.addEventListener('click', closePolicyModal);
  
  // PDF indirme butonu
  pdfDownloadBtn.addEventListener('click', downloadAsPDF);

  // Modal dışına tıklayınca kapat
  policyModal.addEventListener('click', function(e) {
    if (e.target === policyModal) {
      closePolicyModal();
    }
  });

  // ESC tuşu ile kapat
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && policyModal.style.display === 'block') {
      closePolicyModal();
    }
  });
});
