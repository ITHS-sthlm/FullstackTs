import { Router } from 'express';
import Task from '../models/Task';

const router = Router();

router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const task = await Task.create({ title });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  await task.destroy();
  res.json({ message: 'Task deleted' });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.set({ completed });
  await task.save();
  res.json(task);
});

export default router;
