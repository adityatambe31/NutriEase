import { Link } from "../constants/links";
import LinkCard from "./link-cards";

interface ResourceSectionProps {
  title: string;
  links: Link[];
}

export default function ResourceSection({
  title,
  links,
}: ResourceSectionProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-5 pb-2 border-b dark:border-gray-800">
        {title}
      </h2>
      <div className="space-y-4">
        {links.map((link) => (
          <LinkCard key={link.title} link={link} />
        ))}
      </div>
    </div>
  );
}
