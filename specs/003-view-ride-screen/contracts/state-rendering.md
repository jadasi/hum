# Contract: Ride State Rendering

This contract defines the expected screen behavior for each ride state. Tests should assert these outcomes without depending on native map or bottom-sheet internals.

## Shared Shell

- The ride screen renders a map surface for every supported state.
- The ride screen renders a bottom sheet for every supported state.
- The default snap point represents a balanced map/content split; **active driving states** use a lower default snap so more map stays visible while the primary transition remains reachable.
- The sheet exposes collapsed/balanced/expanded states.
- The visible content includes one unambiguous primary action.

## Pending

- Map mode: `pickup_to_dropoff`.
- Required sheet content: rider summary, pickup, dropoff, suggested quote, quote note when available.
- Pending quotes are **editable in-sheet** before confirm; invalid amounts disable confirm until corrected.
- Optional sheet content: platform comparison, flight summary.
- Must not render blank platform or flight sections.
- Primary action: quote/confirm decision.

## Confirmed

- Map mode: `current_to_pickup_to_dropoff` when current location exists; fallback to pickup/dropoff overview when not.
- Required sheet content: rider summary, trip agenda, pickup/dropoff, accepted or quoted amount.
- Optional sheet content: pre-trip confirmation status, flight status, leave-time reminder.
- Primary action: start ride / navigate to pickup.
- Secondary action: send or review pre-trip confirmation when available.

## Driving To Pickup

- Map mode: `current_to_pickup`.
- Required sheet content: concise rider and pickup context.
- Required actions: contact passenger, start dropoff trip.
- Primary action: start dropoff trip.
- Content should prioritize navigation over detailed itinerary.

## Dropoff

- Map mode: `current_to_dropoff`.
- Required sheet content: concise rider and destination context.
- Required actions: contact passenger, end trip.
- Primary action: end trip.
- Content should prioritize navigation over detailed itinerary.

## Completed

- Map mode: `completed_summary`.
- Required sheet content: paid amount or payment status, ride summary, rider relationship context, note/tag entry point, HUM moment.
- New completed-state note/tag capture is a **local draft** in this slice (no persistence API yet); existing relationship notes from the read model still render when present.
- Optional sheet content: existing notes/tags, schedule-return prompt.
- Primary action: save and next ride.
- Secondary action: schedule return when available.

## Accessibility and Observability

- Every primary and secondary action must have an accessible label.
- Sheet controls must not require precise gestures to reach the primary action.
- Logs may include ride id, state, action id, and error category.
- Logs must not include phone numbers, full addresses, note bodies, tokens, or precise coordinates.
