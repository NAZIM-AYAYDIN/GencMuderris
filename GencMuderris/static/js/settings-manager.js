// Ayarlar Yöneticisi
class SettingsManager {
  constructor() {
    this.settings = {
      theme: 'koyu',
      language: 'tr',
      nightMode: true,
      nightStart: '22:00',
      nightEnd: '07:00',
      disableAnimations: false,
      assistantSpeak: true,
      volumeLevel: 50,
      notificationSound: 'default',
      showNotifications: true,
      soundNotifications: true,
      emailNotifications: true,
      pushNotifications: true,
      
      // Ses ayarları
      systemVolume: 70,
      notificationSound: 'default',
      notificationVolume: 50,
      ttsEngine: 'browser',
      ttsVoice: 'tr-TR-AhmetNeural',
      ttsSpeed: 1,
      ttsPitch: 1,
      assistantSpeak: true,
      autoReadMessages: false,
      audioQuality: 'medium',
      autoAudioBalance: true,
      audioLatency: 200,
      microphoneAccess: 'auto'
    };
    
    this.speechSynthesis = window.speechSynthesis;
    this.currentUtterance = null;
    
    this.nightModeTimer = null;
    this.init();
  }

  init() {
    this.loadSettings();
    this.bindEvents();
    this.applyTheme();
    this.applyAnimations();
    this.startNightModeMonitoring();
  }

  // Ayarları yükle
  loadSettings() {
    // Veritabanından kullanıcı ayarlarını yükle
    // Şimdilik localStorage kullanıyoruz, sonra API ile değiştirilecek
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
    
    this.updateFormElements();
  }

  // Form elemanlarını güncelle
  updateFormElements() {
    // Tema seçimi
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
      themeSelect.value = this.settings.theme;
    }

