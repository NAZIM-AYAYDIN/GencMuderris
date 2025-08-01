// YENİ SIDEBAR SİSTEMİ - ANA BUTONLAR
document.addEventListener('DOMContentLoaded', function() {
  // Ana butonları seç
  const mainButtons = document.querySelectorAll('.sidebar-main-btn');
  const sidebarContents = document.querySelectorAll('.sidebar-content');
  
  // Her ana butona tıklama olayı ekle
  mainButtons.forEach(button => {
    button.addEventListener('click', function() {
      const section = this.dataset.section;
      
      console.log('Ana sekme değiştiriliyor:', section);
      
      // Tüm butonlardan active class'ını kaldır
      mainButtons.forEach(btn => btn.classList.remove('active'));
      
      // Tıklanan butona active class'ını ekle
      this.classList.add('active');
      
      // Tüm içerikleri gizle
      sidebarContents.forEach(content => {
        content.classList.add('hidden');
        content.style.display = 'none';
      });
      
      // İlgili içeriği göster
      const targetContent = document.getElementById(section + '-content');
      if (targetContent) {
        targetContent.classList.remove('hidden');
        targetContent.style.display = 'block';
        
        // Alt menü butonlarını sıfırla ve sadece ana menüyü göster
        const menuButtons = targetContent.querySelectorAll('.sidebar-menu-btn');
        menuButtons.forEach(btn => btn.classList.remove('active'));
        
        // Tüm alt menü içeriklerini gizle
        const allSubsections = document.querySelectorAll('.subsection-content');
        allSubsections.forEach(sub => {
          sub.classList.add('hidden');
          sub.classList.remove('active');
        });
        
        // Ana menüyü göster
        const menu = targetContent.querySelector('.sidebar-menu');
        if (menu) {
          menu.style.display = 'block';
        }
        
        // Kullanıcılar sekmesi açıldığında profil işlevselliğini başlat
        if (section === 'kullanıcılar') {
          setTimeout(() => {
            if (window.initProfileSection) {
              window.initProfileSection();
            }
          }, 100);
        }
        
        console.log('Sekme değiştirildi:', section);
      }
    });
  });
  
  // Alt menü butonları için (tek event listener)
  const menuButtons = document.querySelectorAll('.sidebar-menu-btn');
  
  // Geri butonları için
  const backButtons = document.querySelectorAll('.back-btn');
  
  backButtons.forEach(button => {
    button.addEventListener('click', function() {
      const parentContent = this.closest('.sidebar-content');
      
      // Ana menüyü göster
      const menu = parentContent.querySelector('.sidebar-menu');
      if (menu) {
        menu.style.display = 'block';
      }
      
      // Tüm alt menü içeriklerini gizle
      const allSubsections = parentContent.querySelectorAll('.subsection-content');
      allSubsections.forEach(sub => sub.style.display = 'none');
    });
  });

  // Sohbetler varsayılan açık
  const sohbetlerBtn = document.querySelector('[data-section="sohbetler"]');
  if (sohbetlerBtn) sohbetlerBtn.click();
  
  // Profil resmi yükleme işlevselliğini başlat - SADECE KULLANICILAR SEKMESİNDE
  // initializeProfileImageUpload(); // Bu satırı kaldır - koşulsuz çalışmasın
  
  // Profil resmi tıklama test fonksiyonu
  console.log('Profil resmi yükleme sistemi başlatıldı');
  
  // Profil sayfası açıldığında JavaScript'i tekrar başlat - SADECE KULLANICILAR SEKMESİNDE
  // Bu kısmı kaldır - profil butonuna event listener ekleme
  // const profilButton = document.querySelector('#kullanıcılar-content [data-subsection="profil"]');
  // if (profilButton) {
  //   profilButton.addEventListener('click', function() {
  //     // Kullanıcılar sekmesinin aktif olup olmadığını kontrol et
  //     const parentSection = document.getElementById("kullanıcılar-content");
  //     const isVisible = parentSection && 
  //                      !parentSection.classList.contains('hidden') && 
  //                      window.getComputedStyle(parentSection).display !== "none";

  //     if (isVisible) {
  //       // Sadece kullanıcılar sekmesi görünürse çalıştır
  //       setTimeout(() => {
  //         console.log('Profil sayfası açıldı, JavaScript yeniden başlatılıyor');
  //         if (window.initializeProfileImageUpload) {
  //           window.initializeProfileImageUpload();
  //         }
  //       }, 100);
  //     } else {
  //       console.log("Profil sadece kullanıcılar sekmesindeyken açılır.");
  //     }
  //   });
  // }
  
  // Alt menü butonları için event listener'ları güncelle (çakışmayı önlemek için)
  // Sadece kullanıcılar sekmesindeki butonları seç
  const kullanicilarMenuButtons = document.querySelectorAll('#kullanıcılar-content .sidebar-menu-btn');
  
  kullanicilarMenuButtons.forEach(button => {
    // Önceki event listener'ları temizle
    button.removeEventListener('click', button.clickHandler);
    
    // Yeni event listener ekle
    button.clickHandler = function() {
      const subsection = this.dataset.subsection;
      const parentContent = this.closest('.sidebar-content');
      
      console.log('Kullanıcılar sekmesi butonu tıklandı:', subsection);
      
      // Ana menüyü gizle
      const menu = parentContent.querySelector('.sidebar-menu');
      if (menu) {
        menu.style.display = 'none';
      }
      
      // TÜM ALT MENÜ İÇERİKLERİNİ GİZLE - KAPSAMLI GİZLEME
      const allSubsections = document.querySelectorAll('.subsection-content');
      allSubsections.forEach(sub => {
        sub.style.display = 'none';
        sub.classList.add('hidden');
        sub.classList.remove('active');
      });
      
      // İlgili alt menü içeriğini göster
      const targetSubsection = parentContent.querySelector('#' + subsection + '-content');
      if (targetSubsection) {
        targetSubsection.style.display = 'block';
        targetSubsection.classList.remove('hidden');
        targetSubsection.classList.add('active');
        console.log('Kullanıcılar alt menü gösterildi:', subsection);
        
        // Profil sayfası açıldığında JavaScript'i başlat - SADECE KULLANICILAR SEKMESİNDE
        if (subsection === 'profil') {
          // Kullanıcılar sekmesinin aktif olup olmadığını kontrol et
          const isVisible = parentContent.id === 'kullanıcılar-content' && 
                           !parentContent.classList.contains('hidden') && 
                           window.getComputedStyle(parentContent).display !== "none";
          
          if (isVisible) {
            setTimeout(() => {
              console.log('Profil sayfası açıldı, JavaScript yeniden başlatılıyor');
              if (window.initializeProfileImageUpload) {
                window.initializeProfileImageUpload();
              }
            }, 200);
          } else {
            console.log("Profil sadece kullanıcılar sekmesindeyken açılır.");
          }
        }
               
      } else {
        console.error('Kullanıcılar alt menü bulunamadı:', subsection);
      }
    };
    
    button.addEventListener('click', button.clickHandler);
  });
  
  // YENİ SOHBET BUTONU FONKSİYONALİTESİ
  const newChatBtn = document.querySelector('.new-chat-btn');
  if (newChatBtn) {
    newChatBtn.addEventListener('click', function() {
      console.log('Yeni sohbet butonu tıklandı');
      
      // Loading animasyonu
      this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
      this.disabled = true;
      
      setTimeout(() => {
        // Chat mesajlarını temizle
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
          chatMessages.innerHTML = '';
        }
        
        // Mesaj input'unu temizle ve focus
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
          messageInput.value = '';
          messageInput.focus();
        }
        
        // Chat header'ı güncelle
        const chatHeader = document.querySelector('.chat-header h1');
        if (chatHeader) {
          chatHeader.textContent = 'Nasıl yardımcı olabilirim?';
        }
        
        // Butonu normale döndür
        this.innerHTML = '<i class="fa-solid fa-plus"></i>';
        this.disabled = false;
        
        // Yeni sohbet listesine ekle
        addNewChatToList();
        
        console.log('Yeni sohbet başlatıldı');
      }, 500);
    });
  }

  // SOHBETLERİ ARA KUTUSU FONKSİYONALİTESİ
  const searchChatsInput = document.getElementById('searchChats');
  if (searchChatsInput) {
    let searchTimeout;
    
    searchChatsInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      
      // Debounce - performans için
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        console.log('Arama terimi:', searchTerm);
        
        // Chat listesini filtrele
        const chatItems = document.querySelectorAll('.chat-item');
        let visibleCount = 0;
        
        chatItems.forEach(item => {
          const chatTitle = item.querySelector('.chat-title')?.textContent.toLowerCase() || '';
          const chatPreview = item.querySelector('.chat-preview')?.textContent.toLowerCase() || '';
          
          if (chatTitle.includes(searchTerm) || chatPreview.includes(searchTerm)) {
            item.style.display = 'flex';
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        });
        
        // Arama sonuçlarını göster
        showSearchResults(visibleCount, searchTerm);
        console.log(`${visibleCount} sohbet bulundu`);
      }, 300);
    });
    
    // Arama kutusuna focus olduğunda
    searchChatsInput.addEventListener('focus', function() {
      this.parentElement.classList.add('search-focused');
      console.log('Arama kutusu aktif');
    });
    
    // Arama kutusundan çıkıldığında
    searchChatsInput.addEventListener('blur', function() {
      this.parentElement.classList.remove('search-focused');
      console.log('Arama kutusu pasif');
    });
  }

  // MESAJ GÖNDERME FONKSİYONALİTESİ
  const chatForm = document.getElementById('chatForm');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.querySelector('.send-btn');
  
  if (chatForm && messageInput && sendBtn) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      sendMessage();
    });
    
    // Enter tuşu ile gönderme
    messageInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Input değiştiğinde gönder butonunu aktif/pasif yap
    messageInput.addEventListener('input', function() {
      const hasText = this.value.trim().length > 0;
      sendBtn.disabled = !hasText;
      sendBtn.classList.toggle('disabled', !hasText);
    });
  }

  // MİKROFON FONKSİYONALİTESİ
  const micBtn = document.querySelector('.mic-btn');
  if (micBtn) {
    micBtn.addEventListener('click', function() {
      const mic = this;
      mic.classList.add('listening');
      mic.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
      mic.disabled = true;
      
      // Simüle edilmiş ses kaydı
      setTimeout(() => {
        mic.classList.remove('listening');
        mic.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        mic.disabled = false;
        
        // Simüle edilmiş mesaj
        const simulatedMessage = "Merhaba, nasılsınız?";
        messageInput.value = simulatedMessage;
        messageInput.dispatchEvent(new Event('input'));
      }, 3000);
    });
  }

  // DOSYA EKLEME FONKSİYONALİTESİ
  const attachBtn = document.querySelector('.attach-btn');
  if (attachBtn) {
    attachBtn.addEventListener('click', function() {
      // Dosya seçme dialog'u aç
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*,.pdf,.doc,.docx,.txt';
      fileInput.style.display = 'none';
      
      fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          console.log('Dosya seçildi:', file.name);
          // Dosya yükleme simülasyonu
          showFileUploadProgress(file);
        }
      });
      
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    });
  }

  // Sayfa yüklendiğinde mock sohbet verilerini yükle
  loadMockChats();

  // Sayfa yüklendiğinde chat listesini kontrol et
  const chatList = document.getElementById('chatList');
  const sidebarContent = document.querySelector('.sidebar-content');
  
  if (chatList && sidebarContent) {
    console.log('Chat list height:', chatList.scrollHeight);
    console.log('Chat list client height:', chatList.clientHeight);
    console.log('Sidebar content height:', sidebarContent.scrollHeight);
    console.log('Sidebar content client height:', sidebarContent.clientHeight);
    
    // Eğer içerik yüksekliği container'dan küçükse overflow'u gizle
    if (chatList.scrollHeight <= chatList.clientHeight) {
      chatList.style.overflowY = 'hidden';
    } else {
      chatList.style.overflowY = 'auto';
    }
  }
});

