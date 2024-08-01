from django.shortcuts import render,redirect
# from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from .EmailBackend import EmailBackend
from .models import User

# Create your views here.
def index(request):
    return render(request, 'pages/index.html')

def about_us(request):
    return render(request, 'pages/about_us.html')

def contact(request):
    return render(request, 'pages/contact.html')

def courses(request):
    return render(request, 'pages/courses.html')

def single_course(request):
    return render(request, 'pages/course_single.html')

def cart(request):
    return render(request, 'pages/cart.html')

def log_in(request):
    if request.method=="POST":
        username=request.POST['username']
        password=request.POST['password']

        user = EmailBackend.authenticate(request, username=username, password=password)

        if user!=None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid credentials')
            return redirect('login')
        
    return render(request, 'pages/login.html')

def register(request):
    if request.method=='POST':
        first_name=request.POST['first_name']
        last_name=request.POST['last_name']
        phone=request.POST['phone_number']
        username=request.POST['username']
        email=request.POST['email']
        password=request.POST['password']
        password1=request.POST['password_confirmation']

        print(first_name, last_name, phone, username,email, password, password1)

        if User.objects.filter(email=email).exists():
            messages.warning(request, 'Email already exists')
            return redirect('register')
        if User.objects.filter(username=username).exists():
            messages.warning(request, 'Username already exists')
            return redirect('register')
        if password != password1:
            messages.warning(request, 'Password do not match')
            return redirect('register')
        else:
            user=User(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                phone=phone
            )
            user.set_password(password)
            user.save()
            messages.success(request, 'Account created successfully')
            return redirect('login')
        

    return render(request, 'pages/register.html')

def log_out(request):
    logout(request)
    return redirect('login')