export interface AuthenticatedUserDto {
  id: number;
  fullname: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  userType: string;
  birthDate: string;
}