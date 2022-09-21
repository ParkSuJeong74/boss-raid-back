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
      const newValue = value + originalValue;
      await this.cacheManager.set(key, newValue);

      return true;
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }

  async getRankings(ids): Promise<{ user: number; score: number }[]> {
    try {
      const arr = [];
      for (const key of ids) {
        const json = {};
        json['user'] = key.user_id;
        json['score'] = await this.cacheManager.get(key.user_id.toString());
        arr.push(json);
      }

      arr.sort((a, b) => {
        return b.score - a.score;
      });
      return arr;
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }

  async getScore(user_id: string) {
    try {
      return await this.cacheManager.get(user_id);
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }
}
