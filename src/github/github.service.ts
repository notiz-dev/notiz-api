import { ConfigService } from '@nestjs/config';
import { GitHubRepo } from './entities/github-repo.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor(private config: ConfigService) {
    // using personal access token - https://octokit.github.io/rest.js/v18#authentication
    this.octokit = new Octokit({ auth: config.get('GITHUB_TOKEN') });
  }

  async repo(owner: string, repo: string): Promise<GitHubRepo> {
    try {
      const response = await this.octokit.rest.repos.get({ owner, repo });
      return response.data;
    } catch (e) {
      if (e.status === 404) {
        throw new NotFoundException(`Repo ${owner}/${repo} not found`);
      } else {
        throw new BadRequestException();
      }
    }
  }
}
