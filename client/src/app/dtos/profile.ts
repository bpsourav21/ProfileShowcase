export interface PictureDto {
  id: string;
  imageName: string;
  mimetype: string;
  updatedAt?: Date;
  createdAt?: Date;
};

export interface ProfileDto {
  id: number;
  name: string;
  age: number;
  picId: string;
  createdAt?: Date;
  updatedAt?: Date;
  workExperiences: WorkExperience[];
  profilePicture: PictureDto | null; // need to improve
}

export interface WorkExperience {
  id?: string;
  jobTitle: string;
  company: string | null;
  companyLogo: PictureDto | null;
  jobDescription: string | null;
  startDate: Date | null;
  endDate: Date | null;
  isContinuing: boolean;
  expId?: number;
  logoId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


