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

  async setRank(key: string, value: string): Promise<boolean> {
    try {
      await this.cacheManager.set(key, value);
      return true;
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }

  async getRank(key: string): Promise<string> {
    try {
      const value: string = (await this.cacheManager.get(key)) as string;
      return value;
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }
}
