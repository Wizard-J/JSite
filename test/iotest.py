import os


file =  open("./test.txt","a+")
file.write("123\n")
file.write("123\n")
file.close()
with open("./test.txt") as f:
    for line in f.readlines():
        print(">>>",line)