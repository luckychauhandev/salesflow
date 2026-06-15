import argon2 from "argon2";

export class PasswordService {
  static hash(password: string) {
    return argon2.hash(password);
  }

  static verify(
    hash: string,
    password: string,
  ) {
    return argon2.verify(
      hash,
      password,
    );
  }
}