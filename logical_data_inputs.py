import csv


def get_var_names(var_list):
    var_names = map(lambda var: var[0], var_list)
    return list(var_names)


def logical_data_input_function():
    with open('shared_variables.txt') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        shared_variables_names = get_var_names(csv_reader)
        print("Number of Shared Variables: ", len(shared_variables_names))
        print(shared_variables_names)



