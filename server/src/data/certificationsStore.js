// Active verified Certifications dataset
// Default is empty array per instructions (no fake/invented certificates)
export let activeCertifications = [];

export function updateActiveCertifications(updater) {
  if (typeof updater === 'function') {
    activeCertifications = updater(activeCertifications);
  } else {
    activeCertifications = updater;
  }
  return activeCertifications;
}
