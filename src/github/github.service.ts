import { GitHubRepo } from './entities/github-repo.entity';
import {
  HttpException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor() {
    // TODO add authentication https://octokit.github.io/rest.js/v18#authentication
    this.octokit = new Octokit();
  }

  async repo(owner: string, repo: string): Promise<GitHubRepo> {
    try {
      return (await this.octokit.rest.repos.get({ owner, repo })).data;
    } catch (e) {
      if (e.status === 404) {
        throw new NotFoundException(`Repo ${owner}/${repo} not found`);
      } else {
        throw new BadRequestException();
      }
    }
  }
}
