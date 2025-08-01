from PIL import Image, ImageDraw, ImageFont
import os

# img klasörü oluştur
os.makedirs("static/img", exist_ok=True)

# 1. Favicon oluştur (32x32)
favicon = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
draw = ImageDraw.Draw(favicon)

# Basit bir "G" harfi çiz
draw.ellipse([4, 4, 28, 28], fill=(142, 142, 160, 255), outline=(255, 255, 255, 255), width=2)
draw.text((12, 8), "G", fill=(255, 255, 255, 255))

favicon.save("static/favicon.ico", format='ICO', sizes=[(32, 32)])
print("✅ Favicon oluşturuldu: static/favicon.ico")

# 2. Default profil resmi oluştur (200x200)
profile = Image.new('RGBA', (200, 200), (142, 142, 160, 255))
draw = ImageDraw.Draw(profile)

# Kullanıcı ikonu çiz
draw.ellipse([50, 30, 150, 130], fill=(255, 255, 255, 255))  # Baş
draw.ellipse([70, 50, 130, 110], fill=(142, 142, 160, 255))  # Yüz
draw.ellipse([85, 70, 95, 80], fill=(255, 255, 255, 255))    # Sol göz
draw.ellipse([105, 70, 115, 80], fill=(255, 255, 255, 255))  # Sağ göz
draw.ellipse([90, 90, 110, 105], fill=(255, 255, 255, 255))  # Ağız
draw.rectangle([80, 130, 120, 180], fill=(255, 255, 255, 255))  # Vücut

profile.save("static/img/default-profile.png", format='PNG')
print("✅ Default profil resmi oluşturuldu: static/img/default-profile.png")

print("\n�� Tüm eksik dosyalar oluşturuldu!")
print("404 hataları artık görünmeyecek.") 