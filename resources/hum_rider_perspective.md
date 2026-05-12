# HUM Rider Perspective — Design & Product Resource

## Document Purpose

This document captures the complete rider context for HUM's airport pickup feature slice. It is the companion to the driver perspective document and is intended as the primary reference for a design team or AI system building out the rider-side experience. It synthesizes insights from driver case studies (which contain extensive commentary on what riders want and feel), CEO conversations, and product strategy discussions. It does not prescribe specific screens or layouts. It describes who the rider is, what they are feeling at each stage of the experience, what information they need, and what the emotional design principles should be.

---

## Who Is the HUM Rider

### Not a "User" — A Client

The language matters. On Uber, riders are users. On HUM, they are clients. This distinction runs through every driver interview. Kevin calls them "my clients." Brian describes relationships where clients make him lunch, cry when he stops driving, and tell their doctor's receptionist to "call my private driver." Michele's clients give her gate codes and FOBs to their communities because they trust her completely.

The rider's relationship with HUM is fundamentally different from their relationship with Uber or Lyft. They are not requesting a commodity. They are engaging a service they have a personal connection to — even if that connection is with the platform's standard of quality rather than one specific driver.

### The CEO's Clarification: Many-to-Many, Not One-to-One

The CEO confirmed that riders should see HUM as their service, not be exclusively tied to a single driver. A rider may have multiple drivers they use depending on the day, availability, and route. This is a critical design distinction. The experience should build trust in the platform's consistent quality, not create dependency on one individual.

When a rider's usual driver is unavailable, the substitute should feel like a peer — another vetted HUM professional — not a random backup. The rider should never feel downgraded. The consistency is in the standard of service, not in the specific person.

### Rider Demographics and Segments

From the driver interviews, three primary rider segments emerge. Each has different needs, anxieties, and value drivers.

