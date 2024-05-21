import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

/**
 * 
 * @param context Pega o contexto da requisição HTTP
 * @returns Retorna o usuário atual
 *  
 */
const getCurrentUser = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUser(context)
);