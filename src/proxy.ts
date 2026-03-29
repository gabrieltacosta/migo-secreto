import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Aplica o middleware em todas as rotas, EXCETO arquivos estáticos, imagens e APIs
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
