from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

class IsProjectMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.project.members.all()

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated, IsProjectMember)
    def get_queryset(self):
        return Task.objects.filter(project__members=self.request.user)