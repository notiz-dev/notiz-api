import { HttpModule, Module } from '@nestjs/common';
import { GithubController } from './github.controller';

@Module({
  imports: [HttpModule],
  controllers: [GithubController],
})
export class GithubModule {}
