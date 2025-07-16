export function isVersionCodeLessThanCurrent(versionCode, currentVersion) {
  const v1 = versionCode.split('.').map(Number);
  const v2 = currentVersion.split('.').map(Number);

  const maxLength = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLength; i++) {
    const num1 = v1[i] || 0; // Treat missing parts as 0
    const num2 = v2[i] || 0; // Treat missing parts as 0

    if (num1 < num2) {
      return true; // versionCode is less than currentVersion
    }
    if (num1 > num2) {
      return false; // versionCode is greater than currentVersion
    }
  }

  return false; // Versions are equal
}