// EVENT LISTENER GÜVENLİĞİ - İNLINE ONCLICK YERİNE EVENT LISTENER KULLANIMI
document.addEventListener('DOMContentLoaded', function() {
  // Login butonu için event listener
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = '/login';
    });
  }
  
  // Mobile menu toggle için event listener
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleSidebar);
  }
  
  // User dropdown için event listener
  const userBtn = document.getElementById('userBtn');
  const userDropdown = document.getElementById('userDropdown');
  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', () => {
      userDropdown.classList.toggle('show');
    });
  }
  
  // Logout butonu için event listener
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        window.location.href = '/logout';
      }
    });
  }
  
  // Modal close butonları için event listener
  const policyModalClose = document.getElementById('policyModalClose');
  if (policyModalClose) {
    policyModalClose.addEventListener('click', () => {
      const policyModal = document.getElementById('policyModal');
      if (policyModal) {
        policyModal.style.display = 'none';
      }
    });
  }
  
  const termsModalClose = document.getElementById('termsModalClose');
  if (termsModalClose) {
    termsModalClose.addEventListener('click', () => {
      const termsModal = document.getElementById('termsModal');
      if (termsModal) {
        termsModal.style.display = 'none';
      }
    });
  }
  
  // PDF download butonları için event listener
  const pdfDownloadBtn = document.getElementById('pdfDownloadBtn');
  if (pdfDownloadBtn) {
    pdfDownloadBtn.addEventListener('click', () => {
      // PDF indirme işlemi
      console.log('PDF indirme başlatıldı');
      showNotification('PDF indirme başlatıldı', 'info');
    });
  }
  
  const termsPdfDownloadBtn = document.getElementById('termsPdfDownloadBtn');
  if (termsPdfDownloadBtn) {
    termsPdfDownloadBtn.addEventListener('click', () => {
      // Terms PDF indirme işlemi
      console.log('Terms PDF indirme başlatıldı');
      showNotification('Terms PDF indirme başlatıldı', 'info');
    });
  }
});

