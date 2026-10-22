export const userRoles = ['Técnico', 'Supervisor', 'Administrador'] as const;
export const userStatuses = ['Activo', 'Inactivo'] as const;
export const notificationEvents = [
  { key: 'created', label: 'Notificar cuando se cree un ticket', shortLabel: 'Ticket creado' },
  {
    key: 'modified',
    label: 'Notificar cuando el ticket sea modificado',
    shortLabel: 'Ticket modificado',
  },
  {
    key: 'assigned',
    label: 'Notificar cuando el ticket sea asignado',
    shortLabel: 'Ticket asignado',
  },
  {
    key: 'resolved',
    label: 'Notificar cuando el ticket sea resuelto',
    shortLabel: 'Ticket resuelto',
  },
  {
    key: 'commented',
    label: 'Notificar cuando se agregue un comentario',
    shortLabel: 'Nuevo comentario',
  },
] as const;

export type NotificationPreferences = { enabled: boolean } & Record<
  (typeof notificationEvents)[number]['key'],
  boolean
>;

// Preview records deliberately have no password, token, or authentication fields.
export interface UserDraft {
  firstName: string;
  lastName: string;
  username: string;
  employeeNumber: string;
  phone: string;
  branch: string;
  department: string;
  position: string;
  role: (typeof userRoles)[number];
  status: (typeof userStatuses)[number];
  email: string;
  notifications: NotificationPreferences;
}

export interface PreviewUser extends UserDraft {
  id: number;
}

export const normalizeEmail = (email: string): string => email.trim().toLowerCase();
export const fullName = (user: Pick<UserDraft, 'firstName' | 'lastName'>): string =>
  `${user.firstName} ${user.lastName}`.trim();
export const initials = (user: Pick<UserDraft, 'firstName' | 'lastName'>): string =>
  `${user.firstName.trim().charAt(0)}${user.lastName.trim().charAt(0)}`.toUpperCase();
