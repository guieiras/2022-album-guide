import database from '../../src/database';

export default (req, res) => {
  if (req.method === 'POST') { return create(req, res); }

  return res.status(404).send({ error: 'Route not found' });
}

async function create(req, res) {
  try {
    const album = await database.get('albums').insert({
      name: req.body.name, stickers: {}
    });

    res.json({ name: album.name, token: album._id.toString() });
  } catch (error) {
    response.status(422).json(error);
  }
}
