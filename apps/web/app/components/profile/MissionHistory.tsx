'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger, Badge } from '@H1V3M1ND/ui';

import { Mission, MissionStatus } from '@/lib/types';
import { Clock, Target, Award } from 'lucide-react';

interface MissionHistoryProps {
  activeMissions: Mission[];
  completedMissions: Mission[];
  totalEarned: number;
}

export function MissionHistory({
  activeMissions,
  completedMissions,
  totalEarned,
}: MissionHistoryProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: MissionStatus) => {
    switch (status) {
      case MissionStatus.Active:
        return 'bg-blue-500/20 text-blue-400 border-blue-400/50';
      case MissionStatus.InProgress:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50';
      case MissionStatus.Completed:
        return 'bg-green-500/20 text-green-400 border-green-400/50';
      case MissionStatus.Failed:
        return 'bg-red-500/20 text-red-400 border-red-400/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/50';
    }
  };

  const MissionCard = ({ mission }: { mission: Mission }) => (
    <div className="bg-cyber-dark border border-cyber-purple/50 rounded-lg p-4 hover:border-cyber-purple transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white">{mission.title}</h3>
        <Badge variant="outline" className={getStatusColor(mission.status)}>
          {mission.status}
        </Badge>
      </div>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{mission.description}</p>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center space-x-1 text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{mission.baseRequirements.timeLimit}h</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <Target className="w-4 h-4" />
          <span>{mission.baseRequirements.stakeAmount} Project89</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <Award className="w-4 h-4" />
          <span>{formatDate(mission.createdAt)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-black/20 rounded-lg p-4 border border-cyber-purple/50">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="w-4 h-4 text-cyber-purple-light" />
          <span className="text-gray-400">Total Earnings</span>
        </div>
        <p className="text-2xl font-bold text-white">{totalEarned} Project89</p>
        <p className="text-sm text-gray-400">From {completedMissions.length} completed missions</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active ({activeMissions.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedMissions.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 mt-4">
          {activeMissions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No active missions</div>
          ) : (
            activeMissions.map((mission) => <MissionCard key={mission.id} mission={mission} />)
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {completedMissions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No completed missions yet</div>
          ) : (
            completedMissions.map((mission) => <MissionCard key={mission.id} mission={mission} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
