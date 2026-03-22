const { defineConfig } = require('cypress')
const sharp = require('sharp')
const path  = require('path')
const fs    = require('fs')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://closeout-r1fe.enetelsolutions.com',

    defaultCommandTimeout: 15000,
    requestTimeout:        15000,
    responseTimeout:       60000,
    pageLoadTimeout:       60000,

    env: {
      email:     'tebahe2307@onbap.com',
      password:  'Closeout!123',
      project:   'Test Project 843',
      site:      'Test Site 7',
      photoNode: 'test photo',
      apiUrl:    'https://closeout-r1.enetelsolutions.com',
    },

    setupNodeEvents(on, config) {
      on('task', {

        /**
         * Creates a unique copy of the base image by applying a tiny
         * random brightness tweak. The photo content stays the same
         * so AI hardhat detection still works — but each file is
         * unique in bytes so the server treats it as a fresh upload.
         *
         * @param {string} type  'hardhat' | 'no_hardhat'
         * @returns {string}     absolute path to the generated image
         */
        generateUniqueImage(type) {
          const imagesDir = path.join('cypress', 'fixtures', 'images')
          const baseFile  = type === 'hardhat'
            ? 'hardhat_base.jpg'
            : 'no_hardhat_base.jpg'

          const basePath   = path.join(imagesDir, baseFile)
          const outputName = `${type}_${Date.now()}.jpg`
          const outputPath = path.join(imagesDir, outputName)

          if (!fs.existsSync(basePath)) {
            throw new Error(
              `Base image not found at: ${basePath}\n` +
              `Please add your base images:\n` +
              `  cypress/fixtures/images/hardhat_base.jpg    (person WITH hardhat)\n` +
              `  cypress/fixtures/images/no_hardhat_base.jpg (person WITHOUT hardhat)`
            )
          }

          // ±2% brightness variation makes every generated file unique
          const brightness = 1 + (Math.random() * 0.04 - 0.02)

          return sharp(basePath)
            .modulate({ brightness })
            .jpeg({ quality: 92 })
            .toFile(outputPath)
            .then(() => outputPath)
        },

        /**
         * Deletes all generated images after the suite finishes.
         * Keeps the fixtures folder clean between runs.
         */
        cleanupGeneratedImages() {
          const dir = path.join('cypress', 'fixtures', 'images')
          fs.readdirSync(dir)
            .filter(f => f.match(/^(hardhat|no_hardhat)_\d+\.jpg$/))
            .forEach(f => fs.unlinkSync(path.join(dir, f)))
          return null
        },
      })
    },
  },
})
