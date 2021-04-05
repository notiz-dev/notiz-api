import { HttpModule, Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
