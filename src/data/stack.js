// Tools I ship with. `slug` is the Simple Icons name; the brand icon loads
// from their CDN and the chip still reads fine if it does not.

export const stackGroups = [
  {
    label: 'Frontend',
    items: [
      { name: 'React', slug: 'react' }, { name: 'Next.js', slug: 'nextdotjs', white: true }, { name: 'React Native', slug: 'react' },
      { name: 'Expo', slug: 'expo', white: true }, { name: 'TypeScript', slug: 'typescript' }, { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Redux', slug: 'redux' }, { name: 'Electron', slug: 'electron' }
    ]
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', slug: 'nodedotjs' }, { name: 'Express', slug: 'express', white: true }, { name: 'NestJS', slug: 'nestjs' },
      { name: 'Socket.IO', slug: 'socketdotio', white: true }, { name: 'REST APIs' }, { name: 'JWT · OAuth' }
    ]
  },
  {
    label: 'Databases',
    items: [
      { name: 'MongoDB', slug: 'mongodb' }, { name: 'PostgreSQL', slug: 'postgresql' }, { name: 'MySQL', slug: 'mysql' },
      { name: 'Redis', slug: 'redis' }, { name: 'Prisma', slug: 'prisma', white: true }
    ]
  },
  {
    label: 'Cloud & DevOps',
    items: [
      { name: 'Docker', slug: 'docker' }, { name: 'GitHub Actions', slug: 'githubactions' }, { name: 'AWS' },
      { name: 'NGINX', slug: 'nginx' }, { name: 'Google Cloud', slug: 'googlecloud' }, { name: 'Vercel', slug: 'vercel', white: true }
    ]
  },
  {
    label: 'AI & Integrations',
    items: [
      { name: 'Gemini AI', slug: 'googlegemini' }, { name: 'Stripe', slug: 'stripe' }, { name: 'Razorpay', slug: 'razorpay' },
      { name: 'Firebase', slug: 'firebase' }, { name: 'WhatsApp API', slug: 'whatsapp' }, { name: 'Twilio' }
    ]
  }
]

export const learning = ['Kubernetes', 'Terraform', 'AWS Solutions Architect']
