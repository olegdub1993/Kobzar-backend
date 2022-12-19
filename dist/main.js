"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
app_module_1.AppModule;
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.use(cookieParser());
        app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });
        await app.listen(PORT, () => console.log(`Server  started on port ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=main.js.map