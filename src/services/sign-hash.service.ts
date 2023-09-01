import jwt from "jsonwebtoken";
import crypto from "crypto-js";
import { randomBytes } from "crypto";

export const generateNewTokenSecret = () => {
  return randomBytes(16).toString("hex");
};

export const encryptData = (projectId: string, projectSecretToken: string) => {
  const cipherText = crypto.AES.encrypt(
    projectId,
    projectSecretToken,
  ).toString();
  return cipherText;
};

export const decryptData = (
  encryptedData: string,
  projectSecretToken: string,
) => {
  const decryptedData = crypto.AES.decrypt(encryptedData, projectSecretToken);

  return decryptedData.toString(crypto.enc.Utf8);
};

export const signJwtToken = (projectId: string, tokenSecret: string) => {
  return jwt.sign({ projectId }, tokenSecret, { expiresIn: "30m" });
};

export const verifyAccessToken = (
  accessToken: string,
  projectId: string,
  tokenSecret: string,
) => {
  const decodedToken = jwt.verify(accessToken, tokenSecret) as
    | {
        projectId: string;
      }
    | string;

  if (typeof decodedToken !== "string") {
    return decodedToken.projectId === projectId;
  }
  return false;
};
