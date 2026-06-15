import { ConflictError } from "../../../shared/errors/conflict-error.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { UnauthorizedError } from "../../../shared/errors/unauthorized-error.js";
import { UserRepository } from "../repositories/user.repository.js";

export class UserService {
  constructor(private readonly userRepository = new UserRepository()) { }

  async create(data: {
    organizationId: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
  }) {
    const existingUser = await this.userRepository.findByEmail(
      data.organizationId,
      data.email,
    );

    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    return this.userRepository.create(data);
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async findByEmail(organizationId: string, email: string) {
    const user = await this.userRepository.findByEmail(organizationId, email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    return user;
  }
}
