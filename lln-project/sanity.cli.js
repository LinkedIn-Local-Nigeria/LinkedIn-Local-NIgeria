import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID|| "vmtuwbwx",
    dataset: process.env.VITE_SANITY_DATASET || 'production',
  },
  basePath: '/studio', // This can be changed to any path preferred
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true
})
