import { defineConfig } from 'sanity'
import { schemaTypes } from './schemaTypes'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'LLN',
  title: 'LINKEDIN LOCAL NIGERIA PROJECT',
  basePath: '/studio',
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '8le6bzzk',
  apiVersion: '2025-05-28',
  dataset: import.meta.env.VITE_SANITY_DATASET,
  releases: {
    enabled: false
  },
  plugins: [structureTool()],

  schema: {
    types: schemaTypes
  }
})
