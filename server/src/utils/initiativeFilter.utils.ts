import { Prisma } from '@prisma/client';

export const buildQueryInitiative = (params): Prisma.InitiativeWhereInput => {
  const query = {} as any;

  if (params.country !== undefined && params.country !== '') {
    query.country = params.country;
  }

  if (params.province !== undefined && params.province !== '') {
    query.province = params.province;
  }

  if (params.name !== undefined && params.name !== '') {
    query.title = {
      contains: params.name,
    };
  }

  if (params.categories !== undefined && params.categories !== '') {
    query.categories = {
      has: params.categories,
    };
  }

  if (params.languages !== undefined && params.languages !== '') {
    query.languages = {
      has: params.languages,
    };
  }

  if (params.themes !== undefined && params.themes !== '') {
    query.themes = {
      has: params.themes,
    };
  }

  if (params.opportunities !== undefined && params.opportunities !== '') {
    query.opportunities = {
      has: 'Op5',
    };
  }
  return query;
};
