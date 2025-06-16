// Shared utility functions across client and server

/**
 * Generate a consistent 9-digit numeric UID in the format like 799181588
 * This ensures all UIDs across the application follow the same format
 */
export const generateNumericUID = (): string => {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
};