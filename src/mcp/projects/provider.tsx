import React, { createContext, useContext, useState, useCallback } from 'react';
import { Project } from './model';
import { ProjectController } from './controller';
import { ProjectModel } from './model';

interface ProjectContextData {
  projects: Project[];
  loading: boolean;
  error: string | null;
  createProject: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (id: string, projectData: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getProject: (id: string) => Promise<Project>;
  listProjects: (filters?: Partial<Project>) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextData>({} as ProjectContextData);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inicializa o modelo e o controller
  const model = new ProjectModel();
  const controller = new ProjectController(model);

  const createProject = useCallback(async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const newProject = await controller.createProject(projectData);
      setProjects(prev => [...prev, newProject]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar projeto');
    } finally {
      setLoading(false);
    }
  }, [controller]);

  const updateProject = useCallback(async (id: string, projectData: Partial<Project>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedProject = await controller.updateProject(id, projectData);
      setProjects(prev => prev.map(project => 
        project.id === id ? updatedProject : project
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar projeto');
    } finally {
      setLoading(false);
    }
  }, [controller]);

  const deleteProject = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await controller.deleteProject(id);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar projeto');
    } finally {
      setLoading(false);
    }
  }, [controller]);

  const getProject = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      return await controller.getProject(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar projeto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [controller]);

  const listProjects = useCallback(async (filters?: Partial<Project>) => {
    try {
      setLoading(true);
      setError(null);
      const projectsList = await controller.listProjects(filters);
      setProjects(projectsList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao listar projetos');
    } finally {
      setLoading(false);
    }
  }, [controller]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        createProject,
        updateProject,
        deleteProject,
        getProject,
        listProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects deve ser usado dentro de um ProjectProvider');
  }
  return context;
}; 