// LAZY LOADING SİSTEMİ
// Script yükleme fonksiyonu
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// CSS yükleme fonksiyonu
function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

// Settings Manager'ı gerektiğinde yükle
async function loadSettingsManager() {
  if (!window.settingsManager) {
    try {
      await loadScript('/static/js/settings-manager.js');
      console.log('Settings Manager yüklendi');
    } catch (error) {
      console.error('Settings Manager yüklenirken hata:', error);
    }
  }
}

// Tema dosyasını dinamik olarak yükle
async function loadThemeCSS(themeName) {
  try {
    // Eski tema dosyalarını kaldır
    document.querySelectorAll('link[href*="/themes/"]').forEach(link => {
      link.remove();
    });
    
    // Yeni tema dosyasını yükle
    await loadCSS(`/static/css/themes/${themeName}.css`);
    console.log(`${themeName} teması yüklendi`);
  } catch (error) {
    console.error('Tema yüklenirken hata:', error);
  }
}

// Performans optimizasyonu için script yükleme
async function loadPerformanceScripts() {
  const scripts = [
    '/static/js/policy-modal.js',
    '/static/js/terms-modal.js'
  ];
  
  for (const script of scripts) {
    try {
      await loadScript(script);
    } catch (error) {
      console.error(`${script} yüklenirken hata:`, error);
    }
  }
}

