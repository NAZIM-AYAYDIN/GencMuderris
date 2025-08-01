// TEMİZ KULLANICILAR JAVASCRIPT - ÇAKIŞMA YOK

console.log('=== TEMİZ KULLANICILAR JAVASCRIPT YÜKLENDİ ===');

// Profil resmi yükleme fonksiyonları - DÜZELTİLMİŞ
function triggerFileInput(container) {
  console.log('triggerFileInput çağrıldı');
  const input = container.querySelector('input[type="file"]');
  if (input) {
    input.click();
  } else {
    console.error('File input bulunamadı');
  }
}

function handleProfileImage(input) {
  console.log('handleProfileImage çağrıldı');
  const file = input.files[0];
  if (!file) return;

  // Dosya türü kontrolü
  if (!file.type.startsWith('image/')) {
    alert('Lütfen geçerli bir resim dosyası seçin!');
    return;
  }

  // Dosya boyutu kontrolü (5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Resim dosyası 5MB\'dan küçük olmalıdır!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const container = input.parentElement;
    const profileIcon = container.querySelector('.profile-icon');
    const existingImg = container.querySelector('img');
    
    // Eğer img elementi yoksa oluştur
    let img = existingImg;
    if (!img) {
      img = document.createElement('img');
      img.className = 'profile-img';
      img.alt = 'Profil Resmi';
      container.appendChild(img);
    }
    
    // Resmi yükle
    img.src = e.target.result;
    img.style.display = 'block';
    
    // İkonu gizle
    if (profileIcon) {
      profileIcon.style.display = 'none';
    }
    
    // Container'a has-image class'ı ekle
    container.classList.add('has-image');
    
    console.log('Profil resmi güncellendi');
  };
  reader.readAsDataURL(file);
}

// Müderris başlıklarını güncelleme fonksiyonu
function updateMuderrisTitle(muderrisNumber, ad, soyad) {
  const titleElement = document.getElementById(`muderris${muderrisNumber}-title`);
  const headerTitleElement = document.getElementById(`muderris${muderrisNumber}-header-title`);
  
  if (titleElement) {
    if (ad && soyad) {
      titleElement.textContent = `${ad} ${soyad}`;
    } else {
      titleElement.textContent = 'Müderris Ekle';
    }
  }
  
  if (headerTitleElement) {
    if (ad && soyad) {
      headerTitleElement.textContent = `${ad} ${soyad}`;
    } else {
      headerTitleElement.textContent = 'Müderris Ekle';
    }
  }
}

// Şifre göster/gizle - KİLİT SİMGESİ İLE
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.parentElement.querySelector('.password-toggle i');
  
  if (input.type === 'password') {
    input.type = 'text';
    button.className = 'fa-solid fa-lock-open'; // Kilit açık
  } else {
    input.type = 'password';
    button.className = 'fa-solid fa-lock'; // Kilit kapalı
  }
}

// Şifre güçlülük kontrolü
function checkPasswordStrength(password) {
  let strength = 0;
  let feedback = [];
  
  if (password.length >= 8) strength++;
  else feedback.push('En az 8 karakter');
  
  if (/[a-z]/.test(password)) strength++;
  else feedback.push('Küçük harf');
  
  if (/[A-Z]/.test(password)) strength++;
  else feedback.push('Büyük harf');
  
  if (/[0-9]/.test(password)) strength++;
  else feedback.push('Rakam');
  
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  else feedback.push('Özel karakter');
  
  return { strength, feedback };
}

// Şifre güçlülük göstergesi güncelle
function updatePasswordStrength(muderrisNumber) {
  const password = document.getElementById(`muderris${muderrisNumber}-password`).value;
  const warningElement = document.getElementById(`muderris${muderrisNumber}-password-warning`);
  
  // Element kontrolü
  if (!warningElement) {
    console.error(`Password warning element not found for muderris${muderrisNumber}`);
    return;
  }
  
  if (!password) {
    warningElement.style.display = 'none';
    return;
  }
  
  const { strength, feedback } = checkPasswordStrength(password);
  
  warningElement.style.display = 'block';
  warningElement.className = 'password-warning';
  
  // 6 karakter = zayıf şifre (sarı)
  if (password.length >= 6 && password.length < 8) {
    warningElement.classList.add('weak');
    warningElement.textContent = 'Zayıf şifre';
  } else if (password.length < 6) {
    warningElement.classList.add('weak');
    warningElement.textContent = 'Zayıf şifre. En az 6 karakter gerekli';
  } else if (strength <= 3) {
    warningElement.classList.add('medium');
    warningElement.textContent = 'Orta güçlükte şifre';
  } else {
    warningElement.classList.add('strong');
    warningElement.textContent = 'Güçlü şifre!';
  }
}

// Şifre eşleşme kontrolü
function checkPasswordMatch(muderrisNumber) {
  const password = document.getElementById(`muderris${muderrisNumber}-password`).value;
  const confirmPassword = document.getElementById(`muderris${muderrisNumber}-password-confirm`).value;
  const warningElement = document.getElementById(`muderris${muderrisNumber}-password-warning`);
  
  // Şifre tekrar kutusu boşsa kontrol etme
  if (!confirmPassword) {
    if (warningElement) {
      warningElement.style.display = 'none';
    }
    document.getElementById(`muderris${muderrisNumber}-password-confirm`).style.borderColor = 'var(--border-color)';
    return true;
  }
  
  // Şifre eşleşmezse uyarı göster
  if (password !== confirmPassword) {
    document.getElementById(`muderris${muderrisNumber}-password-confirm`).style.borderColor = 'var(--error-color)';
    
    if (warningElement) {
      warningElement.style.display = 'block';
      warningElement.className = 'password-warning mismatch';
      warningElement.textContent = 'Şifreler eşleşmiyor!';
    }
    return false;
  } else {
    document.getElementById(`muderris${muderrisNumber}-password-confirm`).style.borderColor = 'var(--border-color)';
    
    // Şifre eşleşiyorsa güçlülük kontrolünü tekrar yap
    if (password) {
      updatePasswordStrength(muderrisNumber);
    } else {
      if (warningElement) {
        warningElement.style.display = 'none';
      }
    }
    return true;
  }
}

