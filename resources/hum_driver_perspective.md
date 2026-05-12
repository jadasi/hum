# HUM Driver Perspective — Design & Product Resource

## Document Purpose

This document captures the complete driver context for HUM's airport pickup feature slice. It is intended as the primary reference for a design team or AI system building out the driver-side experience. It synthesizes insights from driver case study interviews (Kevin Gabel, Michele White, Brian Sorenson), Kevin's 14-Point Framework, CEO conversations, and product strategy discussions. It does not prescribe specific screens or layouts. It describes behaviors, mental models, emotional states, information needs, and workflow patterns that the experience must support.

---

## Who Is the HUM Driver

### Identity

The HUM driver is not a gig worker. They are an independent professional running their own private driving business. HUM is the operating system behind that business — it provides insurance, a rate card, community, and (in the near future) the toolset to manage their client relationships and deliver a concierge-level experience.

This identity shift is the single most important psychological transformation HUM facilitates. Kevin Gabel describes it as stepping off "the plantation." Michele White describes it as returning to the self-employment lifestyle she had in the beauty industry. Brian Sorenson describes it as becoming "the neighborhood taxi guy" — a community fixture, not an anonymous contractor.

### The Typical Driver Profile

HUM's current driver base in Phoenix shares several characteristics that inform how the product should feel and function.

**Professional background:** Many drivers came from structured careers — Kevin from 20 years in the Navy and CDOT, Brian from software engineering and NASA, Michele from the beauty industry and American Express travel. These are people accustomed to professional standards, not casual gig workers.

**Entrepreneurial mindset (or developing one):** Some drivers arrive with business instincts (Michele signed up the same night she heard about HUM). Others need coaching to shift from "turn on the app and wait" to "I am building a client base." The product must serve both ends of this spectrum.

**Relationship builders:** The drivers who succeed on HUM are conversationalists. Kevin credits his grandfather's philosophy: "You never meet a stranger." Brian describes himself as a performer on stage. Michele converts riders by reinforcing safety and personal connection. The app should amplify this skill, not replace it.

**Age and tech comfort:** Many successful HUM drivers are middle-aged or older. Kevin is a Navy retiree. Brian drives a Tesla but is self-described as "boring with touches of Asperger's." The interface must be immediately legible, not clever. Minimal cognitive load. Large touch targets. Clear hierarchy.

### Driver Archetypes

Kevin's framework identifies two core business models drivers adopt, and the product must support both.

**The Scheduler:** Fills their week with recurring private clients — same people, same times, same routes. Predictable guaranteed income. Downside: locked into someone else's schedule and may miss higher-value rides. Risk: when clients move or change jobs, that income disappears overnight.

**The Catch & Convert:** Operates by appointment only. Uses Uber and Lyft as a referral engine — every platform ride is a chance to hand someone a card and say "I'll pick you up for less when you come back." More flexibility, higher potential per-ride earnings, but less predictability. This is where Kevin landed and where he earns more.

Most drivers are a hybrid. Brian had standing morning commuters but also took airport runs and appointment-based rides. Michele focuses exclusively on airport runs for business travelers and has built a tight, high-value client list from that niche.

### Driver Lifecycle and Tenure

Not all drivers are lifers. The CEO confirmed that some come and go within months, more commonly within a few years. A small number have been consistent for four or more years. The product should not assume permanence. It should make a driver effective quickly (reducing the knowledge gap) and not penalize natural turnover. When a driver leaves, their clients should remain in the HUM ecosystem and be smoothly transitioned to other drivers.

---

## The Driver's Day — Workflow and Mental Model

### How They Currently Work

The typical HUM driver's day is a patchwork across multiple apps, communication channels, and mental contexts. Understanding this fragmentation is critical because HUM's opportunity is to consolidate the professional layer.

**Morning:** Check scheduled private client pickups. Confirm appointments via text or WhatsApp. Open Uber or Lyft to fill gaps between scheduled rides and prospect for new clients through platform rides.

