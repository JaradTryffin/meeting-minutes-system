interface MeetingType {
  id: string;
  name: string;
}

interface MeetingBasic {
  id: string;
  meetingNumber: number;
  formattedId: string;
  date: string;
  meetingTypeId: string;
  previousMeetingId: string | null;
  minutes: string | null;
}

interface MeetingItem {
  id: string;
  description: string;
  dueDate: string | null;
  completedDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ResponsiblePerson {
  id: string;
  name: string;
  email: string;
}

interface MeetingItemStatus {
  id: string;
  status: string;
  actionRequired: string;
  meetingId: string;
  meetingItemId: string;
  responsiblePersonId: string;
  createdAt: string;
  updatedAt: string;
  meeting: MeetingBasic;
  responsiblePerson: ResponsiblePerson;
  meetingItem: MeetingItem;
}

export interface MeetingData {
  id: string;
  meetingNumber: number;
  formattedId: string;
  date: string;
  meetingTypeId: string;
  previousMeetingId: string | null;
  minutes: string | null;
  meetingType: MeetingType;
  itemStatuses: MeetingItemStatus[];
}
