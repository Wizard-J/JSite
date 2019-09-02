from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout

# 登录
def user_login(request):
    username = request.POST['username']
    password = request.POST['password']
    
    # Django提供的authenticate函数，验证用户名和密码是否在数据库中匹配
    user = authenticate(username=username, password=password)

    if user is not None:
        # Django提供的login函数，将当前登录用户信息保存到会话key中
        login(request,user)
        print("---登录成功---\n 用户名:%s%s"%(username,password))

        # 进行登录成功的操作，重定向到某处等
    else:
        # 返回用户名和密码错误信息
        print("---登录失败---")

    return HttpResponse()

# 注销
def user_logout(request):
    # logout函数会清除当前用户保存在会话中的信息
    logout(request)
    print("---用户登出---")
    return HttpResponse()

# 查询是否登录
def is_logged(request):
    user = request.user
    if user.is_authenticated:
        # 已登录用户，可以往下进行操作
        print("---已登录---")
    else:
        # 返回要求登录信息
        print("---未登录---")
    return HttpResponse()

# 查询是否有权限
def some_fuction(request):
    user = request.user
    if user.has_perm('myapp.change_bar'):
        # 有权限，可以往下进行操作
        pass
    else:
        # 返回禁止访问等信息
        pass

    return HttpResponse()