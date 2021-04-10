import { CacheModule, Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [CacheModule.register({ ttl: 86400 })],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
