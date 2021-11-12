


from src.app import create_app
import mimetypes

mimetypes.add_type('application/javascript', '.js')
app = create_app()

if __name__ == "__main__":
    app.run()