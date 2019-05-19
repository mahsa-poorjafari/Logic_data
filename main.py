import csv



def create_groups(thrL, loaded_var_list, accessOp):
    var_group = {}
    var_thrIDs_filter = filter(lambda t : t[1]== thrL, loaded_var_list.iteritems())
    var_thrIDs_list = list(var_thrIDs_filter)
    print len(var_thrIDs_list)
    Nothr = len(thrL)
    Group_name = str(accessOp) +"by" + str(Nothr) + "Threads"
    # print Group_name
    Var_filter = map(lambda v : v[0], var_thrIDs_list)
    a = {"var_list": list(Var_filter), "G_thrIDs":thrL}
    var_group.update( {Group_name: a})

    # print "var_group ", var_group
    return var_group

def get_variables_list(origin_list, op):
    # To get variables that are access by threads
    first_item = []
    filter_vars = filter(lambda row : row[2]== str(op) and not  row[3]=="", origin_list)
    vars_list = list(filter_vars)
    print "Lengh of total variables with access type of " + str(op)
    print len(vars_list)

    var_names = map(lambda var : var[3], vars_list)
    # Remover Duplicates
    var_name_dict = dict.fromkeys(list(var_names))
    var_name_list = list(var_name_dict)
    # print var_name_list
    print "number of variables with access type of " + str(op)
    print len(var_name_list)
    threads_loads_var = {}
    # Obtain the thread list that accessed each variable
    for n in var_name_list:
        var_rows = filter(lambda  row: row[3] == n , vars_list)
        var_rows_list = list(var_rows)
        var_thr = map(lambda r : r[1], var_rows_list)
        var_thr_list = list(var_thr)
        # print " var_thr_list ", var_thr_list
        # Remove Duplicates
        var_thr_dict = dict.fromkeys(var_thr_list)
        var_thr_list = list(var_thr_dict)
        b = { n:  var_thr_list}
        threads_loads_var.update(b)
    print threads_loads_var
    # get the list of number of threads for each variables
    var_Nothrs = map(lambda val : len(val), threads_loads_var.itervalues())
    print list(var_Nothrs), len(list(var_Nothrs))
    # Set the groups of variables that are loaded by threads
    var_group = {}
    try:
        first_item = threads_loads_var.itervalues().next()
        # print "first_item ", first_item
        var_group = create_groups(first_item, threads_loads_var, op)
        return var_group
    except:
        print "An exception occurred"
        return []


def main():
  print "----Main------- "
  var_name_list = []
  Var_load_groups = {}
  opList = ["STORE", "LOAD"]
  with open('PowerWindowRosace.txt') as csv_file: 
      csv_reader = csv.reader(csv_file, delimiter=',')
      #filter_vars = filter(lambda row : row[2]== str(op) and not  row[3]=="", csv_reader)
      #vars_list = list(filter_vars)
      #print "Lengh of total variables with access type of " + str(op)
      #print len(vars_list)
      for a in opList:
          print "---------------" + a + "------------------"
          varLoad_group = get_variables_list(csv_reader, str(a))
          Var_load_groups.update(varLoad_group)
          # print Var_load_groups
          csv_file.seek(0,0)
      print Var_load_groups





  
if __name__== "__main__":
  main()







