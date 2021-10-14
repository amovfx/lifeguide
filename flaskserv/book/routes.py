from . import book_bp

@book_bp.route("/home")
@book_bp.route("/")
def home():
    return "Hello"