create table "user" ("id" text not null primary key, "name" text not null, "email" text not null unique, "emailVerified" boolean not null, "image" text, "createdAt" date not null, "updatedAt" date not null, "twoFactorEnabled" boolean, "role" text, "banned" boolean, "banReason" text, "banExpires" integer);

create table "session" ("id" text not null primary key, "expiresAt" date not null, "ipAddress" text, "userAgent" text, "userId" text not null references "user" ("id"), "activeOrganizationId" text, "impersonatedBy" text);

create table "account" ("id" text not null primary key, "accountId" text not null, "providerId" text not null, "userId" text not null references "user" ("id"), "accessToken" text, "refreshToken" text, "idToken" text, "expiresAt" date, "password" text);

create table "verification" ("id" text not null primary key, "identifier" text not null, "value" text not null, "expiresAt" date not null);

create table "organization" ("id" text not null primary key, "name" text not null, "slug" text not null unique, "logo" text, "createdAt" date not null, "metadata" text);

create table "member" ("id" text not null primary key, "organizationId" text not null references "organization" ("id"), "userId" text not null, "email" text not null, "role" text not null, "createdAt" date not null);

create table "invitation" ("id" text not null primary key, "organizationId" text not null references "organization" ("id"), "email" text not null, "role" text, "status" text not null, "expiresAt" date not null, "inviterId" text not null references "user" ("id"));

create table "twoFactor" ("id" text not null primary key, "secret" text not null, "backupCodes" text not null, "userId" text not null references "user" ("id"));

create table "passkey" ("id" text not null primary key, "name" text, "publicKey" text not null, "userId" text not null references "user" ("id"), "webauthnUserID" text not null, "counter" integer not null, "deviceType" text not null, "backedUp" boolean not null, "transports" text, "createdAt" date)