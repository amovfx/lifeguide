import os
from src.app_factory import create_app


application = create_app()

if __name__ == "__main__":
    if os.getenv("FLASK_ENV") == 'development':
        application.run()
    else:
        application.run(ssl_context='adhoc', host="0.0.0.0")

