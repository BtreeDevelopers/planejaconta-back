import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";
import { JWT_PUBLIC_KEY } from "@config/constants";

interface TokenPayload {
  user: {
    id: string;
  };
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT is missing.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, JWT_PUBLIC_KEY);
    const { sub } = decoded as TokenPayload;
    request.user = { id: sub };

    return next();
  } catch {
    throw new AppError("Invalid JWT", 401);
  }
}
