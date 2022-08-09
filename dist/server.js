/** @format */
import express from 'express';
import error_api from './router/firepower.js';
const app = express();
const port = 911;
app.use('/call', error_api);
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
//# sourceMappingURL=server.js.map