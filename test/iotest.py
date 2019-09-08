import os

if not os.path.exists("./test.txt"):
    file =  open("./test.txt","a+")
    file.write("123")
    file.close()
    with open("./test.txt","r+") as f:
        print(f.read())