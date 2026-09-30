"""Build public/apps/<id>/ from the real product repos: app icons, phone screens
(cropped to one phone aspect), and wide desktop shots. Re-run when a product's
screens change. Needs Pillow."""
import os, shutil
from PIL import Image

SRC = 'D:/All_Projects_FiveM'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'apps')
PW, PH = 600, 1300          # phone screen, 9:19.5
WW = 1600                   # wide shot width

def phone(src, dst):
    im = Image.open(src).convert('RGB')
    h = round(im.height * PW / im.width)
    im = im.resize((PW, h), Image.LANCZOS)
    if h >= PH:
        im = im.crop((0, 0, PW, PH))
    else:
        bg = Image.new('RGB', (PW, PH), im.getpixel((5, h - 5)))
        bg.paste(im, (0, 0)); im = bg
    im.save(dst, 'JPEG', quality=84, optimize=True)

def wide(src, dst):
    im = Image.open(src).convert('RGB')
    h = round(im.height * WW / im.width)
    im.resize((WW, h), Image.LANCZOS).crop((0, 0, WW, min(h, 1000))).save(dst, 'JPEG', quality=84, optimize=True)

def icon(src, dst, size=256):
    im = Image.open(src).convert('RGBA'); im.thumbnail((size, size), Image.LANCZOS); im.save(dst, 'PNG', optimize=True)

APPS = {
  'hms': dict(
    icon_svg='HMS-BOTH/landing/public/icon.svg',
    phones=['HMS-BOTH/11-9-26-HMS-front/docs/shots/flow4-4-phone-dashboard.png', 'HMS-BOTH/11-9-26-HMS-front/docs/shots/flow1-9-phone.png', 'HMS-BOTH/11-9-26-HMS-front/docs/shots/login-phone.png'],
    wides=['HMS-BOTH/landing/public/shots/ed-board.png', 'HMS-BOTH/landing/public/shots/lab-critical.png']),
  'plusveda': dict(
    icon='inventory-saas-both-fiveM/23-jun26-medical-front/assets/brand/mark.png',
    phones=['inventory-saas-both-fiveM/landing/public/shots/phone-dashboard.png', 'inventory-saas-both-fiveM/23-jun26-medical-front/store-assets/raw-screens/sale.png', 'inventory-saas-both-fiveM/landing/public/shots/phone-inventory.png'],
    wides=['inventory-saas-both-fiveM/landing/public/shots/dashboard.png']),
  'ashshifa': dict(
    icon='Doctor-both/22-04-26DR-front/store-assets/play-icon-512.png',
    phones=[f'Doctor-both/22-04-26DR-front/store-assets/raw-screens/{n}.png' for n in ('home', 'quran', 'prayertimes', 'qibla')]),
  'parentai': dict(
    icon='Parent-Ai-both/28-8-26-prenting-front/store-assets/play-icon-512.png',
    phones=['Parent-Ai-both/28-8-26-prenting-front/store-assets/raw-screens/01-tonight.png', 'Parent-Ai-both/28-8-26-prenting-front/store-assets/raw-screens/02-progress.png', 'Parent-Ai-both/28-8-26-prenting-front/docs/screens/09-session-phone.png'],
    wides=['Parent-Ai-both/28-8-26-prenting-front/docs/screens/02-dashboard-desktop.png']),
  'rashtrafarm': dict(
    icon='goat-farm-fiveM/17-jun-Goat-farm-front/store-assets/play-icon-512.png',
    phones=[f'goat-farm-fiveM/17-jun-Goat-farm-front/store-assets/raw-screens/{n}.png' for n in ('dashboard', 'goats', 'health')]),
  'outvue': dict(
    icon='outvue-both/OutVue-front/public/favicon.png',
    wides=['outvue-both/screenshots/04_dashboard.png', 'outvue-both/screenshots/10_scenario_modelling.png']),
  'classconnect': dict(icon='class-connect-both-fiveM/7-7-26-classConnect-front/assets/brand/logo.png'),
}

for app, a in APPS.items():
    d = os.path.join(OUT, app); os.makedirs(d, exist_ok=True)
    if 'icon' in a: icon(os.path.join(SRC, a['icon']), os.path.join(d, 'icon.png'))
    if 'icon_svg' in a: shutil.copy(os.path.join(SRC, a['icon_svg']), os.path.join(d, 'icon.svg'))
    for i, p in enumerate(a.get('phones', []), 1): phone(os.path.join(SRC, p), os.path.join(d, f'phone-{i}.jpg'))
    for i, p in enumerate(a.get('wides', []), 1): wide(os.path.join(SRC, p), os.path.join(d, f'wide-{i}.jpg'))
    files = sorted(os.listdir(d))
    print(f"{app:13} {len(files)} files  {sum(os.path.getsize(os.path.join(d, f)) for f in files)//1024} KB  {' '.join(files)}")
