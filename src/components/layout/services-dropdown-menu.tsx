import { AssistantLoading } from '@/components/ui/assistant-loading';
import { CommunityLoading } from '@/components/ui/community-loading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HealthLoading } from '@/components/ui/health-loading';
import { PlannerLoading } from '@/components/ui/planner-loading';
import { useServices } from '@/hooks/use-services';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export function ServicesDropdown() {
  const { services, handleServiceClick, currentPath } = useServices();

  const LoadingComponent =
    {
      '/planner': PlannerLoading,
      '/health-tracker': HealthLoading,
      '/community': CommunityLoading,
      '/assistant': AssistantLoading,
    }[currentPath || ''] || null;

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className="flex items-center px-4 py-2 text-sm font-medium transition 
          hover:bg-green-300 rounded-md group focus:outline-none"
        >
          <span>Services</span>
          <ChevronDown
            className="ml-1 h-4 w-4 transition-transform duration-200 
            group-data-[state=open]:rotate-180"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="rounded-lg border-none shadow-lg bg-white p-3 w-[280px]"
          sideOffset={6}
          collisionPadding={12}
          side="bottom"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = service.path === currentPath;

            return (
              <DropdownMenuItem key={service.name} asChild>
                <button
                  onClick={() => handleServiceClick(service.path)}
                  className={cn(
                    'flex items-start gap-3 p-3 w-full rounded-md my-1',
                    'transition-colors duration-200 hover:bg-gray-100',
                    isActive && 'bg-gray-50/75',
                  )}
                >
                  <div
                    className={cn(
                      'p-2.5 rounded-full flex items-center justify-center',
                      service.bgColor,
                      service.color,
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left space-y-0.5 py-0.5">
                    <span
                      className={cn(
                        'font-medium  text-gray-900',
                        isActive && 'font-bold',
                      )}
                    >
                      {service.name}
                    </span>
                    <span className="text-sm text-gray-500 line-clamp-2">
                      {service.description}
                    </span>
                  </div>
                </button>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      {LoadingComponent && <LoadingComponent />}
    </>
  );
}
