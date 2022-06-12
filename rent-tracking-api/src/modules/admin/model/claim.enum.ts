export enum Claim {
  ADMIN = "admin",
  OWNER = "owner",
  TENANT = "tenant",
}

export type ClaimString = keyof typeof Claim;
