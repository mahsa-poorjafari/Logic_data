import csv
from test import *
import django
from logical_data_inputs import *


def main():
    print(django.get_version())

    # this was the first try
    # test_fun()

    # Group the shared variables as the Inputs for a functions
    logical_data_input_function()


if __name__ == "__main__":
    main()