**Business travelers:** The highest-value segment. They fly one to two round trips per week (Michele's core clientele). They are frustrated by Uber's inconsistency, surge pricing, and the anxiety of landing and not knowing if their ride will show up. They value dependability above all else. Kevin's best client, Anthony Williams, came through a referral specifically because "he doesn't like using Uber and Lyft — he says they're not dependable." These riders will pay a premium for reliability and will become recurring clients quickly if the first experience is strong.

**Safety-conscious riders (especially women):** Michele specifically caters to women "because women are now starting to be a little hesitant with doing Uber rides and Lyft rides, especially at night." She reinforces the safety feature — you know your driver, you have a relationship, you are not getting into a stranger's car. This segment values knowing who is picking them up, seeing their photo and vehicle in advance, and having an in-app communication channel rather than sharing personal phone numbers.

**Elderly and mobility-limited riders:** Brian's client base included elderly women he took to hair and doctor appointments, and a mother in her 80s he drove to visit her sister with Alzheimer's. He describes it as "terrifying to be a little old lady around 80 with Uber and Lyft most of the time." These riders need simplicity, consistency, and a driver who will handle their luggage without being asked. The experience must be accessible and low-friction — possibly even simpler than what other segments need.

**Recurring local riders:** Brian's commuters — the Jack in the Box manager picked up at 6am every day, the single mom taken to work and her son to school. These riders value routine, punctuality, and bundled pricing. They chose HUM because a private driver who shows up at the same time every day for a flat daily rate is superior to gambling on Uber's availability and pricing each morning.

---

## How Riders Currently Find and Use HUM

### The Conversion Funnel

Riders do not typically discover HUM through marketing, app stores, or advertising. They discover it through their driver. The conversion almost always happens in the backseat of an Uber or Lyft ride. The driver hands them a card, makes a pitch, and offers a better deal for their return trip.

Kevin's airport pitch is the template: "You probably paid more than $50 for this ride. How about I take you back for $45? Just send me your flight info the day before. I'll be right here when you walk out the door."

Michele converts by reinforcing safety and personal connection. Brian converts by selling himself and his service, then mentioning HUM as the platform that makes it legitimate and insured.

The rider's first impression of HUM is therefore not the app or website — it is the driver. The app's job is to not undermine that impression. It must feel as polished and professional as the pitch that got them there.

### Current Communication Channels

Right now, most driver-rider communication happens via text message, WhatsApp, or phone calls. Scheduling happens informally: "Text me your flight info the day before." Payment happens through Square, Venmo, CashApp, Zelle, or PayPal. The rider experience is fragmented across multiple channels and apps.

This fragmentation creates friction and anxiety. Did the driver get my text? Did they see my flight info? Are they actually going to be there? There is no confirmation flow, no status updates, no centralized place to check on the ride.

---

## The Airport Pickup — The Signature Rider Experience

### Why This Is the Defining Moment

The airport pickup is where HUM's value proposition is most tangible. It is also the moment of highest anxiety in the entire rideshare experience. You have just landed after a flight. You are tired. You have luggage. You are in a busy, loud airport. You need to get home or to a hotel. On Uber, this means: open the app, request a ride, wait 5-10 minutes, watch the driver circle the terminal, try to find each other in a sea of cars, and hope they do not cancel.

Kevin's passengers describe the alternative as "relief." The exact quote from his framework: "You don't know how much stress you relieve me of by allowing me to count on you."

The product must deliver this feeling of relief systematically — not just when Kevin is the driver.

### The Airport Pickup Timeline — Rider Perspective

The following describes the sequence of events, information needs, and emotional states the rider moves through. Each phase has distinct anxiety points that the product should address.

**Phase 1: Booking the Ride (days before travel)**

The rider has a trip coming up. They need to schedule a pickup for their return flight. At this stage, the rider's primary need is simple: I want to know that someone will be there when I land.

The booking flow should require minimal information: date, flight number (or airline and route so the system can identify it), and pickup location (which for airport pickups is deterministic — the airport). The rider should not need to know terminal numbers, gate information, or arrival times. The flight number contains all of that, and the system should resolve it.

Upon booking, the rider should receive immediate confirmation: your ride is confirmed. A driver will be assigned and you will be notified. If a specific driver is already assigned, the rider should see their name, photo, vehicle type and color, and rating. If driver assignment happens closer to the date, the rider should be told when to expect that information.

The emotional need at this stage is certainty. "It is handled. I do not need to think about this again until I land."

**Phase 2: Pre-Travel Confirmation (24 hours before)**

Kevin confirms his clients 24 hours in advance. This is not just a courtesy — it is a trust-building ritual. The rider should receive a confirmation message the evening before their return flight. This message should include: your driver's name, a reminder of the flight they are tracking, and a simple reassurance that everything is set.

If the driver has changed (due to a schedule conflict or posse handoff), this is when the rider should be informed — with the substitute driver's full details and an explicit note that they are a vetted HUM driver trusted by the original. The tone should be: "Your original driver David can't make it, but he's arranged for Brian to pick you up. Brian drives a white Tesla Model Y and has a 4.9 rating across 800+ rides. He knows your route and will be waiting at the door."

The emotional need here is reassurance. "Someone is thinking about me. This is not going to fall through."

**Phase 3: In-Flight (during travel)**

While the rider is in the air, they cannot do anything. But when they land and turn on their phone, they should see evidence that their driver has been tracking their flight. This is the moment that separates HUM from everything else.

The ideal notification upon landing: "Welcome back. Your driver Kevin is tracking your flight and will be waiting at Door 4, Terminal 4. Your bags will be at Carousel 3. Look for a silver Chevy Equinox."

This message should appear before the rider even thinks to check their app. It should be a push notification, visible on the lock screen. It should contain everything the rider needs to walk from their gate to their car without opening the app, calling anyone, or sending a single text.

Kevin describes this as eliminating "all anxiety." The rider's reaction to this message should be: "I don't have to do anything. They already know."

**Phase 4: Baggage and Walk to Pickup (the highest-anxiety window)**

The rider has landed, collected their bags, and is walking toward the exit. This is the moment of maximum anxiety on Uber: Is my driver here? Which door? Where do I go? Will they find me?

On HUM, the rider should already know exactly which door to walk to. But as they approach, they should receive a real-time update: "Your driver is here. Door 4. Silver Equinox." Ideally, this includes the driver's live location — not a map with a moving dot (that is Uber's anxiety-inducing interface), but a simple status: "Your driver is parked at Door 4" or "Your driver is 2 minutes away, approaching Door 4."

Kevin's airport pickup at the Fiesta Bowl illustrates the gold standard: he told the crowd to part, had the door open, loaded the luggage, and the client was in the car within seconds of walking outside. The product cannot manufacture that charisma, but it can ensure the informational scaffolding is perfect — the rider knows exactly where to go and exactly what to look for.

