import { UseGuards, applyDecorators } from "@nestjs/common";
import { user_types } from "../../enums/user_types.enum";
import { RoleProtected } from "../function/role-protected.decorator";
import { AuthGuard } from "../../guards/auth.guard";

export function Auth(...roles: user_types[]) {

    return applyDecorators(
 
        RoleProtected(...roles),
        UseGuards(AuthGuard)
    )
}