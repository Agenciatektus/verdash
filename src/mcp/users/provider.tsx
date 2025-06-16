import React, { createContext, useContext, useState, useCallback } from 'react';
import { Permission, Role, User } from './model';
import { UsersController } from './controller';
import { UsersModel } from './model';

interface UsersContextData {
  // Estado
  permissions: Permission[];
  roles: Role[];
  users: User[];
  isLoading: boolean;
  error: string | null;

  // Permissões
  createPermission: (permissionData: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Permission>;
  updatePermission: (id: string, permissionData: Partial<Permission>) => Promise<Permission>;
  deletePermission: (id: string) => Promise<void>;
  getPermission: (id: string) => Promise<Permission>;
  listPermissions: (filters?: Partial<Permission>) => Promise<Permission[]>;

  // Papéis
  createRole: (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Role>;
  updateRole: (id: string, roleData: Partial<Role>) => Promise<Role>;
  deleteRole: (id: string) => Promise<void>;
  getRole: (id: string) => Promise<Role>;
  listRoles: (filters?: Partial<Role>) => Promise<Role[]>;

  // Usuários
  createUser: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<User>;
  updateUser: (id: string, userData: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  getUser: (id: string) => Promise<User>;
  listUsers: (filters?: Partial<User>) => Promise<User[]>;
  getUserByEmail: (email: string) => Promise<User>;
  updateUserStatus: (id: string, status: User['status']) => Promise<User>;
  updateUserLastLogin: (id: string) => Promise<User>;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const model = new UsersModel();
  const controller = new UsersController(model);

  const handleError = useCallback((error: Error) => {
    setError(error.message);
    setIsLoading(false);
  }, []);

  // Permissões
  const createPermission = useCallback(async (permissionData: Omit<Permission, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const permission = await controller.createPermission(permissionData);
      setPermissions(prev => [...prev, permission]);
      setIsLoading(false);
      return permission;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const updatePermission = useCallback(async (id: string, permissionData: Partial<Permission>) => {
    setIsLoading(true);
    try {
      const permission = await controller.updatePermission(id, permissionData);
      setPermissions(prev => prev.map(p => p.id === id ? permission : p));
      setIsLoading(false);
      return permission;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const deletePermission = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await controller.deletePermission(id);
      setPermissions(prev => prev.filter(p => p.id !== id));
      setIsLoading(false);
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const getPermission = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const permission = await controller.getPermission(id);
      setIsLoading(false);
      return permission;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const listPermissions = useCallback(async (filters?: Partial<Permission>) => {
    setIsLoading(true);
    try {
      const permissions = await controller.listPermissions(filters);
      setPermissions(permissions);
      setIsLoading(false);
      return permissions;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  // Papéis
  const createRole = useCallback(async (roleData: Omit<Role, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const role = await controller.createRole(roleData);
      setRoles(prev => [...prev, role]);
      setIsLoading(false);
      return role;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const updateRole = useCallback(async (id: string, roleData: Partial<Role>) => {
    setIsLoading(true);
    try {
      const role = await controller.updateRole(id, roleData);
      setRoles(prev => prev.map(r => r.id === id ? role : r));
      setIsLoading(false);
      return role;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const deleteRole = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await controller.deleteRole(id);
      setRoles(prev => prev.filter(r => r.id !== id));
      setIsLoading(false);
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const getRole = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const role = await controller.getRole(id);
      setIsLoading(false);
      return role;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const listRoles = useCallback(async (filters?: Partial<Role>) => {
    setIsLoading(true);
    try {
      const roles = await controller.listRoles(filters);
      setRoles(roles);
      setIsLoading(false);
      return roles;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  // Usuários
  const createUser = useCallback(async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      const user = await controller.createUser(userData);
      setUsers(prev => [...prev, user]);
      setIsLoading(false);
      return user;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const updateUser = useCallback(async (id: string, userData: Partial<User>) => {
    setIsLoading(true);
    try {
      const user = await controller.updateUser(id, userData);
      setUsers(prev => prev.map(u => u.id === id ? user : u));
      setIsLoading(false);
      return user;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const deleteUser = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await controller.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      setIsLoading(false);
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const getUser = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const user = await controller.getUser(id);
      setIsLoading(false);
      return user;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const listUsers = useCallback(async (filters?: Partial<User>) => {
    setIsLoading(true);
    try {
      const users = await controller.listUsers(filters);
      setUsers(users);
      setIsLoading(false);
      return users;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const getUserByEmail = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      const user = await controller.getUserByEmail(email);
      setIsLoading(false);
      return user;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const updateUserStatus = useCallback(async (id: string, status: User['status']) => {
    setIsLoading(true);
    try {
      const user = await controller.updateUserStatus(id, status);
      setUsers(prev => prev.map(u => u.id === id ? user : u));
      setIsLoading(false);
      return user;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  const updateUserLastLogin = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const user = await controller.updateUserLastLogin(id);
      setUsers(prev => prev.map(u => u.id === id ? user : u));
      setIsLoading(false);
      return user;
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [controller, handleError]);

  return (
    <UsersContext.Provider
      value={{
        permissions,
        roles,
        users,
        isLoading,
        error,
        createPermission,
        updatePermission,
        deletePermission,
        getPermission,
        listPermissions,
        createRole,
        updateRole,
        deleteRole,
        getRole,
        listRoles,
        createUser,
        updateUser,
        deleteUser,
        getUser,
        listUsers,
        getUserByEmail,
        updateUserStatus,
        updateUserLastLogin,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers deve ser usado dentro de um UsersProvider');
  }
  return context;
}; 