import { openSourceRepos } from './open-source';
import { ConfigService } from '@nestjs/config';
import { GitHubRepo } from './entities/github-repo.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { OpenSource } from './entities/open-source.entity';

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

  async openSource(): Promise<OpenSource[]> {
    const repoRequest = openSourceRepos
      .filter((r) => !r.private)
      .map((r) => this.repo(r.owner, r.repo));
    const githubRepos = await Promise.all(repoRequest);
    return githubRepos
      .map((r) => {
        return {
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          stargazers_count: r.stargazers_count,
          language: r.language,
          default_branch: r.default_branch,
          readme_url: `https://raw.githubusercontent.com/${r.owner.login}/${r.name}/${r.default_branch}/README.md`,
        };
      })
      .sort((r1, r2) => r2.stargazers_count - r1.stargazers_count);
  }
}
