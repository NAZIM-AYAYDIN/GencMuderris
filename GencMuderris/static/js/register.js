function validateRegisterForm() {
  const requiredFields = [
    'firstName',
    'lastName',
    'birthDate',
    'email',
    'password',
    'confirmPassword',
    'captcha'
  ];

  const allFilled = requiredFields.every(id => {
    const el = document.getElementById(id);
    return el && el.value.trim() !== '';
  });

  const checkboxes = document.querySelectorAll('.required-check');
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = !(allFilled && allChecked);
}

// Şifreyi göster/gizle
function togglePasswordVisibility(targetId, iconId) {
  const input = document.getElementById(targetId);
  const icon = document.getElementById(iconId);
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-lock");
    icon.classList.add("fa-lock-open");
  } else {
    input.type = "password";
    icon.classList.remove("fa-lock-open");
    icon.classList.add("fa-lock");
  }
}

// Şifre eşleşme kontrolü
function checkPasswordMatch() {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const message = document.getElementById('register-message');
  
  if (password.value && confirmPassword.value) {
    if (password.value !== confirmPassword.value) {
      message.textContent = 'Şifreler uyuşmuyor!';
      message.style.color = '#ff4444';
      return false;
    } else {
      message.textContent = '';
      return true;
    }
  }
  return true;
}

window.addEventListener('DOMContentLoaded', () => {
  // Şifre göster/gizle eventleri
  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
      const target = icon.getAttribute('data-target');
      togglePasswordVisibility(target, icon.id);
    });
  });

  // Zorunlu alan kontrolü
  const inputs = document.querySelectorAll('#registerForm input');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateRegisterForm();
      if (input.id === 'password' || input.id === 'confirmPassword') {
        checkPasswordMatch();
      }
    });
    input.addEventListener('change', validateRegisterForm);
  });

  // Form submit
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!checkPasswordMatch()) {
      return;
    }
    
    // Form verilerini topla
    const formData = new FormData(this);
    
    // Submit butonunu devre dışı bırak
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Kayıt yapılıyor...';
    
    // Formu gönder
    fetch('/auth/register', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(html => {
      // Sayfayı yenile (server response'u göstermek için)
      document.open();
      document.write(html);
      document.close();
    })
    .catch(error => {
      console.error('Kayıt hatası:', error);
      const message = document.getElementById('register-message');
      message.textContent = 'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.';
      message.style.color = '#ff4444';
      
      // Submit butonunu tekrar aktif et
      submitBtn.disabled = false;
      submitBtn.textContent = 'Üye Ol';
    });
  });
});
