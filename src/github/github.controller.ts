import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GitHubRepo } from './entities/github-repo.entity';
import { GithubService } from './github.service';

@ApiTags('GitHub')
@Controller('github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get('/repos/:owner/:repo')
  async repo(
    @Param('owner') owner: string,
    @Param('repo') repo: string,
  ): Promise<GitHubRepo> {
    return this.githubService.repo(owner, repo);
  }
}
