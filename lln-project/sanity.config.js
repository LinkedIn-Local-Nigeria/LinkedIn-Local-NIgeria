import {defineConfig} from 'sanity'
import {schemaTypes} from './schemaTypes'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'Linkedin Local Nigeria Studio',
  basePath: '/studio',
  projectId: process.env.VITE_SANITY_PROJECT_ID|| "vmtuwbwx",
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes
  }
})
