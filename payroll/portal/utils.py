import random


def send_verification_code(phone_number):
    """this function sent otp code SMS!!!"""
    verification_code = random.randint(100000, 999999)
    print(f"کد تأیید برای {phone_number}: {verification_code}")  # در حالت واقعی اینجا پیامک ارسال می‌شود
    return verification_code
