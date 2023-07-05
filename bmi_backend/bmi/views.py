from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .models import User
from bmi.serializers import UserSerializer, BMIRecordSerializer, UserLoginSerializer
from bmi.models import User, BMIRecord



class LoginAPIView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return Response({'name': username, 'id': user.id})
            else:
                return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                name = user.username
                user_id = user.id

                return Response({'name': name, 'id': user_id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response('Email already exists.', status=status.HTTP_400_BAD_REQUEST)

        if 'username' in serializer.errors.keys() or 'email' in serializer.errors.keys():
            error_msg = "Username or Email already exists"
        else:
            error_msg = "Backend error. Please try again later."

        return Response(error_msg, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny    

class BMIRecordList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user_id = request.GET.get('user_id')
        user = User.objects.get(id=user_id)
        bmi_records = BMIRecord.objects.filter(user=user)
        serializer = BMIRecordSerializer(bmi_records, many=True)
        data = {
            'email': user.email,
            'name': user.username,
            'bmi_records': serializer.data
        }
        return Response(data)

    def post(self, request):
        serializer = BMIRecordSerializer(data=request.data)
        if serializer.is_valid():
            height = serializer.validated_data['height']
            weight = serializer.validated_data['weight']
            age = serializer.validated_data['age']

            # Calculate BMI
            bmi = weight / ((height/100) ** 2)
            bmi = round(bmi, 2)
            # Determine BMI category
            if bmi < 18.5:
                category = "underweight"
            elif bmi < 25:
                category = "normal"
            elif bmi < 30:
                category = "overweight"
            else:
                category = "obese"

            # Add BMI value and category to serializer data
            serializer.validated_data['bmi'] = bmi
            serializer.validated_data['category'] = category

            # Save BMI record
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

