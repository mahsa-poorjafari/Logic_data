import csv
from operator import is_not
from functools import partial

def remove_dups(a_list):
    # Remove Duplicates
    new_dict = dict.fromkeys(a_list)
    the_list = list(new_dict)
    return the_list


def get_var_names(var_list):
    var_names = map(lambda var: var[0], var_list)
    return list(var_names)


def get_types(var_list):
    type_names = map(lambda var: var[2], var_list)
    type_names = remove_dups(list(type_names))
    # print("========type_names========")
    # data_types_vars = {}
    # for t in type_names:
    #     var_names = map(lambda var: var[0] if var[2] == t else None, var_list)
    #     print(len(var_list))
    #     print(list(var_names))
    #     var_names_not_none = filter(partial(is_not, None), var_names)
    #     data_types_vars.update({t: list(var_names_not_none)})
    # print(data_types_vars)
    return type_names


def logical_data_input_function():
    with open('multithreaded_vis/shared_variables.txt') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        shared_variables_names = get_var_names(csv_reader)
        print("Number of Shared Variables: ", len(shared_variables_names))
        # variables_names = {'names': list(shared_variables_names)}
    return list(shared_variables_names)


def get_data_types():
    data_types_vars = {}
    with open('multithreaded_vis/shared_variables.txt') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        data_types = get_types(csv_reader)
        for t in data_types:
            csv_file.seek(0, 0)
            var_names = map(lambda var: var[0] if var[2] == t else None, csv_reader)
            var_names_not_none = filter(partial(is_not, None), var_names)
            data_types_vars.update({t: list(var_names_not_none)})
        print("data_types_vars=> ", data_types_vars)
    return data_types_vars
