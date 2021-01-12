const { banner, title, log } = require('./log')

const run = async () => {
  const text = process.argv[2].split(':').join(' : ')

  try {
    await banner(text)
  } catch (error) {
    title(text)
  }

  log.break()
  return process.exit(0)
}

run()
