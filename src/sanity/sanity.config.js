import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'LLN',
  title: 'LLN Project',
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
