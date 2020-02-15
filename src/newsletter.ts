import { ApiProperty } from '@nestjs/swagger';

export class Newsletter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  enabled: boolean;
}
