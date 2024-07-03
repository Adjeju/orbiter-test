export type ReceiveWeek = {
  contact_date: string;
  array: User[];
};

export type ReceiveWeekResponse = ReceiveWeek[];

export type User = {
  id: number;
  created_at: number;
  name: string;
  img: string;
  position: string;
  city: string;
  _orbits_last_message: OrbitLastMessage;
};

type OrbitLastMessage = {
  message: string;
  message_head: string;
};
