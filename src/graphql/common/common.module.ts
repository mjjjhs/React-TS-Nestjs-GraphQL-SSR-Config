import {Module} from "@nestjs/common";
import {ResultScalar} from "./scalars/result.scalar";

@Module({
    providers: [
        ResultScalar
    ],
})
export class CommonModule {}
