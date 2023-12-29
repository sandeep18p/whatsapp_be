// File: index.mjs

import app from "./app.js";
import logger from './configs/logger.config.js'


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    logger.info(`Server is running at ${PORT}`);
});
