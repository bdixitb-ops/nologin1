export const MAX_FILES_PER_DOMAIN = 5;
export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;
export const MAX_DOMAIN_STORAGE_MB = 500;
export const MAX_DOMAIN_STORAGE_BYTES = MAX_DOMAIN_STORAGE_MB * 1024 * 1024;
export const MAX_FILE_NAME_LENGTH = 180;
export const SIGNED_UPLOAD_TTL_MS = 15 * 60 * 1000;

/** Per IP — blocks scripted floods */
export const RATE_LIMITS = {
  preparePerIpHour: 40,
  preparePerIpDay: 150,
  preparePerDomainHour: 15,
};

export const DOMAIN_NAME_PATTERN = /^[a-z0-9]([a-z0-9._%-]{0,62}[a-z0-9])?$/;
export const FILE_NAME_PATTERN = /^[^/\\]+$/;
