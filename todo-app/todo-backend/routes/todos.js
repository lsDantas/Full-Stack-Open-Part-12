const express = require('express');
const redis = require('../redis');
const { Todo } = require('../mongo');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})

  res.send(todos);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);

  if (!req.todo) return res.sendStatus(404);
  res.send(req.todo);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const newEntry = req.body;
  const updatedEntry = await Todo.findByIdAndUpdate(id, newEntry);

  if (!updatedEntry) return res.sendStatus(404);
  res.sendStatus(200);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  // Update Added To-Dos Count
  const oldCount = await redis.getAsync('added_todos');
  await redis.setAsync('added_todos', Number(oldCount) + 1)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  console.log('Passed middleware.');
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