// YARDIMCI FONKSİYONLAR

// Mesaj gönderme fonksiyonu
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const text = messageInput.value.trim();
  
  if (text !== '') {
    const container = document.getElementById('chatMessages');
    const msg = document.createElement('div');
    msg.className = 'chat-message user';
    msg.innerHTML = `
      <div class="message-content">
        <p>${text}</p>
        <div class="message-tools">
          <i class="fa-solid fa-volume-up" title="Sesli oku"></i>
          <i class="fa-solid fa-copy" title="Kopyala"></i>
          <span class="msg-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>
    `;
    container.appendChild(msg);
    messageInput.value = '';
    messageInput.dispatchEvent(new Event('input')); // Gönder butonunu güncelle
    scrollToBottom();
    
    // Simüle edilmiş AI yanıtı
    setTimeout(() => {
      addAIResponse(text);
    }, 1000);
  }
}

// AI yanıtı ekleme
function addAIResponse(userMessage) {
  const container = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'chat-message ai';
  
  // Loading animasyonu
  msg.innerHTML = `
    <div class="message-content">
      <div class="ai-typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  container.appendChild(msg);
  scrollToBottom();
  
  // Simüle edilmiş yanıt
  setTimeout(() => {
    const responses = [
      "Merhaba! Size nasıl yardımcı olabilirim?",
      "Bu konuda size yardımcı olabilirim. Daha detaylı bilgi verebilir misiniz?",
      "Anlıyorum. Bu konuda şunları önerebilirim...",
      "Teşekkürler! Başka bir sorunuz var mı?"
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    msg.innerHTML = `
      <div class="message-content">
        <p>${randomResponse}</p>
        <div class="message-tools">
          <i class="fa-solid fa-volume-up" title="Sesli oku"></i>
          <i class="fa-solid fa-copy" title="Kopyala"></i>
          <i class="fa-solid fa-thumbs-up" title="Beğen"></i>
          <i class="fa-solid fa-thumbs-down" title="Beğenme"></i>
          <span class="msg-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>
    `;
    scrollToBottom();
  }, 2000);
}

// Mock sohbet verilerini yükle
function loadMockChats() {
  const chatList = document.getElementById('chatList');
  if (!chatList) return;
  
  const mockChats = [
    {
      id: 1,
      title: "Matematik Dersi",
      preview: "Son derste işlediğimiz konular hakkında...",
      time: "14:30",
      unread: 2
    },
    {
      id: 2,
      title: "Fen Bilgisi Projesi",
      preview: "Proje sunumu için hazırlık yapıyoruz...",
      time: "Dün",
      unread: 0
    },
    {
      id: 3,
      title: "Türkçe Ödevi",
      preview: "Kitap özeti hazırlama konusunda...",
      time: "2 gün önce",
      unread: 1
    },
    {
      id: 4,
      title: "İngilizce Konuşma",
      preview: "Günlük konuşma pratiği yapalım...",
      time: "1 hafta önce",
      unread: 0
    },
    {
      id: 5,
      title: "Din Kültürü",
      preview: "Namaz konusunda sorularım var...",
      time: "3 gün önce",
      unread: 0
    },
    {
      id: 6,
      title: "Sosyal Bilgiler",
      preview: "Tarih konularını tekrar edelim...",
      time: "5 gün önce",
      unread: 0
    }
  ];
  
  chatList.innerHTML = '';
  mockChats.forEach(chat => {
    const chatItem = createChatItem(chat);
    chatList.appendChild(chatItem);
  });
}

// Sohbet öğesi oluşturma
function createChatItem(chat) {
  const item = document.createElement('div');
  item.className = 'chat-item';
  item.dataset.chatId = chat.id;
  
  // Tooltip için tarih formatını hazırla
  const tooltipText = formatTooltipDate(chat.time);
  item.setAttribute('data-tooltip', tooltipText);
  
  item.innerHTML = `
    <div class="chat-info">
      <div class="chat-title">${chat.title}</div>
      <div class="chat-preview">${chat.preview}</div>
    </div>
    <div class="chat-menu">
      <button class="chat-menu-btn" title="Sohbet menüsü">
        <span>•••</span>
      </button>
      <div class="chat-dropdown-menu">
        <button class="chat-menu-item" data-action="rename">Yeniden Adlandır</button>
        <button class="chat-menu-item" data-action="share">Paylaş</button>
        <button class="chat-menu-item" data-action="export">Dışa Aktar</button>
        <button class="chat-menu-item" data-action="archive">Arşivle</button>
        <button class="chat-menu-item" data-action="delete">Sil</button>
      </div>
    </div>
  `;
  
  // Tıklama olayı
  item.addEventListener('click', function(e) {
    // Menü butonuna tıklanmadıysa sohbeti seç
    if (!e.target.closest('.chat-menu')) {
      selectChat(chat.id);
    }
  });
  
  // Menü butonuna tıklama - DÜZELTİLMİŞ
  const menuBtn = item.querySelector('.chat-menu-btn');
  const dropdownMenu = item.querySelector('.chat-dropdown-menu');
  
  menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // Diğer açık menüleri kapat
    document.querySelectorAll('.chat-dropdown-menu').forEach(menu => {
      if (menu !== dropdownMenu) {
        menu.classList.remove('show');
        menu.classList.remove('menu-up'); // Yukarı açılan menü sınıfını kaldır
      }
    });
    
    // Bu menüyü aç/kapat
    dropdownMenu.classList.toggle('show');
    
    // Menü açıldıysa konumunu kontrol et
    if (dropdownMenu.classList.contains('show')) {
      positionMenu(dropdownMenu, item);
    }
  });

  // Menü konumlandırma fonksiyonu - YENİ
  function positionMenu(dropdownMenu, chatItem) {
    const menuRect = dropdownMenu.getBoundingClientRect();
    const chatRect = chatItem.getBoundingClientRect();
    const containerRect = chatItem.closest('.chat-list').getBoundingClientRect();
    
    // Menünün alt kısmının container'ın alt sınırını aşıp aşmadığını kontrol et
    const menuBottom = chatRect.bottom + dropdownMenu.offsetHeight;
    const containerBottom = containerRect.bottom;
    
    if (menuBottom > containerBottom) {
      // Menü aşağıya sığmıyorsa yukarıya aç
      dropdownMenu.classList.add('menu-up');
      dropdownMenu.classList.remove('menu-down');
    } else {
      // Menü aşağıya sığıyorsa aşağıya aç
      dropdownMenu.classList.add('menu-down');
      dropdownMenu.classList.remove('menu-up');
    }
  }
  
  // Menü öğelerine tıklama
  const menuItems = item.querySelectorAll('.chat-menu-item');
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function(e) {
      e.stopPropagation();
      const action = this.dataset.action;
      handleChatMenuAction(action, chat.id);
      dropdownMenu.classList.remove('show');
    });
  });
  
  return item;
}

// Tooltip tarih formatını hazırlama
function formatTooltipDate(timeString) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  if (timeString === 'Şimdi') {
    return `Şimdi - ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  } else if (timeString === 'Dün') {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return `Dün - ${yesterday.toLocaleDateString('tr-TR')}`;
  } else if (timeString.includes('gün önce')) {
    const days = parseInt(timeString);
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - days);
    return `${pastDate.toLocaleDateString('tr-TR')} - ${days} gün önce`;
  } else if (timeString.includes('hafta önce')) {
    const weeks = parseInt(timeString);
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - (weeks * 7));
    return `${pastDate.toLocaleDateString('tr-TR')} - ${weeks} hafta önce`;
  } else {
    // Saat formatı varsa (14:30 gibi)
    if (timeString.includes(':')) {
      return `Bugün - ${timeString}`;
    }
    return timeString;
  }
}

