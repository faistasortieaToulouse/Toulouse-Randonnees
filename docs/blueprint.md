# **App Name**: RandoToulouse

## Core Features:

- User Authentication: Secure user authentication using Firebase (email/password, Apple, Google, Facebook, LinkedIn, Microsoft, Spotify, X, Yahoo). Stores user data in Firestore (f9XLLJrQMQNcllHTC00F/connexion collection) including role, profile details, and preferences.
- Hike Event Creation: Allow users to create hiking events with details such as title, start time, meeting point, description, and an associated map/route from Open Data Street or Open Topo Maps. Allow to select auto/manual enrollment or set up a waiting list for a proposed event.
- Map Integration: Integrate Open Data Street and Open Topo Maps to display hiking routes. Users can select routes from these services when creating events or browsing hikes.
- Event Discovery & Enrollment: Enable users to browse and sign up for hiking events created by others. Display event details and map integration for clear route information.
- Rating and Reviews: Allow participants to rate hikes and organizers post-event (1-5 stars). Ratings are visible only to administrators and moderators.
- Moderation and Administration: Provide admin and moderator roles with permissions to edit/delete events and suspend/delete members directly through the Firestore 'connexion' collection (without Firebase Authentication).
- Messaging and Forums: Implement a messaging system for friends and a public discussion forum for broader community engagement.

## Style Guidelines:

- Primary color: Forest green (#388E3C) evoking nature and outdoors.
- Background color: Light beige (#F5F5DC), offering a neutral backdrop that complements the natural green tones.
- Accent color: Earthy orange (#D35400) is used for interactive elements.
- Font pairing: 'PT Sans' (sans-serif) for both headlines and body text to maintain a modern yet approachable aesthetic.
- Use line icons related to hiking, maps, and community.
- Clean and intuitive layout with a focus on map integration and event details.
- Subtle transitions and animations for a smooth user experience.