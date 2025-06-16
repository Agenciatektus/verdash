import { Project, IProjectModel } from './model';

export interface IProjectController {
  createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  updateProject(id: string, projectData: Partial<Project>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  getProject(id: string): Promise<Project>;
  listProjects(filters?: Partial<Project>): Promise<Project[]>;
}

export class ProjectController implements IProjectController {
  constructor(private model: IProjectModel) {}

  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.create(projectData);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw new Error('Falha ao criar projeto');
    }
  }

  async updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
    try {
      // Aqui você pode adicionar validações adicionais ou lógica de negócio
      return await this.model.update(id, projectData);
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      throw new Error('Falha ao atualizar projeto');
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      await this.model.delete(id);
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      throw new Error('Falha ao deletar projeto');
    }
  }

  async getProject(id: string): Promise<Project> {
    try {
      return await this.model.getById(id);
    } catch (error) {
      console.error('Erro ao buscar projeto:', error);
      throw new Error('Falha ao buscar projeto');
    }
  }

  async listProjects(filters?: Partial<Project>): Promise<Project[]> {
    try {
      return await this.model.list(filters);
    } catch (error) {
      console.error('Erro ao listar projetos:', error);
      throw new Error('Falha ao listar projetos');
    }
  }
} 