// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  articlesDataValidator,
  articlesPatchValidator,
  articlesQueryValidator,
  articlesResolver,
  articlesExternalResolver,
  articlesDataResolver,
  articlesPatchResolver,
  articlesQueryResolver
} from './articles.schema'

import type { Application } from '../../declarations'
import { ArticlesService, getOptions } from './articles.class'

export const articlesPath = 'articles'
export const articlesMethods: Array<keyof ArticlesService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './articles.class'
export * from './articles.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const articles = (app: Application) => {
  // Register our service on the Feathers application
  app.use(articlesPath, new ArticlesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: articlesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(articlesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(articlesExternalResolver),
        schemaHooks.resolveResult(articlesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(articlesQueryValidator),
        schemaHooks.resolveQuery(articlesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(articlesDataValidator),
        schemaHooks.resolveData(articlesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(articlesPatchValidator),
        schemaHooks.resolveData(articlesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [articlesPath]: ArticlesService
  }
}
