from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Find a Coach API",
        default_version="v1",
        description="A Django API made for the main project from Vue - The Complete Course",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="christiangonzalezblack@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
  public=True,
  permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Django admin
    path('myadmin/', admin.site.urls),

    # API
    path('', include('coaches.urls')),

    # Login functionality
    path('auth/', include('rest_framework.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),

    # Create new API user
    path('signup/', include('dj_rest_auth.registration.urls')),

    # swagger
    path('swagger/', schema_view.with_ui(
        'swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui(
        'redoc', cache_timeout=0), name='schema-redoc')
]
