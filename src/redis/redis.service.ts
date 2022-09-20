import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setRank(key: string, value: number): Promise<boolean> {
    try {
      const originalValue: number = await this.cacheManager.get(key);
      await this.cacheManager.set(key, originalValue + value);
      return true;
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }

  async getRankings() {
    try {
      const keys = await this.cacheManager.store.keys();
      const allRanking = {};
      for (const key of keys) {
        allRanking[key] = await this.cacheManager.get(key);
      }
      return allRanking;
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }
}