// Menü aksiyonlarını işleme
function handleChatMenuAction(action, chatId) {
  console.log(`Chat ${chatId} için ${action} aksiyonu çalıştırıldı`);
  
  switch(action) {
    case 'rename':
      renameChat(chatId);
      break;
    case 'share':
      shareChat(chatId);
      break;
    case 'export':
      exportChat(chatId);
      break;
    case 'archive':
      archiveChat(chatId);
      break;
    case 'delete':
      deleteChat(chatId);
      break;
  }
}

// Sohbet yeniden adlandırma
function renameChat(chatId) {
  const chatItem = document.querySelector(`[data-chat-id="${chatId}"]`);
  const chatTitle = chatItem.querySelector('.chat-title');
  const currentTitle = chatTitle.textContent;
  
  const newTitle = prompt('Yeni sohbet adını girin:', currentTitle);
  if (newTitle && newTitle.trim() !== '') {
    chatTitle.textContent = newTitle.trim();
    console.log(`Sohbet ${chatId} yeniden adlandırıldı: ${newTitle}`);
  }
}

// Sohbet paylaşma
function shareChat(chatId) {
  console.log(`Sohbet ${chatId} paylaşım menüsü açıldı`);
  // Paylaşım fonksiyonalitesi burada implement edilecek
  alert('Paylaşım özelliği yakında eklenecek!');
}

