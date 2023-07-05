from django.urls import path
from bmi.views import UserList, BMIRecordList, LoginAPIView
urlpatterns = [
    path('api/users/', UserList.as_view(), name='user-list'),
    path('api/bmi/', BMIRecordList.as_view(), name='bmi-record-list'),
    path('api/login/', LoginAPIView.as_view(), name='api_login'),
]