**Phase 5: The Pickup Itself**

The rider gets in the car. The ride begins. At this point, the app fades into the background. The experience is now human — the conversation, the music, the driving quality. The app should not intrude.

If the rider wants to see route progress, estimated arrival, or any ride details, those should be available but not pushed. The ride experience should feel private and personal, not monitored.

**Phase 6: Drop-Off, Rating, and Re-Engagement**

The ride ends. The rider is home or at their hotel. Payment should be automatic or a single-tap confirmation — not a multi-step process with tip screens, surge explanations, and service fee breakdowns. This is one of the key differentiators discussed in the brainstorming sessions: the driver gets 100% of the fare. There is no Uber-style fee layering. The price the rider was quoted is the price they pay.

**Tipping:** This was discussed extensively. The consensus is that tipping should be available but not imposed. It should never appear before or during payment. It should be secondary — a small option that appears after the ride is complete, not a screen that blocks payment completion. The rider should never feel guilted or pressured. The suggested approach: after the ride, the rider can rate their driver. Below the rating, a small, understated option: "Would you like to leave a tip?" No pre-selected amounts. No guilt-inducing default percentages. Just an open field if they choose.

An alternative discussed: periodic appreciation prompts rather than per-ride tip screens. After 10 rides with the same driver (or on HUM generally), a gentle prompt: "You've taken 10 rides with Kevin. Would you like to say thanks?" This frames tipping as appreciation for a relationship, not an obligation per transaction.

**Re-booking:** After the ride, the rider should be able to immediately schedule their next trip. If they are a business traveler who flies weekly, the system should make recurring bookings effortless: "Schedule this same pickup every Monday?" The path from one-time rider to recurring client should be as frictionless as possible.

---

## Trust and Confidence — The Core Rider Emotions

### What Riders Are Escaping

Every driver interview contains vivid descriptions of what riders hate about traditional rideshare. These are the anxieties HUM must eliminate.

**Unpredictability:** "I thought we were going to die on that ride" — a frequent complaint Kevin hears about Uber drivers. Erratic driving, hard braking, zig-zagging through traffic. HUM drivers are vetted and relationship-driven. The rider should feel safe before they even get in the car.

**Surge pricing:** Brian's clients were stunned when they were charged $50 for a six-mile ride during surge. HUM's rate card eliminates this. The price quoted is the price paid. No surge, no dynamic pricing, no surprise fees.

**Anonymity and randomness:** On Uber, you never know who is picking you up. It could be a great driver or a terrible one. With HUM, the rider knows their driver. They have seen their photo, their vehicle, their rating. If they have ridden with them before, they know their name, their conversation style, their driving quality.

**Feeling like a transaction:** Uber's interface treats riders as inputs to an algorithm. HUM's model treats riders as clients of a professional. Brian's clients brought him lunch. They cried when he stopped driving. That level of human connection does not happen when you are a data point being routed to the nearest available vehicle.

### What Riders Want to Feel

**Relief:** "You don't know how much stress you relieve me of by allowing me to count on you." This is the north star emotion. Every design decision should be tested against it: does this reduce the rider's anxiety or add to it?

**Cared for:** The 24-hour confirmation, the proactive flight tracking, the "I'm here" notification — these communicate: someone is thinking about you. You are not managing this yourself.

**Premium without pretension:** The brainstorming sessions described the desired aesthetic as "marble white with black contrasts" — clean, premium, luxurious. But the service itself is warm and personal, not cold and formal. Brian wears bowling shirts and plays Wayne Newton. Kevin jokes with his clients. Michele bonds over shared experiences. The product should feel elevated but approachable — a concierge who is also a friend, not a butler in a tuxedo.

**In control without effort:** The rider should always know what is happening (flight is tracked, driver is assigned, pickup is confirmed) without having to manage any of it. Information is pushed to them. They never need to pull.

---

## The Rider's Relationship with HUM (the Platform)

### Trust in the Brand, Not Just the Person

The CEO's clarification that riders should see HUM as their service — not be tied to one driver — has significant design implications. The rider's trust must be built in the platform's standard, not just in their favorite driver.

This means:

