// Single source of truth for identity, contact channels and links.
// Every section, the <head>, the JSON-LD and the OG image read from here.
// Update once; nothing else needs touching.

export const profile = {
  name: 'Farhan Sayyed',
  firstName: 'Farhan',
  initials: 'FS',
  title: 'Full-Stack Engineer',
  subtitle: 'Cloud & DevOps',
  // The one-line pitch. Used in the OG image and the <title>.
  headline: 'Full-stack engineer who ships multi-tenant SaaS — and proves it with numbers.',

  // Live production domain. Canonical URLs, OG tags and JSON-LD derive from it.
  // Change this single value when the site moves.
  siteUrl: 'https://farhansayyed.dev',

  email: 'farhan.sayyed.tech@gmail.com',
  phone: '+918928040454',          // E.164, for tel: links
  phoneDisplay: '+91 89280 40454',
  whatsapp: '918928040454',        // wa.me takes no plus sign
  whatsappText: 'Hi Farhan, I came across your portfolio and would like to talk about a role.',

  city: 'Mumbai',
  region: 'Maharashtra',
  country: 'India',
  countryCode: 'IN',
  timezone: 'Asia/Kolkata',
  geo: { lat: 19.076, lng: 72.8777 },

  social: {
    linkedin: 'https://www.linkedin.com/in/farhan-sayyed',
    github: 'https://github.com/Farhan8928'
  },

  resume: {
    path: '/Farhan_Sayyed_Full_Stack_Engineer.pdf',
    label: 'Resume',
    updated: 'September 2026'
  },

  // Rendered in the hero status card, the dock and the contact section.
  availability: {
    status: 'Open to full-time roles',
    regions: ['India', 'UAE', 'Remote'],
    notice: 'Available within 30 days',
    hoursStart: 9,   // IST — the "online now" pulse
    hoursEnd: 22
  },

  employer: { name: 'FiveM Infotech', role: 'Full-Stack Developer', since: 'Feb 2025' },
  studio:   { name: 'DuoStack', role: 'Co-founder', url: 'https://duostack.in' },

  years: '2.5+',
  shipped: '12+',
  industries: ['healthcare', 'finance', 'education', 'logistics', 'retail', 'manufacturing']
}

export const contact = {
  mailto: `mailto:${profile.email}?subject=${encodeURIComponent('Role for Farhan Sayyed')}`,
  emailLabel: profile.email,
  whatsapp: `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappText)}`,
  whatsappLabel: profile.phoneDisplay,
  tel: `tel:${profile.phone}`
}
