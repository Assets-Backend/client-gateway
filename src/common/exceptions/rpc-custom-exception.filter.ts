// import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
// import { GqlArgumentsHost } from '@nestjs/graphql';
// import { RpcException } from "@nestjs/microservices";
// import { GraphQLError } from 'graphql';

// @Catch(RpcException)
// export class GqlRpcExceptionFilter implements ExceptionFilter {

//     catch(exception: RpcException, host: ArgumentsHost) {

//         const gqlHost = GqlArgumentsHost.create(host);
//         const context = gqlHost.getContext();
//         const response = context.res;

//         const rpcError = exception.getError();

//         let errorResponse;

//         if (rpcError.toString().includes('Empty response')) {
//             errorResponse = {
//                 status: HttpStatus.INTERNAL_SERVER_ERROR,
//                 message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1)
//             };
//         } else if (
//             typeof rpcError === 'object' &&
//             'status' in rpcError &&
//             'message' in rpcError
//         ) {
//             const status = isNaN(+rpcError.status) ? HttpStatus.BAD_REQUEST : +rpcError.status;
//             errorResponse = {
//                 status,
//                 message: rpcError.message
//             };
//         } else {
//             errorResponse = {
//                 status: HttpStatus.BAD_REQUEST,
//                 message: rpcError
//             };
//         }

//         throw new GraphQLError(errorResponse.message, {
//             extensions: {
//                 code: errorResponse.status
//             }
//         });
//     }
// }


import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { GqlArgumentsHost } from "@nestjs/graphql";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {

    catch(exception: RpcException, host: ArgumentsHost) {

        const gqlHost = GqlArgumentsHost.create(host);
        const context = gqlHost.getContext();
        const response = context.res;

        // const ctx = host.switchToHttp();
        // const response = ctx.getResponse();

        const rpcError = exception.getError();

        if ( rpcError.toString().includes('Empty response') ) 
            return response.status(500).json({
                status: 500,
                message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1)
            });
        
        if (
            typeof rpcError === 'object' &&
            'status' in rpcError &&
            'message' in rpcError
        ) {
            
            const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
            return response.status(status).json(rpcError);
        }

        return response.status(400).json({
            status: 400,
            message: rpcError
        })
    }
}