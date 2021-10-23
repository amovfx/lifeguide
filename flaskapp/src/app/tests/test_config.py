"""

Testing of the flask config.

"""

from ddt import ddt, idata, unpack

from .test import TestBaseCase
from ..config import DevelopmentConfig, TestConfig, ProductionConfig

from .. import set_config, ENV_CONFIGS


class DdtList(list):
    """

    Holder class to store data relevant to ddt annotations.

    """


def config_data_generator():
    """

    generator function to produce verbose tests

    :return:
        yield a DdtList
    """

    for config_name, config_class in zip(
        ENV_CONFIGS.keys(), (DevelopmentConfig, TestConfig, ProductionConfig)
    ):
        ddt_list = DdtList()
        ddt_list.append((config_name, config_class))
        setattr(ddt_list, "__name__", config_name)
        setattr(ddt_list, "__doc__", config_class.__name__)
        yield ddt_list


@ddt
class TestFlaskConfig(TestBaseCase):
    """

    Testing configurations

    """

    @idata(config_data_generator())
    @unpack
    def test_configs(self, first):
        """

        test config mapping between FLASK_ENV and Config objects.

        :param first:
        :return:
        """
        self.assertIs(set_config(self.app, first[0]), first[1])
