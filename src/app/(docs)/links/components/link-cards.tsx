import { Link } from "../constants/links";

interface LinkCardProps {
  link: Link;
}

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-lg hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transform hover:-translate-y-0.5"
    >
      <div className="flex items-start">
        {link.icon && (
          <div className="text-2xl mr-4 flex-shrink-0 w-8 text-center">
            {link.icon}
          </div>
        )}
        <div>
          <h3 className="font-medium text-lg">{link.title}</h3>
          {link.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {link.description}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}
