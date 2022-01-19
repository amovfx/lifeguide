from ..utils.FlaskWebpackBlueprint import FlaskWebpackedBlueprint

ideas_bp = FlaskWebpackedBlueprint.create_blueprint("/ideas", file_name=__name__)

from . import routes