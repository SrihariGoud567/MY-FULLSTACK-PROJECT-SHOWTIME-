from django.urls import path
from .views import movie_list, movie_detail, create_movie, update_movie, delete_movie


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', movie_list),
    path('<int:movie_id>/', movie_detail),
     path('admin/create/', create_movie),
    path('admin/update/<int:movie_id>/', update_movie),
    path('admin/delete/<int:movie_id>/', delete_movie),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