    // Dil seçimi
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = this.settings.language;
    }

    // Gece modu
    const nightMode = document.getElementById('nightMode');
    if (nightMode) {
      nightMode.checked = this.settings.nightMode;
    }

    // Gece modu saatleri
    const nightStart = document.getElementById('nightStart');
    if (nightStart) {
      nightStart.value = this.settings.nightStart;
    }

    const nightEnd = document.getElementById('nightEnd');
    if (nightEnd) {
      nightEnd.value = this.settings.nightEnd;
    }

    // Animasyonlar
    const disableAnimations = document.getElementById('disableAnimations');
    if (disableAnimations) {
      disableAnimations.checked = this.settings.disableAnimations;
    }

    // Asistan sesli konuşma
    const assistantSpeak = document.getElementById('assistantSpeak');
    if (assistantSpeak) {
      assistantSpeak.checked = this.settings.assistantSpeak;
    }

    // Sistem ses seviyesi (yeni)
    const systemVolume = document.getElementById('systemVolume');
    if (systemVolume) {
      systemVolume.value = this.settings.systemVolume;
    }

    // TTS hızı (yeni)
    const ttsSpeed = document.getElementById('ttsSpeed');
    if (ttsSpeed) {
      ttsSpeed.value = this.settings.ttsSpeed;
    }

    // TTS motoru (yeni)
    const ttsEngine = document.getElementById('ttsEngine');
    if (ttsEngine) {
      ttsEngine.value = this.settings.ttsEngine;
    }

    // TTS ses (yeni)
    const ttsVoice = document.getElementById('ttsVoice');
    if (ttsVoice) {
      ttsVoice.value = this.settings.ttsVoice;
    }

    // Test metni (yeni)
    const testText = document.getElementById('testText');
    if (testText && !testText.value) {
      testText.value = 'Hoşgeldin Genç Müderris';
    }

    // Bildirim sesi
    const notificationSound = document.getElementById('notificationSound');
    if (notificationSound) {
      notificationSound.value = this.settings.notificationSound;
    }

    // Bildirim ayarları
    const showNotifications = document.getElementById('showNotifications');
    if (showNotifications) {
      showNotifications.checked = this.settings.showNotifications;
    }

    const soundNotifications = document.getElementById('soundNotifications');
    if (soundNotifications) {
      soundNotifications.checked = this.settings.soundNotifications;
    }

    const emailNotifications = document.getElementById('emailNotifications');
    if (emailNotifications) {
      emailNotifications.checked = this.settings.emailNotifications;
    }

    const pushNotifications = document.getElementById('pushNotifications');
    if (pushNotifications) {
      pushNotifications.checked = this.settings.pushNotifications;
    }

    // Gece modu durumuna göre saat kutularını güncelle
    this.updateNightModeTimeInputs();
  }

  // Gece modu izleme sistemini başlat
  startNightModeMonitoring() {
    if (this.settings.nightMode) {
      this.checkNightMode();
      // Her dakika kontrol et
      this.nightModeTimer = setInterval(() => {
        this.checkNightMode();
      }, 60000); // 60 saniye
    }
  }

  // Gece modu kontrolü
  checkNightMode() {
    if (!this.settings.nightMode) return;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Dakika cinsinden
    
    const startTime = this.timeToMinutes(this.settings.nightStart);
    const endTime = this.timeToMinutes(this.settings.nightEnd);
    
    let isNightTime = false;
    
    if (startTime <= endTime) {
      // Normal durum: 22:00 - 07:00
      isNightTime = currentTime >= startTime || currentTime <= endTime;
    } else {
      // Gece yarısını geçen durum: 22:00 - 07:00
      isNightTime = currentTime >= startTime || currentTime <= endTime;
    }
    
    // Gece modu durumuna göre tema uygula
    if (isNightTime) {
      this.applyNightMode();
    } else {
      this.applyDayMode();
    }
  }

  // Saat formatını dakikaya çevir
  timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Gece modu uygula - Standart gece teması
  applyNightMode() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    
    // Eğer zaten gece modunda değilse uygula
    if (currentTheme !== 'night-mode') {
      // Orijinal temayı sakla
      root.setAttribute('data-original-theme', currentTheme);
      // Standart gece modunu uygula
      root.setAttribute('data-theme', 'night-mode');
      root.setAttribute('data-night-mode', 'true');
      
      // Gece modu bildirimi
      this.showNightModeNotification('🌙 Gece modu aktif');
      
      console.log('🌙 Gece modu aktif - Standart gece teması uygulandı');
    }
  }

  // Gündüz modu uygula - Orijinal temaya dön
  applyDayMode() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    
    // Eğer gece modundaysa orijinal temaya dön
    if (currentTheme === 'night-mode') {
      const originalTheme = root.getAttribute('data-original-theme') || 'koyu';
      
      // Orijinal temaya geri dön
      root.setAttribute('data-theme', originalTheme);
      root.removeAttribute('data-night-mode');
      root.removeAttribute('data-original-theme');
      
      // Gündüz modu bildirimi
      this.showNightModeNotification('☀️ Gündüz modu aktif');
      
      console.log(`☀️ Gündüz modu aktif - ${originalTheme} temasına dönüldü`);
    }
  }

  // Gece modu bildirimi
  showNightModeNotification(message) {
    // Küçük bir bildirim göster
    const notification = document.createElement('div');
    notification.className = 'night-mode-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--bg-sidebar);
      color: var(--text-main);
      padding: 10px 15px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      font-size: 0.8rem;
      z-index: 10000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    `;
    
    document.body.appendChild(notification);
    
    // Animasyon
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Event listener'ları bağla
  bindEvents() {
    // Tema değişimi
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        this.settings.theme = e.target.value;
        this.applyTheme();
        this.saveSettings();
      });
    }

    // Gece modu
    const nightMode = document.getElementById('nightMode');
    if (nightMode) {
      nightMode.addEventListener('change', (e) => {
        this.settings.nightMode = e.target.checked;
        this.updateNightModeTimeInputs();
        
        if (this.settings.nightMode) {
          this.startNightModeMonitoring();
        } else {
          this.stopNightModeMonitoring();
          this.applyDayMode(); // Gece modunu kapat, orijinal temaya dön
        }
        
        this.saveSettings();
      });
    }

    // Gece modu saatleri
    const nightStart = document.getElementById('nightStart');
    if (nightStart) {
      nightStart.addEventListener('change', (e) => {
        this.settings.nightStart = e.target.value;
        if (this.settings.nightMode) {
          this.checkNightMode(); // Hemen kontrol et
        }
        this.saveSettings();
      });
    }

    const nightEnd = document.getElementById('nightEnd');
    if (nightEnd) {
      nightEnd.addEventListener('change', (e) => {
        this.settings.nightEnd = e.target.value;
        if (this.settings.nightMode) {
          this.checkNightMode(); // Hemen kontrol et
        }
        this.saveSettings();
      });
    }

    // Animasyonlar
    const disableAnimations = document.getElementById('disableAnimations');
    if (disableAnimations) {
      disableAnimations.addEventListener('change', (e) => {
        this.settings.disableAnimations = e.target.checked;
        this.applyAnimations();
        this.saveSettings();
      });
    }

    // Asistan sesli konuşma
    const assistantSpeak = document.getElementById('assistantSpeak');
    if (assistantSpeak) {
      assistantSpeak.addEventListener('change', (e) => {
        this.settings.assistantSpeak = e.target.checked;
        this.saveSettings();
      });
    }

    // Ses seviyesi
    const volumeLevel = document.getElementById('volumeLevel');
    if (volumeLevel) {
      volumeLevel.addEventListener('input', (e) => {
        this.settings.volumeLevel = e.target.value;
        this.saveSettings();
      });
    }

    // Bildirim sesi
    const notificationSound = document.getElementById('notificationSound');
    if (notificationSound) {
      notificationSound.addEventListener('change', (e) => {
        this.settings.notificationSound = e.target.value;
        this.saveSettings();
      });
    }

    // Bildirim ayarları
    const showNotifications = document.getElementById('showNotifications');
    if (showNotifications) {
      showNotifications.addEventListener('change', (e) => {
        this.settings.showNotifications = e.target.checked;
        this.saveSettings();
      });
    }

    const soundNotifications = document.getElementById('soundNotifications');
    if (soundNotifications) {
      soundNotifications.addEventListener('change', (e) => {
        this.settings.soundNotifications = e.target.checked;
        this.saveSettings();
      });
    }

    const emailNotifications = document.getElementById('emailNotifications');
    if (emailNotifications) {
      emailNotifications.addEventListener('change', (e) => {
        this.settings.emailNotifications = e.target.checked;
        this.saveSettings();
      });
    }

    const pushNotifications = document.getElementById('pushNotifications');
    if (pushNotifications) {
      pushNotifications.addEventListener('change', (e) => {
        this.settings.pushNotifications = e.target.checked;
        this.saveSettings();
      });
    }

    // Label'lara tıklama olayları ekle
    this.bindLabelEvents();

    // Ses ayarları
    this.bindAudioEvents();

    // Oturum kapatma butonları
    this.bindSessionEvents();
  }

  // Oturum kapatma event listener'ları
  bindSessionEvents() {
    const closeSessionBtns = document.querySelectorAll('.close-session-btn');
    
    closeSessionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const sessionItem = btn.closest('.session-item');
        const sessionName = sessionItem.querySelector('span').textContent;
        
        if (confirm(`"${sessionName}" oturumunu kapatmak istediğinizden emin misiniz?`)) {
          // Oturum kapatma işlemi
          sessionItem.style.opacity = '0.5';
          sessionItem.style.textDecoration = 'line-through';
          
          // 1 saniye sonra kaldır
          setTimeout(() => {
            sessionItem.remove();
          }, 1000);
          
          console.log(`Oturum kapatıldı: ${sessionName}`);
        }
      });
    });
  }

  // Gece modu saat kutularını güncelle
  updateNightModeTimeInputs() {
    const nightStart = document.getElementById('nightStart');
    const nightEnd = document.getElementById('nightEnd');
    const nightStartLabel = nightStart?.closest('.setting-item')?.querySelector('label');
    const nightEndLabel = nightEnd?.closest('.setting-item')?.querySelector('label');

    if (this.settings.nightMode) {
      // Gece modu aktif - saat kutularını aktif et
      if (nightStart) {
        nightStart.disabled = false;
        nightStart.style.opacity = '1';
        nightStart.style.cursor = 'pointer';
      }
      if (nightEnd) {
        nightEnd.disabled = false;
        nightEnd.style.opacity = '1';
        nightEnd.style.cursor = 'pointer';
      }
      
      // Label'ları normal renk yap
      if (nightStartLabel) {
        nightStartLabel.style.color = 'var(--text-main)';
        nightStartLabel.style.cursor = 'pointer';
      }
      if (nightEndLabel) {
        nightEndLabel.style.color = 'var(--text-main)';
        nightEndLabel.style.cursor = 'pointer';
      }
    } else {
      // Gece modu pasif - saat kutularını pasif et
      if (nightStart) {
        nightStart.disabled = true;
        nightStart.style.opacity = '0.5';
        nightStart.style.cursor = 'not-allowed';
      }
      if (nightEnd) {
        nightEnd.disabled = true;
        nightEnd.style.opacity = '0.5';
        nightEnd.style.cursor = 'not-allowed';
      }
      
      // Label'ları soluk renk yap
      if (nightStartLabel) {
        nightStartLabel.style.color = 'var(--text-muted)';
        nightStartLabel.style.cursor = 'not-allowed';
      }
      if (nightEndLabel) {
        nightEndLabel.style.color = 'var(--text-muted)';
        nightEndLabel.style.cursor = 'not-allowed';
      }
    }
  }

  // Label'lara tıklama olayları
  bindLabelEvents() {
    const settingItems = document.querySelectorAll('.setting-item');
    
    settingItems.forEach(item => {
      const label = item.querySelector('label');
      const input = item.querySelector('input, select');
      
      if (label && input) {
        label.addEventListener('click', () => {
          // Input disabled ise tıklamayı engelle
          if (input.disabled) {
            return;
          }
          
          // Input'a focus ver
          input.focus();
          
          // Checkbox ise toggle yap
          if (input.type === 'checkbox') {
            input.checked = !input.checked;
            input.dispatchEvent(new Event('change'));
          }
          
          // Select ise aç
          if (input.tagName === 'SELECT') {
            input.click();
          }
        });
      }
    });
  }

  // Temayı uygula (normal tema değişimi)
  applyTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    
    // Eğer gece modu aktifse, tema değişimini engelle
    if (root.getAttribute('data-night-mode') === 'true') {
      console.log('Gece modu aktif - tema değişimi engellendi');
      return;
    }
    
    root.setAttribute('data-theme', this.settings.theme);
    
    // Tema değişikliği animasyonu
    root.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      root.style.transition = '';
    }, 300);
  }

  // Animasyonları uygula
  applyAnimations() {
    const root = document.documentElement;
    if (this.settings.disableAnimations) {
      root.style.setProperty('--animation-duration', '0s');
      // Tüm animasyonları devre dışı bırak
      document.body.style.setProperty('--transition-duration', '0s');
    } else {
      root.style.removeProperty('--animation-duration');
      document.body.style.removeProperty('--transition-duration');
    }
  }

  // Ayarları kaydet
  saveSettings() {
    // Şimdilik localStorage'a kaydet
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
    
    // TODO: Veritabanına kaydet
    this.saveToDatabase();
  }

  // Veritabanına kaydet (API çağrısı)
  async saveToDatabase() {
    try {
      // API endpoint'i hazır olduğunda buraya eklenecek
      // const response = await fetch('/api/settings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(this.settings)
      // });
      console.log('Ayarlar kaydedildi:', this.settings);
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error);
    }
  }

  // Gece modu izlemeyi durdur
  stopNightModeMonitoring() {
    if (this.nightModeTimer) {
      clearInterval(this.nightModeTimer);
      this.nightModeTimer = null;
    }
  }

  // Ses ayarları event listener'ları
  bindAudioEvents() {
    // Sistem ses seviyesi
    const systemVolume = document.getElementById('systemVolume');
    if (systemVolume) {
      systemVolume.addEventListener('input', (e) => {
        // 1-100 arasında sınırla
        let value = parseInt(e.target.value);
        if (value < 1) value = 1;
        if (value > 100) value = 100;
        
        this.settings.systemVolume = value;
        e.target.value = value;
        this.saveSettings();
      });
    }

    // TTS hızı
    const ttsSpeed = document.getElementById('ttsSpeed');
    if (ttsSpeed) {
      ttsSpeed.addEventListener('input', (e) => {
        // 0.5-2 arasında sınırla
        let value = parseFloat(e.target.value);
        if (value < 0.5) value = 0.5;
        if (value > 2) value = 2;
        
        this.settings.ttsSpeed = value;
        e.target.value = value;
        this.saveSettings();
      });
    }

    // Test butonu
    const testTTS = document.getElementById('testTTS');
    const testText = document.getElementById('testText');

    if (testTTS && testText) {
      testTTS.addEventListener('click', () => {
        if (testTTS.classList.contains('playing')) {
          // Durdur
          this.stopTTS();
          testTTS.classList.remove('playing');
          testTTS.innerHTML = '<i class="fa-solid fa-play"></i>';
        } else {
          // Başlat
          this.testTTS(testText.value);
          testTTS.classList.add('playing');
          testTTS.innerHTML = '<i class="fa-solid fa-stop"></i>';
        }
      });
    }

    // Diğer ses ayarları
    const ttsEngine = document.getElementById('ttsEngine');
    if (ttsEngine) {
      ttsEngine.addEventListener('change', (e) => {
        this.settings.ttsEngine = e.target.value;
        this.saveSettings();
      });
    }

    const ttsVoice = document.getElementById('ttsVoice');
    if (ttsVoice) {
      ttsVoice.addEventListener('change', (e) => {
        this.settings.ttsVoice = e.target.value;
        this.saveSettings();
      });
    }

    const notificationSound = document.getElementById('notificationSound');
    if (notificationSound) {
      notificationSound.addEventListener('change', (e) => {
        this.settings.notificationSound = e.target.value;
        this.saveSettings();
      });
    }
  }

  // TTS test fonksiyonu
  testTTS(text) {
    if (!this.speechSynthesis) {
      alert('Tarayıcınız sesli okuma özelliğini desteklemiyor.');
      return;
    }

    // Mevcut konuşmayı durdur
    this.stopTTS();

    // Yeni utterance oluştur
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Ayarları uygula
    this.currentUtterance.rate = this.settings.ttsSpeed;
    this.currentUtterance.pitch = this.settings.ttsPitch;
    this.currentUtterance.volume = this.settings.systemVolume / 100;
    
    // Ses seçimi (basit implementasyon)
    const voices = this.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.lang === 'tr-TR') || voices[0];
    if (selectedVoice) {
      this.currentUtterance.voice = selectedVoice;
    }

    // Event listener'lar
    this.currentUtterance.onend = () => {
      const testTTS = document.getElementById('testTTS');
      if (testTTS) {
        testTTS.classList.remove('playing');
        testTTS.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    };

    this.currentUtterance.onerror = (event) => {
      console.error('TTS Hatası:', event);
      alert('Sesli okuma sırasında hata oluştu.');
      const testTTS = document.getElementById('testTTS');
      if (testTTS) {
        testTTS.classList.remove('playing');
        testTTS.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    };

    // Konuşmayı başlat
    this.speechSynthesis.speak(this.currentUtterance);
  }

  // TTS durdurma
  stopTTS() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
  }
}

// Veri Yönetimi Ayarları Yöneticisi
class DataManagementSettings {
  constructor() {
    this.settings = {
      dataAnalytics: false,
      deviceInfoSharing: false,
      usageStats: false,
      errorReporting: false,
      autoBackup: false
    };
    
    this.init();
  }
  
  init() {
    this.loadSettings();
    this.bindEvents();
    this.applySettings();
  }
  
  // Ayarları localStorage'dan yükle
  loadSettings() {
    const savedSettings = localStorage.getItem('dataManagementSettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
    
    // Checkbox'ları ayarla
    Object.keys(this.settings).forEach(key => {
      const checkbox = document.getElementById(key);
      if (checkbox) {
        checkbox.checked = this.settings[key];
      }
    });
  }
  
  // Event listener'ları bağla
  bindEvents() {
    const checkboxes = [
      'dataAnalytics',
      'deviceInfoSharing', 
      'usageStats',
      'errorReporting',
      'autoBackup'
    ];
    
    checkboxes.forEach(id => {
      const checkbox = document.getElementById(id);
      if (checkbox) {
        checkbox.addEventListener('change', (e) => {
          this.settings[id] = e.target.checked;
          this.saveSettings();
          this.applySettings();
          this.showNotification(id, e.target.checked);
        });
      }
    });
  }
  
  // Ayarları localStorage'a kaydet
  saveSettings() {
    localStorage.setItem('dataManagementSettings', JSON.stringify(this.settings));
    
    // Gelecekte veritabanına kaydetme için hazırlık
    this.prepareForDatabase();
  }
  
  // Veritabanına kaydetme için hazırlık (gelecekte kullanılacak)
  prepareForDatabase() {
    const settingsForDB = {
      userId: this.getCurrentUserId(), // Gelecekte eklenecek
      settings: this.settings,
      timestamp: new Date().toISOString(),
      userType: this.getUserType() // 'parent' veya 'child'
    };
    
    // Şimdilik console'a yazdır, gelecekte API'ye gönder
    console.log('Veritabanına kaydedilecek ayarlar:', settingsForDB);
  }
  
  // Ayarları uygula
  applySettings() {
    if (this.settings.dataAnalytics) {
      this.enableDataAnalytics();
    } else {
      this.disableDataAnalytics();
    }
    
    if (this.settings.deviceInfoSharing) {
      this.enableDeviceInfoSharing();
    } else {
      this.disableDeviceInfoSharing();
    }
    
    if (this.settings.usageStats) {
      this.enableUsageStats();
    } else {
      this.disableUsageStats();
    }
    
    if (this.settings.errorReporting) {
      this.enableErrorReporting();
    } else {
      this.disableErrorReporting();
    }
    
    if (this.settings.autoBackup) {
      this.enableAutoBackup();
    } else {
      this.disableAutoBackup();
    }
  }
  
  // Bildirim göster
  showNotification(settingName, enabled) {
    const settingLabels = {
      dataAnalytics: 'Veri Analizi ve İyileştirme',
      deviceInfoSharing: 'Cihaz Bilgilerini Paylaş',
      usageStats: 'Kullanım İstatistikleri',
      errorReporting: 'Hata Raporlama',
      autoBackup: 'Otomatik Yedekleme'
    };
    
    const status = enabled ? 'etkinleştirildi' : 'devre dışı bırakıldı';
    const message = `${settingLabels[settingName]} ${status}`;
    
    // Basit bildirim (gelecekte daha gelişmiş olabilir)
    console.log(message);
    
    // Toast notification eklenebilir
    this.showToast(message, enabled ? 'success' : 'info');
  }
  
  // Toast notification (basit versiyon)
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4caf50' : '#2196f3'};
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 10000;
      font-size: 0.85rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
  
  // Gelecekte eklenecek metodlar
  getCurrentUserId() {
    // Kullanıcı ID'sini döndür (gelecekte eklenecek)
    return 'user_' + Date.now();
  }
  
  getUserType() {
    // Kullanıcı tipini döndür (gelecekte eklenecek)
    return 'parent'; // veya 'child'
  }
  
  // Özellik etkinleştirme/devre dışı bırakma metodları
  enableDataAnalytics() {
    console.log('Veri analizi etkinleştirildi');
    // Analytics kodları buraya eklenecek
  }
  
  disableDataAnalytics() {
    console.log('Veri analizi devre dışı bırakıldı');
    // Analytics kodları buradan kaldırılacak
  }
  
  enableDeviceInfoSharing() {
    console.log('Cihaz bilgisi paylaşımı etkinleştirildi');
    // Cihaz bilgisi toplama kodları
  }
  
  disableDeviceInfoSharing() {
    console.log('Cihaz bilgisi paylaşımı devre dışı bırakıldı');
    // Cihaz bilgisi toplama kodları kaldırılacak
  }
  
  enableUsageStats() {
    console.log('Kullanım istatistikleri etkinleştirildi');
    // Kullanım takibi kodları
  }
  
  disableUsageStats() {
    console.log('Kullanım istatistikleri devre dışı bırakıldı');
    // Kullanım takibi kodları kaldırılacak
  }
  
  enableErrorReporting() {
    console.log('Hata raporlama etkinleştirildi');
    // Hata yakalama kodları
  }
  
  disableErrorReporting() {
    console.log('Hata raporlama devre dışı bırakıldı');
    // Hata yakalama kodları kaldırılacak
  }
  
  enableAutoBackup() {
    console.log('Otomatik yedekleme etkinleştirildi');
    // Yedekleme kodları
  }
  
  disableAutoBackup() {
    console.log('Otomatik yedekleme devre dışı bırakıldı');
    // Yedekleme kodları kaldırılacak
  }
}

// CSS Animasyonları
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
  window.settingsManager = new SettingsManager();
  window.dataManagementSettings = new DataManagementSettings();
}); 

// İletişim formu gönderimi
document.addEventListener('DOMContentLoaded', function() {
  const iletisimForm = document.getElementById('iletisimForm');
  const successMessage = document.getElementById('iletisimSuccess');
  
  if (iletisimForm) {
    iletisimForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form verilerini al
      const formData = new FormData(this);
      
      // Burada form verilerini sunucuya gönderebilirsiniz
      // Örnek: fetch('/iletisim-gonder', { method: 'POST', body: formData })
      
      // Başarı mesajını göster
      successMessage.style.display = 'block';
      
      // Formu temizle
      this.reset();
      
      // 3 saniye sonra başarı mesajını gizle
      setTimeout(function() {
        successMessage.style.display = 'none';
      }, 3000);
    });
  }
}); 

// Dosya ekleme butonu işlevi
document.addEventListener('DOMContentLoaded', function() {
  const dosyaEkleBtn = document.getElementById('dosyaEkleBtn');
  const dosyaInput = document.getElementById('dosya');
  const dosyaAdi = document.getElementById('dosyaAdi');
  
  if (dosyaEkleBtn && dosyaInput) {
    dosyaEkleBtn.addEventListener('click', function() {
      dosyaInput.click();
    });
    
    dosyaInput.addEventListener('change', function() {
      if (this.files.length > 0) {
        dosyaAdi.textContent = 'Seçilen dosya: ' + this.files[0].name;
        dosyaAdi.style.color = '#28a745';
      } else {
        dosyaAdi.textContent = '';
      }
    });
  }
}); 

// KULLANICILAR SEKMESİ FONKSİYONLARI
document.addEventListener('DOMContentLoaded', function() {
  // Kullanıcılar sekmesi butonlarına event listener ekle
  const kullaniciButtons = document.querySelectorAll('#kullanıcılar-content .sidebar-menu-btn');
  
  kullaniciButtons.forEach(button => {
    button.addEventListener('click', function() {
      const subsection = this.getAttribute('data-subsection');
      showKullaniciSubsection(subsection);
    });
  });
  
  // Otomatik profil açma işlemini tamamen kaldır
  // showKullaniciSubsection('profil');
});

// Alt sekme gösterme fonksiyonu - GÜNCELLENMİŞ
function showKullaniciSubsection(subsectionId) {
  console.log('Alt sekme gösteriliyor:', subsectionId);
  
  // Sadece kullanıcılar sekmesi içindeki butonları ve içerikleri işle
  const kullanicilarContent = document.getElementById('kullanıcılar-content');
  if (!kullanicilarContent) {
    console.log('Kullanıcılar sekmesi bulunamadı');
    return;
  }
  
  // Tüm butonlardan active class'ını kaldır
  const buttons = kullanicilarContent.querySelectorAll('.sidebar-menu-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // TÜM ALT MENÜ İÇERİKLERİNİ GİZLE
  const allSubsections = document.querySelectorAll('.subsection-content');
  allSubsections.forEach(content => {
    content.classList.remove('active');
    content.classList.add('hidden');
  });
  
  // Seçilen butona active class'ı ekle
  const activeButton = kullanicilarContent.querySelector(`[data-subsection="${subsectionId}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  // Seçilen içeriği göster
  const activeContent = kullanicilarContent.querySelector(`#${subsectionId}-content`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
    activeContent.classList.add('active');
    
    console.log('Alt sekme gösterildi:', subsectionId);
    
    // Profil sekmesi ise kullanıcı bilgilerini yükle
    if (subsectionId === 'profil') {
      loadUserProfile();
    }
    
  } else {
    console.error('Alt sekme içeriği bulunamadı:', subsectionId);
  }
}

// PROFİL GÜNCELLEME FONKSİYONU - GÜNCELLENMİŞ
async function updateProfile(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const messageDiv = document.getElementById('profileMessage');
  
  try {
    // Loading göster
    messageDiv.style.display = 'block';
    messageDiv.className = 'message-box loading';
    messageDiv.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Güncelleniyor...';
    
    // API'ye gönder
    const response = await fetch('/api/settings/update-profile', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (response.ok) {
      // Başarı
      messageDiv.className = 'message-box success';
      messageDiv.innerHTML = '<i class="fa-solid fa-check"></i> ' + (result.message || 'Profil başarıyla güncellendi');
      
      // Form verilerini güncelle
      if (result.user) {
        document.getElementById('firstName').value = result.user.first_name || '';
        document.getElementById('lastName').value = result.user.last_name || '';
        document.getElementById('email').value = result.user.email || '';
        document.getElementById('phone').value = result.user.phone || '';
        document.getElementById('birthDate').value = result.user.birth_date || '';
      }
    } else {
      // Hata
      messageDiv.className = 'message-box error';
      messageDiv.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> ' + (result.detail || 'Güncelleme başarısız');
    }
    
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    messageDiv.className = 'message-box error';
    messageDiv.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> Bağlantı hatası';
  }
  
  // 3 saniye sonra mesajı gizle
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}

// Kullanıcı profil bilgilerini yükle
async function loadUserProfile() {
  // Sadece kullanıcılar sekmesi aktifken çalışsın
  const kullanicilarContent = document.getElementById('kullanıcılar-content');
  const isKullanicilarActive = kullanicilarContent && !kullanicilarContent.classList.contains('hidden');
  
  if (!isKullanicilarActive) {
    console.log('loadUserProfile sadece kullanıcılar sekmesinde çalışabilir');
    return;
  }
  
  try {
    const response = await fetch('/api/settings/api/user-profile');
    const userData = await response.json();
    
    if (response.ok && userData.data) {
      const user = userData.data;
      document.getElementById('firstName').value = user.first_name || '';
      document.getElementById('lastName').value = user.last_name || '';
      document.getElementById('email').value = user.email || '';
      document.getElementById('phone').value = user.phone || '';
      document.getElementById('birthDate').value = user.birth_date || '';
    }
  } catch (error) {
    console.error('Kullanıcı bilgileri yüklenirken hata:', error);
  }
}

// AYARLAR SEKMELERİ İÇİN DÜZELTME - EN SONA EKLE
document.addEventListener('DOMContentLoaded', function() {
  // Ayarlar sekmesi butonlarına event listener ekle
  const ayarlarButtons = document.querySelectorAll('#ayarlar-content .sidebar-menu-btn');
  
  ayarlarButtons.forEach(button => {
    button.addEventListener('click', function() {
      const subsection = this.getAttribute('data-subsection');
      showAyarlarSubsection(subsection);
    });
  });
});

// Ayarlar alt sekme gösterme fonksiyonu
function showAyarlarSubsection(subsectionId) {
  console.log('Ayarlar alt sekme gösteriliyor:', subsectionId);
  
  // Sadece ayarlar sekmesi içindeki butonları ve içerikleri işle
  const ayarlarContent = document.getElementById('ayarlar-content');
  if (!ayarlarContent) {
    console.log('Ayarlar sekmesi bulunamadı');
    return;
  }
  
  // Tüm butonlardan active class'ını kaldır
  const buttons = ayarlarContent.querySelectorAll('.sidebar-menu-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  // TÜM ALT MENÜ İÇERİKLERİNİ GİZLE
  const allSubsections = ayarlarContent.querySelectorAll('.subsection-content');
  allSubsections.forEach(content => {
    content.classList.remove('active');
    content.classList.add('hidden');
  });
  
  // Seçilen butona active class'ı ekle
  const activeButton = ayarlarContent.querySelector(`[data-subsection="${subsectionId}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  // Seçilen içeriği göster
  const activeContent = ayarlarContent.querySelector(`#${subsectionId}-content`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
    activeContent.classList.add('active');
    
    console.log('Ayarlar alt sekme gösterildi:', subsectionId);
  } else {
    console.error('Ayarlar alt sekme içeriği bulunamadı:', subsectionId);
  }
} 