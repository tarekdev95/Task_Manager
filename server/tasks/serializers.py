from rest_framework import serializers
from .models import Task
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
    def validate_assignee(self, user):
        proj = self.initial_data.get('project')
        if user and user not in Task.objects.get(pk=self.instance.pk).project.members.all():
            raise serializers.ValidationError('User not in project')
        return user