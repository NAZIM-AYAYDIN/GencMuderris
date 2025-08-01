# Default profil resmi oluşturucu
from PIL import Image, ImageDraw, ImageFont
import os

# 200x200 boyutunda default profil resmi oluştur
img = Image.new('RGBA', (200, 200), (142, 142, 160, 255))
draw = ImageDraw.Draw(img)

# Kullanıcı ikonu çiz
draw.ellipse([50, 30, 150, 130], fill=(255, 255, 255, 255))  # Baş
draw.ellipse([70, 50, 130, 110], fill=(142, 142, 160, 255))  # Yüz
draw.ellipse([85, 70, 95, 80], fill=(255, 255, 255, 255))    # Sol göz
draw.ellipse([105, 70, 115, 80], fill=(255, 255, 255, 255))  # Sağ göz
draw.ellipse([90, 90, 110, 105], fill=(255, 255, 255, 255))  # Ağız

# Vücut
draw.rectangle([80, 130, 120, 180], fill=(255, 255, 255, 255))

# img klasörü oluştur
os.makedirs("static/img", exist_ok=True)

# PNG olarak kaydet
img.save("static/img/default-profile.png", format='PNG')
print("Default profil resmi oluşturuldu: static/img/default-profile.png") 