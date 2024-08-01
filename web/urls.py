from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('about/',views.about_us,name='aboutus'),
    path('contact/',views.contact,name='contact'),
    path('courses/',views.courses, name='courses'),
    path('single/',views.single_course, name='single'),
    path('cart/',views.cart, name='cart'),


    path('login/',views.log_in, name='login'),
    path('logout/',views.log_out, name='logout'),
    path('register/',views.register, name='register'),

]