**Consistent quality signals:** Every driver the rider encounters should present the same level of professionalism. The auto-generated pickup messages, the flight tracking, the proactive notifications — these are platform features, not individual driver features. They should feel like HUM's standard, not like something Kevin does but other drivers do not.

**Driver profiles that build confidence:** When a rider is assigned a driver they have not used before, the profile should contain enough information to establish trust: photo, vehicle, rating, number of rides completed, years active on HUM, and possibly a brief personal note. Not a dating profile — just enough to answer: "Is this person going to take good care of me?"

**Seamless transitions between drivers:** If a rider's usual driver is unavailable and a substitute is assigned via the posse system, the rider should feel that continuity is maintained. The substitute should have access to relevant context: pickup location preferences, any notes the original driver logged, the rider's typical route. The rider should not have to re-explain anything.

**Platform-level quality assurance:** Ratings and ride history should be visible and meaningful. But the rating system should be fairer than Uber's star system. The brainstorming sessions discussed the problem with star ratings: one bad rating tanks an average unfairly. A trend-based system — looking at patterns over time rather than individual data points — is more equitable and more informative. The rider should see evidence of consistent quality, not a fragile average that one bad day can destroy.

### Privacy and Boundaries

Several important privacy considerations emerged from the discussions.

**Phone number protection:** Some riders do not want to share their personal phone number with a driver. The app should facilitate communication without requiring personal number exchange. In-app messaging serves this function. The rider can communicate with their driver through the platform, and both parties' personal information remains private unless they choose to share it.

**Communication boundaries:** The driver is a professional, not a friend (at least not initially). In-app communication should be focused on ride logistics — scheduling, status updates, arrival notifications. If the relationship deepens over time and both parties want to exchange personal contact information, that is their choice. But the app should not push riders toward a level of personal connection they are not comfortable with.

**Data visibility:** The rider should control what information is visible to drivers. Their name and pickup/dropoff locations are necessary. Beyond that — ride frequency with other drivers, personal notes other drivers have logged, rating history — should be considered carefully. The rider should feel that HUM protects their information.

---

## The Rider-Side App — Functional Requirements by Phase

### Discovery and Onboarding

A rider typically enters the HUM ecosystem through a driver interaction — a scanned QR code, a business card, an invite code, or a direct referral. The onboarding flow should be minimal: name, contact method, payment information. No lengthy profile creation, no tutorial, no gamification. The rider is here because a driver just gave them an excellent experience. The app should not get in the way of that momentum.

If the rider was referred by a specific driver, that driver should appear as their first connection. If they scanned a QR code or used an invite code, the system should automatically link them.

### Scheduling a Ride

The primary action for a rider is scheduling a pickup. This should be the most prominent and accessible action in the app. The information required: date, time, pickup location, dropoff location, and optionally a flight number for airport pickups. For recurring rides, the system should support repeating schedules with minimal input.

The rider should receive immediate confirmation with driver assignment details (or a timeline for when assignment will happen). They should be able to view, modify, or cancel upcoming rides easily.

### Viewing Upcoming and Past Rides

The rider should have a clear view of their upcoming scheduled rides and their ride history. Upcoming rides should show: date, time, driver name and photo, vehicle, and current status (confirmed, driver assigned, driver en route, etc.). Past rides should show: date, route, driver, amount paid, and the option to rebook the same ride.

### Communication with Drivers

In-app messaging should be simple and purpose-built for ride coordination. It is not a general chat platform. Messages should be organized by driver, with the most recent or upcoming ride conversation at the top. The rider should be able to request a ride through the messaging interface (a structured request, not a freeform text) and receive automated status updates (driver confirmed, driver on the way, driver arrived) in the same thread.

### Notifications

Push notifications are the rider's primary interface with HUM during the airport pickup flow. They must be timely, informative, and calming. The notification sequence for an airport pickup:

1. **24 hours before:** "Your pickup tomorrow is confirmed. [Driver name] will be tracking your flight."
2. **Upon landing:** "Welcome back. [Driver name] is at [Door X], [Terminal Y]. Bags at Carousel [Z]. Look for [vehicle description]."
3. **Driver arrived:** "[Driver name] is here. [Door X]. [Vehicle description with photo if available]."
4. **Ride complete:** "You've arrived. Thanks for riding with HUM."

