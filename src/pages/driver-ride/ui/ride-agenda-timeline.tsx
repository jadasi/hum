import { View } from 'react-native';

import { Text } from '@/shared/ui/primitives/text';

import type { RideAgendaItem } from '../model/ride-view-types';

type RideAgendaTimelineProps = {
  items: RideAgendaItem[];
};

function StatusDot({ status }: { status: RideAgendaItem['status'] }) {
  const bg =
    status === 'done' ? 'bg-primary' : status === 'active' ? 'bg-primary ring-2 ring-primary/30' : 'bg-muted-foreground/30';
  return <View className={`h-3 w-3 rounded-full ${bg}`} />;
}

export function RideAgendaTimeline({ items }: RideAgendaTimelineProps) {
  return (
    <View className="gap-3" testID="ride-agenda-timeline">
      {items.map((item, index) => (
        <View className="flex-row gap-3" key={item.id} testID={`ride-agenda-row-${item.id}`}>
          <View className="items-center pt-1">
            <StatusDot status={item.status} />
            {index < items.length - 1 ? <View className="mt-1 h-10 w-px flex-1 bg-border" /> : null}
          </View>
          <View className="min-w-0 flex-1 gap-0.5 pb-2">
            <Text className="font-sans text-hum-sm font-hum-semibold text-foreground">{item.title}</Text>
            {item.description ? (
              <Text className="font-sans text-hum-xs text-muted-foreground">{item.description}</Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
