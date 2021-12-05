import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GitHubRepo } from './entities/github-repo.entity';
import { OpenSource } from './entities/open-source.entity';
import { GithubService } from './github.service';

const DAY_CACHE = 60 * 60 * 24;

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get('/repos/:owner/:repo')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DAY_CACHE)
  async repo(
    @Param('owner') owner: string,
    @Param('repo') repo: string,
  ): Promise<GitHubRepo> {
    return this.githubService.repo(owner, repo);
  }

  @Get('/openSource')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DAY_CACHE)
  async openSource(): Promise<OpenSource[]> {
    return this.githubService.openSource();
  }
}
