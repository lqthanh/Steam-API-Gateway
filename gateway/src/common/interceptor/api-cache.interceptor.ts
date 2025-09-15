import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ApiCacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const methodUrl = `${request.method}:${request.url}`;

    return new Observable((subscriber) => {
      this.cacheManager.get(methodUrl).then((cachedData) => {
        if (cachedData) {
          console.log('Returning cached data for', methodUrl);
          subscriber.next(cachedData);
          subscriber.complete();
        } else {
          next
            .handle()
            .pipe(
              tap((data) => {
                console.log('Caching data for', methodUrl);
                this.cacheManager.set(methodUrl, data, 5 * 60 * 1000);
              }),
            )
            .subscribe({
              next: (value) => subscriber.next(value),
              error: (err) => subscriber.error(err),
              complete: () => subscriber.complete(),
            });
        }
      });
    });
  }
}