// Sohbet dışa aktarma
function exportChat(chatId) {
  console.log(`Sohbet ${chatId} dışa aktarılıyor`);
  // Dışa aktarma fonksiyonalitesi burada implement edilecek
  alert('Dışa aktarma özelliği yakında eklenecek!');
}

// Sohbet arşivleme
function archiveChat(chatId) {
  const chatItem = document.querySelector(`[data-chat-id="${chatId}"]`);
  if (confirm('Bu sohbeti arşivlemek istediğinizden emin misiniz?')) {
    chatItem.style.opacity = '0.5';
    chatItem.style.fontStyle = 'italic';
    console.log(`Sohbet ${chatId} arşivlendi`);
  }
}

// Sohbet silme
function deleteChat(chatId) {
  const chatItem = document.querySelector(`[data-chat-id="${chatId}"]`);
  if (confirm('Bu sohbeti silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
    chatItem.remove();
    console.log(`Sohbet ${chatId} silindi`);
  }
}

// Sayfa dışına tıklandığında menüleri kapat
document.addEventListener('click', function(e) {
  if (!e.target.closest('.chat-menu')) {
    document.querySelectorAll('.chat-dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
  }
});

// Sohbet seçme
function selectChat(chatId) {
  // Tüm sohbetleri pasif yap
  document.querySelectorAll('.chat-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Seçilen sohbeti aktif yap
  const selectedItem = document.querySelector(`[data-chat-id="${chatId}"]`);
  if (selectedItem) {
    selectedItem.classList.add('active');
  }
  
  // Chat header'ı güncelle
  const chatTitle = selectedItem?.querySelector('.chat-title')?.textContent;
  const chatHeader = document.querySelector('.chat-header h1');
  if (chatHeader && chatTitle) {
    chatHeader.textContent = chatTitle;
  }
  
  console.log('Sohbet seçildi:', chatId);
}

// Yeni sohbet listesine ekleme
function addNewChatToList() {
  const chatList = document.getElementById('chatList');
  if (!chatList) return;
  
  const newChat = {
    id: Date.now(),
    title: "Yeni Sohbet",
    preview: "Henüz mesaj yok",
    time: "Şimdi",
    unread: 0
  };
  
  const chatItem = createChatItem(newChat);
  chatList.insertBefore(chatItem, chatList.firstChild);
  selectChat(newChat.id);
}

// Arama sonuçlarını gösterme
function showSearchResults(count, term) {
  const chatList = document.getElementById('chatList');
  if (!chatList) return;
  
  // Arama sonucu mesajını göster/gizle
  let resultMessage = chatList.querySelector('.search-result-message');
  
  if (term && count === 0) {
    if (!resultMessage) {
      resultMessage = document.createElement('div');
      resultMessage.className = 'search-result-message';
      chatList.appendChild(resultMessage);
    }
    resultMessage.innerHTML = `<p>"${term}" için sonuç bulunamadı</p>`;
  } else if (resultMessage) {
    resultMessage.remove();
  }
}

// Dosya yükleme progress'i
function showFileUploadProgress(file) {
  const container = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'chat-message user file-upload';
  
  msg.innerHTML = `
    <div class="message-content">
      <div class="file-info">
        <i class="fa-solid fa-file"></i>
        <span>${file.name}</span>
      </div>
      <div class="upload-progress">
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <span class="progress-text">Yükleniyor...</span>
      </div>
    </div>
  `;
  
  container.appendChild(msg);
  scrollToBottom();
  
  // Progress animasyonu
  const progressFill = msg.querySelector('.progress-fill');
  const progressText = msg.querySelector('.progress-text');
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      progressText.textContent = 'Tamamlandı';
      
      setTimeout(() => {
        msg.classList.add('upload-complete');
      }, 500);
    }
    
    progressFill.style.width = progress + '%';
    progressText.textContent = `Yükleniyor... ${Math.round(progress)}%`;
  }, 200);
}

