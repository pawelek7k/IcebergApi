// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Articles, ArticlesData, ArticlesPatch, ArticlesQuery } from './articles.schema'

export type { Articles, ArticlesData, ArticlesPatch, ArticlesQuery }

export interface ArticlesParams extends KnexAdapterParams<ArticlesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ArticlesService<ServiceParams extends Params = ArticlesParams> extends KnexService<
  Articles,
  ArticlesData,
  ArticlesParams,
  ArticlesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'articles'
  }
}
