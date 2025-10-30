export type User = {
  id: string;
  identite: string;
  email: string;
  role: 'Admin' | 'Modérateur' | 'Membre';
  avatarUrl?: string;
  status: 'active' | 'suspended' | 'deleted';
  prenom?: string;
  nom?: string;
  description?: string;
  telephone?: string;
  genre?: 'homme' | 'femme' | 'autre';
  commune?: string;
  dateNaissance?: string;
  langues?: string;
};

export type Hike = {
  id: string;
  title: string;
  location: string;
  distance: string;
  duration: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  type: 'Open Topo Maps' | 'Open Data Street';
  imageUrl: string;
  imageHint: string;
};

export type Event = {
  id: string;
  title: string;
  hikeId: string;
  organizer: User;
  date: string;
  meetingPoint: string;
  participants: User[];
  maxParticipants: number;
  status: 'À venir' | 'Terminé' | 'Annulé';
};