// Kullanıcı menüsü toggle
function toggleUserMenu() {
  const menu = document.getElementById('userMenu');
  menu.classList.toggle('show');
}

// Scroll en alta
function scrollToBottom() {
  const messages = document.getElementById('chatMessages');
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
}

// Çıkış
function logout() {
  window.location.href = '/login';
}

// Sidebar toggle fonksiyonu
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('active');
  }
}

// Profil resmi değiştirme fonksiyonalitesi
document.addEventListener('DOMContentLoaded', function() {
  // initializeProfileImageUpload(); // Bu satırı kaldır - koşulsuz çalışmasın
});

// Global fonksiyon - HTML'den çağrılabilir
window.triggerFileInput = function() {
  console.log('triggerFileInput fonksiyonu çağrıldı');
  
  // Sadece kullanıcılar sekmesi aktifken çalışsın
  const kullanicilarContent = document.getElementById('kullanıcılar-content');
  const isKullanicilarActive = kullanicilarContent && 
                               !kullanicilarContent.classList.contains('hidden') && 
                               window.getComputedStyle(kullanicilarContent).display !== "none";
  
  if (!isKullanicilarActive) {
    console.log('triggerFileInput sadece kullanıcılar sekmesinde çalışabilir');
    return;
  }
  
  // Önce doğrudan input'u bulmayı dene
  let profileImageInput = document.getElementById('profileImageInput');
  
  if (profileImageInput) {
    console.log('profileImageInput bulundu, tıklama simüle ediliyor');
    profileImageInput.click();
    return;
  }
  
  console.log('profileImageInput bulunamadı, yeniden başlatılıyor');
  
  // Element bulunamazsa JavaScript'i yeniden başlat
  setTimeout(() => {
    if (window.initializeProfileImageUpload) {
      window.initializeProfileImageUpload();
      
      // Tekrar dene
      setTimeout(() => {
        profileImageInput = document.getElementById('profileImageInput');
        if (profileImageInput) {
          console.log('profileImageInput bulundu (retry), tıklama simüle ediliyor');
          profileImageInput.click();
        } else {
          console.error('profileImageInput hala bulunamadı');
        }
      }, 200);
    } else {
      console.error('initializeProfileImageUpload fonksiyonu bulunamadı');
    }
  }, 100);
};