// Müderris formu gönderimi
function handleMuderrisSubmit(muderrisNumber, event) {
  event.preventDefault();
  
  const form = event.target;
  const saveBtn = document.getElementById(`muderris${muderrisNumber}-save-btn`);
  const messageArea = document.getElementById(`muderris${muderrisNumber}-message`);
  
  // Form verilerini al
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Validasyon
  if (!data.ad || !data.soyad || !data.username || !data.password || !data.password_confirm) {
    showMessage(muderrisNumber, 'Lütfen tüm zorunlu alanları doldurun.', 'error');
    return;
  }
  
  if (data.password !== data.password_confirm) {
    showMessage(muderrisNumber, 'Şifreler eşleşmiyor.', 'error');
    return;
  }
  
  const { strength } = checkPasswordStrength(data.password);
  if (strength < 3) {
    showMessage(muderrisNumber, 'Lütfen daha güçlü bir şifre seçin.', 'error');
    return;
  }
  
  // Loading durumu
  saveBtn.classList.add('loading');
  saveBtn.disabled = true;
  
  // Simüle edilmiş API çağrısı (gerçek backend entegrasyonu için değiştirilecek)
  setTimeout(() => {
    // Başarılı kayıt simülasyonu
    showMessage(muderrisNumber, `Müderris başarıyla kaydedildi: ${data.ad} ${data.soyad}`, 'success');
    updateMuderrisTitle(muderrisNumber, data.ad, data.soyad);
    
    // Sil butonunu göster
    document.getElementById(`muderris${muderrisNumber}-delete-btn`).style.display = 'block';
    
    // Loading durumunu kaldır
    saveBtn.classList.remove('loading');
    saveBtn.disabled = false;
    
    console.log('Müderris verileri:', data);
  }, 1500);
}

// Müderris silme
function handleMuderrisDelete(muderrisNumber) {
  if (confirm('Bu müderrisi silmek istediğinizden emin misiniz?')) {
    const messageArea = document.getElementById(`muderris${muderrisNumber}-message`);
    
    // Simüle edilmiş silme işlemi
    setTimeout(() => {
      showMessage(muderrisNumber, 'Müderris başarıyla silindi.', 'success');
      updateMuderrisTitle(muderrisNumber, '', '');
      
      // Formu temizle
      document.getElementById(`muderris${muderrisNumber}-form`).reset();
      
      // Sil butonunu gizle
      document.getElementById(`muderris${muderrisNumber}-delete-btn`).style.display = 'none';
      
      // Profil resmini sıfırla
      const profileImg = document.querySelector(`#muderris${muderrisNumber}-content .profile-img`);
      if (profileImg) {
        profileImg.src = '/static/img/default-profile.png';
      }
    }, 1000);
  }
}

// Mesaj gösterme fonksiyonu
function showMessage(muderrisNumber, message, type) {
  const messageArea = document.getElementById(`muderris${muderrisNumber}-message`);
  if (messageArea) {
    messageArea.textContent = message;
    messageArea.className = `message-area ${type}`;
    messageArea.style.display = 'block';
    
    // 5 saniye sonra mesajı gizle
    setTimeout(() => {
      messageArea.style.display = 'none';
    }, 5000);
  }
}

// Fonksiyonları global scope'a ekle
window.updatePasswordStrength = updatePasswordStrength;
window.checkPasswordMatch = checkPasswordMatch;
window.handleMuderrisSubmit = handleMuderrisSubmit;
window.handleMuderrisDelete = handleMuderrisDelete;
window.togglePassword = togglePassword;
window.triggerFileInput = triggerFileInput;
window.handleProfileImage = handleProfileImage;
window.updateMuderrisTitle = updateMuderrisTitle;
window.showMessage = showMessage;

// Sayfa yüklendiğinde event listener'ları bağla
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM yüklendi, event listener\'lar bağlanıyor...');
  
  // Her müderris için (1, 2, 3)
  for (let i = 1; i <= 3; i++) {
    const passwordInput = document.getElementById(`muderris${i}-password`);
    const passwordConfirmInput = document.getElementById(`muderris${i}-password-confirm`);
    
    console.log(`Müderris ${i} - Password input:`, passwordInput);
    console.log(`Müderris ${i} - Password confirm input:`, passwordConfirmInput);
    
    if (passwordInput) {
      // Şifre yazıldıkça güçlülük kontrolü
      passwordInput.addEventListener('input', function() {
        console.log(`Müderris ${i} şifre yazıldı:`, this.value);
        updatePasswordStrength(i);
      });
    }
    
    if (passwordConfirmInput) {
      // Şifre tekrar yazıldıkça eşleşme kontrolü
      passwordConfirmInput.addEventListener('input', function() {
        console.log(`Müderris ${i} şifre tekrar yazıldı:`, this.value);
        checkPasswordMatch(i);
      });
    }
  }
  
  console.log('Event listener\'lar bağlandı');
});