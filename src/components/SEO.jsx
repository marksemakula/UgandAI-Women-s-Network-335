import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SEO Component - Dynamic meta tags for each page
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords
 * @param {string} props.image - OG image URL
 * @param {string} props.url - Canonical URL
 */
export default function SEO({ 
  title = 'Ugandan Women in AI', 
  description = 'Empowering Ugandan women to lead and innovate in the field of Artificial Intelligence through education, mentorship, and community building.',
  keywords = 'Ugandan women, AI, Artificial Intelligence, women in tech, Uganda, mentorship, education',
  image = 'https://www.uwiai.org/images/UWAI_Logo.png',
  url = 'https://www.uwiai.org'
}) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Ugandan Women in AI`;

    // Update or create meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    
    // Open Graph
    updateMetaTag('property', 'og:title', `${title} | Ugandan Women in AI`);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', url);
    
    // Twitter
    updateMetaTag('property', 'twitter:title', `${title} | Ugandan Women in AI`);
    updateMetaTag('property', 'twitter:description', description);
    updateMetaTag('property', 'twitter:image', image);
    updateMetaTag('property', 'twitter:url', url);
    
    // Update canonical link
    updateCanonicalLink(url);
  }, [title, description, keywords, image, url]);

  return null;
}

/**
 * Update or create a meta tag
 * @param {string} attr - Attribute name (name or property)
 * @param {string} key - Attribute value
 * @param {string} content - Content value
 */
function updateMetaTag(attr, key, content) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

/**
 * Update canonical link
 * @param {string} url - Canonical URL
 */
function updateCanonicalLink(url) {
  let link = document.querySelector('link[rel="canonical"]');
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', url);
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string
};
