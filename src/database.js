import monk from 'monk'

export default monk(process.env.DATABASE_URL)
