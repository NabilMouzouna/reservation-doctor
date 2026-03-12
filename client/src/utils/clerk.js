export function isValidClerkPublishableKey(value) {
  if (!value || typeof value !== "string") {
    return false;
  }

  const key = value.trim();
  if (key.includes("your_key_here")) {
    return false;
  }

  return key.startsWith("pk_test_") || key.startsWith("pk_live_");
}
