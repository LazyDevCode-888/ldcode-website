import companyData from '@/data/company.json'

export default function JsonLd() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyData.name,
    url: 'https://ldcode.dev',
    logo: 'https://ldcode.dev/image/LDCode_Logo.png',
    description: companyData.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '88/19 Tower B, Sukhumvit Road',
      addressLocality: 'Bangkok',
      postalCode: '10110',
      addressCountry: 'TH',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyData.contact.phone,
      contactType: 'customer service',
      email: companyData.contact.email,
    },
    sameAs: [
      companyData.socials.github,
      companyData.socials.facebook,
      companyData.socials.linkedin,
      companyData.socials.twitter,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
