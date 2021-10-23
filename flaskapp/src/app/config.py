

import os
import secrets


class DefaultConfig(object):
    DEBUG = False
    SECRET_KEY = secrets.token_hex(128)
    TESTING = False


class TestConfig(DefaultConfig):
    DEBUG = True
    TESTING = True
    LOGIN_DISABLED = True
    WTF_CSRF_ENABLED = False


class DevelopmentConfig(DefaultConfig):
    DEBUG = True
    CORS_HEADERS = "Access-Control-Allow-Origin"

class ProductionConfig(DefaultConfig):
    SECRET_KEY = secrets.token_hex(2048)
    SSL='adhoc'