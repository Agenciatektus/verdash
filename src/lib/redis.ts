import { createClient } from 'redis';

// Cliente Redis singleton
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = createClient({
  url: redisUrl,
});

redis.on('error', (err) => console.error('Erro no cliente Redis:', err));
redis.on('connect', () => console.log('Cliente Redis conectado'));

// Funções auxiliares para cache
export const cache = {
  // Obter valor do cache
  async get<T>(key: string): Promise<T | null> {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },

  // Definir valor no cache
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const stringValue = JSON.stringify(value);
    if (ttl) {
      await redis.setEx(key, ttl, stringValue);
    } else {
      await redis.set(key, stringValue);
    }
  },

  // Remover valor do cache
  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  // Limpar cache por padrão
  async clear(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  },

  // Verificar se chave existe
  async exists(key: string): Promise<boolean> {
    return (await redis.exists(key)) === 1;
  },

  // Incrementar contador
  async incr(key: string): Promise<number> {
    return await redis.incr(key);
  },

  // Decrementar contador
  async decr(key: string): Promise<number> {
    return await redis.decr(key);
  },

  // Definir tempo de expiração
  async expire(key: string, ttl: number): Promise<void> {
    await redis.expire(key, ttl);
  },

  // Obter tempo restante de expiração
  async ttl(key: string): Promise<number> {
    return await redis.ttl(key);
  },
};

// Funções auxiliares para rate limiting
export const rateLimit = {
  // Verificar se requisição excede limite
  async check(key: string, limit: number, window: number): Promise<boolean> {
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, window);
    }
    return current <= limit;
  },

  // Obter contagem atual
  async getCount(key: string): Promise<number> {
    return parseInt(await redis.get(key) || '0');
  },

  // Resetar contador
  async reset(key: string): Promise<void> {
    await redis.del(key);
  },
};

// Funções auxiliares para locks distribuídos
export const lock = {
  // Tentar obter lock
  async acquire(key: string, ttl: number): Promise<boolean> {
    return (await redis.set(key, '1', { NX: true, EX: ttl })) === 'OK';
  },

  // Liberar lock
  async release(key: string): Promise<void> {
    await redis.del(key);
  },

  // Verificar se lock existe
  async exists(key: string): Promise<boolean> {
    return await cache.exists(key);
  },
};

// Funções auxiliares para pub/sub
export const pubsub = {
  // Publicar mensagem
  async publish(channel: string, message: any): Promise<void> {
    await redis.publish(channel, JSON.stringify(message));
  },

  // Inscrever em canal
  async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
    const subscriber = redis.duplicate();
    await subscriber.connect();
    await subscriber.subscribe(channel, (message) => {
      callback(JSON.parse(message));
    });
  },

  // Cancelar inscrição
  async unsubscribe(channel: string): Promise<void> {
    await redis.unsubscribe(channel);
  },
}; 