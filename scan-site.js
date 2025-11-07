module.exports = async function scanSite(code) {
  // Naive scan for dangerous keywords, real world: use ClamAV/virustotal.
  const blacklist = ['exec', 'rm ', 'os.system', 'subprocess', '<script>evil'];
  return !blacklist.some(x => code.includes(x));
}