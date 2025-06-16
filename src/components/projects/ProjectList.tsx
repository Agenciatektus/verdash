import React, { useEffect } from 'react';
import { useProjects } from '@/mcp/projects/provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const ProjectList: React.FC = () => {
  const { projects, loading, error, listProjects, createProject } = useProjects();

  useEffect(() => {
    listProjects();
  }, [listProjects]);

  const handleCreateProject = async () => {
    await createProject({
      name: 'Novo Projeto',
      description: 'Descrição do novo projeto',
      ownerId: 'user123', // Em um caso real, isso viria do contexto de autenticação
      members: ['user123'],
      status: 'active',
      settings: {
        visibility: 'private',
        notifications: true,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Erro: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projetos</h2>
        <Button onClick={handleCreateProject}>
          Criar Novo Projeto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{project.description}</p>
              <div className="mt-4">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {project.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}; 