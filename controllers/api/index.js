const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const eventRoutes = require('./eventRoutes');
// const categoryRoutes = require('/categoryRoutes');

router.use('/users', userRoutes);
// router.use('/events', eventRoutes);
// router.use('/categories', categoryRoutes);

module.exports = router;