**Between rides:** Check messages from clients. Respond to scheduling requests. Look at their calendar mentally or in a notes app. Maybe check flight status for an afternoon airport pickup using a third-party app like Planefinder ($20/year). Send confirmation messages manually — typing out gate numbers, carousel info, door numbers, and attaching a photo of their car.

**Airport pickups:** This is the highest-stakes, highest-differentiation moment. Kevin's process (which represents the gold standard HUM wants to democratize): track the flight using Planefinder, send proactive updates to the rider before they land, arrive before the passenger exits baggage claim, send a message with gate number, baggage carousel, door number, and a photo of the car. The rider walks out and gets straight in. No waiting, no circling, no anxiety.

**End of day:** Mentally tally earnings. Maybe log rides in a spreadsheet. Follow up with new contacts from today's Uber/Lyft rides. Send a card or a follow-up text.

**Pain points in this workflow:**
- Flight tracking requires a separate paid app and manual monitoring
- Pickup messages are composed manually every time, often while driving or standing at the curb
- There is no centralized view of today's appointments, upcoming rides, or client details
- Earnings from HUM rides versus platform rides are tracked separately if at all
- Client information (preferences, ride history, notes) lives in the driver's head or scattered across contacts and message threads
- Scheduling conflicts are discovered by memory, not surfaced proactively
- The handoff to another driver when unavailable happens via WhatsApp group chat — functional but not integrated

### What the App Should Feel Like When Opened

HUM is what the driver opens between Uber and Lyft rides. This is a critical framing from the CEO. It is not a replacement for those platforms yet — it is the professional layer that sits alongside them. The app should feel like opening a business dashboard, not another gig app. When a driver opens HUM, they should immediately see: what do I have coming up, who needs my attention, and how is my business doing.

The emotional register should be: competence, clarity, and control. Not urgency, not gamification pressure, not notification overload. The driver chose this path for freedom — the tool should reflect that.

---

## The Airport Pickup — The Signature Driver Experience

### Why This Moment Matters Most

The airport pickup is HUM's highest-differentiation touchpoint. It is the moment where the gap between traditional rideshare and HUM's concierge model is most visceral. On Uber, you land, request a ride, wait eight minutes, watch the driver circle, and hope they find you. With a HUM driver, you walk out the door and they are already there.

Kevin's passengers consistently say two things after their first HUM airport pickup: "That felt great" and "You guys need to be in more cities." This is the conversion moment — not the pitch in the car, not the business card. It is the feeling of walking out of an airport and having someone already waiting, having already handled everything.

The problem is that delivering this experience currently requires Kevin-level knowledge: knowing to use Planefinder, knowing to send the right message at the right time, knowing to include gate, carousel, door, and car photo. Most new drivers do not know any of this. The product must encode this expertise so that every driver — from day one — can deliver the Kevin experience.

### The Airport Pickup Timeline — Driver Perspective

The following describes the sequence of events, information needs, and emotional states the driver moves through during an airport pickup. Each phase has distinct requirements.

**Phase 1: Appointment Confirmed (hours to days before)**

The driver has an appointment on their agenda for an airport pickup. They know the client name, pickup time, and ideally the flight number. At this stage, the driver's need is confidence that the appointment is locked in and that they have all the information required. If the flight number is missing, the system should prompt for it — not as a nag, but as a "you'll want this for the pickup."

The driver may also need to see what else is on their schedule around this appointment. Can they take a morning Uber run and still make it to the airport by 2pm? If there is a conflict, they need to know now, not at 1:30pm.

**Phase 2: Day-Of Monitoring (morning of the pickup)**

The driver should be able to see the flight status at a glance within their daily agenda. Is the flight on time? Has it departed? Is it delayed? This information should update automatically. The driver should not have to open a separate app, enter a flight number, or manually refresh.

If the flight is delayed, the driver needs to know immediately — and they need to know by how much. A 30-minute delay means they can take another ride. A 3-hour delay means they need to restructure their afternoon. The system should surface this information proactively.

