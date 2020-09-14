import { CustomScalar, Scalar } from '@nestjs/graphql';
import {GraphQLScalarLiteralParser, GraphQLScalarValueParser} from 'graphql';

interface IResult {
    status: number;
    code: string;
    message: string;
}

@Scalar('Result')
export class ResultScalar implements CustomScalar<IResult, any> {
    description = '리턴이 필요없는 API Result';

    serialize(value): IResult {
        return {
            status: value?.status,
            code: value?.code,
            message: value?.message
        }
    }

    parseValue: GraphQLScalarValueParser<any>;
    parseLiteral: GraphQLScalarLiteralParser<any>;
}
