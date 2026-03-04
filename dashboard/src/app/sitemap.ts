import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://formuletry.com';

  return [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/dashboard`, priority: 0.8 },
    { url: `${baseUrl}/privacy`, priority: 0.5 },
    { url: `${baseUrl}/terms`, priority: 0.5 },
    { url: `${baseUrl}/about`, priority: 0.5 },
    { url: `${baseUrl}/contact`, priority: 0.5 },
  ];
}