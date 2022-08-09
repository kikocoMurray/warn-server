/** @format */
import express from 'express';
const router = express();
// middleware
// router.use()
// url: /api/send
router.get('/send', (req, res) => {
    // http status 200
    // res.status(200)
    res.send(`<h1>template One</h1>`);
    // res.send({
    //   code: '200',
    //   result: {
    //     success: true,
    //   },
    // })
    res.end();
});
// router.post('/', (req, res) => {
//   res.send('make error on slack is done!')
// })
export default router;
//# sourceMappingURL=error.js.map