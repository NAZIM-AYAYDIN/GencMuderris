import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))


def send_custom_email(to_email: str, action_link: str, type: str = "verify"):
    if type == "verify":
        subject = "Genç Müderris - E-posta Doğrulama"
        action_text = "E-postamı Doğrula"
        intro = "Hesabınızı aktifleştirmek için aşağıdaki butona tıklayın:"
        info = "Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz."
    elif type == "reset":
        subject = "Genç Müderris - Şifre Sıfırlama"
        action_text = "Şifremi Sıfırla"
        intro = "Şifrenizi yenilemek için aşağıdaki butona tıklayın:"
        info = "Eğer bu isteği siz yapmadıysanız, lütfen bu e-postayı yok sayınız."
    else:
        subject = "Genç Müderris"
        action_text = "Bağlantıya Git"
        intro = ""
        info = ""

    message = MIMEMultipart("alternative")
    message["From"] = EMAIL_USER
    message["To"] = to_email
    message["Subject"] = subject

    html = f"""
    <html>
    <body style="background:#f4f4f4;padding: 0;margin:0;">
      <div style="max-width:500px;margin: 40px auto 0 auto;background:#232323;padding:32px 24px;border-radius:10px;box-shadow:0 0 12px #0002;">
        <h2 style="color:#3a81f3;margin-top:0;">Genç Müderris</h2>
        <p style="color:#fff;font-size:16px;margin-bottom:30px;">{intro}</p>
        <a href="{action_link}" style="display:inline-block;padding:15px 32px;background:#3a81f3;color:#fff;text-decoration:none;font-weight:600;border-radius:7px;font-size:18px;margin-bottom:30px;">{action_text}</a>
        <p style="margin:32px 0 0 0; color:#bbb;font-size:13px;">{info}</p>
        <div style="color:#888;font-size:12px;margin-top:38px;">Bu e-posta Genç Müderris tarafından otomatik gönderildi.</div>
      </div>
    </body>
    </html>
    """

    plain = f"""
    Genç Müderris

    {intro}

    Bağlantı: {action_link}

    {info}
    """

    message.attach(MIMEText(plain, "plain"))
    message.attach(MIMEText(html, "html"))

    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_USER, to_email, message.as_string())
        server.quit()
        print(f"✅ E-posta gönderildi ({type})")
    except Exception as e:
        print("❌ E-posta gönderilemedi:", e)


def send_verification_code(to_email: str, code: str, purpose: str = "verify"):
    # 6 haneli kod gönderimi için mail şablonu
    if purpose == "account_delete":
        subject = "Genç Müderris - Hesap Silme Doğrulama Kodu"
        intro = "Hesabınızı silmek için aşağıdaki doğrulama kodunu girin:"
    elif purpose == "password_reset":
        subject = "Genç Müderris - Şifre Sıfırlama Kodu"
        intro = "Şifrenizi sıfırlamak için aşağıdaki doğrulama kodunu girin:"
    else:
        subject = "Genç Müderris - Doğrulama Kodu"
        intro = "İşleminizi tamamlamak için aşağıdaki kodu kullanın:"

    html = f"""
    <html>
    <body style="background:#f4f4f4;padding: 0;margin:0;">
      <div style="max-width:500px;margin: 40px auto 0 auto;background:#232323;padding:32px 24px;border-radius:10px;box-shadow:0 0 12px #0002;">
        <h2 style="color:#3a81f3;margin-top:0;">Genç Müderris</h2>
        <p style="color:#fff;font-size:16px;margin-bottom:18px;">{intro}</p>
        <div style="text-align:center;">
            <span style="display:inline-block;font-size:2.1rem;background:#222;color:#25c4ee;padding:18px 40px;border-radius:12px;letter-spacing:6px;margin:12px 0 20px 0;font-weight:bold;box-shadow:0 2px 8px #0001;">{code}</span>
        </div>
        <p style="margin:28px 0 0 0; color:#bbb;font-size:13px;">Bu kodu kimseyle paylaşmayınız. Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
        <div style="color:#888;font-size:12px;margin-top:38px;">Bu e-posta Genç Müderris tarafından otomatik gönderildi.</div>
      </div>
    </body>
    </html>
    """

    plain = f"""
    Genç Müderris

    {intro}

    Kod: {code}

    Bu kodu kimseyle paylaşmayınız. Eğer bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
    """

    message = MIMEMultipart("alternative")
    message["From"] = EMAIL_USER
    message["To"] = to_email
    message["Subject"] = subject
    message.attach(MIMEText(plain, "plain"))
    message.attach(MIMEText(html, "html"))

    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_USER, to_email, message.as_string())
        server.quit()
        print(f"✅ Doğrulama kodu gönderildi ({purpose})")
    except Exception as e:
        print("❌ Kod gönderilemedi:", e)