window.initializeProfileImageUpload = function() {
  // Sadece kullanıcılar sekmesi aktifken çalışsın
  const kullanicilarContent = document.getElementById('kullanıcılar-content');
  const isKullanicilarActive = kullanicilarContent && 
                               !kullanicilarContent.classList.contains('hidden') && 
                               window.getComputedStyle(kullanicilarContent).display !== "none";
  
  if (!isKullanicilarActive) {
    console.log('initializeProfileImageUpload sadece kullanıcılar sekmesinde çalışabilir');
    return;
  }
  
  const profileImageContainer = document.querySelector('.sidebar-profile-photo');
  const profileImageInput = document.getElementById('profileImageInput');

  console.log('initializeProfileImageUpload başlatıldı');
  console.log('profileImageContainer:', profileImageContainer);
  console.log('profileImageInput:', profileImageInput);

  if (profileImageContainer && profileImageInput) {
    // KESİN ÇÖZÜM: Resim boyutlarını sabitle
    profileImageContainer.style.width = '125px';
    profileImageContainer.style.height = '125px';
    profileImageContainer.style.minWidth = '125px';
    profileImageContainer.style.minHeight = '125px';
    profileImageContainer.style.maxWidth = '125px';
    profileImageContainer.style.maxHeight = '125px';
    profileImageContainer.style.objectFit = 'cover';
    profileImageContainer.style.display = 'block';
    profileImageContainer.style.borderRadius = '12px'; /* 50% yerine 12px */
    
    // CSS sınıfını ekle
    profileImageContainer.classList.add('sidebar-profile-img-fix');
    
    // Container'ı da yuvarlak yap
    if (profileImageContainer) {
      profileImageContainer.style.borderRadius = '12px'; /* 50% yerine 12px */
      profileImageContainer.style.overflow = 'hidden';
    }
    
    // Dosya seçildiğinde önizleme göster
    profileImageInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        handleProfileImageUpload(file);
      }
    });

    // Drag and drop desteği - sabit boyut korunur
    profileImageContainer.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.style.borderColor = 'var(--accent-color)';
    });

    profileImageContainer.addEventListener('dragleave', function(e) {
      e.preventDefault();
      this.style.borderColor = '#343541';
    });

    profileImageContainer.addEventListener('drop', function(e) {
      e.preventDefault();
      this.style.borderColor = '#343541';
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleProfileImageUpload(files[0]);
      }
    });
  }
};

window.handleProfileImageUpload = function(file) {
  // Dosya türü kontrolü
  if (!file.type.startsWith('image/')) {
    showNotification('Lütfen geçerli bir resim dosyası seçin.', 'error');
    return;
  }

  // Dosya boyutu kontrolü (5MB)
  if (file.size > 5 * 1024 * 1024) {
    showNotification('Resim dosyası 5MB\'dan küçük olmalıdır.', 'error');
    return;
  }

  // Önizleme göster
  const reader = new FileReader();
  reader.onload = function(e) {
    const profileImageContainer = document.querySelector('.sidebar-profile-photo');
    
    if (profileImageContainer) {
      profileImageContainer.src = e.target.result;
      
      // KESİN ÇÖZÜM: Resim yüklendiğinde boyutları sabitle
      setTimeout(() => {
        // Profil resmi container boyutlarını sabitle
        if (profileImageContainer) {
          profileImageContainer.style.width = '125px';
          profileImageContainer.style.height = '125px';
          profileImageContainer.style.minWidth = '125px';
          profileImageContainer.style.minHeight = '125px';
          profileImageContainer.style.maxWidth = '125px';
          profileImageContainer.style.maxHeight = '125px';
          profileImageContainer.style.objectFit = 'cover';
          profileImageContainer.style.display = 'block';
          profileImageContainer.style.borderRadius = '12px'; /* 50% yerine 12px */
          
          // CSS sınıfını ekle
          profileImageContainer.classList.add('sidebar-profile-img-fix');
        }
        
        // Container'ı da yuvarlak yap
        if (profileImageContainer) {
          profileImageContainer.style.borderRadius = '12px'; /* 50% yerine 12px */
          profileImageContainer.style.overflow = 'hidden';
        }
      }, 100);
      
      showNotification('Profil resmi güncellendi!');
  