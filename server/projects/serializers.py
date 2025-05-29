from rest_framework import serializers
from .models import Project
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
    def create(self, validated):
        owner = self.context['request'].user
        proj = Project.objects.create(owner=owner, **validated)
        proj.members.add(owner)
        return proj