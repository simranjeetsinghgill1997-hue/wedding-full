export interface TimelineEvent {
  time: string;
  title: string;
  description?: string;
  location?: string;
}

export interface WeddingCeremony {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  hosts?: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  calendarTitle: string;
  calendarDateStart: string; // YYYYMMDDTHHmmss
  calendarDateEnd: string;
  timeline?: TimelineEvent[];
}

export interface PersonProfile {
  name: string;
  role: 'Groom' | 'Bride';
  parentage: string;
  bio: string;
  defaultImage: string;
}
