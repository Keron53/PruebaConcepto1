import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Servidor WebSocket funcionando' });
});

export default router;
