import PropTypes from 'prop-types';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

/**
 * Breadcrumb Component with BreadcrumbList Schema
 * Provides navigation context and structured data for SEO
 */

// Route configuration with descriptive names
const routeConfig = {
  '/': { name: 'Home', description: 'Ugandan Women in AI Homepage' },
  '/projects': { name: 'Projects', description: 'AI Projects by Ugandan Women' },
  '/innovators': { name: 'Innovators', description: 'Women Leading AI Innovation in Uganda' },
  '/mentor': { name: 'Mentor', description: 'AI Mentorship Program' },
  '/talent-pool': { name: 'Talent Pool', description: 'AI Professionals Directory' },
  '/membership': { name: 'Join Us', description: 'Become a UWIAI Member' },
};

/**
 * Generate breadcrumb items from current path
 * @param {string} pathname - Current URL pathname
 * @returns {Array} Array of breadcrumb items
 */
function generateBreadcrumbs(pathname) {
  const breadcrumbs = [{ path: '/', name: 'Home' }];
  
  if (pathname === '/') {
    return breadcrumbs;
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  let currentPath = '';

  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const config = routeConfig[currentPath];
    
    if (config) {
      breadcrumbs.push({
        path: currentPath,
        name: config.name,
      });
    } else {
      // Handle dynamic routes (e.g., /talent/:username)
      const formattedName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      breadcrumbs.push({
        path: currentPath,
        name: formattedName,
      });
    }
  });

  return breadcrumbs;
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 * @param {Array} breadcrumbs - Array of breadcrumb items
 * @returns {Object} JSON-LD structured data
 */
function generateBreadcrumbSchema(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://www.uwiai.org${crumb.path}`,
    })),
  };
}

export default function Breadcrumb({ customItems }) {
  const location = useLocation();
  
  // Use custom items if provided, otherwise generate from path
  const breadcrumbs = customItems || generateBreadcrumbs(location.pathname);
  
  // Don't render on homepage
  if (location.pathname === '/') {
    return null;
  }

  const schema = generateBreadcrumbSchema(breadcrumbs);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Visual Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className="bg-gray-100 py-3 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <ol 
            className="flex flex-wrap items-center space-x-2 text-sm"
            itemScope 
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              
              return (
                <li 
                  key={crumb.path}
                  className="flex items-center"
                  itemScope
                  itemProp="itemListElement"
                  itemType="https://schema.org/ListItem"
                >
                  {index > 0 && (
                    <FiChevronRight 
                      className="h-4 w-4 text-gray-400 mx-2" 
                      aria-hidden="true" 
                    />
                  )}
                  
                  {isLast ? (
                    <span 
                      className="text-gray-600 font-medium"
                      itemProp="name"
                      aria-current="page"
                    >
                      {index === 0 && <FiHome className="inline h-4 w-4 mr-1" aria-hidden="true" />}
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="text-primary hover:text-accent transition-colors flex items-center"
                      itemProp="item"
                      title={`Go to ${crumb.name}`}
                    >
                      {index === 0 && <FiHome className="h-4 w-4 mr-1" aria-hidden="true" />}
                      <span itemProp="name">{crumb.name}</span>
                    </Link>
                  )}
                  
                  <meta itemProp="position" content={String(index + 1)} />
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}

Breadcrumb.propTypes = {
  customItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

Breadcrumb.defaultProps = {
  customItems: null,
};
