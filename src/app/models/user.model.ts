export class User {
  user_ID!: number;
  student_ID!: string;
  student_Name!: string;
  date!: Date;
  status!: string;
  assessment_count!: number;
}

export class verificationPaylod {
  user_email!: string;
}

export interface verificationResponse {
  status: string;
  date: Date;
  student_Name: string;
  user_ID: number;
  student_ID: string;
  assessment_count: number;
}
