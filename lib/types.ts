export type RequestStatus = 'Новая' | 'В обработке' | 'Подтверждена' | 'Выполнена' | 'Отменена';

export type MediaItem = {
  type: 'photo' | 'video';
  url: string;
  filename: string;
  size: number;
};

export type CleaningRequest = {
  id: number;
  name: string;
  phone: string;
  serviceId: number;
  params: Record<string, unknown>;
  calcPrice: number;
  finalPrice: number | null;
  status: RequestStatus;
  address: string;
  desiredDate: string;
  comment: string;
  media: MediaItem[];
  createdAt: string;
  updatedAt: string;
};

export type CreateRequestInput = {
  name: string;
  phone: string;
  serviceId: number;
  area?: number;
  params?: Record<string, unknown>;
  desiredDate: string;
  comment?: string;
  address: string;
  media?: MediaItem[];
};
