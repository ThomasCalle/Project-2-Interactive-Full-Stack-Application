const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./userPublic');
const eventRoutes = require('./eventPublic');
const categoryRoutes = require('./categoryPublic');
const settingsRoutes = require('./settingsPublic')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/user', userRoutes);
router.use('/event', eventRoutes);
router.use('/category', categoryRoutes);
router.use('/settings', settingsRoutes)

module.exports = router;