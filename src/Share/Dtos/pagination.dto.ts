import { IsNumber, IsOptional, IsString } from "class-validator"

export class PaginationDto{
    @IsNumber()
    @IsOptional()
    limit: number

    @IsNumber()
    @IsOptional()
    page: number

    @IsString()
    @IsOptional()
    search: string
}