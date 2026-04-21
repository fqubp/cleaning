import { CreateRequestInput } from './types';

export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '').trim();
}

export function validateCreateRequest(payload: CreateRequestInput): string[] {
  const errors: string[] = [];
  if (!payload.name || payload.name.trim().length < 2) errors.push('Имя должно содержать минимум 2 символа');
  if (!payload.phone || normalizePhone(payload.phone).length < 10) errors.push('Укажите корректный телефон');
  if (!payload.address || payload.address.trim().length < 5) errors.push('Укажите адрес');
  if (!payload.desiredDate) errors.push('Укажите дату и время');
  if (!Number.isFinite(payload.serviceId) || payload.serviceId <= 0) errors.push('Выберите услугу');

  const media = payload.media ?? [];
  const photos = media.filter((m) => m.type === 'photo');
  const videos = media.filter((m) => m.type === 'video');

  if (photos.length > 4) errors.push('Можно загрузить не более 4 фото');
  if (videos.length > 1) errors.push('Можно загрузить не более 1 видео');

  return errors;
}
