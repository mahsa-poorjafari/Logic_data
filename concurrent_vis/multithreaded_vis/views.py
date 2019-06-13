from django.shortcuts import render
from multithreaded_vis.logical_data_inputs import *
from multithreaded_vis.dynamic_analysis import *
from operator import is_not
from functools import partial
# Create your views here.


def index(request):
    return render(request, 'Home.html')


def logical_data(request):
    shared_variables = logical_data_input_function()
    struct_group = []
    shared_group = []
    # function_names = []
    for v in shared_variables:
        if v.find(".") > 0:
            struct_var = v.split(".")
            struct_group.append(struct_var)
        else:
            shared_group.append(v)
    struct_names = map(lambda a: a[0], struct_group)
    struct_names_keys = remove_dups(list(struct_names))
    # print(struct_names_keys)
    struct_vars_groups = {}
    for s in struct_names_keys:
        struct_vars = []
        find_struct_vars = map(lambda i: i[1] if i[0] == s else None, struct_group)
        struct_vars_not_none = filter(partial(is_not, None), find_struct_vars)
        struct_vars_groups.update({s: list(struct_vars_not_none)})
    # print(struct_vars_groups)

    fun_names = get_function_names()
    # print(fun_names)

    return render(request, 'Logical_data.html', {'shared_variables': shared_group,
                                                 'shared_struct': struct_vars_groups,
                                                 'function_names': fun_names})


def logical_comp(request):
    thread_list = tech_comp()
    # print(thread_list['timestamp'])
    return render(request, 'logical_component.html', {'timestamp': thread_list['timestamp'],
                                                      'thread_ids': thread_list['thread_ids']})


def cy(request):
    shared_variables = logical_data_input_function()
    struct_group = []
    shared_group = []
    # function_names = []
    for v in shared_variables:
        if v.find(".") > 0:
            struct_var = v.split(".")
            struct_group.append(struct_var)
        else:
            shared_group.append(v)
    struct_names = map(lambda a: a[0], struct_group)
    struct_names_keys = remove_dups(list(struct_names))
    # print(struct_names_keys)
    struct_vars_groups = {}
    for s in struct_names_keys:
        struct_vars = []
        find_struct_vars = map(lambda i: i[1] if i[0] == s else None, struct_group)
        struct_vars_not_none = filter(partial(is_not, None), find_struct_vars)
        struct_vars_groups.update({s: list(struct_vars_not_none)})
    # print(struct_vars_groups)

    fun_names = get_function_names()
    # print(fun_names)
    return render(request, 'cy.html', {'shared_variables': shared_group,
                                                 'shared_struct': struct_vars_groups,
                                                 'function_names': fun_names})


def no_canvas(request):
    return render(request, 'no_canvas.html')


def gojs(request):
    return render(request, 'gojs.html')


def mxgraph(request):
    return render(request, 'mxGraph.html')


def ld_mxgraph(request):
    shared_variables = logical_data_input_function()
    data_types_vars = get_data_types()
    struct_group = []
    shared_group = []
    # function_names = []
    for v in shared_variables:
        if v.find(".") > 0:
            struct_var = v.split(".")
            struct_group.append(struct_var)
        else:
            shared_group.append(v)
    struct_names = map(lambda a: a[0], struct_group)
    struct_names_keys = remove_dups(list(struct_names))
    # print(struct_names_keys)
    struct_vars_groups = {}
    for s in struct_names_keys:
        struct_vars = []
        find_struct_vars = map(lambda i: i[1] if i[0] == s else None, struct_group)
        struct_vars_not_none = filter(partial(is_not, None), find_struct_vars)
        struct_vars_groups.update({s: list(struct_vars_not_none)})
    # print(struct_vars_groups)
    len_sh_var = len(shared_group)
    fun_names = get_function_names()
    # print(fun_names)
    return render(request, 'LD_mxGraph.html', {'shared_variables': data_types_vars,
                                               'shared_struct': struct_vars_groups,
                                               'function_names': fun_names})


def draw2d(request):
    shared_variables = logical_data_input_function()
    struct_group = []
    shared_group = []
    # function_names = []
    for v in shared_variables:
        if v.find(".") > 0:
            struct_var = v.split(".")
            struct_group.append(struct_var)
        else:
            shared_group.append(v)
    struct_names = map(lambda a: a[0], struct_group)
    struct_names_keys = remove_dups(list(struct_names))
    # print(struct_names_keys)
    struct_vars_groups = {}
    for s in struct_names_keys:
        struct_vars = []
        find_struct_vars = map(lambda i: i[1] if i[0] == s else None, struct_group)
        struct_vars_not_none = filter(partial(is_not, None), find_struct_vars)
        struct_vars_groups.update({s: list(struct_vars_not_none)})
    # print(struct_vars_groups)
    len_sh_var = len(shared_group)
    fun_names = get_function_names()
    # print(fun_names)

    return render(request, 'draw2d.html', {'shared_variables': len_sh_var,
                                           'shared_struct': struct_vars_groups,
                                           'function_names': fun_names})
