import database from '../../../src/database'
import { ObjectId } from 'mongodb'

export default (req, res) => {
  if (req.method === 'GET') { return show(req, res) }
  if (req.method === 'POST') { return update(req, res) }
  if (req.method === 'DELETE') { return destroy(req, res) }

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

async function update (req, res) {
  const stickers = req.body.stickers;

  if (stickers) {
    const updateParams = Object
      .keys(stickers)
      .reduce((memo, stickNumber) => {
        memo[`stickers.${stickNumber}`] = stickers[stickNumber];
        return memo;
      }, {})

    const albums = database.get('albums')
    await albums.update({ _id: ObjectId(req.query.id) }, { $set: updateParams })

    return show(req, res)
  } else {
    res.status(422).json({});
  }
}

async function destroy (req, res) {
  try {
    const album = await database.get('albums').findOneAndDelete({
      _id: ObjectId(req.params.id), name: req.body.name
    });

    if (album) {
      res.status(204);
    } else {
      res.status(404);
    }
  } catch {
    res.status(404);
  }
}
