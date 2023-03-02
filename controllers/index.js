const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userPublic');
const eventRoutes = require('./eventPublic');
// const categoryRoutes = require('./categoryPublic');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/user', userRoutes);
router.use('/event', eventRoutes);
// router.use('/category', categoryRoutes);

module.exports = router;