export interface ProfileDto {
  id: number
  name: string;
  age: number;
  profilePicture: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  workExperience: WorkExperience[];
}

export interface WorkExperience {
  id: string
  jobTitle: string;
  company: string | null;
  companyLogo: string | null;
  jobDescription: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isContinuing: boolean;
  expId: number;
  createdAt?: Date;
  updatedAt?: Date;
}


