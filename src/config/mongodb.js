import { MongoClient } from 'mongodb'
import { env } from './environment'

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  try {
    // Connect to server
    await client.connect()
    await listDatabases(client)
    console.log('Connected successfully to server!')
  } finally {
    // Ensure that the client will close at the end
    await client.close()
  }
}

const listDatabases = async (client) => {
  const databases = await client.db().admin().listDatabases()
  console.log(databases)
}