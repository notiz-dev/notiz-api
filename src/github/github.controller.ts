import { Controller, Get, HttpService, Param } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { GitHubRepo } from './entities/github-repo.entity';

@Controller('github')
export class GithubController {
  private githubApi = 'https://api.github.com';

  constructor(private httpService: HttpService) {}

  @Get('/repos/:repo')
  async repo(@Param('repo') repo: string) {
    // TODO add auth token
    return this.httpService
      .get<GitHubRepo>(`${this.githubApi}/repos/${repo}`)
      .pipe(map((response) => response.data));
  }
}
