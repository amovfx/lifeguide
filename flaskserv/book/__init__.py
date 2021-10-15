from flask import Blueprint
import pathlib
def create_bp(name):
    return Blueprint(name,
                     __name__,
                     template_folder='templates',
                     static_url_path=f'/{name}/static',
                     static_folder='static',
                     url_prefix=f'/book')

book_bp = create_bp('/book')
book_bp.files = [ x.as_posix() for x in pathlib.Path(book_bp.static_folder).rglob("*/*.md")]



from . import routes