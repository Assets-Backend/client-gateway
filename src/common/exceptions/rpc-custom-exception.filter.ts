// Original
// import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
// import { RpcException } from "@nestjs/microservices";

// @Catch(RpcException)
// export class RpcCustomExceptionFilter implements ExceptionFilter {

//     catch(exception: RpcException, host: ArgumentsHost) {

//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse();

//         const rpcError = exception.getError();

//         if ( rpcError.toString().includes('Empty response') ) 
//             return response.status(500).json({
//                 status: 500,
//                 message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1)
//             });
        
//         if (
//             typeof rpcError === 'object' &&
//             'status' in rpcError &&
//             'message' in rpcError
//         ) {
            
//             const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
//             return response.status(status).json(rpcError);
//         }

//         return response.status(400).json({
//             status: 400,
//             message: rpcError
//         })
//     }
// }

// Graphql
// import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
// import { GqlArgumentsHost } from "@nestjs/graphql";
// import { RpcException } from "@nestjs/microservices";

// @Catch(RpcException)
// export class RpcCustomExceptionFilter implements ExceptionFilter {

//     catch(exception: RpcException, host: ArgumentsHost) {
//         // const gqlHost = GqlArgumentsHost.create(host);
//         // const ctx = gqlHost.getContext();
//         // const response = ctx.res;

//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse();
//         const request = ctx.getRequest();
//         // const status = exception.getStatus();

//         console.log('request', request);
//         console.log('response', response);



















        
//         // const rpcError = exception.getError();
        
//         // if (rpcError.toString().includes('Empty response')) {
//         //     return response.status(500).json({
//         //         status: 500,
//         //         message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1)
//         //     });
//         // }

//         // if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
//         //     const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
//         //     return response.status(status).json(rpcError);
//         // }

//         // return response.status(400).json({
//         //     status: 400,
//         //     message: rpcError
//         // });
//     }
// }


import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { GqlExceptionFilter, GqlArgumentsHost } from "@nestjs/graphql";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements GqlExceptionFilter {
  
  catch(exception: RpcException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    const rpcError = exception.getError();

    if (rpcError.toString().includes('Empty response')) {
      return new Error(
        rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1)
      );
    }

    if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      const error = new Error(rpcError.message as string);
      error['stack'] = status.toString();
      return error;
    }

    const error = new Error(rpcError as string);
    error['stack'] = "400";
    return error;
  }
}
