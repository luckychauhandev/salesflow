import { ConflictError } from "../../../shared/errors/conflict-error.js";
import { NotFoundError } from "../../../shared/errors/not-found-error.js";
import { slugify } from "../../../shared/utils/slugify.js";
import { OrganizationRepository } from "../repositories/organization.repository.js";

export class OrganizationService {
  constructor(
    private readonly organizationRepository = new OrganizationRepository(),
  ) {}

  async create(name: string) {
    const slug = slugify(name);

    const existing =
      await this.organizationRepository.findBySlug(
        slug,
      );

    if (existing) {
      throw new ConflictError(
        "Organization already exists",
      );
    }

    return this.organizationRepository.create({
      name,
      slug,
    });
  }

  async findById(id: string) {
    const organization =
      await this.organizationRepository.findById(id);

    if (!organization) {
      throw new NotFoundError(
        "Organization not found",
      );
    }

    return organization;
  }
}