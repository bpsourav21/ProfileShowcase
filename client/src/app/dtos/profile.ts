export type Picture = string | ArrayBuffer | null;
export interface ProfileDto {
  id: number
  name: string;
  age: number;
  profilePicture: Picture;
  createdAt?: Date;
  updatedAt?: Date;
  workExperiences: WorkExperience[];
}

export interface WorkExperience {
  id?: string
  jobTitle: string;
  company: string | null;
  companyLogo: Picture;
  jobDescription: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isContinuing: boolean;
  expId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}


