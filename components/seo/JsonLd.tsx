import companyData from '@/data/company.json'

export default function JsonLd() {
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: companyData.name,
      url: 'https://ldcode.tech',
      logo: 'https://ldcode.tech/image/LDCode_Logo.png',
      description: companyData.description.th,
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
        companyData.socials.tiktok,
        companyData.socials.instagram,
        companyData.socials.facebook,
        companyData.socials.youtube,
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: companyData.name,
      image: 'https://ldcode.tech/image/LDCode_Logo.png',
      priceRange: '฿฿',
      telephone: companyData.contact.phone,
      url: 'https://ldcode.tech',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '88/19 Tower B, Sukhumvit Road',
        addressLocality: 'Bangkok',
        postalCode: '10110',
        addressCountry: 'TH',
      },
    }
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