Kevin confirms clients 24 hours in advance. The system should support or automate this — a templated confirmation message sent the evening before, personalized with the client's name and flight details.

**Phase 3: Flight Landed (the critical window)**

This is the highest-intensity moment. The flight has landed. The driver needs to know immediately: which gate the passenger is arriving at, which baggage carousel they should use, and which door is closest to that carousel. This information comes from flight tracking data and airport layout.

The driver then needs to send a message to the rider. Kevin's version of this message includes: a greeting, confirmation that he sees they've landed, the gate number, the baggage carousel number, the door number he'll be waiting at, and a photo of his car. This message is the single most important communication in the entire HUM experience. It eliminates all rider anxiety. It is what makes people say "you don't know how much stress you relieve me of."

Currently, the driver composes this message from scratch every time. The system should generate this message with all relevant details pre-filled, ready to send with one tap. The driver should be able to review it, optionally attach or update their car photo, and send. One tap. Not five minutes of typing at the curb.

**Phase 4: Waiting at the Curb**

The driver is parked or circling at the specified door. They need to be able to signal to the rider that they have arrived — "I'm here, door 4, silver Equinox." This should be a one-tap action that generates a notification on the rider's end. The driver should not need to compose another text message while sitting in an active airport pickup lane.

**Phase 5: Pickup and Departure**

The rider gets in. The driver marks the ride as started. At this point, the system should handle the transition: the ride is active, the route is underway, and the rider receives automated status if desired. The driver's attention should be entirely on driving and conversation — not on the app.

**Phase 6: Drop-Off and Follow-Up**

The ride ends. The driver marks it complete. Payment is processed. The system should prompt the rider to rate the experience (more on this in the rider document). For the driver, this is also a moment to log notes about the client — preferences, conversation topics, anything that helps personalize future rides. This is the CRM layer.

If this was a new client (converted from an Uber/Lyft ride), the driver should be able to flag them as someone they want to keep in their client list. If it was an existing client, the ride history updates automatically.

---

## Client Management — The CRM Layer

### Why This Matters

Kevin has 175 contacts and 40 recurring clients. He keeps this information in his phone contacts. Brian categorized his clients into three classes: commuters, appointments, and airport. Michele focuses on business travelers, primarily women, who fly one to two round trips per week.

All of this client intelligence currently lives in the driver's head or their phone's contact list. There is no structured way to track ride history, preferences, frequency, revenue per client, or notes. The system should provide a lightweight but functional client management layer.

### What the Driver Needs to Know About Each Client

- Name and contact method
- Ride history (dates, routes, amounts paid)
- Frequency pattern (weekly commuter, monthly flyer, occasional appointment)
- Revenue generated (total and recent)
- Personal notes (preferences, conversation topics, special needs — e.g., "has a baby seat to load," "prefers quiet rides," "always flies into Terminal 4")
- Rating trend (are interactions improving or declining)
- How they were acquired (backseat capture from Uber, referral from another client, QR code scan)
- Whether they have used other HUM drivers (since the CEO confirmed riders may have multiple drivers)

### Flagging and Prioritization

Kevin carries two types of business cards — a personal card for clients he wants to keep, and a generic HUM promo card for everyone else. This filtering behavior should be reflected in the product. After a ride, the driver should be able to quickly categorize: "I want this person as a recurring client" versus "this was a one-time ride." This distinction affects how the system surfaces future opportunities and how client data is organized.

---

## The Posse — Driver Network and Handoffs

### How It Works Today

When a driver cannot make an appointment, they reach out via WhatsApp group to their trusted network of fellow HUM drivers. They describe the ride, the client, and the pickup details. The first driver to accept takes the ride. The original driver then messages the client: "I can't make it Tuesday, but my friend Brian knows your route. He'll take great care of you."

This works but is entirely manual and depends on the driver's social capital within the WhatsApp group.

### What the Product Should Support

