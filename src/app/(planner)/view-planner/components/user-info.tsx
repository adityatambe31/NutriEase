'use client';

import { UserAvatar } from '@/auth/components/user-avatar';
import { User, UserSelection } from '@/types/meal-plan';
import { useSession } from 'next-auth/react';
import { FaCalendarAlt, FaRunning, FaUser } from 'react-icons/fa';
import { GiBodyHeight, GiChopsticks, GiMeal } from 'react-icons/gi';

interface UserInfoProps {
  userSelection: UserSelection;
  user: User;
}

export default function UserInfo({ userSelection, user }: UserInfoProps) {
  const { data: session } = useSession();

  const displayName =
    session?.user?.name ||
    user?.givenName ||
    user?.given_name ||
    user?.name ||
    'N/A';

  const avatarUrl = session?.user?.image || user?.picture;

  return (
    <div className="p-3 md:p-6 w-full mx-auto">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-4 md:mb-6">
        User Information
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
        <div className="flex-shrink-0">
          <UserAvatar
            src={avatarUrl}
            alt={displayName}
            size={128}
            className="w-28 h-28 md:w-32 md:h-32 border-4 border-green-500"
            showFallbackIcon
          />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
          {/* Left Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaUser className="text-blue-500 text-xl md:text-2xl" />
              <span className="font-medium text-sm md:text-lg">Name:</span>
              <span className="text-sm md:text-lg">{displayName}</span>
            </div>

            <div className="flex items-center gap-2">
              <GiChopsticks className="text-yellow-500 text-xl md:text-2xl" />
              <span className="font-medium text-sm md:text-lg">
                Cultural Preference:
              </span>
              <span className="text-sm md:text-lg">
                {userSelection?.culturalPreference || 'Not specified'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500 text-xl md:text-2xl" />
              <span className="font-medium text-sm md:text-lg">Age:</span>
              <span className="text-sm md:text-lg">
                {userSelection?.age || 'Not specified'}
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GiBodyHeight className="text-purple-500 text-xl md:text-2xl" />
              <span className="font-medium text-sm md:text-lg">Height:</span>
              <span className="text-sm md:text-lg">
                {userSelection?.height
                  ? `${userSelection.height} cm`
                  : 'Not specified'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <GiMeal className="text-orange-500 text-xl md:text-2xl" />
              <span className="font-medium text-sm md:text-lg">
                Dietary Restrictions:
              </span>
              <span className="text-sm md:text-lg">
                {userSelection?.dietaryRestrictions || 'None'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaRunning className="text-yellow-500 text-xl md:text-2xl" />
              <span className="font-medium text-sm md:text-lg">
                Activity Level:
              </span>
              <span className="text-sm md:text-lg">
                {userSelection?.activityLevel || 'Not specified'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
