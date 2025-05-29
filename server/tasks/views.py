from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """
    CRUD complet pour les projets :
    - list, retrieve, create, update, partial_update, destroy
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Le champ owner est automatique : l'utilisateur connecté
        serializer.save(owner=self.request.user)


class TaskViewSet(viewsets.ModelViewSet):
    """
    CRUD complet pour les tâches :
    - list, retrieve, create, update, partial_update, destroy
    """
    queryset = Task.objects.select_related('project', 'assignee').all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

