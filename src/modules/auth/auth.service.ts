import { Injectable, UnauthorizedException } from "@nestjs/common";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import * as jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";
import { AuthConfig } from "./auth.config";

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  private jwkClient = new JwksClient({
    jwksUri: `${this.authConfig.authority}/.well-known/jwks.json`,
  });

  constructor(private readonly authConfig: AuthConfig) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  private getPublicKey(header, callback) {
    this.jwkClient.getSigningKey(header.kid, (err, key) => {
      if (err) {
        callback(err, null);
      } else {
        const publicKey = key.getPublicKey();
        callback(null, publicKey);
      }
    });
  }

  public async verifyToken(authToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        authToken,
        this.getPublicKey.bind(this),
        { algorithms: ["RS256"] },
        (err, decoded) => {
          if (err) {
            reject(new UnauthorizedException("Token verification failed"));
          } else {
            resolve(decoded);
          }
        },
      );
    });
  }

  authenticateUser(user: { name: string; password: string }) {
    const { name, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });
    const userData = {
      Username: name,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
