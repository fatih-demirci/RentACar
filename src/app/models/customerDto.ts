import { UserDto } from "./userDto"

export interface CustomerDto extends UserDto {
    customerId: number
    companyName: string
}