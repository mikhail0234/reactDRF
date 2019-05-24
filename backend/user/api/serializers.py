
from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):

        if User.objects.filter(username=validated_data['user']['username']).exists():
            error_messages = {"username": {"Error": "This username already exist"}}
            raise serializers.ValidationError(error_messages)

        user = User.objects.create(
            username=validated_data['user']['username'],
            email=validated_data['user']['email'],
            first_name=validated_data['user']['first_name'],
            last_name=validated_data['user']['last_name'],
        )
        return Profile.objects.create(user=user, fatherName=validated_data['fatherName'], phone_number=validated_data['phone_number'])

    def update(self, instance, validated_data):
        instance.fatherName = validated_data.get('fatherName', instance.fatherName)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)


        user = instance.user
        if user.username != validated_data['user']['username'] and User.objects.filter(username=validated_data['user']['username']).exists():
            error_messages = {"username": {"Error": "This username already exist"}}
            raise serializers.ValidationError(error_messages)

        user.email = validated_data['user']['email']
        user.first_name = validated_data['user']['first_name']
        user.last_name = validated_data['user']['last_name']
        user.username = validated_data['user']['username']

        user.save()
        instance.save()
        return instance

