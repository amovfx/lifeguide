

from .test import TestBaseCase
from ..config import ( DevelopmentConfig, TestConfig, ProductionConfig)
from .. import set_config, ENV_CONFIGS

from ddt import ddt, idata, unpack

class DdtList(list):
    pass

def config_data_generator():
    """

    generator function to produce verbose tests

    :return:
        yield a DdtList
    """

    for config_name, config_class in zip(ENV_CONFIGS.keys(), ( DevelopmentConfig, TestConfig, ProductionConfig)):
        r = DdtList()
        r.append((config_name, config_class))
        setattr(r, "__name__", config_name)
        setattr(r, "__doc__", config_class.__name__)
        yield r




@ddt
class TestConfig(TestBaseCase):
    """

    Testing configurations

    """

    @idata(config_data_generator())
    @unpack
    def test_configs(self, first):
        self.assertIs(set_config(self.app, first[0]), first[1])