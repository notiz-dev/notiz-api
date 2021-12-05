export interface OpenSourceRepo {
  owner: string;
  repo: string;
  private?: boolean;
}

export const openSourceRepos: OpenSourceRepo[] = [
  { owner: 'notiz-dev', repo: 'ngx-tailwind' },
  {
    owner: 'notiz-dev',
    repo: 'prisma-dbml-generator',
  },
  { owner: 'notiz-dev', repo: 'nestjs-prisma-starter' },
  { owner: 'marcjulian', repo: 'nestjs-prisma' },
  { owner: 'notiz-dev', repo: 'shortcodes', private: true },
];
