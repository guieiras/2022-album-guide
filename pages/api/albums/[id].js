import database from '../../../src/database'
import { ObjectId } from 'mongodb'

export default (req, res) => {
  if (req.method === 'GET') { return show(req, res) }

  return res.status(404).send({ error: 'Route not found' })
}

async function show (req, res) {
  try {
    const album = await database.get('albums').findOne({
      _id: ObjectId(req.query.id)
    });

    if (album) {
      res.json(album);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(422).json(error);
  }
}