Each notification should be self-contained — the rider should be able to act on it without opening the app.

### Rating and Feedback

After each ride, the rider should be prompted to rate the experience. The rating should be simple — not a five-star system with sub-categories, but a meaningful signal of quality. Options discussed include: a trend-based system that weighs patterns over individual ratings, or a binary "would you ride with this driver again?" that is more informative than a star.

The rating should be quick and optional. If the rider does not rate, that is fine. If they do, it should take seconds, not minutes. The tip option appears after the rating, understated and unpressured.

---

## Emotional Design Principles — How the Rider App Should Feel

**Calm and assured.** The rider should never feel anxious while using HUM. Every element should communicate: we have this handled. Muted tones, clear typography, generous spacing. No countdown timers, no surge warnings, no urgency cues.

**Premium without friction.** The aesthetic should communicate quality — clean, sophisticated, intentional. But the interactions should be effortless. No unnecessary steps, no forms with ten fields, no tutorial modals. The premium feeling comes from the polish and the experience, not from making things complicated.

**Personal without invasive.** The rider should feel known — their name, their preferences, their usual routes. But not surveilled. The personalization should feel like a good concierge who remembers your name and your drink order, not like an algorithm that tracks your behavior.

**Information-forward.** The rider should always know what is happening next. No ambiguity, no "your driver is on the way" without context. Specifics: which driver, what vehicle, which door, how far. Clarity is the antidote to anxiety.

**Human at the core.** The app facilitates a human relationship. The driver is a real person with a name, a face, a story. The experience should never feel automated or algorithmic. Even automated messages (flight tracking notifications, arrival alerts) should feel like something a thoughtful person would send, not something a system generated.

---

## What Sets HUM Apart — The Rider Value Proposition

For design reference, these are the core differentiators that the rider experience must communicate, explicitly or implicitly.

**Your driver gets 100% of what you pay.** No hidden fees, no platform take that inflates pricing. The fare is fair for both parties. This eliminates the guilt many riders feel about Uber's pricing model and creates goodwill.

**No surge pricing.** The rate is the rate. You will never open the app and see your usual $30 ride priced at $75 because it is raining. This alone is a major anxiety reducer for frequent riders.

**You know who is coming.** Not a random driver assigned by an algorithm. A vetted professional whose photo, vehicle, rating, and history you can see before they arrive. And if you have ridden with them before, you know exactly what to expect.

**Proactive communication, not reactive scrambling.** Your driver tracks your flight. They send you pickup details before you ask. They are at the door before you walk out. You never chase information — it comes to you.

**A relationship, not a transaction.** Over time, your driver knows your route, your preferences, your conversation style. They know you have a baby seat to load. They know you prefer quiet morning rides. This is not data in a profile — it is a human who remembers you.

**HUM is your service.** Even if your usual driver is unavailable, the standard does not drop. Another trusted HUM driver steps in with the same professionalism, the same tools, the same level of care. The consistency is in the platform, not dependent on one individual.

---

## Summary of Core Rider Needs for the Airport Pickup Slice

1. A booking flow that requires minimal input — date and flight number should be sufficient for the system to resolve all other details.
2. Immediate confirmation upon booking with driver assignment details (or a clear timeline for when to expect them).
3. A 24-hour pre-trip confirmation with driver details, communicating that the ride is actively being managed.
4. An automatic upon-landing notification with gate, carousel, door, and vehicle description — containing everything the rider needs to walk to their car without opening the app.
5. A "driver is here" notification with specific location and vehicle photo.
6. Automated ride status updates (on the way, arrived, ride started, ride complete) that require zero rider action.
7. Seamless payment at the quoted rate with no surprise fees, surge adjustments, or multi-step checkout.
8. An understated, post-ride rating and optional tipping flow that never pressures the rider.
9. Easy rebooking — schedule the next ride from the ride completion state, with support for recurring schedules.
10. Driver profiles that build trust: photo, vehicle, rating history (trend-based, not fragile averages), and rides completed.
11. In-app communication that protects privacy (no personal phone number exchange required) and stays focused on ride logistics.
12. Graceful driver substitution when the assigned driver is unavailable — full context transfer, no degradation in experience quality.

The north star for every feature: can a rider who has never used HUM before feel, on their very first airport pickup, the same relief that Kevin's long-time clients describe?
