export interface DeviceDto {
  id: number;
  name: string;
}

export interface DevicesResultDto {
  devices: DeviceDto[];
}

export interface NotificationData {
  name: string;
  email: string;
  repoUrl: string;
  message: string;
}
