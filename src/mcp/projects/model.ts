import { z } from 'zod';

// Schema de validação para um projeto
export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ownerId: z.string(),
  members: z.array(z.string()),
  status: z.enum(['active', 'archived', 'deleted']),
  settings: z.object({
    theme: z.string().optional(),
    visibility: z.enum(['public', 'private']),
    notifications: z.boolean(),
  }),
});

// Tipo inferido do schema
export type Project = z.infer<typeof ProjectSchema>;

// Interface para operações do modelo
export interface IProjectModel {
  create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  update(id: string, project: Partial<Project>): Promise<Project>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Project>;
  list(filters?: Partial<Project>): Promise<Project[]>;
}

// Implementação do modelo
export class ProjectModel implements IProjectModel {
  private projects: Project[] = [];

  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.projects.push(newProject);
    return newProject;
  }

  async update(id: string, project: Partial<Project>): Promise<Project> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Projeto não encontrado');

    const updatedProject = {
      ...this.projects[index],
      ...project,
      updatedAt: new Date(),
    };

    this.projects[index] = updatedProject;
    return updatedProject;
  }

  async delete(id: string): Promise<void> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Projeto não encontrado');
    this.projects.splice(index, 1);
  }

  async getById(id: string): Promise<Project> {
    const project = this.projects.find(p => p.id === id);
    if (!project) throw new Error('Projeto não encontrado');
    return project;
  }

  async list(filters?: Partial<Project>): Promise<Project[]> {
    if (!filters) return this.projects;

    return this.projects.filter(project => {
      return Object.entries(filters).every(([key, value]) => {
        return project[key as keyof Project] === value;
      });
    });
  }
} 