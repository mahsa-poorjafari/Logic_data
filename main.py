import csv


def remove_dups(a_list):
    # Remove Duplicates
    the_list = []
    var_thr_dict = dict.fromkeys(a_list)
    the_list = list(var_thr_dict)
    return the_list

def get_threads(a_list):
    Threads_map = map(lambda r : r[1], a_list)
    Threads_list = list(Threads_map)
    return Threads_list


def create_groups(thrL, loaded_var_list, accessOp):
    var_group = {}
    var_thrIDs_filter = filter(lambda t : t[1]== thrL, loaded_var_list.iteritems())
    var_thrIDs_list = list(var_thrIDs_filter)
    Nothr = len(thrL)
    print "\n"+ str(len(var_thrIDs_list))+" variables "+str(accessOp)+" by "+str(Nothr)+" threads. List in below:"
    print thrL
    if str(accessOp) == "MAIN":
        Group_name = "Only" + str(accessOp) + "Thread"
    else:
        Group_name = str(accessOp) +"by" + str(Nothr) + "Threads"
    # print Group_name
    Var_filter = map(lambda v : v[0], var_thrIDs_list)
    a = {"var_list": list(Var_filter), "G_thrIDs":thrL}
    var_group.update( {Group_name: a})

    # print "var_group ", var_group
    return var_group


def get_varNames(var_list, op):
    var_names = map(lambda var : var[3], var_list)
    # Remover Duplicates
    var_name_list = remove_dups(list(var_names))
    print "Number of ACTUAL variables of "+op+"= ", len(var_name_list)
    return var_name_list


def get_variables(a_list, op_list):

    filter_vars = filter(lambda row : row[2] in op_list  and not  row[3]=="", a_list)
    vars_list = list(filter_vars)
    print "TOTAL Lengh of variable list", len(vars_list)
    return vars_list


def variables_group(var_list, var_names, op):
    # To get variables that are access by threads

    threads_op_var = {}
    # Obtain the thread list that accessed each variable
    for n in var_names:
        var_rows = filter(lambda  row: row[3] == n , var_list)
        var_rows_list = list(var_rows)
        # get threads that operates these vars
        var_thr_list = get_threads(var_rows_list)
        # print " var_thr_list ", var_thr_list
        # Remove Duplicates
        var_thr_list = remove_dups(var_thr_list)
        b = { n:  var_thr_list}
        threads_op_var.update(b)
    # print threads_op_var

    # Calculate the SUm of threads for each variables
    var_sumThrs = map(lambda val : len(val), threads_op_var.itervalues())
    print list(var_sumThrs), len(list(var_sumThrs))
    return threads_op_var


def main():
  print "----Main------- "
  
  Var_groups = {}
  var_group = {}
  opList = ["STORE", "LOAD", "GETELEMENTPTR"]
  with open('PowerWindowRosace.txt') as csv_file: 
      csv_reader = csv.reader(csv_file, delimiter=',')

      mainThread_filter = filter(lambda  row: row[2] == "FUNCTIONCALL" and row[3] == "main" , csv_reader)
      mainThread_list = list(mainThread_filter)
      print mainThread_list
      mainThreadID = mainThread_list[0][1]
      exeTimeStamp = mainThread_list[0][0]
      print "Execution Date", exeTimeStamp

      # Create variable Group that all threads accessed
      # get all thread ids
      print "\n ===============ALL==================="
      csv_file.seek(0,0)
      allThread_list = get_threads(csv_reader) 
      Thread_list = remove_dups(allThread_list)
      print "allThread_list= ", Thread_list
      csv_file.seek(0,0)
      all_variables = get_variables(csv_reader, ["LOAD", "STORE"])
      all_var_names = get_varNames(all_variables, "ALL")
      print "All Vriable Names= ",all_var_names
      var_dict = variables_group(all_variables, all_var_names, "ALL")
      # print "================var_dict=============="
      # print var_dict
      var_group = create_groups(Thread_list, var_dict, "ALL")
      print "Group of variables accessd by ALL Threads= "
      print var_group
      Var_groups.update(var_group)

      mainThreadID_list = [mainThreadID]
      print mainThreadID_list

      var_group = create_groups(mainThreadID_list, var_dict, "MAIN")
      print "Group of variables accessd only by MAIN Threads= "
      print var_group
      Var_groups.update(var_group)


      # print "all_variables= ", all_variables
      # print "Number of variables = ", len(all_variables)

      # Create varaible Group based on operations
      for a in opList:
          print "\n ==============="+a+"==================="
          csv_file.seek(0,0)
          vars_list = get_variables(csv_reader, a)
          var_names = get_varNames(vars_list, str(a))
          var_dict = variables_group(vars_list, var_names, str(a))
          N5threads = var_dict.itervalues().next()
          var_group = create_groups(N5threads, var_dict, a)
          print "Group of variables with "+a+"access= "
          print var_group
          Var_groups.update(var_group)
          # print Var_load_groups

      # print Var_groups


  
if __name__== "__main__":
  main()







