import base64

path = "E:\\project\\JSite\\front_end\\src\\statics\\img\\sidebar-bg.jpg"


with open(path,"rb") as f:
    img = f.read()
    # print(base64.b64encode(img))

    encoded = base64.b64encode(img)

    with open("./sidebar-bg-b64","wb") as coded:
        coded.write(encoded)
    