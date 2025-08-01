// settings.js (Güncellenmiş Tam Dosya)

/* Modal Aç/Kapat */
const settingsModal = document.getElementById('settingsModal');
const openSettingsBtn = document.getElementById('settingsBtn');
const closeSettingsBtn = document.querySelector('.close-settings');

if (openSettingsBtn) {
  openSettingsBtn.onclick = () => {
    const section = document.querySelector('[data-section="kullanıcılar"]');
    if (section && section.classList.contains('active')) {
      settingsModal.style.display = 'flex';
    } else {
      console.log("Ayarlar sadece Kullanıcılar sekmesinde açılabilir.");
    }
  };
}

if (closeSettingsBtn) {
  closeSettingsBtn.onclick = () => {
    settingsModal.style.display = 'none';
  };
}

if (settingsModal) {
  settingsModal.onclick = (e) => {
    if (e.target === settingsModal) settingsModal.style.display = 'none';
  };
}

/* Ana Sekme Geçişleri */
document.querySelectorAll('.settings-tab').forEach(tab => {
  tab.onclick = function () {
    document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    const mainTab = this.dataset.mainTab;
    document.querySelectorAll('.sub-tabs').forEach(ul => ul.classList.add('hidden'));
    document.getElementById(mainTab + 'Tabs').classList.remove('hidden');

    // İlk alt sekmeyi aktif et
    const firstSubTab = document.querySelector(`#${mainTab}Tabs .sub-tab`);
    if (firstSubTab) firstSubTab.click();
  };
});

/* Alt Sekme Geçişleri */
document.querySelectorAll('.sub-tab').forEach(tab => {
  tab.onclick = function () {
    const parentList = this.parentElement;
    parentList.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');

    const selectedId = this.dataset.subTab;
    document.querySelectorAll('.settings-panel').forEach(panel => panel.classList.remove('active'));
    const panel = document.getElementById(selectedId);
    if (panel) panel.classList.add('active');
  };
});

/* Ticari Elektronik İleti Onayı Checkbox Kontrolü */
const ticariCheckbox = document.getElementById('ticariOnay');
if (ticariCheckbox) {
  ticariCheckbox.addEventListener('change', () => {
    const durum = ticariCheckbox.checked;
    console.log("Ticari Elektronik İleti Onayı:", durum);
  });
}

/* Tüm label'lara UX desteği */
document.querySelectorAll(".consent-block label").forEach(label => {
  label.addEventListener("click", e => {
    const input = label.querySelector("input[type='checkbox']");
    if (input && !input.disabled) {
      input.checked = !input.checked;
      input.dispatchEvent(new Event("change"));
    }
  });
});

/* TEMA DEĞİŞTİRME FONKSİYONLARI */
document.addEventListener('DOMContentLoaded', function() {
  // Tema seçimi için event listener
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    // Kaydedilmiş temayı yükle
    const savedTheme = localStorage.getItem('selectedTheme') || 'koyu';
    themeSelect.value = savedTheme;
    
    // Temayı uygula
    applyTheme(savedTheme);
    
    // Tema değişikliği event listener'ı
    themeSelect.addEventListener('change', function() {
      const selectedTheme = this.value;
      applyTheme(selectedTheme);
      localStorage.setItem('selectedTheme', selectedTheme);
      console.log('Tema değiştirildi:', selectedTheme);
    });
  }
});

// Tema uygulama fonksiyonu
function applyTheme(themeName) {
  const html = document.documentElement;
  
  // Önce tüm tema class'larını kaldır
  html.removeAttribute('data-theme');
  
  // Yeni temayı uygula
  switch(themeName) {
    case 'acik':
      html.setAttribute('data-theme', 'acik');
      break;
    case 'pembe':
      html.setAttribute('data-theme', 'pembe');
      break;
    case 'safak':
      html.setAttribute('data-theme', 'safak');
      break;
    case 'gokyuzu':
      html.setAttribute('data-theme', 'gokyuzu');
      break;
    case 'mavi':
      html.setAttribute('data-theme', 'mavi'); // Artık ayrı mavi tema
      break;
    default:
      html.setAttribute('data-theme', 'dark'); // Varsayılan koyu tema
  }
  
  console.log(`Tema değiştirildi: ${themeName}`);
}

// Sayfa yüklendiğinde kaydedilmiş temayı uygula
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'koyu';
  applyTheme(savedTheme);
});

/* FORM-ROW ELEMENTLERİNE ÇİZGİ VE HOVER EFEKTİ EKLE */
document.addEventListener('DOMContentLoaded', function() {
  const formRows = document.querySelectorAll('#genel .form-row');
  
  formRows.forEach(row => {
    row.style.background = '';
    row.style.borderBottom = '';
    row.style.padding = '';

    row.style.borderBottom = '1px solid #404040';
    row.style.padding = '16px 0';
    row.style.margin = '0';
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.transition = 'all 0.2s ease';

    row.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(255, 255, 255, 0.05)';
      this.style.paddingLeft = '8px';
      this.style.paddingRight = '8px';
      this.style.borderRadius = '8px';
      this.style.marginLeft = '-8px';
      this.style.marginRight = '-8px';
      this.style.borderBottomColor = 'rgb(96, 96, 96)';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.background = '';
      this.style.paddingLeft = '';
      this.style.paddingRight = '';
      this.style.borderRadius = '';
      this.style.marginLeft = '';
      this.style.marginRight = '';
      this.style.borderBottomColor = '';
    });
  });
}); 