The system should allow drivers to maintain a list of trusted fellow drivers (their "posse"). When a scheduling conflict arises or the driver needs coverage (vacation, illness, personal day), they should be able to offer the appointment to their posse through the app. The first to accept gets the ride, and the client is notified with the substitute driver's information — name, photo, vehicle, and rating.

This is not a marketplace. It is a trust-based referral within a closed network. The original driver is vouching for the substitute. The client should feel that continuity of care, not the randomness of a platform reassignment.

### The CEO's Clarification on Rider Relationships

The CEO confirmed that riders should see HUM as their service, not be exclusively tied to one driver. A rider may have multiple drivers they use depending on the day, time, or route. This means the posse handoff is not a failure state — it is a normal part of how HUM works. The system should normalize having multiple trusted drivers rather than treating a substitute as a downgrade.

---

## Pricing — The Driver's Control

### How Drivers Currently Price

HUM provides a rate card that serves as a baseline. Drivers have discretion to adjust. Kevin's approach: offer airport rides at a flat rate slightly below what the rider paid on Uber ("You probably paid more than $50 for this ride. How about I take you back for $45?"). Brian developed bundling models — packaging morning and afternoon commutes into a daily rate to compete with Lyft's cheap short rides. Michele focuses on airport runs where the margin is naturally higher.

Brian introduced a pricing insight: loyalty pricing. Regular clients get slightly lower rates because the guaranteed recurring revenue is worth more than maximizing per-ride income. One-off or new clients pay the standard rate. Poor-quality or difficult riders could theoretically pay a premium, though this is more concept than practice.

### What the Product Should Provide

The system should give drivers visibility into what platform apps are charging for similar routes so they can price competitively. It should support flexible pricing: flat rates, per-mile rates, bundled packages, and recurring client discounts. It should track earnings per client over time so the driver can see which relationships are most valuable.

The pricing tool should feel like a business aid, not a restriction. The driver sets their rates. The system provides data and suggestions. The driver decides.

---

## Earnings Visibility

### The Emotional Importance

Every driver interviewed referenced earnings as the proof point that HUM works. Kevin went from $1,500-$2,000/week working 70 hours to $4,000-$5,000/month working dramatically fewer hours. Michele cut her hours from 12-16 per day to 8 or fewer while maintaining her $300/day target. Brian described reaching a "retirement mode" where he stayed busy with private clients and stopped chasing platform rides.

The ability to see this transformation in real numbers — HUM earnings versus platform earnings, hours worked versus income, revenue trend over time — is not just a feature. It is the reinforcement loop that keeps drivers committed to building their private client base. It is the data behind the mindset shift.

### What the Driver Needs to See

