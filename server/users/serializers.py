from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'avatar', 'password', 'confirm_password')
        read_only_fields = ('id',)
    
    def validate(self, attrs):
        pwd = attrs.get('password')
        pwd2 = attrs.get('confirm_password')
        
        # Si on fournit un mot de passe, on exige la confirmation
        if pwd or pwd2:
            if not pwd or not pwd2:
                raise serializers.ValidationError("Les deux champs de mot de passe sont obligatoires.")
            if pwd != pwd2:
                raise serializers.ValidationError("Les mots de passe ne correspondent pas.")
            # applique les validateurs Django (longueur, complexité…)
            validate_password(pwd, user=self.instance)
        
        return attrs

    def create(self, validated_data):
        pwd = validated_data.pop('password', None)
        validated_data.pop('confirm_password', None)
        user = User(**validated_data)
        if pwd:
            user.set_password(pwd)
        else:
            user.set_unusable_password()
        user.save()
        return user
    
    def update(self, instance, validated_data):
        pwd = validated_data.pop('password', None)
        validated_data.pop('confirm_password', None)
        
        for attr, val in validated_data.items():
            setattr(instance, attr, val)
        
        if pwd:
            instance.set_password(pwd)
        instance.save()
        return instance
