import random


def send_verification_code(phone_number):
    """this function sent otp code SMS!!!"""
    verification_code = random.randint(100000, 999999)
    print(f"کد تأیید برای {phone_number}: {verification_code}")  
    return verification_code
