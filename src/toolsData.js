// ---------------------------------------------------------------------------
// Cybersecurity tools directory. Add/remove/edit tools here — this file
// only holds data, no UI logic, so it's safe to edit without touching pages.
// ---------------------------------------------------------------------------

export const TOOLS = [
  { id: 1, name: 'Nmap', category: 'Network & Recon', url: 'https://nmap.org',
    desc: 'The standard network scanner for discovering hosts, open ports, and services on a network you’re authorized to test.' },
  { id: 2, name: 'Wireshark', category: 'Network & Recon', url: 'https://www.wireshark.org',
    desc: 'A packet analyzer for inspecting network traffic in detail — essential for diagnosing both performance and security issues.' },
  { id: 3, name: 'Shodan', category: 'Network & Recon', url: 'https://www.shodan.io',
    desc: 'A search engine for internet-connected devices, widely used to understand what’s exposed on a network from the outside.' },
  { id: 4, name: 'OWASP ZAP', category: 'Web App Testing', url: 'https://www.zaproxy.org',
    desc: 'A free, open-source web app scanner for finding common vulnerabilities like XSS and injection points in apps you own or are authorized to test.' },
  { id: 5, name: 'Burp Suite Community', category: 'Web App Testing', url: 'https://portswigger.net/burp/communitydownload',
    desc: 'An intercepting proxy and toolkit for manually testing web application security, used industry-wide for authorized penetration testing.' },
  { id: 6, name: 'Nikto', category: 'Web App Testing', url: 'https://cirt.net/Nikto2',
    desc: 'A web server scanner that checks for outdated software, dangerous files, and common misconfigurations.' },
  { id: 7, name: 'Hashcat', category: 'Password & Auth', url: 'https://hashcat.net/hashcat/',
    desc: 'A password recovery/auditing tool used to test how resistant a set of hashed passwords is against cracking, on data you’re authorized to test.' },
  { id: 8, name: 'Have I Been Pwned', category: 'Password & Auth', url: 'https://haveibeenpwned.com',
    desc: 'A free service to check whether an email or password has appeared in a known data breach.' },
  { id: 9, name: 'Autopsy', category: 'Forensics & Analysis', url: 'https://www.autopsy.com',
    desc: 'An open-source digital forensics platform used to investigate what happened on a compromised system.' },
  { id: 10, name: 'VirusTotal', category: 'Forensics & Analysis', url: 'https://www.virustotal.com',
    desc: 'Scans files and URLs against dozens of antivirus engines and blocklists — a quick first check on anything suspicious.' },
  { id: 11, name: 'Kali Linux', category: 'Platforms', url: 'https://www.kali.org',
    desc: 'A Linux distribution that ships with most of the above tools preinstalled, built for security testing and research.' },
  { id: 12, name: 'CyberChef', category: 'Platforms', url: 'https://gchq.github.io/CyberChef/',
    desc: 'A browser-based "cyber Swiss army knife" for encoding, decoding, hashing, and analyzing data without installing anything.' },
];
