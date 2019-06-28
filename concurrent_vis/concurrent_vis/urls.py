"""concurrent_vis URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from multithreaded_vis import views, tests


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
    url(r'logical_data', views.logical_data, name='logical_data'),
    url(r'logical_comp', views.logical_comp, name='logical_comp'),
    url(r'cy', tests.cy, name='cy'),
    url(r'draw2d', tests.draw2d, name='draw2d'),
    url(r'no_canvas', tests.no_canvas, name='no_canvas'),
    url(r'gojs', tests.gojs, name='gojs'),
    url(r'mxGraph', tests.mxgraph, name='mxGraph'),
    url(r'Logical_Data_L0', views.logical_data_l0, name='logical_data_L0'),
    url(r'catastrophe', views.catastrophe, name='catastrophe'),
    url(r'Logical_Data_L1', views.logical_data_l1, name='Logical_Data_L1'),
    url(r'Logical_Data_L2', views.logical_data_l2, name='Logical_Data_L2'),
]
