# Basit bir favicon oluşturucu
from PIL import Image, ImageDraw, ImageFont
import os

# 32x32 boyutunda favicon oluştur
img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Basit bir "G" harfi çiz (Genç Müderris için)
draw.ellipse([4, 4, 28, 28], fill=(142, 142, 160, 255), outline=(255, 255, 255, 255), width=2)
draw.text((12, 8), "G", fill=(255, 255, 255, 255))

# Favicon.ico olarak kaydet
img.save("static/favicon.ico", format='ICO', sizes=[(32, 32)])
print("Favicon oluşturuldu: static/favicon.ico")