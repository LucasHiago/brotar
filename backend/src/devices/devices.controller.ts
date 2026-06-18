import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser, CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DevicesService } from './devices.service';
import { PairDeviceDto } from './dto/pair-device.dto';
import { RegisterDeviceDto } from './dto/register-device.dto';

@ApiTags('devices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devices: DevicesService) {}

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.devices.findAll(user.id);
  }

  @Post()
  register(@CurrentUser() user: AuthUser, @Body() dto: RegisterDeviceDto) {
    return this.devices.register(user.id, dto.serial);
  }

  @Post(':id/pair')
  pair(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() dto: PairDeviceDto,
  ) {
    return this.devices.pair(user.id, id, dto.plantId);
  }
}
