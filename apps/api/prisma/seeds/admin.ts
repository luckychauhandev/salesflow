import argon2 from "argon2";

import { prisma } from "../../src/infrastructure/database/prisma-client.js";

async function main() {
    const organization =
        await prisma.organization.findFirst();

    if (!organization) {
        throw new Error(
            "Organization not found",
        );
    }

    const adminRole =
        await prisma.role.findFirst({
            where: {
                organizationId:
                    organization.id,
                name: "Admin",
            },
        });

    if (!adminRole) {
        throw new Error(
            "Admin role not found",
        );
    }

    const passwordHash =
        await argon2.hash(
            "Admin@123",
        );

    const admin =
        await prisma.user.upsert({
            where: {
                organizationId_email: {
                    organizationId:
                        organization.id,
                    email:
                        "admin@salesflow.com",
                },
            },
            update: {},
            create: {
                organizationId:
                    organization.id,
                email:
                    "admin@salesflow.com",
                passwordHash,
                firstName: "Super",
                lastName: "Admin",
            },
        });

    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: admin.id,
                roleId: adminRole.id,
            },
        },
        update: {},
        create: {
            userId: admin.id,
            roleId: adminRole.id,
        },
    });

    const permissions =
        await prisma.permission.findMany();

    for (const permission of permissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId:
                        adminRole.id,
                    permissionId:
                        permission.id,
                },
            },
            update: {},
            create: {
                roleId:
                    adminRole.id,
                permissionId:
                    permission.id,
            },
        });
    }

    console.log(
        "Admin user seeded",
    );

    console.log(
        "Admin role assigned",
    );

    console.log(
        "All permissions assigned",
    );
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });