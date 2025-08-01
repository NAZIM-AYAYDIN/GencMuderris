// Global scope'ta fonksiyonları tanımla
window.toggleSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('sidebar-hidden');
    console.log('toggleSidebar çalıştı, sidebar hidden:', sidebar.classList.contains('sidebar-hidden'));
  } else {
    console.error('Sidebar elementi bulunamadı');
  }
};

window.toggleMobileSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('sidebar-open');
    console.log('toggleMobileSidebar çalıştı, sidebar open:', sidebar.classList.contains('sidebar-open'));
  }
};

// Mobilde 3 çizgi butonuna mobil fonksiyonu bağla
window.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.querySelector('#mobileMenuToggle');
  if (mobileBtn) {
    mobileBtn.onclick = function() {
      if (window.innerWidth <= 768) {
        toggleMobileSidebar();
      } else {
        toggleSidebar();
      }
    };
    console.log('Mobil buton düzeltildi');
  }
});

// Ekran boyutuna göre responsive davranış
window.addEventListener('resize', () => {
  const sidebar = document.getElementById('sidebar');
  const width = window.innerWidth;

  if (width <= 768) {
    // Mobilde sidebar kapalı başlasın
    if (sidebar) {
      sidebar.classList.remove('sidebar-hidden');
      sidebar.classList.remove('sidebar-open');
    }
  } else {
    // Masaüstü: sidebar açık, mobil classları sıfırla
    if (sidebar) {
      sidebar.classList.remove('sidebar-open');
      sidebar.classList.remove('sidebar-hidden');
    }
  }
});

// Sayfa ilk yüklendiğinde de aynı kontrolü yap
window.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.getElementById('mobileMenuToggle');

  // Masaüstünde sidebar açık başlasın
  if (window.innerWidth > 768) {
    if (sidebar) {
      sidebar.classList.add('sidebar-open');
      sidebar.classList.remove('sidebar-hidden');
    }
  } else {
    // Mobilde sidebar gizli başlasın
    if (sidebar) {
      sidebar.classList.remove('sidebar-open');
      sidebar.classList.remove('sidebar-hidden');
    }
  }

  // Hamburger simgesi görünür olsun
  if (mobileToggle) {
    mobileToggle.style.display = 'flex';
  }

  console.log('Sidebar.js yüklendi, sidebar varsayılan olarak açık');
});

