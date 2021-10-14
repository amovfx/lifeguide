from flask import Blueprint

def create_bp(name):
    return Blueprint(name,
                     __name__,
                     template_folder='templates',
                     static_url_path=f'/{name}/static',
                     static_folder='static',
                     url_prefix=f'/book')

book_bp = create_bp('/book')



from . import routes