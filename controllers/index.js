const router = require('express').Router();

const ApiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashRoutes = require('./dashboard-routes');

router.use('/api', ApiRoutes);
router.use('/home', homeRoutes);
router.use('/dashboard', dashRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;