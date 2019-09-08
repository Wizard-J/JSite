import os

if not os.path.exists("./test.txt"):
    with open("./test.txt","w+") as file:
        print(file.read())