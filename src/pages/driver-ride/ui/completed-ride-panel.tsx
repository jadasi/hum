import { Pressable, TextInput, View } from 'react-native';

import { formatMoney } from '@/pages/driver-home';
import { formatRiderName } from '@/pages/driver-home/model/home-dashboard-formatters';
import { Text } from '@/shared/ui/primitives/text';

import type { LocalRelationshipDraft } from '../model/local-relationship-draft';
import { SUGGESTED_RELATIONSHIP_TAGS } from '../model/local-relationship-draft';
import type { RideViewReadModel } from '../model/ride-view-types';

export type CompletedRidePanelProps = {
  data: RideViewReadModel;
  draft: LocalRelationshipDraft;
  onChangeDraftBody: (body: string) => void;
  onToggleDraftTag: (tag: string) => void;
};

export function CompletedRidePanel({
  data,
  draft,
  onChangeDraftBody,
  onToggleDraftTag,
}: CompletedRidePanelProps) {
  const payment = data.pricing.accepted ?? data.pricing.quoted;
  const riderName = formatRiderName(data.rider.firstName, data.rider.lastName);
  const riderHistory = data.rider.totalRides === 1 ? '1 ride together' : `${data.rider.totalRides} rides together`;
  const routeDistance = data.route.distanceText;
  const routeDuration = data.route.durationText;
  const paymentMeta = [routeDistance, routeDuration, 'trip complete'].filter(Boolean).join(' · ');
  const humMoment =
    'Take a breath—small moments of care are what riders remember most. Thank you for representing HUM.';

  return (
    <View className="gap-4" testID="completed-ride-panel">
      <View className="items-center gap-3 rounded-3xl border border-primary/20 bg-primary/5 px-4 py-5" testID="completed-payment-summary">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-[1.8px] text-primary">Paid</Text>
        <Text className="font-sans text-[54px] font-hum-bold leading-[58px] text-primary">{formatMoney(payment)}</Text>
        <Text className="font-sans text-hum-xs text-muted-foreground">{paymentMeta}</Text>
      </View>

      <View className="gap-3 rounded-3xl border border-border bg-background px-4 py-4" testID="completed-rider-summary">
        <View className="gap-1">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            Rider relationship
          </Text>
          <Text className="font-sans text-hum-lg font-hum-bold text-foreground">{riderName}</Text>
          <Text className="font-sans text-hum-sm text-muted-foreground">
            {riderHistory} · {formatMoney(data.rider.lifetimeValue)} lifetime value
          </Text>
        </View>
        {data.rider.preferences.length ? (
          <View className="flex-row flex-wrap gap-2">
            {data.rider.preferences.map((preference) => (
              <View className="rounded-full bg-muted px-3 py-1.5" key={preference}>
                <Text className="font-sans text-hum-xs font-hum-semibold text-foreground">{preference}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {data.displayNote ? (
        <View className="gap-1 rounded-2xl border border-border bg-background px-3 py-3" testID="completed-display-note">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            Ride note
          </Text>
          <Text className="font-sans text-hum-sm text-foreground">{data.displayNote}</Text>
        </View>
      ) : null}

      {data.relationshipNotes.length ? (
        <View className="gap-2 rounded-2xl border border-border bg-background px-3 py-3" testID="completed-relationship-notes">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            Saved relationship notes
          </Text>
          {data.relationshipNotes.map((note) => (
            <View className="rounded-lg border border-border bg-muted/30 px-3 py-2" key={note.id}>
              {note.body ? <Text className="font-sans text-hum-sm text-foreground">{note.body}</Text> : null}
              {note.tags.length ? (
                <Text className="mt-1 font-sans text-hum-xs text-muted-foreground">{note.tags.join(' · ')}</Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}

      <View className="gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-3 py-3" testID="completed-hum-moment">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-primary">HUM moment</Text>
        <Text className="font-sans text-hum-sm text-foreground">{humMoment}</Text>
      </View>

      <View className="gap-2 rounded-3xl border border-border bg-background px-4 py-4">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
          Relationship memory
        </Text>
        <Text className="font-sans text-hum-xs text-muted-foreground">
          Capture one detail now so the next ride feels personal.
        </Text>
        <TextInput
          accessibilityLabel="Relationship note"
          className="rounded-xl border border-border bg-background px-3 py-3 font-sans text-hum-sm text-foreground"
          multiline
          onChangeText={onChangeDraftBody}
          placeholder="Quick memory about this rider..."
          testID="completed-draft-note"
          value={draft.body}
        />
        <View className="flex-row flex-wrap gap-2" testID="completed-draft-tags">
          {SUGGESTED_RELATIONSHIP_TAGS.map((tag) => {
            const selected = draft.tags.includes(tag);
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                className={`rounded-full border px-3 py-1.5 ${
                  selected ? 'border-primary bg-primary/10' : 'border-border bg-background'
                }`}
                key={tag}
                onPress={() => onToggleDraftTag(tag)}>
                <Text className="font-sans text-hum-xs font-hum-semibold text-foreground">{tag}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
