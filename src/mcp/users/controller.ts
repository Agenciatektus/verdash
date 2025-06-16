import { Permission, Role, User, IUsersModel } from './model';

export interface IUsersController {
  // Permissões
  createPermission(permissionData: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>): Promise<Permission>;
  updatePermission(id: string, permissionData: Partial<Permission>): Promise<Permission>;
  deletePermission(id: string): Promise<void>;
  getPermission(id: string): Promise<Permission>;
  listPermissions(filters?: Partial<Permission>): Promise<Permission[]>;

  // Papéis
  createRole(roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role>;
  updateRole(id: string, roleData: Partial<Role>): Promise<Role>;
  deleteRole(id: string): Promise<void>;
  getRole(id: string): Promise<Role>;
  listRoles(filters?: Partial<Role>): Promise<Role[]>;

  // Usuários
  createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  updateUser(id: string, userData: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getUser(id: string): Promise<User>;
  listUsers(filters?: Partial<User>): Promise<User[]>;
  getUserByEmail(email: string): Promise<User>;
  updateUserStatus(id: string, status: User['status']): Promise<User>;
  updateUserLastLogin(id: string): Promise<User>;
}

export class UsersController implements IUsersController {
  constructor(private model: IUsersModel) {}

  // Permissões
  async createPermission(permissionData: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>): Promise<Permission> {
    try {
      return await this.model.createPermission(permissionData);
    } catch (error) {
      console.error('Erro ao criar permissão:', error);
      throw new Error('Falha ao criar permissão');
    }
  }

  async updatePermission(id: string, permissionData: Partial<Permission>): Promise<Permission> {
    try {
      return await this.model.updatePermission(id, permissionData);
    } catch (error) {
      console.error('Erro ao atualizar permissão:', error);
      throw new Error('Falha ao atualizar permissão');
    }
  }

  async deletePermission(id: string): Promise<void> {
    try {
      await this.model.deletePermission(id);
    } catch (error) {
      console.error('Erro ao deletar permissão:', error);
      throw new Error('Falha ao deletar permissão');
    }
  }

  async getPermission(id: string): Promise<Permission> {
    try {
      return await this.model.getPermission(id);
    } catch (error) {
      console.error('Erro ao buscar permissão:', error);
      throw new Error('Falha ao buscar permissão');
    }
  }

  async listPermissions(filters?: Partial<Permission>): Promise<Permission[]> {
    try {
      return await this.model.listPermissions(filters);
    } catch (error) {
      console.error('Erro ao listar permissões:', error);
      throw new Error('Falha ao listar permissões');
    }
  }

  // Papéis
  async createRole(roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>): Promise<Role> {
    try {
      return await this.model.createRole(roleData);
    } catch (error) {
      console.error('Erro ao criar papel:', error);
      throw new Error('Falha ao criar papel');
    }
  }

  async updateRole(id: string, roleData: Partial<Role>): Promise<Role> {
    try {
      return await this.model.updateRole(id, roleData);
    } catch (error) {
      console.error('Erro ao atualizar papel:', error);
      throw new Error('Falha ao atualizar papel');
    }
  }

  async deleteRole(id: string): Promise<void> {
    try {
      await this.model.deleteRole(id);
    } catch (error) {
      console.error('Erro ao deletar papel:', error);
      throw new Error('Falha ao deletar papel');
    }
  }

  async getRole(id: string): Promise<Role> {
    try {
      return await this.model.getRole(id);
    } catch (error) {
      console.error('Erro ao buscar papel:', error);
      throw new Error('Falha ao buscar papel');
    }
  }

  async listRoles(filters?: Partial<Role>): Promise<Role[]> {
    try {
      return await this.model.listRoles(filters);
    } catch (error) {
      console.error('Erro ao listar papéis:', error);
      throw new Error('Falha ao listar papéis');
    }
  }

  // Usuários
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      return await this.model.createUser(userData);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Falha ao criar usuário');
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      return await this.model.updateUser(id, userData);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Falha ao atualizar usuário');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.model.deleteUser(id);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw new Error('Falha ao deletar usuário');
    }
  }

  async getUser(id: string): Promise<User> {
    try {
      return await this.model.getUser(id);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw new Error('Falha ao buscar usuário');
    }
  }

  async listUsers(filters?: Partial<User>): Promise<User[]> {
    try {
      return await this.model.listUsers(filters);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw new Error('Falha ao listar usuários');
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      return await this.model.getUserByEmail(email);
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      throw new Error('Falha ao buscar usuário por email');
    }
  }

  async updateUserStatus(id: string, status: User['status']): Promise<User> {
    try {
      return await this.model.updateUserStatus(id, status);
    } catch (error) {
      console.error('Erro ao atualizar status do usuário:', error);
      throw new Error('Falha ao atualizar status do usuário');
    }
  }

  async updateUserLastLogin(id: string): Promise<User> {
    try {
      return await this.model.updateUserLastLogin(id);
    } catch (error) {
      console.error('Erro ao atualizar último login do usuário:', error);
      throw new Error('Falha ao atualizar último login do usuário');
    }
  }
} 