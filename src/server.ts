import { app } from './app';
import { sequelize } from './shared/sequelize';


sequelize.sync().then(() => {
    console.log("Database connected");
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    })
})