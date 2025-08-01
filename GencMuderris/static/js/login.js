// Sekme geçişi
function showTab(tabName) {
  const userTab = document.getElementById('user-tab');
  const muderrisTab = document.getElementById('muderris-tab');
  const tabUser = document.getElementById('tab-user');
  const tabMuderris = document.getElementById('tab-muderris');

  if (tabName === 'user') {
    userTab.style.display = 'block';
    muderrisTab.style.display = 'none';
    tabUser.classList.add('active');
    tabMuderris.classList.remove('active');
  } else {
    userTab.style.display = 'none';
    muderrisTab.style.display = 'block';
    tabMuderris.classList.add('active');
    tabUser.classList.remove('active');
  }
}

// Giriş formu örnek CAPTCHA mantığı
let userAttempts = 0;
let muderrisAttempts = 0;

function handleUserLogin(e) {
  e.preventDefault();
  userAttempts++;
  if (userAttempts >= 2) {
    document.getElementById('user-captcha').style.display = 'block';
  }
  document.getElementById('user-error').textContent = 'Hatalı giriş veya eksik bilgi';
}

function handleMuderrisLogin(e) {
  e.preventDefault();
  muderrisAttempts++;
  if (muderrisAttempts >= 2) {
    document.getElementById('muderris-captcha').style.display = 'block';
  }
  document.getElementById('muderris-error').textContent = 'Kullanıcı adı ya da şifre hatalı';
}

// Şifre göster/gizle toggle fonksiyonu (ikon sola hizalı)
function togglePasswordVisibility(targetId, iconId) {
  const passwordInput = document.getElementById(targetId);
  const icon = document.getElementById(iconId);
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    icon.classList.remove("fa-lock");
    icon.classList.add("fa-lock-open");
  } else {
    passwordInput.type = "password";
    icon.classList.remove("fa-lock-open");
    icon.classList.add("fa-lock");
  }
}

// Formlara event listener ekle
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('userLoginForm').addEventListener('submit', handleUserLogin);
  document.getElementById('muderrisLoginForm').addEventListener('submit', handleMuderrisLogin);

  const toggleIcons = document.querySelectorAll('.toggle-password');
  toggleIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const target = icon.getAttribute('data-target');
      const iconId = icon.id;
      togglePasswordVisibility(target, iconId);
    });
  });
});
