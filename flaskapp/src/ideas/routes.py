

from . import ideas_bp

@ideas_bp.get("/")
def ideas_main():
    return "My Ideas"

