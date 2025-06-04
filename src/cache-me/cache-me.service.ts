import { Injectable, Inject } from '@nestjs/common';
import { CreateCacheMeDto } from './dto/create-cache-me.dto';
import { UpdateCacheMeDto } from './dto/update-cache-me.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheMeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async create(createCacheMeDto: CreateCacheMeDto) {
    const { key, value, ttl } = createCacheMeDto;
    try {
      if (ttl) {
        await this.cacheManager.set(key, value, ttl * 1000);
        return {
          success: true,
          message: `Cache entry created successfully`,
          data: {
            key: key,
            value: value,
            seconds: ttl,
          },
        };
      } else {
        await this.cacheManager.set(key, value);
        return {
          success: true,
          message: `Cache entry created successfully`,
          data: {
            key,
            value,
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to create cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }
  async get(key: string) {
    try {
      const value = await this.cacheManager.get(key);
      if (value) {
        return {
          success: true,
          message: `Cache entry retrieved successfully`,
          data: { key, value },
        };
      } else {
        return {
          success: false,
          message: `Cache entry not found for key: ${key}`,
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to retrieve cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }
  async update(key: string, updateCacheMeDto: UpdateCacheMeDto) {
    const { value, ttl } = updateCacheMeDto;
    try {
      if (ttl) {
        await this.cacheManager.set(key, value, ttl * 1000);
        return {
          success: true,
          message: `Cache entry updated successfully`,
          data: { key, value, seconds: ttl },
        };
      } else {
        await this.cacheManager.set(key, value);
        return {
          success: true,
          message: `Cache entry updated successfully`,
          data: { key, value },
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to update cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }
  async remove(key: string) {
    try {
      await this.cacheManager.del(key);
      return {
        success: true,
        message: `Cache entry removed successfully for key: ${key}`,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to remove cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }
}
