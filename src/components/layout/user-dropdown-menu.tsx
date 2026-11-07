'use client';

import { UserAvatar } from '@/auth/components/user-avatar';
import { cn } from '@/lib/utils';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { User } from 'next-auth';
import Link from 'next/link';
import { BiInfoCircle } from 'react-icons/bi';
import { FiBarChart2, FiDownload } from 'react-icons/fi';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { RiLogoutBoxRLine, RiQuestionLine, RiUser3Line } from 'react-icons/ri';
import { VscLinkExternal, VscTerminalCmd } from 'react-icons/vsc';

type DropdownItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  devOnly?: boolean;
};

function DropdownItem({
  icon,
  label,
  onClick,
  href,
  className,
  devOnly = false,
}: DropdownItemProps) {
  const isDev = process.env.NODE_ENV === 'development';

  if (devOnly && !isDev) return null;

  const content = (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 outline-none',
        className,
      )}
    >
      <span className="text-gray-500 dark:text-gray-400">{icon}</span>
      <span>{label}</span>
    </div>
  );

  if (href) {
    return (
      <DropdownMenu.Item asChild>
        <Link href={href}>{content}</Link>
      </DropdownMenu.Item>
    );
  }

  return (
    <DropdownMenu.Item onClick={onClick} className="outline-none">
      {content}
    </DropdownMenu.Item>
  );
}

type UserDropdownProps = {
  user: User;
  onSignOut: () => Promise<void>;
};

export function UserDropdown({ user }: UserDropdownProps) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 h-auto transition-colors"
          aria-label="User menu"
        >
          <p className="text-sm">{user.name || 'User'}</p>
          <UserAvatar src={user.image} alt={user.name || ''} size={32} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white dark:bg-gray-900 rounded-lg p-2 shadow-lg border border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-2"
          sideOffset={5}
          align="center"
          alignOffset={0}
          avoidCollisions={true}
        >
          {/* User info section */}
          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800 mb-1">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </div>
          </div>

          <DropdownItem
            icon={<HiOutlinePencilAlt className="text-lg" />}
            label="Create Meal Plan"
            href="/planner"
          />
          <DropdownItem
            icon={<FiBarChart2 className="text-lg" />}
            label="View Meal Plan"
            href="/plan-history"
          />
          <DropdownItem
            icon={<FiDownload className="text-lg" />}
            label="Export Meal Plan"
            href="/export-plan"
          />

          <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-800 my-1" />

          <DropdownItem
            icon={<RiUser3Line className="text-lg" />}
            label="Profile"
            href="/profile"
          />
          <DropdownItem
            icon={<VscTerminalCmd className="text-lg" />}
            label="Console"
            href="/console"
            devOnly={true}
          />

          <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-800 my-1" />

          <DropdownItem
            icon={<BiInfoCircle className="text-lg" />}
            label="About"
            href="/about"
          />
          <DropdownItem
            icon={<VscLinkExternal className="text-lg" />}
            label="Links"
            href="/links"
            devOnly={true}
          />
          <DropdownItem
            icon={<RiQuestionLine className="text-lg" />}
            label="Help"
            href="/help"
          />

          <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-800 my-1" />

          <DropdownItem
            icon={<RiLogoutBoxRLine className="text-lg" />}
            label="Sign Out"
            href="/auth/signout"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          />

          <DropdownMenu.Arrow className="fill-white dark:fill-gray-900" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function MobileUserDropdown({ user }: UserDropdownProps) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center">
        <UserAvatar src={user.image} alt={user.name || ''} size={32} />
        <div className="text-lg font-medium mt-2">{user.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2"></div>

      <Link href="/planner" className="w-full">
        <div className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <HiOutlinePencilAlt className="text-lg text-gray-500" />
          <span>Create Meal Plan</span>
        </div>
      </Link>

      <Link href="/plan-history" className="w-full">
        <div className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <FiBarChart2 className="text-lg text-gray-500" />
          <span>View Plan</span>
        </div>
      </Link>

      <Link href="/export-plan" className="w-full">
        <div className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <FiDownload className="text-lg text-gray-500" />
          <span>Export Plan</span>
        </div>
      </Link>

      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2"></div>

      <Link href="/profile" className="w-full">
        <div className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <RiUser3Line className="text-lg text-gray-500" />
          <span>Profile</span>
        </div>
      </Link>

      {isDev && (
        <Link href="/console" className="w-full">
          <div className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <VscTerminalCmd className="text-lg text-gray-500" />
            <span>Console</span>
          </div>
        </Link>
      )}

      <Link href="/about" className="w-full">
        <div className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <BiInfoCircle className="text-lg text-gray-500" />
          <span>About</span>
        </div>
      </Link>

      {isDev && (
        <Link href="/links" className="w-full">
          <div className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <VscLinkExternal className="text-lg text-gray-500" />
            <span>Links</span>
          </div>
        </Link>
      )}

      <Link href="/help" className="w-full">
        <div className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <RiQuestionLine className="text-lg text-gray-500" />
          <span>Help</span>
        </div>
      </Link>

      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2"></div>

      <Link href="/auth/signout" className="w-full">
        <div className="flex items-center gap-2 p-3 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
          <RiLogoutBoxRLine className="text-lg" />
          <span>Sign Out</span>
        </div>
      </Link>
    </div>
  );
}