- Today's earnings (HUM rides versus platform rides)
- Weekly and monthly totals with comparison to prior periods
- Revenue per client (who are my most valuable relationships)
- Hours worked versus income (am I working smarter)
- Progress toward personal goals (Kevin's framework: at least 10 HUM rides per week, get one HUM ride per day minimum)
- Percentage of income from private rides versus platform rides (Kevin's north star: 97% private)

---

## The Knowledge Gap — Onboarding and Education

### The Problem

There is a massive knowledge and mindset gap between a driver who just uses the Uber app and someone like Kevin who maintains their own client base, has a schedule, and operates with an entrepreneurial mindset. You cannot just download an app and bridge that gap.

Michele describes this well: "The money is here to make. But if you want to just turn on the app and wait for rides, that's not what this is." Kevin addresses it with his 14-point framework. Brian talks about discovering your performance persona.

### How the Product Addresses This

The product should encode the best practices of top drivers into its default behaviors. The auto-generated airport pickup message is the clearest example: instead of requiring the driver to know what Kevin knows, the system does it for them. The flight tracking, the pre-filled message, the one-tap "I'm here" — these are all translations of Kevin's expertise into product features.

Beyond the airport flow, the onboarding experience should introduce these concepts progressively. Not a three-hour tutorial, but contextual guidance that appears at the right moment: "You just completed your first airport pickup. Here's how top drivers convert that rider into a recurring client." This is the gamification and progressive disclosure concept discussed in the brainstorming sessions — making the path from new driver to Kevin-level feel achievable and structured.

### Kevin's 14 Points as Product Principles

Each of Kevin's 14 points implies a product behavior:

1. **Determine what kind of driver you want to be** → The onboarding should ask this and tailor the experience accordingly (Scheduler vs. Catch & Convert).
2. **Get business cards** → The app should generate a digital business card or QR code the driver can share, with their profile and booking link.
3. **Practice your pitches** → Educational content or prompts within the app for how to convert riders.
4. **Know your criteria for a private client** → The flagging system after rides (keep vs. promo) reflects this filtering.
5. **Know how the rider app works** → If a rider-facing experience exists, drivers should understand it so they can walk riders through it.
6. **Have support apps downloaded** → The product should eliminate the need for separate flight tracking, payment, and communication apps by building those functions in.
7. **Have weekly and monthly goals** → Goal-setting and progress tracking within the earnings view.
8. **Make your service match your quote** → The proactive communication tools (flight tracking, automated messages) ensure the driver delivers on their promise.
9. **Have a social media presence** → Outside the app's scope, but the profile and digital card support this.
10. **Market yourself** → The conversion tools, referral tracking, and client acquisition features.
11. **Go to meetups and virtual calls** → Community features, event notifications, WhatsApp group integration or equivalent.
12. **Have a change of mindset** → The entire product aesthetic and language should reinforce "you are a business owner" not "you are a contractor."
13. **Start using Uber & Lyft as referral apps** → The product should make it easy to onboard a new client captured from a platform ride — quick add, QR code scan, immediate scheduling.
14. **It all starts with a conversation** → The product supports but does not replace the human interaction. The in-person ride is where the relationship forms. The app is the professional infrastructure around it.

---

## Emotional Design Principles — How the Driver App Should Feel

**Professional, not playful.** The driver is running a business. The app should feel like a clean, capable tool — not a gamified gig platform. Think business dashboard with warmth, not Uber's utilitarian gray.

**Calm confidence, not urgency.** Uber and Lyft create anxiety through surge timers, acceptance rate pressure, and tier threats. HUM should be the antidote. The driver chose freedom. The app should feel like freedom with structure.

**Minimal time in the app, maximum value from it.** The driver's job is driving and talking to people, not staring at a screen. Every interaction should be fast: one-tap confirmations, pre-filled messages, at-a-glance agenda. The best use of the app is when the driver barely needs to use it because it handled everything.

**Reinforcement of progress.** The earnings view, the client count, the percentage of private ride income — these should be visible and encouraging without being pushy. The driver should feel their business growing.

**Community, not competition.** HUM drivers operate on what Kevin calls a "pack mentality, not a dog-eat-dog mentality." The posse system, the referral network, the WhatsApp group — these are collaborative. The product should reflect this ethos. No leaderboards that create resentment. Shared success.

---

## Summary of Core Driver Needs for the Airport Pickup Slice

1. A daily agenda view showing all upcoming appointments with client details and real-time flight status for airport pickups.
2. Automatic flight tracking linked to appointment flight numbers — no separate app required.
3. Proactive delay and schedule-change notifications that let the driver adjust their day.
4. A pre-composed pickup message with gate, carousel, door, and car photo — ready to send in one tap upon landing.
5. A one-tap "I'm here" status that notifies the rider without the driver composing a message.
6. A one-tap "on my way" / "ride started" / "ride complete" flow that automates rider notifications.
7. Post-ride client flagging: keep as recurring client, add notes, log preferences.
8. Earnings visibility: today, this week, this month, per client, HUM versus platform.
9. Posse management: list of trusted drivers, ability to offer appointments for coverage.
10. Client list with ride history, frequency, revenue, and personal notes.

The north star for every feature: would this help a brand-new HUM driver deliver the same airport pickup experience that Kevin delivers today, on their very first try?
